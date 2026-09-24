'use client';

import Link from 'next/link';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Module } from '@/lib/modules';
import { useLanguage } from '@/lib/i18n';
import ProgressBar from './ProgressBar';

interface ModuleCardProps {
  module: Module;
  progress: number; // 0–100
  compact?: boolean;
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-green-900/60 text-green-400 border border-green-700/40',
  Intermediate: 'bg-yellow-900/60 text-yellow-400 border border-yellow-700/40',
  Advanced: 'bg-red-900/60 text-red-400 border border-red-700/40',
};

export default function ModuleCard({ module, progress, compact = false }: ModuleCardProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const isStarted = progress > 0;
  const isCompleted = progress === 100;

  const title = isBn && module.titleBn ? module.titleBn : module.title;
  const description = isBn && module.descriptionBn ? module.descriptionBn : module.description;
  const difficulty = isBn && module.difficultyBn ? module.difficultyBn : module.difficulty;

  const totalDuration = module.lessons.reduce((acc, lesson) => {
    const mins = parseInt(lesson.duration.replace(' min', ''), 10);
    return acc + (isNaN(mins) ? 0 : mins);
  }, 0);

  const hours = Math.floor(totalDuration / 60);
  const mins = totalDuration % 60;
  const durationLabel = isBn
    ? (hours > 0 ? `${hours} ঘণ্টা ${mins} মি.` : `${mins} মি.`)
    : (hours > 0 ? `${hours}h ${mins}m` : `${mins}m`);

  return (
    <Link href={`/modules/${module.slug}`} className="block group">
      <div
        className={`bg-gray-900 border border-gray-800 rounded-2xl transition-all duration-300
          hover:border-purple-600/50 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-0.5
          ${compact ? 'p-4' : 'p-5'}`}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className={`text-2xl flex-shrink-0 ${compact ? 'text-xl' : 'text-2xl'}`}>
              {module.icon}
            </span>
            <div className="min-w-0">
              <h3 className="text-white font-semibold text-sm leading-tight group-hover:text-purple-300 transition-colors truncate">
                {title}
              </h3>
              {!compact && (
                <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${difficultyColors[module.difficulty] || 'bg-purple-900/60 text-purple-400'}`}>
            {difficulty}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-3 text-gray-500 text-xs">
          <span className="flex items-center gap-1">
            <BookOpen size={12} />
            {isBn ? `${module.lessons.length}টি পাঠ` : `${module.lessons.length} lessons`}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {durationLabel}
          </span>
          {isCompleted && (
            <span className="text-green-400 font-medium">
              {isBn ? '✓ সম্পন্ন' : '✓ Complete'}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <ProgressBar value={progress} size="sm" className="mb-3" />

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {isBn ? `${progress}% সম্পন্ন` : `${progress}% complete`}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
            {isCompleted
              ? (isBn ? 'রিভিউ' : 'Review')
              : isStarted
              ? (isBn ? 'চালিয়ে যান' : 'Continue')
              : (isBn ? 'শুরু করুন' : 'Start')}
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
