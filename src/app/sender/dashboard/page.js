"use client";

import { useState, useEffect } from "react";
import {
  MdPendingActions,
  MdTaskAlt,
  MdSavings,
  MdInventory2,
  MdLocationOn,
  MdFlag,
  MdChevronRight,
  MdBolt,
  MdArrowForward,
  MdOpenInNew,
} from "react-icons/md";

export default function SenderDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sender/dashboard")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-lg font-semibold">Loading...</div>;
  if (!data) return <div className="text-center py-20 text-lg font-semibold text-error">Failed to load dashboard data.</div>;

  return (
    <>
        {/* Hero Greeting */}
        <section className="mb-6 flex flex-col md:flex-row justify-between items-end md:items-center gap-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-green-600">Online</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Welcome back, {data.userName}</h1>
            <p className="text-body-md text-on-surface-variant mt-2">You have <span className="font-bold text-secondary-container">3 shipments</span> that are ready for a Smart Match hand-off today.</p>
          </div>
          <button className="bg-gradient-to-r from-secondary-container to-orange-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95">
            <MdBolt className="text-lg" />
            Quick Match
          </button>
        </section>

        {/* Key Metrics Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <MdPendingActions className="text-3xl" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-outline">Active Shipments</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-primary">{data.activeShipments}</h2>
                <span className="text-xs text-green-600 font-semibold">+3 today</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="h-14 w-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
              <MdTaskAlt className="text-3xl" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-outline">Completed This Month</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-primary">{data.completedThisMonth}</h2>
                <span className="text-xs text-green-600 font-semibold">+12% vs last month</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="h-14 w-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
              <MdSavings className="text-3xl" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-outline">Total Saved</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-primary">${data.totalSaved.toFixed(2)}</h2>
                <span className="text-xs text-green-600 font-semibold">This quarter</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Main Dashboard Content */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            {/* Send a Package Search Widget */}
            <section className="bg-gradient-to-br from-primary to-primary-container text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
              <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none flex items-center justify-center">
                <MdInventory2 className="text-[200px]" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-1">Send a Package</h3>
                <p className="text-on-primary-container text-xs md:text-sm mb-4 md:mb-6 opacity-80">Enter pickup and delivery details to find the best match.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-primary-container">Pickup Location</label>
                    <div className="bg-white/10 rounded-xl p-3.5 flex items-center gap-2.5 border border-white/20 focus-within:border-secondary-container transition-colors">
                      <MdLocationOn className="text-orange-400 text-lg flex-shrink-0" />
                      <input className="bg-transparent border-none text-white focus:ring-0 w-full placeholder:text-white/50 text-sm outline-none" placeholder="Origin City, State" type="text" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-primary-container">Delivery Location</label>
                    <div className="bg-white/10 rounded-xl p-3.5 flex items-center gap-2.5 border border-white/20 focus-within:border-secondary-container transition-colors">
                      <MdFlag className="text-blue-400 text-lg flex-shrink-0" />
                      <input className="bg-transparent border-none text-white focus:ring-0 w-full placeholder:text-white/50 text-sm outline-none" placeholder="Destination City, State" type="text" />
                    </div>
                  </div>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-secondary-container to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99]">
                  Find Smart Matches
                  <MdChevronRight className="text-xl" />
                </button>
              </div>
            </section>

            {/* Active Shipments Feed */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-primary">Active Shipments</h3>
                <button className="text-primary font-semibold flex items-center gap-1 hover:underline text-sm">
                  View All <MdArrowForward />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {/* Shipment Card 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-secondary-container hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                        <MdInventory2 className="text-primary text-xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-primary">HHF-89210</h4>
                        <p className="text-sm text-on-surface-variant font-medium">Chicago, IL <span className="text-outline mx-2">→</span> St. Louis, MO</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 bg-blue-50 text-primary rounded-full text-xs font-bold uppercase border border-blue-100">Accepted</span>
                      <button className="px-4 py-2 bg-white text-primary border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 active:scale-95 transition-all shadow-sm">Track Location</button>
                    </div>
                  </div>
                  {/* Visual Progress Tracker */}
                  <div className="relative pt-6 pb-2">
                    <div className="absolute top-0 left-0 h-1.5 bg-slate-100 w-full rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-secondary-container to-orange-400 w-[40%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-3 w-3 bg-secondary-container rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-[10px] font-bold text-secondary-container">Accepted</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-3 w-3 bg-secondary-container rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-[10px] font-bold text-secondary-container">Picked Up</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-3 w-3 bg-slate-200 rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-[10px] font-bold text-outline">In Transit</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-3 w-3 bg-slate-200 rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-[10px] font-bold text-outline">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipment Card 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-secondary-container hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                        <MdInventory2 className="text-primary text-xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-primary">HHF-91024</h4>
                        <p className="text-sm text-on-surface-variant font-medium">Indianapolis, IN <span className="text-outline mx-2">→</span> Columbus, OH</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase border border-orange-200">Picked Up</span>
                      <button className="px-4 py-2 bg-white text-primary border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 active:scale-95 transition-all shadow-sm">Track Location</button>
                    </div>
                  </div>
                  <div className="relative pt-6 pb-2">
                    <div className="absolute top-0 left-0 h-1.5 bg-slate-100 w-full rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-secondary-container to-orange-400 w-[70%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-3 w-3 bg-secondary-container rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-[10px] font-bold text-secondary-container">Accepted</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-3 w-3 bg-secondary-container rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-[10px] font-bold text-secondary-container">Picked Up</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-3 w-3 bg-secondary-container rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-[10px] font-bold text-secondary-container">In Transit</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-3 w-3 bg-slate-200 rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-[10px] font-bold text-outline">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            {/* Recent Activity Sidebar */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-primary">Recent Activity</h3>
                <span className="text-xs font-bold text-outline uppercase">Today</span>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-green-100"></div>
                    <div className="w-0.5 h-8 bg-slate-100"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">Shipment Delivered</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">HHF-88124 was delivered to Chicago terminal.</p>
                    <p className="text-[10px] text-outline mt-1.5 uppercase font-bold tracking-wider">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-primary/20"></div>
                    <div className="w-0.5 h-8 bg-slate-100"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">Smart Match Accepted</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">Carrier &apos;Velocity Logistics&apos; accepted HHF-89210.</p>
                    <p className="text-[10px] text-outline mt-1.5 uppercase font-bold tracking-wider">5 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-orange-100"></div>
                    <div className="w-0.5 h-8 bg-slate-100"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">Driver Picked Up</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">Shipment HHF-91024 is now on its way to Columbus.</p>
                    <p className="text-[10px] text-outline mt-1.5 uppercase font-bold tracking-wider">Yesterday, 4:15 PM</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300 ring-2 ring-slate-100"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">New Message</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">New message from Dispatch about route HHF-89210.</p>
                    <p className="text-[10px] text-outline mt-1.5 uppercase font-bold tracking-wider">Yesterday, 10:00 AM</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-3 py-3 text-primary font-bold text-sm border-t border-slate-100 hover:bg-slate-50 transition-colors rounded-lg">See All Activity</button>
            </section>

            {/* Helpful Tip / Promo */}
            <section className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary-container/10 to-transparent rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary-container to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <MdSavings className="text-white text-lg" />
                </div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Smart Saving Tip</p>
                <p className="text-sm text-indigo-900 font-medium leading-relaxed">Bundling your Midwest routes this week can save you up to <span className="font-bold text-secondary-container">15%</span> on hand-off fees.</p>
                <a className="mt-4 text-primary font-bold text-sm inline-flex items-center gap-1.5 group-hover:gap-2 transition-all" href="#">
                  Learn more <MdOpenInNew className="text-sm" />
                </a>
              </div>
            </section>
          </div>
        </div>
    </>
  );
}
