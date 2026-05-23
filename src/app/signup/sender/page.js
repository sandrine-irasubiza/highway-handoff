"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MdHelp,
  MdLanguage,
  MdSpeed,
  MdVerifiedUser,
  MdMonitor,
  MdArrowForward,
  MdSecurity,
  MdGppGood,
  MdInventory2,
  MdMail,
  MdPhone,
  MdBusiness,
  MdLocalShipping,
  MdAutoAwesome,
  MdPerson,
  MdArrowBack,
} from "react-icons/md";

export default function SenderSignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    agreeTerms: false,
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sender signup:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-container/20 to-secondary-container/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tl from-secondary-container/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-2xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-secondary-container rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-8 h-8 bg-gradient-to-br from-primary-container to-primary rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform">
                  <MdLocalShipping className="text-white text-base" />
                </div>
              </div>
              <div>
                <span className="text-lg font-black text-primary tracking-tight block leading-none">Highway Hand-Off</span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Sender Portal</span>
              </div>
            </Link>
            
            <div className="flex items-center gap-2">
              <Link href="/" className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-primary transition-colors mr-2">
                Home
              </Link>
              <button className="relative group p-2 rounded-xl hover:bg-slate-100 transition-all duration-300">
                <MdHelp className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
              </button>
              <div className="w-px h-6 bg-slate-200"></div>
              <button className="group p-2 rounded-xl hover:bg-slate-100 transition-all duration-300">
                <MdLanguage className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-grow flex flex-col lg:flex-row">
        {/* Left Marketing Panel */}
        <aside className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-primary-container via-[#283593] to-[#0d1452] relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-32 right-16 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between p-6 lg:p-8">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                <MdAutoAwesome className="text-secondary-container text-xs" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Trusted by 10,000+ Shippers</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-3">
                <h1 className="text-3xl xl:text-4xl font-black text-white leading-[1.1]">
                  Ship with
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-orange-400">Confidence.</span>
                </h1>
                <p className="text-sm text-blue-100/80 max-w-sm leading-relaxed">
                  Join the network where velocity meets precision. Get your cargo moving in minutes.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-secondary-container to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-secondary-container/30 group-hover:scale-110 transition-transform">
                    <MdSpeed className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">Instant Matching</h3>
                    <p className="text-xs text-blue-200/70 leading-relaxed">
                      Our kinetic algorithm finds the optimal carrier in seconds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-secondary-container to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-secondary-container/30 group-hover:scale-110 transition-transform">
                    <MdVerifiedUser className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">Vetted Carriers</h3>
                    <p className="text-xs text-blue-200/70 leading-relaxed">
                      Every partner undergoes multi-step reliability certification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-secondary-container to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-secondary-container/30 group-hover:scale-110 transition-transform">
                    <MdMonitor className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">Real-Time Flow</h3>
                    <p className="text-xs text-blue-200/70 leading-relaxed">
                      Track assets with precision-grade GPS at every mile.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-container to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  MR
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Marcus Reed</p>
                  <p className="text-xs text-blue-200/60">Global Ops, Vertex Freight</p>
                </div>
              </div>
              <p className="text-xs text-blue-100/90 leading-relaxed italic mb-3">
                &ldquo;Reduced our dispatcher workload by 40% in the first month.&rdquo;
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-secondary-container fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Form Panel */}
        <section className="flex-grow flex items-start lg:items-center justify-center p-4 lg:p-8 xl:p-12">
          <div className="w-full max-w-xl">
            {/* Mobile Header */}
            <div className="lg:hidden mb-6 text-center">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-container to-primary rounded-xl flex items-center justify-center shadow-lg">
                  <MdLocalShipping className="text-white text-lg" />
                </div>
              </div>
              <h1 className="text-2xl font-black text-primary mb-1">Ship with Confidence.</h1>
              <p className="text-sm text-slate-600">Join the network where velocity meets precision.</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 overflow-hidden">
              {/* Progress Header */}
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-5 border-b border-slate-200/60">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary-container to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-secondary-container/30">
                      <MdPerson className="text-white text-lg" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-primary">Sender Onboarding</h2>
                      <p className="text-xs font-medium text-slate-500">Step 1 of 4: Account & Contact</p>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                  <div className="flex gap-1.5 items-center">
                    <div className="h-2 flex-grow rounded-full bg-gradient-to-r from-secondary-container to-orange-500 shadow-md shadow-secondary-container/20 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary-container to-orange-500 animate-pulse opacity-50"></div>
                    </div>
                    <div className="h-2 flex-grow rounded-full bg-slate-200"></div>
                    <div className="h-2 flex-grow rounded-full bg-slate-200"></div>
                    <div className="h-2 flex-grow rounded-full bg-slate-200"></div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">First Name</label>
                    <div className="relative group">
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-secondary-container focus:ring-0 transition-all outline-none text-sm font-medium placeholder:text-slate-400 group-hover:border-slate-300"
                        placeholder="John"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Last Name</label>
                    <div className="relative group">
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-secondary-container focus:ring-0 transition-all outline-none text-sm font-medium placeholder:text-slate-400 group-hover:border-slate-300"
                        placeholder="Doe"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Business Email Address</label>
                  <div className="relative group">
                    <MdMail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10 ${focusedField === 'email' ? 'text-secondary-container' : 'text-slate-400'}`} />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-secondary-container focus:ring-0 transition-all outline-none text-sm font-medium placeholder:text-slate-400 group-hover:border-slate-300"
                      placeholder="john.doe@company.com"
                      type="email"
                    />
                  </div>
                </div>

                {/* Phone & Company Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Phone Number</label>
                    <div className="relative group">
                      <MdPhone className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10 ${focusedField === 'phone' ? 'text-secondary-container' : 'text-slate-400'}`} />
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-secondary-container focus:ring-0 transition-all outline-none text-sm font-medium placeholder:text-slate-400 group-hover:border-slate-300"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Company Name</label>
                    <div className="relative group">
                      <MdBusiness className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10 ${focusedField === 'company' ? 'text-secondary-container' : 'text-slate-400'}`} />
                      <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-secondary-container focus:ring-0 transition-all outline-none text-sm font-medium placeholder:text-slate-400 group-hover:border-slate-300"
                        placeholder="Logistics Solutions Inc."
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="bg-gradient-to-r from-slate-50 to-white p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <input
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 rounded border-2 border-slate-300 text-secondary-container focus:ring-secondary-container focus:ring-offset-0 cursor-pointer"
                      id="terms"
                      type="checkbox"
                    />
                    <label className="text-xs text-slate-600 leading-relaxed cursor-pointer" htmlFor="terms">
                      I agree to the <a className="text-primary font-bold hover:underline" href="#">Terms of Service</a> and <a className="text-primary font-bold hover:underline" href="#">Carrier Agreement</a>.
                    </label>
                  </div>
                </div>

                {/* Submit Button & Sign In Link */}
                <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
             
            

     <button
                    className="relative w-full sm:w-auto group overflow-hidden"
                    type="submit"
                  >
                      <a href="/sender/dashboard">
                    <div className="relative px-8 py-3.5 bg-gradient-to-r from-secondary-container to-orange-500 rounded-xl shadow-lg shadow-secondary-container/30 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                   
                      <span className="text-sm font-bold text-white uppercase tracking-widest">Continue</span>
                      <MdArrowForward className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  

                    </div>
                     </a>
                     
                  </button>

            

                  <p className="text-xs text-slate-600">
                    Already have an account? <a className="text-primary font-bold hover:underline" href="/login">Sign In</a>
                  </p>
                </div>
              </form>

              {/* Trust Badges */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200/60">
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <MdSecurity className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <MdGppGood className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Protected</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <MdInventory2 className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Insured</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-6 flex items-center justify-center">
              <a href="/signup" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-primary transition-colors group">
                <MdArrowBack className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Back to Role Selection
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/70 backdrop-blur-2xl border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <MdVerifiedUser className="text-primary text-base" />
            <span className="text-xs font-bold text-slate-900">Highway Hand-Off Logistics</span>
            <span className="text-[10px] text-slate-400">© 2024</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium">
            <a className="text-slate-500 hover:text-secondary-container transition-colors" href="#">Terms</a>
            <a className="text-slate-500 hover:text-secondary-container transition-colors" href="#">Privacy</a>
            <a className="text-slate-500 hover:text-secondary-container transition-colors" href="#">Carrier Agreement</a>
            <a className="text-slate-500 hover:text-secondary-container transition-colors" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
