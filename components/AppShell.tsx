'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { useSubscription } from '@/lib/subscription';
import SubscriptionGate from '@/components/SubscriptionGate';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isSubscribed, mounted } = useSubscription();
  const isLandingPage = pathname === '/';

  // Public Landing Page (Home) is accessible to everyone
  if (isLandingPage) {
    return <div className="w-full min-h-screen bg-gray-950 text-gray-100">{children}</div>;
  }

  // Prevent flash while reading localStorage
  if (!mounted) {
    return (
      <div className="w-full min-h-screen bg-gray-950 flex items-center justify-center text-purple-400 font-mono text-xs">
        Verifying enrollment...
      </div>
    );
  }

  // Gated: Public non-subscribers can ONLY access the landing page. Everything else requires 500 BDT subscription.
  if (!isSubscribed) {
    return <SubscriptionGate />;
  }

  // Subscribed users get full access to the classroom
  return (
    <div className="flex w-full min-h-screen bg-gray-950 text-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
