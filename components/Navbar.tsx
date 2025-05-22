"use client";
import React from 'react';
import Link from "next/link";
import { useEffect } from "react";
import AuthButtons from "./AuthButtons";
import { useLanguage } from './LanguageProvider';

export default function Navbar() {
  const { lang, t, toggleLanguage } = useLanguage();
  const isRTL = lang === 'fa';

  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // Menu items in logical order
  const menuItems = [
    { href: "/", label: t('nav.dashboard') },
    { href: "/topics", label: t('nav.topics') },
    { href: "/discussions", label: t('nav.discussions') },
    { href: "/wallet", label: t('nav.wallet') },
  ];
  // For RTL, reverse the order
  const navItems = isRTL ? [...menuItems].reverse() : menuItems;

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-2${isRTL ? ' flex-row-reverse' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ minHeight: 80 }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Brand and menu group */}
        <div className={`d-flex align-items-center ${isRTL ? 'flex-row-reverse' : ''}`}> 
          {/* Brand is handled by layout, so skip here */}
          <div
            className={`collapse navbar-collapse show p-0 m-0 ${isRTL ? 'flex-row-reverse' : ''}`}
            id="navbarNav"
            style={{ position: 'static' }}
          >
            <ul
              className={`navbar-nav mb-2 mb-lg-0 gap-lg-2 align-items-center ${isRTL ? 'flex-row-reverse' : ''}`}
              style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              {navItems.map((item, idx) => (
                <li className="nav-item" key={item.href}>
                  <Link
                    className={`nav-link${idx === 0 ? ' active text-white' : ' text-white-50'}`}
                    aria-current={idx === 0 ? 'page' : undefined}
                    href={item.href}
                    style={{ fontSize: '1.1rem', padding: '0 0.75rem' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Auth and language toggle always on far right */}
        <div className="d-flex gap-2 align-items-center">
          <AuthButtons />
          <button className="btn btn-outline-secondary ms-2" onClick={toggleLanguage}>
            {lang === 'en' ? 'FA' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
}
