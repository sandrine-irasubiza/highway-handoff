"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdAddCircle,
  MdLocalShipping,
  MdMail,
  MdSettings,
  MdSearch,
  MdNotifications,
  MdHelpOutline,
  MdAccountCircle,
  MdPerson,
  MdLogout,
  MdMenu,
  MdClose,
  MdFlashOn,
} from "react-icons/md";

const navLinks = [
  { href: "/sender/dashboard", label: "Dashboard", icon: MdDashboard },
  { href: "/sender/smart-match", label: "Smart Match", icon: MdFlashOn },
  { href: "/sender/create-shipment", label: "New Shipment", icon: MdAddCircle },
  { href: "/sender/shipments", label: "My Shipments", icon: MdLocalShipping },
  { href: "/sender/messages", label: "Messages", icon: MdMail },
  { href: "/sender/notifications", label: "Notifications", icon: MdNotifications },
  { href: "/sender/settings", label: "Settings", icon: MdSettings },
  { href: "/sender/profile", label: "Profile", icon: MdPerson },
];

export default function SenderLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/sender/messages" || pathname === "/sender/profile") {
    return children;
  }

  return (
    <div className="bg-background text-on-background antialiased min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Top Bar */}
      <header className="fixed top-0 w-full h-16 z-50 flex items-center justify-between px-4 md:px-6 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 -ml-2 text-slate-600"
            onClick={() => setSidebarOpen(true)}
          >
            <MdMenu className="text-2xl" />
          </button>
          <span className="text-lg font-black text-indigo-900 tracking-tighter">Highway Hand-Off</span>
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 w-64">
            <MdSearch className="text-slate-500 text-lg mr-2" />
            <input className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" placeholder="Search shipments..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/sender/notifications">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all">
              <MdNotifications className="text-xl" />
            </button>
          </a>
          <button className="hidden sm:block p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all">
            <MdHelpOutline className="text-xl" />
          </button>
          <a className="flex items-center gap-2 p-1 pl-3 hover:bg-slate-50 rounded-full transition-all" href="/sender/profile">
            <span className="text-xs font-semibold text-slate-700 hidden sm:block">Account</span>
            <MdAccountCircle className="text-indigo-900 text-xl" />
          </a>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 z-50 flex flex-col py-6 bg-white border-r border-outline-variant transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="md:hidden absolute top-2 right-2 p-2 text-slate-500 hover:text-slate-700"
          onClick={() => setSidebarOpen(false)}
        >
          <MdClose className="text-xl" />
        </button>
        <div className="px-6 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Portal Access</p>
          <p className="text-lg font-black text-primary mt-1">Logistics Pro</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                className={`flex items-center px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-sm shadow-primary/20"
                    : "text-slate-500 hover:bg-surface-container-high"
                }`}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3 text-[22px]" />
                <span className="text-sm font-semibold">{link.label}</span>
              </a>
            );
          })}
        </nav>
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-error hover:bg-red-50 transition-all mx-2 rounded-lg mt-auto w-full text-left"
        >
          <MdLogout className="text-xl" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </aside>

      {/* Main */}
      <main className="md:ml-64 pt-16 min-h-screen p-4 md:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-outline-variant py-12 md:ml-64">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xl font-black text-primary tracking-tighter">Logistics Pro</p>
          <div className="flex gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a className="hover:text-primary transition-colors" href="#">Terms</a>
            <a className="hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="hover:text-primary transition-colors" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
