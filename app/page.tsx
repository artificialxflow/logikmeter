"use client";
import { useLanguage } from '../components/LanguageProvider';

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="container py-5">
      <h1 className="mb-3">{t('welcome')}</h1>
      <p className="lead">{t('landingDescription')}</p>
    </div>
  );
}
