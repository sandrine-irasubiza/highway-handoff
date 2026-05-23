"use client";

import Link from "next/link";
import {
  MdLocalShipping,
  MdInventory2,
  MdArrowForward,
  MdHelpOutline,
  MdSpeed,
  MdPayments,
  MdVerifiedUser,
  MdRoute,
  MdHeadsetMic,
  MdLocalShipping as MdTruckIcon,
} from "react-icons/md";

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-container-high flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-16 -left-16 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 -right-16 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-primary/5 to-secondary-container/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/60 backdrop-blur-2xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-secondary-container rounded-lg blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-8 h-8 bg-gradient-to-br from-primary-container to-primary rounded-lg flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform">
                  <MdTruckIcon className="text-white text-base" />
                </div>
              </div>
              <span className="text-lg font-black text-primary tracking-tighter uppercase">Highway Hand-Off</span>
            </Link>
            
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-all duration-200 group">
              <MdHelpOutline className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
            </button>
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Home</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-grow flex items-center justify-center py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Choose Your Path</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-primary mb-2 leading-tight">
              Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-orange-500">Network</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto">Select your primary role to customize your dashboard experience.</p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {/* Driver Role Card */}
            <a href="/signup/driver" className="group relative flex flex-col items-start p-5 md:p-6 bg-white/80 backdrop-blur-xl border-2 border-slate-200/60 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary-container/10 hover:border-primary-container/40 hover:-translate-y-1.5 transition-all duration-300 text-left overflow-hidden">
              {/* Background Icon */}
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <MdLocalShipping className="w-24 h-24 text-primary" />
              </div>
              
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shadow-lg shadow-primary-container/30 group-hover:scale-110 transition-transform duration-300">
                  <MdLocalShipping className="text-white text-2xl" />
                </div>
                
                {/* Title & Description */}
                <h2 className="text-xl font-black text-primary mb-1.5">I&apos;m a Driver</h2>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  Maximize your fleet utility. Find and accept hand-off requests to keep your trucks moving and revenue growing.
                </p>
                
                {/* CTA Button */}
                <div className="mt-auto pt-4">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-container to-primary text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md shadow-primary-container/20 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                    <span>Get Started</span>
                    <MdArrowForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
                
                {/* Features */}
                <div className="mt-5 pt-4 border-t border-slate-200 w-full grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                      <MdRoute className="text-primary-container text-xs" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">Optimize Routes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-secondary-container/10 flex items-center justify-center flex-shrink-0">
                      <MdPayments className="text-secondary-container text-xs" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">Instant Payouts</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Sender Role Card */}
            <a href="/signup/sender" className="group relative flex flex-col items-start p-5 md:p-6 bg-white/80 backdrop-blur-xl border-2 border-slate-200/60 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-secondary-container/10 hover:border-secondary-container/40 hover:-translate-y-1.5 transition-all duration-300 text-left overflow-hidden">
              {/* Background Icon */}
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <MdInventory2 className="w-24 h-24 text-secondary-container" />
              </div>
              
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-secondary-container to-orange-500 flex items-center justify-center shadow-lg shadow-secondary-container/30 group-hover:scale-110 transition-transform duration-300">
                  <MdInventory2 className="text-white text-2xl" />
                </div>
                
                {/* Title & Description */}
                <h2 className="text-xl font-black text-primary mb-1.5">I&apos;m a Sender</h2>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  Simplify your logistics. Post cargo requests and connect with verified drivers for seamless hand-offs.
                </p>
                
                {/* CTA Button */}
                <div className="mt-auto pt-4">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-secondary-container to-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md shadow-secondary-container/20 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                    <span>Create Shipment</span>
                    <MdArrowForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
                
                {/* Features */}
                <div className="mt-5 pt-4 border-t border-slate-200 w-full grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                      <MdVerifiedUser className="text-primary-container text-xs" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">Verified Carriers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-secondary-container/10 flex items-center justify-center flex-shrink-0">
                      <MdSpeed className="text-secondary-container text-xs" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-700">Real-time Tracking</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-600">
              Not sure which one to pick? 
              <a className="text-primary font-bold hover:underline decoration-secondary-container decoration-2 underline-offset-4 ml-1" href="#">Read our User Guide</a>
            </p>
          </div>
        </div>
      </main>

      {/* Support Section */}
      <section className="relative bg-white/60 backdrop-blur-xl border-t border-slate-200/50 py-6">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shadow-md shadow-primary-container/20">
              <MdHeadsetMic className="text-white text-lg" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Need help onboarding?</p>
              <p className="text-[10px] text-slate-600">Our fleet specialists are online 24/7.</p>
            </div>
          </div>
          
<Link href="/#contact">

<button className="px-5 py-2.5 bg-gradient-to-r from-primary-container to-primary text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md shadow-primary-container/20 hover:shadow-lg hover:scale-105 transition-all duration-300">
            Chat with Support
          </button>

</Link>



        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-white/60 backdrop-blur-xl border-t border-slate-200/50 py-4">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-semibold text-slate-600">© 2024 Highway Hand-Off Logistics Inc.</p>
          <div className="flex gap-5">
            <a className="text-[10px] font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-[10px] font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-[10px] font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Safety Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
