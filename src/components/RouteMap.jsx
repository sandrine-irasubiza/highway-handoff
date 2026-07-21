"use client";

import {
  MdMyLocation,
  MdLocationOn,
  MdFlag,
  MdDirectionsCar,
  MdClose,
} from "react-icons/md";

export default function RouteMap({ origin, destination, waypoints = [], shipments = [], onClose, compact = false }) {
  const points = [];
  if (origin?.city) {
    points.push({ city: origin.city, state: origin.state, type: "origin" });
  }
  if (waypoints) {
    waypoints.forEach((wp, i) => {
      if (wp.city) points.push({ city: wp.city, state: wp.state, type: "waypoint", index: i, status: wp.status });
    });
  }
  if (destination?.city) {
    points.push({ city: destination.city, state: destination.state, type: "destination" });
  }

  if (points.length < 2) {
    return (
      <div className="bg-slate-50 rounded-xl p-6 text-center border border-dashed border-slate-200">
        <MdDirectionsCar className="text-3xl text-slate-300 mx-auto mb-2" />
        <p className="text-sm text-slate-400">Enter origin and destination to see route</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden ${compact ? "p-4" : "p-6"}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <MdDirectionsCar className="text-primary-container" />
          Highway Route
        </h4>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <MdClose className="text-sm text-slate-400" />
          </button>
        )}
      </div>

      <div className="relative">
        {points.map((point, i) => {
          const isLast = i === points.length - 1;
          const isOrigin = point.type === "origin";
          const isDest = point.type === "destination";
          const isWaypoint = point.type === "waypoint";

          return (
            <div key={i} className="flex gap-4 relative">
              {/* Vertical Line + Dot */}
              <div className="flex flex-col items-center w-8 flex-shrink-0">
                <div
                  className={`w-4 h-4 rounded-full z-10 flex items-center justify-center ${
                    isOrigin
                      ? "bg-primary-container shadow-lg shadow-primary-container/30"
                      : isDest
                      ? "bg-secondary-container shadow-lg shadow-secondary-container/30"
                      : "bg-white border-2 border-primary-container"
                  }`}
                >
                  {isOrigin && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  {isDest && <MdFlag className="text-white text-[8px]" />}
                  {isWaypoint && <div className="w-1.5 h-1.5 bg-primary-container rounded-full" />}
                </div>
                {!isLast && (
                  <div className="w-0.5 flex-1 min-h-[40px] bg-gradient-to-b from-primary-container/40 via-secondary-container/30 to-secondary-container/40" />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 ${!isLast ? "pb-6" : ""}`}>
                <div className={`rounded-lg px-4 py-3 ${
                  isOrigin ? "bg-primary-container/5 border border-primary-container/20" :
                  isDest ? "bg-secondary-container/5 border border-secondary-container/20" :
                  "bg-slate-50 border border-slate-200"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${
                        isOrigin ? "text-primary-container" :
                        isDest ? "text-secondary-container" :
                        "text-slate-400"
                      }`}>
                        {isOrigin ? "Origin" : isDest ? "Destination" : `Stop ${point.index + 1}`}
                      </p>
                      <p className="font-bold text-slate-800 text-sm">
                        {point.city}{point.state ? `, ${point.state}` : ""}
                      </p>
                    </div>
                    {isWaypoint && point.status && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        point.status === "arrived" ? "bg-green-100 text-green-700" :
                        point.status === "departed" ? "bg-blue-100 text-blue-700" :
                        "bg-slate-100 text-slate-500"
                      }`}>
                        {point.status}
                      </span>
                    )}
                    {isOrigin && <MdMyLocation className="text-primary-container text-lg" />}
                    {isDest && <MdLocationOn className="text-secondary-container text-lg" />}
                  </div>
                </div>

                {/* Distance indicator between points */}
                {!isLast && (
                  <div className="flex items-center gap-2 mt-2 ml-2">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">
                      Highway route
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Shipments on this route */}
      {shipments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Packages on this route
          </p>
          <div className="space-y-2">
            {shipments.map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-bold text-slate-700">{s.trackingId || `PKG-${i + 1}`}</span>
                  <span className="text-slate-400">{s.origin?.city} → {s.destination?.city}</span>
                </div>
                <span className="font-bold text-green-700">${s.price || 0}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
