'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    modules: 'Modules',
    progress: 'Progress',
    resources: 'Resources',
    navigation: 'Navigation',
    overallProgress: 'Overall Progress',
    lessonsMastered: 'Lessons Mastered',
    dailyStreak: 'Daily Streak',
    projects: 'Projects',
    resumeLesson: 'Resume Last Lesson',
    startModule1: 'Start Module 1',
    backToModules: 'Back to All Modules',
    prerequisites: 'Prerequisites',
    completion: 'Completion',
    learningObjective: 'Learning Objective',
    conceptualOverview: '1. Conceptual Overview',
    productionImpl: '2. Production Implementation',
    handsOnLab: '3. Hands-on Lab & Exercise',
    productionTakeaways: '4. Production Takeaways',
    challengeTask: 'Challenge Task:',
    markedComplete: 'Marked Complete',
    markAsDone: 'Mark as Done',
    previous: 'Previous',
    next: 'Next',
    lesson: 'Lesson',
    of: 'of',
    switchLang: 'বাংলায় দেখুন',
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    modules: 'মডিউলসমূহ',
    progress: 'অগ্রগতি',
    resources: 'রিসোর্সসমূহ',
    navigation: 'নেভিগেশন',
    overallProgress: 'সার্বিক অগ্রগতি',
    lessonsMastered: 'সম্পন্ন লেসন',
    dailyStreak: 'দৈনিক স্ট্রাইক',
    projects: 'প্রজেক্টসমূহ',
    resumeLesson: 'শেষ লেসন থেকে শুরু করুন',
    startModule1: 'মডিউল ১ শুরু করুন',
    backToModules: 'সব মডিউলে ফিরে যান',
    prerequisites: 'পূর্বশর্ত',
    completion: 'সম্পূর্ণতা',
    learningObjective: 'শেখার উদ্দেশ্য (Learning Objective)',
    conceptualOverview: '১. ধারণাগত আলোচনা (Conceptual Overview)',
    productionImpl: '২. প্রোডাকশন ইমপ্লিমেন্টেশন ও কোড',
    handsOnLab: '৩. হ্যান্ডস-অন ল্যাব ও অ্যাসাইনমেন্ট',
    productionTakeaways: '৪. গুরুত্বপূর্ণ টেকঅ্যাওয়ে (Takeaways)',
    challengeTask: 'চ্যালেঞ্জ টাস্ক:',
    markedComplete: 'সম্পন্ন হয়েছে',
    markAsDone: 'সম্পন্ন হিসেবে চিহ্নিত করুন',
    previous: 'পূর্ববর্তী',
    next: 'পরবর্তী',
    lesson: 'লেসন',
    of: '/',
    switchLang: 'View in English',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('course_platform_lang') as Language;
    if (saved === 'en' || saved === 'bn') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('course_platform_lang', lang);
  };

  const t = (key: string): string => {
    return UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
