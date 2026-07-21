import { connectToDatabase } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Shipment from "@/lib/models/Shipment";
import User from "@/lib/models/User";
import Notification from "@/lib/models/Notification";
import Trip from "@/lib/models/Trip";
import Vehicle from "@/lib/models/Vehicle";
import { Conversation, Message } from "@/lib/models/Message";
import { scoreRouteMatch, isCityOnRoute, getDistanceBetweenCities } from "@/lib/routeData";

export async function GET() {
  const auth = await requireAuth("sender");
  if (auth.error) return Response.json({ error: auth.error }, { status: auth.status });

  await connectToDatabase();

  const pendingShipments = await Shipment.find({
    sender: auth.user._id,
    status: "pending",
    driver: { $exists: false },
  }).sort({ createdAt: -1 });

  const drivers = await User.find({ role: "driver" })
    .select("firstName lastName rating totalDeliveries onTimeRate carrierType vehicleInfo isOnline")
    .sort({ rating: -1 });

  const driverIds = drivers.map((d) => d._id);
  const activeCounts = await Shipment.aggregate([
    { $match: { driver: { $in: driverIds }, status: { $in: ["accepted", "picked_up", "in_transit"] } } },
    { $group: { _id: "$driver", count: { $sum: 1 } } },
  ]);
  const countMap = {};
  for (const ac of activeCounts) {
    countMap[ac._id.toString()] = ac.count;
  }

  const driverTrips = await Trip.find({
    driver: { $in: driverIds },
    status: { $in: ["scheduled", "in_progress"] },
  }).select("driver origin destination waypoints capacityAvailable date");
  const tripMap = {};
  for (const trip of driverTrips) {
    const did = trip.driver.toString();
    if (!tripMap[did]) tripMap[did] = [];
    tripMap[did].push(trip);
  }

  const vehicles = await Vehicle.find({ driver: { $in: driverIds } })
    .select("driver capacity maxWeight dimensions");
  const vehicleMap = {};
  for (const v of vehicles) {
    vehicleMap[v.driver.toString()] = v;
  }

  const matches = pendingShipments.map((shipment) => {
    const scored = drivers.map((driver) => {
      let score = 0;
      const reasons = [];
      const did = driver._id.toString();
      const vehicle = vehicleMap[did];
      const trips = tripMap[did] || [];

      if (trips.length > 0) {
        let bestRouteScore = -Infinity;
        let bestRouteReasons = [];
        let bestDetour = null;
        let bestDistance = null;

        for (const trip of trips) {
          const routeResult = scoreRouteMatch(
            shipment.origin,
            shipment.destination,
            trip,
            vehicle?.maxWeight || vehicle?.capacity,
            shipment.packageInfo?.weight
          );

          const routeCheck = isCityOnRoute(
            trip.origin,
            trip.destination,
            shipment.origin,
            150
          );

          if (routeResult.score > bestRouteScore) {
            bestRouteScore = routeResult.score;
            bestRouteReasons = routeResult.reasons;
            bestDetour = routeCheck.detour;
            bestDistance = routeCheck.distance;
          }
        }

        score += bestRouteScore;
        reasons.push(...bestRouteReasons);
      } else {
        if (vehicle?.make) score += 10;
        reasons.push("No active trips");
      }

      if (driver.isOnline) {
        score += 15;
        reasons.push("Online");
      }
      score += (driver.rating || 0) * 10;
      score += (driver.onTimeRate || 0) * 0.5;
      const activeLoad = countMap[did] || 0;
      score -= activeLoad * 5;
      if (activeLoad === 0) score += 10;
      score += Math.min(driver.totalDeliveries || 0, 50);

      const vehicleData = vehicleMap[did];
      if (vehicleData && shipment.packageInfo?.weight) {
        const maxW = vehicleData.maxWeight || vehicleData.capacity || 0;
        if (maxW > 0) {
          if (shipment.packageInfo.weight <= maxW) {
            score += 15;
            reasons.push("Package fits vehicle");
          } else {
            score -= 25;
            reasons.push("Package exceeds capacity");
          }
        }
      }

      return {
        driver,
        score: Math.round(score * 10) / 10,
        reasons,
        routeInfo: trips.length > 0 ? {
          tripOrigin: trips[0].origin,
          tripDestination: trips[0].destination,
          waypoints: trips[0].waypoints,
        } : null,
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return {
      shipment,
      recommended: scored.slice(0, 5),
    };
  });

  const availableDrivers = drivers.map((d) => ({
    ...d.toObject(),
    activeLoads: countMap[d._id.toString()] || 0,
    trips: (tripMap[d._id.toString()] || []).map((t) => ({
      origin: t.origin,
      destination: t.destination,
      waypoints: t.waypoints,
      date: t.date,
      status: t.status,
    })),
    vehicle: vehicleMap[d._id.toString()] || null,
  }));

  return Response.json({ matches, availableDrivers });
}

export async function POST(request) {
  try {
    const auth = await requireAuth("sender");
    if (auth.error) return Response.json({ error: auth.error }, { status: auth.status });

    await connectToDatabase();
    const { shipmentId, driverId } = await request.json();

    if (!shipmentId || !driverId) {
      return Response.json({ error: "Missing shipmentId or driverId" }, { status: 400 });
    }

    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) return Response.json({ error: "Shipment not found" }, { status: 404 });
    if (shipment.sender.toString() !== auth.user._id.toString()) {
      return Response.json({ error: "Not your shipment" }, { status: 403 });
    }
    if (shipment.status !== "pending") {
      return Response.json({ error: "Shipment already assigned" }, { status: 400 });
    }

    const driver = await User.findById(driverId);
    if (!driver || driver.role !== "driver") {
      return Response.json({ error: "Invalid driver" }, { status: 404 });
    }

    const routeCheck = isCityOnRoute(
      shipment.origin,
      shipment.destination,
      shipment.origin,
      150
    );

    shipment.driver = driver._id;
    shipment.status = "accepted";
    shipment.progress.accepted = true;
    shipment.negotiation.status = "none";
    if (routeCheck) {
      shipment.routeMatch = {
        distance: routeCheck.distance,
        detour: routeCheck.detour,
        onRoute: routeCheck.onRoute,
        matchScore: routeCheck.onRoute ? 80 : 40,
      };
    }
    await shipment.save();

    await Trip.create({
      driver: driver._id,
      shipment: shipment._id,
      origin: shipment.origin,
      destination: shipment.destination,
      date: shipment.timing.pickupDate,
      status: "scheduled",
      earnings: shipment.pricing.amount,
      packages: 1,
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [auth.user._id, driver._id] },
      shipment: shipment._id,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [auth.user._id, driver._id],
        shipment: shipment._id,
        lastMessage: "Shipment assigned — start coordinating.",
        lastMessageTime: new Date(),
      });
    }

    await Message.create({
      conversation: conversation._id,
      sender: auth.user._id,
      text: "Shipment assigned — start coordinating.",
    });

    await Notification.create({
      user: driver._id,
      type: "match",
      title: "New Load Assigned",
      message: `${auth.user.firstName} ${auth.user.lastName} assigned you ${shipment.trackingId}: ${shipment.origin.city} → ${shipment.destination.city}.`,
      link: "/driver/trips",
    });

    await Notification.create({
      user: auth.user._id,
      type: "match",
      title: "Driver Assigned",
      message: `${driver.firstName} ${driver.lastName} has been assigned to ${shipment.trackingId}.`,
      link: `/sender/messages?conversation=${conversation._id}`,
    });

    return Response.json({ shipment, conversationId: conversation._id }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to assign driver" }, { status: 500 });
  }
}
