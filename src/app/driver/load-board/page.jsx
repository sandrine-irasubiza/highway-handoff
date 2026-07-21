"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MdSearch,
  MdLocationOn,
  MdFlag,
  MdInventory2,
  MdMonitorWeight,
  MdCalendarToday,
  MdPayments,
  MdHandshake,
  MdCheckCircle,
  MdClose,
  MdLocalShipping,
  MdPerson,
  MdStar,
  MdVerified,
  MdRoute,
  MdMyLocation,
  MdGpsFixed,
  MdFilterList,
  MdArrowForward,
  MdAttachMoney,
  MdLocalOffer,
  MdCancel,
} from "react-icons/md";

export default function DriverLoadBoard() {
  const [availableLoads, setAvailableLoads] = useState([]);
  const [claimedLoads, setClaimedLoads] = useState([]);
  const [driverTrips, setDriverTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [claiming, setClaiming] = useState(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [claimSuccess, setClaimSuccess] = useState(null);
  const [routeFilter, setRouteFilter] = useState("all");
  const [showNegotiateModal, setShowNegotiateModal] = useState(false);
  const [negotiateTarget, setNegotiateTarget] = useState(null);
  const [negotiateAction, setNegotiateAction] = useState("counter");
  const [negotiatePrice, setNegotiatePrice] = useState("");
  const [negotiateMessage, setNegotiateMessage] = useState("");
  const [negotiating, setNegotiating] = useState(false);

  useEffect(() => {
    fetchLoads();
  }, []);

  function fetchLoads() {
    setLoading(true);
    fetch("/api/driver/loads")
      .then((r) => r.json())
      .then((d) => {
        setAvailableLoads(d.availableLoads || []);
        setClaimedLoads(d.claimedLoads || []);
        setDriverTrips(d.driverTrips || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  async function handleClaim() {
    if (!selectedLoad || claiming) return;
    setClaiming(true);
    try {
      const res = await fetch("/api/driver/loads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipmentId: selectedLoad._id }),
      });
      if (res.ok) {
        setClaimSuccess(selectedLoad.trackingId);
        setShowClaimModal(false);
        fetchLoads();
        setTimeout(() => setClaimSuccess(null), 4000);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to claim load");
      }
    } catch {
      alert("Network error");
    } finally {
      setClaiming(false);
      setSelectedLoad(null);
    }
  }

  async function handleNegotiate() {
    if (!negotiateTarget || !negotiatePrice || negotiating) return;
    setNegotiating(true);
    try {
      const res = await fetch("/api/negotiation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipmentId: negotiateTarget._id,
          action: negotiateAction,
          price: Number(negotiatePrice),
          message: negotiateMessage,
        }),
      });
      if (res.ok) {
        setShowNegotiateModal(false);
        setNegotiateTarget(null);
        setNegotiatePrice("");
        setNegotiateMessage("");
        fetchLoads();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to submit negotiation");
      }
    } catch {
      alert("Network error");
    } finally {
      setNegotiating(false);
    }
  }

  function formatDate(d) {
    if (!d) return "Flexible";
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  const filtered = availableLoads.filter((s) => {
    const matchesSearch = !searchQuery || (() => {
      const q = searchQuery.toLowerCase();
      return (
        s.origin?.city?.toLowerCase().includes(q) ||
        s.destination?.city?.toLowerCase().includes(q) ||
        s.trackingId?.toLowerCase().includes(q) ||
        s.packageInfo?.description?.toLowerCase().includes(q)
      );
    })();
    const matchesRoute = routeFilter === "all" ||
      (routeFilter === "on-route" && s.routeMatch?.onRoute) ||
      (routeFilter === "off-route" && !s.routeMatch?.onRoute);
    return matchesSearch && matchesRoute;
  }).sort((a, b) => {
    if (routeFilter === "on-route") {
      const detourA = a.routeMatch?.detour ?? 9999;
      const detourB = b.routeMatch?.detour ?? 9999;
      return detourA - detourB;
    }
    return 0;
  });

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="text-center"><div className="w-10 h-10 border-4 border-primary-container/30 border-t-primary-container rounded-full animate-spin mx-auto mb-4"></div><p className="text-slate-500 font-semibold">Finding available loads...</p></div></div>;

  return (
    <div className="space-y-6 md:space-y-8">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-container via-primary-container to-primary rounded-2xl p-6 md:p-10 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none flex items-center justify-center">
          <MdLocalShipping className="text-[200px]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Live Load Board</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-2">Available Loads</h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl">
            Browse and claim shipments that match your route. Every load is verified and ready for pickup.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-8 mt-6">
            <div>
              <p className="text-2xl md:text-3xl font-black">{availableLoads.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Open Loads</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black">{claimedLoads.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Your Active</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black">
                ${availableLoads.reduce((sum, s) => sum + (s.pricing?.amount || 0), 0).toLocaleString()}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Total Available Payout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Success Toast */}
      {claimSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <MdCheckCircle className="text-2xl" />
          <div>
            <p className="font-bold text-sm">Load Claimed!</p>
            <p className="text-xs text-white/80">{claimSuccess} assigned to you. Check your trips.</p>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          <input
            className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
            placeholder="Search by city, tracking ID, or cargo type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {[
            { key: "all", label: "All Loads" },
            { key: "on-route", label: "On My Route" },
            { key: "off-route", label: "Off Route" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setRouteFilter(f.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                routeFilter === f.key
                  ? "bg-primary-container text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-primary-container hover:text-primary-container"
              }`}
            >
              {f.key === "on-route" && <MdRoute className="text-lg" />}
              {f.key === "off-route" && <MdFilterList className="text-lg" />}
              {f.key === "all" && <MdFilterList className="text-lg" />}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Your Active Routes Summary */}
      {driverTrips.length > 0 && routeFilter === "on-route" && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-primary-container flex items-center gap-2 mb-3">
            <MdRoute className="text-lg" />
            Your Active Routes
          </h3>
          <div className="flex flex-wrap gap-3">
            {driverTrips.map((trip, i) => (
              <div key={i} className="flex items-center gap-2 bg-primary-container/5 border border-primary-container/20 rounded-lg px-3 py-2 text-xs">
                <span className="font-bold text-primary-container">{trip.origin?.city}</span>
                <MdArrowForward className="text-slate-400" />
                <span className="font-bold text-primary-container">{trip.destination?.city}</span>
                {trip.waypoints && trip.waypoints.length > 0 && (
                  <span className="text-slate-400">({trip.waypoints.length} stops)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Loads Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdLocalShipping className="text-4xl text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No Loads Available</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            {searchQuery ? "No loads match your search. Try a different city or route." : "All current loads have been claimed. Check back soon for new shipments."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {filtered.map((load) => (
            <div key={load._id} className="bg-white rounded-2xl border border-slate-200 hover:shadow-lg hover:border-primary-container/30 transition-all group overflow-hidden">
              {/* Card Header - Route */}
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                      <MdRoute className="text-primary-container text-2xl" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Load ID</p>
                      <p className="text-lg font-bold text-primary-container">{load.trackingId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {load.routeMatch?.onRoute && (
                      <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase border border-green-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        On Route
                        {load.routeMatch.detour != null && (
                          <span className="text-green-500 ml-1">({load.routeMatch.detour}mi)</span>
                        )}
                      </span>
                    )}
                    {!load.routeMatch?.onRoute && load.routeMatch?.detour != null && (
                      <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase border border-amber-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                        {load.routeMatch.detour}mi detour
                      </span>
                    )}
                    <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase border border-amber-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      Available
                    </span>
                    {load.negotiation?.status === "pending" && (
                      <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase border border-blue-200 flex items-center gap-1">
                        <MdAttachMoney className="text-sm" />
                        Price Proposal: ${load.negotiation.senderProposedPrice}
                      </span>
                    )}
                    {load.negotiation?.status === "counter_offer" && (
                      <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-[10px] font-bold uppercase border border-purple-200 flex items-center gap-1">
                        <MdLocalOffer className="text-sm" />
                        Counter: ${load.negotiation.driverCounterPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Route Display */}
                <div className="flex gap-4 mb-5 bg-slate-50 rounded-xl p-4">
                  <div className="flex flex-col items-center py-1">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-white shadow-sm"></div>
                    <div className="w-0.5 h-10 bg-slate-200 my-1"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary-container border-2 border-white shadow-sm"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pickup</p>
                      <p className="font-bold text-slate-900">{load.origin?.city}, {load.origin?.state}</p>
                      {load.origin?.address && <p className="text-xs text-slate-500">{load.origin.address}</p>}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivery</p>
                      <p className="font-bold text-slate-900">{load.destination?.city}, {load.destination?.state}</p>
                    </div>
                  </div>
                </div>

                {/* Route Match Info */}
                {load.routeMatch && (
                  <div className="flex items-center gap-3 mb-4 px-4 py-2.5 bg-slate-50 rounded-lg">
                    <MdRoute className="text-primary-container" />
                    <div className="flex-1 text-xs">
                      {load.routeMatch.onRoute ? (
                        <span className="text-green-700 font-semibold">
                          Matches your route to {load.routeMatch.matchingTrip?.destination?.city || "destination"}
                          {load.routeMatch.detour != null && ` (${load.routeMatch.detour}mi detour)`}
                        </span>
                      ) : load.routeMatch.distance ? (
                        <span className="text-slate-600">
                          ~{load.routeMatch.distance}mi from your current route
                        </span>
                      ) : (
                        <span className="text-slate-500">Route match calculating...</span>
                      )}
                    </div>
                    {load.capacityFit !== null && (
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        load.capacityFit
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        {load.capacityFit ? "Fits Vehicle" : "Exceeds Capacity"}
                      </span>
                    )}
                  </div>
                )}

                {/* Quick Info Chips */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center gap-2.5 bg-slate-50 rounded-lg p-2.5">
                    <MdInventory2 className="text-primary-container text-lg" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cargo</p>
                      <p className="text-xs font-bold text-slate-700 truncate">{load.packageInfo?.description || "General Freight"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-slate-50 rounded-lg p-2.5">
                    <MdMonitorWeight className="text-secondary-container text-lg" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight</p>
                      <p className="text-xs font-bold text-slate-700">{load.packageInfo?.weight || "—"} lbs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-slate-50 rounded-lg p-2.5">
                    <MdCalendarToday className="text-primary-container text-lg" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pickup By</p>
                      <p className="text-xs font-bold text-slate-700">{formatDate(load.timing?.pickupDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-slate-50 rounded-lg p-2.5">
                    <MdPayments className="text-secondary-container text-lg" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payout</p>
                      <p className="text-xs font-bold text-green-700">${load.pricing?.amount?.toLocaleString() || "0"}</p>
                    </div>
                  </div>
                </div>

                {/* Sender Info */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <MdPerson className="text-slate-500 text-sm" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">{load.sender?.company || `${load.sender?.firstName || "Unknown"} ${load.sender?.lastName || ""}`}</p>
                      {load.sender?.rating > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-amber-600">
                          <MdStar className="text-[10px]" />
                          <span className="font-bold">{load.sender.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(load.negotiation?.status === "pending" || load.negotiation?.status === "counter_offer") && (
                      <button
                        onClick={() => {
                          setNegotiateTarget(load);
                          setNegotiateAction("counter");
                          setNegotiatePrice("");
                          setNegotiateMessage("");
                          setShowNegotiateModal(true);
                        }}
                        className="bg-white border-2 border-primary-container text-primary-container px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary-container/5 active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <MdLocalOffer className="text-sm" />
                        Negotiate
                      </button>
                    )}
                    <button
                      onClick={() => { setSelectedLoad(load); setShowClaimModal(true); }}
                      className="bg-primary-container text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary-container/90 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <MdHandshake className="text-sm" />
                      Claim Load
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Claim Modal */}
      {showClaimModal && selectedLoad && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowClaimModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8">
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setShowClaimModal(false)}>
              <MdClose className="text-xl" />
            </button>
            <div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MdHandshake className="text-primary-container text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-center text-primary-container mb-2">Claim This Load?</h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              You're about to accept <span className="font-bold text-slate-700">{selectedLoad.trackingId}</span> — {selectedLoad.origin?.city} → {selectedLoad.destination?.city}
            </p>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Distance</span>
                <span className="font-bold text-slate-700">~{selectedLoad.packageInfo?.weight > 1000 ? "300" : "180"} mi</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Weight</span>
                <span className="font-bold text-slate-700">{selectedLoad.packageInfo?.weight || "—"} lbs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Payout</span>
                <span className="font-bold text-green-700">${selectedLoad.pricing?.amount?.toLocaleString() || "0"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Pickup</span>
                <span className="font-bold text-slate-700">{formatDate(selectedLoad.timing?.pickupDate)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClaimModal(false)}
                className="flex-1 py-3 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleClaim}
                disabled={claiming}
                className="flex-1 py-3 bg-primary-container text-white rounded-xl font-bold text-sm hover:bg-primary-container/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {claiming ? "Claiming..." : "Confirm & Claim"}
                {!claiming && <MdCheckCircle className="text-lg" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Negotiation Modal */}
      {showNegotiateModal && negotiateTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowNegotiateModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8">
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setShowNegotiateModal(false)}>
              <MdClose className="text-xl" />
            </button>
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MdLocalOffer className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-center text-primary-container mb-2">Negotiate Price</h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              {negotiateTarget.trackingId} — {negotiateTarget.origin?.city} → {negotiateTarget.destination?.city}
            </p>

            {negotiateTarget.negotiation?.status === "pending" && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-xs font-bold text-blue-700 mb-1">Sender&apos;s Proposed Price</p>
                <p className="text-2xl font-black text-blue-800">${negotiateTarget.negotiation.senderProposedPrice}</p>
                {negotiateTarget.negotiation.message && (
                  <p className="text-xs text-blue-600 mt-2 italic">&ldquo;{negotiateTarget.negotiation.message}&rdquo;</p>
                )}
              </div>
            )}

            {negotiateTarget.negotiation?.status === "counter_offer" && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
                <p className="text-xs font-bold text-purple-700 mb-1">Your Previous Counter</p>
                <p className="text-2xl font-black text-purple-800">${negotiateTarget.negotiation.driverCounterPrice}</p>
                {negotiateTarget.negotiation.message && (
                  <p className="text-xs text-purple-600 mt-2 italic">&ldquo;{negotiateTarget.negotiation.message}&rdquo;</p>
                )}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Counter Price ($)</label>
                <input
                  type="number"
                  value={negotiatePrice}
                  onChange={(e) => setNegotiatePrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-bold focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Message (optional)</label>
                <textarea
                  value={negotiateMessage}
                  onChange={(e) => setNegotiateMessage(e.target.value)}
                  placeholder="Add a note..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowNegotiateModal(false)}
                className="flex-1 py-3 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleNegotiate}
                disabled={negotiating || !negotiatePrice}
                className="flex-1 py-3 bg-primary-container text-white rounded-xl font-bold text-sm hover:bg-primary-container/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {negotiating ? "Sending..." : "Submit Counter-Offer"}
                {!negotiating && <MdLocalOffer className="text-lg" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
