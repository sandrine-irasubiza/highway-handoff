import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Shipment from "@/lib/models/Shipment";
import Trip from "@/lib/models/Trip";
import Notification from "@/lib/models/Notification";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const user = await getAuthUser();
    if (!user || user.role !== "sender") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const shipment = await Shipment.findOne({ _id: id, sender: user._id }).populate(
      "driver",
      "firstName lastName phone email rating"
    );

    if (!shipment) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({ shipment });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const user = await getAuthUser();
    if (!user || user.role !== "sender") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const shipment = await Shipment.findOne({ _id: id, sender: user._id });
    if (!shipment) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    if (!["pending", "accepted"].includes(shipment.status)) {
      return Response.json(
        { error: "Can only update pending or accepted shipments" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const allowed = ["origin", "destination", "packageInfo", "timing", "notes", "pricing"];
    const updates = {};
    for (const key of allowed) {
      if (body[key] !== undefined) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return Response.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const updated = await Shipment.findByIdAndUpdate(id, updates, { new: true });

    if (shipment.driver && updates.origin) {
      const trip = await Trip.findOne({ shipment: shipment._id, driver: shipment.driver });
      if (trip) {
        trip.origin = updates.origin;
        await trip.save();
      }
    }

    return Response.json({ shipment: updated });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const user = await getAuthUser();
    if (!user || user.role !== "sender") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const shipment = await Shipment.findOne({ _id: id, sender: user._id });
    if (!shipment) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    if (shipment.status === "delivered") {
      return Response.json({ error: "Cannot cancel a delivered shipment" }, { status: 400 });
    }

    if (shipment.status === "cancelled") {
      return Response.json({ error: "Shipment is already cancelled" }, { status: 400 });
    }

    shipment.status = "cancelled";
    await shipment.save();

    if (shipment.driver) {
      await Trip.findOneAndUpdate(
        { shipment: shipment._id, driver: shipment.driver },
        { status: "cancelled" }
      );

      await Notification.create({
        user: shipment.driver,
        type: "shipment",
        title: "Shipment Cancelled",
        message: `Shipment ${shipment.trackingId} (${shipment.origin.city} → ${shipment.destination.city}) has been cancelled by the sender.`,
        link: "/driver/trips",
      });
    }

    return Response.json({ message: "Shipment cancelled", shipment });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
