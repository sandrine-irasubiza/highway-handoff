import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trackingId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "picked_up", "in_transit", "delivered", "cancelled"],
      default: "pending",
    },
    origin: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: String,
      address: String,
    },
    destination: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: String,
      address: String,
    },
    packageInfo: {
      type: { type: String, enum: ["small-box", "document", "large-parcel"], required: true },
      weight: { type: Number, required: true },
      length: Number,
      width: Number,
      height: Number,
      description: String,
    },
    timing: {
      pickupDate: { type: Date, required: true },
      deliveryDeadline: String,
      estimatedDelivery: Date,
    },
    pricing: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },
    notes: String,
    progress: {
      accepted: { type: Boolean, default: false },
      pickedUp: { type: Boolean, default: false },
      inTransit: { type: Boolean, default: false },
      delivered: { type: Boolean, default: false },
    },
    negotiation: {
      status: {
        type: String,
        enum: ["none", "pending", "counter_offer", "agreed", "rejected"],
        default: "none",
      },
      senderProposedPrice: { type: Number },
      driverCounterPrice: { type: Number },
      lastOfferBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      updatedAt: Date,
    },
    routeMatch: {
      distance: Number,
      detour: Number,
      onRoute: { type: Boolean, default: false },
      matchScore: Number,
    },
  },
  { timestamps: true }
);

shipmentSchema.index({ sender: 1, createdAt: -1 });
shipmentSchema.index({ driver: 1, createdAt: -1 });
shipmentSchema.index({ status: 1 });
shipmentSchema.index({ "origin.city": 1, "destination.city": 1 });

export default mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema);
