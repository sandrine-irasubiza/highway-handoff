"use client";

import { useState, useEffect } from "react";
import {
  MdAccountBalanceWallet,
  MdMonitor,
  MdTrendingUp,
  MdSchedule,
  MdDownload,
  MdDescription,
  MdPictureAsPdf,
  MdArrowForward,
  MdCheckCircle,
  MdHourglassTop,
  MdChevronRight,
  MdReceiptLong,
} from "react-icons/md";

export default function EarningsPage() {
  const [data, setData] = useState({
    totalBalance: 4820.5,
    balanceTrend: "+12.5%",
    lifetimeEarnings: 128450.0,
    avgPerTrip: 845.2,
    pendingPayouts: 1250.0,
    pendingDate: "Oct 24, 2024",
    chartBars: [
      { height: 40, value: 320 },
      { height: 65, value: 520 },
      { height: 55, value: 440 },
      { height: 80, value: 640 },
      { height: 95, value: 840 },
      { height: 45, value: 360 },
      { height: 60, value: 480 },
      { height: 30, value: 240 },
      { height: 70, value: 560 },
      { height: 50, value: 400 },
      { height: 85, value: 680 },
      { height: 40, value: 320 },
      { height: 65, value: 520 },
      { height: 75, value: 600 },
      { height: 35, value: 280 },
    ],
    recentPayouts: [
      { date: "Oct 20, 2024", id: "TRIP-99821", description: "Chicago to St. Louis", amount: 1420.0, status: "Completed" },
      { date: "Oct 18, 2024", id: "TRIP-99814", description: "Indianapolis Hub", amount: 850.5, status: "Processing" },
      { date: "Oct 15, 2024", id: "TRIP-99780", description: "Louisville Regional", amount: 1120.0, status: "Completed" },
      { date: "Oct 12, 2024", id: "WEEKLY_BONUS", description: "Performance Incentive", amount: 500.0, status: "Completed" },
    ],
  });

  useEffect(() => {
    fetch("/api/driver/earnings")
      .then(res => res.ok ? res.json() : null)
      .then(api => {
        if (!api) return;
        setData(prev => ({
          totalBalance: api.totalEarnings ?? prev.totalBalance,
          balanceTrend: api.totalEarnings > 0 ? "+12.5%" : "+0%",
          lifetimeEarnings: api.totalEarnings ?? prev.lifetimeEarnings,
          avgPerTrip: api.totalEarnings && api.totalTrips ? +(api.totalEarnings / api.totalTrips).toFixed(2) : prev.avgPerTrip,
          pendingPayouts: api.pendingPayouts ?? prev.pendingPayouts,
          pendingDate: prev.pendingDate,
          chartBars: prev.chartBars,
          recentPayouts: api.recentEarnings?.length > 0
            ? api.recentEarnings.map(e => ({
                date: new Date(e.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                id: e.trip?._id?.slice(-5)?.toUpperCase() || `EARN-${String(e._id).slice(-5)}`,
                description: e.description || e.trip ? `${(e.trip?.origin?.city || "City")} to ${(e.trip?.destination?.city || "City")}` : "Trip Earnings",
                amount: e.amount,
                status: e.status === "paid" ? "Completed" : e.status === "pending" ? "Processing" : "Completed",
              }))
            : prev.recentPayouts,
        }));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">
            <span>Finances</span>
            <MdChevronRight className="text-sm" />
            <span className="text-primary-container">Earnings & Financials</span>
          </nav>
          <h2 className="text-3xl font-black text-primary-container">Earnings & Financials</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-slate-200 text-primary-container font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all active:scale-95">
            <MdDownload className="text-sm" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm hover:bg-secondary-container/90 transition-all active:scale-95">
            <MdAccountBalanceWallet className="text-sm" />
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {/* Total Balance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-container/10 rounded-xl">
              <MdAccountBalanceWallet className="text-primary-container text-2xl" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">{data.balanceTrend}</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Balance</p>
          <h3 className="text-2xl font-black text-primary-container">${data.totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="text-xs text-slate-400 mt-2 italic">Available for instant withdrawal</p>
        </div>

        {/* Lifetime Earnings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-secondary-container/10 rounded-xl">
              <MdMonitor className="text-secondary-container text-2xl" />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lifetime Earnings</p>
          <h3 className="text-2xl font-black text-primary-container">${data.lifetimeEarnings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="text-xs text-slate-400 mt-2 italic">Since joining Jan 2023</p>
        </div>

        {/* Average per Trip */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-container/10 rounded-xl">
              <MdTrendingUp className="text-primary-container text-2xl" />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Average per Trip</p>
          <h3 className="text-2xl font-black text-primary-container">${data.avgPerTrip.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="text-xs text-slate-400 mt-2 italic">Last 30 trips average</p>
        </div>

        {/* Pending Payouts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-100 rounded-xl">
              <MdSchedule className="text-slate-600 text-2xl" />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Payouts</p>
          <h3 className="text-2xl font-black text-primary-container">${data.pendingPayouts.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="text-xs text-slate-400 mt-2 italic">Expected by {data.pendingDate}</p>
        </div>
      </div>

      {/* Earnings Trends Chart */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-xl font-bold text-primary-container">Earnings Trends</h4>
            <p className="text-sm text-slate-500 mt-1">Overview of your daily income for the last 30 days</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
            <button className="px-3 py-1.5 text-xs font-bold bg-white shadow-sm text-primary-container rounded-md">30D</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-primary-container transition-colors">90D</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-primary-container transition-colors">1Y</button>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-2 px-2">
          {data.chartBars.map((bar, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm transition-all cursor-pointer group relative ${
                i === 4
                  ? "bg-secondary-container"
                  : "bg-primary-container/10 hover:bg-primary-container/30"
              }`}
              style={{ height: `${bar.height}%` }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary-container text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ${bar.value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
          <span>Oct 01</span>
          <span>Oct 08</span>
          <span>Oct 15</span>
          <span>Oct 22</span>
          <span>Oct 29</span>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Payouts Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h4 className="text-xl font-bold text-primary-container">Recent Payouts</h4>
            <button className="text-primary-container text-sm font-bold hover:underline flex items-center gap-1">
              View All <MdArrowForward className="text-sm" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.recentPayouts.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{p.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-primary-container font-bold text-sm">{p.id}</span>
                        <span className="text-[11px] text-slate-400">{p.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-primary-container">${p.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit ${
                        p.status === "Completed"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-primary-container/5 text-primary-container border border-primary-container/20"
                      }`}>
                        {p.status === "Completed" ? <MdCheckCircle className="text-[10px]" /> : <MdHourglassTop className="text-[10px]" />}
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tax & Documents */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h4 className="text-xl font-bold text-primary-container">Tax & Documents</h4>
            <p className="text-sm text-slate-500 mt-1">Download and manage your records</p>
          </div>
          <div className="p-6 space-y-6 flex-1">
            <div>
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tax Forms (1099)</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <MdPictureAsPdf className="text-red-500 text-xl" />
                    <span className="text-sm font-medium text-slate-700">2023 Form 1099-NEC</span>
                  </div>
                  <MdDownload className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <MdPictureAsPdf className="text-red-500 text-xl" />
                    <span className="text-sm font-medium text-slate-700">2022 Form 1099-NEC</span>
                  </div>
                  <MdDownload className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Monthly Statements</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <MdDescription className="text-slate-400 text-xl" />
                    <span className="text-sm font-medium text-slate-700">September 2024</span>
                  </div>
                  <MdDownload className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <MdDescription className="text-slate-400 text-xl" />
                    <span className="text-sm font-medium text-slate-700">August 2024</span>
                  </div>
                  <MdDownload className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <button className="w-full mt-4 py-2.5 text-primary-container text-sm font-bold hover:bg-primary-container/5 rounded-xl border-2 border-primary-container/10 transition-colors">
                View Full Archive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Withdraw Card */}
      <section className="bg-gradient-to-r from-primary-container to-primary-container/80 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black mb-2">Ready to Cash Out?</h3>
            <p className="text-white/70 text-sm max-w-md">Transfer your available balance instantly to your linked bank account or payment wallet. No hidden fees, zero delays.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Available Balance</p>
            <p className="text-4xl font-black">${data.totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <button className="bg-secondary-container text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-secondary-container/90 active:scale-95 transition-all shadow-lg mt-2 flex items-center gap-2">
              <MdAccountBalanceWallet className="text-lg" />
              Withdraw Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
