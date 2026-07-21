import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Shipment from "@/lib/models/Shipment";
import Trip from "@/lib/models/Trip";
import Earnings from "@/lib/models/Earnings";
import Notification from "@/lib/models/Notification";

const VALID_TRANSITIONS = {
  accepted: "picked_up",
  picked_up: "in_transit",
  in_transit: "delivered",
};

const TRIP_STATUS_MAP = {
  picked_up: "in_progress",
  in_transit: "in_progress",
  delivered: "completed",
};

const PROGRESS_MAP = {
  picked_up: { pickedUp: true },
  in_transit: { inTransit: true },
  delivered: { delivered: true },
};

const STATUS_LABELS = {
  picked_up: "Picked Up",
  in_transit: "In Transit",
  delivered: "Delivered",
};

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { status: nextStatus } = await request.json();

    if (!nextStatus) {
      return Response.json({ error: "Status is required" }, { status: 400 });
    }

    const shipment = await Shipment.findById(id);
    if (!shipment) {
      return Response.json({ error: "Shipment not found" }, { status: 404 });
    }
    if (!shipment.driver || shipment.driver.toString() !== user._id.toString()) {
      return Response.json({ error: "This shipment is not assigned to you" }, { status: 403 });
    }

    const expected = VALID_TRANSITIONS[shipment.status];
    if (!expected) {
      return Response.json({
        error: `Cannot transition from "${shipment.status}". Allowed transitions: accepted → picked_up, picked_up → in_transit, in_transit → delivered`,
      }, { status: 400 });
    }
    if (nextStatus !== expected) {
      return Response.json({
        error: `Cannot transition from "${shipment.status}" to "${nextStatus}". Next step must be "${expected}".`,
      }, { status: 400 });
    }

    shipment.status = nextStatus;
    Object.assign(shipment.progress, PROGRESS_MAP[nextStatus]);
    await shipment.save();

    const trip = await Trip.findOneAndUpdate(
      { shipment: shipment._id, driver: user._id },
      { status: TRIP_STATUS_MAP[nextStatus] || "scheduled" },
      { new: true }
    );

    if (nextStatus === "delivered" && trip && shipment.pricing?.amount > 0) {
      const existingEarning = await Earnings.findOne({ trip: trip._id, type: "trip" });
      if (!existingEarning) {
        await Earnings.create({
          driver: user._id,
          trip: trip._id,
          amount: shipment.pricing.amount,
          type: "trip",
          status: "pending",
          description: `Delivery: ${shipment.trackingId} (${shipment.origin.city} → ${shipment.destination.city})`,
        });
      }
    }

    const label = STATUS_LABELS[nextStatus] || nextStatus;

    await Notification.create({
      user: shipment.sender,
      type: "shipment",
      title: `Shipment ${label}`,
      message: `Your shipment ${shipment.trackingId} (${shipment.origin.city} → ${shipment.destination.city}) has been marked as "${label}" by your driver ${user.firstName} ${user.lastName}.`,
      link: `/sender/shipments`,
    });

    await Notification.create({
      user: user._id,
      type: "shipment",
      title: `Status Updated: ${label}`,
      message: `You marked ${shipment.trackingId} (${shipment.origin.city} → ${shipment.destination.city}) as "${label}".`,
      link: `/driver/trips`,
    });

    return Response.json({ shipment, trip }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
