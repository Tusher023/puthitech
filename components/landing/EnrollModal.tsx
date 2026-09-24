'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { useSubscription } from '@/lib/subscription';
import { X, CheckCircle, Copy, Check, ArrowRight, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollModal({ isOpen, onClose }: EnrollModalProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { subscribe } = useSubscription();

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    trxId: '',
  });

  if (!isOpen) return null;

  const phoneNumbers = {
    bkash: '01700-000000',
    nagad: '01800-000000',
    rocket: '01900-000000',
  };

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num.replace('-', ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.trxId) {
      alert(isBn ? 'দয়া করে নাম, ফোন নম্বর এবং TrxID প্রদান করুন।' : 'Please fill in your name, phone number, and TrxID.');
      return;
    }
    // Activate subscription
    subscribe({
      name: formData.name,
      phone: formData.phone,
      trxId: formData.trxId,
    });
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-gray-950 border border-purple-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Puthi Logo"
              className="w-11 h-11 rounded-xl object-cover shadow-lg border border-purple-500/30"
            />
            <div>
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Puthi • {isBn ? 'এনরোলমেন্ট' : 'Course Enrollment'}
              </span>
              <h2 className="text-xl font-extrabold text-white">
                {isBn ? 'কোর্স ফি: ৫০০ টাকা (500 BDT)' : 'Course Fee: 500 BDT Only'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400">
              <CheckCircle size={36} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                {isBn ? 'অভিনন্দন! আপনার আবেদন সফল হয়েছে' : 'Congratulations! Enrollment Confirmed'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                {isBn
                  ? 'আপনার TrxID সফলভাবে রেকর্ড করা হয়েছে। আপনার লাইফটাইম অ্যাক্সেস সক্রিয় হয়েছে।'
                  : 'Your transaction has been verified. Lifetime access to all 10 modules is now unlocked.'}
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/dashboard"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-purple-950/50 transition-transform hover:scale-[1.02]"
              >
                <span>{isBn ? 'ক্লাসরুমে প্রবেশ করুন' : 'Go to Classroom Dashboard'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Price Badge Banner */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/40 to-cyan-900/30 border border-purple-800/40">
              <div>
                <div className="text-xs text-gray-300 font-medium">
                  {isBn ? '১০টি পূর্ণাঙ্গ মডিউল + লাইফটাইম অ্যাক্সেস' : '10 Full Modules + Lifetime Access'}
                </div>
                <div className="text-xs text-gray-500 line-through">৳৫,০০০ টাকা (Regular Fee)</div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text">
                  ৳৫০০
                </span>
                <span className="text-xs text-gray-300 ml-1 font-mono">BDT</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
                <span>{isBn ? 'পেমেন্ট মাধ্যম বেছে নিন:' : 'Select Payment Method:'}</span>
                <span className="text-[11px] text-purple-400">{isBn ? 'Send Money / পার্সোনাল' : 'Send Money (Personal)'}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    paymentMethod === 'bkash'
                      ? 'bg-pink-950/60 border-pink-500 text-pink-300 shadow-md shadow-pink-950/40'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  বিকাশ (bKash)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    paymentMethod === 'nagad'
                      ? 'bg-orange-950/60 border-orange-500 text-orange-300 shadow-md shadow-orange-950/40'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  নগদ (Nagad)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('rocket')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    paymentMethod === 'rocket'
                      ? 'bg-purple-950/60 border-purple-500 text-purple-300 shadow-md shadow-purple-950/40'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  রকেট (Rocket)
                </button>
              </div>

              {/* Number display */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900 border border-gray-800">
                <div className="text-xs text-gray-300">
                  <span className="text-gray-500">{isBn ? 'নম্বর:' : 'Number:'} </span>
                  <span className="font-mono font-bold text-white text-sm">
                    {phoneNumbers[paymentMethod]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(phoneNumbers[paymentMethod])}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs transition-colors"
                >
                  {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  <span>{copied ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}</span>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  {isBn ? 'আপনার নাম' : 'Your Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? 'যেমন: আরিফুল ইসলাম' : 'e.g. John Doe'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    {isBn ? 'মোবাইল নম্বর' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    {isBn ? 'Transaction ID (TrxID)' : 'Transaction ID (TrxID)'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BLX892K10"
                    value={formData.trxId}
                    onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-white text-xs uppercase placeholder:text-gray-600 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-purple-950/50 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              <span>
                {isBn ? '৫০০ টাকা পেমেন্ট নিশ্চিত করে এনরোল করুন' : 'Confirm 500 BDT Payment & Enroll'}
              </span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-green-400" />
              <span>
                {isBn
                  ? '১০০% নিরাপদ লেনদেন • ইনস্ট্যান্ট ড্যাশবোর্ড অ্যাক্সেস'
                  : '100% Secure • Instant Dashboard & Classroom Access'}
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
