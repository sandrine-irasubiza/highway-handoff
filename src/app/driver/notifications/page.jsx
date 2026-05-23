"use client";

import { useState } from "react";
import {
  MdNotifications,
  MdDoneAll,
  MdLocalShipping,
  MdPayments,
  MdCheckCircle,
  MdChatBubble,
  MdWarning,
  MdClose,
  MdExpandMore,
} from "react-icons/md";

const initialNotifications = [
  {
    id: 1,
    type: "trip",
    title: "New Smart Match Found",
    message: "A premium delivery match from Chicago to Denver is available. Estimated earnings: $2,450.",
    time: "Just now",
    unread: true,
    accent: "border-primary",
    icon: MdLocalShipping,
    iconBg: "bg-blue-50",
    iconColor: "text-primary",
    typeLabel: "Trip",
    typeStyle: "bg-blue-50 text-primary",
    actions: [
      { label: "Accept Match", primary: true },
      { label: "Details", primary: false },
    ],
  },
  {
    id: 2,
    type: "payment",
    title: "Deposit Confirmed",
    message: "Payment for Trip #TX-9981 deposited to wallet. Funds available for withdrawal.",
    time: "2 hours ago",
    unread: true,
    accent: "border-secondary-container",
    icon: MdPayments,
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
    typeLabel: "Earnings",
    typeStyle: "bg-green-50 text-green-700",
    actions: [
      { label: "View Statement", primary: false },
    ],
  },
  {
    id: 3,
    type: "message",
    title: "Mike R. sent a message",
    message: "\u201CHey! Checking package dimensions for Chicago pickup. Need more clearance?\u201D",
    time: "5 hours ago",
    unread: false,
    accent: "border-blue-400",
    icon: MdChatBubble,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-400",
    typeLabel: "Message",
    typeStyle: "bg-blue-50 text-blue-400",
    actions: [
      { label: "Reply", primary: true },
    ],
  },
  {
    id: 4,
    type: "system",
    title: "Document Renewal Required",
    message: "Upload updated insurance by Oct 12 to avoid service interruptions.",
    time: "Yesterday",
    unread: false,
    accent: "border-error",
    icon: MdWarning,
    iconBg: "bg-error-container",
    iconColor: "text-error",
    typeLabel: "System",
    typeStyle: "bg-error-container text-error",
    actions: [
      { label: "Upload Now", primary: true },
    ],
  },
  {
    id: 5,
    type: "trip",
    title: "Trip Completed",
    message: "Trip #TX-9978 to Milwaukee completed. Rate your experience and earn points.",
    time: "2 days ago",
    unread: false,
    accent: "border-slate-200",
    icon: MdCheckCircle,
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
    typeLabel: "Trip",
    typeStyle: "bg-green-50 text-green-700",
    actions: [
      { label: "Rate Trip", primary: true },
    ],
  },
];

const tabs = ["All", "Trips", "Earnings", "System"];

const typeFilterMap = {
  All: null,
  Trips: "trip",
  Earnings: "payment",
  System: "system",
};

export default function DriverNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("All");

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filtered =
    activeTab === "All"
      ? notifications
      : notifications.filter((n) => n.type === typeFilterMap[activeTab]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

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
            {unreadCount > 0 && (
              <span className="bg-primary text-white text-sm px-3 py-1 rounded-full font-bold">{unreadCount}</span>
            )}
          </h2>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 text-primary text-[12px] font-bold tracking-wider hover:underline active:scale-95 transition-all"
          >
            <MdDoneAll className="text-sm" />
            Mark all as read
          </button>
        )}
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
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdNotifications className="text-3xl text-slate-400" />
            </div>
            <p className="text-slate-500 font-semibold text-lg">No notifications</p>
            <p className="text-slate-400 text-sm mt-1">You&apos;re all caught up!</p>
          </div>
        ) : (
          filtered.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${n.accent} flex flex-col md:flex-row gap-6 items-start transition-all hover:shadow-md cursor-pointer ${
                  !n.unread
                    ? "bg-slate-50/50 border border-slate-200 opacity-75 grayscale-[0.5]"
                    : ""
                }`}
              >
                <div className={`${n.iconBg} p-4 rounded-lg`}>
                  <Icon className={`${n.iconColor} text-2xl`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-lg font-semibold text-on-surface">{n.title}</h4>
                      <span className={`inline-block px-2 py-0.5 ${n.typeStyle} text-[10px] font-bold uppercase rounded`}>
                        {n.typeLabel}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{n.time}</span>
                  </div>
                  <p className="text-base text-slate-600 mb-4 max-w-2xl">{n.message}</p>
                  <div className="flex flex-wrap gap-2">
                    {n.actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => e.stopPropagation()}
                        className={`text-[12px] font-bold tracking-wider px-6 py-2 rounded-lg transition-all ${
                          action.primary
                            ? "bg-primary text-white hover:opacity-90"
                            : "border border-primary text-primary hover:bg-slate-50"
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(n.id);
                  }}
                  className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Load More */}
      {filtered.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-1 text-slate-500 text-[12px] font-bold tracking-wider hover:text-primary transition-colors py-6">
            Load Older Notifications
            <MdExpandMore className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
}
