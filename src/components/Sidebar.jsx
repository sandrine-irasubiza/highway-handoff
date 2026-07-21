"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdLocalShipping,
  MdDirectionsCar,
  MdPayments,
  MdForum,
  MdNotifications,
  MdSettings,
  MdLogout,
  MdClose,
  MdHandshake,
  MdAddLocation,
} from "react-icons/md";

const navItems = [
  { href: "/driver/dashboard", label: "Dashboard", icon: MdDashboard },
  { href: "/driver/load-board", label: "Load Board", icon: MdHandshake },
  { href: "/driver/trips", label: "Trips", icon: MdLocalShipping },
  { href: "/driver/create-trip", label: "Create Trip", icon: MdAddLocation },
  { href: "/driver/fleet", label: "Fleet", icon: MdDirectionsCar },
  { href: "/driver/earnings", label: "Earnings", icon: MdPayments },
  { href: "/driver/messages", label: "Messages", icon: MdForum },
  { href: "/driver/notifications", label: "Notifications", icon: MdNotifications },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col py-6 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex`}>
      {/* Mobile Close Button */}
      <button
        className="md:hidden absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10"
        onClick={onClose}
      >
        <MdClose className="text-xl" />
      </button>

      <div className="px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
            <MdLocalShipping className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-primary-container uppercase">Highway Hand-Off</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Logistics Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary-container/10 text-primary-container border-r-4 border-secondary-container font-bold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-primary-container"
              }`}
              onClick={() => onClose?.()}
            >
              <Icon className="text-xl" />
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-slate-100 pt-4 px-2">
        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-error hover:bg-red-50 transition-all rounded-lg" href="/driver/settings">
          <MdSettings className="text-xl" />
          <span className="text-sm font-medium">Settings</span>
        </a>
        <a href="/driver/profile"><div className="px-4 py-4 flex items-center gap-3 bg-slate-50 mx-2 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
            AM
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-on-surface truncate">Alex Mwangi</p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">#9822 • Active</p>
          </div>
        </div></a>
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-error hover:bg-red-50 transition-all mx-2 rounded-lg w-full text-left"
        >
          <MdLogout className="text-xl" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
