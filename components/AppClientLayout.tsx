"use client";
import { ReactNode } from 'react';
import { useLanguage } from './LanguageProvider';
import Navbar from './Navbar';
import ClientRoot from './ClientRoot';

export default function AppClientLayout({ children }: { children: ReactNode }) {
  const { lang, t } = useLanguage();
  const isRTL = lang === 'fa';
  return (
    <div className={isRTL ? 'rtl bootstrap-rtl' : ''} style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <ClientRoot>
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary" style={{ minHeight: 80 }}>
          <div className="container-fluid">
            <a className="navbar-brand fw-bold text-white fs-3" href="/">
              LogikMeter
            </a>
            <Navbar />
          </div>
        </nav>
        <main>{children}</main>
      </ClientRoot>
    </div>
  );
} 