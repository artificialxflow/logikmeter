"use client";
import { useLanguage } from '../components/LanguageProvider';
import React from 'react';

export default function HomePage() {
  const { t, lang } = useLanguage();
  const isRTL = lang === 'fa';

  if (isRTL) {
    // Persian RTL Design
    return (
      <div className="container py-5" dir="rtl">
        {/* Hero Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-lg-11">
            <div className="card shadow border-0 p-4 mb-4" style={{background: '#fff'}}>
              <div className="row align-items-center g-4 flex-row-reverse">
                <div className="col-md-5 text-center">
                  <img src="/public/hero-crypto.svg" alt="Crypto Rewards" style={{maxWidth: '80%', height: 'auto'}} />
                </div>
                <div className="col-md-7 text-end">
                  <h1 className="display-4 fw-bold mb-3 text-primary">{t('appName')}</h1>
                  <p className="lead mb-4">{t('landingDescription')}</p>
                  <a href="/dashboard" className="btn btn-lg btn-primary ms-2">{t('nav.dashboard')}</a>
                  <a href="/topics" className="btn btn-lg btn-outline-primary">{t('nav.topics')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="row text-center mb-5 flex-row-reverse">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-coin display-5 text-warning"></i>
                </div>
                <h5 className="card-title fw-bold">{t('feature_crypto_rewards')}</h5>
                <p className="card-text">{t('feature_crypto_rewards_desc')}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-people display-5 text-info"></i>
                </div>
                <h5 className="card-title fw-bold">{t('feature_discussions')}</h5>
                <p className="card-text">{t('feature_discussions_desc')}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-graph-up-arrow display-5 text-success"></i>
                </div>
                <h5 className="card-title fw-bold">{t('feature_ai_analysis')}</h5>
                <p className="card-text">{t('feature_ai_analysis_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0 p-4" style={{background: '#fff'}}>
              <h3 className="fw-bold mb-3 text-center">{t('howItWorks')}</h3>
              <ol className="list-group list-group-numbered list-group-flush text-end" style={{direction: 'rtl'}}>
                <li className="list-group-item">{t('howItWorks_step1')}</li>
                <li className="list-group-item">{t('howItWorks_step2')}</li>
                <li className="list-group-item">{t('howItWorks_step3')}</li>
                <li className="list-group-item">{t('howItWorks_step4')}</li>
                <li className="list-group-item">{t('howItWorks_step5')}</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row mb-4">
          <div className="col text-center">
            <a href="/dashboard" className="btn btn-lg btn-success px-5 py-3 fw-bold shadow">{t('getStarted')}</a>
          </div>
        </div>
      </div>
    );
  }

  // English (LTR) design remains unchanged
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-7">
          <h1 className="display-4 fw-bold mb-3 text-primary">{t('appName')}</h1>
          <p className="lead mb-4">{t('landingDescription')}</p>
          <a href="/dashboard" className="btn btn-lg btn-primary me-2">{t('nav.dashboard')}</a>
          <a href="/topics" className="btn btn-lg btn-outline-primary">{t('nav.topics')}</a>
        </div>
        <div className="col-md-5 text-center d-none d-md-block">
          <img src="/public/hero-crypto.svg" alt="Crypto Rewards" style={{maxWidth: '80%', height: 'auto'}} />
        </div>
      </div>

      {/* Features Section */}
      <div className="row text-center mb-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-graph-up-arrow display-5 text-success"></i>
              </div>
              <h5 className="card-title fw-bold">{t('feature_ai_analysis')}</h5>
              <p className="card-text">{t('feature_ai_analysis_desc')}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-people display-5 text-info"></i>
              </div>
              <h5 className="card-title fw-bold">{t('feature_discussions')}</h5>
              <p className="card-text">{t('feature_discussions_desc')}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-coin display-5 text-warning"></i>
              </div>
              <h5 className="card-title fw-bold">{t('feature_crypto_rewards')}</h5>
              <p className="card-text">{t('feature_crypto_rewards_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <h3 className="fw-bold mb-3 text-center">{t('howItWorks')}</h3>
          <ol className="list-group list-group-numbered list-group-flush">
            <li className="list-group-item">{t('howItWorks_step1')}</li>
            <li className="list-group-item">{t('howItWorks_step2')}</li>
            <li className="list-group-item">{t('howItWorks_step3')}</li>
            <li className="list-group-item">{t('howItWorks_step4')}</li>
            <li className="list-group-item">{t('howItWorks_step5')}</li>
          </ol>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row mb-4">
        <div className="col text-center">
          <a href="/dashboard" className="btn btn-lg btn-success px-5 py-3 fw-bold shadow">{t('getStarted')}</a>
        </div>
      </div>
    </div>
  );
}
