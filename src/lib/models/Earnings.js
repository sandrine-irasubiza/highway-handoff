import mongoose from "mongoose";

const earningsSchema = new mongoose.Schema(
  {
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ["trip", "bonus", "tip", "payout"],
      default: "trip",
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    description: String,
  },
  { timestamps: true }
);

earningsSchema.index({ driver: 1, createdAt: -1 });

export default mongoose.models.Earnings || mongoose.model("Earnings", earningsSchema);
