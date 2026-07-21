import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Trip from "@/lib/models/Trip";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    const allowed = ["status", "date", "notes"];
    const updates = {};
    for (const key of allowed) {
      if (body[key] !== undefined) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return Response.json({ error: "No valid fields to update" }, { status: 400 });
    }

    if (updates.status) {
      const validStatuses = ["scheduled", "in_progress", "completed", "cancelled"];
      if (!validStatuses.includes(updates.status)) {
        return Response.json(
          { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
          { status: 400 }
        );
      }
    }

    const trip = await Trip.findOneAndUpdate({ _id: id, driver: user._id }, updates, { new: true });

    if (!trip) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({ trip });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
