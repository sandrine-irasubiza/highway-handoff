import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Shipment from "@/lib/models/Shipment";
import Notification from "@/lib/models/Notification";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "sender") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const activeShipments = await Shipment.countDocuments({
      sender: user._id,
      status: { $in: ["accepted", "picked_up", "in_transit"] },
    });

    const completedThisMonth = await Shipment.countDocuments({
      sender: user._id,
      status: "delivered",
      updatedAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    const totalSavedAgg = await Shipment.aggregate([
      { $match: { sender: user._id, status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$pricing.amount" } } },
    ]);
    const totalSaved = totalSavedAgg[0]?.total || 0;

    const recentShipments = await Shipment.find({ sender: user._id })
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("driver", "firstName lastName");

    const recentActivity = await Notification.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(4);

    return Response.json({
      activeShipments,
      completedThisMonth,
      totalSaved,
      recentShipments,
      recentActivity,
      userName: user.firstName,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
