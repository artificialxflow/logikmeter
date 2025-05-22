"use client";
import { useLanguage } from '../../components/LanguageProvider';
import React from 'react';

export default function WalletPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-4">
      <h2>{t('wallet')}</h2>
      <p>{t('walletBalance')}: 0 LMC</p>
      {/* TODO: Implement wallet details and actions here */}
    </div>
  );
} 