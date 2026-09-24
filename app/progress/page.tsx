'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { modules } from '@/lib/modules';
import {
  getTotalProgress,
  getTotalCompleted,
  getModuleProgress,
  getStreak,
  resetProgress,
  getCompletedLessons,
} from '@/lib/progress';
import ProgressBar from '@/components/ProgressBar';
import {
  Flame,
  Award,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });
  const [recentCompleted, setRecentCompleted] = useState<{ moduleSlug: string; lessonSlug: string; timestamp: number }[]>([]);

  const loadData = () => {
    setMounted(true);
    setTotalProgress(getTotalProgress(modules));
    setTotalCompleted(getTotalCompleted(modules));
    setStreak(getStreak());
    setRecentCompleted(getCompletedLessons());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all your progress tracking data?')) {
      resetProgress();
      loadData();
    }
  };

  const totalLessonsCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Your Learning Journey</h1>
          <p className="text-gray-400 text-sm mt-1">
            Track your milestone completions, study streaks, and module achievements.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-xs font-semibold text-gray-400 hover:text-red-400 border border-gray-800 transition-colors w-fit"
        >
          <RotateCcw size={14} /> Reset Progress
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 p-1 flex items-center justify-center mb-4 shadow-xl shadow-purple-900/20">
            <div className="w-full h-full bg-gray-950 rounded-full flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">{mounted ? totalProgress : 0}%</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Done</span>
            </div>
          </div>
          <h3 className="text-base font-bold text-white">Overall Completion</h3>
          <p className="text-xs text-gray-400 mt-1">
            {mounted ? totalCompleted : 0} of {totalLessonsCount} lessons finished
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-orange-400 mb-3">
              <Flame size={20} />
              <h3 className="text-base font-bold text-white">Study Habit</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Current Streak</span>
                <span className="font-bold text-white font-mono">{mounted ? streak.currentStreak : 0} days</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Longest Streak</span>
                <span className="font-bold text-purple-400 font-mono">{mounted ? streak.longestStreak : 0} days</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 border-t border-gray-800 pt-3">
            Consistent daily practice solidifies engineering memory.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-3">
              <Award size={20} />
              <h3 className="text-base font-bold text-white">Badge Status</h3>
            </div>
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800/40 text-xs font-semibold">
                {totalProgress >= 100
                  ? '🏆 Master AI Engineer'
                  : totalProgress >= 50
                  ? '⚡ Senior Autonomous Builder'
                  : totalProgress >= 20
                  ? '🚀 Emerging AI Architect'
                  : '🌱 Apprentice Engineer'}
              </span>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                Unlock higher rank badges as you advance through practical capstones.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-400 mt-4 border-t border-gray-800 pt-3">
            <CheckCircle2 size={14} /> 100% Free & Self-Paced
          </div>
        </div>
      </div>

      {/* Per Module Progress */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Module Breakdown</h2>
        <div className="space-y-4">
          {modules.map((m) => {
            const prog = mounted ? getModuleProgress(m.slug, m.lessons.length) : 0;
            return (
              <div key={m.slug} className="p-4 rounded-xl bg-gray-950 border border-gray-800/80">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl">{m.icon}</span>
                    <Link
                      href={`/modules/${m.slug}`}
                      className="text-sm font-semibold text-white hover:text-purple-300 transition-colors truncate"
                    >
                      {m.title}
                    </Link>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-400 flex-shrink-0">
                    {prog}%
                  </span>
                </div>
                <ProgressBar value={prog} size="sm" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
