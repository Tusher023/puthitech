'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { modules, Module } from '@/lib/modules';
import { useLanguage } from '@/lib/i18n';
import LandingNavbar from '@/components/landing/Navbar';
import CodeWindow from '@/components/landing/CodeWindow';
import QuickLearnModal from '@/components/landing/QuickLearnModal';
import EnrollModal from '@/components/landing/EnrollModal';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Layers,
  Cpu,
  Bot,
  Zap,
  ShieldCheck,
  ChevronDown,
  Terminal,
  ExternalLink,
  GraduationCap,
  FolderGit2,
  LayoutDashboard,
  CreditCard,
  Check
} from 'lucide-react';

export default function UnifiedLandingPage() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const faqs = [
    {
      qEn: 'What is the course fee and how do I enroll?',
      qBn: 'কোর্স ফি কত এবং কীভাবে পেমেন্ট করে ভর্তি হব?',
      aEn: 'The full course fee is only 500 BDT (৳৫০০ টাকা) for lifetime access to all 10 modules, 40+ lessons, projects, and future updates. You can easily enroll using bKash, Nagad, or Rocket.',
      aBn: 'সম্পূর্ণ ১০টি মডিউল, ৪০+ লেসন ও ক্যাপস্টোন প্রজেক্টের লাইফটাইম অ্যাক্সেসের জন্য কোর্স ফি মাত্র ৫০০ টাকা (500 BDT)। আপনি বিকাশ (bKash), নগদ (Nagad) বা রকেটের মাধ্যমে সেন্ড মানি করে খুব সহজেই ভর্তি হতে পারবেন।'
    },
    {
      qEn: 'Do I need a high-end GPU or paid API keys to learn?',
      qBn: 'শেখার জন্য কি কোনো দামি GPU বা পেইড এপিআই কী প্রয়োজন?',
      aEn: 'Not at all. You can run open models locally with Ollama/llama.cpp or use free Google Colab/Kaggle T4 GPUs. Free tier API keys (Groq, Hugging Face, Cohere) are also covered.',
      aBn: 'একদমই না। আপনি Ollama বা ফ্রি Google Colab/Kaggle T4 GPU ব্যবহার করতে পারবেন। পাশাপাশি বিনামূল্যে Groq, Hugging Face ও Cohere এর ফ্রি টিয়ার ব্যবহার শিখানো হয়েছে।'
    },
    {
      qEn: 'How does the bilingual Bangla & English switcher work?',
      qBn: 'বাংলা এবং ইংরেজি ভাষা পরিবর্তনের ফিচারটি কীভাবে কাজ করে?',
      aEn: 'Click the [ 🌐 EN | বাংলা ] toggle in the top navigation at any time. It instantly translates curriculum cards, explanations, and LMS dashboards while persisting your choice.',
      aBn: 'উপরে ডানদিকের [ 🌐 EN | বাংলা ] বাটনে ক্লিক করলেই এক ক্লিকে সম্পূর্ণ ওয়েবসাইট ও লেসন বাংলায় বা ইংরেজিতে রূপান্তরিত হয়ে যাবে।'
    },
    {
      qEn: 'How do I access the LMS classroom and track my progress?',
      qBn: 'ক্লাসরুম বা এলএমএস ড্যাশবোর্ডে গিয়ে কীভাবে পড়ার অগ্রগতি ট্র্যাক করব?',
      aEn: 'Click "Enter Classroom (LMS)" or "Dashboard" from anywhere. Your lesson completions, streak count, and last visited topics are automatically saved in your browser.',
      aBn: '"Enter Classroom (LMS)" বা "Dashboard" বাটনে ক্লিক করুন। আপনার সম্পন্ন করা লেসন, স্ট্রিক কাউন্ট এবং শেষ পড়ার অগ্রগতি ব্রাউজারে স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে।'
    },
    {
      qEn: 'What career roles does this curriculum prepare me for?',
      qBn: 'এই কারিকুলাম শেষ করলে আমি কোন কোন জবের জন্য উপযুক্ত হব?',
      aEn: 'This curriculum prepares you for AI Engineer, LLM Engineer, RAG Systems Developer, Autonomous Agent Architect, and Applied ML Ops Specialist roles.',
      aBn: 'এই কারিকুলাম শেষ করলে আপনি AI Engineer, LLM Engineer, RAG Systems Developer, Agent Architect ও Applied MLOps স্পেশালিস্ট হিসেবে কাজের যোগ্যতা অর্জন করবেন।'
    }
  ];

  const projects = [
    {
      titleEn: 'Autonomous Research Multi-Agent Team',
      titleBn: 'অটোনোমাস রিসার্চ মাল্টি-এজেন্ট টিম',
      descEn: 'Collaborative agent system that performs web search, python script synthesis, verification, and automated markdown reports.',
      descBn: 'একটি পূর্ণাঙ্গ মাল্টি-এজেন্ট সিস্টেম যা স্বয়ংক্রিয় ওয়েব সার্চ, পাইথন স্ক্রিপ্ট এক্সিকিউশন, তথ্য যাচাই এবং রিপোর্ট তৈরি করে।',
      tech: ['LangGraph', 'Tavily API', 'ChromaDB', 'FastAPI'],
      badge: 'Advanced'
    },
    {
      titleEn: 'Enterprise Multimodal Hybrid RAG',
      titleBn: 'এন্টারপ্রাইজ মাল্টিমোডাল হাইব্রিড র‍্যাগ',
      descEn: 'Production RAG engine combining dense vector search (Qdrant), BM25 keyword matching, reranking (Cohere), and PDF table parsing.',
      descBn: 'প্রোডাকশন-গ্রেড RAG পাইপলাইন যাতে ভেক্টর সার্চ, BM25 কিওয়ার্ড ম্যাচিং, Cohere রি-র‍্যাংকিং এবং টেবিল পার্সিং অন্তর্ভুক্ত।',
      tech: ['Qdrant', 'ColBERT', 'Cohere Rerank', 'Streamlit'],
      badge: 'Production'
    },
    {
      titleEn: 'Domain-Specific LLM Fine-Tuning',
      titleBn: 'ডোমেন-নির্দিষ্ট এলএলএম ফাইন-টিউনিং',
      descEn: 'Custom instruction fine-tuning on Llama 3 using QLoRA, parameter-efficient adapters, and deployment on high-throughput vLLM.',
      descBn: 'Llama 3 মডেলে QLoRA অ্যাডাপ্টার দিয়ে কাস্টম ডোমেন টিউনিং এবং vLLM দিয়ে উচ্চ-পারফরম্যান্স সার্ভিং।',
      tech: ['Llama 3', 'Unsloth / LoRA', 'vLLM', 'W&B'],
      badge: 'State-of-the-Art'
    },
    {
      titleEn: 'LLMOps Observability & Evaluation Suite',
      titleBn: 'এলএলএমঅপস অবজারভেবিলিটি ও ইভ্যালুয়েশন',
      descEn: 'End-to-end telemetry tracking latency, token usage, drift detection, and automated golden dataset LLM-as-a-judge evals.',
      descBn: 'টোকেন খরচ, লেটেন্সি, ড্রিফট সনাক্তকরণ এবং LLM-as-a-Judge এর মাধ্যমে স্বয়ংক্রিয় গুণমান যাচাইয়ের পূর্ণাঙ্গ ফ্রেমওয়ার্ক।',
      tech: ['Langfuse', 'OpenTelemetry', 'Docker', 'Prometheus'],
      badge: 'Enterprise'
    }
  ];

  const roadmapSteps = [
    {
      month: isBn ? 'মাস ১' : 'Month 1',
      title: isBn ? 'পাইথন, ম্যাথ ও ক্লাসিক্যাল মেশিন লার্নিং' : 'Python, Math & Classical Machine Learning',
      desc: isBn
        ? 'আধুনিক পাইথন OOP, ভেক্টরাইজড NumPy, লিনিয়ার অ্যালজেব্রা, প্রোবাবিলিটি এবং সাইকিট-লার্ন।'
        : 'Modern Python OOP, vectorized NumPy, Linear Algebra, Probability, and Scikit-Learn pipelines.'
    },
    {
      month: isBn ? 'মাস ২' : 'Month 2',
      title: isBn ? 'ডিপ লার্নিং ও ট্রান্সফরমার্স আর্কিটেকচার' : 'Deep Learning & Transformer Architectures',
      desc: isBn
        ? 'PyTorch টেনসর অপারেশনস, ব্যাকপ্রোপাগেশন, সেলফ-অ্যাটেনশন মেকানিজম এবং Hugging Face ইকোসিস্টেম।'
        : 'PyTorch tensors, autograd, backpropagation, Multi-Head Attention, and Hugging Face models.'
    },
    {
      month: isBn ? 'মাস ৩' : 'Month 3',
      title: isBn ? 'প্রম্পট ইঞ্জিনিয়ারিং ও এন্টারপ্রাইজ র‍্যাগ (RAG)' : 'Prompt Engineering & Enterprise RAG Systems',
      desc: isBn
        ? 'CoT, ReAct, ভেক্টর ডেটাবেস (Chroma, Qdrant), হাইব্রিড রিট্রিভাল এবং অ্যাডভান্সড চ্যঙ্কিং কৌশল।'
        : 'Chain-of-Thought, ReAct, Vector DBs (Chroma, Qdrant), Hybrid retrieval, and Context Compression.'
    },
    {
      month: isBn ? 'মাস ৪' : 'Month 4',
      title: isBn ? 'ফাইন-টিউনিং ও অটোনোমাস মাল্টি-এজেন্ট' : 'Fine-Tuning & Autonomous Multi-Agents',
      desc: isBn
        ? 'PEFT, LoRA/QLoRA টেকনিক, ল্যাংগ্রাফ (LangGraph) স্টেট মেশিন এবং টুল কলিং এজেন্ট ফ্লো।'
        : 'PEFT, LoRA/QLoRA adapters, LangGraph stateful loops, human-in-the-loop, and tool-augmented agents.'
    },
    {
      month: isBn ? 'মাস ৫' : 'Month 5',
      title: isBn ? 'এলএলএমঅপস, কনটেইনার ও ক্লাউড সার্ভিং' : 'LLMOps, Containers & Production Serving',
      desc: isBn
        ? 'FastAPI মাইক্রোসার্ভিস, ডকারাইজেশন, vLLM অপটিমাইজেশন, Langfuse ট্র্যাকিং এবং কন্টিনিউয়াস ইভ্যালুয়েশন।'
        : 'FastAPI microservices, Dockerization, vLLM high-throughput inference, Langfuse tracing, and CI/CD.'
    },
    {
      month: isBn ? 'মাস ৬' : 'Month 6',
      title: isBn ? 'এআই সেফটি, ক্যাপস্টোন প্রজেক্ট ও ক্যারিয়ার' : 'AI Safety, Capstones & Career Portfolio',
      desc: isBn
        ? 'গার্ডরেইল (Guardrails AI), প্রম্পট ইনজেকশন ডিফেন্স, পূর্ণাঙ্গ প্রোডাকশন ক্যাপস্টোন এবং পোর্টফোলিও।'
        : 'NeMo Guardrails, red-teaming, prompt injection mitigation, final capstones, and portfolio preparation.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background Glow Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[20%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute top-[40%] right-[-10%] w-[550px] h-[550px] rounded-full bg-cyan-600/10 blur-[140px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px]" />
      </div>

      {/* Global Landing Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-inner">
              <Sparkles size={15} className="text-purple-400 animate-pulse" />
              <span>
                {isBn
                  ? '🔥 বিশেষ অফার: সম্পূর্ণ এআই ইঞ্জিনিয়ারিং কোর্স ফি মাত্র ৫০০ টাকা (500 BDT)'
                  : '🔥 Special Offer: Complete AI Engineering Course only 500 BDT!'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {isBn ? (
                <>
                  হয়ে উঠুন একজন{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    ফুল-স্ট্যাক এআই
                  </span>{' '}
                  ইঞ্জিনিয়ার
                </>
              ) : (
                <>
                  Become a{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Full-Stack AI
                  </span>{' '}
                  Engineer
                </>
              )}
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isBn
                ? 'পাইথন ও ডিপ লার্নিং ফাউন্ডেশন থেকে শুরু করে অ্যাডভান্সড ট্রান্সফরমার্স, এন্টারপ্রাইজ র‍্যাগ (RAG), অটোনোমাস মাল্টি-এজেন্ট এবং প্রোডাকশন LLMOps—সবকিছু শিখুন মাত্র ৫০০ টাকায় (500 BDT) লাইফটাইম অ্যাক্সেসে।'
                : 'From Python and PyTorch math to Enterprise RAG, Autonomous Multi-Agents, LoRA Fine-Tuning, and Production LLMOps. Master it all for only 500 BDT with lifetime access.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setIsEnrollModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-900/40 hover:shadow-purple-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles size={18} />
                <span>{isBn ? 'ভর্তি হন - মাত্র ৳৫০০' : 'Enroll Now - 500 BDT'}</span>
                <ArrowRight size={16} />
              </button>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 border border-gray-700/80 text-gray-200 font-semibold text-sm sm:text-base transition-all hover:border-purple-500/40"
              >
                <LayoutDashboard size={18} className="text-purple-400" />
                <span>{isBn ? 'ক্লাসরুম ড্যাশবোর্ড' : 'LMS Dashboard'}</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-green-400" />
                {isBn ? '💰 কোর্স ফি: মাত্র ৫০০ টাকা' : '💰 Course Fee: Only 500 BDT'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-green-400" />
                {isBn ? '⚡ লাইফটাইম অ্যাক্সেস' : '⚡ Lifetime Access'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-green-400" />
                {isBn ? '🏆 ১০টি পূর্ণাঙ্গ মডিউল' : '🏆 10 Full Modules'}
              </span>
            </div>
          </div>

          {/* Hero Right Code Window */}
          <div className="lg:col-span-5 w-full">
            <CodeWindow />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 border-y border-gray-800/80 bg-gray-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                10
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">
                {isBn ? 'পূর্ণাঙ্গ মডিউল' : 'Mastery Modules'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                40+
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">
                {isBn ? 'প্র্যাকটিকাল লেসন' : 'In-Depth Lessons'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
                10+
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">
                {isBn ? 'বাস্তব প্রজেক্টস' : 'Production Capstones'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                ৳500
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">
                {isBn ? 'কোর্স ফি (মাত্র)' : 'Course Fee (Only)'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Modules Curriculum Section */}
      <section id="modules" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-600/30 text-purple-300 text-xs font-semibold">
            <Layers size={14} />
            <span>{isBn ? 'সম্পূর্ণ সিলেবাস' : 'Complete Curriculum'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? '১০টি প্র্যাকটিকাল লার্নিং মডিউল' : '10 Comprehensive Learning Modules'}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {isBn
              ? 'জিরো থেকে হিরো: প্রতিটি মডিউলে রয়েছে ইন্ডাস্ট্রি-রেডি থিওরি, প্রোডাকশন কোড, আর্কিটেকচার ডায়াগ্রাম এবং এক্সারসাইজ।'
              : 'Each module is engineered with production-ready code, architectural breakdowns, hands-on tasks, and real-world tools.'}
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, index) => {
            const title = isBn && mod.titleBn ? mod.titleBn : mod.title;
            const desc = isBn && mod.descriptionBn ? mod.descriptionBn : mod.description;
            const diff = isBn && mod.difficultyBn ? mod.difficultyBn : mod.difficulty;

            return (
              <div
                key={mod.slug}
                className="group relative flex flex-col justify-between rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-purple-500/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/30 hover:-translate-y-1"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-xl bg-gray-800/80 border border-gray-700/50">
                        {mod.icon}
                      </span>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                          Module {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="text-xs text-gray-400 font-medium">
                          {mod.lessons.length} {isBn ? 'টি লেসন' : 'lessons'}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                        mod.difficulty === 'Beginner'
                          ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : mod.difficulty === 'Intermediate'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}
                    >
                      {diff}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedModule(mod)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    {isBn ? 'কুইক ভিউ' : 'Quick Preview'}
                  </button>

                  <Link
                    href={`/modules/${mod.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-purple-300 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/40 hover:border-purple-600 transition-colors"
                  >
                    <span>{isBn ? 'শুরু করুন' : 'Start Module'}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Features Section */}
      <section id="features" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800/60">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-600/30 text-cyan-300 text-xs font-semibold">
            <Zap size={14} />
            <span>{isBn ? 'মূল বৈশিষ্ঠ্য' : 'Why This Course'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? 'ইন্ডাস্ট্রি-গ্রেড ফিচারস যা আপনাকে এগিয়ে রাখবে' : 'Engineered for Industry Impact'}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {isBn
              ? 'সাধারণ টিউটোরিয়াল নয়, এটি সরাসরি প্রোডাকশন সফটওয়্যার আর্কিটেকচার শেখার প্ল্যাটফর্ম।'
              : 'Built by engineers for future engineers with no superficial fluff.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-700/40 flex items-center justify-center text-purple-400">
              <Code2 size={24} />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn ? 'প্রোডাকশন-গ্রেড কোড' : 'Production-Ready Code'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {isBn
                ? 'রিয়েল ভেক্টর ডেটাবেস, FastAPI মাইক্রোসার্ভিস, ডকার কনটেইনার এবং টাইপ-সেফ পাইথন আর্কিটেকচার।'
                : 'Clean typed codebases using FastAPI, Docker, Pydantic, ChromaDB, and LangGraph.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-700/40 flex items-center justify-center text-cyan-400">
              <Bot size={24} />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn ? 'অটোনোমাস এজেন্টস ও র‍্যাগ' : 'Agents & Enterprise RAG'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {isBn
                ? 'স্টেটফুল মাল্টি-এজেন্ট কোলাবরেশন, রি-র‍্যাংকিং, হাইব্রিড সার্চ এবং সেলফ-রিফ্লেক্টিভ এজেন্ট ফ্লো।'
                : 'Stateful multi-agent workflows, HyDE retrieval, ColBERT reranking, and autonomous tooling.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-pink-500/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-pink-950/60 border border-pink-700/40 flex items-center justify-center text-pink-400">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn ? 'সম্পূর্ণ দ্বৈত ভাষা (বাংলা)' : '100% Dual-Language'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {isBn
                ? 'জটিল ম্যাথমেটিক্স এবং নিউরাল নেটওয়ার্ক কনসেপ্ট মাতৃভাষা বাংলায় সহজে বোধগম্যভাবে উপস্থাপন।'
                : 'Switch seamlessly between English and Bangla at any moment with localized diagrams and guides.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-green-950/60 border border-green-700/40 flex items-center justify-center text-green-400">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-base font-bold text-white">
              {isBn ? 'ইন-ব্রাউজার এলএমএস ও ট্র্যাকিং' : 'In-Browser LMS & Storage'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {isBn
                ? 'পড়ার অগ্রগতি সংরক্ষণ, স্ট্রিক কাউন্টার, কোড কপি বাটন এবং বুকমার্কের সুবিধা সম্পূর্ণ ব্রাউজারে।'
                : 'Built-in progress tracking, lesson completion markers, persistent local storage, and streak metrics.'}
            </p>
          </div>
        </div>
      </section>

      {/* Capstone Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800/60">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-600/30 text-purple-300 text-xs font-semibold">
            <FolderGit2 size={14} />
            <span>{isBn ? 'পোর্টফোলিও প্রজেক্ট' : 'Capstone Projects'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? 'বাস্তব এন্টারপ্রাইজ ক্যাপস্টোন সিস্টেম' : 'Real-World Enterprise Capstones'}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {isBn
              ? 'পোর্টফোলিওতে যোগ করার উপযোগী ৪টি বড় প্রজেক্ট যা চাকরির ইন্টারভিউতে আপনাকে অন্যদের চেয়ে এগিয়ে রাখবে।'
              : 'Comprehensive projects designed for top-tier GitHub portfolios and technical job interviews.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 border border-gray-800 hover:border-purple-500/40 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-purple-950/50 text-purple-300 border border-purple-800/30">
                  {proj.badge}
                </span>
                <span className="text-xs text-gray-500 font-mono">0{i + 1} / 04</span>
              </div>

              <h3 className="text-lg font-bold text-white">
                {isBn ? proj.titleBn : proj.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {isBn ? proj.descBn : proj.descEn}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {proj.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Month Structured Roadmap */}
      <section id="roadmap" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800/60">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-600/30 text-cyan-300 text-xs font-semibold">
            <Cpu size={14} />
            <span>{isBn ? 'সঠিক গাইডলাইন' : 'Step-by-Step Pathway'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? '৬ মাসের পূর্ণাঙ্গ স্টাডি রোডম্যাপ' : '6-Month Structured Learning Roadmap'}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {isBn
              ? 'সপ্তাহভিত্তিক সুনির্দিষ্ট প্ল্যানিং—কোন মাসের পর কী শিখবেন তার স্পষ্ট রূপরেখা।'
              : 'A curated pathway guiding you from fundamental algorithms to senior AI engineering capability.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-cyan-500/40 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                  {step.month}
                </span>
                <span className="text-xs text-gray-500 font-mono">Phase 0{idx + 1}</span>
              </div>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800/60 text-center">
        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-8">
          {isBn ? 'যেসব অত্যাধুনিক প্রযুক্তি আপনি আয়ত্ত করবেন' : 'Technologies & Frameworks You Will Master'}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            'Python 3.12',
            'PyTorch',
            'Hugging Face',
            'LangChain',
            'LangGraph',
            'LlamaIndex',
            'ChromaDB',
            'Qdrant',
            'FastAPI',
            'Docker',
            'vLLM',
            'Ollama',
            'LoRA / QLoRA',
            'Langfuse',
            'Weights & Biases',
            'Next.js 14'
          ].map((item, i) => (
            <span
              key={i}
              className="px-3.5 py-1.5 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-purple-500/40 text-xs sm:text-sm text-gray-300 font-mono transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Course Fee & Enrollment Section */}
      <section id="pricing" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-gray-800/60">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-green-950/60 border border-green-500/40 text-green-300 text-xs font-semibold">
            <Sparkles size={14} />
            <span>{isBn ? 'সীমিত সময়ের বিশেষ অফার' : 'Limited Time Special Offer'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? 'কোর্স ফি ও ভর্তি প্রক্রিয়া' : 'Course Fee & Enrollment'}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {isBn
              ? 'মাত্র ৫০০ টাকা (500 BDT) এককালীন ফিতে পান ১০টি পূর্ণাঙ্গ মাস্টারক্লাস মডিউল ও লাইফটাইম অ্যাক্সেস।'
              : 'One-time investment of 500 BDT for complete lifetime access to all 10 modules & projects.'}
          </p>
        </div>

        {/* Pricing Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-gray-900/90 to-gray-950/90 border-2 border-purple-500/40 p-8 sm:p-10 shadow-2xl shadow-purple-950/40 overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-emerald-600 text-black font-extrabold text-[11px] sm:text-xs px-4 py-1 rounded-bl-xl tracking-wider uppercase shadow-md">
            {isBn ? '৯০% ছাড় • মাত্র ৫০০ টাকা' : '90% OFF • 500 BDT ONLY'}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Price & CTA */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
                  {isBn ? 'ফুল-স্ট্যাক এআই ইঞ্জিনিয়ারিং প্রোগ্রাম' : 'Full-Stack AI Engineering Program'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {isBn ? '১০টি পূর্ণাঙ্গ মডিউল + লাইফটাইম' : 'Complete 10-Module Access'}
                </h3>
              </div>

              <div className="flex items-baseline justify-center lg:justify-start gap-3">
                <span className="text-4xl sm:text-6xl font-black text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-300 bg-clip-text">
                  ৳৫০০
                </span>
                <span className="text-lg font-bold text-gray-300 font-mono">BDT</span>
                <span className="text-base text-gray-500 line-through font-mono">৳৫,০০০ BDT</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {isBn
                  ? 'কোনো মাসিক সাবস্ক্রিপশন নেই। একবার মাত্র ৫০০ টাকা প্রদান করে আজীবনের জন্য ক্লাসরুম, আপডেট এবং সোর্স কোড আনলক করুন।'
                  : 'Zero recurring subscriptions. Pay once, learn forever with instant access to the LMS classroom and all future updates.'}
              </p>

              <div className="pt-2 space-y-3">
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-purple-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <CreditCard size={18} />
                  <span>{isBn ? 'এখনই ৫০০ টাকায় ভর্তি হন' : 'Enroll Now for 500 BDT'}</span>
                  <ArrowRight size={16} />
                </button>

                <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-gray-400">
                  <span>{isBn ? 'পেমেন্ট মাধ্যম:' : 'Supported Payments:'}</span>
                  <span className="px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-800/40 font-semibold">bKash</span>
                  <span className="px-2 py-0.5 rounded bg-orange-950/60 text-orange-300 border border-orange-800/40 font-semibold">Nagad</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40 font-semibold">Rocket</span>
                </div>
              </div>
            </div>

            {/* Right Col: Features Checklist */}
            <div className="lg:col-span-6 bg-gray-950/60 rounded-2xl border border-gray-800/80 p-6 space-y-3.5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                {isBn ? 'এই ৫০০ টাকায় আপনি যা যা পাবেন:' : 'Everything Included for 500 BDT:'}
              </h4>
              {[
                isBn ? '১০টি পূর্ণাঙ্গ মডিউল (পাইথন থেকে প্রোডাকশন LLMOps)' : '10 Full Mastery Modules (Python to LLMOps)',
                isBn ? '৪০+ হ্যান্ডস-অন কোডিং লেসন ও আর্কিটেকচার ডায়াগ্রাম' : '40+ Hands-on Coding Lessons & Architecture Breakdowns',
                isBn ? '১০+ ইন্ডাস্ট্রি ক্যাপস্টোন প্রজেক্টের গিটহাব সোর্স কোড' : '10+ Production Capstone GitHub Repositories',
                isBn ? '১০০% দ্বৈত ভাষা সাপোর্ট (বাংলা ও ইংরেজি)' : '100% Dual-Language (Bangla & English) Interface',
                isBn ? 'ইন-ব্রাউজার ইন্টারঅ্যাক্টিভ ক্লাসরুম ও অগ্রগতি সংরক্ষণ' : 'In-Browser Interactive LMS & Progress Tracker',
                isBn ? 'লাইফটাইম অ্যাক্সেস ও ভবিষ্যতের সব নতুন মডিউল আপডেট' : 'Lifetime Access with all Future Module Updates',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-800/60">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isBn ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            {isBn ? 'কোর্স ও প্ল্যাটফর্ম সম্পর্কিত সাধারণ প্রশ্ন ও উত্তর।' : 'Everything you need to know about the platform and learning path.'}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-xl bg-gray-900/60 border border-gray-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-gray-800/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {isBn ? faq.qBn : faq.qEn}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 border-t border-gray-800/40 leading-relaxed bg-gray-950/40">
                    {isBn ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/60 via-gray-900 to-cyan-900/50 border border-purple-800/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? 'আজই শুরু করুন আপনার এআই জার্নি' : 'Start Your AI Engineering Journey Today'}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            {isBn
              ? 'কোনো ক্রেডিট কার্ডের প্রয়োজন নেই। এখনই ক্লাসরুমে প্রবেশ করুন এবং প্রথম মডিউলে হাত দিন।'
              : 'Zero registration barrier, no paywalls. Enter the LMS classroom and build your first AI pipeline.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-950/50 transition-all hover:scale-105"
            >
              <LayoutDashboard size={18} />
              <span>{isBn ? 'এলএমএস ড্যাশবোর্ড খুলুন' : 'Open LMS Dashboard'}</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/modules/python-foundation/basics"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-semibold text-sm sm:text-base transition-colors"
            >
              <span>{isBn ? 'লেসন ১ সরাসরি দেখুন' : 'Go Direct to Lesson 1'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/80 bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Puthi Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-lg border border-purple-500/30"
            />
            <div>
              <span className="text-white font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent flex items-center gap-1.5">
                Puthi
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/60 border border-purple-700/40 text-purple-300 font-mono">
                  {isBn ? 'পুঁথি' : 'Global'}
                </span>
              </span>
              <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">
                CODE • LEARN • BUILD • GLOBAL
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              {isBn ? 'হোম' : 'Home'}
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              {isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}
            </Link>
            <a href="#modules" className="hover:text-white transition-colors">
              {isBn ? 'মডিউলসমূহ' : 'Modules'}
            </a>
            <a href="#roadmap" className="hover:text-white transition-colors">
              {isBn ? 'রোডম্যাপ' : 'Roadmap'}
            </a>
            <Link href="/resources" className="hover:text-white transition-colors">
              {isBn ? 'রিসোর্স' : 'Resources'}
            </Link>
          </div>

          <div className="text-xs text-gray-500 font-mono">
            © {new Date().getFullYear()} Puthi Tech (puthitech.com) • All Rights Reserved
          </div>
        </div>
      </footer>

      {/* Quick Learn Slide-over / Modal */}
      <QuickLearnModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />

      {/* 500 BDT Enrollment & Payment Modal */}
      <EnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </div>
  );
}
