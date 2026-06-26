'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'student' | 'admin' | 'library' | 'merchant'>('student');
  const [stats, setStats] = useState({ users: 1250, volume: 450000, clearance: 98 });

  // Simulate dynamic counting animations for stats ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        users: Math.min(prev.users + Math.floor(Math.random() * 3), 1420),
        volume: Math.min(prev.volume + Math.floor(Math.random() * 1500), 520000),
        clearance: prev.clearance
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const tabContents = {
    student: {
      title: "Consolidated Student Portal",
      desc: "Get 100% real-time visibility into your academic obligations, view outstanding fees, track library checkouts, and clear advising blocks instantly.",
      features: ["Consolidated Financial Ledger", "Instant Advising Hold Clearance", "Peer-to-Peer Wallet Transfers", "In-App OTP Verification"],
      bg: "from-indigo-600/20 to-purple-600/20"
    },
    admin: {
      title: "Institutional Oversight & Analytics",
      desc: "Empower university administrators with live transaction monitoring, audit logs, student management suites, and automated financial reporting.",
      features: ["KYC Document Review Queue", "Fraud Detection & Account Locking", "Dynamic Fine Policy Builder", "PDF/CSV Financial Report Exports"],
      bg: "from-blue-600/20 to-indigo-600/20"
    },
    library: {
      title: "Automated Book & Fine Tracking",
      desc: "Simplify library operations with digital issue/return trackers, automatic daily fine accruals, and direct digital fine payment integrations.",
      features: ["Barcode & ISBN Scan Support", "Automated Overdue Email/Push Alerts", "Grace Period Configuration", "Instant Wallet Reconciliation"],
      bg: "from-emerald-600/20 to-teal-600/20"
    },
    merchant: {
      title: "Closed-Loop Merchant Commerce",
      desc: "Allow campus cafeteria, bookstores, and copy shops to accept cashless payments seamlessly via dynamically generated QR codes.",
      features: ["Static & Dynamic QR Pay", "T+1 Automated Balance Settlements", "Withdrawal Request Dashboard", "Real-Time Sales Feeds"],
      bg: "from-amber-600/20 to-orange-600/20"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 card-glass border-b border-slate-800/60 flex items-center justify-between mx-4 my-3 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-indigo-500/30 animate-pulse-glow">SC</div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight text-md">Smart Campus</span>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">East West University</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="px-4 py-2 text-slate-300 hover:text-white text-sm font-semibold transition-all">
            Login
          </Link>
          <Link href="/auth/signup" className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all">
            Create Account
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400 mb-6 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
          CSE 412 Software Engineering Project — Group 7
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight animate-slide-up">
          The Ultimate Super-App for <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Smart University Life</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in">
          Seamlessly bridging academics and campus finance. A unified closed-loop digital wallet, real-time fine tracking, instant course clearance, and QR code merchant payments — customized for EWU.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link href="/auth/signup" className="btn btn-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-indigo-500/20 shadow-lg px-8 py-4 w-full sm:w-auto">
            Get Started Now
          </Link>
          <Link href="/auth/login" className="btn btn-lg border border-slate-800 text-slate-300 hover:bg-slate-900/60 px-8 py-4 w-full sm:w-auto">
            Access Dashboard
          </Link>
        </div>
      </section>

      {/* Live Stats Ticker */}
      <section className="max-w-5xl mx-auto px-6 mb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md">
          <div className="text-center md:border-r border-slate-800/80 py-4">
            <p className="text-4xl font-extrabold text-white">{stats.users.toLocaleString()}+</p>
            <p className="text-xs text-indigo-400 font-bold tracking-wider uppercase mt-1">Active Campus Users</p>
          </div>
          <div className="text-center md:border-r border-slate-800/80 py-4">
            <p className="text-4xl font-extrabold text-white">৳{stats.volume.toLocaleString()}</p>
            <p className="text-xs text-purple-400 font-bold tracking-wider uppercase mt-1">Cashless Volume Processed</p>
          </div>
          <div className="text-center py-4">
            <p className="text-4xl font-extrabold text-white">{stats.clearance}%</p>
            <p className="text-xs text-pink-400 font-bold tracking-wider uppercase mt-1">Auto Advising Clearance</p>
          </div>
        </div>
      </section>

      {/* Dynamic Module Showcase (Tabs) */}
      <section className="max-w-6xl mx-auto px-6 mb-24 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore App Capabilities</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Explore targeted modules designed to satisfy students, administrators, librarians, and campus merchants alike.</p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center flex-wrap gap-2 mb-8 bg-slate-900/40 p-1.5 rounded-2xl border border-slate-800/60 max-w-2xl mx-auto backdrop-blur-md">
          {(['student', 'admin', 'library', 'merchant'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab === 'library' ? 'Library Staff' : tab === 'merchant' ? 'Campus Merchant' : tab}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className={`grid md:grid-cols-2 gap-8 bg-gradient-to-br ${tabContents[activeTab].bg} border border-slate-800/80 p-8 md:p-12 rounded-3xl backdrop-blur-md transition-all duration-500 hover:border-slate-700/60`}>
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 mb-6 text-2xl font-bold">
              {activeTab === 'student' ? '🎓' : activeTab === 'admin' ? '⚙️' : activeTab === 'library' ? '📚' : '🛍️'}
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 transition-all">
              {tabContents[activeTab].title}
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              {tabContents[activeTab].desc}
            </p>
            <div className="flex gap-4">
              <Link href="/auth/signup" className="btn btn-primary btn-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg">Try Portal</Link>
            </div>
          </div>
          <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 flex flex-col justify-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4">Core Integration Logic</h4>
            <ul className="space-y-3.5">
              {tabContents[activeTab].features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built with Modern Architecture</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Enterprise-grade security, caching and databases compiled to guarantee seamless performance.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '💳', title: 'Digital Closed Wallet', desc: 'Secure BDT top-ups via bKash, Nagad, and debit cards. Full audit ledger tracking.' },
            { icon: '📚', title: 'Library Integration', desc: 'Auto fine calculations on overdue books. Direct wallet reconciliation and payments.' },
            { icon: '🎓', title: 'Course Advising Clearance', desc: 'Instant check and block release. Integrates registration locks with academic holds.' },
            { icon: '📷', title: 'Fast QR Payments', desc: 'Dynamic & static codes for campus cafeteria, printing shops and copy stalls.' },
          ].map((f, i) => (
            <div key={i} className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:-translate-y-1 hover:border-slate-700/80 hover:bg-slate-900/60 transition-all duration-300">
              <span className="text-4xl block mb-4">{f.icon}</span>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-12 text-center relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">SC</div>
              <span className="text-white font-bold text-sm">Smart Campus App</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">East West University Department of Computer Science & Engineering. CSE 412 Software Engineering Project — Group 7.</p>
          </div>
          <div className="flex gap-8 text-xs text-slate-400">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white">Course Details</span>
              <span>CSE 412 — Section 06</span>
              <span>Summer 2026</span>
              <span>Instructor: Ahmed Adnan</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white">Group 7 Team</span>
              <span>Nabila Ibnat (2023-1-60-136)</span>
              <span>Mehjabin Mithila (2023-2-60-001)</span>
              <span>Jahidul Islam (2023-2-60-053)</span>
              <span>Ahmed Muttakee (2023-2-60-056)</span>
            </div>
          </div>
        </div>
        <p className="text-slate-600 text-xs pt-8 border-t border-slate-900">© 2026 Smart Campus App. All rights reserved. Prepared for academic submission.</p>
      </footer>
    </div>
  );
}
