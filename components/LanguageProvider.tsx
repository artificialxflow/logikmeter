'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '../locales/en.json';
import fa from '../locales/fa.json';

const translations: Record<string, any> = { en, fa };

type LanguageContextType = {
  lang: 'en' | 'fa';
  t: (key: string) => string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<'en' | 'fa'>('en');

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[lang];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return value;
  };

  const toggleLanguage = () => setLang(l => (l === 'en' ? 'fa' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}; 