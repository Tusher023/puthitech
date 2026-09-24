'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Globe, Menu, X, Sparkles, LayoutDashboard } from 'lucide-react';

export default function LandingNavbar() {
  const { language, setLanguage } = useLanguage();
  const isBn = language === 'bn';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Puthi Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform border border-purple-500/30"
            />
            <div>
              <span className="text-white font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent flex items-center gap-1.5">
                Puthi
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/60 border border-purple-700/40 text-purple-300 font-mono font-medium">
                  {isBn ? 'পুঁথি' : 'AI'}
                </span>
              </span>
              <span className="hidden sm:block text-[9px] text-cyan-400 font-mono tracking-widest uppercase">
                CODE • LEARN • BUILD • GLOBAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-300">
            <a
              href="#modules"
              className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-gray-900 transition-colors"
            >
              {isBn ? 'মডিউলসমূহ' : 'Modules'}
            </a>
            <a
              href="#features"
              className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-gray-900 transition-colors"
            >
              {isBn ? 'ফিচারস' : 'Features'}
            </a>
            <a
              href="#projects"
              className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-gray-900 transition-colors"
            >
              {isBn ? 'প্রজেক্টস' : 'Projects'}
            </a>
            <a
              href="#roadmap"
              className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-gray-900 transition-colors"
            >
              {isBn ? 'রোডম্যাপ' : 'Roadmap'}
            </a>
            <a
              href="#pricing"
              className="px-3.5 py-1.5 rounded-lg hover:text-green-400 hover:bg-gray-900 transition-colors font-semibold"
            >
              {isBn ? 'ফি (৳৫০০)' : 'Fee (500 BDT)'}
            </a>
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-lg hover:text-purple-300 hover:bg-purple-950/30 border border-transparent hover:border-purple-800/40 transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard size={14} className="text-purple-400" />
              <span>{isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
            </Link>
          </div>

          {/* Right Action: Language Switcher & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="inline-flex bg-gray-900/90 border border-gray-800 rounded-full p-0.5 shadow-inner">
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${
                  language === 'bn'
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02]"
            >
              <Sparkles size={14} />
              <span>{isBn ? 'ভর্তি হন (৳৫০০)' : 'Enroll (500 BDT)'}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800 px-6 py-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <span className="text-xs text-gray-400 font-medium">
              🌐 {isBn ? 'ভাষা নির্বাচন করুন:' : 'Select Language:'}
            </span>
            <div className="inline-flex bg-gray-900 border border-gray-800 rounded-full p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-400'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  language === 'bn' ? 'bg-purple-600 text-white' : 'text-gray-400'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <a
              href="#modules"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-900"
            >
              📚 {isBn ? 'মডিউলসমূহ' : 'Curriculum Modules'}
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-900"
            >
              ✨ {isBn ? 'ফিচারস' : 'Key Features'}
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-900"
            >
              💼 {isBn ? 'ক্যাপস্টোন প্রজেক্টস' : 'Capstone Projects'}
            </a>
            <a
              href="#roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-900"
            >
              🗺️ {isBn ? '৬ মাসের রোডম্যাপ' : '6-Month Roadmap'}
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-green-400 font-semibold hover:bg-gray-900"
            >
              💳 {isBn ? 'কোর্স ফি (৳৫০০)' : 'Course Fee (500 BDT)'}
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-purple-400 hover:bg-gray-900"
            >
              📊 {isBn ? 'লার্নিং ড্যাশবোর্ড' : 'Learning Dashboard'}
            </Link>
          </div>

          <div className="pt-2">
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-sm shadow-md"
            >
              <Sparkles size={16} />
              <span>{isBn ? 'ভর্তি হন (৳৫০০)' : 'Enroll (500 BDT)'}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
