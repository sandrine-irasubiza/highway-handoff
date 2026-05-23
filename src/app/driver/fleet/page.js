"use client";

import Image from "next/image";
import {
  MdLocalShipping,
  MdEditNote,
  MdHistory,
  MdTrendingUp,
  MdSpeed,
  MdTireRepair,
  MdWaterDrop,
  MdCheckCircle,
  MdDescription,
  MdDownload,
  MdArrowForward,
  MdBuild,
  MdSecurity,
  MdAssessment,
  MdLocalGasStation,
  MdCo2,
  MdCalendarMonth,
  MdAssignment,
  MdWarning,
} from "react-icons/md";

export default function FleetPage() {
  return (
    <div className="space-y-6 md:space-y-12">
      {/* Hero Section: Vehicle Overview */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden relative min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image
            fill
            className="object-cover opacity-20"
            sizes="50vw"
            unoptimized
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuc860-NFSHckCo5I2sNmZ2KWw6DxbwG2N5HcgQb-IIYM8HrEYIc_IvvZ0-dqgfNL0d7A_uyWnk224W3L2CBHvIqmFkku28IHJGoheyYRJx-85IWb3DGhOIJNgSkZ-DagkX_VecT13tl_S2V8udYq7cpb3sjtOrSAaG3tuI02Po6sZzx3_ZwCM9rvOmw4fGYwV_qy7VCH1_nr4_ndirvt3vUb24Ig1N-MbPPqV7bVP06rpssH5kH34je4l95MzO4LW0v2xOLu7SgWU"
            alt="Freightliner Cascadia 2024 truck"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        <div className="relative z-10 px-4 md:px-8 md:px-12 py-6 md:py-10 w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary-container text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Active Status</span>
              <span className="text-slate-500 text-sm font-medium">VIN: 1FUJAA62R09341</span>
            </div>
            <h1 className="text-3xl font-black text-primary-container mb-2">Freightliner Cascadia 2024</h1>
            <p className="text-slate-600 mb-8 text-lg">Heavy Duty Fleet Class 8 • Unit ID: RT-4492</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface-container-low p-4 rounded-xl border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Real-Time Odometer</p>
                <p className="text-2xl font-black text-primary-container">42,891 <span className="text-sm font-normal text-slate-500">mi</span></p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fuel Level</p>
                <div className="flex items-end gap-3">
                  <p className="text-2xl font-black text-primary-container">84%</p>
                  <div className="flex-1 h-2.5 bg-slate-200 rounded-full mb-1.5">
                    <div className="h-full bg-secondary-container rounded-full" style={{ width: "84%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-primary-container text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container/90 active:scale-95 transition-all shadow-sm">
                <MdEditNote className="text-sm" />
                Update Specs
              </button>
              <button className="border-2 border-primary-container text-primary-container px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container/5 active:scale-95 transition-all">
                <MdHistory className="text-sm" />
                Service History
              </button>
            </div>
          </div>
          <div className="hidden lg:block w-96 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 p-6 shadow-xl">
            <h3 className="text-[10px] font-bold text-primary-container mb-4 uppercase tracking-widest">Engine Diagnostics</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-slate-500 font-medium">Oil Temperature</span>
                  <span className="font-bold text-primary-container">210°F</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-slate-500 font-medium">Tire Pressure (Avg)</span>
                  <span className="font-bold text-primary-container">105 PSI</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-slate-500 font-medium">Coolant Level</span>
                  <span className="font-bold text-primary-container">Optimal</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Efficiency & Performance Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
        {/* Efficiency Trends */}
        <div className="col-span-12 lg:col-span-8 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-primary-container">Efficiency Trends</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm font-medium rounded-lg px-3 py-2 text-slate-600 focus:ring-2 focus:ring-secondary-container outline-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="flex gap-8 mb-8">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fuel Economy</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-primary-container">7.6</p>
                <p className="text-slate-500 font-medium">MPG</p>
                <span className="text-green-500 text-sm font-bold flex items-center gap-0.5">
                  <MdTrendingUp className="text-base" /> 4%
                </span>
              </div>
            </div>
            <div className="w-px bg-slate-200 h-12"></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">CO2 Emissions</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-primary-container">1.2</p>
                <p className="text-slate-500 font-medium">Tons</p>
                <span className="text-slate-400 text-sm font-bold">Stable</span>
              </div>
            </div>
          </div>
          <div className="h-36 md:h-48 flex items-end justify-between gap-2 px-2">
            {[40, 55, 45, 70, 65, 60, 50, 55, 60, 62, 58, 64].map((height, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t transition-colors duration-200 cursor-pointer relative group ${
                  i === 4 ? "bg-secondary-container" : "bg-slate-100 hover:bg-secondary-container"
                }`}
                style={{ height: `${height}%` }}
              >
                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-primary-container text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${i === 4 ? "opacity-100" : ""}`}>
                  {(7 + height / 100).toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance & Safety Widget */}
        <div className="col-span-12 lg:col-span-4 bg-primary-container p-6 rounded-2xl shadow-lg text-white">
          <h3 className="text-xl font-bold mb-6">Insurance & Safety</h3>
          <div className="space-y-6">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <p className="text-[10px] font-bold text-white/60 mb-2 uppercase tracking-widest">Compliance Status</p>
              <div className="flex items-center gap-2">
                <MdCheckCircle className="text-green-400 text-xl" />
                <span className="font-bold text-lg">Fully Compliant</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                <span className="text-white/60">Policy Number</span>
                <span className="font-medium">TX-9923481-BP</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                <span className="text-white/60">Expiration</span>
                <span className="font-medium">Oct 12, 2025</span>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-[10px] font-bold text-white/60 mb-3 uppercase tracking-widest">Documents</p>
              <div className="space-y-2">
                <a className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-colors group cursor-pointer" href="#">
                  <span className="text-sm">Insurance_Cert_RT4492.pdf</span>
                  <MdDownload className="text-sm group-hover:translate-y-0.5 transition-transform" />
                </a>
                <a className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-colors group cursor-pointer" href="#">
                  <span className="text-sm">Safety_Rating_2024.pdf</span>
                  <MdDownload className="text-sm group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance & Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Maintenance Logs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-primary-container">Maintenance Logs</h3>
            <button className="text-secondary-container text-sm font-bold hover:underline flex items-center gap-1">
              Schedule Service <MdArrowForward className="text-sm" />
            </button>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-100">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Task</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-bold text-primary-container">Oil & Filter Change</td>
                  <td className="px-4 py-4 text-sm text-slate-500">Mar 15, 2024</td>
                  <td className="px-4 py-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">Completed</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-bold text-primary-container">Brake Pad Replacement</td>
                  <td className="px-4 py-4 text-sm text-slate-500">Apr 02, 2024</td>
                  <td className="px-4 py-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-secondary-container/10 text-secondary-container">Upcoming</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-bold text-primary-container">DPF Regeneration</td>
                  <td className="px-4 py-4 text-sm text-slate-500">Feb 28, 2024</td>
                  <td className="px-4 py-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">Completed</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-bold text-primary-container">Transmission Flush</td>
                  <td className="px-4 py-4 text-sm text-slate-500">May 10, 2024</td>
                  <td className="px-4 py-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Vehicle Inspection Reports */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-primary-container">Inspection Reports</h3>
            <button className="bg-secondary-container text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary-container/90 active:scale-95 transition-all shadow-sm">
              New DVIR
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 hover:border-primary-container/50 hover:shadow-sm transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <MdDescription className="text-slate-400 text-xl group-hover:text-primary-container transition-colors" />
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Pass</span>
              </div>
              <h4 className="font-bold text-primary-container text-sm mb-1">Pre-Trip Safety Check</h4>
              <p className="text-xs text-slate-500">Mar 22, 2024 • 06:15 AM</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 hover:border-primary-container/50 hover:shadow-sm transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <MdDescription className="text-slate-400 text-xl group-hover:text-primary-container transition-colors" />
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Pass</span>
              </div>
              <h4 className="font-bold text-primary-container text-sm mb-1">Post-Trip Analysis</h4>
              <p className="text-xs text-slate-500">Mar 21, 2024 • 07:45 PM</p>
            </div>
            <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/30 hover:border-orange-300 hover:shadow-sm transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <MdWarning className="text-orange-400 text-xl" />
                <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Minor Alert</span>
              </div>
              <h4 className="font-bold text-primary-container text-sm mb-1">Pre-Trip Safety Check</h4>
              <p className="text-xs text-slate-500">Mar 20, 2024 • 06:00 AM</p>
              <p className="text-[10px] text-orange-600 mt-2 font-medium">Lower running light dim</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 hover:border-primary-container/50 hover:shadow-sm transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <MdDescription className="text-slate-400 text-xl group-hover:text-primary-container transition-colors" />
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Pass</span>
              </div>
              <h4 className="font-bold text-primary-container text-sm mb-1">DOT Annual Inspection</h4>
              <p className="text-xs text-slate-500">Jan 12, 2024 • 11:30 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-container/10 rounded-xl">
              <MdSpeed className="text-primary-container text-2xl" />
            </div>
            <span className="text-green-500 text-sm font-bold flex items-center gap-1">
              <MdTrendingUp className="text-base" /> 2.4%
            </span>
          </div>
          <p className="text-3xl font-black text-primary-container mb-1">98.5%</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Uptime Rate</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-secondary-container/10 rounded-xl">
              <MdLocalGasStation className="text-secondary-container text-2xl" />
            </div>
            <span className="text-green-500 text-sm font-bold flex items-center gap-1">
              <MdTrendingUp className="text-base" /> 4%
            </span>
          </div>
          <p className="text-3xl font-black text-primary-container mb-1">7.6</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Avg MPG</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-container/10 rounded-xl">
              <MdCo2 className="text-primary-container text-2xl" />
            </div>
            <span className="text-slate-400 text-sm font-bold">Stable</span>
          </div>
          <p className="text-3xl font-black text-primary-container mb-1">1.2</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">CO2 Tons</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-secondary-container/10 rounded-xl">
              <MdAssignment className="text-secondary-container text-2xl" />
            </div>
            <span className="text-green-500 text-sm font-bold">Active</span>
          </div>
          <p className="text-3xl font-black text-primary-container mb-1">12</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Trips</p>
        </div>
      </section>

      {/* Vehicle Specifications */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-primary-container">Vehicle Specifications</h3>
          <button className="text-primary-container text-sm font-bold flex items-center gap-1 hover:underline">
            Edit Details <MdArrowForward className="text-sm" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Engine Type</span>
              <span className="text-sm font-bold text-primary-container">Detroit DD15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Horsepower</span>
              <span className="text-sm font-bold text-primary-container">505 HP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Transmission</span>
              <span className="text-sm font-bold text-primary-container">DT12 Automated</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">GVWR</span>
              <span className="text-sm font-bold text-primary-container">80,000 lbs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Trailer Type</span>
              <span className="text-sm font-bold text-primary-container">53&rsquo; Dry Van</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Axle Config</span>
              <span className="text-sm font-bold text-primary-container">6x4</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Last Service</span>
              <span className="text-sm font-bold text-primary-container">Mar 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Next Service</span>
              <span className="text-sm font-bold text-secondary-container">Apr 02, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Insurance</span>
              <span className="text-sm font-bold text-green-600">Valid</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
