"use client";

import { useState } from "react";
import {
  MdNotifications,
  MdDoneAll,
  MdLocalShipping,
  MdPayments,
  MdTaskAlt,
  MdChatBubble,
  MdWarning,
  MdClose,
  MdExpandMore,
} from "react-icons/md";

const notifications = [
  {
    id: 1,
    type: "shipment",
    title: "Shipment Picked Up",
    time: "2 minutes ago",
    accent: "border-primary",
    icon: MdLocalShipping,
    iconBg: "bg-blue-50",
    iconColor: "text-primary",
    description: (
      <>
        Driver <span className="font-semibold">Marco Rossi</span> has successfully picked up Shipment{" "}
        <span className="font-semibold">#HH-29384</span> from the Chicago Logistics Hub. Estimated delivery is now 4:00 PM EST.
      </>
    ),
    actions: (
      <>
        <button className="bg-primary text-white text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg hover:opacity-90 transition-all">View Shipment</button>
        <button className="border border-primary text-primary text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg hover:bg-slate-50 transition-all">Track Real-time</button>
      </>
    ),
    unread: true,
  },
  {
    id: 2,
    type: "offer",
    title: "New Offer Received",
    time: "1 hour ago",
    accent: "border-secondary-container",
    icon: MdPayments,
    iconBg: "bg-orange-50",
    iconColor: "text-secondary-container",
    description: (
      <>
        You have a new price negotiation update from <span className="font-semibold">SwiftLink Logistics</span> for the Detroit route. Their latest offer is{" "}
        <span className="font-bold text-secondary-container">$1,250.00</span>.
      </>
    ),
    actions: (
      <>
        <button className="bg-secondary-container text-white text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg hover:opacity-90 transition-all">Review Offer</button>
        <button className="text-slate-500 text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg hover:bg-slate-50 transition-all">Counter Offer</button>
      </>
    ),
    unread: true,
  },
  {
    id: 3,
    type: "delivery",
    title: "Delivery Confirmed",
    time: "Yesterday, 5:42 PM",
    accent: "border-slate-200",
    icon: MdTaskAlt,
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
    description: (
      <>
        Shipment <span className="font-semibold">#HH-29312</span> has been delivered to the final destination in Newark. Proof of Delivery (POD) has been uploaded and is available for download.
      </>
    ),
    actions: (
      <>
        <button className="bg-slate-200 text-slate-700 text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg cursor-not-allowed">POD Downloaded</button>
        <button className="text-slate-500 text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg hover:bg-white transition-all">Archive</button>
      </>
    ),
    unread: false,
  },
  {
    id: 4,
    type: "message",
    title: "New Message from Carrier",
    time: "4 hours ago",
    accent: "border-blue-400",
    icon: MdChatBubble,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-400",
    description: (
      <>
        <span className="font-semibold italic">&ldquo;The dock entrance at the receiver&apos;s end is currently blocked by construction. Expecting a 20-minute delay for unloading.&rdquo;</span> &mdash; Sarah J., Fleet Dispatch
      </>
    ),
    actions: (
      <>
        <button className="bg-primary text-white text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg hover:opacity-90 transition-all">Reply Now</button>
        <button className="text-slate-500 text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg hover:bg-slate-50 transition-all">Mute Conversation</button>
      </>
    ),
    unread: true,
  },
  {
    id: 5,
    type: "account",
    title: "Insurance Expiring Soon",
    time: "Today, 8:00 AM",
    accent: "border-error",
    icon: MdWarning,
    iconBg: "bg-error-container",
    iconColor: "text-error",
    description: (
      <>
        Your liability insurance certificate for <span className="font-semibold">Hand-Off Primary</span> is set to expire in 3 days. Please upload a renewed certificate to avoid interruption in cargo booking.
      </>
    ),
    actions: (
      <button className="bg-error text-white text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg hover:opacity-90 transition-all">Upload Document</button>
    ),
    unread: true,
  },
];

const tabs = ["All", "Shipments", "Messages", "Account"];

export default function SenderNotifications() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? notifications
    : notifications.filter((n) => {
        if (activeTab === "Shipments") return n.type === "shipment" || n.type === "delivery" || n.type === "offer";
        if (activeTab === "Messages") return n.type === "message";
        if (activeTab === "Account") return n.type === "account";
        return true;
      });

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-secondary-container text-[12px] font-bold tracking-widest uppercase">Center</span>
          </div>
          <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
            Notifications
            <span className="bg-primary text-white text-sm px-3 py-1 rounded-full font-bold">12</span>
          </h2>
        </div>
        <button className="flex items-center gap-1 text-primary text-[12px] font-bold tracking-wider hover:underline active:scale-95 transition-all">
          <MdDoneAll className="text-sm" />
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-4 mb-6 pb-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[12px] font-bold whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-slate-500 hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification Cards */}
      <div className="space-y-4">
        {filtered.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${n.accent} flex flex-col md:flex-row gap-6 items-start transition-all hover:shadow-md ${
                !n.unread ? "bg-slate-50/50 border border-slate-200 opacity-75 grayscale-[0.5]" : ""
              }`}
            >
              <div className={`${n.iconBg} p-4 rounded-lg`}>
                <Icon className={`${n.iconColor} text-2xl`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-lg font-semibold text-on-surface">{n.title}</h4>
                  <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{n.time}</span>
                </div>
                <p className="text-base text-slate-600 mb-4 max-w-2xl">{n.description}</p>
                <div className="flex flex-wrap gap-2">{n.actions}</div>
              </div>
              <button className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0">
                <MdClose className="text-xl" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-1 text-slate-500 text-[12px] font-bold tracking-wider hover:text-primary transition-colors py-6">
          Load Older Notifications
          <MdExpandMore className="text-sm" />
        </button>
      </div>
    </div>
  );
}
