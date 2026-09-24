'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { useSubscription } from '@/lib/subscription';
import {
  Home,
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Library,
  Zap,
  Menu,
  X,
  ChevronRight,
  Globe,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isSubscribed, unsubscribe, subscriberInfo } = useSubscription();
  const isBn = language === 'bn';

  const navLinks = [
    { href: '/', label: isBn ? 'হোমপেজ' : 'Home', icon: Home },
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/modules', label: t('modules'), icon: BookOpen },
    { href: '/progress', label: t('progress'), icon: TrendingUp },
    { href: '/resources', label: t('resources'), icon: Library },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 px-6 py-5 border-b border-gray-800 hover:bg-gray-900/40 transition-colors">
        <img
          src="/logo.png"
          alt="Puthi Logo"
          className="w-10 h-10 rounded-xl object-cover shadow-lg border border-purple-500/30"
        />
        <div>
          <h1 className="text-white font-extrabold text-lg leading-tight bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">
            Puthi
          </h1>
          <p className="text-cyan-400 text-[9px] font-mono tracking-wider uppercase">
            Code • Learn • Build
          </p>
        </div>
      </Link>

      {/* Language Switcher */}
      <div className="px-5 py-3 border-b border-gray-800/80 flex items-center justify-between bg-gray-900/30">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <Globe size={14} className="text-purple-400" />
          <span>{isBn ? 'ভাষা' : 'Language'}</span>
        </div>
        <div className="inline-flex bg-gray-900 border border-gray-700/60 rounded-full p-0.5 shadow-inner">
          <button
            onClick={() => setLanguage('en')}
            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold transition-all ${
              language === 'en'
                ? 'bg-purple-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('bn')}
            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold transition-all ${
              language === 'bn'
                ? 'bg-purple-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            বাংলা
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
          {t('navigation')}
        </p>
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              isActive(href)
                ? 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Icon
              className={`w-4.5 h-4.5 flex-shrink-0 ${
                isActive(href) ? 'text-purple-400' : 'text-gray-500 group-hover:text-gray-300'
              }`}
              size={18}
            />
            {label}
            {isActive(href) && (
              <ChevronRight className="w-3.5 h-3.5 ml-auto text-purple-400" />
            )}
          </Link>
        ))}
      </nav>

      {/* Active Subscription Badge */}
      <div className="px-3 py-3 border-t border-gray-800 space-y-2">
        <div className="flex items-center justify-between p-2 rounded-xl bg-green-950/40 border border-green-700/40 text-xs">
          <div className="flex items-center gap-1.5 text-green-300 font-semibold truncate">
            <ShieldCheck size={14} className="text-green-400 shrink-0" />
            <span className="truncate">{subscriberInfo?.name || (isBn ? 'প্রিমিয়াম অ্যাক্টিভ' : '500 BDT Enrolled')}</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-900/60 text-green-300 font-mono">
            ৳500
          </span>
        </div>

        <button
          onClick={() => {
            if (confirm(isBn ? 'আপনি কি সাবস্ক্রিপশন রিসেট/লক করতে চান?' : 'Lock access and reset subscription?')) {
              unsubscribe();
              window.location.href = '/';
            }
          }}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] text-gray-500 hover:text-red-400 hover:bg-gray-900 transition-colors"
        >
          <LogOut size={12} />
          <span>{isBn ? 'লক ভিউ পরীক্ষা করুন' : 'Test Lock View'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 hover:text-white"
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close navigation menu"
        >
          <X size={20} />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-gray-950 border-r border-gray-800 flex-col flex-shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}
