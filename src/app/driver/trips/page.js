"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  MdLocalShipping,
  MdInventory2,
  MdCheckCircle,
  MdSchedule,
  MdCelebration,
  MdArrowForward,
  MdDirectionsCar,
  MdAttachMoney,
  MdCancel,
  MdPlayArrow,
  MdClose,
  MdPerson,
  MdPhone,
  MdMail,
  MdInventory,
  MdTimeline,
  MdPlace,
  MdAccessTime,
  MdInfo,
  MdAddLocation,
  MdRoute,
} from "react-icons/md";

const TRIP_STATUS_COLORS = {
  scheduled: "text-blue-600 bg-blue-50 border-blue-200",
  in_progress: "text-amber-600 bg-amber-50 border-amber-200",
  completed: "text-emerald-600 bg-emerald-50 border-emerald-200",
  cancelled: "text-slate-500 bg-slate-50 border-slate-200",
};

const TRIP_STATUS_LABELS = {
  scheduled: "Scheduled",
  in_progress: "In Transit",
  completed: "Delivered",
  cancelled: "Cancelled",
};

const SHIPMENT_STATUS_STEPS = [
  { key: "accepted", label: "Accepted", icon: MdCheckCircle, color: "bg-blue-500" },
  { key: "picked_up", label: "Picked Up", icon: MdInventory2, color: "bg-orange-500" },
  { key: "in_transit", label: "In Transit", icon: MdLocalShipping, color: "bg-indigo-600" },
  { key: "delivered", label: "Delivered", icon: MdCelebration, color: "bg-emerald-500" },
];

const STEP_ORDER = ["accepted", "picked_up", "in_transit", "delivered"];

function formatDate(d) {
  if (!d) return "\u2014";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function formatDateTime(d) {
  if (!d) return "\u2014";
  return `${formatDate(d)} at ${new Date(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
}

function formatTimeAgo(d) {
  if (!d) return "";
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const CONFETTI_COLORS = [
  "bg-emerald-400", "bg-blue-400", "bg-amber-400", "bg-pink-400", "bg-purple-400",
];

const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: ((i * 37 + 13) % 100),
  delay: ((i * 7) % 10) * 0.07,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: ((i * 3 + 5) % 8) + 4,
  duration: ((i * 11) % 10) * 0.15 + 1,
}));

function ConfettiOverlay({ show }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((p) => (
        <div
          key={p.id}
          className={`absolute top-0 ${p.color} rounded-sm animate-bounce`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

function TripDetailModal({ trip, onClose }) {
  if (!trip) return null;
  const shipment = trip.shipment;
  const sender = shipment?.sender;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-lg font-extrabold text-slate-900">Trip Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <MdClose className="text-xl text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-container/10 flex items-center justify-center">
              <MdLocalShipping className="text-2xl text-primary-container" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Route</p>
              <p className="text-lg font-extrabold text-slate-900">
                {trip.origin?.city || "?"}
                <MdArrowForward className="inline mx-2 text-slate-300" />
                {trip.destination?.city || "?"}
              </p>
              {trip.origin?.state && trip.destination?.state && (
                <p className="text-xs text-slate-400">{trip.origin.state} → {trip.destination.state}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
              <p className="font-bold text-slate-700">{formatDateTime(trip.date)}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Earnings</p>
              <p className="font-bold text-emerald-600 text-lg">${(trip.earnings || 0).toFixed(2)}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Distance</p>
              <p className="font-bold text-slate-700">{trip.distance ? `${trip.distance} mi` : "Not set"}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full border ${TRIP_STATUS_COLORS[trip.status]}`}>
                {TRIP_STATUS_LABELS[trip.status]}
              </span>
            </div>
          </div>

          {trip.waypoints && trip.waypoints.length > 0 && (
            <div className="border-t border-slate-100 pt-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <MdRoute className="text-sm" />
                Route Stops
              </p>
              <div className="space-y-0">
                {trip.waypoints.map((wp, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 bg-secondary-container/10 rounded-full flex items-center justify-center text-secondary-container text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <span className="font-semibold text-slate-700">{wp.city}, {wp.state}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      wp.status === "arrived" ? "bg-green-50 text-green-700" :
                      wp.status === "departed" ? "bg-blue-50 text-blue-700" :
                      "bg-slate-100 text-slate-500"
                    }`}>
                      {wp.status || "pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {shipment && (
            <div className="border-t border-slate-100 pt-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Package Info</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <MdInventory className="text-slate-400" />
                  <span className="text-slate-500">Type:</span>
                  <span className="font-bold text-slate-700 capitalize">{shipment.packageInfo?.type?.replace("-", " ") || "—"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MdTimeline className="text-slate-400" />
                  <span className="text-slate-500">Weight:</span>
                  <span className="font-bold text-slate-700">{shipment.packageInfo?.weight ? `${shipment.packageInfo.weight} kg` : "—"}</span>
                </div>
                {shipment.packageInfo?.description && (
                  <div className="col-span-2 flex items-start gap-2 text-sm">
                    <MdInfo className="text-slate-400 mt-0.5" />
                    <span className="text-slate-500">Description:</span>
                    <span className="font-bold text-slate-700">{shipment.packageInfo.description}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <MdAttachMoney className="text-slate-400" />
                  <span className="text-slate-500">Price:</span>
                  <span className="font-bold text-slate-700">${(shipment.pricing?.amount || 0).toFixed(2)}</span>
                </div>
                {shipment.trackingId && (
                  <div className="flex items-center gap-2 text-sm">
                    <MdLocalShipping className="text-slate-400" />
                    <span className="text-slate-500">Tracking:</span>
                    <span className="font-bold text-primary-container">{shipment.trackingId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {sender && (
            <div className="border-t border-slate-100 pt-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sender</p>
              <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-sm">
                  {(sender.firstName?.[0] || "") + (sender.lastName?.[0] || "")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-700">{sender.firstName} {sender.lastName}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    {sender.phone && (
                      <span className="flex items-center gap-1">
                        <MdPhone className="text-sm" /> {sender.phone}
                      </span>
                    )}
                    {sender.email && (
                      <span className="flex items-center gap-1 truncate">
                        <MdMail className="text-sm" /> {sender.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TripsPage() {
  const [activeTrip, setActiveTrip] = useState(null);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [tripHistory, setTripHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [historyFilter, setHistoryFilter] = useState("all");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/driver/trips");
      if (!res.ok) return;
      const api = await res.json();
      setActiveTrip(api.activeTrip || null);
      setUpcomingTrips(api.upcomingTrips || []);
      setTripHistory(api.tripHistory || []);
      setStats(api.stats || null);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      await fetchData();
    };
    load();
    const interval = setInterval(load, 15000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [fetchData]);

  const handleStatusUpdate = useCallback(async (shipmentId, nextStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/driver/shipments/${shipmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to update status");
        return;
      }
      await fetchData();
      if (nextStatus === "delivered") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setUpdating(false);
    }
  }, [fetchData]);

  const handleStartTrip = useCallback(async (tripId) => {
    if (!confirm("Start this trip? This will mark it as in progress.")) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/driver/trips/${tripId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "in_progress" }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to start trip");
        return;
      }
      await fetchData();
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setUpdating(false);
    }
  }, [fetchData]);

  const handleCancelTrip = useCallback(async (tripId) => {
    if (!confirm("Cancel this trip? This cannot be undone.")) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/driver/trips/${tripId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to cancel trip");
        return;
      }
      await fetchData();
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setUpdating(false);
    }
  }, [fetchData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-20 mb-3" />
              <div className="h-8 bg-slate-100 rounded w-16" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 animate-pulse">
          <div className="h-6 bg-slate-100 rounded w-40 mb-4" />
          <div className="h-4 bg-slate-100 rounded w-full mb-2" />
          <div className="h-4 bg-slate-100 rounded w-3/4" />
        </div>
      </div>
    );
  }

  const shipment = activeTrip?.shipment;
  const activeIdx = shipment ? STEP_ORDER.indexOf(shipment.status) : -1;
  const nextStatus = activeIdx >= 0 && activeIdx < STEP_ORDER.length - 1 ? STEP_ORDER[activeIdx + 1] : null;
  const isDelivered = shipment?.status === "delivered";

  const actionLabels = {
    picked_up: "Mark as Picked Up",
    in_transit: "Start Delivery",
    delivered: "Mark as Delivered",
  };
  const actionIcons = {
    picked_up: MdInventory2,
    in_transit: MdLocalShipping,
    delivered: MdCelebration,
  };
  const actionColors = {
    picked_up: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/30",
    in_transit: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30",
    delivered: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30",
  };

  const filteredHistory = historyFilter === "all"
    ? tripHistory
    : tripHistory.filter((t) => t.status === historyFilter);

  return (
    <div className="space-y-8">
      <ConfettiOverlay show={showConfetti} />
      <TripDetailModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />

      {/* Summary Stats */}
      {stats && (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Trips</p>
              <MdLocalShipping className="text-slate-300" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{stats.total}</p>
            <p className="text-xs text-slate-400 mt-1">{stats.completed} completed</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</p>
              <MdDirectionsCar className="text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold text-amber-600">{stats.inProgress + stats.scheduled}</p>
            <p className="text-xs text-slate-400 mt-1">{stats.inProgress} in transit, {stats.scheduled} scheduled</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Earnings</p>
              <MdAttachMoney className="text-emerald-500" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-600">${(stats.totalEarnings || 0).toFixed(0)}</p>
            <p className="text-xs text-slate-400 mt-1">From completed + active trips</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cancelled</p>
              <MdCancel className="text-slate-400" />
            </div>
            <p className="text-3xl font-extrabold text-slate-500">{stats.cancelled}</p>
            <p className="text-xs text-slate-400 mt-1">
              {stats.total > 0 ? `${((stats.cancelled / stats.total) * 100).toFixed(0)}% cancel rate` : "No trips yet"}
            </p>
          </div>
        </section>
      )}

      {/* Active Trip */}
      {activeTrip && (
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shadow-lg shadow-amber-500/30" />
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Active Trip</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 overflow-hidden">
            {shipment && (
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      shipment.status === "in_transit" ? "bg-indigo-100 text-indigo-600" :
                      shipment.status === "picked_up" ? "bg-orange-100 text-orange-500" :
                      shipment.status === "delivered" ? "bg-emerald-100 text-emerald-500" :
                      "bg-blue-100 text-blue-500"
                    }`}>
                      {shipment.status === "in_transit" ? <MdLocalShipping className="text-3xl" /> :
                       shipment.status === "picked_up" ? <MdInventory2 className="text-3xl" /> :
                       shipment.status === "delivered" ? <MdCelebration className="text-3xl" /> :
                       <MdCheckCircle className="text-3xl" />}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tracking ID</p>
                      <h3 className="text-xl font-extrabold text-slate-900">{shipment.trackingId}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">
                        <span className="font-bold">{shipment.origin?.city || "?"}</span>
                        <MdArrowForward className="inline mx-1.5 text-slate-300" />
                        <span className="font-bold">{shipment.destination?.city || "?"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-4 py-2 rounded-full border ${TRIP_STATUS_COLORS[activeTrip.status]}`}>
                      {TRIP_STATUS_LABELS[activeTrip.status]}
                    </span>
                    {shipment.timing?.pickupDate && (
                      <span className="text-xs font-semibold text-slate-400">
                        Pickup: {formatDate(shipment.timing.pickupDate)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sender Info */}
                {shipment.sender && (
                  <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-xs">
                      {(shipment.sender.firstName?.[0] || "") + (shipment.sender.lastName?.[0] || "")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-700">{shipment.sender.firstName} {shipment.sender.lastName}</p>
                      <p className="text-xs text-slate-400">Sender</p>
                    </div>
                    {shipment.sender.phone && (
                      <a href={`tel:${shipment.sender.phone}`} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <MdPhone className="text-slate-500" />
                      </a>
                    )}
                  </div>
                )}

                {/* Status Stepper */}
                <div className="mb-8">
                  <div className="relative">
                    <div className="absolute top-4 left-0 right-0 h-1 bg-slate-100 rounded-full" />
                    <div
                      className="absolute top-4 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${isDelivered ? 100 : activeIdx >= 0 ? (activeIdx / (STEP_ORDER.length - 1)) * 100 : 0}%` }}
                    />
                    <div className="flex justify-between relative">
                      {SHIPMENT_STATUS_STEPS.map((step, i) => {
                        const isActive = i <= activeIdx;
                        const isCurrent = i === activeIdx;
                        const Icon = step.icon;
                        return (
                          <div key={step.key} className="flex flex-col items-center">
                            <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                              isDelivered && i === STEP_ORDER.length - 1
                                ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/30"
                                : isCurrent
                                  ? `${step.color} text-white scale-110 shadow-lg`
                                  : isActive
                                    ? `${step.color} text-white`
                                    : "bg-slate-100 text-slate-300"
                            }`}>
                              <Icon className={`text-lg ${isCurrent ? "animate-bounce" : ""}`} />
                            </div>
                            <span className={`mt-2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                              isActive ? "text-slate-700" : "text-slate-300"
                            }`}>
                              {step.label}
                            </span>
                            {isCurrent && nextStatus && (
                              <span className="text-[9px] font-bold text-indigo-500 animate-pulse mt-0.5">CURRENT</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cargo</p>
                    <p className="font-bold text-slate-700 text-sm">{shipment.packageInfo?.description || shipment.packageInfo?.type?.replace("-", " ") || "\u2014"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                    <p className="font-bold text-slate-700 text-sm">{shipment.packageInfo?.weight ? `${shipment.packageInfo.weight} kg` : "\u2014"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Delivery By</p>
                    <p className="font-bold text-slate-700 text-sm">{formatDate(shipment.timing?.deliveryDeadline) || "\u2014"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Earnings</p>
                    <p className="font-bold text-emerald-600 text-lg">${(activeTrip.earnings || 0).toFixed(2)}</p>
                  </div>
                </div>

                {/* Action Button */}
                {nextStatus && !isDelivered && (
                  <button
                    onClick={() => handleStatusUpdate(shipment._id, nextStatus)}
                    disabled={updating}
                    className={`w-full ${actionColors[nextStatus]} text-white font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg`}
                  >
                    {updating ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        {(() => { const Icon = actionIcons[nextStatus]; return <Icon className="text-xl" />; })()}
                        {actionLabels[nextStatus]}
                      </>
                    )}
                  </button>
                )}

                {isDelivered && (
                  <div className="w-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-emerald-700 font-bold text-sm rounded-xl px-8 py-5 flex items-center justify-center gap-3">
                    <MdCelebration className="text-2xl text-emerald-500" />
                    Shipment Delivered Successfully
                    <MdCheckCircle className="text-2xl text-emerald-500" />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* No Active Trip */}
      {!activeTrip && !loading && (
        <section className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <MdLocalShipping className="text-6xl text-slate-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">No Active Trip</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            You don&apos;t have any trips in progress right now.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/driver/load-board"
              className="inline-flex items-center gap-2 bg-primary-container text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-primary-container/20"
            >
              Browse Load Board <MdArrowForward className="text-lg" />
            </Link>
            <Link
              href="/driver/create-trip"
              className="inline-flex items-center gap-2 bg-secondary-container text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-secondary transition-colors shadow-lg shadow-secondary-container/20"
            >
              <MdAddLocation className="text-lg" /> Create Trip
            </Link>
          </div>
        </section>
      )}

      {/* Upcoming Trips */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <MdSchedule className="text-xl text-blue-500" />
            Upcoming Trips
            {upcomingTrips.length > 0 && (
              <span className="text-sm font-bold text-slate-400 ml-1">({upcomingTrips.length})</span>
            )}
          </h2>
        </div>
        {upcomingTrips.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 p-8 text-center">
            <MdSchedule className="text-4xl text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No upcoming trips scheduled.</p>
            <Link href="/driver/load-board" className="inline-flex items-center gap-1 text-sm font-bold text-primary-container mt-3 hover:underline">
              Find loads <MdArrowForward className="text-sm" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingTrips.map((trip, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all cursor-pointer group"
                onClick={() => setSelectedTrip(trip)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <span>{trip.origin?.city || "?"}</span>
                    <MdArrowForward className="text-slate-300" />
                    <span>{trip.destination?.city || "?"}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${TRIP_STATUS_COLORS[trip.status]}`}>
                    {TRIP_STATUS_LABELS[trip.status]}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  <MdAccessTime className="inline mr-1" />
                  {formatDateTime(trip.date)}
                </p>
                <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {trip.packages > 0 && (
                      <span className="flex items-center gap-1">
                        <MdInventory className="text-sm" /> {trip.packages}
                      </span>
                    )}
                    {trip.distance > 0 && (
                      <span className="flex items-center gap-1">
                        <MdPlace className="text-sm" /> {trip.distance} mi
                      </span>
                    )}
                    {trip.waypoints && trip.waypoints.length > 0 && (
                      <span className="flex items-center gap-1">
                        <MdRoute className="text-sm" /> {trip.waypoints.length} stops
                      </span>
                    )}
                    {trip.shipment?.trackingId && (
                      <span className="font-bold text-primary-container">{trip.shipment.trackingId}</span>
                    )}
                  </div>
                  <span className="font-bold text-emerald-600">${(trip.earnings || 0).toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleStartTrip(trip._id)}
                    disabled={updating}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-primary-container text-white text-xs font-bold py-2.5 rounded-lg hover:bg-primary transition-colors disabled:opacity-50"
                  >
                    <MdPlayArrow className="text-base" /> Start
                  </button>
                  <button
                    onClick={() => handleCancelTrip(trip._id)}
                    disabled={updating}
                    className="flex items-center justify-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-bold py-2.5 px-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    <MdCancel className="text-base" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trip History */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <MdCheckCircle className="text-xl text-emerald-500" />
            Trip History
            {tripHistory.length > 0 && (
              <span className="text-sm font-bold text-slate-400 ml-1">({tripHistory.length})</span>
            )}
          </h2>
          {tripHistory.length > 0 && (
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              {["all", "completed", "cancelled"].map((f) => (
                <button
                  key={f}
                  onClick={() => setHistoryFilter(f)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${
                    historyFilter === f
                      ? "bg-white text-slate-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
        {filteredHistory.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 p-8 text-center">
            <MdCheckCircle className="text-4xl text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-400">
              {historyFilter === "all" ? "No trip history yet." : `No ${historyFilter} trips.`}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Route</th>
                    <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Package</th>
                    <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider">Earnings</th>
                    <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredHistory.map((trip, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedTrip(trip)}
                    >
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {trip.origin?.city || "?"} <MdArrowForward className="inline mx-1 text-slate-300" /> {trip.destination?.city || "?"}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{formatDate(trip.date)}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {trip.shipment?.trackingId || "—"}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">${(trip.earnings || 0).toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          TRIP_STATUS_COLORS[trip.status] || TRIP_STATUS_COLORS.completed
                        }`}>
                          {TRIP_STATUS_LABELS[trip.status] || trip.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
