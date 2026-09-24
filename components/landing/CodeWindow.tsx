'use client';

import React, { useState, useEffect } from 'react';

const CODE_LINES = [
  '# Autonomous Research Agent Workflow',
  'from langchain_openai import ChatOpenAI',
  'from langgraph.graph import StateGraph, END',
  '',
  'llm = ChatOpenAI(model="gpt-4o", temperature=0.2)',
  'tools = [search_web, query_vector_db, python_repl]',
  '',
  '# Initialize Reasoning Loop',
  'agent = create_react_agent(llm, tools=tools)',
  'response = agent.invoke({',
  '    "input": "Analyze transformers vs state-space models"',
  '})',
  '',
  'print(f"[Done] Tokens: {response.total_tokens}")',
  'print(response.output.summary)',
];

export default function CodeWindow() {
  const [displayedText, setDisplayedText] = useState('');
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let textBuffer = '';
    let interval: NodeJS.Timeout;

    const typeNext = () => {
      if (currentLine >= CODE_LINES.length) {
        // Pause and reset
        setTimeout(() => {
          currentLine = 0;
          currentChar = 0;
          textBuffer = '';
          setDisplayedText('');
        }, 4000);
        return;
      }

      const line = CODE_LINES[currentLine];
      if (currentChar <= line.length) {
        const partial = line.slice(0, currentChar);
        setDisplayedText(textBuffer + partial);
        currentChar++;
      } else {
        textBuffer += line + '\n';
        currentLine++;
        currentChar = 0;
      }
    };

    interval = setInterval(typeNext, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group w-full max-w-xl mx-auto">
      {/* Glow backgrounds */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse-glow" />

      {/* Code Window Box */}
      <div className="relative rounded-2xl border border-gray-800 bg-gray-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-gray-800/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-gray-400 font-medium">ai_agent.py</span>
          <span className="text-[10px] text-purple-400 font-semibold px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-800/40">
            Python 3.11
          </span>
        </div>

        {/* Code Content */}
        <div className="p-5 text-xs sm:text-sm text-gray-300 leading-relaxed overflow-x-auto min-h-[300px]">
          <pre className="!bg-transparent !border-0 !p-0 font-mono">
            <code>
              {displayedText}
              <span className="cursor-blink" />
            </code>
          </pre>
        </div>
      </div>

      {/* Floating live status badges */}
      <div className="absolute -bottom-4 -left-4 bg-gray-900/90 border border-green-500/30 rounded-xl px-3.5 py-2 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs text-green-300">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
        <span className="font-semibold font-mono">Model deployed — 3ms latency</span>
      </div>

      <div className="absolute -top-3 -right-3 bg-gray-900/90 border border-cyan-500/30 rounded-xl px-3.5 py-2 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs text-cyan-300">
        <span>⚡</span>
        <span className="font-semibold font-mono">LLM streaming active</span>
      </div>
    </div>
  );
}
