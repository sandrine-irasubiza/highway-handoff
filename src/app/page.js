
"use client";

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
  MdNearMe,
  MdPhone,
  MdAccessTime,
  MdLocationOn,
  MdSupportAgent,
  MdCheckCircle,
} from "react-icons/md";

export default function Page() {
  return (
    <div className="bg-[#f7faff] text-slate-900 overflow-x-hidden">
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#000666] flex items-center justify-center shadow-lg">
              <MdLocalShipping className="text-white text-2xl" />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#000666] leading-none">
                Highway Hand-Off
              </h1>

              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">
                Smart Logistics
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#how" className="hover:text-[#000666] transition-colors">
              How It Works
            </a>

            <a
              href="#features"
              className="hover:text-[#000666] transition-colors"
            >
              Features
            </a>

            <a href="#why" className="hover:text-[#000666] transition-colors">
              Why Us
            </a>

            <a
              href="#contact"
              className="hover:text-[#000666] transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="hidden sm:block font-semibold text-[#000666]"
            >
              Login
            </a>

           
<a href="/signup">

 <button className="bg-[#000666] text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all shadow-xl">
              Get Started
            </button>

</a>

          </div>
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.png"
              alt="Delivery truck"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#000666]/95 via-[#000666]/75 to-[#000666]/90"></div>
          </div>

          <div className="absolute top-40 right-10 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 w-72">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                  <MdCheckCircle className="text-green-400 text-2xl" />
                </div>

                <div>
                  <p className="text-white text-sm font-bold">
                    Verified Delivery
                  </p>
                  <p className="text-white/60 text-xs">
                    Secure package transfer
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Route</span>
                  <span className="text-white font-semibold">
                    Kigali → Musanze
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/60">ETA</span>
                  <span className="text-orange-400 font-semibold">
                    2h 15m
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-3/4 h-full bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-32 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>

                <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">
                  Smarter Rural Logistics
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] text-white tracking-tight mb-8">
                Send packages with drivers already on the road.
              </h1>

              <p className="text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
                Highway Hand-Off connects senders with verified drivers already
                traveling the same route — making delivery faster, more
                affordable, and eco-friendly across Rwanda and beyond.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-12">
               
               <a href="/signup">

                <button className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:-translate-y-1 transition-all shadow-2xl">
                  Send a Package
                  <MdArrowForward />
                </button>


               </a>




               <a href="/signup">

               <button className="bg-white text-[#000666] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl">
                  Post a Trip
                </button>

               </a>


              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  "Verified Drivers",
                  "Real-Time Tracking",
                  "Secure Hand-Offs",
                  "Fast Support",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-4 text-center"
                  >
                    <p className="text-white text-sm font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="relative -mt-20 z-20 px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-[36px] border border-slate-200 shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              <div>
                <h3 className="text-4xl font-black text-[#000666] mb-2">
                  10K+
                </h3>

                <p className="text-slate-500 font-medium">
                  Deliveries Completed
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-orange-500 mb-2">
                  2.5K+
                </h3>

                <p className="text-slate-500 font-medium">Active Drivers</p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-green-600 mb-2">
                  98%
                </h3>

                <p className="text-slate-500 font-medium">
                  Successful Hand-Offs
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#000666] mb-2">
                  24/7
                </h3>

                <p className="text-slate-500 font-medium">
                  Real-Time Tracking
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how" className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 bg-[#000666]/10 text-[#000666] px-5 py-2 rounded-full text-sm font-bold uppercase tracking-[0.15em] mb-6">
                Simple Process
              </span>

              <h2 className="text-5xl font-black text-[#000666] mb-6">
                How it works
              </h2>

              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                Fast, simple, and secure delivery in just a few easy steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <MdRoute className="text-5xl text-[#000666]" />,
                  bg: "bg-blue-100",
                  title: "1. Create Delivery",
                  text: "Enter package details and destination to find available routes.",
                },
                {
                  icon: (
                    <MdHandshake className="text-5xl text-orange-500" />
                  ),
                  bg: "bg-orange-100",
                  title: "2. Match Drivers",
                  text: "We connect your shipment with verified drivers already making the trip.",
                },
                {
                  icon: (
                    <MdInventory2 className="text-5xl text-green-600" />
                  ),
                  bg: "bg-green-100",
                  title: "3. Track & Receive",
                  text: "Follow the package journey live until safe delivery.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-[32px] p-10 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div
                    className={`w-20 h-20 rounded-3xl ${item.bg} flex items-center justify-center mb-8`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-black text-[#000666] mb-4">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 leading-relaxed text-lg">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section
          id="features"
          className="py-32 bg-[#071e27] text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-[0.15em] mb-6">
                Trusted Features
              </span>

              <h2 className="text-5xl font-black leading-tight mb-8">
                Reliable delivery with peace of mind.
              </h2>

              <p className="text-xl text-slate-300 mb-12">
                Every shipment is protected and visible from start to finish.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: <MdVerifiedUser />,
                    title: "Verified Drivers",
                    text: "Every driver is identity-verified before joining the network.",
                  },
                  {
                    icon: <MdSecurity />,
                    title: "Secure Transfers",
                    text: "Digital verification ensures safe package hand-offs.",
                  },
                  {
                    icon: <MdPayments />,
                    title: "Lower Costs",
                    text: "Use existing trips to reduce transportation expenses.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-5 bg-white/5 border border-white/5 rounded-3xl p-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-orange-400 text-2xl">
                      {item.icon}
                    </div>

                    <div>
                      <h4 className="text-2xl font-bold mb-2">
                        {item.title}
                      </h4>

                      <p className="text-slate-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MOCKUP CARD */}
            <div className="relative">
              <div className="absolute -inset-6 bg-blue-500/20 blur-3xl rounded-full"></div>

              <div className="relative bg-black rounded-[40px] border border-white/10 p-5 shadow-2xl">
                <div className="rounded-3xl overflow-hidden bg-slate-900">
                  <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>

                      <span className="text-xs tracking-widest text-white/60 font-bold">
                        LIVE TRACKING
                      </span>
                    </div>

                    <span className="text-xs text-white/40 font-bold">
                      ID: #HH-291
                    </span>
                  </div>

                  <div className="relative h-[350px]">
                    <Image
                      src="/images/bus2.png"
                      alt="tracking"
                      fill
                      className="object-cover opacity-50"
                    />

                    <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-xl rounded-3xl p-5 flex justify-between items-center shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#000666] flex items-center justify-center text-white">
                          <MdNearMe />
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                            Estimated Arrival
                          </p>

                          <h4 className="text-2xl font-black text-[#000666]">
                            14:22 PM
                          </h4>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                          Distance
                        </p>

                        <h4 className="text-2xl font-black text-orange-500">
                          12.5 km
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY US ================= */}
        <section id="why" className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 bg-[#000666]/10 text-[#000666] px-5 py-2 rounded-full text-sm font-bold uppercase tracking-[0.15em] mb-6">
                Why Choose Us
              </span>

              <h2 className="text-5xl font-black text-[#000666] mb-6">
                Smarter logistics for everyone
              </h2>

              <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                Built for businesses, drivers, and everyday senders who need
                secure and efficient package movement.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-8 relative overflow-hidden rounded-[40px] bg-[#000666] p-12 text-white min-h-[350px]">
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="/images/bus1.png"
                    alt="eco"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                      Sustainability
                    </span>

                    <h3 className="text-5xl font-black mt-6 leading-tight">
                      Eco-Friendly Delivery
                    </h3>
                  </div>

                  <p className="text-xl text-white/80 max-w-xl">
                    Reduce empty vehicle space and lower emissions using drivers
                    already on the road.
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 bg-white rounded-[40px] p-10 border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all">
                <div className="w-16 h-16 rounded-2xl bg-[#000666] flex items-center justify-center text-white shadow-lg">
                  <MdEco className="text-4xl" />
                </div>

                <div>
                  <h3 className="text-3xl font-black text-[#000666] mb-4">
                    Smart Logistics
                  </h3>

                  <p className="text-slate-500 leading-relaxed">
                    Faster rural-to-urban delivery without adding extra
                    transportation costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto bg-[#1a237e] rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:32px_32px]"></div>
            </div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-[0.15em] mb-6 text-white">
                Join The Network
              </span>

              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
                Start your first hand-off today
              </h2>

              <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
                Join drivers and senders building a smarter logistics network
                across Rwanda.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5">
               

               <a href="/signup">

               <button className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 transition-all">
                  Send a Package
                </button>

               </a>

                <a href="/signup">

              <button className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all">
                  Become a Driver
                </button>


                </a>


              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section
          id="contact"
          className="relative py-32 bg-gradient-to-b from-[#eef5ff] to-white overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/30 blur-3xl rounded-full"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 bg-[#000666]/10 text-[#000666] px-5 py-2 rounded-full text-sm font-bold uppercase tracking-[0.15em] mb-6">
                Contact & Support
              </span>

              <h2 className="text-5xl md:text-6xl font-black text-[#000666] leading-tight mb-6">
                We’re here to help you
              </h2>

              <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                Need help tracking a package, posting a trip, or managing
                deliveries? Reach out to our support team anytime.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* LEFT SIDE */}
              <div className="lg:col-span-5 space-y-6">
                {/* CONTACT CARD */}
                <div className="bg-white rounded-[36px] p-8 border border-slate-200 shadow-xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#000666] text-white flex items-center justify-center">
                      <MdSupportAgent className="text-3xl" />
                    </div>

                    <div>
                      <h3 className="text-3xl font-black text-[#000666]">
                        Contact Information
                      </h3>

                      <p className="text-slate-500 mt-1">
                        Reach us through any channel below.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        icon: <MdMail className="text-[#000666] text-3xl" />,
                        bg: "bg-blue-100",
                        label: "Email Support",
                        title: "support@highwayhandoff.com",
                        text: "Get responses within 24 hours from our logistics team.",
                      },
                      {
                        icon: (
                          <MdPhone className="text-orange-500 text-3xl" />
                        ),
                        bg: "bg-orange-100",
                        label: "Phone Support",
                        title: "+250 7XX XXX XXX",
                        text: "Dedicated support for drivers and package tracking.",
                      },
                      {
                        icon: (
                          <MdLocationOn className="text-green-600 text-3xl" />
                        ),
                        bg: "bg-green-100",
                        label: "Headquarters",
                        title: "Kigali, Rwanda",
                        text: "Building smarter logistics solutions across Africa.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-5 p-5 rounded-3xl bg-slate-50 border border-slate-100"
                      >
                        <div
                          className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center shrink-0`}
                        >
                          {item.icon}
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 mb-2">
                            {item.label}
                          </p>

                          <h4 className="text-xl font-black text-[#000666] break-all">
                            {item.title}
                          </h4>

                          <p className="text-slate-500 mt-2 leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LIVE STATUS CARD */}
                <div className="relative overflow-hidden bg-[#000666] rounded-[36px] p-8 text-white shadow-2xl">
                  <div className="absolute top-0 right-0 w-56 h-56 bg-orange-500/20 blur-3xl rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>

                      <span className="uppercase tracking-[0.2em] text-xs font-bold text-white/70">
                        System Live
                      </span>
                    </div>

                    <h3 className="text-4xl font-black leading-tight mb-6">
                      Real-time delivery support across Rwanda.
                    </h3>

                    <p className="text-white/70 leading-relaxed mb-8">
                      Our system continuously monitors shipments, drivers, and
                      package hand-offs to ensure secure and reliable delivery.
                    </p>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <MdAccessTime className="text-orange-400 text-xl" />

                          <p className="text-sm text-white/70">
                            Live Monitoring
                          </p>
                        </div>

                        <h4 className="text-3xl font-black text-orange-400">
                          24/7
                        </h4>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <MdCheckCircle className="text-green-400 text-xl" />

                          <p className="text-sm text-white/70">
                            Delivery Success
                          </p>
                        </div>

                        <h4 className="text-3xl font-black text-green-400">
                          98%
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE FORM */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[36px] p-8 md:p-10 border border-slate-200 shadow-2xl">
                  <div className="mb-10">
                    <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-5">
                      Send A Message
                    </span>

                    <h3 className="text-4xl md:text-5xl font-black text-[#000666] mb-4 leading-tight">
                      Tell us how we can help
                    </h3>

                    <p className="text-slate-500 text-lg leading-relaxed">
                      Fill in the form below and our support team will contact
                      you shortly with the right solution.
                    </p>
                  </div>

                  <form className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                          Full Name
                        </label>

                        <input
                          type="text"
                          placeholder="Your full name"
                          className="w-full h-16 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                          Email Address
                        </label>

                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full h-16 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                          Phone Number
                        </label>

                        <input
                          type="text"
                          placeholder="+250 7XX XXX XXX"
                          className="w-full h-16 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                          Subject
                        </label>

                        <select className="w-full h-16 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all">
                          <option>Choose a topic</option>
                          <option>Package Tracking</option>
                          <option>Become a Driver</option>
                          <option>Delivery Issue</option>
                          <option>Business Partnership</option>
                          <option>Technical Support</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                        Message
                      </label>

                      <textarea
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        className="w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 resize-none focus:outline-none focus:ring-4 focus:ring-[#000666]/10 focus:border-[#000666] transition-all"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                        <p className="text-sm font-bold text-[#000666] mb-1">
                          Average Response Time
                        </p>

                        <p className="text-slate-500">
                          Less than 24 hours
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                        <p className="text-sm font-bold text-[#000666] mb-1">
                          Support Availability
                        </p>

                        <p className="text-slate-500">
                          Monday - Sunday, 24/7
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#000666] hover:bg-[#1a237e] text-white h-16 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all hover:-translate-y-1 shadow-2xl"
                    >
                      Send Message
                      <MdArrowForward className="text-2xl" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#000666] flex items-center justify-center">
                  <MdLocalShipping className="text-white text-2xl" />
                </div>

                <span className="text-2xl font-black text-white">
                  Highway Hand-Off
                </span>
              </div>

              <p className="leading-relaxed text-sm text-slate-500">
                Smart rural-to-urban logistics powered by drivers already on the
                road.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
                Services
              </h4>

              <ul className="space-y-4 text-sm">
                <li>Route Matching</li>
                <li>Tracking</li>
                <li>Enterprise</li>
                <li>Carrier Tools</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
                Company
              </h4>

              <ul className="space-y-4 text-sm">
                <li>About</li>
                <li>Success Stories</li>
                <li>Careers</li>
                <li>Press Kit</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
                Support
              </h4>

              <ul className="space-y-4 text-sm">
                <li>Help Center</li>
                <li>Safety</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p>© 2026 Highway Hand-Off. All rights reserved.</p>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#000666] transition-colors"
              >
                <MdPublic className="text-white" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#000666] transition-colors"
              >
                <MdMail className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}