export type LessonType = 'Theory' | 'Code' | 'Exercise' | 'Project' | 'Quiz';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  slug: string;
  title: string;
  titleBn?: string;
  type: LessonType;
  duration: string;
  description?: string;
  descriptionBn?: string;
}

export interface Module {
  slug: string;
  title: string;
  titleBn?: string;
  icon: string;
  difficulty: Difficulty;
  difficultyBn?: string;
  description: string;
  descriptionBn?: string;
  prerequisites?: string[];
  resources?: { title: string; url: string; free: boolean }[];
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    slug: 'python-foundation',
    title: 'Python Foundation',
    titleBn: 'পাইথন ফাউন্ডেশন',
    icon: '🐍',
    difficulty: 'Beginner',
    difficultyBn: 'বিগিনার',
    description:
      'Master modern Python programming tailored specifically for AI engineering: memory-efficient data structures, OOP encapsulation, decorators, custom exceptions, and CLI automation.',
    descriptionBn:
      'এআই ইঞ্জিনিয়ারিংয়ের জন্য আধুনিক পাইথন প্রোগ্রামিং আয়ত্ত করুন: মেমরি-দক্ষ ডেটা স্ট্রাকচার, ওওপি এনক্যাপসুলেশন, ডেকোরেটরস, কাস্টম এক্সেপশন ও স্বয়ংক্রিয় সিএলআই স্ক্রিপ্টিং।',
    prerequisites: [],
    resources: [
      { title: 'Python Official Docs', url: 'https://docs.python.org/3/', free: true },
      { title: 'Real Python', url: 'https://realpython.com', free: true },
      { title: 'Python Crash Course', url: 'https://nostarch.com/pythoncrashcourse3', free: false },
    ],
    lessons: [
      { slug: 'basics', title: 'Python Basics & Syntax', titleBn: 'পাইথন বেসিকস ও সিনট্যাক্স', type: 'Code', duration: '45 min', description: 'Variables, types, operators, and control flow', descriptionBn: 'ভেরিয়েবল, ডেটা টাইপ, অপারেটর ও কন্ট্রোল ফ্লো' },
      { slug: 'data-structures', title: 'Data Structures & Comprehensions', titleBn: 'ডেটা স্ট্রাকচার ও কমপ্রিহেনশন', type: 'Code', duration: '60 min', description: 'Lists, dicts, sets, tuples and memory efficiency', descriptionBn: 'লিস্ট, ডিকশনারি, সেট ও মেমরি অপ্টিমাইজেশন' },
      { slug: 'functions', title: 'Functions, *args & Decorators', titleBn: 'ফাংশনস, *args ও ডেকোরেটরস', type: 'Code', duration: '45 min', description: 'Higher-order functions, closures, and timing decorators', descriptionBn: 'হায়ার-অর্ডার ফাংশনস, ক্লোজার ও ডেকোরেটরস' },
      { slug: 'file-io', title: 'File I/O, JSON & CSV', titleBn: 'ফাইল আই/ও, JSON ও CSV', type: 'Code', duration: '35 min', description: 'Safe context managers, JSON serialization, and data reading', descriptionBn: 'কনটেক্সট ম্যানেজার, JSON সিরিয়ালাইজেশন ও রিডিং' },
      { slug: 'oop', title: 'Object-Oriented Programming', titleBn: 'অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং (OOP)', type: 'Code', duration: '60 min', description: 'Classes, inheritance, encapsulation, and dataclasses', descriptionBn: 'ক্লাসেস, ইনহেরিটেন্স, এনক্যাপসুলেশন ও ডেটাক্লাস' },
      { slug: 'error-handling', title: 'Error Handling & Validation', titleBn: 'এরর হ্যান্ডলিং ও ভ্যালিডেশন', type: 'Code', duration: '40 min', description: 'Custom exception hierarchies and defensive programming', descriptionBn: 'কাস্টম এক্সেপশন ও ডিফেন্সিভ ভ্যালিডেশন' },
      { slug: 'virtual-envs', title: 'Virtual Environments & Pip', titleBn: 'ভার্চুয়াল এনভায়রনমেন্ট ও Pip', type: 'Theory', duration: '30 min', description: 'venv, requirements.txt, pyproject.toml and isolation', descriptionBn: 'venv, requirements.txt ও প্যাকেজ আইসোলেশন' },
      { slug: 'project-organizer', title: 'Project: CLI File Organizer', titleBn: 'প্রজেক্ট: সিএলআই ফাইল অর্গানাইজার', type: 'Project', duration: '90 min', description: 'Build an automated CLI file organizer tool', descriptionBn: 'স্বয়ংক্রিয় CLI ফাইল অর্গানাইজার টুল তৈরি করুন' },
    ],
  },
  {
    slug: 'machine-learning-basics',
    title: 'Machine Learning Basics',
    titleBn: 'মেশিন লার্নিং বেসিকস',
    icon: '🧠',
    difficulty: 'Beginner',
    difficultyBn: 'বিগিনার',
    description:
      'Build core intuition for classical machine learning. Master NumPy vectorization, Pandas tabular data pipelines, Scikit-Learn estimators, and model evaluation metrics.',
    descriptionBn:
      'ক্লাসিক্যাল মেশিন লার্নিংয়ের ফান্ডামেন্টাল জ্ঞান অর্জন করুন। NumPy ভেক্টরাইজেশন, Pandas টেবুলার ডেটা প্রসেসিং, Scikit-Learn পাইপলাইন ও মডেল ইভালুয়েশন মেট্রিক্স আয়ত্ত করুন।',
    prerequisites: ['python-foundation'],
    resources: [
      { title: 'Scikit-Learn Documentation', url: 'https://scikit-learn.org/stable/', free: true },
      { title: 'NumPy Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html', free: true },
      { title: 'Pandas User Guide', url: 'https://pandas.pydata.org/docs/user_guide/', free: true },
    ],
    lessons: [
      { slug: 'math-stats', title: 'Math & Stats for AI', titleBn: 'গণিত ও পরিসংখ্যান', type: 'Theory', duration: '50 min', description: 'Vectors, matrices, dot products, mean, variance, normal distribution', descriptionBn: 'ভেক্টর, ডট প্রোডাক্ট, ভ্যারিয়েন্স ও নরমাল ডিস্ট্রিবিউশন' },
      { slug: 'numpy-arrays', title: 'NumPy Arrays & Vectorization', titleBn: 'NumPy টেনসর ও ভেক্টরাইজেশন', type: 'Code', duration: '50 min', description: 'N-dimensional slicing, broadcasting, and matrix math', descriptionBn: 'এন-ডাইমেনশনাল স্লাইসিং, ব্রডকাস্টিং ও ম্যাট্রিক্স ম্যাথ' },
      { slug: 'pandas-wrangling', title: 'Pandas Data Wrangling', titleBn: 'Pandas ডেটা প্রসেসিং', type: 'Code', duration: '60 min', description: 'DataFrames, cleaning, aggregations, and missing values', descriptionBn: 'ডেটাফ্রেম ক্লিনিং, গ্রুপিং ও মিসিং ভ্যালু পূরণ' },
      { slug: 'sklearn-pipelines', title: 'Scikit-Learn Pipelines', titleBn: 'Scikit-Learn পাইপলাইনস', type: 'Code', duration: '60 min', description: 'Transformers, standard scalers, and data leakage prevention', descriptionBn: 'ট্রান্সফরমার্স, স্কেলার্স ও ডেটা লিকেজ রোধ' },
      { slug: 'supervised-learning', title: 'Supervised Learning Algorithms', titleBn: 'সুপারভাইজড লার্নিং অ্যালগরিদম', type: 'Code', duration: '60 min', description: 'Linear regression, logistic classification, and decision trees', descriptionBn: 'লিনিয়ার রিগ্রেশন, লজিস্টিক ক্লাসিফিকেশন ও ডিসিশন ট্রি' },
      { slug: 'model-evaluation', title: 'Model Evaluation & Metrics', titleBn: 'মডেল মূল্যায়ন ও মেট্রিক্স', type: 'Code', duration: '45 min', description: 'Confusion matrix, precision, recall, F1-score, and ROC-AUC', descriptionBn: 'কনফিউশন ম্যাট্রিক্স, Precision, Recall ও ROC-AUC' },
      { slug: 'unsupervised-clustering', title: 'Unsupervised Learning & Clustering', titleBn: 'আনসুপারভাইজড ক্লাস্টারিং', type: 'Code', duration: '45 min', description: 'K-Means clustering, PCA dimensionality reduction', descriptionBn: 'K-Means ক্লাস্টারিং ও PCA ডাইমেনশনালিটি রিডাকশন' },
      { slug: 'hyperparameter-tuning', title: 'Hyperparameter Optimization', titleBn: 'হাইপারপ্যারামিটার অপ্টিমাইজেশন', type: 'Code', duration: '45 min', description: 'GridSearchCV, RandomizedSearchCV, cross-validation', descriptionBn: 'GridSearchCV ও ক্রস-ভ্যালিডেশন' },
      { slug: 'project-classifier', title: 'Project: Production ML Classifier', titleBn: 'প্রজেক্ট: প্রোডাকশন ML ক্লাসিফায়ার', type: 'Project', duration: '120 min', description: 'Build an end-to-end customer churn classification pipeline', descriptionBn: 'কাস্টমার চার্ন ক্লাসিফিকেশন পাইপলাইন তৈরি' },
    ],
  },
  {
    slug: 'llm-fundamentals',
    title: 'LLM Fundamentals',
    titleBn: 'এলএলএম ফান্ডামেন্টালস',
    icon: '🤖',
    difficulty: 'Intermediate',
    difficultyBn: 'ইন্টারমিডিয়েট',
    description:
      'Understand how Large Language Models work under the hood. Learn transformer attention mechanisms, tokenization algorithms, OpenAI SDK integration, and local HuggingFace inference.',
    descriptionBn:
      'লার্জ ল্যাঙ্গুয়েজ মডেল কীভাবে কাজ করে তা গভীরে বুঝুন। ট্রান্সফরমার সেলফ-অ্যাটেনশন মেকানিজম, টোকেনাইজেশন অ্যালগরিদম, OpenAI SDK ও লোকাল HuggingFace মডেল রান করা শিখুন।',
    prerequisites: ['machine-learning-basics'],
    resources: [
      { title: 'Attention Is All You Need (Paper)', url: 'https://arxiv.org/abs/1706.03762', free: true },
      { title: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', free: true },
      { title: 'Andrej Karpathy Neural Nets Zero to Hero', url: 'https://karpathy.ai/zero-to-hero.html', free: true },
    ],
    lessons: [
      { slug: 'transformers-overview', title: 'Transformer Architecture & Attention', titleBn: 'ট্রান্সফরমার আর্কিটেকচার ও অ্যাটেনশন', type: 'Theory', duration: '50 min', description: 'Self-attention, multi-head attention, encoders, and decoders', descriptionBn: 'সেলফ-অ্যাটেনশন, মাল্টি-হেড অ্যাটেনশন ও এনকোডার-ডিকোডার' },
      { slug: 'tokenization', title: 'Tokenization Deep Dive', titleBn: 'টোকেনাইজেশন বিশ্লেষণ', type: 'Code', duration: '45 min', description: 'Byte-Pair Encoding (BPE), WordPiece, tiktoken hands-on', descriptionBn: 'Byte-Pair Encoding (BPE) ও tiktoken হ্যান্ডস-অন' },
      { slug: 'openai-api', title: 'OpenAI API & Streaming', titleBn: 'OpenAI API ও রিয়েল-টাইম স্ট্রিমিং', type: 'Code', duration: '50 min', description: 'Chat completions, streaming tokens, temperature, top-p', descriptionBn: 'চ্যাট কমপ্লিশন, টোকেন স্ট্রিমিং ও টেম্পারেচার কন্ট্রোল' },
      { slug: 'huggingface-models', title: 'HuggingFace & Open-Source Models', titleBn: 'HuggingFace ও ওপেন-ওয়েট মডেলস', type: 'Code', duration: '60 min', description: 'Local pipeline inference, model hub, quantized models', descriptionBn: 'লোকাল ইনফারেন্স ও কোয়ান্টাইজড ওপেন মডেলস' },
      { slug: 'finetuning-concepts', title: 'Fine-Tuning vs In-Context Learning', titleBn: 'ফাইন-টিউনিং বনাম ইন-কনটেক্সট লার্নিং', type: 'Theory', duration: '40 min', description: 'PEFT, LoRA/QLoRA, RLHF, and cost-benefit trade-offs', descriptionBn: 'LoRA, QLoRA ও মডেল অ্যাডাপ্টেশন' },
      { slug: 'context-windows-costs', title: 'Context Windows & Token Costs', titleBn: 'কনটেক্সট উইন্ডো ও টোকেন খরচ', type: 'Theory', duration: '35 min', description: 'Token budgeting, pricing calculations, context limitations', descriptionBn: 'টোকেন বাজেট ও প্রাইসিং অপ্টিমাইজেশন' },
      { slug: 'project-chatbot', title: 'Project: Interactive AI Chatbot', titleBn: 'প্রজেক্ট: ইন্টারেক্টিভ এআই চ্যাটবট', type: 'Project', duration: '90 min', description: 'Build a multi-turn terminal chatbot with session history', descriptionBn: 'মাল্টি-টার্ন সেশন হিস্ট্রিসহ টার্মিনাল চ্যাটবট' },
    ],
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering',
    titleBn: 'প্রম্পট ইঞ্জিনিয়ারিং',
    icon: '✍️',
    difficulty: 'Intermediate',
    difficultyBn: 'ইন্টারমিডিয়েট',
    description:
      'Master prompt engineering as code. Learn Chain-of-Thought reasoning, few-shot demonstrations, defensive prompt injection mitigation, and structured JSON output with Pydantic.',
    descriptionBn:
      'প্রম্পট ইঞ্জিনিয়ারিং কোডের মতো মাস্টার করুন। Chain-of-Thought রিজনিং, ফিউ-শট ডেমোনস্ট্রেশন, প্রম্পট ইনজেকশন ডিফেন্স এবং Pydantic দিয়ে স্ট্রাকচার্ড JSON আউটপুট নিশ্চিত করুন।',
    prerequisites: ['llm-fundamentals'],
    resources: [
      { title: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', free: true },
      { title: 'Anthropic Prompt Library', url: 'https://docs.anthropic.com/en/prompt-library/library', free: true },
      { title: 'LearnPrompting.org', url: 'https://learnprompting.org/', free: true },
    ],
    lessons: [
      { slug: 'prompt-basics', title: 'Prompt Design Fundamentals', titleBn: 'প্রম্পট ডিজাইন ফান্ডামেন্টালস', type: 'Theory', duration: '35 min', description: 'Role, task, context, constraints, and delimiter formatting', descriptionBn: 'রোল, টাস্ক, কনটেক্সট ও ফরম্যাটিং নিয়মাবলি' },
      { slug: 'few-shot', title: 'Zero-shot & Few-shot Prompting', titleBn: 'জিরো-শট ও ফিউ-শট প্রম্পটিং', type: 'Code', duration: '45 min', description: 'In-context examples and deterministic pattern following', descriptionBn: 'ইন-কনটেক্সট এক্সাম্পলস ও প্যাটার্ন লার্নিং' },
      { slug: 'chain-of-thought', title: 'Chain-of-Thought (CoT) Reasoning', titleBn: 'চেইন-অব-থট (CoT) রিজনিং', type: 'Code', duration: '50 min', description: 'Zero-shot CoT, Few-shot CoT, self-consistency sampling', descriptionBn: 'স্টেপ-বাই-স্টেপ লজিক্যাল রিজনিং ও ভ্যালিডেশন' },
      { slug: 'structured-output', title: 'Structured Output with Pydantic', titleBn: 'Pydantic দিয়ে স্ট্রাকচার্ড JSON আউটপুট', type: 'Code', duration: '55 min', description: 'Strict JSON schema enforcement, Pydantic validation', descriptionBn: 'কড়া JSON স্কিমা প্রয়োগ ও টাইপ ভ্যালিডেশন' },
      { slug: 'prompt-chaining', title: 'Prompt Chaining & Pipelines', titleBn: 'প্রম্পট চেইনিং ও পাইপলাইনস', type: 'Code', duration: '50 min', description: 'Multi-stage prompt decomposition for complex reasoning', descriptionBn: 'মাল্টি-স্টেজ প্রম্পট ডিকম্পোজিশন' },
      { slug: 'prompt-security', title: 'Prompt Injection Defense & Red-Teaming', titleBn: 'প্রম্পট ইনজেকশন ও সিকিউরিটি ডিফেন্স', type: 'Theory', duration: '40 min', description: 'Jailbreak attacks, indirect injection, guardrail boundaries', descriptionBn: 'জেলব্রেক প্রতিরোধ ও সিকিউরিটি গার্ডরেইল' },
      { slug: 'project-prompt-library', title: 'Project: Production Prompt Library', titleBn: 'প্রজেক্ট: প্রোডাকশন প্রম্পট লাইব্রেরি', type: 'Project', duration: '90 min', description: 'Build a reusable parameterized prompt engine', descriptionBn: 'প্যারামিটারাইজড পুনঃব্যবহারযোগ্য প্রম্পট ইঞ্জিন' },
    ],
  },
  {
    slug: 'rag-systems',
    title: 'RAG (Retrieval-Augmented Generation)',
    titleBn: 'র‍্যাগ (RAG) সিস্টেমস',
    icon: '🔍',
    difficulty: 'Intermediate',
    difficultyBn: 'ইন্টারমিডিয়েট',
    description:
      'Build end-to-end knowledge-augmented AI systems. Master document chunking, dense vector embeddings, vector databases (ChromaDB, Pinecone), hybrid search, and hallucination reduction.',
    descriptionBn:
      'এন্টারপ্রাইজ নলেজ-ভিত্তিক এআই সিস্টেম তৈরি করুন। ডকুমেন্ট চাঙ্কিং, ডেন্স ভেক্টর এমবেডিংস, ভেক্টর ডাটাবেজ (ChromaDB), হাইব্রিড সার্চ ও হ্যালুসিনেশন রোধের কৌশল শিখুন।',
    prerequisites: ['prompt-engineering'],
    resources: [
      { title: 'LangChain RAG Tutorial', url: 'https://python.langchain.com/docs/tutorials/rag/', free: true },
      { title: 'Pinecone Learning Center', url: 'https://www.pinecone.io/learn/', free: true },
      { title: 'RAG Survey Paper', url: 'https://arxiv.org/abs/2312.10997', free: true },
    ],
    lessons: [
      { slug: 'rag-architecture', title: 'RAG Architecture Overview', titleBn: 'র‍্যাগ আর্কিটেকচার ওভারভিউ', type: 'Theory', duration: '40 min', description: 'Indexing, retrieval, augmented generation, and hallucination bounds', descriptionBn: 'ইনডেক্সিং, রিট্রিভাল ও নলেজ অগমেন্টেশন' },
      { slug: 'embeddings', title: 'Dense Embeddings & Cosine Similarity', titleBn: 'ভেক্টর এমবেডিংস ও কোসাইন সিমিলারিটি', type: 'Code', duration: '50 min', description: 'text-embedding-3-small, sentence-transformers, vector spaces', descriptionBn: 'সেমান্টিক ভেক্টর স্পেস ও দূরত্ব পরিমাপ' },
      { slug: 'chunking', title: 'Chunking Strategies & Overlap', titleBn: 'চাঙ্কিং স্ট্র্যাটেজি ও ওভারল্যাপ', type: 'Code', duration: '45 min', description: 'Fixed, sliding window, semantic, and recursive splitting', descriptionBn: 'রিকার্সিভ টেক্সট স্প্লিটিং ও সেমান্টিক উইন্ডোজ' },
      { slug: 'vector-databases', title: 'Vector DBs: ChromaDB & FAISS', titleBn: 'ভেক্টর ডিবি: ChromaDB ও FAISS', type: 'Code', duration: '60 min', description: 'Collection management, metadata filtering, similarity indexing', descriptionBn: 'কালেকশন ম্যানেজমেন্ট ও মেটাডেটা ফিল্টারিং' },
      { slug: 'hybrid-search', title: 'Hybrid Search & BM25 Keyword Matching', titleBn: 'হাইব্রিড সার্চ ও BM25 ম্যাচিং', type: 'Code', duration: '50 min', description: 'Combining dense semantic search with sparse lexical scoring', descriptionBn: 'সেমান্টিক ও কিওয়ার্ড সার্চের সমন্বয়' },
      { slug: 'reranking', title: 'Cross-Encoder Re-Ranking', titleBn: 'ক্রস-এনকোডার রি-র‍্যাঙ্কিং', type: 'Code', duration: '45 min', description: 'Re-ranking candidate chunks with Cohere / HuggingFace', descriptionBn: 'রিট্রিভড ফলাফলের গুণগত মান বৃদ্ধি' },
      { slug: 'evaluation', title: 'RAG Evaluation & RAGAS Metrics', titleBn: 'র‍্যাগ মূল্যায়ন ও RAGAS মেট্রিক্স', type: 'Code', duration: '45 min', description: 'Faithfulness, answer relevancy, and context recall', descriptionBn: 'উত্তর প্রাসঙ্গিকতা ও কনটেক্সট রিকল পরিমাপ' },
      { slug: 'project-pdf-qa', title: 'Project: Production PDF QA System', titleBn: 'প্রজেক্ট: প্রোডাকশন PDF কিউএ সিস্টেম', type: 'Project', duration: '120 min', description: 'Build an end-to-end PDF document question answering service', descriptionBn: 'সাইটেশনসহ পূর্ণাঙ্গ PDF ডকুমেন্ট প্রশ্নোত্তর সিস্টেম' },
    ],
  },
  {
    slug: 'ai-agents',
    title: 'AI Agents & Tools',
    titleBn: 'এআই এজেন্টস ও টুলস',
    icon: '⚡',
    difficulty: 'Advanced',
    difficultyBn: 'অ্যাডভান্সড',
    description:
      'Construct autonomous intelligent agents capable of tool usage, multi-step planning, reflection, and stateful execution using OpenAI Function Calling and LangGraph.',
    descriptionBn:
      'স্বায়ত্তশাসিত ইন্টেলিজেন্ট এজেন্ট তৈরি করুন যা নিজে প্ল্যান করে টুলস ও API কল করতে পারে, মেমরি বজায় রাখে এবং LangGraph দিয়ে জটিল লক্ষ্য হাসিল করে।',
    prerequisites: ['rag-systems'],
    resources: [
      { title: 'OpenAI Function Calling Docs', url: 'https://platform.openai.com/docs/guides/function-calling', free: true },
      { title: 'LangGraph Documentation', url: 'https://langchain-ai.github.io/langgraph/', free: true },
      { title: 'ReAct Paper (Yao et al.)', url: 'https://arxiv.org/abs/2210.03629', free: true },
    ],
    lessons: [
      { slug: 'agents-overview', title: 'Agent Concepts & Reasoning Loops', titleBn: 'এজেন্ট কনসেপ্টস ও রিজনিং লুপস', type: 'Theory', duration: '40 min', description: 'Autonomy spectrum, ReAct loops, planning, and tool schemas', descriptionBn: 'স্বায়ত্তশাসন স্পেকট্রাম ও রিজনিং লুপ' },
      { slug: 'function-calling', title: 'OpenAI Function Calling & Tool APIs', titleBn: 'OpenAI ফাংশন কলিং ও টুল APIs', type: 'Code', duration: '55 min', description: 'Strict tool calling, schema definition, and execution dispatch', descriptionBn: 'টুল স্কিমা ও স্বয়ংক্রিয় হ্যান্ডলার ডিসপ্যাচ' },
      { slug: 'react-pattern', title: 'Implementing ReAct from Scratch', titleBn: 'ReAct প্যাটার্ন ইমপ্লিমেন্টেশন', type: 'Code', duration: '60 min', description: 'Thought-Action-Observation loop implementation in pure Python', descriptionBn: 'Thought-Action-Observation লুপ তৈরি' },
      { slug: 'agent-memory', title: 'Agent Memory & State Persistence', titleBn: 'এজেন্ট মেমরি ও স্টেট পারসিস্টেন্স', type: 'Code', duration: '50 min', description: 'Short-term buffer, long-term vector memory, and reflection', descriptionBn: 'শর্ট-টার্ম ও লং-টার্ম ভেক্টর মেমরি' },
      { slug: 'multi-agent', title: 'Multi-Agent Collaboration', titleBn: 'মাল্টি-এজেন্ট কোলাবরেশন', type: 'Code', duration: '65 min', description: 'Supervisor router pattern, specialist agents, and task handoffs', descriptionBn: 'সুপারভাইজার রাউটার ও স্পেশালিস্ট সাব-এজেন্টস' },
      { slug: 'langgraph', title: 'Stateful Workflows with LangGraph', titleBn: 'LangGraph স্টেটফুল ওয়ার্কফ্লো', type: 'Code', duration: '75 min', description: 'StateGraphs, conditional edges, loops, and human-in-the-loop', descriptionBn: 'স্টেটমেশিন, কন্ডিশনাল এজ ও হিউম্যান-ইন-দ্য-লুপ' },
      { slug: 'project-research-agent', title: 'Project: Autonomous Research Agent', titleBn: 'প্রজেক্ট: স্বায়ত্তশাসিত রিসার্চ এজেন্ট', type: 'Project', duration: '120 min', description: 'Build an autonomous researcher agent with search and report synthesis', descriptionBn: 'তথ্য সংগ্রহ ও সিন্থেসিস রিসার্চ এজেন্ট' },
    ],
  },
  {
    slug: 'deployment-cloud',
    title: 'Deployment & Cloud',
    titleBn: 'ডিপ্লয়মেন্ট ও ক্লাউড',
    icon: '☁️',
    difficulty: 'Advanced',
    difficultyBn: 'অ্যাডভান্সড',
    description:
      'Ship AI services to production. Learn containerization with Docker, high-concurrency FastAPI microservices, streaming endpoints, cloud serverless hosting, and CI/CD automation.',
    descriptionBn:
      'এআই সার্ভিস প্রোডাকশনে রিলিজ করুন। Docker মাল্টি-স্টেজ কন্টেইনারাইজেশন, হাই-কনকারেন্সি FastAPI, SSE স্ট্রিমিং ও GitHub Actions CI/CD অটোমেশন শিখুন।',
    prerequisites: ['ai-agents'],
    resources: [
      { title: 'FastAPI Official Docs', url: 'https://fastapi.tiangolo.com/', free: true },
      { title: 'Docker Documentation', url: 'https://docs.docker.com/', free: true },
      { title: 'Uvicorn ASGI Server', url: 'https://www.uvicorn.org/', free: true },
    ],
    lessons: [
      { slug: 'docker-containers', title: 'Dockerizing AI Applications', titleBn: 'Dockerizing এআই অ্যাপ্লিকেশনস', type: 'Code', duration: '50 min', description: 'Multi-stage Dockerfiles, caching Python wheels, and slim images', descriptionBn: 'মাল্টি-স্টেজ ডকারফাইল ও স্লিম ইমেজ' },
      { slug: 'fastapi-backend', title: 'High-Performance FastAPI Services', titleBn: 'উচ্চ-গতির FastAPI মাইক্রোসার্ভিস', type: 'Code', duration: '60 min', description: 'Async endpoints, Pydantic request validation, background tasks', descriptionBn: 'অ্যাসিঙ্ক এন্ডপয়েন্টস ও ব্যাকগ্রাউন্ড টাস্কস' },
      { slug: 'streaming-sse', title: 'Streaming Responses with SSE', titleBn: 'SSE দিয়ে লো-লেটেন্সি স্ট্রিমিং', type: 'Code', duration: '45 min', description: 'Server-Sent Events (SSE) for low-latency token streaming', descriptionBn: 'সার্ভার-সেন্ট ইভেন্টস (SSE) টোকেন স্ট্রিমিং' },
      { slug: 'cloud-hosting', title: 'Cloud Deployment (AWS / GCP / Railway)', titleBn: 'ক্লাউড ডিপ্লয়মেন্ট (AWS / GCP)', type: 'Theory', duration: '50 min', description: 'Container hosting, ECS, Cloud Run, serverless execution', descriptionBn: 'GPU ইনস্ট্যান্স ও সার্ভারলেস ক্লাউড আর্কিটেকচার' },
      { slug: 'cicd-automation', title: 'CI/CD Pipelines with GitHub Actions', titleBn: 'GitHub Actions দিয়ে CI/CD পাইপলাইন', type: 'Code', duration: '45 min', description: 'Automated linting, testing, and continuous deployment workflows', descriptionBn: 'অটোমেটেড লিন্টিং, টেস্টিং ও রিলিজ' },
      { slug: 'project-deploy-app', title: 'Project: Containerized AI Microservice', titleBn: 'প্রজেক্ট: ডকারাইজড এআই মাইক্রোসার্ভিস', type: 'Project', duration: '120 min', description: 'Package, containerize, and deploy a complete AI service', descriptionBn: 'একটি সম্পূর্ণ সার্ভিস প্যাকেজ ও ডিপ্লয় করুন' },
    ],
  },
  {
    slug: 'llmops-mlops',
    title: 'LLMOps & MLOps',
    titleBn: 'এলএলএমঅপ্স ও এমএলঅপ্স',
    icon: '📊',
    difficulty: 'Advanced',
    difficultyBn: 'অ্যাডভান্সড',
    description:
      'Operate, observe, and maintain AI applications at enterprise scale. Master LangSmith tracing, Helicone caching, latency & token cost optimization, data drift monitoring, and automated evals.',
    descriptionBn:
      'এন্টারপ্রাইজ স্কেলে এআই সিস্টেম পরিচালনা করুন। LangSmith ডিস্ট্রিবিউটেড ট্রেসিং, সেমান্টিক ক্যাশিং, টোকেন খরচ অপ্টিমাইজেশন ও ডেটা ড্রিফট মনিটরিং শিখুন।',
    prerequisites: ['deployment-cloud'],
    resources: [
      { title: 'LangSmith Docs', url: 'https://docs.smith.langchain.com/', free: true },
      { title: 'Helicone LLM Observability', url: 'https://www.helicone.ai/blog/llm-observability', free: true },
      { title: 'Evidently AI Monitoring', url: 'https://www.evidentlyai.com/', free: true },
    ],
    lessons: [
      { slug: 'observability-tracing', title: 'Observability & Tracing with LangSmith', titleBn: 'LangSmith দিয়ে ডিস্ট্রিবিউটেড ট্রেসিং', type: 'Code', duration: '50 min', description: 'Distributed tracing, run trees, error tracking, and latency profiling', descriptionBn: 'রান ট্র্যাকিং, লেটেন্সি প্রোফাইলিং ও লগিং' },
      { slug: 'semantic-caching', title: 'Semantic & Exact Caching', titleBn: 'সেমান্টিক ক্যাশিং ও খরচ সাশ্রয়', type: 'Code', duration: '45 min', description: 'Redis cache, cosine similarity cache, and 90% cost reductions', descriptionBn: 'Redis ক্যাশ ও ৯০% খরচ হ্রাসের কৌশল' },
      { slug: 'cost-latency', title: 'Token Cost & Latency Optimization', titleBn: 'টোকেন খরচ ও লেটেন্সি অপ্টিমাইজেশন', type: 'Theory', duration: '45 min', description: 'Model routing (mini vs frontier), prompt compression, batching', descriptionBn: 'মডেল রাউটিং ও প্রম্পট কম্প্রেশন' },
      { slug: 'data-drift-evals', title: 'Data Drift & Continuous Evaluation', titleBn: 'ডেটা ড্রিফট ও কনটিনিউয়াস ইভালুয়েশন', type: 'Code', duration: '55 min', description: 'Automated regression benchmarks, LLM-as-a-judge, drift alerts', descriptionBn: 'অটোমেটেড রিগ্রেশন টেস্ট ও ড্রিফট অ্যালার্টস' },
      { slug: 'security-guardrails', title: 'Safety Guardrails & PII Masking', titleBn: 'সিকিউরিটি গার্ডরেইল ও PII মাস্কিং', type: 'Code', duration: '45 min', description: 'NeMo Guardrails, regex redaction, input sanitization', descriptionBn: 'ইনপুট স্যানিটাইজেশন ও কন্টেন্ট ফিল্টারিং' },
      { slug: 'project-mlops-pipeline', title: 'Project: Production MLOps Pipeline', titleBn: 'প্রজেক্ট: প্রোডাকশন MLOps পাইপলাইন', type: 'Project', duration: '120 min', description: 'Build an observability dashboard with alerts and telemetry', descriptionBn: 'টেলিমেট্রি ড্যাশবোর্ড ও অ্যালার্ট পাইপলাইন' },
    ],
  },
  {
    slug: 'capstone-projects',
    title: 'Capstone Projects',
    titleBn: 'ক্যাপস্টোন প্রজেক্টস',
    icon: '🏆',
    difficulty: 'Advanced',
    difficultyBn: 'অ্যাডভান্সড',
    description:
      'Build 4 enterprise-grade capstone microservices demonstrating end-to-end AI mastery: Multi-turn Chatbot, Enterprise RAG QA, Autonomous Content Studio, and Browser Automation Agent.',
    descriptionBn:
      '৪টি প্রোডাকশন-গ্রেড এআই ক্যাপস্টোন মাইক্রোসার্ভিস তৈরি করুন: মাল্টি-টার্ন চ্যাটবট, এন্টারপ্রাইজ র‍্যাগ (RAG), কন্টেন্ট স্টুডিও ও ব্রাউজার অটোমেশন এজেন্ট।',
    prerequisites: ['llmops-mlops'],
    resources: [
      { title: 'Vercel AI SDK', url: 'https://sdk.vercel.ai/', free: true },
      { title: 'Fullstack AI Architecture Guide', url: 'https://github.com/', free: true },
    ],
    lessons: [
      { slug: 'project-1-chatbot', title: 'Capstone 1: AI Chatbot Service', titleBn: 'ক্যাপস্টোন ১: এআই চ্যাটবট সার্ভিস', type: 'Project', duration: '120 min', description: 'Contextual memory, persona switching, and token streaming', descriptionBn: 'কনটেক্সটুয়াল মেমরি ও টোকেন স্ট্রিমিং' },
      { slug: 'project-2-rag-system', title: 'Capstone 2: Enterprise RAG QA Engine', titleBn: 'ক্যাপস্টোন ২: এন্টারপ্রাইজ RAG কিউএ ইঞ্জিন', type: 'Project', duration: '150 min', description: 'ChromaDB vector retrieval, citation sourcing, and re-ranking', descriptionBn: 'ভেক্টর রিট্রিভাল ও সাইটেশন সোর্সিং' },
      { slug: 'project-3-content-gen', title: 'Capstone 3: Autonomous Content Studio', titleBn: 'ক্যাপস্টোন ৩: অটোনোমাস কন্টেন্ট স্টুডিও', type: 'Project', duration: '120 min', description: 'Multi-stage drafting, SEO optimization, and JSON exports', descriptionBn: 'মাল্টি-স্টেজ ড্রাফটিং ও এসইও অপ্টিমাইজেশন' },
      { slug: 'project-4-agent-automation', title: 'Capstone 4: Self-Healing Agent Workflow', titleBn: 'ক্যাপস্টোন ৪: সেলফ-হিলিং এজেন্ট ওয়ার্কফ্লো', type: 'Project', duration: '180 min', description: 'Tool-using autonomous worker with reflection and error recovery', descriptionBn: 'টুল ব্যবহারকারী স্বায়ত্তশাসিত ওয়ার্কার' },
    ],
  },
  {
    slug: 'career-growth',
    title: 'Career & Portfolio Growth',
    titleBn: 'ক্যারিয়ার ও পোর্টফোলিও গ্রোথ',
    icon: '🚀',
    difficulty: 'Intermediate',
    difficultyBn: 'ইন্টারমিডিয়েট',
    description:
      'Launch and accelerate your AI Engineer career. Polish your AI GitHub portfolio, master system design interviews for LLM systems, prepare for technical interview questions, and join top AI communities.',
    descriptionBn:
      'আপনার এআই ইঞ্জিনিয়ার ক্যারিয়ার গড়ে তুলুন। চমৎকার গিটহাব পোর্টফোলিও তৈরি করুন, সিস্টেম ডিজাইন ইন্টারভিউ প্রস্তুতি নিন এবং গ্লোবাল এআই কমিউনিটিতে যুক্ত হোন।',
    prerequisites: ['capstone-projects'],
    resources: [
      { title: 'AI Engineering Roadmap', url: 'https://github.com/', free: true },
      { title: 'Hugging Face Community', url: 'https://huggingface.co/join', free: true },
    ],
    lessons: [
      { slug: 'resume-portfolio', title: 'AI Engineer Resume & GitHub Portfolio', titleBn: 'এআই ইঞ্জিনিয়ার রেজুমে ও পোর্টফোলিও', type: 'Theory', duration: '45 min', description: 'Crafting high-impact project READMEs, live demos, and resume metrics', descriptionBn: 'স্টার (STAR) মেথডে আকর্ষণীয় রেজুমে তৈরি' },
      { slug: 'interview-prep', title: 'Technical Interview Questions & Answers', titleBn: 'টেকনিক্যাল ইন্টারভিউ প্রশ্ন ও উত্তর', type: 'Exercise', duration: '60 min', description: 'Comprehensive Q&A covering transformers, embeddings, RAG, and agents', descriptionBn: 'ট্রান্সফরমার, এমবেডিংস ও র‍্যাগ প্রশ্নোত্তর' },
      { slug: 'system-design-llm', title: 'System Design for Production LLM Apps', titleBn: 'এলএলএম সিস্টেম ডিজাইন ইন্টারভিউ', type: 'Theory', duration: '60 min', description: 'Architecting rate limits, queue workers, vector stores, and fallbacks', descriptionBn: 'স্কেলেবল এআই অ্যাপ্লিকেশনের আর্কিটেকচার' },
      { slug: 'resources-communities', title: 'AI Communities, Discord & Staying Updated', titleBn: 'এআই কমিউনিটি ও আপডেট থাকার উপায়', type: 'Theory', duration: '30 min', description: 'Top papers, newsletters, AI hackathons, and open-source contributions', descriptionBn: 'শীর্ষ রিসার্চ পেপারস, হ্যাকাথন ও ওপেন সোর্স' },
    ],
  },
];
