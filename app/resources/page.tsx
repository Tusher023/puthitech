import { modules } from '@/lib/modules';
import { ExternalLink, BookOpen, Sparkles, Terminal, Code2 } from 'lucide-react';

const extraResources = [
  {
    category: 'Essential Documentation & Frameworks',
    items: [
      { title: 'OpenAI API Reference', url: 'https://platform.openai.com/docs/api-reference', free: true },
      { title: 'LangChain Documentation', url: 'https://python.langchain.com/', free: true },
      { title: 'LlamaIndex Documentation', url: 'https://docs.llamaindex.ai/', free: true },
      { title: 'CrewAI Documentation', url: 'https://docs.crewai.com/', free: true },
      { title: 'Hugging Face Hub & Transformers', url: 'https://huggingface.co/docs/transformers', free: true },
      { title: 'ChromaDB Docs', url: 'https://docs.trychroma.com/', free: true },
    ],
  },
  {
    category: 'Research Papers & Theory',
    items: [
      { title: 'Attention Is All You Need (Transformer Foundation)', url: 'https://arxiv.org/abs/1706.03762', free: true },
      { title: 'ReAct: Synergizing Reasoning and Acting in Language Models', url: 'https://arxiv.org/abs/2210.03629', free: true },
      { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP', url: 'https://arxiv.org/abs/2005.11401', free: true },
      { title: 'LoRA: Low-Rank Adaptation of Large Language Models', url: 'https://arxiv.org/abs/2106.09685', free: true },
    ],
  },
  {
    category: 'Communities & Learning Channels',
    items: [
      { title: 'Andrej Karpathy YouTube Channel', url: 'https://www.youtube.com/@AndrejKarpathy', free: true },
      { title: 'Yannic Kilcher ML Papers Breakdown', url: 'https://www.youtube.com/@YannicKilcher', free: true },
      { title: 'LangChain Official Discord', url: 'https://discord.gg/langchain', free: true },
      { title: 'Hugging Face Community Forums', url: 'https://discuss.huggingface.co/', free: true },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Curated AI Resources</h1>
        <p className="text-gray-400 text-sm mt-1">
          High-yield documentation, influential research papers, and technical communities to accelerate your learning.
        </p>
      </div>

      <div className="space-y-8">
        {extraResources.map((section) => (
          <div key={section.category} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              {section.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-gray-950 border border-gray-800 hover:border-purple-600/40 transition-all text-xs text-gray-200 group"
                >
                  <span className="font-medium group-hover:text-purple-300">{item.title}</span>
                  <div className="flex items-center gap-1.5 text-gray-500 flex-shrink-0">
                    <span className="px-1.5 py-0.5 rounded bg-green-950/60 text-green-400 text-[10px]">
                      FREE
                    </span>
                    <ExternalLink size={12} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
