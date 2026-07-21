import { connectToDatabase } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Shipment from "@/lib/models/Shipment";
import Notification from "@/lib/models/Notification";
import Trip from "@/lib/models/Trip";
import Vehicle from "@/lib/models/Vehicle";
import { Conversation, Message } from "@/lib/models/Message";
import { isCityOnRoute, getDistanceBetweenCities } from "@/lib/routeData";

export async function GET() {
  try {
    const auth = await requireAuth("driver");
    if (auth.error) return Response.json({ error: auth.error }, { status: auth.status });

    await connectToDatabase();

    const driverTrips = await Trip.find({
      driver: auth.user._id,
      status: { $in: ["scheduled", "in_progress"] },
    }).select("origin destination waypoints date capacityAvailable");

    const vehicle = await Vehicle.findOne({ driver: auth.user._id })
      .select("capacity maxWeight dimensions");

    const availableLoads = await Shipment.find({
      status: "pending",
      driver: { $exists: false },
    })
      .populate("sender", "firstName lastName company rating")
      .sort({ createdAt: -1 })
      .limit(50);

    const loadsWithRoute = availableLoads.map((load) => {
      const loadObj = load.toObject();
      let bestRoute = null;
      let bestDetour = null;
      let bestDistance = null;
      let onRoute = false;

      for (const trip of driverTrips) {
        const check = isCityOnRoute(
          trip.origin,
          trip.destination,
          load.origin,
          150
        );
        if (check.onRoute) {
          onRoute = true;
          bestDetour = check.detour;
          bestDistance = check.distance;
          bestRoute = { origin: trip.origin, destination: trip.destination, date: trip.date };
          break;
        } else if (check.detour !== null) {
          if (bestDetour === null || check.detour < bestDetour) {
            bestDetour = check.detour;
            bestDistance = check.distance;
            bestRoute = { origin: trip.origin, destination: trip.destination, date: trip.date };
          }
        }
      }

      if (!onRoute && driverTrips.length === 0) {
        const directDist = getDistanceBetweenCities(
          load.origin.city, load.origin.state,
          load.destination.city, load.destination.state
        );
        bestDistance = directDist;
      }

      let fitsCapacity = null;
      if (vehicle && load.packageInfo?.weight) {
        const maxW = vehicle.maxWeight || vehicle.capacity || 0;
        if (maxW > 0) {
          fitsCapacity = load.packageInfo.weight <= maxW;
        }
      }

      return {
        ...loadObj,
        routeMatch: {
          onRoute,
          detour: bestDetour,
          distance: bestDistance,
          matchingTrip: bestRoute,
        },
        capacityFit: fitsCapacity,
      };
    });

    loadsWithRoute.sort((a, b) => {
      if (a.routeMatch.onRoute && !b.routeMatch.onRoute) return -1;
      if (!a.routeMatch.onRoute && b.routeMatch.onRoute) return 1;
      const detourA = a.routeMatch.detour ?? 9999;
      const detourB = b.routeMatch.detour ?? 9999;
      return detourA - detourB;
    });

    const claimedLoads = await Shipment.find({
      driver: auth.user._id,
      status: { $in: ["accepted", "picked_up", "in_transit"] },
    })
      .sort({ updatedAt: -1 })
      .limit(10);

    return Response.json({
      availableLoads: loadsWithRoute,
      claimedLoads,
      driverTrips: driverTrips.map((t) => ({
        origin: t.origin,
        destination: t.destination,
        waypoints: t.waypoints,
        date: t.date,
      })),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = await requireAuth("driver");
    if (auth.error) return Response.json({ error: auth.error }, { status: auth.status });

    await connectToDatabase();
    const { shipmentId } = await request.json();

    if (!shipmentId) {
      return Response.json({ error: "Shipment ID is required" }, { status: 400 });
    }

    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) return Response.json({ error: "Shipment not found" }, { status: 404 });
    if (shipment.status !== "pending") return Response.json({ error: "Shipment already claimed" }, { status: 400 });

    const driverTrips = await Trip.find({
      driver: auth.user._id,
      status: { $in: ["scheduled", "in_progress"] },
    });

    let routeInfo = {};
    for (const trip of driverTrips) {
      const check = isCityOnRoute(trip.origin, trip.destination, shipment.origin, 150);
      if (check.onRoute || (check.detour !== null && check.detour < 200)) {
        routeInfo = {
          distance: check.distance,
          detour: check.detour,
          onRoute: check.onRoute,
          matchScore: check.onRoute ? 80 : 40,
        };
        break;
      }
    }

    shipment.driver = auth.user._id;
    shipment.status = "accepted";
    shipment.progress.accepted = true;
    shipment.routeMatch = routeInfo;
    await shipment.save();

    await Trip.create({
      driver: auth.user._id,
      shipment: shipment._id,
      origin: shipment.origin,
      destination: shipment.destination,
      date: shipment.timing.pickupDate,
      status: "scheduled",
      earnings: shipment.pricing.amount,
      distance: routeInfo.distance || 0,
      packages: 1,
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [shipment.sender, auth.user._id] },
      shipment: shipment._id,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [shipment.sender, auth.user._id],
        shipment: shipment._id,
        lastMessage: "Shipment claimed — start coordinating.",
        lastMessageTime: new Date(),
      });
    }

    await Message.create({
      conversation: conversation._id,
      sender: auth.user._id,
      text: "Shipment claimed — start coordinating.",
    });

    await Notification.create({
      user: shipment.sender,
      type: "match",
      title: "Carrier Found",
      message: `${auth.user.firstName} ${auth.user.lastName} accepted your shipment ${shipment.trackingId}.`,
      link: `/sender/messages?conversation=${conversation._id}`,
    });

    await Notification.create({
      user: auth.user._id,
      type: "shipment",
      title: "Load Claimed Successfully",
      message: `You've claimed ${shipment.trackingId}: ${shipment.origin.city} → ${shipment.destination.city}.`,
      link: `/driver/trips`,
    });

    return Response.json({ shipment, conversationId: conversation._id }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
