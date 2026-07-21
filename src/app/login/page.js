"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MdLocalShipping, MdMail, MdLock, MdVisibility, MdCheck, MdArrowForward } from "react-icons/md";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.user.role === "sender") {
          window.location.href = "/sender/dashboard";
        } else {
          window.location.href = "/driver/dashboard";
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] text-on-background selection:bg-primary/10">
      {/* Visual Side (Left) */}
      <div className="hidden md:flex md:w-1/2 relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Logistics background"
            fill
            className="object-cover scale-105"
            sizes="50vw"
            unoptimized
            src="https://lh3.googleusercontent.com/aida/ADBb0ugeV6fSQTJlEbJBH_07OTZUNFqnw1e_f1sqCTWrNrvp0FLuY7q6l2jhZkgacSznVrYegPJ7EgsX5Src7QPqPJZOc4qB0MI0aTKSjkemniFwdqpwGPhTmPcPEemOJGphwJtq1EckGA56UABR5qZGcicJCX2GNWtOfBhpopv2aONXTDo48GDPKXGfAfmK3Z4GnWSV7Hgo4z4TkK__8TF7FgRhy0Et1OLdcH4Bw5cc0o3P-VzBr02NffOf_ZA"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-transparent"></div>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        </div>
        <div className="relative z-10 flex flex-col justify-between p-8 md:p-16 w-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <MdLocalShipping className="text-primary text-lg md:text-xl" />
            </div>
            <span className="text-lg md:text-xl font-black text-white tracking-tighter uppercase">Highway Hand-Off</span>
          </div>
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-container"></span>
              </span>
              Next-Gen Logistics
            </div>
            <h1 className="text-2xl md:text-[40px] leading-[1.1] font-extrabold text-white mb-4 md:mb-6 drop-shadow-sm">
              Connecting Rural Production to <span className="text-secondary-fixed">Urban Demand</span>
            </h1>
            <p className="text-sm md:text-lg text-white/80 leading-relaxed mb-4 md:mb-8">
              The definitive precision hand-off system for long-haul logistics. Built for speed, optimized for reliability, and designed for global scale.
            </p>
            <div className="flex gap-8 md:gap-12">
              <div>
                <p className="text-white font-bold text-xl md:text-2xl">99.9%</p>
                <p className="text-white/60 text-xs md:text-sm">On-time Delivery</p>
              </div>
              <div>
                <p className="text-white font-bold text-xl md:text-2xl">24/7</p>
                <p className="text-white/60 text-xs md:text-sm">Real-time Tracking</p>
              </div>
            </div>
          </div>
          <div className="text-white/40 text-xs">
            &copy; 2024 Highway Hand-Off Systems Inc.
          </div>
        </div>
      </div>

      {/* Login Form Side (Right) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12 lg:p-24 bg-[#F8FAFC]">
        <div className="w-full max-w-[480px]">
          {/* Mobile Header */}
          <div className="md:hidden mb-8 flex flex-col items-center">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-xl mb-3">
              <MdLocalShipping className="text-white text-2xl" />
            </div>
            <span className="text-xl font-black text-primary tracking-tighter uppercase">Highway Hand-Off</span>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="mb-6 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight mb-1 md:mb-2">Welcome back</h2>
              <p className="text-sm md:text-base text-slate-500 font-medium">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MdMail className="text-slate-400 group-focus-within:text-primary transition-colors text-lg md:text-[20px]" />
                  </div>
                    <input
                      className="w-full h-12 md:h-14 bg-white border border-slate-200 rounded-lg pl-10 md:pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-400 text-sm md:text-base"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 block" htmlFor="password">Password</label>
                  <a className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors" href="#">Forgot password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MdLock className="text-slate-400 group-focus-within:text-primary transition-colors text-lg md:text-[20px]" />
                  </div>
                    <input
                      className="w-full h-12 md:h-14 bg-white border border-slate-200 rounded-lg pl-10 md:pl-12 pr-10 md:pr-12 outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-400 text-sm md:text-base"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  >
                    <MdVisibility className="text-[20px]" />
                  </button>
                </div>
              </div>

              {/* Stay Logged In */}
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 transition-all checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary/20"
                      type="checkbox"
                    />
                    <MdCheck className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-[16px] font-bold" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Keep me signed in for 30 days</span>
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full h-12 md:h-14 bg-primary text-white font-bold text-sm md:text-lg rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Sign In</span>
                <MdArrowForward className="group-hover:translate-x-1 transition-transform text-lg md:text-xl" />
              </button>
            </form>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center -mt-4 mb-4">{error}</p>
            )}

            {/* Alternative Sign In */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                <span className="bg-white px-4 text-slate-400">Secure Access</span>
              </div>
            </div>

            {/* Footer Link */}
            <div className="text-center">
              <p className="text-slate-600 font-medium">
                Don&apos;t have an account?{' '}
                <a className="text-primary font-bold hover:underline underline-offset-4 decoration-2" href="/signup">Create Account</a>
              </p>
            </div>
          </div>

          {/* Global Footer Links */}
            <div className="mt-8 md:mt-12 flex justify-center gap-4 md:gap-6 text-xs md:text-sm font-medium text-slate-400">
            <Link className="hover:text-slate-600 transition-colors" href="/">Home</Link>
            <Link className="hover:text-slate-600 transition-colors" href="/#contact">Help Center</Link>
            <a className="hover:text-slate-600 transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-slate-600 transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </main>
  );
}
