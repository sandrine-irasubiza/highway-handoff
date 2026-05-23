"use client";

import Sidebar from "@/components/Sidebar";
import { MdNotifications, MdHelpOutline, MdLocalShipping, MdMenu } from "react-icons/md";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DriverLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/driver/messages" || pathname === "/driver/profile") {
    return children;
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-600 p-2 -ml-2"
              onClick={() => setSidebarOpen(true)}
            >
              <MdMenu className="text-2xl" />
            </button>
            <div className="flex items-center gap-2">
              <MdLocalShipping className="text-primary-container text-xl" />
              <h2 className="text-lg font-bold text-primary-container">Highway Hand-Off</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden sm:block">
              <input
                className="w-48 lg:w-64 bg-slate-100/50 border-transparent rounded-full py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary-container/20 outline-none transition-all"
                placeholder="Search..."
                type="text"
              />
              <MdHelpOutline className="absolute left-3.5 top-2.5 text-slate-400 text-lg" />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <a href="/driver/notifications"><MdNotifications className="text-xl" /></a>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-container rounded-full border-2 border-white"></span>
            </button>
            <button className="hidden sm:block p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <MdHelpOutline className="text-xl" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-xs cursor-pointer ring-2 ring-slate-100">
              <a href="/driver/profile">AM</a>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-primary-container text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <MdLocalShipping className="text-primary-container text-xl" />
                  </div>
                  <span className="text-lg font-black tracking-tighter">Highway Hand-Off</span>
                </div>
                <p className="text-white/60 text-sm">Smart rural-to-urban delivery platform.</p>
              </div>

              <div>
                <h4 className="font-bold mb-3 uppercase tracking-widest text-[11px]">Quick Links</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><a className="hover:text-white transition-colors" href="#">Find a Carrier</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Apply to Drive</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Fleet Solutions</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-3 uppercase tracking-widest text-[11px]">Support</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><a className="hover:text-white transition-colors" href="#">Help Center</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Safety Protocols</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-3 uppercase tracking-widest text-[11px]">Newsletter</h4>
                <form className="flex gap-2">
                  <input
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 w-full text-sm"
                    placeholder="Email address"
                    type="email"
                  />
                  <button className="bg-white text-primary-container px-4 py-2 rounded-lg font-bold hover:bg-slate-100 transition-colors text-sm whitespace-nowrap">Join</button>
                </form>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-center md:text-left">
              <p className="text-white/40 text-[11px]">&copy; 2024 Highway Hand-Off. Precision Logistics.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
