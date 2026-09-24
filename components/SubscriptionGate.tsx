'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { useSubscription } from '@/lib/subscription';
import EnrollModal from '@/components/landing/EnrollModal';
import {
  Lock,
  Sparkles,
  ArrowRight,
  Check,
  ShieldAlert,
  KeyRound,
  Home,
  CheckCircle2
} from 'lucide-react';

export default function SubscriptionGate() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { unlockWithTrxId } = useSubscription();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trxInput, setTrxInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxInput.trim()) {
      setErrorMsg(isBn ? 'দয়া করে আপনার TrxID বা ফোন নম্বর দিন।' : 'Please enter your TrxID or phone number.');
      return;
    }
    const success = unlockWithTrxId(trxInput);
    if (success) {
      setSuccessMsg(isBn ? 'সফলভাবে আনলক হয়েছে!' : 'Access granted! Unlocking...');
      setErrorMsg('');
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } else {
      setErrorMsg(isBn ? 'সঠিক TrxID প্রদান করুন (কমপক্ষে ৪ অক্ষর)।' : 'Invalid TrxID (min 4 characters).');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-950 text-gray-100">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute bottom-[20%] right-[30%] w-[450px] h-[450px] rounded-full bg-pink-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-gray-900/90 border-2 border-purple-800/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/50 text-center space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 pb-2 border-b border-gray-800/80">
          <img
            src="/logo.png"
            alt="Puthi Logo"
            className="w-12 h-12 rounded-2xl object-cover shadow-xl border border-purple-500/40"
          />
          <div className="text-left">
            <h2 className="text-white font-black text-xl leading-tight bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">
              Puthi
            </h2>
            <p className="text-cyan-400 text-[9px] font-mono tracking-widest uppercase">
              CODE • LEARN • BUILD • GLOBAL
            </p>
          </div>
        </div>

        {/* Lock Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-purple-900/40 animate-pulse">
          <Lock size={30} />
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-black font-extrabold text-[10px] flex items-center justify-center border-2 border-gray-900">
            !
          </div>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <ShieldAlert size={14} />
            <span>{isBn ? 'প্রিমিয়াম সাবস্ক্রিপশন লক' : 'Subscription Required'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isBn ? (
              <>
                এই কন্টেন্টটি দেখতে{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  ৫০০ টাকা সাবস্ক্রিপশন
                </span>{' '}
                প্রয়োজন
              </>
            ) : (
              <>
                Full Access Locked —{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Enroll for 500 BDT
                </span>
              </>
            )}
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            {isBn
              ? 'বিনা সাবস্ক্রিপশনে পাবলিক ভিজিটররা কেবল ল্যান্ডিং পেজ ওভারভিউ দেখতে পারবেন। সম্পূর্ণ ক্লাসরুম ড্যাশবোর্ড, ১০টি মডিউল এবং প্র্যাকটিক্যাল কোড ল্যাব আনলক করতে ৫০০ টাকা ফি দিয়ে ভর্তি হন।'
              : 'Public visitors can only view the overview page without a subscription. To unlock the complete LMS dashboard, all 10 modules, exercises, and production code, please activate your 500 BDT lifetime access.'}
          </p>
        </div>

        {/* What You Unlock Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left bg-gray-950/70 p-4 rounded-2xl border border-gray-800">
          {[
            isBn ? '১০টি পূর্ণাঙ্গ মডিউল ও সিলেবাস' : 'Full 10 Modules & Complete Syllabus',
            isBn ? '৪০+ ইন্টারেক্টিভ কোডিং লেসন' : '40+ Interactive Hands-on Lessons',
            isBn ? '১০+ ক্যাপস্টোন প্রজেক্টের সোর্স কোড' : '10+ Production Capstone Repositories',
            isBn ? 'বাংলা ও ইংরেজি দ্বৈত ভাষা ইন্টারফেস' : '100% Dual-Language (Bangla & English)',
            isBn ? 'অগ্রগতি ট্র্যাকার ও ডেইলি স্ট্রাইক' : 'Progress Tracking & Daily Streaks',
            isBn ? 'লাইফটাইম অ্যাক্সেস ও ভবিষ্যৎ আপডেট' : 'Lifetime Access & Free Updates'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
              <CheckCircle2 size={15} className="text-green-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="space-y-4 pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-sm sm:text-base shadow-xl shadow-purple-950/60 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            <span>
              {isBn ? 'এখনই ৫০০ টাকায় ভর্তি হয়ে আনলক করুন' : 'Enroll Now for 500 BDT to Unlock'}
            </span>
            <ArrowRight size={18} />
          </button>

          {/* Quick TrxID Unlock form */}
          <form onSubmit={handleUnlock} className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 font-medium">
                <KeyRound size={14} className="text-purple-400" />
                {isBn ? 'আগে পেমেন্ট করেছেন? TrxID দিন:' : 'Already paid? Enter TrxID to unlock:'}
              </span>
              <span className="text-[11px] text-green-400 font-mono">bKash / Nagad</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={trxInput}
                onChange={(e) => setTrxInput(e.target.value)}
                placeholder={isBn ? 'যেমন: BLX920K10 বা ফোন নম্বর' : 'e.g. BLX920K10 or Phone'}
                className="flex-1 px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-white text-xs font-mono uppercase focus:outline-none focus:border-purple-500 placeholder:text-gray-600"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold transition-colors shrink-0"
              >
                {isBn ? 'আনলক' : 'Unlock'}
              </button>
            </div>

            {errorMsg && <p className="text-[11px] text-red-400 text-left">{errorMsg}</p>}
            {successMsg && <p className="text-[11px] text-green-400 text-left">{successMsg}</p>}
          </form>

          {/* Back to Home Link */}
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <Home size={14} />
              <span>{isBn ? 'পাবলিক হোমপেজে ফিরে যান' : 'Back to Public Overview Page'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      <EnrollModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
