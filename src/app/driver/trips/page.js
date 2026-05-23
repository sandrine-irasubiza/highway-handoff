"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MdLocalShipping,
  MdSearch,
  MdSensors,
  MdCheck,
  MdSync,
  MdSchedule,
  MdMap,
  MdMoreVert,
  MdCalendarToday,
  MdRoute,
  MdPriorityHigh,
  MdAdd,
  MdInventory2,
  MdMonitorWeight,
  MdWarning,
  MdDock,
  MdLocationOn,
  MdWarehouse,
  MdAddRoad,
  MdClose,
  MdMyLocation,
  MdEvent,
  MdInventory,
  MdLuggage,
  MdNavigation,
  MdRocketLaunch,
} from "react-icons/md";

export default function TripsPage() {
  const [showPostTrip, setShowPostTrip] = useState(false);
  const [capacity, setCapacity] = useState("small");
  const [formData, setFormData] = useState({
    startLocation: "",
    destination: "",
    departureDate: "",
    departureTime: "",
  });

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-6 md:space-y-12">
      {/* Active Trip Section */}
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-secondary-container animate-pulse"></div>
            <h3 className="text-base md:text-lg font-semibold text-primary-container uppercase tracking-tight">Active Trip</h3>
          </div>
          <div className="flex items-center gap-2 bg-secondary-container/10 text-secondary-container px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-secondary-container/20">
            <MdSensors className="text-xs md:text-sm" />
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">In Transit</span>
          </div>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Route Stepper */}
            <div className="lg:col-span-7 p-4 md:p-8 lg:border-r border-slate-100">
              <div className="flex flex-col gap-6 md:gap-8 relative">
                <div className="flex gap-6 relative z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full border-4 border-primary-container bg-white shadow-sm"></div>
                    <div className="w-0.5 h-20 border-l-2 border-dashed border-slate-200 mt-1"></div>
                  </div>
                  <div className="flex-1 -mt-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pickup • May 11, 09:30 AM</p>
                    <h4 className="text-xl font-bold text-primary-container mb-1">Chicago Terminal 4</h4>
                    <p className="text-sm text-slate-500">4400 W O&rsquo;Hare Ave, Chicago, IL</p>
                  </div>
                </div>

                <div className="flex gap-6 relative z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full border-4 border-secondary-container bg-white shadow-sm"></div>
                  </div>
                  <div className="flex-1 -mt-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Delivery • Est. May 13</p>
                    <h4 className="text-xl font-bold text-primary-container mb-1">Denver Hub B</h4>
                    <p className="text-sm text-slate-500">12000 E 45th Ave, Denver, CO</p>
                  </div>
                </div>
              </div>

              {/* Progress Display */}
              <div className="mt-12 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trip Status</p>
                    <p className="text-lg font-bold text-primary-container">68% <span className="text-slate-400 font-medium">Completed</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
                    <p className="text-lg font-bold text-secondary-container">4h 12m <span className="text-slate-400 font-medium">remaining</span></p>
                  </div>
                </div>
                <div className="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-6">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-container to-secondary-container w-[68%] rounded-full"></div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <MdCheck className="text-sm" />
                    </div>
                    <span className="text-[9px] font-bold text-primary-container uppercase">Accepted</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <MdCheck className="text-sm" />
                    </div>
                    <span className="text-[9px] font-bold text-primary-container uppercase">Picked Up</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <MdSync className="text-sm animate-spin" />
                    </div>
                    <span className="text-[9px] font-bold text-secondary-container uppercase">In Transit</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mx-auto mb-2">
                      <MdSchedule className="text-sm" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Cargo Details & Map */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="p-8 flex-1">
                <div className="relative h-36 md:h-44 rounded-xl md:rounded-2xl overflow-hidden shadow-sm mb-4 md:mb-6">
                  <Image
                    alt="Map View"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    unoptimized
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOS_8D-CCK0jNz60hoy8pRmJw2yQCOzjISoxF8Y_3HH04gZKwbZQhdY3Hsl_MxjP02jIwphcodEfTCjPv8qtt4-NFamu8Fgwycyc-0CcgznKutwcISi1c5dSi6A2rWgOn2lfAuBAtlOiDgV4NjTylwaVuatwxz5d1PYd5l9XSS6Sl5J6e4ekJ0XAnddJf5yC2esQABJF9WbjonQhfnrD1ltNLpr9_xXiLUHAVodh0uvcTNj7mmjAR2u1SvMHm8J_gSCaqYIbCP7GU"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live GPS</span>
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase opacity-80">I-80 Westbound</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                        <MdInventory2 className="text-slate-400" />
                      </div>
                      <span className="text-slate-500 text-xs font-bold uppercase">Cargo</span>
                    </div>
                    <span className="text-primary-container font-bold text-sm">Industrial Components</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                        <MdMonitorWeight className="text-slate-400" />
                      </div>
                      <span className="text-slate-500 text-xs font-bold uppercase">Weight</span>
                    </div>
                    <span className="text-primary-container font-bold text-sm">18,500 lbs</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                        <MdWarning className="text-slate-400" />
                      </div>
                      <span className="text-slate-500 text-xs font-bold uppercase">Hazmat</span>
                    </div>
                    <span className="text-slate-400 font-bold text-sm italic">None</span>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 flex gap-4">
                <button className="flex-1 bg-primary-container text-white h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-container/90 transition-all shadow-sm">
                  <MdMap className="text-lg" />
                  View Route Map
                </button>
                <button className="w-12 h-12 rounded-xl border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-all">
                  <MdMoreVert className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Upcoming Trips Section */}
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-primary-container uppercase tracking-tight">Upcoming Trips</h3>
          <button className="text-primary-container text-[11px] font-bold flex items-center gap-1 hover:text-secondary-container transition-all uppercase tracking-widest border border-slate-200 px-3 md:px-4 py-1.5 rounded-full bg-white">
            Full Schedule <span className="text-sm">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Trip Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-colors">
                <MdCalendarToday className="text-xl" />
              </div>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full uppercase tracking-tight">May 12 • 08:00 AM</span>
            </div>
            <h4 className="text-lg font-bold text-primary-container mb-1">Denver → Salt Lake City</h4>
            <p className="text-sm text-slate-400 mb-5 flex items-center gap-1.5">
              <MdRoute className="text-sm" />
              I-80 W • 520 miles
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-container/40"></div>
                <span className="text-[11px] font-bold text-slate-600 uppercase">Refrigerated</span>
              </div>
              <button className="text-secondary-container font-bold text-[11px] uppercase tracking-widest hover:underline">Details</button>
            </div>
          </div>

          {/* Trip Card 2 - Urgent */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary-container"></div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/10 flex items-center justify-center text-secondary-container group-hover:bg-secondary-container group-hover:text-white transition-colors">
                <MdPriorityHigh className="text-xl" />
              </div>
              <span className="text-[10px] font-bold bg-secondary-container text-white px-2.5 py-1 rounded-full uppercase tracking-tight">Urgent • May 14</span>
            </div>
            <h4 className="text-lg font-bold text-primary-container mb-1">Salt Lake City → Reno</h4>
            <p className="text-sm text-slate-400 mb-5 flex items-center gap-1.5">
              <MdRoute className="text-sm" />
              I-80 W • 518 miles
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary-container/60"></div>
                <span className="text-[11px] font-bold text-slate-600 uppercase">Electronics</span>
              </div>
              <button className="text-secondary-container font-bold text-[11px] uppercase tracking-widest hover:underline">Details</button>
            </div>
          </div>

          {/* New Trip CTA - Opens Modal */}
          <button
            onClick={() => setShowPostTrip(true)}
            className="bg-primary-container p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary-container/95 transition-all border-2 border-transparent hover:border-white/20"
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center text-white/50 group-hover:scale-110 group-hover:border-white/60 group-hover:text-white transition-all duration-500 mb-4">
              <MdAdd className="text-2xl" />
            </div>
            <p className="text-white font-bold text-lg mb-1">Post New Trip</p>
            <p className="text-white/60 text-xs mb-6 font-medium">List available cargo space</p>
            <span className="bg-secondary-container text-white px-8 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-sm">Get Started</span>
          </button>
        </div>
      </section>

        {/* Trip History Table */}
      <section>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-primary-container uppercase tracking-tight">Trip History</h3>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Trip ID</th>
                  <th className="px-8 py-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Route &amp; Details</th>
                  <th className="px-8 py-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Completed</th>
                  <th className="px-8 py-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest">Earnings</th>
                  <th className="px-8 py-4 font-bold text-slate-400 text-[10px] uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="group hover:bg-slate-50 transition-all cursor-pointer">
                  <td className="px-8 py-5">
                    <span className="font-bold text-primary-container text-sm">#TX-9981</span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-700 mb-1">Cleveland → Chicago</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MdDock className="text-xs" />
                      Hand-off at Terminal 2
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm text-slate-500 font-medium">May 10, 2024</p>
                    <p className="text-[10px] text-slate-400">14:22 PM</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-primary-container">$1,240.00</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      DELIVERED
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50 transition-all cursor-pointer">
                  <td className="px-8 py-5">
                    <span className="font-bold text-primary-container text-sm">#TX-9975</span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-700 mb-1">Columbus → Cleveland</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MdLocationOn className="text-xs" />
                      Direct Delivery
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm text-slate-500 font-medium">May 08, 2024</p>
                    <p className="text-[10px] text-slate-400">18:05 PM</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-primary-container">$845.50</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      DELIVERED
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50 transition-all cursor-pointer">
                  <td className="px-8 py-5">
                    <span className="font-bold text-primary-container text-sm">#TX-9962</span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-700 mb-1">Pittsburgh → Columbus</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MdWarehouse className="text-xs" />
                      Warehouse Transfer
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm text-slate-500 font-medium">May 05, 2024</p>
                    <p className="text-[10px] text-slate-400">09:40 AM</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-primary-container">$1,100.00</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      DELIVERED
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-8 py-4 bg-slate-50 text-center">
            <button className="text-xs font-bold text-slate-400 hover:text-primary-container transition-colors uppercase tracking-widest">Load More History</button>
          </div>
        </div>
      </section>

      {/* FAB - Opens Post Trip Modal */}
      <button
        onClick={() => setShowPostTrip(true)}
        className="fixed bottom-6 right-6 bg-secondary-container text-white w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all z-50 group"
      >
        <MdAddRoad className="text-xl group-hover:rotate-12 transition-transform" />
      </button>

      {/* Post Trip Modal */}
      {showPostTrip && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPostTrip(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl mx-4 mt-8 mb-8 bg-surface rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-xl font-bold text-primary-container">Post a New Trip</h2>
                <p className="text-sm text-slate-500 mt-0.5">Maximize your earnings by listing available cargo space.</p>
              </div>
              <button
                onClick={() => setShowPostTrip(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-primary-container transition-all"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Column: Route & Schedule */}
                <div className="md:col-span-7 flex flex-col gap-8">
                  {/* Route Planning */}
                  <section className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="text-lg font-semibold text-primary-container mb-4 flex items-center gap-3">
                      <MdRoute className="text-secondary-container text-xl" />
                      Route Planning
                    </h3>
                    <div className="space-y-6 relative">
                      <div className="absolute left-5 top-12 bottom-12 w-px border-l-2 border-dashed border-slate-200"></div>

                      <div className="relative pl-14">
                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary-container flex items-center justify-center z-10">
                          <MdMyLocation className="text-white text-lg" />
                        </div>
                        <label className="text-xs font-bold text-primary-container block mb-2 uppercase tracking-wider">Start Location</label>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-sm"
                          name="startLocation"
                          value={formData.startLocation}
                          onChange={handleFormChange}
                          placeholder="City, State or Warehouse ID"
                          type="text"
                        />
                      </div>

                      <div className="relative pl-14">
                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center z-10">
                          <MdLocationOn className="text-white text-lg" />
                        </div>
                        <label className="text-xs font-bold text-primary-container block mb-2 uppercase tracking-wider">Destination</label>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-sm"
                          name="destination"
                          value={formData.destination}
                          onChange={handleFormChange}
                          placeholder="Where is the cargo headed?"
                          type="text"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Schedule */}
                  <section className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="text-lg font-semibold text-primary-container mb-4 flex items-center gap-3">
                      <MdEvent className="text-secondary-container text-xl" />
                      Schedule
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-primary-container block mb-2 uppercase tracking-wider">Departure Date</label>
                        <div className="relative">
                          <MdEvent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-sm"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleFormChange}
                            type="date"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-primary-container block mb-2 uppercase tracking-wider">Est. Time</label>
                        <div className="relative">
                          <MdSchedule className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-sm"
                            name="departureTime"
                            value={formData.departureTime}
                            onChange={handleFormChange}
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column: Capacity & Map */}
                <div className="md:col-span-5 flex flex-col gap-8">
                  {/* Available Capacity */}
                  <section className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="text-lg font-semibold text-primary-container mb-4 flex items-center gap-3">
                      <MdInventory2 className="text-secondary-container text-xl" />
                      Available Capacity
                    </h3>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-primary-container block mb-2 uppercase tracking-wider">Cargo Volume</label>

                      <label
                        className={`group relative border-2 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all ${
                          capacity === "small"
                            ? "border-secondary-container bg-secondary-container/5"
                            : "border-slate-200 hover:border-secondary-container"
                        }`}
                      >
                        <input checked={capacity === "small"} className="hidden" name="capacity" onChange={() => setCapacity("small")} type="radio" />
                        <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-slate-100">
                          <MdInventory className="text-primary-container text-xl" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-primary-container">Small Parcel</p>
                          <p className="text-xs text-slate-500">Fits on passenger seat</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${capacity === "small" ? "border-secondary-container bg-secondary-container" : "border-slate-300"}`}>
                          {capacity === "small" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                      </label>

                      <label
                        className={`group relative border-2 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all ${
                          capacity === "trunk"
                            ? "border-secondary-container bg-secondary-container/5"
                            : "border-slate-200 hover:border-secondary-container"
                        }`}
                      >
                        <input checked={capacity === "trunk"} className="hidden" name="capacity" onChange={() => setCapacity("trunk")} type="radio" />
                        <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-slate-100">
                          <MdLuggage className="text-primary-container text-xl" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-primary-container">Trunk Space</p>
                          <p className="text-xs text-slate-500">Standard car cargo area</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${capacity === "trunk" ? "border-secondary-container bg-secondary-container" : "border-slate-300"}`}>
                          {capacity === "trunk" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                      </label>

                      <label
                        className={`group relative border-2 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all ${
                          capacity === "full"
                            ? "border-secondary-container bg-secondary-container/5"
                            : "border-slate-200 hover:border-secondary-container"
                        }`}
                      >
                        <input checked={capacity === "full"} className="hidden" name="capacity" onChange={() => setCapacity("full")} type="radio" />
                        <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-slate-100">
                          <MdLocalShipping className="text-primary-container text-xl" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-primary-container">Full Vehicle</p>
                          <p className="text-xs text-slate-500">Flatbed or enclosed trailer</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${capacity === "full" ? "border-secondary-container bg-secondary-container" : "border-slate-300"}`}>
                          {capacity === "full" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                      </label>
                    </div>
                  </section>

                  {/* Map Preview */}
                  <div className="bg-slate-100 rounded-xl overflow-hidden relative group h-48">
                    <Image
                      alt="Route preview map"
                      fill
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 42vw"
                      unoptimized
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfsBauc4W_6wJuQA6CA_Un8BXe4zjl3AAcXT1NNX9cXV7FPYVVo1b15kXEOCeKeC9guZLo4a2KdZgBK5NI8tYNcCxf2GnfECCRNQnib_919L-6PH_8YF5zm8sxC0qcD5fSUlaDC-6DQGa08VPodYvDQcE8TN4KJu_bq5gdQDsuANW3MqEFG--LWbT_UFYYbFeNMxR3Xnal5V61ojrV8upZKINR2Zga9ZQ_qyX1pzucmUKDV1dD_5vvIcXp2YeBvb-F8sRJTWUa07Q"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container/40 to-transparent flex items-end p-4">
                      <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        <MdNavigation className="text-secondary-container text-lg" />
                        <span className="text-xs font-bold text-primary-container uppercase">Est. 342 Miles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  onClick={() => setShowPostTrip(false)}
                  className="w-full bg-secondary-container text-white py-4 rounded-xl font-bold text-lg shadow-sm hover:bg-secondary-container/90 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  Post Trip
                  <MdRocketLaunch className="text-xl" />
                </button>
                <p className="text-center text-sm text-slate-500 mt-4">
                  By posting, you agree to our <a className="text-primary-container font-semibold underline" href="#">Carrier Terms of Service</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
