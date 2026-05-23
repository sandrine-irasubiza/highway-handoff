"use client";

import Image from "next/image";
import {
  MdPerson,
  MdPhotoCamera,
  MdLocalShipping,
  MdLocationOn,
  MdNotificationsActive,
  MdSecurity,
  MdVibration,
  MdLockReset,
  MdVerifiedUser,
  MdWorkHistory,
  MdTimer,
  MdPayments,
  MdAccountBalanceWallet,
  MdAdd,
  MdClose,
  MdExpandMore,
  MdChevronRight,
} from "react-icons/md";
import { useState } from "react";

export default function DriverSettings() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
  });

  const [privacy, setPrivacy] = useState({
    locationSharing: true,
    publicProfile: false,
  });

  const [preferences, setPreferences] = useState({
    restBreakReminders: true,
    autoAccept: false,
  });

  const toggle = (section, key) => {
    if (section === "notifications") {
      setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    } else if (section === "privacy") {
      setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
    } else if (section === "preferences") {
      setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className="space-y-4 md:space-y-8">

      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-black text-primary-container">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your account, vehicle preferences, and security protocols.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[11px] font-bold text-green-600 uppercase tracking-wider">Profile Active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
        {/* ===== LEFT COLUMN ===== */}
        <div className="lg:col-span-7 space-y-4 md:space-y-6">

          {/* --- Profile Information --- */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
              <MdPerson className="text-primary-container text-xl" />
              <h3 className="text-lg font-bold text-primary-container">Profile Information</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-slate-100 shadow-md">
                      <Image
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="112px"
                        unoptimized
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1Qbzbw0Du1y5OU4XIVjrFnzb9HVforOv3grufG14j5kWt-EOdodVJ5QyLPNyqw1D-O3vPEF3qc4vMfoYfYgRHMwusGdBWJngbZsklWI6hkTTI5g5i_i1VqyPryPHio_s7Q0HL4HorTE3ojnoRrPz-EhSmOfwryg-9Fr_Afk0UBadrfXFGDUZ1OUb_ZlSbnnZQA8_tJsVxI-g1s2vIgX8nptAb9IGev3f0eX-TAnA2Ijo8wzPpTFgZV6g0UEgDjCN0UWwfKGTEhQk"
                        alt="Driver profile"
                      />
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-primary-container text-white p-2 rounded-xl shadow-lg hover:bg-primary transition-all active:scale-90">
                      <MdPhotoCamera className="text-sm" />
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Change Photo</span>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                    <input
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
                      type="text"
                      defaultValue="Marcus Sterling"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Employee ID</label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-500 cursor-not-allowed"
                      type="text"
                      defaultValue="HHO-992-DELTA"
                      readOnly
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                    <input
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
                      type="email"
                      defaultValue="m.sterling@highwayhandoff.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                    <input
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
                      type="tel"
                      defaultValue="+1 (555) 012-3456"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6 pt-6 border-t border-slate-100">
                <button className="bg-primary-container text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm hover:bg-primary transition-all active:scale-95">
                  Save Account Details
                </button>
              </div>
            </div>
          </section>

          {/* --- Vehicle & Route Preferences --- */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
              <MdLocalShipping className="text-primary-container text-xl" />
              <h3 className="text-lg font-bold text-primary-container">Vehicle &amp; Route Preferences</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Default Vehicle</label>
                  <div className="relative">
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface appearance-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all">
                      <option>2022 Isuzu FSR (KBZ 452X)</option>
                      <option>2023 Mitsubishi Fuso (KCA 781M)</option>
                      <option>2021 Toyota Hiace (KBS 113T)</option>
                    </select>
                    <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Default Capacity</label>
                  <div className="relative">
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface appearance-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all">
                      <option>Heavy Duty (40+ Tons)</option>
                      <option>Medium Duty (15-39 Tons)</option>
                      <option>Light Duty (Under 15 Tons)</option>
                    </select>
                    <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg" />
                  </div>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Preferred Hub</label>
                  <div className="relative">
                    <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
                      type="text"
                      defaultValue="Chicago Central Reliability Hub"
                    />
                  </div>
                </div>
              </div>

              {/* Route Corridors */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Preferred Route Corridors</label>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[100px] flex flex-wrap gap-2 content-start">
                  {["I-80 Midwest", "Tri-State Corridor", "Great Lakes Loop"].map((route) => (
                    <span
                      key={route}
                      className="inline-flex items-center gap-1.5 bg-white border border-primary-container/20 text-primary-container px-3 py-1.5 rounded-full text-[11px] font-bold shadow-sm"
                    >
                      {route}
                      <MdClose className="text-sm cursor-pointer hover:text-error transition-colors" />
                    </span>
                  ))}
                  <button className="inline-flex items-center gap-1 border-2 border-dashed border-slate-300 text-slate-400 px-3 py-1.5 rounded-full text-[11px] font-bold hover:border-primary-container hover:text-primary-container transition-all">
                    <MdAdd className="text-sm" />
                    Add Route
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 italic">Selected corridors will prioritize hand-off matching.</p>
              </div>

              <div className="flex justify-end pt-2">
                <button className="bg-primary-container text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm hover:bg-primary transition-all active:scale-95">
                  Update Preferences
                </button>
              </div>
            </div>
          </section>

          {/* --- Working Preferences --- */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
              <MdWorkHistory className="text-primary-container text-xl" />
              <h3 className="text-lg font-bold text-primary-container">Working Preferences</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Default Shift Start</label>
                  <input
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
                    type="time"
                    defaultValue="06:00"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Default Shift End</label>
                  <input
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all"
                    type="time"
                    defaultValue="18:00"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Max Route Radius</label>
                  <div className="relative">
                    <select defaultValue="500 km" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface appearance-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all">
                      <option>200 km</option>
                      <option>350 km</option>
                      <option>500 km</option>
                      <option>750 km</option>
                    </select>
                    <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Break Duration</label>
                  <div className="relative">
                    <select defaultValue="45 min" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface appearance-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all">
                      <option>30 min</option>
                      <option>45 min</option>
                      <option>60 min</option>
                    </select>
                    <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg" />
                  </div>
                </div>
              </div>

              {/* Toggle Preferences */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-primary-container">Rest Break Reminders</p>
                    <p className="text-xs text-slate-500">Get prompted for mandatory rest stops</p>
                  </div>
                  <button
                    onClick={() => toggle("preferences", "restBreakReminders")}
                    className={`w-11 h-5 rounded-full relative transition-colors duration-200 flex-shrink-0 ${
                      preferences.restBreakReminders ? "bg-primary-container" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                        preferences.restBreakReminders ? "right-0.5" : "left-0.5"
                      }`}
                    ></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-primary-container">Auto-Accept Nearby Trips</p>
                    <p className="text-xs text-slate-500">Automatically accept trips within 5 km radius</p>
                  </div>
                  <button
                    onClick={() => toggle("preferences", "autoAccept")}
                    className={`w-11 h-5 rounded-full relative transition-colors duration-200 flex-shrink-0 ${
                      preferences.autoAccept ? "bg-primary-container" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                        preferences.autoAccept ? "right-0.5" : "left-0.5"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="lg:col-span-5 space-y-4 md:space-y-6">

          {/* --- Notification Settings --- */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
              <MdNotificationsActive className="text-primary-container text-xl" />
              <h3 className="text-lg font-bold text-primary-container">Notifications</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary-container">Push Notifications</p>
                  <p className="text-xs text-slate-500">Real-time trip &amp; hand-off alerts</p>
                </div>
                <button
                  onClick={() => toggle("notifications", "push")}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0 ${
                    notifications.push ? "bg-primary-container" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      notifications.push ? "right-0.5" : "left-0.5"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary-container">Email Summaries</p>
                  <p className="text-xs text-slate-500">Weekly fleet performance data</p>
                </div>
                <button
                  onClick={() => toggle("notifications", "email")}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0 ${
                    notifications.email ? "bg-primary-container" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      notifications.email ? "right-0.5" : "left-0.5"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary-container">SMS Emergency</p>
                  <p className="text-xs text-slate-500">Critical route delay bypass</p>
                </div>
                <button
                  onClick={() => toggle("notifications", "sms")}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0 ${
                    notifications.sms ? "bg-primary-container" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      notifications.sms ? "right-0.5" : "left-0.5"
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </section>

          {/* --- Security & Privacy --- */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
              <MdSecurity className="text-primary-container text-xl" />
              <h3 className="text-lg font-bold text-primary-container">Security &amp; Privacy</h3>
            </div>
            <div className="p-6 space-y-5">
              {/* 2FA Status */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <MdVerifiedUser className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary-container">2FA Security</p>
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Status: Active</p>
                  </div>
                </div>
                <button className="text-primary-container text-[11px] font-bold hover:underline flex items-center gap-1">
                  Manage <MdChevronRight className="text-sm" />
                </button>
              </div>

              {/* Update Password */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Password</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container transition-all"
                    placeholder="New password"
                    type="password"
                  />
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container transition-all"
                    placeholder="Confirm password"
                    type="password"
                  />
                </div>
                <button className="flex items-center gap-2 text-primary-container text-[11px] font-bold border-2 border-primary-container/20 px-5 py-2 rounded-xl hover:bg-primary-container/5 hover:border-primary-container transition-all active:scale-95">
                  <MdLockReset className="text-sm" />
                  Update Password
                </button>
              </div>

              <hr className="border-slate-200" />

              {/* Privacy Controls */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Privacy Controls</label>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={privacy.locationSharing}
                      onChange={() => toggle("privacy", "locationSharing")}
                      className="mt-0.5 w-4 h-4 rounded text-primary-container focus:ring-primary-container/30 border-slate-300"
                    />
                    <div>
                      <p className="text-sm font-bold text-primary-container">Location Sharing</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        Allow real-time monitoring while on duty for precise automated hand-off coordination.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={privacy.publicProfile}
                      onChange={() => toggle("privacy", "publicProfile")}
                      className="mt-0.5 w-4 h-4 rounded text-primary-container focus:ring-primary-container/30 border-slate-300"
                    />
                    <div>
                      <p className="text-sm font-bold text-primary-container">Public Fleet Profile</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        Display your availability and performance status to other verified fleet network drivers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Payment Settings --- */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
              <MdPayments className="text-primary-container text-xl" />
              <h3 className="text-lg font-bold text-primary-container">Payment Settings</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Default Payout Method</label>
                <div className="relative">
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-on-surface appearance-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all">
                    <option>Bank Transfer (•••• 4421)</option>
                    <option>Mobile Wallet (•••• 8902)</option>
                    <option>Direct Deposit - Wire</option>
                  </select>
                  <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Payout Schedule</label>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center">
                    <MdAccountBalanceWallet className="text-primary-container text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-primary-container">Weekly Settlement</p>
                    <p className="text-[10px] text-slate-500">Every Friday by 14:00</p>
                  </div>
                  <button className="text-primary-container text-[11px] font-bold hover:underline flex items-center gap-1 whitespace-nowrap">
                    Change <MdChevronRight className="text-sm" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-primary-container/5 p-4 rounded-xl border border-primary-container/10">
                <div className="flex items-center gap-3">
                  <MdTimer className="text-primary-container text-lg" />
                  <div>
                    <p className="text-sm font-bold text-primary-container">Pending Balance</p>
                    <p className="text-lg font-black text-primary-container">$1,240.00</p>
                  </div>
                </div>
                <button className="bg-primary-container text-white text-xs font-bold px-5 py-2 rounded-xl shadow-sm hover:bg-primary transition-all active:scale-95">
                  Withdraw
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
