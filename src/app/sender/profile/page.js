"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MdArrowBack,
  MdVerifiedUser,
  MdStar,
  MdPerson,
  MdLocalShipping,
  MdBusiness,
  MdAccountBalanceWallet,
  MdNotifications,
  MdSecurity,
  MdHelpOutline,
  MdLogout,
  MdChevronRight,
  MdEdit,
  MdLocationOn,
} from "react-icons/md";

export default function SenderProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md px-4 md:px-6 py-3 flex items-center gap-3 max-w-2xl mx-auto">
        <Link
          href="/sender/dashboard"
          className="p-2 -ml-2 rounded-xl hover:bg-surface-container-high transition-colors"
        >
          <MdArrowBack className="text-2xl text-primary-container" />
        </Link>
        <h1 className="font-bold text-lg text-primary">Profile</h1>
      </div>

      <main className="pb-8 px-4 md:px-6 max-w-2xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="h-24 bg-gradient-to-br from-primary-container to-primary"></div>

          <div className="relative px-6 pb-6">
            <div className="relative -mt-12 mb-4 flex justify-center">
              <div className="relative">
                <Image
                  width={96}
                  height={96}
                  className="rounded-2xl object-cover border-4 border-white shadow-lg"
                  unoptimized
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEc4H09DwkW-7P95Ie4QVjvuTS7eicg0zju47I15SaZ-w1r-OO-JKGKMHrMnvZA_CdopDf-y8XUKGWG8J78ABBh-_4raxjkEqHJiaYEszHiQrSoC2IS8iDyyZuwq5gTwmzpCYiCahP-YDeCU3Hy9zAs8zjHvl8NxfAQMOL7o9SmywKYicKytNHwJ_MnAiCLARDwyNmPFF1c2WHIKXxKqr9kp9VjfSV_vY__12uDMqPTOeg4yc50R3KLggzfHRjKUhfI7O9jgofQgU"
                  alt="Alexander Sterling"
                />
                <div className="absolute -bottom-1 -right-1 bg-secondary-container text-white p-1.5 rounded-lg shadow-md">
                  <MdVerifiedUser className="text-sm" />
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="font-bold text-xl text-slate-900">Alexander Sterling</h2>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-xs font-bold text-primary-container uppercase tracking-wider">Verified Sender</span>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1 text-secondary-container">
                  <MdStar className="text-sm" />
                  <span className="font-bold text-sm">4.92</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 mt-1.5 text-xs text-slate-500">
                <MdLocationOn className="text-sm" />
                <span>Chicago, IL</span>
                <span className="text-slate-300 mx-1">|</span>
                <MdBusiness className="text-sm" />
                <span>Sterling Global Freight</span>
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-primary-container to-primary text-white font-bold text-sm rounded-xl shadow-md shadow-primary-container/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <MdEdit className="text-lg" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <p className="font-black text-2xl text-primary">1,284</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Shipments</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <p className="font-black text-2xl text-primary">$284k</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Spent</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <p className="font-black text-2xl text-primary">99.8%</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Success</p>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="mt-6 space-y-3">
          {/* Account Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-50">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account</p>
            </div>
            <a className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group" href="#">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
                  <MdPerson className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">Personal Information</p>
                  <p className="text-xs text-slate-500">Contact, Address, Company</p>
                </div>
              </div>
              <MdChevronRight className="text-slate-400 group-hover:text-primary-container transition-colors" />
            </a>
            <div className="border-t border-slate-50"></div>
            <a className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group" href="#">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
                  <MdBusiness className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">Company Details</p>
                  <p className="text-xs text-slate-500">Sterling Global Freight</p>
                </div>
              </div>
              <MdChevronRight className="text-slate-400 group-hover:text-primary-container transition-colors" />
            </a>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-50">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Preferences</p>
            </div>
            <a className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group" href="#">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
                  <MdAccountBalanceWallet className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">Payment Methods</p>
                  <p className="text-xs text-slate-500">Cards, Invoicing, Credits</p>
                </div>
              </div>
              <MdChevronRight className="text-slate-400 group-hover:text-primary-container transition-colors" />
            </a>
            <div className="border-t border-slate-50"></div>
            <a className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group" href="#">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
                  <MdNotifications className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">Notifications</p>
                  <p className="text-xs text-slate-500">Email, SMS, Shipment Alerts</p>
                </div>
              </div>
              <MdChevronRight className="text-slate-400 group-hover:text-primary-container transition-colors" />
            </a>
          </div>

          {/* Support Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-50">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Support</p>
            </div>
            <a className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group" href="#">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
                  <MdSecurity className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">Safety & Security</p>
                  <p className="text-xs text-slate-500">2FA, Privacy, Compliance</p>
                </div>
              </div>
              <MdChevronRight className="text-slate-400 group-hover:text-primary-container transition-colors" />
            </a>
            <div className="border-t border-slate-50"></div>
            <a className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group" href="#">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
                  <MdHelpOutline className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">Help & Support</p>
                  <p className="text-xs text-slate-500">24/7 Dispatch, FAQs</p>
                </div>
              </div>
              <MdChevronRight className="text-slate-400 group-hover:text-primary-container transition-colors" />
            </a>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 px-8 py-3 text-error font-semibold hover:bg-error-container/50 rounded-xl transition-colors">
            <MdLogout className="text-xl" />
           <a href="/login"> Log Out </a>
          </button>
        </div>
      </main>
    </div>
  );
}
