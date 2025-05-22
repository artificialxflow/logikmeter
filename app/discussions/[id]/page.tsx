"use client";
import { useLanguage } from '../../../components/LanguageProvider';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function DiscussionDetailsPage() {
  const { t } = useLanguage();
  const params = useParams();
  const discussionId = params?.id as string;
  const [discussion, setDiscussion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDiscussion() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/discussions/${discussionId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setDiscussion(data);
      } catch {
        setError(t('discussionLoadError'));
      }
      setLoading(false);
    }
    if (discussionId) fetchDiscussion();
  }, [discussionId, t]);

  return (
    <div className="container py-4">
      {loading ? (
        <div className="text-muted">{t('loading')}</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : !discussion ? null : (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title mb-3">{t('discussionDetails')}</h3>
            <div className="mb-2"><strong>{t('participants')}:</strong> {Array.isArray(discussion.participants) ? discussion.participants.join(', ') : ''}</div>
            <div className="mb-2"><strong>{t('status')}:</strong> {t(discussion.status)}</div>
            {discussion.endTime && (discussion.status === 'active' || discussion.status === 'voting') && (
              <div className="mb-2"><strong>{t('timeRemaining')}:</strong> <Countdown endTime={discussion.endTime} /></div>
            )}
            <div className="mb-2"><strong>{t('createdAt')}:</strong> {discussion.createdAt ? new Date(discussion.createdAt).toLocaleString() : '-'}</div>
            <div className="mb-2"><strong>{t('updatedAt')}:</strong> {discussion.updatedAt ? new Date(discussion.updatedAt).toLocaleString() : '-'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function Countdown({ endTime }: { endTime: string }) {
  const [remaining, setRemaining] = React.useState('');
  React.useEffect(() => {
    function update() {
      const ms = new Date(endTime).getTime() - Date.now();
      if (ms <= 0) {
        setRemaining('0:00');
        return;
      }
      const min = Math.floor(ms / 60000);
      const sec = Math.floor((ms % 60000) / 1000);
      setRemaining(`${min}:${sec.toString().padStart(2, '0')}`);
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endTime]);
  return <span>{remaining}</span>;
} 