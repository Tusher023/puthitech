'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionContextType {
  isSubscribed: boolean;
  mounted: boolean;
  subscriberInfo: { name: string; phone: string; trxId: string } | null;
  subscribe: (info: { name: string; phone: string; trxId: string }) => void;
  unlockWithTrxId: (trxIdOrPhone: string) => boolean;
  unsubscribe: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: false,
  mounted: false,
  subscriberInfo: null,
  subscribe: () => {},
  unlockWithTrxId: () => false,
  unsubscribe: () => {},
});

const STORAGE_KEY = 'ai_course_subscription_active';
const INFO_KEY = 'ai_course_subscriber_info';

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberInfo, setSubscriberInfo] = useState<{ name: string; phone: string; trxId: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const active = localStorage.getItem(STORAGE_KEY) === 'true';
      const storedInfo = localStorage.getItem(INFO_KEY);
      setIsSubscribed(active);
      if (storedInfo) {
        setSubscriberInfo(JSON.parse(storedInfo));
      }
    } catch (e) {
      console.error('Failed to read subscription from localStorage', e);
    }
    setMounted(true);
  }, []);

  const subscribe = (info: { name: string; phone: string; trxId: string }) => {
    setIsSubscribed(true);
    setSubscriberInfo(info);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(INFO_KEY, JSON.stringify(info));
    } catch (e) {
      console.error('Failed to save subscription', e);
    }
  };

  const unlockWithTrxId = (trxIdOrPhone: string): boolean => {
    const cleaned = trxIdOrPhone.trim();
    if (cleaned.length >= 4) {
      const info = {
        name: 'Active Student',
        phone: cleaned,
        trxId: cleaned.toUpperCase(),
      };
      subscribe(info);
      return true;
    }
    return false;
  };

  const unsubscribe = () => {
    setIsSubscribed(false);
    setSubscriberInfo(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(INFO_KEY);
    } catch (e) {
      console.error('Failed to reset subscription', e);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        mounted,
        subscriberInfo,
        subscribe,
        unlockWithTrxId,
        unsubscribe,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
