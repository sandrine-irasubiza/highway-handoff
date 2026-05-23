"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MdPersonAdd,
  MdLocalShipping,
  MdDescription,
  MdFactCheck,
  MdHeadsetMic,
  MdShield,
  MdHelpOutline,
  MdLanguage,
  MdMail,
  MdPhone,
  MdVerifiedUser,
  MdSpeed,
  MdSupportAgent,
  MdArrowForward,
} from "react-icons/md";

export default function DriverSignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    carrierType: "Owner Operator",
    experience: "",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md text-on-background">
      {/* TopAppBar */}
      <header className="bg-white text-indigo-900 text-sm tracking-wide border-b border-slate-200 shadow-sm flex justify-between items-center w-full px-6 py-3 h-16 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="text-xl font-black tracking-tighter text-indigo-900 uppercase">Highway Hand-Off</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            <span className="cursor-pointer hover:bg-slate-50 transition-colors duration-200 p-2 rounded-full">
              <MdHelpOutline className="text-xl" />
            </span>
            <span className="cursor-pointer hover:bg-slate-50 transition-colors duration-200 p-2 rounded-full">
              <MdLanguage className="text-xl" />
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SideNavBar - Registration Progress */}
        <aside className="bg-slate-50 text-indigo-900 font-medium h-full w-64 border-r border-slate-200 hidden lg:flex flex-col sticky left-0 top-0">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                <MdPersonAdd className="text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-indigo-900 leading-none">Onboarding</h2>
                <p className="text-xs text-slate-500 mt-1">Step 1 of 4</p>
              </div>
            </div>
            <nav className="flex-1 space-y-1">
              <a className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-900 border-r-4 border-indigo-900 cursor-pointer transition-all duration-300">
                <MdPersonAdd className="text-xl" />
                <span>Registration</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 cursor-pointer transition-all duration-300">
                <MdLocalShipping className="text-xl" />
                <span>Vehicle Info</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 cursor-pointer transition-all duration-300">
                <MdDescription className="text-xl" />
                <span>Documentation</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 cursor-pointer transition-all duration-300">
                <MdFactCheck className="text-xl" />
                <span>Review</span>
              </a>
            </nav>
          </div>
          <div className="mt-auto p-6 border-t border-slate-200">
            <nav className="space-y-1">
              <a className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-indigo-900 transition-colors">
                <MdHeadsetMic className="text-sm" />
                <span className="text-xs uppercase tracking-wider">Support</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-indigo-900 transition-colors">
                <MdShield className="text-sm" />
                <span className="text-xs uppercase tracking-wider">Privacy</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-surface-container-low p-4 md:p-6 xl:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section for Driver Trust */}
            <div className="relative h-48 rounded-xl overflow-hidden mb-6 shadow-sm border border-outline-variant">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-container to-transparent z-10"></div>
              <Image
                alt="Modern semi-truck driving on a scenic highway at dawn with soft golden light reflecting off the chrome details"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkpcBVioMt77iWvctJirtg1lttrmecdXkRxuB-2YKixRlRpnKSwCbJmozFA2_23TxIWm15_AgpfJpRChoyifPNFrtqZ2JgObrt4cQNPmjxXwyi05CL-cnMOoqLrdDa4eOHfubaqGys70Vj2_nI7o3bMPd5tIShhhcfKV7MH4b-MHUQFjTGwtjKNLfuQw1YOhKllgVI5Lo4ECw76nO-euirjf-m-xjkdxTn6U5de8dMQZuzc52wWMlvrlc7ZGGyNZjPEbdWlQO-RUI"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Drive with Authority.</h1>
                <p className="text-lg text-on-primary-container mt-1">Join the most reliable carrier network in the industry.</p>
              </div>
            </div>

            {/* Multi-Step Form Container (Card Style) */}
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-outline-variant overflow-hidden">
              {/* Form Header */}
              <div className="px-6 py-4 border-b border-outline-variant bg-surface-bright flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Personal Information</span>
                  <h2 className="text-2xl font-semibold text-on-surface">Carrier Profile</h2>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                </div>
              </div>

              {/* Main Form Section */}
              <div className="p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Section: Personal Identity */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">Legal First Name</span>
                      <input
                        className="w-full px-4 py-2 rounded border border-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-on-surface"
                        placeholder="John"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">Legal Last Name</span>
                      <input
                        className="w-full px-4 py-2 rounded border border-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-on-surface"
                        placeholder="Doe"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">Professional Email</span>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-2 pl-10 rounded border border-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-on-surface"
                          placeholder="john.doe@logistics.com"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <MdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg" />
                      </div>
                    </label>
                  </div>

                  {/* Section: Contact & Identity */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">Phone Number</span>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-2 pl-10 rounded border border-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-on-surface"
                          placeholder="+1 (555) 000-0000"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg" />
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">Carrier Type</span>
                      <select
                        className="w-full px-4 py-2 rounded border border-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-on-surface appearance-none bg-white"
                        value={formData.carrierType}
                        onChange={(e) => setFormData({ ...formData, carrierType: e.target.value })}
                      >
                        <option>Owner Operator</option>
                        <option>Fleet Driver</option>
                        <option>Dispatcher</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">Experience (Years)</span>
                      <input
                        className="w-full px-4 py-2 rounded border border-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 transition-all outline-none text-on-surface"
                        placeholder="5"
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      />
                    </label>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-outline-variant"></div>

                {/* Bento Style Grid for Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col items-center text-center">
                    <MdVerifiedUser className="text-primary text-2xl mb-1" />
                    <span className="text-xs font-bold uppercase text-on-surface block">Secure Data</span>
                    <p className="text-[11px] text-on-surface-variant">256-bit encryption for all personal details.</p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col items-center text-center">
                    <MdSpeed className="text-primary text-2xl mb-1" />
                    <span className="text-xs font-bold uppercase text-on-surface block">Fast Approval</span>
                    <p className="text-[11px] text-on-surface-variant">Average carrier verification under 24 hours.</p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col items-center text-center">
                    <MdSupportAgent className="text-primary text-2xl mb-1" />
                    <span className="text-xs font-bold uppercase text-on-surface block">24/7 Help</span>
                    <p className="text-[11px] text-on-surface-variant">Live dispatch assistance at every mile.</p>
                  </div>
                </div>

                {/* Form Action */}
                <div className="flex justify-between items-center">
                  <button className="px-6 py-2 text-xs font-bold uppercase border border-primary text-primary rounded hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 transition-transform">
                    Save Draft
                  </button>
                 <a href="/driver/dashboard">
                    <button className="px-8 py-2 text-xs font-bold uppercase bg-secondary text-white rounded hover:opacity-90 shadow-sm active:scale-95 transition-all flex items-center gap-1">
                    Next Step
                    <MdArrowForward className="text-sm" />
                  </button>

                 </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation (Hidden on LG+) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center py-3 z-50">
        <div className="flex flex-col items-center text-indigo-900">
          <MdPersonAdd className="text-xl" />
          <span className="text-[10px] font-bold uppercase mt-1">Profile</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <MdLocalShipping className="text-xl" />
          <span className="text-[10px] uppercase mt-1">Vehicle</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <MdDescription className="text-xl" />
          <span className="text-[10px] uppercase mt-1">Docs</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <MdFactCheck className="text-xl" />
          <span className="text-[10px] uppercase mt-1">Review</span>
        </div>
      </nav>

      {/* Footer */}
      <footer className="bg-white text-indigo-900 text-xs uppercase tracking-widest py-8 border-t border-slate-100 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-slate-900">Highway Hand-Off Logistics</span>
          <span className="text-slate-400 lowercase tracking-normal">© 2024. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a className="text-slate-400 hover:text-orange-500 transition-colors" href="#">Terms of Service</a>
          <a className="text-slate-400 hover:text-orange-500 transition-colors" href="#">Privacy Policy</a>
          <a className="text-slate-400 hover:text-orange-500 transition-colors" href="#">Carrier Agreement</a>
          <a className="text-slate-400 hover:text-orange-500 transition-colors" href="#">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
