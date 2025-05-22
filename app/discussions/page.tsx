"use client";
import { useLanguage } from '../../components/LanguageProvider';
import React from 'react';

export default function DiscussionsPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-4">
      <h2>{t('discussions')}</h2>
      <p>{t('noDiscussions')}</p>
      {/* TODO: Implement discussions list here */}
    </div>
  );
} 