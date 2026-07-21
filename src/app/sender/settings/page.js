"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  MdPerson,
  MdSecurity,
  MdNotificationsActive,
  MdAutoFixHigh,
  MdPhotoCamera,
  MdVibration,
  MdLocationOn,
  MdSchedule,
  MdTimerOff,
} from "react-icons/md";

export default function SenderSettings() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sender/profile")
      .then((r) => r.json())
      .then((d) => { setProfile(d.user); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    await fetch("/api/sender/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
  };

  if (loading) return <div className="text-center py-20 text-lg font-semibold">Loading...</div>;

  return (
    <div className="space-y-8">

      <header>
        <h1 className="text-2xl font-bold text-primary">Account Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your sender profile, notification preferences, and logistics settings.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Profile Information */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-primary flex items-center gap-2">
                <MdPerson className="text-xl" />
                Profile Information
              </h3>
              <button onClick={handleSave} className="bg-gradient-to-r from-primary-container to-primary text-white px-5 py-2 rounded-xl text-[11px] font-bold tracking-wider transition-all hover:shadow-lg active:scale-95 shadow-sm">
                SAVE CHANGES
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-md relative group cursor-pointer border-2 border-slate-100">
                  <Image
                    alt="Profile avatar"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="96px"
                    unoptimized
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIHYrh21JPjdliG5157oj7cZQJhNOv9AXXKINC8s2_zwkR40Ly0IFgTy91uqSZJP7HLTtX3i4D1jKi8RmNHtEWm-ODQu1sHTMKjcyRK88p_wH56yOzaAN6ew5abe4iBzgJ4FFgOoH8-olvvTNXO0XEXZNXtgDninM4q4IJHDWnlqCrzNFRCl3r1WFZ0UnEd20p8KXjez0txH1nEIiZIYXv6K1UyMM2RNGEKaxyhYSQvrLgMgyejWKtC8RB_YYzMN5fFgPNpL7Cwt8"
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 rounded-2xl">
                    <MdPhotoCamera className="text-white text-2xl" />
                    <span className="text-[10px] text-white font-bold">UPDATE</span>
                  </div>
                </div>
                <button className="text-[11px] font-bold text-primary hover:text-primary-container transition-colors tracking-wider">Change Photo</button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                  <input
                    className="w-full border border-slate-200 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container rounded-xl px-4 py-3 text-sm bg-white transition-all outline-none"
                    type="text"
                    value={profile?.firstName ? `${profile.firstName} ${profile.lastName || ""}`.trim() : ""}
                    onChange={(e) => {
                      const parts = e.target.value.split(" ");
                      setProfile({ ...profile, firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "" });
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                  <input
                    className="w-full border border-slate-200 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container rounded-xl px-4 py-3 text-sm bg-white transition-all outline-none"
                    type="email"
                    value={profile?.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                  <input
                    className="w-full border border-slate-200 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container rounded-xl px-4 py-3 text-sm bg-white transition-all outline-none"
                    type="tel"
                    value={profile?.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Access */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-primary flex items-center gap-2 mb-6">
              <MdSecurity className="text-xl" />
              Security & Access
            </h3>
            <div className="space-y-6">
              <div className="p-5 bg-surface-container-high/30 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary-container/10 flex items-center justify-center">
                    <MdVibration className="text-primary-container text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500">Added security for account-level changes</p>
                  </div>
                </div>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider border border-green-200">ENABLED</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">New Password</label>
                  <input
                    className="w-full border border-slate-200 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container rounded-xl px-4 py-3 text-sm bg-white outline-none"
                    placeholder="••••••••••••"
                    type="password"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Confirm Password</label>
                  <input
                    className="w-full border border-slate-200 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container rounded-xl px-4 py-3 text-sm bg-white outline-none"
                    placeholder="••••••••••••"
                    type="password"
                  />
                </div>
              </div>
              <button className="text-primary text-[11px] font-bold border-2 border-primary/20 px-6 py-2 rounded-xl hover:bg-primary/5 hover:border-primary transition-all active:scale-95 tracking-wider">
                UPDATE PASSWORD
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Notifications */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-primary flex items-center gap-2 mb-6">
              <MdNotificationsActive className="text-xl" />
              Notifications
            </h3>
            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Shipment Updates</p>
                  <p className="text-xs text-slate-500">Real-time status changes and delays</p>
                </div>
                <button className="w-11 h-5 bg-primary-container rounded-full relative transition-colors duration-200 flex-shrink-0">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></span>
                </button>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Direct Messages</p>
                  <p className="text-xs text-slate-500">Communications from active carriers</p>
                </div>
                <button className="w-11 h-5 bg-primary-container rounded-full relative transition-colors duration-200 flex-shrink-0">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></span>
                </button>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Financial Alerts</p>
                  <p className="text-xs text-slate-500">Invoices and payment confirmations</p>
                </div>
                <button className="w-11 h-5 bg-slate-200 rounded-full relative transition-colors duration-200 flex-shrink-0">
                  <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></span>
                </button>
              </div>
            </div>
          </section>

          {/* Logistics Defaults */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-primary flex items-center gap-2 mb-6">
              <MdAutoFixHigh className="text-xl" />
              Logistics Defaults
            </h3>
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Default Pickup Hub</label>
                <div className="flex items-center gap-4 bg-surface-container-high/30 p-4 rounded-xl border border-slate-100 hover:border-primary-container/50 transition-colors cursor-pointer">
                  <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                    <MdLocationOn className="text-primary text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Central Station Terminal 4</p>
                    <p className="text-xs text-slate-500">Chicago, IL 60601</p>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Business Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                    <MdSchedule className="text-slate-400 text-sm flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold leading-none mb-1 uppercase tracking-widest">Start</p>
                      <p className="text-sm font-bold text-primary">06:00 AM</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                    <MdTimerOff className="text-slate-400 text-sm flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold leading-none mb-1 uppercase tracking-widest">End</p>
                      <p className="text-sm font-bold text-primary">10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="h-36 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <Image
                    alt="Default pickup location map"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    unoptimized
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6dXYcrbhwFeHdEAwBoHVbr8uP9lZXEjHlefSMHqbFLE9eruMBTDVv1pmuWEK8YpBA98ZTg_wPdwE9wHFCrMxqMfR5QUOY5Svvlzd7joneTse76Zcd8LFcr7qgzbuEJq2dFXx05yMEtJsluU_a0D5vHXanWJPJk6pdd1ghswjYDlZ5rVyUdNdyp7vDJobb-UW6pQMqhvudSzlyR3l82czhBpLFYpejwMKfDGRfKtmpV5tQEB6fl4QrFQKJqwP3Y4kV3NnsliAYpY4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none rounded-2xl"></div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-white">
                    <span className="text-[10px] font-bold text-primary">VIEW FULL MAP</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
