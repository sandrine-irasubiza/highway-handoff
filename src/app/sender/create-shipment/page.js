"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MdLocalShipping,
  MdInventory2,
  MdCalendarToday,
  MdSchedule,
  MdExpandMore,
  MdMap,
  MdBolt,
} from "react-icons/md";

export default function CreateShipment() {
  const [packageType, setPackageType] = useState("small-box");

  return (
    <>
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-black text-primary tracking-tight">Create New Shipment</h1>
            <p className="text-lg text-on-surface-variant mt-3 max-w-2xl">
              Deploy your kinetic logistics hand-off with surgical precision and real-time tracking.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Multi-Step Form Sections */}
            <div className="lg:col-span-8 space-y-8">
              {/* Section 1: Route Details */}
              <section className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/30 p-8">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20">
                    1
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">Route Details</h2>
                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mt-0.5">Origin &amp; Destination</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-5">
                    <label className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
                      <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                      Pickup Location
                    </label>
                    <div className="space-y-4">
                      <input
                        className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-5 py-3.5 transition-all outline-none"
                        placeholder="City Name"
                        type="text"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-5 py-3.5 transition-all outline-none"
                          placeholder="State"
                          type="text"
                        />
                        <input
                          className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-5 py-3.5 transition-all outline-none"
                          placeholder="Zip Code"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <label className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
                      <span className="w-2 h-2 rounded-full border-2 border-secondary-container"></span>
                      Delivery Location
                    </label>
                    <div className="space-y-4">
                      <input
                        className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-5 py-3.5 transition-all outline-none"
                        placeholder="City Name"
                        type="text"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-5 py-3.5 transition-all outline-none"
                          placeholder="State"
                          type="text"
                        />
                        <input
                          className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-5 py-3.5 transition-all outline-none"
                          placeholder="Zip Code"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Package Information */}
              <section className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/30 p-8">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20">
                    2
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">Package Information</h2>
                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mt-0.5">Type &amp; Specifications</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5 md:col-span-2">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Package Type</label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setPackageType("small-box")}
                        className={`relative overflow-hidden p-6 rounded-2xl flex flex-col items-center gap-3 transition-all ${
                          packageType === "small-box"
                            ? "border-2 border-primary bg-primary/5 ring-4 ring-primary/5"
                            : "border-2 border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container-low"
                        }`}
                      >
                        <MdInventory2
                          className={`text-3xl ${
                            packageType === "small-box" ? "text-primary" : "text-on-surface-variant/60 group-hover:text-primary"
                          }`}
                        />
                        <span
                          className={`text-sm font-bold ${
                            packageType === "small-box" ? "text-primary" : "text-on-surface-variant"
                          }`}
                        >
                          Small Box
                        </span>
                      </button>
                      <button
                        onClick={() => setPackageType("document")}
                        className={`border-2 p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:bg-surface-container-low group ${
                          packageType === "document"
                            ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                            : "border-outline-variant/50 hover:border-primary/50"
                        }`}
                      >
                        <MdLocalShipping
                          className={`text-3xl transition-colors ${
                            packageType === "document" ? "text-primary" : "text-on-surface-variant/60 group-hover:text-primary"
                          }`}
                        />
                        <span
                          className={`text-sm font-bold transition-colors ${
                            packageType === "document" ? "text-primary" : "text-on-surface-variant group-hover:text-primary"
                          }`}
                        >
                          Document
                        </span>
                      </button>
                      <button
                        onClick={() => setPackageType("large-parcel")}
                        className={`border-2 p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:bg-surface-container-low group ${
                          packageType === "large-parcel"
                            ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                            : "border-outline-variant/50 hover:border-primary/50"
                        }`}
                      >
                        <MdInventory2
                          className={`text-3xl transition-colors ${
                            packageType === "large-parcel" ? "text-primary" : "text-on-surface-variant/60 group-hover:text-primary"
                          }`}
                        />
                        <span
                          className={`text-sm font-bold transition-colors ${
                            packageType === "large-parcel" ? "text-primary" : "text-on-surface-variant group-hover:text-primary"
                          }`}
                        >
                          Large Parcel
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Weight (kg)</label>
                    <div className="relative">
                      <input
                        className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-5 py-3.5 transition-all outline-none"
                        placeholder="0.00"
                        type="number"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant">
                        KG
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Dimensions (cm)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-2 py-3.5 text-center transition-all outline-none"
                        placeholder="L"
                        type="number"
                      />
                      <input
                        className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-2 py-3.5 text-center transition-all outline-none"
                        placeholder="W"
                        type="number"
                      />
                      <input
                        className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-2 py-3.5 text-center transition-all outline-none"
                        placeholder="H"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Timing & Urgency */}
              <section className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/30 p-8">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20">
                    3
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">Timing &amp; Urgency</h2>
                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mt-0.5">Schedule &amp; Logistics</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Pickup Date</label>
                    <div className="relative">
                      <MdCalendarToday className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                      <input
                        className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md pl-12 pr-5 py-3.5 transition-all outline-none"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">Delivery Deadline</label>
                    <div className="relative">
                      <MdSchedule className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                      <select className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md pl-12 pr-10 py-3.5 transition-all appearance-none outline-none">
                        <option>Same Day (Expedited)</option>
                        <option>Next Day Morning</option>
                        <option>Standard (3-5 Days)</option>
                        <option>Flexible Window</option>
                      </select>
                      <MdExpandMore className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <label className="text-xs font-black text-primary uppercase tracking-widest block mb-4">
                    Package Description &amp; Notes
                  </label>
                  <textarea
                    className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-body-md px-5 py-4 transition-all resize-none outline-none"
                    placeholder="Mention fragile items, specific handling instructions, or access codes..."
                    rows="4"
                  ></textarea>
                </div>
              </section>
            </div>

            {/* Sidebar Summary Card */}
            <aside className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-primary rounded-3xl shadow-2xl shadow-primary/20 overflow-hidden text-on-primary">
                <div className="p-8 pb-6 border-b border-white/10">
                  <h3 className="text-2xl font-black">Summary</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold tracking-[0.1em] uppercase">
                      Draft #HH-2941-X
                    </span>
                  </div>
                </div>
                <div className="p-8 pt-6 space-y-8">
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary-container ring-4 ring-secondary-container/20"></div>
                      <div className="w-px h-12 bg-white/10 my-1"></div>
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-secondary-container"></div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Pickup</p>
                        <p className="text-sm font-bold mt-1">Austin, TX 78701</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Delivery</p>
                        <p className="text-sm font-bold mt-1">San Francisco, CA 94105</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10">
                    <div>
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Package</p>
                      <p className="text-sm font-bold mt-1">Small Box (5.2kg)</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Service</p>
                      <p className="text-sm font-bold mt-1">Expedited</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest text-center">Estimated Kinetic Fee</p>
                    <p className="text-4xl font-black text-center tabular-nums">$142.50</p>
                  </div>
                  <button className="w-full bg-secondary-container hover:bg-secondary text-on-secondary font-black py-5 rounded-2xl shadow-xl shadow-secondary-container/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg">
                    <MdBolt className="text-2xl" />
                    Find Smart Matches
                  </button>
                  <p className="text-center text-[10px] text-white/40 px-4 leading-relaxed italic">
                    By initiating, you confirm adherence to Kinetic Reliability Protocol v4.2 and Logistics Bylaws.
                  </p>
                </div>
              </div>

              {/* Map Preview */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-outline-variant/30 relative h-48 group cursor-pointer">
                <Image
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  unoptimized
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2g7p-1y8dSsubctijwFVubOoIZHHEhe8QXJSvVu55xZFKEfyMVy8HweQ-jalDuHcE5C7ZFeqlNa0kThjGgkJsK2QhQwlmaIXeKWHZ5BIBri31s7-jGuevKTwUARj8dfMf9VJw51KtUSMxVcAGIJHNbkJQtfy9bz16LYYJHaTZwZRrpagEpeO7i3r_L5BBUjV_cyQ_GKFjZP1MPgnTI1C9Q8s7T8DS8krt7W1VE8UEl2BHha5YWUwasWbsNWlNX__cbXfdrbhI7WA"
                  alt="Route Map"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur px-6 py-2.5 rounded-full shadow-xl flex items-center gap-3 transition-transform group-hover:scale-110">
                    <MdMap className="text-primary text-xl" />
                    <span className="text-xs font-black text-primary uppercase tracking-widest">Preview Route Map</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
    </>
  );
}
