import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Earnings from "@/lib/models/Earnings";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const totalEarningsAgg = await Earnings.aggregate([
      { $match: { driver: user._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const thisMonthAgg = await Earnings.aggregate([
      {
        $match: {
          driver: user._id,
          createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const thisWeekAgg = await Earnings.aggregate([
      {
        $match: {
          driver: user._id,
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const recentEarnings = await Earnings.find({ driver: user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("trip", "origin destination");

    const pendingPayouts = await Earnings.aggregate([
      { $match: { driver: user._id, status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    return Response.json({
      totalEarnings: totalEarningsAgg[0]?.total || 0,
      thisMonth: thisMonthAgg[0]?.total || 0,
      thisWeek: thisWeekAgg[0]?.total || 0,
      pendingPayouts: pendingPayouts[0]?.total || 0,
      recentEarnings,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
