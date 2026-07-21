"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdLocalShipping,
  MdCalendarToday,
  MdSchedule,
  MdSend,
  MdMyLocation,
  MdLocationOn,
  MdInventory2,
  MdDescription,
  MdStraighten,
  MdScale,
  MdAttachMoney,
} from "react-icons/md";

const PACKAGE_TYPES = [
  { value: "small-box", label: "Small Box", icon: MdInventory2 },
  { value: "document", label: "Document", icon: MdDescription },
  { value: "large-parcel", label: "Large Parcel", icon: MdLocalShipping },
];

const DEADLINE_OPTIONS = [
  { value: "same-day", label: "Same Day (Expedited)" },
  { value: "next-day", label: "Next Day Morning" },
  { value: "standard", label: "Standard (3-5 Days)" },
  { value: "flexible", label: "Flexible Window" },
];

export default function CreateShipment() {
  const router = useRouter();
  const [packageType, setPackageType] = useState("small-box");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [deliveryZip, setDeliveryZip] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [deliveryDeadline, setDeliveryDeadline] = useState("standard");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [price, setPrice] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    const missing = [];
    if (!pickupCity) missing.push("Pickup City");
    if (!pickupState) missing.push("Pickup State");
    if (!deliveryCity) missing.push("Delivery City");
    if (!deliveryState) missing.push("Delivery State");
    if (missing.length) {
      alert(`Please fill in: ${missing.join(", ")}`);
      return;
    }
    if (!weight || Number(weight) <= 0) {
      alert("Please enter a valid weight.");
      return;
    }
    if (!pickupDate) {
      alert("Please select a pickup date.");
      return;
    }
    if (!price || Number(price) < 0) {
      alert("Please enter a valid price.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/sender/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: { city: pickupCity, state: pickupState, zip: pickupZip },
          destination: { city: deliveryCity, state: deliveryState, zip: deliveryZip },
          packageInfo: {
            type: packageType,
            weight: Number(weight),
            length: length ? Number(length) : undefined,
            width: width ? Number(width) : undefined,
            height: height ? Number(height) : undefined,
            description,
          },
          timing: { pickupDate, deliveryDeadline },
          pricing: { amount: Number(price) },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Shipment created!\nTracking ID: ${data.shipment.trackingId}`);
        router.push("/sender/shipments");
      } else {
        alert(data.error || "Failed to create shipment");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const pkgLabel =
    PACKAGE_TYPES.find((p) => p.value === packageType)?.label || packageType;
  const dlLabel =
    DEADLINE_OPTIONS.find((d) => d.value === deliveryDeadline)?.label ||
    deliveryDeadline;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shadow-lg shadow-primary-container/30">
            <MdLocalShipping className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Create Shipment
            </h1>
            <p className="text-sm text-slate-500">
              Fill in the details to book a new shipment.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Route */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary-container/10 flex items-center justify-center">
                <MdMyLocation className="text-primary-container text-base" />
              </div>
              <h2 className="text-base font-bold text-slate-800">
                Route Details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-primary-container" />
                  Pickup Location
                </label>
                <input
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                  placeholder="City"
                  type="text"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                    placeholder="State"
                    type="text"
                    value={pickupState}
                    onChange={(e) => setPickupState(e.target.value)}
                  />
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                    placeholder="Zip"
                    type="text"
                    value={pickupZip}
                    onChange={(e) => setPickupZip(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full border-2 border-primary-container" />
                  Delivery Location
                </label>
                <input
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                  placeholder="City"
                  type="text"
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                    placeholder="State"
                    type="text"
                    value={deliveryState}
                    onChange={(e) => setDeliveryState(e.target.value)}
                  />
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                    placeholder="Zip"
                    type="text"
                    value={deliveryZip}
                    onChange={(e) => setDeliveryZip(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Package */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary-container/10 flex items-center justify-center">
                <MdInventory2 className="text-primary-container text-base" />
              </div>
              <h2 className="text-base font-bold text-slate-800">
                Package Information
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                  Package Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {PACKAGE_TYPES.map((pt) => {
                    const Icon = pt.icon;
                    const active = packageType === pt.value;
                    return (
                      <button
                        key={pt.value}
                        onClick={() => setPackageType(pt.value)}
                        className={`relative flex flex-col items-center gap-2 py-5 px-3 rounded-xl border-2 transition-all ${
                          active
                            ? "border-primary-container bg-primary-container/5 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Icon
                          className={`text-2xl ${
                            active
                              ? "text-primary-container"
                              : "text-slate-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-semibold ${
                            active ? "text-primary-container" : "text-slate-600"
                          }`}
                        >
                          {pt.label}
                        </span>
                        {active && (
                          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary-container" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide">
                    <MdScale className="text-sm" />
                    Weight (lbs)
                  </label>
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                    placeholder="0"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide">
                    <MdStraighten className="text-sm" />
                    Dimensions (inches)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      className="w-full border border-slate-200 rounded-xl px-3 py-3 text-sm text-center outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                      placeholder="L"
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                    <input
                      className="w-full border border-slate-200 rounded-xl px-3 py-3 text-sm text-center outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                      placeholder="W"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                    <input
                      className="w-full border border-slate-200 rounded-xl px-3 py-3 text-sm text-center outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                      placeholder="H"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  <MdAttachMoney className="text-sm" />
                  Price (USD)
                </label>
                <input
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </section>
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary-container/10 flex items-center justify-center">
                <MdCalendarToday className="text-primary-container text-base" />
              </div>
              <h2 className="text-base font-bold text-slate-800">Schedule</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Pickup Date
                </label>
                <div className="relative">
                  <MdCalendarToday className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                  <input
                    className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Delivery Deadline
                </label>
                <div className="relative">
                  <MdSchedule className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none" />
                  <select
                    className="w-full border border-slate-200 rounded-xl pl-11 pr-10 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all appearance-none bg-white"
                    value={deliveryDeadline}
                    onChange={(e) => setDeliveryDeadline(e.target.value)}
                  >
                    {DEADLINE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                Description &amp; Notes
              </label>
              <textarea
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all resize-none placeholder:text-slate-400"
                placeholder="Fragile items, handling instructions, access codes..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={sending}
              className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-primary-container to-primary rounded-xl shadow-lg shadow-primary-container/30 hover:shadow-xl hover:shadow-primary-container/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            >
              {sending ? "Creating..." : "Create Shipment"}
            </button>
          </div>
        </div>

        {/* Sidebar Preview */}
        <aside className="lg:col-span-5 lg:sticky lg:top-6 space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-5">
              Shipment Preview
            </h3>

            {/* Route visual */}
            <div className="flex gap-4 mb-6">
              <div className="flex flex-col items-center pt-1">
                <div className="w-3 h-3 rounded-full bg-secondary-container shadow-lg shadow-secondary-container/40" />
                <div className="w-0.5 h-14 bg-gradient-to-b from-secondary-container to-white/20 my-1" />
                <div className="w-3 h-3 rounded-full border-2 border-white/60" />
              </div>
              <div className="space-y-10 flex-1">
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Pickup
                  </p>
                  <p className="text-sm font-semibold mt-0.5">
                    {pickupCity
                      ? `${pickupCity}${pickupState ? `, ${pickupState}` : ""}`
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Delivery
                  </p>
                  <p className="text-sm font-semibold mt-0.5">
                    {deliveryCity
                      ? `${deliveryCity}${deliveryState ? `, ${deliveryState}` : ""}`
                      : "Not set"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-5 border-t border-white/10">
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Package
                </p>
                <p className="text-sm font-semibold mt-1">
                  {pkgLabel}
                  {weight ? ` (${weight} lbs)` : ""}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Service
                </p>
                <p className="text-sm font-semibold mt-1">{dlLabel}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Price
                </p>
                <p className="text-sm font-semibold mt-1 text-emerald-400">
                  ${price ? Number(price).toFixed(2) : "0.00"}
                </p>
              </div>
            </div>

            {pickupDate && (
              <div className="py-4 border-t border-white/10">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Pickup Date
                </p>
                <p className="text-sm font-semibold mt-1">
                  {new Date(pickupDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-white/10">
              <button
                onClick={handleSubmit}
                disabled={sending}
                className="w-full bg-secondary-container hover:bg-secondary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-secondary-container/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdSend className="text-lg" />
                {sending ? "Creating..." : "Create Shipment"}
              </button>
            </div>
          </div>

          {/* Tips card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
              Quick Tips
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 flex-shrink-0" />
                Accurate weight and dimensions help drivers match your shipment.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 flex-shrink-0" />
                Add handling notes for fragile or special items.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 flex-shrink-0" />
                Choose a flexible deadline for more carrier options.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
