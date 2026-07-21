import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Trip from "@/lib/models/Trip";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const activeTrip = await Trip.findOne({ driver: user._id, status: "in_progress" })
      .populate({
        path: "shipment",
        populate: { path: "sender", select: "firstName lastName phone email" },
      });

    const upcomingTrips = await Trip.find({ driver: user._id, status: "scheduled" })
      .populate({
        path: "shipment",
        select: "trackingId packageInfo pricing status",
      })
      .sort({ date: 1 })
      .limit(10);

    const tripHistory = await Trip.find({ driver: user._id, status: { $in: ["completed", "cancelled"] } })
      .populate({
        path: "shipment",
        select: "trackingId packageInfo pricing status",
      })
      .sort({ date: -1 })
      .limit(20);

    const stats = await Trip.aggregate([
      { $match: { driver: user._id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          earnings: { $sum: "$earnings" },
        },
      },
    ]);

    const statsMap = {};
    for (const s of stats) {
      statsMap[s._id] = { count: s.count, earnings: s.earnings };
    }

    return Response.json({
      activeTrip,
      upcomingTrips,
      tripHistory,
      stats: {
        total: (statsMap.scheduled?.count || 0) + (statsMap.in_progress?.count || 0) + (statsMap.completed?.count || 0) + (statsMap.cancelled?.count || 0),
        completed: statsMap.completed?.count || 0,
        cancelled: statsMap.cancelled?.count || 0,
        inProgress: statsMap.in_progress?.count || 0,
        scheduled: statsMap.scheduled?.count || 0,
        totalEarnings: (statsMap.completed?.earnings || 0) + (statsMap.in_progress?.earnings || 0),
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const { origin, destination, waypoints, date, capacityAvailable } = body;

    if (!origin?.city || !origin?.state) {
      return Response.json({ error: "Origin city and state are required" }, { status: 400 });
    }
    if (!destination?.city || !destination?.state) {
      return Response.json({ error: "Destination city and state are required" }, { status: 400 });
    }

    const trip = await Trip.create({
      driver: user._id,
      origin,
      destination,
      waypoints: waypoints || [],
      date: date || new Date(),
      capacityAvailable: capacityAvailable || 0,
      status: "scheduled",
    });

    return Response.json({ trip }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
