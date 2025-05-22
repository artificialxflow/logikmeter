"use client";
import { useLanguage } from '../../components/LanguageProvider';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// TODO: Replace with real user ID from auth/session
const MOCK_USER_ID = 'mock-user-id';

export default function DashboardPage() {
  const { t } = useLanguage();
  const [balance, setBalance] = useState<string | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState(false);

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line
  }, []);

  async function fetchDashboard() {
    setLoading(true);
    setError(null);
    try {
      // Fetch wallet balance
      const walletRes = await fetch(`/api/wallet?userId=${MOCK_USER_ID}`);
      const walletData = await walletRes.json();
      setBalance(walletData.balance !== undefined ? walletData.balance : '--');
      // Fetch topics
      const topicsRes = await fetch('/api/topics');
      const topicsData = await topicsRes.json();
      // Filter topics by authorId (mocked)
      const userTopics = Array.isArray(topicsData)
        ? topicsData.filter((t: any) => t.authorId === MOCK_USER_ID || t.authorId?._id === MOCK_USER_ID)
        : [];
      setTopics(userTopics);
    } catch (err) {
      setError('Failed to load dashboard data.');
    }
    setLoading(false);
  }

  async function handleCreateTopic(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    setCreateSuccess(false);
    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDesc, authorId: MOCK_USER_ID }),
      });
      if (!res.ok) throw new Error();
      setCreateSuccess(true);
      setNewTitle('');
      setNewDesc('');
      setShowModal(false);
      fetchDashboard();
    } catch {
      setCreateError(t('createTopicError'));
    }
    setCreating(false);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">{t('nav.dashboard')}</h2>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{t('walletBalance')}</h5>
              <p className="card-text display-6">
                {loading ? '...' : error ? '--' : `${balance} LMC`}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-end">
          <button className="btn btn-success btn-lg" onClick={() => setShowModal(true)}>
            + {t('createNewTopic')}
          </button>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{t('yourTopics')}</h5>
          {loading ? (
            <div className="text-muted">Loading...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : (
            <ul className="list-group list-group-flush">
              {topics.length === 0 ? (
                <li className="list-group-item">{t('noTopicsYet')}</li>
              ) : (
                topics.map(topic => (
                  <li className="list-group-item" key={topic._id}>
                    <Link href={`/topics/${topic._id}`} className="text-decoration-none">
                      <strong>{topic.title}</strong>
                      <div className="text-muted small">{topic.description}</div>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Modal for creating a new topic */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleCreateTopic}>
                <div className="modal-header">
                  <h5 className="modal-title">{t('createNewTopic')}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">{t('newTopicTitle')}</label>
                    <input
                      className="form-control"
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      required
                      disabled={creating}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{t('newTopicDescription')}</label>
                    <textarea
                      className="form-control"
                      value={newDesc}
                      onChange={e => setNewDesc(e.target.value)}
                      required
                      disabled={creating}
                    />
                  </div>
                  {createError && <div className="text-danger mb-2">{createError}</div>}
                  {createSuccess && <div className="text-success mb-2">{t('createTopicSuccess')}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={creating}>
                    {t('cancel')}
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={creating}>
                    {creating ? t('creating') : t('create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
} 