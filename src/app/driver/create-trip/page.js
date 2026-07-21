"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdAdd,
  MdRemove,
  MdMyLocation,
  MdLocationOn,
  MdDirectionsCar,
  MdSend,
  MdArrowUpward,
  MdArrowDownward,
  MdCheckCircle,
} from "react-icons/md";

const COMMON_CITIES = [
  "Chicago", "St. Louis", "Indianapolis", "Columbus", "Cleveland",
  "Nashville", "Atlanta", "Kansas City", "Memphis", "Dallas",
  "Houston", "Denver", "Salt Lake City", "Milwaukee", "Detroit",
  "Pittsburgh", "Cincinnati", "Louisville", "Minneapolis", "Omaha",
  "Oklahoma City", "Little Rock", "Birmingham", "Charlotte",
  "Jacksonville", "Tampa", "Miami", "New Orleans", "San Antonio",
  "Phoenix", "Albuquerque", "Las Vegas", "Los Angeles", "San Francisco",
  "Portland", "Seattle", "Boise", "Billings", "Fargo",
];

export default function CreateTrip() {
  const router = useRouter();
  const [originCity, setOriginCity] = useState("");
  const [originState, setOriginState] = useState("");
  const [destCity, setDestCity] = useState("");
  const [destState, setDestState] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [sending, setSending] = useState(false);

  function addWaypoint() {
    setWaypoints([...waypoints, { city: "", state: "" }]);
  }

  function removeWaypoint(index) {
    setWaypoints(waypoints.filter((_, i) => i !== index));
  }

  function updateWaypoint(index, field, value) {
    const updated = [...waypoints];
    updated[index] = { ...updated[index], [field]: value };
    setWaypoints(updated);
  }

  function moveWaypoint(index, direction) {
    const updated = [...waypoints];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setWaypoints(updated);
  }

  const handleSubmit = async () => {
    const missing = [];
    if (!originCity) missing.push("Origin City");
    if (!originState) missing.push("Origin State");
    if (!destCity) missing.push("Destination City");
    if (!destState) missing.push("Destination State");
    if (missing.length) {
      alert(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    const validWaypoints = waypoints.filter((w) => w.city && w.state);

    setSending(true);
    try {
      const res = await fetch("/api/driver/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: { city: originCity, state: originState },
          destination: { city: destCity, state: destState },
          waypoints: validWaypoints,
          date: tripDate || new Date().toISOString(),
          capacityAvailable: capacity ? Number(capacity) : 0,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Trip created successfully!");
        router.push("/driver/trips");
      } else {
        alert(data.error || "Failed to create trip");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const routePoints = [
    { city: originCity, state: originState, type: "origin" },
    ...waypoints.map((w, i) => ({ ...w, type: "waypoint", index: i })),
    { city: destCity, state: destState, type: "destination" },
  ].filter((p) => p.city);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shadow-lg shadow-primary-container/30">
            <MdDirectionsCar className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Create Trip</h1>
            <p className="text-sm text-slate-500">
              Post your route so senders can find you along the way.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* Origin */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary-container/10 flex items-center justify-center">
                <MdMyLocation className="text-primary-container text-base" />
              </div>
              <h2 className="text-base font-bold text-slate-800">Origin</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">City</label>
                <input
                  list="cities"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                  placeholder="e.g. Chicago"
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">State</label>
                <input
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                  placeholder="e.g. IL"
                  value={originState}
                  onChange={(e) => setOriginState(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Waypoints */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary-container/10 flex items-center justify-center">
                  <MdLocationOn className="text-secondary-container text-base" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Waypoints (Stops Along Route)</h2>
                  <p className="text-xs text-slate-400">Add intermediate stops where you can pick up/drop off packages</p>
                </div>
              </div>
              <button
                onClick={addWaypoint}
                className="flex items-center gap-1.5 px-4 py-2 bg-secondary-container text-white text-xs font-bold rounded-lg hover:bg-secondary transition-colors shadow-sm"
              >
                <MdAdd className="text-sm" />
                Add Stop
              </button>
            </div>

            {waypoints.length === 0 && (
              <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                <MdLocationOn className="text-3xl mx-auto mb-2 text-slate-300" />
                <p className="text-sm">No stops added yet. Click &quot;Add Stop&quot; to add waypoints.</p>
              </div>
            )}

            <div className="space-y-4">
              {waypoints.map((wp, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveWaypoint(index, -1)}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-primary-container disabled:opacity-30 transition-colors"
                    >
                      <MdArrowUpward className="text-sm" />
                    </button>
                    <button
                      onClick={() => moveWaypoint(index, 1)}
                      disabled={index === waypoints.length - 1}
                      className="p-1 text-slate-400 hover:text-primary-container disabled:opacity-30 transition-colors"
                    >
                      <MdArrowDownward className="text-sm" />
                    </button>
                  </div>
                  <div className="w-8 h-8 bg-secondary-container/10 rounded-full flex items-center justify-center text-secondary-container text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <input
                      list="cities"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-secondary-container transition-all placeholder:text-slate-400"
                      placeholder="City"
                      value={wp.city}
                      onChange={(e) => updateWaypoint(index, "city", e.target.value)}
                    />
                    <input
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-secondary-container transition-all placeholder:text-slate-400"
                      placeholder="State"
                      value={wp.state}
                      onChange={(e) => updateWaypoint(index, "state", e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => removeWaypoint(index)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <MdRemove className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Destination */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary-container/10 flex items-center justify-center">
                <MdLocationOn className="text-primary-container text-base" />
              </div>
              <h2 className="text-base font-bold text-slate-800">Destination</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">City</label>
                <input
                  list="cities"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                  placeholder="e.g. St. Louis"
                  value={destCity}
                  onChange={(e) => setDestCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">State</label>
                <input
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                  placeholder="e.g. MO"
                  value={destState}
                  onChange={(e) => setDestState(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Schedule & Capacity */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary-container/10 flex items-center justify-center">
                <MdDirectionsCar className="text-primary-container text-base" />
              </div>
              <h2 className="text-base font-bold text-slate-800">Trip Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Trip Date</label>
                <input
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all"
                  type="date"
                  value={tripDate}
                  onChange={(e) => setTripDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Available Capacity (lbs)</label>
                <input
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all placeholder:text-slate-400"
                  type="number"
                  placeholder="0"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
            </div>
          </section>

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
              className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-primary-container to-primary rounded-xl shadow-lg shadow-primary-container/30 hover:shadow-xl hover:shadow-primary-container/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <MdSend className="text-lg" />
              {sending ? "Creating..." : "Create Trip"}
            </button>
          </div>
        </div>

        {/* Sidebar Route Preview */}
        <aside className="lg:col-span-5 lg:sticky lg:top-6 space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-5">
              Route Preview
            </h3>
            <div className="space-y-0">
              {routePoints.map((point, i) => {
                const isLast = i === routePoints.length - 1;
                const isOrigin = point.type === "origin";
                const isDest = point.type === "destination";
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        isOrigin ? "bg-secondary-container shadow-lg shadow-secondary-container/40" :
                        isDest ? "border-2 border-white/60" :
                        "bg-white/40"
                      }`} />
                      {!isLast && <div className="w-0.5 h-10 bg-gradient-to-b from-white/30 to-white/10 my-1" />}
                    </div>
                    <div className={`pb-4 ${isLast ? "" : ""}`}>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        {isOrigin ? "Origin" : isDest ? "Destination" : `Stop ${point.index + 1}`}
                      </p>
                      <p className="text-sm font-semibold mt-0.5">
                        {point.city || "Not set"}{point.state ? `, ${point.state}` : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
              {routePoints.length === 0 && (
                <p className="text-white/30 text-sm text-center py-4">Enter origin to see route preview</p>
              )}
            </div>

            {tripDate && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Trip Date</p>
                <p className="text-sm font-semibold mt-1">
                  {new Date(tripDate).toLocaleDateString("en-US", {
                    weekday: "short", month: "short", day: "numeric", year: "numeric",
                  })}
                </p>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-white/10">
              <button
                onClick={handleSubmit}
                disabled={sending}
                className="w-full bg-secondary-container hover:bg-secondary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-secondary-container/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <MdSend className="text-lg" />
                {sending ? "Creating..." : "Create Trip"}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <datalist id="cities">
        {COMMON_CITIES.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>
    </div>
  );
}
