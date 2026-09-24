'use client';

import { useState, useEffect } from 'react';
import { modules } from '@/lib/modules';
import { useLanguage } from '@/lib/i18n';
import { getModuleProgress } from '@/lib/progress';
import ModuleCard from '@/components/ModuleCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ModulesPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const { language } = useLanguage();
  const isBn = language === 'bn';

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = modules.filter((m) => {
    const s = search.toLowerCase();
    const matchesSearch =
      m.title.toLowerCase().includes(s) ||
      m.description.toLowerCase().includes(s) ||
      (m.titleBn && m.titleBn.toLowerCase().includes(s)) ||
      (m.descriptionBn && m.descriptionBn.toLowerCase().includes(s));
    const matchesDiff = difficultyFilter === 'All' || m.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const diffLabels: Record<string, { en: string; bn: string }> = {
    All: { en: 'All', bn: 'সব' },
    Beginner: { en: 'Beginner', bn: 'বিগিনার' },
    Intermediate: { en: 'Intermediate', bn: 'ইন্টারমিডিয়েট' },
    Advanced: { en: 'Advanced', bn: 'অ্যাডভান্সড' },
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">
          {isBn ? 'কোর্স কারিকুলাম' : 'Course Curriculum'}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {isBn
            ? '১০টি ধারাবাহিক মডিউল ঘুরে দেখুন: ফান্ডামেন্টাল কোডিং থেকে শুরু করে এন্টারপ্রাইজ এজেন্ট ডিপ্লয়মেন্ট পর্যন্ত।'
            : 'Explore all 10 modules structured sequentially from fundamental coding to enterprise agent deployment.'}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isBn ? 'মডিউল, কনসেপ্ট বা অ্যালগরিদম খুঁজুন...' : 'Search modules, concepts, algorithms...'}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-gray-500" />
          <span className="text-xs text-gray-400 font-medium">
            {isBn ? 'লেভেল:' : 'Difficulty:'}
          </span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                difficultyFilter === diff
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:text-gray-200 border border-gray-800'
              }`}
            >
              {isBn ? diffLabels[diff].bn : diffLabels[diff].en}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((m) => {
          const prog = mounted ? getModuleProgress(m.slug, m.lessons.length) : 0;
          return <ModuleCard key={m.slug} module={m} progress={prog} />;
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500 text-sm">
          {isBn ? 'কোনো মডিউল পাওয়া যায়নি।' : 'No modules found matching your query.'}
        </div>
      )}
    </div>
  );
}
