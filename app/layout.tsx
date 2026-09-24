import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';
import { LanguageProvider } from '@/lib/i18n';
import { SubscriptionProvider } from '@/lib/subscription';

export const metadata: Metadata = {
  metadataBase: new URL('https://puthitech.com'),
  title: 'Puthi Tech — Code • Learn • Build • Global | AI Engineering Platform',
  description:
    'Puthi Tech (puthitech.com): Master Full-Stack AI Engineering with 10 comprehensive modules: Python, Machine Learning, Transformers, Prompt Engineering, RAG Systems, AI Agents, and Production LLMOps.',
  alternates: {
    canonical: 'https://puthitech.com',
  },
  openGraph: {
    title: 'Puthi Tech — AI Engineering Platform',
    description: 'Code • Learn • Build • Global. 10 Comprehensive Mastery Modules from Zero to Production.',
    url: 'https://puthitech.com',
    siteName: 'Puthi Tech',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Puthi Tech Logo',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className="bg-gray-950 text-gray-100 min-h-screen antialiased selection:bg-purple-600/30 selection:text-purple-200">
        <LanguageProvider>
          <SubscriptionProvider>
            <AppShell>
              {children}
            </AppShell>
          </SubscriptionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
