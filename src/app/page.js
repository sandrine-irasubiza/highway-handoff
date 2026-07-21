"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MdLocalShipping,
  MdArrowForward,
  MdHandshake,
  MdInventory2,
  MdSecurity,
  MdPayments,
  MdRoute,
  MdPublic,
  MdMail,
  MdEco,
  MdVerifiedUser,
  MdPhone,
  MdLocationOn,
  MdSupportAgent,
  MdCheckCircle,
  MdNearMe,
} from "react-icons/md";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Choose a topic");
  const [message, setMessage] = useState("");

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      if (res.ok) {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("Choose a topic");
        setMessage("");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="bg-[#f7faff] text-slate-900 overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#000666] flex items-center justify-center shadow-lg">
              <MdLocalShipping className="text-white text-xl md:text-2xl" />
            </div>
            <div>
              <h1 className="text-base md:text-xl font-black tracking-tight text-[#000666] leading-none">
                Highway Hand-Off
              </h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#how" className="hover:text-[#000666] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#000666] transition-colors">Features</a>
            <a href="#why" className="hover:text-[#000666] transition-colors">Why Us</a>
            <a href="#contact" className="hover:text-[#000666] transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3 md:gap-4">
            <a href="/login" className="hidden sm:block font-semibold text-[#000666] text-sm md:text-base">Login</a>
            <a href="/signup">
              <button className="bg-[#000666] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-2xl font-semibold text-sm md:text-base hover:scale-105 transition-all shadow-xl">
                Get Started
              </button>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/hero.png" alt="Delivery truck" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#000666]/95 via-[#000666]/75 to-[#000666]/90"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-24 md:py-32 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-4 md:px-5 py-2 rounded-full mb-6 md:mb-8">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Smarter Rural Logistics</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-[1.05] text-white tracking-tight mb-4 md:mb-6">
                Send packages with drivers already on the road.
              </h1>
              <p className="text-sm md:text-base text-white/80 max-w-2xl leading-relaxed mb-6 md:mb-8">
                Connect with verified drivers traveling your route — faster, cheaper, and eco-friendly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-10 md:mb-12">
                <a href="/signup">
                  <button className="bg-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:-translate-y-1 transition-all shadow-2xl w-full sm:w-auto">
                    Send a Package <MdArrowForward />
                  </button>
                </a>
                <a href="/signup">
                  <button className="bg-white text-[#000666] px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base hover:bg-slate-100 transition-all shadow-xl w-full sm:w-auto">
                    Post a Trip
                  </button>
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                {["Verified Drivers", "Real-Time Tracking", "Secure Hand-Offs", "Fast Support"].map((item, index) => (
                  <div key={index} className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-3 md:px-4 py-3 md:py-4 text-center">
                    <p className="text-white text-xs md:text-sm font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative -mt-16 md:-mt-20 z-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-[36px] border border-slate-200 shadow-2xl p-6 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
              {[
                { value: "10K+", label: "Deliveries Completed", color: "text-[#000666]" },
                { value: "2.5K+", label: "Active Drivers", color: "text-orange-500" },
                { value: "98%", label: "Successful Hand-Offs", color: "text-green-600" },
                { value: "24/7", label: "Real-Time Tracking", color: "text-[#000666]" },
              ].map((stat, i) => (
                <div key={i}>
                  <h3 className={`text-2xl md:text-3xl font-black ${stat.color} mb-1`}>{stat.value}</h3>
                  <p className="text-slate-500 font-medium text-xs md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-12 md:mb-20">
              <span className="inline-flex items-center gap-2 bg-[#000666]/10 text-[#000666] px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-4 md:mb-6">Simple Process</span>
              <h2 className="text-2xl md:text-4xl font-black text-[#000666] mb-3 md:mb-4">How it works</h2>
              <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">Fast, simple, and secure delivery in three steps.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: <MdRoute className="text-3xl md:text-4xl text-[#000666]" />, bg: "bg-blue-100", title: "1. Create Delivery", text: "Enter package details and destination to find available routes." },
                { icon: <MdHandshake className="text-3xl md:text-4xl text-orange-500" />, bg: "bg-orange-100", title: "2. Match Drivers", text: "We connect your shipment with verified drivers already on the road." },
                { icon: <MdInventory2 className="text-3xl md:text-4xl text-green-600" />, bg: "bg-green-100", title: "3. Track & Receive", text: "Follow your package live until it's safely delivered." },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-[32px] p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-3xl ${item.bg} flex items-center justify-center mb-4 md:mb-6`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#000666] mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 md:py-32 bg-[#071e27] text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-10 grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-4 md:mb-6">Trusted Features</span>
              <h2 className="text-2xl md:text-4xl font-black leading-tight mb-3 md:mb-6">Reliable delivery with peace of mind.</h2>
              <p className="text-sm md:text-base text-slate-300 mb-6 md:mb-8">Every shipment protected and visible from start to finish.</p>
              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: <MdVerifiedUser />, title: "Verified Drivers", text: "Every driver is identity-verified before joining the network." },
                  { icon: <MdSecurity />, title: "Secure Transfers", text: "Digital verification ensures safe package hand-offs." },
                  { icon: <MdPayments />, title: "Lower Costs", text: "Use existing trips to reduce transportation expenses." },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 md:gap-4 bg-white/5 border border-white/5 rounded-3xl p-3 md:p-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-orange-400 text-lg md:text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold mb-0.5 md:mb-1">{item.title}</h4>
                      <p className="text-xs md:text-sm text-slate-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-black rounded-[40px] border border-white/10 p-4 md:p-5 shadow-2xl">
                <div className="rounded-3xl overflow-hidden bg-slate-900">
                  <div className="flex justify-between items-center px-4 md:px-5 py-3 md:py-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-[10px] md:text-xs tracking-widest text-white/60 font-bold">LIVE TRACKING</span>
                    </div>
                    <span className="text-[10px] md:text-xs text-white/40 font-bold">ID: #HH-291</span>
                  </div>
                  <div className="relative h-48 md:h-[350px]">
                    <Image src="/images/bus2.png" alt="tracking" fill sizes="100vw" className="object-cover opacity-50" />
                    <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5 bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-5 flex justify-between items-center shadow-2xl">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#000666] flex items-center justify-center text-white">
                          <MdNearMe />
                        </div>
                        <div>
                          <p className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold">ETA</p>
                          <h4 className="text-lg md:text-2xl font-black text-[#000666]">14:22 PM</h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold">Distance</p>
                        <h4 className="text-lg md:text-2xl font-black text-orange-500">12.5 km</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section id="why" className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-12 md:mb-20">
              <span className="inline-flex items-center gap-2 bg-[#000666]/10 text-[#000666] px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-4 md:mb-6">Why Choose Us</span>
              <h2 className="text-2xl md:text-4xl font-black text-[#000666] mb-3 md:mb-4">Smarter logistics for everyone</h2>
              <p className="text-sm md:text-base text-slate-500 max-w-3xl mx-auto">Built for businesses, drivers, and everyday senders.</p>
            </div>
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-8 relative overflow-hidden rounded-[40px] bg-[#000666] p-8 md:p-12 text-white min-h-[300px] md:min-h-[350px]">
                <div className="absolute inset-0 opacity-20">
                  <Image src="/images/bus1.png" alt="eco" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="bg-orange-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">Sustainability</span>
                    <h3 className="text-2xl md:text-4xl font-black mt-3 md:mt-4 leading-tight">Eco-Friendly Delivery</h3>
                  </div>
                  <p className="text-lg md:text-xl text-white/80 max-w-xl mt-4 md:mt-0">Reduce emissions using drivers already on the road.</p>
                </div>
              </div>
              <div className="md:col-span-4 bg-white rounded-[40px] p-6 md:p-8 border border-slate-200 flex flex-col justify-between shadow-sm">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#000666] flex items-center justify-center text-white shadow-lg">
                  <MdEco className="text-2xl md:text-3xl" />
                </div>
                <div className="mt-4 md:mt-0">
                  <h3 className="text-xl md:text-2xl font-black text-[#000666] mb-2 md:mb-3">Smart Logistics</h3>
                  <p className="text-slate-500 leading-relaxed">Faster delivery without extra transportation costs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 px-4 md:px-6">
          <div className="max-w-7xl mx-auto bg-[#1a237e] rounded-[48px] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-4 md:mb-6 text-white">Join The Network</span>
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3 md:mb-6">Start your first hand-off today</h2>
              <p className="text-sm md:text-base text-white/70 max-w-3xl mx-auto mb-6 md:mb-8">Join drivers and senders building a smarter logistics network.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5">
                <a href="/signup">
                  <button className="bg-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base shadow-2xl hover:scale-105 transition-all w-full sm:w-auto">Send a Package</button>
                </a>
                <a href="/signup">
                  <button className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base hover:bg-white/20 transition-all w-full sm:w-auto">Become a Driver</button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-20 md:py-32 bg-gradient-to-b from-[#eef5ff] to-white overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-12 md:mb-20">
              <span className="inline-flex items-center gap-2 bg-[#000666]/10 text-[#000666] px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-4 md:mb-6">Contact & Support</span>
              <h2 className="text-2xl md:text-4xl font-black text-[#000666] leading-tight mb-3 md:mb-4">We're here to help</h2>
              <p className="text-sm md:text-base text-slate-500 max-w-3xl mx-auto">Need help? Reach out to our support team anytime.</p>
            </div>
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-[36px] p-6 md:p-8 border border-slate-200 shadow-xl">
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#000666] text-white flex items-center justify-center">
                      <MdSupportAgent className="text-2xl md:text-3xl" />
                    </div>-
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-[#000666]">Contact</h3>
                      <p className="text-slate-500 text-xs mt-1">Reach us through any channel.</p>
                    </div>
                  </div>
                  <div className="space-y-4 md:space-y-5">
                    {[
                      { icon: <MdMail className="text-[#000666] text-xl md:text-2xl" />, bg: "bg-blue-100", label: "Email", title: "support@highwayhandoff.com", text: "24-hour response time." },
                      { icon: <MdPhone className="text-orange-500 text-xl md:text-2xl" />, bg: "bg-orange-100", label: "Phone", title: "+250 7XX XXX XXX", text: "Dedicated driver and package support." },
                      { icon: <MdLocationOn className="text-green-600 text-xl md:text-2xl" />, bg: "bg-green-100", label: "Office", title: "Kigali, Rwanda", text: "Building smarter logistics across Africa." },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-3xl bg-slate-50 border border-slate-100">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${item.bg} flex items-center justify-center shrink-0`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">{item.label}</p>
                          <h4 className="text-base md:text-lg font-black text-[#000666] break-all">{item.title}</h4>
                          <p className="text-slate-500 text-xs mt-1">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[36px] p-6 md:p-10 border border-slate-200 shadow-2xl">
                  <div className="mb-6 md:mb-10">
                    <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] mb-3 md:mb-5">Send A Message</span>
                    <h3 className="text-2xl md:text-4xl font-black text-[#000666] mb-1 md:mb-3">Tell us how we can help</h3>
                    <p className="text-slate-500 text-sm md:text-base">Our team will respond shortly.</p>
                  </div>
                  <form onSubmit={handleContactSubmit} className="space-y-6 md:space-y-8">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-[11px] md:text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 md:mb-3">Full Name</label>
                        <input name="name" type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 md:h-16 px-4 md:px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all text-sm md:text-base" />
                      </div>
                      <div>
                        <label className="block text-[11px] md:text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 md:mb-3">Email Address</label>
                        <input name="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 md:h-16 px-4 md:px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all text-sm md:text-base" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-[11px] md:text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 md:mb-3">Phone</label>
                        <input name="phone" type="text" placeholder="+250 7XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-12 md:h-16 px-4 md:px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all text-sm md:text-base" />
                      </div>
                      <div>
                        <label className="block text-[11px] md:text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 md:mb-3">Subject</label>
                        <select name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full h-12 md:h-16 px-4 md:px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all text-sm md:text-base">
                          <option>Choose a topic</option>
                          <option>Package Tracking</option>
                          <option>Become a Driver</option>
                          <option>Delivery Issue</option>
                          <option>Business Partnership</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] md:text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 md:mb-3">Message</label>
                      <textarea name="message" rows={5} placeholder="Tell us how we can help..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-4 md:p-5 rounded-2xl border border-slate-200 bg-slate-50 resize-none focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all text-sm md:text-base" />
                    </div>
                    <button type="submit" className="w-full bg-[#000666] hover:bg-[#1a237e] text-white h-12 md:h-16 rounded-2xl text-base md:text-lg font-bold flex items-center justify-center gap-3 transition-all hover:-translate-y-1 shadow-2xl">
                      Send Message <MdArrowForward className="text-xl md:text-2xl" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#000666] flex items-center justify-center">
                  <MdLocalShipping className="text-white text-xl md:text-2xl" />
                </div>
                <span className="text-lg md:text-xl font-black text-white">Highway Hand-Off</span>
              </div>
              <p className="leading-relaxed text-xs md:text-sm text-slate-500">Smart logistics powered by drivers already on the road.</p>
            </div>
            {[
              { title: "Services", links: ["Route Matching", "Tracking", "Enterprise", "Carrier Tools"] },
              { title: "Company", links: ["About", "Success Stories", "Careers", "Press Kit"] },
              { title: "Support", links: ["Help Center", "Safety", "Privacy Policy", "Terms of Service"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-bold uppercase tracking-widest text-[11px] md:text-xs mb-4 md:mb-6">{col.title}</h4>
                <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
                  {col.links.map((link, j) => <li key={j}>{link}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 md:pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-xs md:text-sm">
            <p>© 2026 Highway Hand-Off. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#000666] transition-colors">
                <MdPublic className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#000666] transition-colors">
                <MdMail className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
