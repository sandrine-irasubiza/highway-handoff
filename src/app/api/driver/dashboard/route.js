import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Trip from "@/lib/models/Trip";
import Shipment from "@/lib/models/Shipment";
import Earnings from "@/lib/models/Earnings";
import Notification from "@/lib/models/Notification";
import Vehicle from "@/lib/models/Vehicle";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const todayEarningsAgg = await Earnings.aggregate([
      { $match: { driver: user._id, createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const todayEarnings = todayEarningsAgg[0]?.total || 0;

    const activeDeliveries = await Shipment.countDocuments({
      driver: user._id,
      status: { $in: ["accepted", "picked_up", "in_transit"] },
    });

    const totalDistance = user.totalDistance || 0;
    const rating = user.rating || 0;

    const activeTrip = await Trip.findOne({ driver: user._id, status: "in_progress" })
      .populate("shipment");

    const upcomingTrips = await Trip.find({ driver: user._id, status: "scheduled" })
      .sort({ date: 1 })
      .limit(2);

    const vehicle = await Vehicle.findOne({ driver: user._id });

    const recentAlerts = await Notification.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(3);

    const performance = {
      onTimeRate: user.onTimeRate || 0,
      safeDeliveries: user.totalDeliveries || 0,
      avgResponse: "—",
    };

    return Response.json({
      todayEarnings,
      activeDeliveries,
      totalDistance,
      rating,
      activeTrip,
      upcomingTrips,
      vehicle,
      recentAlerts,
      performance,
      user: { firstName: user.firstName, lastName: user.lastName, avatar: user.avatar },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
