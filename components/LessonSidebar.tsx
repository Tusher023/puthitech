'use client';

import Link from 'next/link';
import { Module } from '@/lib/modules';
import { isCompleted } from '@/lib/progress';
import { useLanguage } from '@/lib/i18n';
import { CheckCircle2, Circle, Clock, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LessonSidebarProps {
  module: Module;
  currentLessonSlug: string;
}

export default function LessonSidebar({ module, currentLessonSlug }: LessonSidebarProps) {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const { language } = useLanguage();
  const isBn = language === 'bn';

  useEffect(() => {
    const map: Record<string, boolean> = {};
    for (const l of module.lessons) {
      map[l.slug] = isCompleted(module.slug, l.slug);
    }
    setCompletedMap(map);
  }, [module.slug, module.lessons, currentLessonSlug]);

  const moduleTitle = isBn && module.titleBn ? module.titleBn : module.title;

  return (
    <aside className="w-72 bg-gray-900/70 border-r border-gray-800 p-4 h-full flex flex-col flex-shrink-0">
      <Link
        href={`/modules/${module.slug}`}
        className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 mb-4 transition-colors font-medium"
      >
        <ChevronLeft size={14} /> {isBn ? 'মডিউল বিবরণীতে ফিরে যান' : 'Back to Module Overview'}
      </Link>

      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
        <span className="text-2xl">{module.icon}</span>
        <div>
          <h2 className="text-sm font-bold text-white line-clamp-1">{moduleTitle}</h2>
          <p className="text-xs text-gray-400">
            {isBn ? `${module.lessons.length}টি পাঠ (Lessons)` : `${module.lessons.length} lessons`}
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
        {module.lessons.map((lesson, idx) => {
          const active = lesson.slug === currentLessonSlug;
          const done = completedMap[lesson.slug];
          const lessonTitle = isBn && lesson.titleBn ? lesson.titleBn : lesson.title;

          return (
            <Link
              key={lesson.slug}
              href={`/modules/${module.slug}/${lesson.slug}`}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg text-xs transition-all ${
                active
                  ? 'bg-purple-600/20 text-purple-200 border border-purple-600/40 font-semibold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {done ? (
                  <CheckCircle2 size={15} className="text-green-400" />
                ) : (
                  <Circle size={15} className={active ? 'text-purple-400' : 'text-gray-600'} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate leading-tight">
                  <span className="text-gray-500 mr-1.5">{idx + 1}.</span>
                  {lessonTitle}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {lesson.duration}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-gray-800 text-gray-400">
                    {lesson.type}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
