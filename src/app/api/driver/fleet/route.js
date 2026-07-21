import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Vehicle from "@/lib/models/Vehicle";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const vehicle = await Vehicle.findOne({ driver: user._id });
    return Response.json({ vehicle: vehicle || null });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    const allowed = ["make", "model", "year", "plate", "capacity", "fuelLevel", "engineHealth", "status", "lastMaintenance", "nextMaintenanceKm"];
    const updates = {};
    for (const key of allowed) {
      if (body[key] !== undefined) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return Response.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const vehicle = await Vehicle.findOneAndUpdate(
      { driver: user._id },
      updates,
      { upsert: true, new: true }
    );

    return Response.json({ vehicle });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
