'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { modules } from '@/lib/modules';
import { getLessonDetail } from '@/lib/lesson-content';
import { useLanguage } from '@/lib/i18n';
import { isCompleted, markComplete, markIncomplete, setLastVisited } from '@/lib/progress';
import LessonSidebar from '@/components/LessonSidebar';
import CodeBlock from '@/components/CodeBlock';
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code,
  Terminal,
  FileCode,
} from 'lucide-react';

export default function LessonPage({
  params,
}: {
  params: { slug: string; lesson: string };
}) {
  const mod = modules.find((m) => m.slug === params.slug);
  const lesson = mod?.lessons.find((l) => l.slug === params.lesson);

  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, t } = useLanguage();
  const isBn = language === 'bn';

  useEffect(() => {
    if (!mod || !lesson) return;
    setMounted(true);
    setCompleted(isCompleted(mod.slug, lesson.slug));
    setLastVisited(mod.slug, lesson.slug);
  }, [mod, lesson]);

  if (!mod || !lesson) {
    notFound();
  }

  const modTitle = isBn && mod.titleBn ? mod.titleBn : mod.title;
  const lessonTitle = isBn && lesson.titleBn ? lesson.titleBn : lesson.title;
  const lessonDesc = isBn && lesson.descriptionBn ? lesson.descriptionBn : lesson.description;

  const detail = getLessonDetail(mod.slug, lesson.slug, modTitle, lessonTitle, language);
  const currentIndex = mod.lessons.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? mod.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < mod.lessons.length - 1 ? mod.lessons[currentIndex + 1] : null;

  const toggleComplete = () => {
    if (completed) {
      markIncomplete(mod.slug, lesson.slug);
      setCompleted(false);
    } else {
      markComplete(mod.slug, lesson.slug);
      setCompleted(true);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with lessons */}
      <div className="hidden lg:block h-full">
        <LessonSidebar module={mod} currentLessonSlug={lesson.slug} />
      </div>

      {/* Main lesson content */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 max-w-4xl mx-auto w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Link href="/modules" className="hover:text-gray-300">{t('modules')}</Link>
            <span>/</span>
            <Link href={`/modules/${mod.slug}`} className="hover:text-purple-400">{modTitle}</Link>
            <span>/</span>
            <span className="text-gray-300 font-medium">{lessonTitle}</span>
          </div>
          <span className="font-mono text-purple-400">
            {currentIndex + 1} {t('of')} {mod.lessons.length}
          </span>
        </div>

        {/* Lesson Header */}
        <div className="border-b border-gray-800 pb-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/40 font-medium">
              {lesson.type}
            </span>
            <span className="text-xs text-gray-400">• {lesson.duration}</span>
            <span className="text-xs text-purple-400 font-mono">• {modTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            {lessonTitle}
          </h1>
          {lessonDesc && (
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {lessonDesc}
            </p>
          )}
        </div>

        {/* Learning Objective Callout */}
        <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-5 flex items-start gap-3 shadow-inner">
          <Sparkles className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-xs sm:text-sm text-purple-200">
            <strong className="font-semibold text-white block mb-1">{t('learningObjective')}:</strong>
            {detail.objective}
          </div>
        </div>

        {/* 1. Conceptual Overview */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <BookOpen size={20} className="text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">{t('conceptualOverview')}</h2>
          </div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {detail.theoryOverview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {detail.keyConcepts.map((kc, i) => (
              <div key={i} className="bg-gray-900/90 border border-gray-800/90 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-400 text-xs font-semibold">
                  <FileCode size={14} />
                  <span>{kc.title}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {kc.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Implementation Pattern & Code */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Code size={20} className="text-purple-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">{t('productionImpl')}</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {detail.codeExplanation}
          </p>

          <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <CodeBlock language="python" filename={`${lesson.slug}.py`}>
              {detail.codeSnippet}
            </CodeBlock>
          </div>
        </section>

        {/* 3. Hands-on Exercise */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Terminal size={20} className="text-orange-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">{t('handsOnLab')}</h2>
          </div>
          <div className="bg-gradient-to-r from-orange-950/20 via-gray-900 to-gray-900 border border-orange-900/40 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-orange-200 mb-1">{t('challengeTask')}</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {detail.handsOnExercise}
            </p>
          </div>
        </section>

        {/* 4. Key Engineering Takeaways */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Sparkles size={20} className="text-green-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">{t('productionTakeaways')}</h2>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 space-y-2">
            {detail.takeaways.map((takeaway, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                <span className="text-green-400 font-bold mt-0.5">✓</span>
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Completion Bar */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleComplete}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-sm font-semibold text-white transition-colors"
            >
              {completed ? (
                <>
                  <CheckCircle2 className="text-green-400" size={18} />
                  <span>{t('markedComplete')}</span>
                </>
              ) : (
                <>
                  <Circle className="text-gray-400" size={18} />
                  <span>{t('markAsDone')}</span>
                </>
              )}
            </button>
            <span className="text-xs text-gray-500">
              {completed ? (isBn ? 'অগ্রগতি লোকালস্টোরেজে সংরক্ষিত' : 'Progress recorded in localStorage') : (isBn ? 'সম্পন্ন হলে ক্লিক করে সেভ করুন' : 'Click when finished to save progress')}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {prevLesson && (
              <Link
                href={`/modules/${mod.slug}/${prevLesson.slug}`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-800 hover:bg-gray-800 text-xs font-semibold text-gray-300 transition-colors"
              >
                <ArrowLeft size={14} /> {t('previous')}
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/modules/${mod.slug}/${nextLesson.slug}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors shadow-lg shadow-purple-900/20"
              >
                {t('next')} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
