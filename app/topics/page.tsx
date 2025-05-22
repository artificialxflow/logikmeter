"use client";
import { useLanguage } from '../../components/LanguageProvider';
import React from 'react';

export default function TopicsPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-4">
      <h2>{t('topics')}</h2>
      <p>{t('noTopicsYet')}</p>
      {/* TODO: Implement topics list here */}
    </div>
  );
} 