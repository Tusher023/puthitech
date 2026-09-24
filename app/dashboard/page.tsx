'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { modules } from '@/lib/modules';
import { useLanguage } from '@/lib/i18n';
import { getModuleProgress, getTotalProgress, getTotalCompleted, getLastVisited, getStreak } from '@/lib/progress';
import ModuleCard from '@/components/ModuleCard';
import ProgressBar from '@/components/ProgressBar';
import { PlayCircle, Flame, CheckCircle, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });
  const [lastVisited, setLastVisited] = useState<{ moduleSlug: string; lessonSlug: string } | null>(null);
  const { language, t } = useLanguage();
  const isBn = language === 'bn';

  useEffect(() => {
    setMounted(true);
    setTotalProgress(getTotalProgress(modules));
    setTotalCompleted(getTotalCompleted(modules));
    setStreak(getStreak());
    setLastVisited(getLastVisited());
  }, []);

  const totalLessonsCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/60 via-gray-900 to-cyan-950/40 border border-purple-800/30 p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles size={14} /> {isBn ? '১০টি পূর্ণাঙ্গ মডিউল কারিকুলাম' : 'Comprehensive 10-Module Curriculum'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? (
              <>
                এআই ইঞ্জিনিয়ার <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">লার্নিং প্ল্যাটফর্ম</span>
              </>
            ) : (
              <>
                AI Engineer <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Learning Platform</span>
              </>
            )}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'জিরো থেকে অ্যাডভান্সড: পাইথন, মেশিন লার্নিং, ট্রান্সফরমার্স, প্রম্পট ইঞ্জিনিয়ারিং, র‍্যাগ (RAG) সিস্টেমস, অটোনোমাস এজেন্টস, LLMOps ও প্রোডাকশন ক্লাউড ডিপ্লয়মেন্ট।'
              : 'Zero to Advanced: Python, Machine Learning, Transformers, Prompt Engineering, RAG Systems, Autonomous Agents, LLMOps, and Production Cloud Deployment.'}
          </p>
          {lastVisited ? (
            <div className="pt-2">
              <Link
                href={`/modules/${lastVisited.moduleSlug}/${lastVisited.lessonSlug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-900/30 transition-all"
              >
                <PlayCircle size={16} /> {isBn ? 'শেষ লেসন থেকে শুরু করুন' : 'Resume Last Lesson'}
              </Link>
            </div>
          ) : (
            <div className="pt-2">
              <Link
                href="/modules/python-foundation/basics"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-900/30 transition-all"
              >
                <PlayCircle size={16} /> {isBn ? 'মডিউল ১ শুরু করুন' : 'Start Module 1'}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/80 border border-gray-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t('overallProgress')}</span>
            <CheckCircle size={16} className="text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white">{mounted ? `${totalProgress}%` : '0%'}</p>
          <ProgressBar value={mounted ? totalProgress : 0} size="sm" className="mt-2" />
        </div>

        <div className="bg-gray-900/80 border border-gray-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t('lessonsMastered')}</span>
            <BookOpen size={16} className="text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {mounted ? totalCompleted : 0} <span className="text-xs font-normal text-gray-500">/ {totalLessonsCount}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {isBn ? '১০টি কোর মডিউলে' : 'Across 10 core modules'}
          </p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t('dailyStreak')}</span>
            <Flame size={16} className="text-orange-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {mounted ? streak.currentStreak : 0} <span className="text-xs font-normal text-gray-500">{isBn ? 'দিন' : 'days'}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {isBn ? `সর্বোচ্চ: ${mounted ? streak.longestStreak : 0} দিন` : `Best: ${mounted ? streak.longestStreak : 0} days`}
          </p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t('projects')}</span>
            <Sparkles size={16} className="text-green-400" />
          </div>
          <p className="text-2xl font-black text-white">14</p>
          <p className="text-xs text-gray-500 mt-2">
            {isBn ? 'হ্যান্ডস-অন প্রজেক্টস' : 'Hands-on projects'}
          </p>
        </div>
      </div>

      {/* Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isBn ? 'কোর্স মডিউলসমূহ' : 'Course Modules'}
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              {isBn
                ? 'জিরো থেকে শুরু করে ধারাবাহিকভাবে সবগুলো মডিউল সম্পন্ন করুন'
                : 'Work through the modules in sequence from beginner to advanced'}
            </p>
          </div>
          <Link
            href="/modules"
            className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold"
          >
            {isBn ? 'সবগুলো দেখুন' : 'View all'} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <ModuleCard
              key={m.slug}
              module={m}
              progress={mounted ? getModuleProgress(m.slug, m.lessons.length) : 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
