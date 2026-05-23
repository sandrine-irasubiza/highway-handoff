"use client";

import Image from "next/image";
import {
  MdLocalShipping,
  MdAccountBalanceWallet,
  MdInventory2,
  MdRoute,
  MdStar,
  MdVerifiedUser,
  MdArrowForward,
  MdNavigation,
  MdCheck,
  MdHandshake,
  MdCircle,
  MdTimer,
  MdSpeed,
  MdGppGood,
  MdDirectionsCar,
  MdReport,
  MdAdd,
  MdPublic,
  MdMail,
} from "react-icons/md";

export default function DriverDashboardPage() {
  return (
    <div className="space-y-4 md:space-y-8">
        {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">Today&apos;s Earnings</p>
              <h3 className="text-2xl font-black text-on-surface">$248.50</h3>
            </div>
            <div className="p-3 bg-primary-container/10 rounded-xl">
              <MdAccountBalanceWallet className="text-primary-container text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">Active Deliveries</p>
              <h3 className="text-2xl font-black text-on-surface">02</h3>
            </div>
            <div className="p-3 bg-secondary-container/10 rounded-xl">
              <MdInventory2 className="text-secondary-container text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">Total Distance</p>
              <h3 className="text-2xl font-black text-on-surface">1,240<span className="text-lg text-slate-500"> km</span></h3>
            </div>
            <div className="p-3 bg-primary-container/10 rounded-xl">
              <MdRoute className="text-primary-container text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">Driver Rating</p>
              <div className="flex items-center gap-1">
                <h3 className="text-2xl font-black text-on-surface">4.98</h3>
                <MdStar className="text-secondary-container text-xl" />
              </div>
            </div>
            <div className="p-3 bg-secondary-container/10 rounded-xl">
              <MdVerifiedUser className="text-secondary-container text-2xl" />
            </div>
          </div>
        </div>
      </section>

            {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
        {/* Active Trip Overview */}
        <section className="lg:col-span-8 space-y-4 md:space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary-container">Current Active Trip</h3>
            <button className="text-primary-container text-xs font-bold flex items-center gap-1 hover:underline group">
              All Trips <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden">
            {/* Map Section */}
            <div className="relative h-48 md:h-64 bg-slate-100">
              <Image
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                unoptimized
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFaYSFwIdAJ-D4j232euIwx9QLZFiIxyjagOpzRZDRMlkA5uIGiNHSTYfZVpCQNylpjfbsT2TgKheuhy_NbbWVoAmmMfsEc4K8-4zZe68VRjneywwqfoiOvVNf1uAvqAz0jGiQF3j9CSndE8WwsfoaNZhwXNM3OqzodUOssOEEhmigce-1qhzCyOx5vAFzE-eai8H2jKJyql2cs1lbpsRKTR7HuqKZVyz4J3zogJqtPA2KlAwUcO7oeqaKOEx3-vDjZcVmsVhb7AM"
                alt="Trip route map"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="bg-white/95 backdrop-blur px-3 md:px-4 py-2 rounded-lg text-sm font-bold shadow-md flex items-center gap-2">
                  <MdNavigation className="text-primary-container" />
                  <span>Kigali <span className="text-secondary-container">➔</span> Huye</span>
                </span>
                <span className="bg-primary-container px-3 py-1.5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  In Progress
                </span>
              </div>
            </div>

            {/* Trip Details */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 bg-surface-container rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200">
                    <MdInventory2 className="text-secondary-container text-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cargo</p>
                    <p className="text-base font-bold text-on-surface">Medical Supplies (Fragile)</p>
                    <p className="text-xs text-slate-500">MedSupply Rwanda • 45kg</p>
                  </div>
                </div>
                <button className="bg-primary-container text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-sm hover:bg-primary transition-all active:scale-95 flex items-center gap-2">
                  View Details
                  <MdArrowForward className="text-sm" />
                </button>
              </div>

              {/* Stepper */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trip Progress</p>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-primary-container">
                    <MdTimer className="text-base" />
                    ETA: 2h 15m
                  </div>
                </div>
                <div className="relative py-4 px-2">
                  <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 rounded-full"></div>
                  <div className="absolute top-1/2 left-4 w-[60%] h-1 bg-primary-container -translate-y-1/2 rounded-full"></div>
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center z-10 border-4 border-white">
                        <MdCheck className="text-sm" />
                      </div>
                      <span className="text-xs font-bold text-primary-container">Accepted</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center z-10 border-4 border-white">
                        <MdCheck className="text-sm" />
                      </div>
                      <span className="text-xs font-bold text-primary-container">Picked Up</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-secondary-container flex items-center justify-center z-10">
                        <MdHandshake className="text-secondary-container text-sm" />
                      </div>
                      <span className="text-xs font-bold text-secondary-container">Hand-off</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center z-10 border-4 border-white">
                        <MdCircle className="text-xs" />
                      </div>
                      <span className="text-xs font-bold text-slate-400">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Trips */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary-container">Upcoming Trips</h3>
              <button className="text-primary-container text-xs font-bold flex items-center gap-1 hover:underline">
                View Schedule <MdArrowForward className="text-sm" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-container/10 rounded-lg flex items-center justify-center">
                      <MdRoute className="text-primary-container text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Huye <span className="text-secondary-container">➔</span> Kigali</p>
                      <p className="text-xs text-slate-500">Tomorrow, 08:00 AM</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span>3 packages</span>
                  <span className="font-bold text-primary-container">$180.00</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-container/10 rounded-lg flex items-center justify-center">
                      <MdRoute className="text-primary-container text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Kigali <span className="text-secondary-container">➔</span> Muhanga</p>
                      <p className="text-xs text-slate-500">Fri, 06:30 AM</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span>5 packages</span>
                  <span className="font-bold text-primary-container">$220.00</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar Widgets */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Vehicle Status */}
          <div>
            <h3 className="text-lg font-bold text-primary-container mb-4">Vehicle Status</h3>
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-5">
              <div className="flex items-center gap-4 p-3 bg-surface-container rounded-xl">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <MdDirectionsCar className="text-primary-container text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-on-surface">2022 Isuzu FSR</p>
                  <p className="text-xs text-slate-500">KBZ 452X • 4.5T</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-wider">Fuel</span>
                    <span className="text-on-surface">74%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-[74%] h-full bg-primary-container rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-wider">Engine</span>
                    <span className="text-on-surface">Good</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-primary-container/60 rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-error-container/20 rounded-xl border border-error-container/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <MdReport className="text-error text-lg" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-error block">Maintenance Due</span>
                      <span className="text-[10px] text-slate-500">Oil change & tires</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-error bg-white px-2 py-1 rounded-md">IN 120km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div>
            <h3 className="text-lg font-bold text-primary-container mb-4">Performance</h3>
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-container/10 rounded-lg">
                    <MdSpeed className="text-primary-container text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">On-Time Rate</p>
                  </div>
                </div>
                <span className="text-lg font-black text-primary-container">98.5%</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-container/10 rounded-lg">
                    <MdGppGood className="text-primary-container text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Safe Deliveries</p>
                  </div>
                </div>
                <span className="text-lg font-black text-primary-container">127</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-container/10 rounded-lg">
                    <MdTimer className="text-primary-container text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Avg. Response</p>
                  </div>
                </div>
                <span className="text-lg font-black text-primary-container">4m</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div>
            <h3 className="text-lg font-bold text-primary-container mb-4">Recent Alerts</h3>
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
              <div className="p-4 flex gap-4 hover:bg-slate-50 cursor-pointer">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary-container flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">New delivery matched!</p>
                  <p className="text-xs text-slate-500 mt-0.5">Return trip Huye to Kigali tomorrow.</p>
                  <p className="text-[10px] text-primary-container mt-1 font-bold uppercase">2 mins ago</p>
                </div>
              </div>

              <div className="p-4 flex gap-4 hover:bg-slate-50 cursor-pointer">
                <div className="w-2 h-2 mt-2 rounded-full bg-slate-200 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-on-surface">Payment Processed</p>
                  <p className="text-xs text-slate-500 mt-0.5">$840.00 sent to your wallet.</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase">1 hour ago</p>
                </div>
              </div>

              <div className="p-4 flex gap-4 hover:bg-slate-50 cursor-pointer">
                <div className="w-2 h-2 mt-2 rounded-full bg-slate-200 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-on-surface">Rating Update</p>
                  <p className="text-xs text-slate-500 mt-0.5">5-star rating from MedSupply Rwanda.</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile FAB */}
      <button className="fixed bottom-6 right-6 bg-secondary-container text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform md:hidden z-50">
        <MdAdd className="text-2xl" />
      </button>
    </div>
  );
}
