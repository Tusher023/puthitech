'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Module } from '@/lib/modules';
import { useLanguage } from '@/lib/i18n';
import CodeBlock from '@/components/CodeBlock';
import { X, Check, Copy, ArrowRight, BookOpen, Terminal, Sparkles, Layers } from 'lucide-react';

interface QuickLearnModalProps {
  module: Module | null;
  onClose: () => void;
}

export default function QuickLearnModal({ module, onClose }: QuickLearnModalProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [completed, setCompleted] = useState(false);

  if (!module) return null;

  const title = isBn && module.titleBn ? module.titleBn : module.title;
  const description = isBn && module.descriptionBn ? module.descriptionBn : module.description;
  const difficulty = isBn && module.difficultyBn ? module.difficultyBn : module.difficulty;

  // Reference code snippet for the module
  const sampleCode = `# ${title} Reference Pipeline
import os
import sys

def main():
    print(f"[*] Initializing ${module.slug} pipeline...")
    config = {
        "module": "${module.slug}",
        "status": "ready",
        "lessons_count": ${module.lessons.length}
    }
    print(f"[✓] Architecture verified: {config}")
    return 0

if __name__ == "__main__":
    sys.exit(main())`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-950 border border-purple-800/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-2xl bg-purple-950/40 border border-purple-800/40">
              {module.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/40">
                  {difficulty}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {module.lessons.length} {isBn ? 'টি পাঠ' : 'Lessons'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {title}
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

        {/* Conceptual Overview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <BookOpen size={14} />
            <span>{isBn ? 'ধারণাগত সারসংক্ষেপ (Overview)' : 'Conceptual Overview'}</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed bg-gray-900/60 p-4 rounded-2xl border border-gray-800/80">
            {description}
          </p>
        </div>

        {/* Syllabus Lessons */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <Layers size={14} />
            <span>{isBn ? 'সিলেবাস ও পাঠসমূহ (Syllabus)' : 'Curriculum Lessons'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {module.lessons.slice(0, 6).map((lesson, idx) => (
              <div
                key={lesson.slug}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-900/40 border border-gray-800/60 text-xs text-gray-300"
              >
                <span className="text-gray-500 font-mono text-[10px]">#{idx + 1}</span>
                <span className="truncate">{isBn && lesson.titleBn ? lesson.titleBn : lesson.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code Reference */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-wider">
            <Terminal size={14} />
            <span>{isBn ? 'কোড রেফারেন্স' : 'Code Pattern Reference'}</span>
          </div>
          <CodeBlock language="python" filename={`${module.slug}_sample.py`}>
            {sampleCode}
          </CodeBlock>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-800">
          <button
            onClick={() => setCompleted(!completed)}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
              completed
                ? 'bg-green-950/60 border-green-600 text-green-300'
                : 'bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-850'
            }`}
          >
            <Check size={16} className={completed ? 'text-green-400' : 'text-gray-500'} />
            <span>{completed ? (isBn ? 'সম্পন্ন হয়েছে!' : 'Reviewed!') : (isBn ? 'সম্পন্ন হিসেবে চিহ্নিত করুন' : 'Mark Reviewed')}</span>
          </button>

          <Link
            href={`/modules/${module.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-900/30 transition-transform hover:scale-[1.02]"
          >
            <span>{isBn ? 'পূর্ণাঙ্গ ক্লাসরুম খুলুন' : 'Open in Classroom Platform'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
