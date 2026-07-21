"use client";

import { useState, useEffect } from "react";
import RouteMap from "@/components/RouteMap";
import {
  MdLocalShipping,
  MdPerson,
  MdStar,
  MdVerified,
  MdRoute,
  MdInventory2,
  MdMonitorWeight,
  MdCheckCircle,
  MdClose,
  MdHandshake,
  MdSearch,
  MdDirectionsCar,
  MdSpeed,
  MdGppGood,
  MdNotifications,
  MdArrowForward,
  MdFlashOn,
  MdAttachMoney,
  MdOffer,
} from "react-icons/md";

export default function SmartMatchPage() {
  const [pendingShipments, setPendingShipments] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [matchResults, setMatchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [matching, setMatching] = useState(false);
  const [matchSuccess, setMatchSuccess] = useState(null);
  const [driverSearch, setDriverSearch] = useState("");
  const [routeFilter, setRouteFilter] = useState("all");
  const [negotiateMode, setNegotiateMode] = useState(false);
  const [negotiatePrice, setNegotiatePrice] = useState("");
  const [negotiateMessage, setNegotiateMessage] = useState("");
  const [negotiating, setNegotiating] = useState(false);

  useEffect(() => {
    fetch("/api/sender/smart-match")
      .then((r) => r.json())
      .then((d) => {
        setPendingShipments(d.matches ? d.matches.map((m) => m.shipment) : d.pendingShipments || []);
        setMatchResults(d.matches || []);
        setAvailableDrivers(d.availableDrivers || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleMatch() {
    if (!selectedShipment || !selectedDriver || matching) return;
    setMatching(true);
    try {
      if (negotiateMode && negotiatePrice) {
        const res = await fetch("/api/negotiation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shipmentId: selectedShipment._id,
            action: "propose",
            price: Number(negotiatePrice),
            message: negotiateMessage,
          }),
        });
        if (res.ok) {
          setMatchSuccess("negotiated");
          setShowConfirmModal(false);
          setSelectedShipment(null);
          setSelectedDriver(null);
          setNegotiateMode(false);
          setNegotiatePrice("");
          setNegotiateMessage("");
          const data = await fetch("/api/sender/smart-match").then((r) => r.json());
          setPendingShipments(data.matches ? data.matches.map((m) => m.shipment) : data.pendingShipments || []);
          setMatchResults(data.matches || []);
          setAvailableDrivers(data.availableDrivers || []);
          setTimeout(() => setMatchSuccess(null), 4000);
        } else {
          const err = await res.json();
          alert(err.error || "Failed to send proposal");
        }
      } else {
        const res = await fetch("/api/sender/smart-match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shipmentId: selectedShipment._id,
            driverId: selectedDriver._id,
          }),
        });
        if (res.ok) {
          setMatchSuccess("assigned");
          setShowConfirmModal(false);
          setSelectedShipment(null);
          setSelectedDriver(null);
          const data = await fetch("/api/sender/smart-match").then((r) => r.json());
          setPendingShipments(data.matches ? data.matches.map((m) => m.shipment) : data.pendingShipments || []);
          setMatchResults(data.matches || []);
          setAvailableDrivers(data.availableDrivers || []);
          setTimeout(() => setMatchSuccess(null), 4000);
        } else {
          const err = await res.json();
          alert(err.error || "Failed to assign driver");
        }
      }
    } catch {
      alert("Network error");
    } finally {
      setMatching(false);
    }
  }

  function formatDate(d) {
    if (!d) return "Flexible";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  const filteredDrivers = availableDrivers.filter((d) => {
    if (!driverSearch) return true;
    const q = driverSearch.toLowerCase();
    return (
      d.firstName?.toLowerCase().includes(q) ||
      d.lastName?.toLowerCase().includes(q) ||
      d.carrierType?.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    if (routeFilter === "on-route") {
      const aOnRoute = a.trips?.some(t => t.origin?.city) ? 1 : 0;
      const bOnRoute = b.trips?.some(t => t.origin?.city) ? 1 : 0;
      return bOnRoute - aOnRoute;
    }
    return 0;
  });

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="text-center"><div className="w-10 h-10 border-4 border-primary-container/30 border-t-primary-container rounded-full animate-spin mx-auto mb-4"></div><p className="text-slate-500 font-semibold">Loading marketplace...</p></div></div>;

  return (
    <div className="space-y-6 md:space-y-8">

      {/* Header */}
      <section className="bg-gradient-to-br from-primary-container via-primary-container to-primary rounded-2xl p-6 md:p-10 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none flex items-center justify-center">
          <MdFlashOn className="text-[200px]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Smart Match</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-2">Find Your Carrier</h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl">
            Browse verified carriers and assign them to your pending shipments. Every carrier is rated and tracked.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-8 mt-6">
            <div>
              <p className="text-2xl md:text-3xl font-black">{pendingShipments.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Unmatched Shipments</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black">{availableDrivers.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Available Carriers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Match Success Toast */}
      {matchSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <MdCheckCircle className="text-2xl" />
          <div>
            <p className="font-bold text-sm">{matchSuccess === "negotiated" ? "Proposal Sent!" : "Carrier Assigned!"}</p>
            <p className="text-xs text-white/80">
              {matchSuccess === "negotiated"
                ? "Your price proposal has been sent. The driver will be notified."
                : "The shipment has been matched. The driver is notified."}
            </p>
          </div>
        </div>
      )}

      {/* If no shipments to match */}
      {pendingShipments.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="text-4xl text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">All Matched Up</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            All your shipments have carriers assigned. Create a new shipment to find more carriers.
          </p>
          <a href="/sender/create-shipment" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary-container text-white rounded-xl font-bold text-sm hover:bg-primary-container/90 transition-all">
            Create New Shipment
            <MdArrowForward />
          </a>
        </div>
      )}

      {/* Main Content: Two Column Layout */}
      {pendingShipments.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left: Pending Shipments */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-primary-container flex items-center gap-2">
              <MdLocalShipping className="text-secondary-container" />
              Your Pending Shipments
              <span className="text-xs font-normal text-slate-400">({pendingShipments.length})</span>
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {pendingShipments.map((s) => {
                const isSelected = selectedShipment?._id === s._id;
                return (
                  <button
                    key={s._id}
                    onClick={() => setSelectedShipment(isSelected ? null : s)}
                    className={`w-full text-left bg-white rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                      isSelected
                        ? "border-primary-container bg-primary-container/5 shadow-md"
                        : "border-slate-200 hover:border-primary-container/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-primary-container">{s.trackingId}</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Pending</span>
                    </div>
                    <div className="flex gap-2 items-start mb-2">
                      <div className="flex flex-col items-center gap-0.5 pt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="w-0.5 h-6 bg-slate-200"></div>
                        <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-700">{s.origin?.city}, {s.origin?.state}</p>
                        <p className="text-slate-400">→</p>
                        <p className="font-bold text-slate-700">{s.destination?.city}, {s.destination?.state}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1"><MdInventory2 /> {s.packageInfo?.description?.slice(0, 20) || "Freight"}</span>
                      <span className="flex items-center gap-1"><MdMonitorWeight /> {s.packageInfo?.weight || "—"} lbs</span>
                      <span className="font-bold text-green-700 ml-auto">${s.pricing?.amount?.toLocaleString() || "0"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Available Drivers */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary-container flex items-center gap-2">
                <MdDirectionsCar className="text-secondary-container" />
                Available Carriers
                <span className="text-xs font-normal text-slate-400">({filteredDrivers.length})</span>
              </h3>
            </div>

            {/* Driver Search */}
            <div className="relative">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
                placeholder="Search carriers by name or type..."
                value={driverSearch}
                onChange={(e) => setDriverSearch(e.target.value)}
              />
            </div>

            {/* Route Filter Tabs */}
            <div className="flex gap-2">
              {[
                { key: "all", label: "All Drivers" },
                { key: "on-route", label: "With Active Routes" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setRouteFilter(f.key)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    routeFilter === f.key
                      ? "bg-primary-container text-white shadow-sm"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Driver Cards */}
            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
              {filteredDrivers.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                  <MdPerson className="text-4xl text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No carriers match your search.</p>
                </div>
              ) : (
                filteredDrivers.map((d) => {
                  const isSelected = selectedDriver?._id === d._id;
                  return (
                    <button
                      key={d._id}
                      onClick={() => setSelectedDriver(isSelected ? null : d)}
                      className={`w-full text-left bg-white rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                        isSelected
                          ? "border-secondary-container bg-secondary-container/5 shadow-md"
                          : "border-slate-200 hover:border-secondary-container/30"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 ${
                          d.isOnline ? "bg-primary-container text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                          {(d.firstName?.[0] || "") + (d.lastName?.[0] || "") || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-sm">{d.firstName} {d.lastName}</h4>
                              {d.isOnline && <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>}
                            </div>
                            <div className="flex items-center gap-1 text-amber-600">
                              <MdStar className="text-sm" />
                              <span className="font-bold text-sm">{d.rating?.toFixed(2) || "—"}</span>
                            </div>
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                            {d.carrierType === "heavy-haul" ? "Heavy-Haul" : d.carrierType === "fleet" ? "Fleet Operator" : "Independent Carrier"}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-2 text-[10px]">
                            <span className="flex items-center gap-1 text-slate-500">
                              <MdVerified className="text-green-600" />
                              {d.onTimeRate || 0}% on-time
                            </span>
                            <span className="flex items-center gap-1 text-slate-500">
                              <MdGppGood />
                              {d.totalDeliveries || 0} deliveries
                            </span>
                            {d.vehicleInfo?.make && (
                              <span className="flex items-center gap-1 text-slate-500">
                                <MdDirectionsCar />
                                {d.vehicleInfo.make}
                              </span>
                            )}
                          </div>
                          {d.trips && d.trips.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-slate-100">
                              <p className="text-[10px] font-bold text-primary-container uppercase tracking-widest mb-1">
                                Active Routes
                              </p>
                              {d.trips.slice(0, 2).map((trip, i) => (
                                <div key={i} className="flex items-center gap-2 text-[10px] text-slate-600">
                                  <MdRoute className="text-primary-container text-xs" />
                                  <span className="font-semibold">{trip.origin?.city}</span>
                                  <MdArrowForward className="text-slate-300 text-xs" />
                                  <span className="font-semibold">{trip.destination?.city}</span>
                                  {trip.waypoints && trip.waypoints.length > 0 && (
                                    <span className="text-slate-400">(+{trip.waypoints.length} stops)</span>
                                  )}
                                  <span className="text-slate-400 ml-auto">{trip.status === "in_progress" ? "In Transit" : "Scheduled"}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Route Map Preview for Selected Driver */}
      {selectedDriver && selectedDriver.trips && selectedDriver.trips.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-12">
            <RouteMap
              origin={selectedDriver.trips[0].origin}
              destination={selectedDriver.trips[0].destination}
              waypoints={selectedDriver.trips[0].waypoints || []}
              compact={true}
            />
          </div>
        </div>
      )}

      {/* Sticky Bottom Match Bar */}
      {selectedShipment && selectedDriver && (
        <div className="sticky bottom-4 bg-white rounded-2xl border-2 border-primary-container/30 shadow-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <MdCheckCircle className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Ready to Match</p>
              <p className="text-xs text-slate-500">
                {selectedShipment.trackingId} → {selectedDriver.firstName} {selectedDriver.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSelectedShipment(null); setSelectedDriver(null); }}
              className="px-5 py-2.5 border-2 border-slate-200 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-secondary-container to-orange-500 text-white rounded-xl font-bold text-xs shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
            >
              <MdHandshake className="text-sm" />
              Confirm Match
            </button>
          </div>
        </div>
      )}

      {/* Confirm Match Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8">
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" onClick={() => setShowConfirmModal(false)}>
              <MdClose className="text-xl" />
            </button>
            <div className="w-16 h-16 bg-secondary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MdHandshake className="text-secondary-container text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-center text-primary-container mb-2">
              {negotiateMode ? "Propose a Price" : "Assign Carrier"}
            </h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              {negotiateMode ? (
                <>Send a price proposal to <span className="font-bold text-slate-700">{selectedDriver.firstName} {selectedDriver.lastName}</span></>
              ) : (
                <>You&apos;re assigning <span className="font-bold text-slate-700">{selectedDriver.firstName} {selectedDriver.lastName}</span> to shipment <span className="font-bold text-slate-700">{selectedShipment.trackingId}</span></>
              )}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Shipment</p>
                <p className="font-bold text-sm text-slate-900">{selectedShipment.trackingId}</p>
                <p className="text-xs text-slate-500 mt-1">{selectedShipment.origin?.city} → {selectedShipment.destination?.city}</p>
                <p className="text-xs text-slate-500 mt-1">Listed: ${selectedShipment.pricing?.amount?.toLocaleString() || "0"}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Carrier</p>
                <p className="font-bold text-sm text-slate-900">{selectedDriver.firstName} {selectedDriver.lastName}</p>
                <p className="text-xs text-slate-500 mt-1 capitalize">{selectedDriver.carrierType || "Independent"}</p>
                <div className="flex items-center gap-1 text-amber-600 text-xs mt-1">
                  <MdStar className="text-[10px]" />
                  <span className="font-bold">{selectedDriver.rating?.toFixed(2) || "—"}</span>
                </div>
              </div>
            </div>

            {/* Negotiate vs Direct Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setNegotiateMode(false)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  !negotiateMode
                    ? "bg-primary-container text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                Direct Assign
              </button>
              <button
                onClick={() => setNegotiateMode(true)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  negotiateMode
                    ? "bg-secondary-container text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                <MdAttachMoney className="inline mr-1" />
                Negotiate Price
              </button>
            </div>

            {negotiateMode && (
              <div className="space-y-3 mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1 block">Your Proposed Price</label>
                  <div className="relative">
                    <MdAttachMoney className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-secondary-container"
                      placeholder="0.00"
                      value={negotiatePrice}
                      onChange={(e) => setNegotiatePrice(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1 block">Message (optional)</label>
                  <textarea
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-secondary-container resize-none"
                    rows={2}
                    placeholder="Any message for the driver..."
                    value={negotiateMessage}
                    onChange={(e) => setNegotiateMessage(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowConfirmModal(false); setNegotiateMode(false); }}
                className="flex-1 py-3 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleMatch}
                disabled={matching || (negotiateMode && (!negotiatePrice || Number(negotiatePrice) <= 0))}
                className="flex-1 py-3 bg-gradient-to-r from-secondary-container to-orange-500 text-white rounded-xl font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {matching ? "Sending..." : negotiateMode ? "Send Proposal" : "Assign Carrier"}
                {!matching && <MdCheckCircle className="text-lg" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
