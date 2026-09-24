'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { modules } from '@/lib/modules';
import { useLanguage } from '@/lib/i18n';
import { isCompleted, markComplete, markIncomplete, getModuleProgress } from '@/lib/progress';
import ProgressBar from '@/components/ProgressBar';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function ModuleDetailPage({ params }: { params: { slug: string } }) {
  const mod = modules.find((m) => m.slug === params.slug);
  const [mounted, setMounted] = useState(false);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const { language } = useLanguage();
  const isBn = language === 'bn';

  useEffect(() => {
    if (!mod) return;
    setMounted(true);
    const map: Record<string, boolean> = {};
    for (const l of mod.lessons) {
      map[l.slug] = isCompleted(mod.slug, l.slug);
    }
    setCompletedMap(map);
  }, [mod]);

  if (!mod) {
    notFound();
  }

  const title = isBn && mod.titleBn ? mod.titleBn : mod.title;
  const description = isBn && mod.descriptionBn ? mod.descriptionBn : mod.description;
  const difficulty = isBn && mod.difficultyBn ? mod.difficultyBn : mod.difficulty;

  const toggleLesson = (lessonSlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentlyDone = completedMap[lessonSlug];
    if (currentlyDone) {
      markIncomplete(mod.slug, lessonSlug);
      setCompletedMap({ ...completedMap, [lessonSlug]: false });
    } else {
      markComplete(mod.slug, lessonSlug);
      setCompletedMap({ ...completedMap, [lessonSlug]: true });
    }
  };

  const progress = mounted ? getModuleProgress(mod.slug, mod.lessons.length) : 0;

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full space-y-8">
      {/* Back button */}
      <Link
        href="/modules"
        className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
      >
        <ChevronLeft size={16} /> {isBn ? 'সব মডিউলে ফিরে যান' : 'Back to All Modules'}
      </Link>

      {/* Module Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{mod.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-900/60 text-purple-300 border border-purple-700/40">
                  {difficulty}
                </span>
                <span className="text-xs text-gray-400">
                  • {isBn ? `${mod.lessons.length}টি পাঠ` : `${mod.lessons.length} Lessons`}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {title}
              </h1>
            </div>
          </div>
          <div className="w-full sm:w-48 bg-gray-950/80 p-3 rounded-2xl border border-gray-800 text-right">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-medium">
              <span>{isBn ? 'অগ্রগতি' : 'Completion'}</span>
              <span className="text-white font-bold">{progress}%</span>
            </div>
            <ProgressBar value={progress} size="sm" />
          </div>
        </div>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
          {description}
        </p>

        {mod.prerequisites && mod.prerequisites.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-400 pt-4 border-t border-gray-800">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span className="font-semibold text-gray-300">{isBn ? 'পূর্বশর্ত:' : 'Prerequisites:'}</span>
            {mod.prerequisites.map((prereq) => (
              <span key={prereq} className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-mono">
                {prereq}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Lessons List */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          {isBn ? 'কারিকুলাম পাঠ তালিকা (Lessons)' : 'Curriculum Lessons'}
        </h2>
        <div className="space-y-3">
          {mod.lessons.map((lesson, idx) => {
            const isDone = completedMap[lesson.slug];
            const lessonTitle = isBn && lesson.titleBn ? lesson.titleBn : lesson.title;
            const lessonDesc = isBn && lesson.descriptionBn ? lesson.descriptionBn : lesson.description;

            return (
              <Link
                key={lesson.slug}
                href={`/modules/${mod.slug}/${lesson.slug}`}
                className="group flex items-center justify-between p-4 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-purple-600/50 hover:bg-gray-900 transition-all"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <button
                    onClick={(e) => toggleLesson(lesson.slug, e)}
                    className="flex-shrink-0 text-gray-600 hover:text-green-400 transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 size={20} className="text-green-400" />
                    ) : (
                      <Circle size={20} className="group-hover:text-purple-400" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-500">#{idx + 1}</span>
                      <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                        {lessonTitle}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700/50">
                        {lesson.type}
                      </span>
                    </div>
                    {lessonDesc && (
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {lessonDesc}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} /> {lesson.duration}
                  </span>
                  <ArrowRight size={16} className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
