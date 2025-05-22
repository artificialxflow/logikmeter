"use client";
import React from 'react';
import Link from "next/link";
import { useEffect } from "react";
import AuthButtons from "./AuthButtons";
import { useLanguage } from './LanguageProvider';

export default function Navbar() {
  const { lang, t, toggleLanguage } = useLanguage();

  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-2">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white me-4" href="/" style={{letterSpacing: '1px', fontSize: '1.3rem'}}>
          {t('appName')}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" href="/">{t('nav.dashboard')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white-50" href="/topics">{t('nav.topics')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white-50" href="/discussions">{t('nav.discussions')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white-50" href="/wallet">{t('nav.wallet')}</Link>
            </li>
          </ul>
          <div className="d-flex gap-2 ms-lg-auto">
            <AuthButtons />
            <button className="btn btn-outline-secondary ms-2" onClick={toggleLanguage}>
              {lang === 'en' ? 'FA' : 'EN'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
