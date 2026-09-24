'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ children, language = 'text', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = children;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-gray-800 bg-gray-950">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          {filename && (
            <span className="ml-2 text-xs text-gray-400 font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all duration-200 ${
              copied
                ? 'bg-green-900/50 text-green-400 border border-green-700/50'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'
            }`}
          >
            {copied ? (
              <>
                <Check size={11} /> Copied!
              </>
            ) : (
              <>
                <Copy size={11} /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed text-gray-300 font-mono border-0 rounded-none bg-transparent m-0">
        <code>{children}</code>
      </pre>
    </div>
  );
}
