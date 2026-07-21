const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/highway-handoff";

// Schemas (inlined to avoid import issues in standalone script)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["sender", "driver"], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: String,
  company: String,
  carrierType: { type: String, enum: ["independent", "fleet", "heavy-haul"] },
  licenseNumber: String,
  vehicleInfo: {
    make: String,
    model: String,
    year: String,
    plate: String,
    capacity: Number,
  },
  rating: { type: Number, default: 0 },
  totalDeliveries: { type: Number, default: 0 },
  onTimeRate: { type: Number, default: 0 },
  totalDistance: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  isOnline: { type: Boolean, default: false },
}, { timestamps: true });

const shipmentSchema = new mongoose.Schema({
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
}, { timestamps: true });

const tripSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  origin: { city: String, state: String },
  destination: { city: String, state: String },
  date: Date,
  status: {
    type: String,
    enum: ["scheduled", "in_progress", "completed", "cancelled"],
    default: "scheduled",
  },
  earnings: { type: Number, default: 0 },
  distance: { type: Number, default: 0 },
  packages: { type: Number, default: 0 },
  shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },
}, { timestamps: true });

const vehicleSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: String,
  plate: { type: String, required: true },
  capacity: Number,
  fuelLevel: { type: Number, default: 100 },
  engineHealth: { type: Number, default: 100 },
  lastMaintenance: Date,
  nextMaintenanceKm: Number,
  status: {
    type: String,
    enum: ["active", "maintenance", "inactive"],
    default: "active",
  },
}, { timestamps: true });

const earningsSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["trip", "bonus", "tip", "payout"], default: "trip" },
  status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
  description: String,
}, { timestamps: true });

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["shipment", "message", "payment", "rating", "system", "match"], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  link: String,
}, { timestamps: true });

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastMessage: String,
  lastMessageTime: Date,
  shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Shipment = mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema);
const Trip = mongoose.models.Trip || mongoose.model("Trip", tripSchema);
const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
const Earnings = mongoose.models.Earnings || mongoose.model("Earnings", earningsSchema);
const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

function formatTimeAgo(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} mins ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.\n");

  console.log("Clearing existing data...");
  await Promise.all([
    User.deleteMany({}),
    Shipment.deleteMany({}),
    Trip.deleteMany({}),
    Vehicle.deleteMany({}),
    Earnings.deleteMany({}),
    Notification.deleteMany({}),
    Conversation.deleteMany({}),
    Message.deleteMany({}),
    Contact.deleteMany({}),
  ]);
  console.log("All collections cleared.\n");

  const hashedPassword = await bcrypt.hash("password123", 12);

  // ── Users ────────────────────────────────────────────────────────

  const sender1 = await User.create({
    email: "sarah@sterlingfreight.com",
    password: hashedPassword,
    role: "sender",
    firstName: "Sarah",
    lastName: "Chen",
    phone: "+1 (312) 555-0142",
    company: "Sterling Global Freight",
    rating: 4.9,
    totalDeliveries: 1284,
    onTimeRate: 99.8,
    earnings: 284000,
  });

  const sender2 = await User.create({
    email: "marcus@midwestlogistics.com",
    password: hashedPassword,
    role: "sender",
    firstName: "Marcus",
    lastName: "Johnson",
    phone: "+1 (317) 555-0187",
    company: "Midwest Logistics Co.",
    rating: 4.7,
    totalDeliveries: 856,
    onTimeRate: 97.5,
    earnings: 192000,
  });

  const driver1 = await User.create({
    email: "alex@highwayhandoff.com",
    password: hashedPassword,
    role: "driver",
    firstName: "Alex",
    lastName: "Reynolds",
    phone: "+1 (773) 555-0912",
    carrierType: "heavy-haul",
    licenseNumber: "CDL-A TX-884921",
    rating: 4.98,
    totalDeliveries: 127,
    onTimeRate: 98.5,
    totalDistance: 1240,
    earnings: 4820,
    isOnline: true,
  });

  const driver2 = await User.create({
    email: "elena@highwayhandoff.com",
    password: hashedPassword,
    role: "driver",
    firstName: "Elena",
    lastName: "Vasquez",
    phone: "+1 (312) 555-0234",
    carrierType: "independent",
    licenseNumber: "CDL-A IL-773201",
    rating: 4.92,
    totalDeliveries: 89,
    onTimeRate: 97.2,
    totalDistance: 860,
    earnings: 3250,
    isOnline: true,
  });

  console.log("Users created:");
  console.log(`  Sender: sarah@sterlingfreight.com / password123`);
  console.log(`  Sender: marcus@midwestlogistics.com / password123`);
  console.log(`  Driver: alex@highwayhandoff.com / password123`);
  console.log(`  Driver: elena@highwayhandoff.com / password123\n`);

  // ── Vehicles ─────────────────────────────────────────────────────

  const veh1 = await Vehicle.create({
    driver: driver1._id,
    make: "Peterbilt",
    model: "579",
    year: "2024",
    plate: "KBZ 452X",
    capacity: 22.5,
    fuelLevel: 74,
    engineHealth: 92,
    lastMaintenance: daysAgo(30),
    nextMaintenanceKm: 120,
    status: "active",
  });

  const veh2 = await Vehicle.create({
    driver: driver2._id,
    make: "Freightliner",
    model: "Cascadia",
    year: "2023",
    plate: "IL-77320",
    capacity: 18.0,
    fuelLevel: 84,
    engineHealth: 96,
    lastMaintenance: daysAgo(15),
    nextMaintenanceKm: 350,
    status: "active",
  });

  console.log("Vehicles created.\n");

  // ── Shipments ────────────────────────────────────────────────────

  const shipmentsData = [
    {
      sender: sender1._id,
      driver: driver1._id,
      trackingId: "HHF-89210",
      status: "in_transit",
      origin: { city: "Chicago", state: "IL", zip: "60607", address: "4400 W O'Hare Ave, Terminal 4" },
      destination: { city: "St. Louis", state: "MO", zip: "63101", address: "200 S Broadway, Dock 7" },
      packageInfo: { type: "large-parcel", weight: 1200, length: 48, width: 40, height: 36, description: "Industrial Components - Fragile" },
      timing: { pickupDate: daysAgo(1), estimatedDelivery: daysFromNow(0) },
      pricing: { amount: 2450 },
      progress: { accepted: true, pickedUp: true, inTransit: true, delivered: false },
    },
    {
      sender: sender1._id,
      driver: driver1._id,
      trackingId: "HHF-91024",
      status: "picked_up",
      origin: { city: "Indianapolis", state: "IN", zip: "46201", address: "250 S Meridian St" },
      destination: { city: "Columbus", state: "OH", zip: "43215", address: "100 E Broad St, Dock 3" },
      packageInfo: { type: "small-box", weight: 45, length: 24, width: 18, height: 12, description: "Medical Supplies (Fragile)" },
      timing: { pickupDate: daysAgo(0), estimatedDelivery: daysFromNow(1) },
      pricing: { amount: 850 },
      progress: { accepted: true, pickedUp: true, inTransit: false, delivered: false },
    },
    {
      sender: sender1._id,
      trackingId: "HHF-88124",
      status: "delivered",
      origin: { city: "Cleveland", state: "OH", zip: "44101", address: "100 Lakeside Ave" },
      destination: { city: "Chicago", state: "IL", zip: "60616", address: "3300 S Ashland Ave, Chicago Terminal" },
      packageInfo: { type: "large-parcel", weight: 4500, length: 60, width: 48, height: 40, description: "Auto Parts - Engine Blocks" },
      timing: { pickupDate: daysAgo(4), estimatedDelivery: daysAgo(2) },
      pricing: { amount: 1240 },
      progress: { accepted: true, pickedUp: true, inTransit: true, delivered: true },
    },
    {
      sender: sender1._id,
      trackingId: "HHF-90115",
      status: "accepted",
      origin: { city: "Nashville", state: "TN", zip: "37201", address: "1 Music Circle S" },
      destination: { city: "Atlanta", state: "GA", zip: "30303", address: "200 Peachtree St NW" },
      packageInfo: { type: "large-parcel", weight: 2800, length: 52, width: 40, height: 36, description: "Farm Equipment Parts" },
      timing: { pickupDate: daysFromNow(1), estimatedDelivery: daysFromNow(3) },
      pricing: { amount: 1800 },
      progress: { accepted: true, pickedUp: false, inTransit: false, delivered: false },
    },
    {
      sender: sender2._id,
      driver: driver2._id,
      trackingId: "HHF-87543",
      status: "in_transit",
      origin: { city: "Kansas City", state: "MO", zip: "64101", address: "1 W Pershing Rd" },
      destination: { city: "St. Louis", state: "MO", zip: "63102", address: "701 N 15th St" },
      packageInfo: { type: "small-box", weight: 150, length: 30, width: 24, height: 18, description: "Electronics - Server Equipment" },
      timing: { pickupDate: daysAgo(0), estimatedDelivery: daysFromNow(1) },
      pricing: { amount: 650 },
      progress: { accepted: true, pickedUp: true, inTransit: true, delivered: false },
    },
    {
      sender: sender2._id,
      trackingId: "HHF-86127",
      status: "pending",
      origin: { city: "Memphis", state: "TN", zip: "38101", address: "100 S Main St" },
      destination: { city: "Nashville", state: "TN", zip: "37201", address: "501 Broadway" },
      packageInfo: { type: "document", weight: 5, description: "Legal Documents - Signed Contracts" },
      timing: { pickupDate: daysFromNow(2), estimatedDelivery: daysFromNow(3) },
      pricing: { amount: 120 },
      progress: { accepted: false, pickedUp: false, inTransit: false, delivered: false },
    },
    {
      sender: sender2._id,
      driver: driver2._id,
      trackingId: "HHF-89004",
      status: "delivered",
      origin: { city: "Dallas", state: "TX", zip: "75201", address: "300 Main St" },
      destination: { city: "Houston", state: "TX", zip: "77002", address: "1200 Smith St" },
      packageInfo: { type: "large-parcel", weight: 3200, length: 72, width: 48, height: 36, description: "HVAC Equipment" },
      timing: { pickupDate: daysAgo(7), estimatedDelivery: daysAgo(5) },
      pricing: { amount: 2100 },
      progress: { accepted: true, pickedUp: true, inTransit: true, delivered: true },
    },
    {
      sender: sender1._id,
      trackingId: "HHF-92356",
      status: "cancelled",
      origin: { city: "Denver", state: "CO", zip: "80201", address: "1601 Wewatta St" },
      destination: { city: "Salt Lake City", state: "UT", zip: "84101", address: "50 W Broadway" },
      packageInfo: { type: "large-parcel", weight: 1800, length: 48, width: 40, height: 30, description: "Office Furniture" },
      timing: { pickupDate: daysAgo(3), estimatedDelivery: daysAgo(1) },
      pricing: { amount: 1650 },
      progress: { accepted: false, pickedUp: false, inTransit: false, delivered: false },
    },
    // ── Open / Unclaimed Shipments (for Load Board & Smart Match) ──
    {
      sender: sender1._id,
      trackingId: "HHF-93417",
      status: "pending",
      origin: { city: "Chicago", state: "IL", zip: "60601", address: "233 S Wacker Dr, Dock 4" },
      destination: { city: "Des Moines", state: "IA", zip: "50309", address: "400 Locust St" },
      packageInfo: { type: "large-parcel", weight: 3800, length: 60, width: 48, height: 42, description: "Agricultural Machinery Parts" },
      timing: { pickupDate: daysFromNow(0), estimatedDelivery: daysFromNow(2) },
      pricing: { amount: 2100 },
      progress: { accepted: false, pickedUp: false, inTransit: false, delivered: false },
    },
    {
      sender: sender1._id,
      trackingId: "HHF-93522",
      status: "pending",
      origin: { city: "Detroit", state: "MI", zip: "48201", address: "1 Woodward Ave, Terminal B" },
      destination: { city: "Cincinnati", state: "OH", zip: "45202", address: "100 E 5th St, Dock 2" },
      packageInfo: { type: "small-box", weight: 320, length: 36, width: 24, height: 18, description: "Automotive Components - Just In Time" },
      timing: { pickupDate: daysFromNow(1), estimatedDelivery: daysFromNow(3) },
      pricing: { amount: 780 },
      progress: { accepted: false, pickedUp: false, inTransit: false, delivered: false },
    },
    {
      sender: sender2._id,
      trackingId: "HHF-93608",
      status: "pending",
      origin: { city: "Louisville", state: "KY", zip: "40202", address: "500 W Jefferson St" },
      destination: { city: "Nashville", state: "TN", zip: "37203", address: "333 Commerce St" },
      packageInfo: { type: "large-parcel", weight: 1500, length: 48, width: 40, height: 36, description: "Beverage Distribution - Palletized" },
      timing: { pickupDate: daysFromNow(0), estimatedDelivery: daysFromNow(2) },
      pricing: { amount: 950 },
      progress: { accepted: false, pickedUp: false, inTransit: false, delivered: false },
    },
    {
      sender: sender1._id,
      trackingId: "HHF-93714",
      status: "pending",
      origin: { city: "Minneapolis", state: "MN", zip: "55401", address: "100 S 5th St, Warehouse C" },
      destination: { city: "Chicago", state: "IL", zip: "60607", address: "4400 W O'Hare Ave, Terminal 4" },
      packageInfo: { type: "small-box", weight: 180, length: 30, width: 20, height: 16, description: "Pharmaceuticals - Temp Controlled" },
      timing: { pickupDate: daysFromNow(2), estimatedDelivery: daysFromNow(4) },
      pricing: { amount: 620 },
      progress: { accepted: false, pickedUp: false, inTransit: false, delivered: false },
    },
    {
      sender: sender2._id,
      trackingId: "HHF-93801",
      status: "pending",
      origin: { city: "Birmingham", state: "AL", zip: "35203", address: "710 20th St N" },
      destination: { city: "Atlanta", state: "GA", zip: "30303", address: "200 Peachtree St NW, Dock 5" },
      packageInfo: { type: "large-parcel", weight: 2200, length: 54, width: 42, height: 36, description: "Building Materials - Steel Fittings" },
      timing: { pickupDate: daysFromNow(1), estimatedDelivery: daysFromNow(3) },
      pricing: { amount: 1450 },
      progress: { accepted: false, pickedUp: false, inTransit: false, delivered: false },
    },
  ];

  const shipments = await Shipment.create(shipmentsData);
  console.log(`Created ${shipments.length} shipments.\n`);

  // ── Trips ────────────────────────────────────────────────────────

  const tripsData = [
    {
      driver: driver1._id,
      shipment: shipments[0]._id,
      origin: { city: "Chicago", state: "IL" },
      destination: { city: "St. Louis", state: "MO" },
      date: daysAgo(0),
      status: "in_progress",
      earnings: 2450,
      distance: 298,
      packages: 1,
    },
    {
      driver: driver1._id,
      shipment: shipments[1]._id,
      origin: { city: "Indianapolis", state: "IN" },
      destination: { city: "Columbus", state: "OH" },
      date: daysAgo(0),
      status: "in_progress",
      earnings: 850,
      distance: 175,
      packages: 1,
    },
    {
      driver: driver1._id,
      shipment: shipments[3]._id,
      origin: { city: "Nashville", state: "TN" },
      destination: { city: "Atlanta", state: "GA" },
      date: daysFromNow(1),
      status: "scheduled",
      earnings: 1800,
      distance: 250,
      packages: 1,
    },
    {
      driver: driver1._id,
      origin: { city: "Huye", state: "TN" },
      destination: { city: "Kigali", state: "KY" },
      date: daysFromNow(1),
      status: "scheduled",
      earnings: 180,
      distance: 320,
      packages: 3,
    },
    {
      driver: driver1._id,
      origin: { city: "Kigali", state: "KY" },
      destination: { city: "Muhanga", state: "TN" },
      date: daysFromNow(3),
      status: "scheduled",
      earnings: 220,
      distance: 180,
      packages: 5,
    },
    {
      driver: driver2._id,
      shipment: shipments[4]._id,
      origin: { city: "Kansas City", state: "MO" },
      destination: { city: "St. Louis", state: "MO" },
      date: daysAgo(0),
      status: "in_progress",
      earnings: 650,
      distance: 250,
      packages: 1,
    },
    {
      driver: driver2._id,
      origin: { city: "Denver", state: "CO" },
      destination: { city: "Salt Lake City", state: "UT" },
      date: daysFromNow(2),
      status: "scheduled",
      earnings: 1240,
      distance: 520,
      packages: 2,
    },
    {
      driver: driver2._id,
      origin: { city: "Salt Lake City", state: "UT" },
      destination: { city: "Reno", state: "NV" },
      date: daysFromNow(4),
      status: "scheduled",
      earnings: 1100,
      distance: 518,
      packages: 4,
    },
  ];

  const trips = await Trip.create(tripsData);
  console.log(`Created ${trips.length} trips.\n`);

  // ── Earnings ─────────────────────────────────────────────────────

  const earningsData = [
    { driver: driver1._id, trip: trips[2]._id, amount: 1800, type: "trip", status: "pending", description: "Nashville to Atlanta - Farm Equipment" },
    { driver: driver1._id, amount: 500, type: "bonus", status: "paid", description: "On-Time Performance Bonus - Q2" },
    { driver: driver1._id, amount: 75, type: "tip", status: "paid", description: "Customer Tip - Rush Delivery" },
    { driver: driver1._id, amount: 248.5, type: "trip", status: "paid", description: "Today's Earnings - Chicago to St. Louis" },
    { driver: driver2._id, amount: 650, type: "trip", status: "paid", description: "Kansas City to St. Louis - Electronics" },
    { driver: driver2._id, amount: 2100, type: "trip", status: "paid", description: "Dallas to Houston - HVAC Equipment" },
    { driver: driver2._id, amount: 350, type: "bonus", status: "paid", description: "Referral Bonus - New Driver Onboarded" },
    { driver: driver2._id, amount: 1240, type: "trip", status: "pending", description: "Denver to Salt Lake City (Scheduled)" },
  ];

  await Earnings.create(earningsData);
  console.log("Earnings records created.\n");

  // ── Notifications ────────────────────────────────────────────────

  const notificationsData = [
    // Sender 1 notifications
    { user: sender1._id, type: "shipment", title: "Shipment Delivered", message: "HHF-88124 was delivered to Chicago terminal.", read: false, link: "/sender/shipments/HHF-88124" },
    { user: sender1._id, type: "match", title: "Smart Match Accepted", message: "Carrier 'Alex Reynolds' accepted HHF-89210.", read: false, link: "/sender/shipments/HHF-89210" },
    { user: sender1._id, type: "shipment", title: "Driver Picked Up", message: "Shipment HHF-91024 is now on its way to Columbus.", read: false, link: "/sender/shipments/HHF-91024" },
    { user: sender1._id, type: "message", title: "New Message", message: "New message from Alex Reynolds about route HHF-89210.", read: true, link: "/sender/messages" },
    { user: sender1._id, type: "payment", title: "Payment Processed", message: "$2,450.00 has been charged for shipment HHF-89210.", read: true },
    { user: sender1._id, type: "rating", title: "New Rating Received", message: "Alex Reynolds rated your shipment 5 stars.", read: true },
    { user: sender1._id, type: "system", title: "Account Verified", message: "Your business account has been fully verified.", read: true },
    { user: sender1._id, type: "shipment", title: "Shipment Created", message: "HHF-90115 from Nashville to Atlanta is awaiting carrier match.", read: false },
    { user: sender1._id, type: "match", title: "Carrier Found", message: "A carrier has been matched for your Nashville to Atlanta route.", read: false, link: "/sender/shipments/HHF-90115" },
    // Sender 2 notifications
    { user: sender2._id, type: "shipment", title: "In Transit", message: "HHF-87543 is en route from Kansas City to St. Louis.", read: false },
    { user: sender2._id, type: "payment", title: "Invoice Paid", message: "Shipment HHF-87543 payment confirmed: $650.00.", read: false },
    { user: sender2._id, type: "shipment", title: "Shipment Delivered", message: "HHF-89004 delivered to Houston terminal.", read: true },
    { user: sender2._id, type: "message", title: "New Message", message: "New message from Elena Vasquez about upcoming trip.", read: true },
    // Driver 1 notifications
    { user: driver1._id, type: "shipment", title: "New delivery matched!", message: "Return trip Huye to Kigali tomorrow.", read: false, link: "/driver/trips" },
    { user: driver1._id, type: "payment", title: "Payment Processed", message: "$840.00 sent to your wallet.", read: false },
    { user: driver1._id, type: "rating", title: "Rating Update", message: "5-star rating from Sterling Global Freight.", read: false },
    { user: driver1._id, type: "message", title: "New Message", message: "Sarah Chen sent a message about HHF-89210.", read: true },
    { user: driver1._id, type: "system", title: "Document Reminder", message: "Your insurance certificate expires in 30 days. Please upload a renewed copy.", read: false },
    { user: driver1._id, type: "shipment", title: "Pickup Confirmed", message: "You're confirmed to pick up HHF-90115 tomorrow in Nashville.", read: false },
    // Driver 2 notifications
    { user: driver2._id, type: "shipment", title: "New Trip Available", message: "Denver to Salt Lake City route available for bidding.", read: false },
    { user: driver2._id, type: "payment", title: "Direct Deposit", message: "$2,100.00 deposited for Dallas to Houston delivery.", read: false },
    { user: driver2._id, type: "rating", title: "Rating Update", message: "4.9 stars from Midwest Logistics Co.", read: true },
    { user: driver2._id, type: "system", title: "Vehicle Inspection", message: "Your annual DOT inspection is due in 2 weeks.", read: false },
    { user: driver2._id, type: "message", title: "New Message", message: "Marcus Johnson sent a message about HHF-87543.", read: true },
  ];

  await Notification.create(notificationsData);
  console.log("Notifications created.\n");

  // ── Conversations & Messages ─────────────────────────────────────

  const conv1 = await Conversation.create({
    participants: [sender1._id, driver1._id],
    shipment: shipments[0]._id,
    lastMessage: "Perfect, I'll see you at 2:30 PM.",
    lastMessageTime: daysAgo(0),
  });

  const conv2 = await Conversation.create({
    participants: [sender2._id, driver2._id],
    shipment: shipments[4]._id,
    lastMessage: "Thanks for the quick delivery!",
    lastMessageTime: daysAgo(1),
  });

  const msgData = [
    { conversation: conv1._id, sender: driver1._id, text: "Hi, I'm interested in the Chicago to St. Louis route. I have a 53' reefer trailer. Can you confirm the package dimensions?", status: "read" },
    { conversation: conv1._id, sender: sender1._id, text: "Sure! It's one standard pallet, 48x40x36. Weighs about 1,200 lbs. Needs to be in St. Louis by 9 PM tonight.", status: "read" },
    { conversation: conv1._id, sender: driver1._id, text: "Got it. I can make that window. Can we do $450? I'm ready to pick it up at 2:30 PM.", status: "read" },
    { conversation: conv1._id, sender: sender1._id, text: "Perfect, I'll see you at 2:30 PM.", status: "delivered" },
    { conversation: conv2._id, sender: driver2._id, text: "Picked up the electronics from Kansas City. ETA to St. Louis is 4 hours.", status: "read" },
    { conversation: conv2._id, sender: sender2._id, text: "Great, keep me posted on the status. The client is eager for delivery.", status: "read" },
    { conversation: conv2._id, sender: driver2._id, text: "Delivered successfully! Dock 7, signed and sealed.", status: "read" },
    { conversation: conv2._id, sender: sender2._id, text: "Thanks for the quick delivery!", status: "read" },
  ];

  await Message.create(msgData);
  console.log("Conversations and messages created.\n");

  // ── Contact Inquiries ────────────────────────────────────────────

  const contactData = [
    { name: "James Wilson", email: "james@farmcoop.org", subject: "Partnership Inquiry", message: "We're a farming cooperative in Iowa looking for reliable long-haul carriers for our seasonal grain shipments. Can you provide information about your platform and pricing?" },
    { name: "Patricia Martinez", email: "patricia@logisticssolutions.com", subject: "Integration Question", message: "Our logistics company uses a custom TMS. Do you offer API integration for automated dispatching and real-time tracking updates?" },
    { name: "Robert Thompson", email: "robert@freshdeliveries.com", message: "Interested in becoming a driver on your platform. I have a refrigerated truck and 10 years of experience. What are your requirements?", subject: "Driver Application" },
  ];

  await Contact.create(contactData);
  console.log("Contact inquiries created.\n");

  // ── Update User Stats ────────────────────────────────────────────

  await User.findByIdAndUpdate(driver1._id, {
    totalDistance: 1240,
    totalDeliveries: 127,
    rating: 4.98,
    onTimeRate: 98.5,
    earnings: 4820,
    isOnline: true,
  });

  await User.findByIdAndUpdate(driver2._id, {
    totalDistance: 860,
    totalDeliveries: 89,
    rating: 4.92,
    onTimeRate: 97.2,
    earnings: 3250,
    isOnline: true,
  });

  console.log("User stats updated.\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║              SEED COMPLETE                              ║");
  console.log("╠══════════════════════════════════════════════════════════╣");
  console.log("║  Senders:                                              ║");
  console.log("║    sarah@sterlingfreight.com / password123              ║");
  console.log("║    marcus@midwestlogistics.com / password123            ║");
  console.log("║                                                        ║");
  console.log("║  Drivers:                                              ║");
  console.log("║    alex@highwayhandoff.com / password123                ║");
  console.log("║    elena@highwayhandoff.com / password123               ║");
  console.log("╚══════════════════════════════════════════════════════════╝");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
