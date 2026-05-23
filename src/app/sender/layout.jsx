"use client";

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
} from "react-icons/md";

const navLinks = [
  { href: "/sender/dashboard", label: "Dashboard", icon: MdDashboard },
  { href: "/sender/create-shipment", label: "New Shipment", icon: MdAddCircle },
  { href: "/sender/shipments", label: "My Shipments", icon: MdLocalShipping },
  { href: "/sender/messages", label: "Messages", icon: MdMail },
  { href: "/sender/notifications", label: "Notifications", icon: MdNotifications },
  { href: "/sender/settings", label: "Settings", icon: MdSettings },
  { href: "/sender/profile", label: "Profile", icon: MdPerson },
  
];

export default function SenderLayout({ children }) {
  const pathname = usePathname();

  if (pathname === "/sender/messages" || pathname === "/sender/profile") {
    return children;
  }

  return (
    <div className="bg-background font-body-md text-on-background antialiased">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full h-16 z-50 flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-8">
          <span className="text-xl font-black text-indigo-900 tracking-tighter">Highway Hand-Off</span>
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 w-64">
            <MdSearch className="text-slate-500 text-lg mr-2" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
              placeholder="Search shipments..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
        
<a href="/sender/notifications">

  <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full active:scale-95 transition-all">
            <MdNotifications className="text-xl" />
          </button>

</a>

          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full active:scale-95 transition-all">
            <MdHelpOutline className="text-xl" />
          </button>
          <a
            className="flex items-center gap-2 p-1 pl-3 hover:bg-slate-50 rounded-full active:scale-95 transition-all"
            href="/sender/profile"
          >
            <span className="text-xs font-semibold text-slate-700">Account</span>
            <MdAccountCircle className="text-indigo-900 text-xl" />
          </a>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 z-40 flex flex-col py-6 bg-white border-r border-outline-variant">
        <div className="px-6 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/60">
            Portal Access
          </p>
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
                    ? "bg-primary text-on-primary shadow-sm shadow-primary/20"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
                href={link.href}
              >
                <Icon className="mr-3 text-[22px]" />
                <span className="text-sm font-semibold">{link.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="px-6 py-4 mt-auto">
          <div className="bg-surface-container p-4 rounded-xl">
            <p className="text-xs font-bold text-on-surface mb-1">Pro Support</p>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              24/7 dedicated kinetic logistics assistance.
            </p>
          </div>
        </div>

<a href="/login" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-error hover:bg-red-50 transition-all mx-2 rounded-lg">
          <MdLogout className="text-xl" />
          <span className="text-sm font-medium">Sign Out</span>
        </a>

      </aside>

      {/* Main Content */}
      <main className="ml-64 mt-16 min-h-screen p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-outline-variant py-16 ml-64">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-xl font-black text-primary tracking-tighter">Logistics Pro</p>
            <p className="text-xs text-on-surface-variant leading-loose max-w-xs uppercase tracking-widest font-bold opacity-60 italic">
              &copy; 2024 Kinetic Mobility Solutions. Engineered for ultimate reliability.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-6 justify-center md:justify-end items-center">
            <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest" href="#">Terms</a>
            <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest" href="#">Privacy</a>
            <a className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest" href="#">Support</a>
            <a className="px-6 py-2 border-2 border-primary/10 rounded-full text-xs font-bold text-primary hover:bg-primary/5 transition-all uppercase tracking-widest" href="#">Safety Hub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
