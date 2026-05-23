"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MdFilterList,
  MdFileDownload,
  MdLocalShipping,
  MdNearMe,
  MdForum,
  MdArrowForward,
  MdStar,
  MdChevronLeft,
  MdChevronRight,
  MdVerified,
  MdInventory2,
} from "react-icons/md";

export default function SenderShipments() {
  const [activeTab, setActiveTab] = useState("All Shipments");
  const tabs = ["All Shipments", "Active (3)", "Pending Pickup (1)", "Completed", "Cancelled"];

  return (
    <>
          {/* Page Title */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Shipments</h1>
              <p className="text-slate-500 mt-1">Manage and track your active freight across the RuralRoute network.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:border-primary hover:text-primary transition-all shadow-sm">
                <MdFilterList className="text-lg" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:border-primary hover:text-primary transition-all shadow-sm">
                <MdFileDownload className="text-lg" />
                Export
              </button>
            </div>
          </div>

          {/* Modern Status Tabs */}
          <div className="mb-8 p-1 bg-slate-100 rounded-xl inline-flex w-full md:w-auto overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Shipment Queue Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Shipment Card 1: IN_TRANSIT */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <MdLocalShipping className="text-3xl" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shipment ID</p>
                      <h3 className="text-xl font-bold text-slate-900">HHF-89210</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      IN_TRANSIT
                    </span>
                    <p className="text-sm font-semibold text-slate-500">ETA: Today, 4:30 PM</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Route Column */}
                  <div className="lg:col-span-4 flex gap-5">
                    <div className="flex flex-col items-center py-1">
                      <div className="w-3 h-3 rounded-full border-2 border-primary bg-white"></div>
                      <div className="w-[2px] flex-1 bg-slate-100 my-1"></div>
                      <div className="w-3 h-3 rounded-full border-2 border-secondary bg-white"></div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin</p>
                        <p className="font-bold text-slate-900">Chicago, IL <span className="text-slate-400 font-normal ml-1">(ORD-8)</span></p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                        <p className="font-bold text-slate-900">St. Louis, MO <span className="text-slate-400 font-normal ml-1">(STL-2)</span></p>
                      </div>
                    </div>
                  </div>
                  {/* Progress Visualization */}
                  <div className="lg:col-span-4 flex flex-col gap-4 px-4">
                    <div className="relative pt-6">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-[65%] h-1.5 bg-primary rounded-full shadow-sm shadow-primary/20"></div>
                      <div className="absolute top-[-3px] left-0 w-3 h-3 bg-primary rounded-full border-2 border-white"></div>
                      <div className="absolute top-[-3px] left-[33%] w-3 h-3 bg-primary rounded-full border-2 border-white"></div>
                      <div className="absolute top-[-3px] left-[65%] w-4 h-4 bg-primary rounded-full border-2 border-white ring-4 ring-primary/10"></div>
                      <div className="absolute top-[-3px] right-0 w-3 h-3 bg-slate-200 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[9px] font-bold text-primary uppercase">Accepted</span>
                      <span className="text-[9px] font-bold text-primary uppercase">Picked Up</span>
                      <span className="text-[9px] font-bold text-primary uppercase">In Transit</span>
                      <span className="text-[9px] font-bold text-slate-300 uppercase">Delivered</span>
                    </div>
                  </div>
                  {/* Driver Column */}
                  <div className="lg:col-span-4 flex items-center justify-end gap-5 border-l border-slate-50 pl-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Driver</p>
                      <p className="font-bold text-slate-900">Marcus K. Williams</p>
                      <div className="flex items-center justify-end gap-1 text-secondary mt-0.5">
                        <MdStar className="text-base" />
                        <span className="text-xs font-bold">4.9</span>
                      </div>
                    </div>
                    <Image
                      alt="Driver"
                      width={56}
                      height={56}
                      className="rounded-full object-cover border-4 border-slate-50 shadow-sm"
                      unoptimized
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCDNfW3oNgupy6YBRbkDgGPIo3vVnUOsRftDDD0xa0gtVFa8bn-zjk7NT-KK3aVkAIGRLa-fjUPIKl-z0drCdnpOAeDgc_yZ_s79hiGBSMKCNI1HkK_BXiPBr-NPHy0cF1t3-c7rf4KjAvVlKAFFTtnFzY-IbLZtaSAcE7NXxzoZlnIemGrVwxJr9b4Y4J383ngX0vzJ1BSJFH02ERR4ApD0pSZLGmBAicB4y4zJ0qhhT5bmO7AjRqPA1anP8CR0BSa-ffI8Rr8SU"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50/50 px-8 py-4 flex flex-wrap items-center gap-4 border-t border-slate-100">
                <button className="bg-primary hover:bg-indigo-900 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-primary/10 active:scale-95">
                  <MdNearMe className="text-lg" />
                  Live Track
                </button>
                <button className="bg-white border border-slate-200 text-slate-700 hover:border-primary hover:text-primary px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95">
                  <MdForum className="text-lg" />
                  Message
                </button>
                <button className="ml-auto text-slate-500 hover:text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                  View Full Details
                  <MdArrowForward className="text-lg" />
                </button>
              </div>
            </div>

            {/* Shipment Card 2: PICKED_UP */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-secondary-container/10 rounded-xl flex items-center justify-center text-secondary-container">
                      <MdInventory2 className="text-3xl" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shipment ID</p>
                      <h3 className="text-xl font-bold text-slate-900">HHF-44512</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      PICKED_UP
                    </span>
                    <p className="text-sm font-semibold text-slate-500">Picked up 2h ago</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 flex gap-5">
                    <div className="flex flex-col items-center py-1">
                      <div className="w-3 h-3 rounded-full border-2 border-primary bg-white"></div>
                      <div className="w-[2px] flex-1 bg-slate-100 my-1"></div>
                      <div className="w-3 h-3 rounded-full border-2 border-secondary bg-white"></div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin</p>
                        <p className="font-bold text-slate-900">Indianapolis, IN <span className="text-slate-400 font-normal ml-1">(IND-4)</span></p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                        <p className="font-bold text-slate-900">Louisville, KY <span className="text-slate-400 font-normal ml-1">(LOU-9)</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 flex flex-col gap-4 px-4">
                    <div className="relative pt-6">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-[33%] h-1.5 bg-secondary-container rounded-full"></div>
                      <div className="absolute top-[-3px] left-0 w-3 h-3 bg-secondary-container rounded-full border-2 border-white"></div>
                      <div className="absolute top-[-3px] left-[33%] w-4 h-4 bg-secondary-container rounded-full border-2 border-white ring-4 ring-orange-500/10"></div>
                      <div className="absolute top-[-3px] left-[66%] w-3 h-3 bg-slate-200 rounded-full border-2 border-white"></div>
                      <div className="absolute top-[-3px] right-0 w-3 h-3 bg-slate-200 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[9px] font-bold text-secondary-container uppercase">Accepted</span>
                      <span className="text-[9px] font-bold text-secondary-container uppercase">Picked Up</span>
                      <span className="text-[9px] font-bold text-slate-300 uppercase">In Transit</span>
                      <span className="text-[9px] font-bold text-slate-300 uppercase">Delivered</span>
                    </div>
                  </div>
                  <div className="lg:col-span-4 flex items-center justify-end gap-5 border-l border-slate-50 pl-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Driver</p>
                      <p className="font-bold text-slate-900">Sarah J. Miller</p>
                      <div className="flex items-center justify-end gap-1 text-secondary mt-0.5">
                        <MdStar className="text-base" />
                        <span className="text-xs font-bold">4.8</span>
                      </div>
                    </div>
                    <Image
                      alt="Driver"
                      width={56}
                      height={56}
                      className="rounded-full object-cover border-4 border-slate-50 shadow-sm"
                      unoptimized
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwLy41tIJHK-UT31nj-rln3yjkjTvDno1oXOKlmSUs2E8LZWZ4Nd-XJtvQN_rHXgR_eQTezR9WRjxHCfIOB1WoGBE_cdoj0M-_Hd0waTen15obqWUrTDXcLGcMnGCj5cORRNAJ3rCoY3WpjwLq8iI4sdN8BCiUjuDldbwumkRa_7EHXZNupi0fE9-HLCAeQktBHOEkBYwJB0zANlCTfXYot72TfF-vCVleaObvVf-MP8JaZIc2dFkUGLNbeHL8I8P5KMvM-6jYzOE"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50/50 px-8 py-4 flex flex-wrap items-center gap-4 border-t border-slate-100">
                <button className="bg-primary hover:bg-indigo-900 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-primary/10 active:scale-95">
                  <MdNearMe className="text-lg" />
                  Live Track
                </button>
                <button className="bg-white border border-slate-200 text-slate-700 hover:border-primary hover:text-primary px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95">
                  <MdForum className="text-lg" />
                  Message
                </button>
                <button className="ml-auto text-slate-500 hover:text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                  View Full Details
                  <MdArrowForward className="text-lg" />
                </button>
              </div>
            </div>

            {/* Shipment Card 3: ACCEPTED */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                      <MdVerified className="text-3xl" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shipment ID</p>
                      <h3 className="text-xl font-bold text-slate-900">HHF-12290</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                      ACCEPTED
                    </span>
                    <p className="text-sm font-semibold text-slate-500">Pickup window: Tomorrow AM</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 flex gap-5">
                    <div className="flex flex-col items-center py-1">
                      <div className="w-3 h-3 rounded-full border-2 border-primary bg-white"></div>
                      <div className="w-[2px] flex-1 bg-slate-100 my-1"></div>
                      <div className="w-3 h-3 rounded-full border-2 border-secondary bg-white"></div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin</p>
                        <p className="font-bold text-slate-900">Columbus, OH <span className="text-slate-400 font-normal ml-1">(COL-12)</span></p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                        <p className="font-bold text-slate-900">Detroit, MI <span className="text-slate-400 font-normal ml-1">(DET-5)</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 flex flex-col gap-4 px-4">
                    <div className="relative pt-6">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-[5%] h-1.5 bg-slate-400 rounded-full"></div>
                      <div className="absolute top-[-3px] left-0 w-4 h-4 bg-slate-400 rounded-full border-2 border-white ring-4 ring-slate-400/10"></div>
                      <div className="absolute top-[-3px] left-[33%] w-3 h-3 bg-slate-200 rounded-full border-2 border-white"></div>
                      <div className="absolute top-[-3px] left-[66%] w-3 h-3 bg-slate-200 rounded-full border-2 border-white"></div>
                      <div className="absolute top-[-3px] right-0 w-3 h-3 bg-slate-200 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[9px] font-bold text-slate-600 uppercase">Accepted</span>
                      <span className="text-[9px] font-bold text-slate-300 uppercase">Picked Up</span>
                      <span className="text-[9px] font-bold text-slate-300 uppercase">In Transit</span>
                      <span className="text-[9px] font-bold text-slate-300 uppercase">Delivered</span>
                    </div>
                  </div>
                  <div className="lg:col-span-4 flex items-center justify-end gap-5 border-l border-slate-50 pl-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Driver</p>
                      <p className="font-bold text-slate-900">David Chen</p>
                      <div className="flex items-center justify-end gap-1 text-secondary mt-0.5">
                        <MdStar className="text-base" />
                        <span className="text-xs font-bold">5.0</span>
                      </div>
                    </div>
                    <Image
                      alt="Driver"
                      width={56}
                      height={56}
                      className="rounded-full object-cover border-4 border-slate-50 shadow-sm grayscale opacity-70"
                      unoptimized
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7yKPR0c_t2ul-IfHuA02XiR38Qgigg5SdHjih1SGSX5w1pHjQ6LT3hH8xnBj4q66FyAzVnjIB0JYlL4QE1qFaf3uCAEN-V7bzKQBjB0vECqMzi89GBjfzIyygFrp8gobdNpHKg9hxDhrlJu55PXiL8d8cB1ja1ufDvYMRzk_-6W8PX5mH03nAWlvCM-3h-tEVkuhUghN0jjN0kTpPXBaU7gU5HRTvNp96BJXPoqLm4vceGgzEMLFuPdfrlLm42nr3IuhtNYoRfHw"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-slate-50/50 px-8 py-4 flex flex-wrap items-center gap-4 border-t border-slate-100">
                <button className="bg-slate-200 text-slate-500 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-not-allowed">
                  <MdNearMe className="text-lg" />
                  Live Track
                </button>
                <button className="bg-white border border-slate-200 text-slate-700 hover:border-primary hover:text-primary px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95">
                  <MdForum className="text-lg" />
                  Message
                </button>
                <button className="ml-auto text-slate-500 hover:text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                  View Full Details
                  <MdArrowForward className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-200 pt-8">
            <span className="text-sm font-medium text-slate-500">Showing <span className="text-slate-900 font-bold">3</span> of <span className="text-slate-900 font-bold">12</span> shipments</span>
            <div className="flex items-center gap-2">
              <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 opacity-40 cursor-not-allowed transition-colors">
                <MdChevronLeft className="text-lg" />
              </button>
              <div className="flex items-center gap-1 mx-2">
                <button className="w-10 h-10 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all">1</button>
                <button className="w-10 h-10 border border-transparent hover:bg-slate-50 rounded-lg text-sm font-bold text-slate-600 transition-all">2</button>
                <button className="w-10 h-10 border border-transparent hover:bg-slate-50 rounded-lg text-sm font-bold text-slate-600 transition-all">3</button>
              </div>
              <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <MdChevronRight className="text-lg" />
              </button>
            </div>
          </div>

    </>
  );
}
