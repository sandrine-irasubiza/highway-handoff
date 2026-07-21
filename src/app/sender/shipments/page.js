"use client";

import { useState, useEffect, useRef } from "react";
import {
  MdFilterList,
  MdFileDownload,
  MdLocalShipping,
  MdNearMe,
  MdForum,
  MdArrowForward,
  MdStar,
  MdChevronLeft,
  MdChevronRight,
  MdCheckCircle,
  MdInventory2,
  MdCelebration,
  MdErrorOutline,
  MdAttachMoney,
  MdLocalOffer,
} from "react-icons/md";

const STATUS_STEPS = ["accepted", "picked_up", "in_transit", "delivered"];

const STATUS_UI = {
  pending: {
    label: "Pending",
    color: "bg-slate-100 text-slate-600",
    dot: "",
    icon: MdErrorOutline,
    iconBg: "bg-slate-100 text-slate-400",
  },
  accepted: {
    label: "Accepted",
    color: "bg-blue-100 text-blue-700 border border-blue-200",
    dot: "",
    icon: MdCheckCircle,
    iconBg: "bg-blue-100 text-blue-500",
  },
  picked_up: {
    label: "Picked Up",
    color: "bg-orange-100 text-orange-700 border border-orange-200",
    dot: "",
    icon: MdInventory2,
    iconBg: "bg-orange-100 text-orange-500",
  },
  in_transit: {
    label: "In Transit",
    color: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    dot: "animate-pulse",
    icon: MdLocalShipping,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  delivered: {
    label: "Delivered",
    color: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    dot: "",
    icon: MdCelebration,
    iconBg: "bg-emerald-100 text-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700 border border-red-200",
    dot: "",
    icon: MdErrorOutline,
    iconBg: "bg-red-100 text-red-500",
  },
};

const PROGRESS_COLORS = {
  accepted: "bg-blue-400",
  picked_up: "bg-orange-400",
  in_transit: "bg-indigo-600",
  delivered: "bg-emerald-500",
};

function getActiveStepIndex(status) {
  return STATUS_STEPS.indexOf(status);
}

function getProgressWidth(status) {
  const idx = getActiveStepIndex(status);
  if (idx < 0) return "w-[5%]";
  return [`w-[5%]`, `w-[33%]`, `w-[65%]`, `w-[100%]`][idx];
}

function getDriverDisplay(shipment) {
  if (!shipment.driver) return null;
  const d = shipment.driver;
  return {
    name: `${d.firstName || ""} ${d.lastName || ""}`.trim() || "Driver",
    rating: d.rating || "\u2014",
  };
}

function buildTabs(all) {
  const active = all.filter((s) => ["accepted", "picked_up", "in_transit"].includes(s.status)).length;
  const pendingPickup = all.filter((s) => s.status === "accepted").length;
  const completed = all.filter((s) => s.status === "delivered").length;
  const cancelled = all.filter((s) => s.status === "cancelled").length;
  return [
    { key: "All Shipments", label: "All Shipments", count: all.length },
    { key: "Active", label: "Active", count: active },
    { key: "Pending Pickup", label: "Pending Pickup", count: pendingPickup },
    { key: "Completed", label: "Completed", count: completed },
    { key: "Cancelled", label: "Cancelled", count: cancelled },
  ];
}

export default function SenderShipments() {
  const [activeTab, setActiveTab] = useState("All Shipments");
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  // Reset page when tab changes
  const prevTabRef = useRef(activeTab);
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      prevTabRef.current = activeTab;
      setPage(1);
    }
  }, [activeTab]);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const params = new URLSearchParams({ page: String(page) });
        const currentTab = activeTabRef.current;
        if (currentTab !== "All Shipments") params.set("status", currentTab);

        const res = await fetch(`/api/sender/shipments?${params}`);
        if (!res.ok || cancelled) return;
        const d = await res.json();
        if (cancelled) return;

        setShipments(d.shipments);
        setTotalPages(d.totalPages || 1);
        setTotal(d.total || 0);
        if (d.allShipments) {
          setTabs(buildTabs(d.allShipments));
        }
        setLastUpdate(new Date());
      } catch {
        /* silent */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [page, activeTab]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-lg font-semibold text-slate-400">Loading shipments...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">My Shipments</h1>
          <p className="text-slate-500 text-sm md:text-base mt-1">
            Manage and track your freight across the RuralRoute network.
            {lastUpdate && (
              <span className="text-xs text-slate-400 ml-3">
                Live &middot; updated {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95">
            <MdFilterList className="text-lg" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95">
            <MdFileDownload className="text-lg" />
            Export
          </button>
        </div>
      </div>

      <div className="mb-8 p-1 bg-slate-100 rounded-xl inline-flex w-full md:w-auto overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.key
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500 hover:text-primary"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === tab.key ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-500"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {shipments.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 p-16 text-center">
            <MdLocalShipping className="text-6xl text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-600 mb-1">No shipments found</h3>
            <p className="text-sm text-slate-400">Create a new shipment to get started.</p>
          </div>
        ) : (
          shipments.map((s, idx) => {
            const statusInfo = STATUS_UI[s.status] || STATUS_UI.pending;
            const activeSteps = getActiveStepIndex(s.status);
            const progressColor = PROGRESS_COLORS[s.status] || "bg-slate-400";
            const isActive = ["accepted", "picked_up", "in_transit"].includes(s.status);
            const driverInfo = getDriverDisplay(s);
            const Icon = statusInfo.icon;

            return (
              <div key={s._id || idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${statusInfo.iconBg}`}>
                        <Icon className={`text-3xl ${s.status === "in_transit" ? "animate-bounce" : ""}`} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tracking ID</p>
                        <h3 className="text-xl font-bold text-slate-900">{s.trackingId}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`${statusInfo.color} px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-2`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-current ${statusInfo.dot}`} />
                        {statusInfo.label}
                      </span>
                      {s.negotiation?.status === "pending" && (
                        <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase border border-blue-200 flex items-center gap-1">
                          <MdAttachMoney className="text-sm" />
                          Price Proposed
                        </span>
                      )}
                      {s.negotiation?.status === "counter_offer" && (
                        <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-[10px] font-bold uppercase border border-purple-200 flex items-center gap-1">
                          <MdLocalOffer className="text-sm" />
                          Counter Offer
                        </span>
                      )}
                      {s.negotiation?.status === "agreed" && (
                        <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase border border-green-200 flex items-center gap-1">
                          <MdCheckCircle className="text-sm" />
                          Price Agreed
                        </span>
                      )}
                      {s.timing?.pickupDate && (
                        <p className="text-sm font-semibold text-slate-400 hidden md:block">
                          Pickup: {new Date(s.timing.pickupDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4 flex gap-5">
                      <div className="flex flex-col items-center py-1">
                        <div className={`w-3 h-3 rounded-full border-2 ${isActive ? "border-primary bg-primary" : "border-slate-300 bg-white"}`} />
                        <div className="w-[2px] flex-1 bg-slate-100 my-1" />
                        <div className={`w-3 h-3 rounded-full border-2 ${isActive ? "border-secondary bg-secondary" : "border-slate-300 bg-white"}`} />
                      </div>
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin</p>
                          <p className="font-bold text-slate-900">{s.origin.city}, {s.origin.state}</p>
                          {s.origin.address && <p className="text-xs text-slate-400">{s.origin.address}</p>}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                          <p className="font-bold text-slate-900">{s.destination.city}, {s.destination.state}</p>
                          {s.destination.address && <p className="text-xs text-slate-400">{s.destination.address}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-4 px-4">
                      <div className="relative pt-6">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 rounded-full" />
                        <div
                          className={`absolute top-0 left-0 ${getProgressWidth(s.status)} h-1.5 ${progressColor} rounded-full shadow-sm transition-all duration-700 ease-out`}
                        />
                        {STATUS_STEPS.map((step, i) => {
                          const pos = [`left-0`, `left-[33%]`, `left-[66%]`, `right-0`][i];
                          const isStepActive = i <= activeSteps;
                          const isCurrent = i === activeSteps;
                          return (
                            <div
                              key={step}
                              className={`absolute top-[-3px] transition-all duration-500 ${
                                isCurrent
                                  ? `${pos} w-4 h-4 ${progressColor} rounded-full border-2 border-white ring-4 ring-primary/10 scale-110`
                                  : isStepActive
                                    ? `${pos} w-3 h-3 ${progressColor} rounded-full border-2 border-white`
                                    : `${pos} w-3 h-3 bg-slate-200 rounded-full border-2 border-white`
                              }`}
                            />
                          );
                        })}
                      </div>
                      <div className="flex justify-between">
                        {["Accepted", "Picked Up", "In Transit", "Delivered"].map((step, i) => (
                          <span
                            key={step}
                            className={`text-[9px] font-bold uppercase transition-colors duration-500 ${
                              i <= activeSteps ? "text-primary" : "text-slate-300"
                            }`}
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex items-center justify-end gap-5 border-l border-slate-50 pl-8">
                      {driverInfo ? (
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Driver</p>
                          <p className="font-bold text-slate-900">{driverInfo.name}</p>
                          {driverInfo.rating && (
                            <div className="flex items-center justify-end gap-1 text-amber-500 mt-0.5">
                              <MdStar className="text-base" />
                              <span className="text-xs font-bold">{driverInfo.rating}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Driver</p>
                          <p className="font-bold text-slate-400">Unassigned</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/50 px-8 py-4 flex flex-wrap items-center gap-4 border-t border-slate-100">
                  <button
                    className={`${
                      s.status === "in_transit" || s.status === "picked_up"
                        ? "bg-primary hover:bg-indigo-900 text-white shadow-md shadow-primary/10"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    } px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95`}
                  >
                    <MdNearMe className="text-lg" />
                    Live Track
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-700 hover:border-primary hover:text-primary px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95">
                    <MdForum className="text-lg" />
                    Message
                  </button>
                  <button className="ml-auto text-slate-500 hover:text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                    View Full Details
                    <MdArrowForward className="text-lg" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-200 pt-8">
          <span className="text-sm font-medium text-slate-500">
            Showing <span className="text-slate-900 font-bold">{shipments.length}</span> of{" "}
            <span className="text-slate-900 font-bold">{total}</span> shipment{total !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className={`p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors ${
                page <= 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <MdChevronLeft className="text-lg" />
            </button>
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                    page === p
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "border border-transparent hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className={`p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors ${
                page >= totalPages ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <MdChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
