"use client";
import { useLanguage } from '../../../components/LanguageProvider';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// TODO: Replace with real user ID from auth/session
const MOCK_USER_ID = 'mock-user-id';

export default function TopicDetailsPage() {
  const { t } = useLanguage();
  const params = useParams();
  const topicId = params?.id as string;
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Poll voting state
  const [selectedOption, setSelectedOption] = useState('');
  const [voting, setVoting] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  // Poll results state
  const [pollResults, setPollResults] = useState<any>(null);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [resultsError, setResultsError] = useState<string | null>(null);

  // Version selection state
  const [selectedVersionIdx, setSelectedVersionIdx] = useState<number | null>(null);

  // Discussion modal state
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);

  useEffect(() => {
    async function fetchTopic() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/topics/${topicId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTopic(data);
      } catch {
        setError('Failed to load topic.');
      }
      setLoading(false);
    }
    if (topicId) fetchTopic();
  }, [topicId]);

  // Get versions
  const versions = Array.isArray(topic?.versions) ? topic.versions : [];
  const latestVersionIdx = versions.length - 1;
  const selectedIdx = selectedVersionIdx === null ? latestVersionIdx : selectedVersionIdx;
  const selectedVersion = versions[selectedIdx] || null;

  const pollId = topic?.poll?._id || topic?.pollId || topic?.poll || '';

  async function fetchPollResults() {
    if (!pollId) return;
    setResultsLoading(true);
    setResultsError(null);
    try {
      const res = await fetch(`/api/polls/${pollId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPollResults(data);
    } catch {
      setResultsError('Failed to load poll results.');
    }
    setResultsLoading(false);
  }

  useEffect(() => {
    if (pollId) fetchPollResults();
    // eslint-disable-next-line
  }, [pollId, voteSuccess]);

  async function handleVote(e: React.FormEvent) {
    e.preventDefault();
    setVoting(true);
    setVoteError(null);
    setVoteSuccess(false);
    try {
      if (!pollId || !selectedOption) throw new Error();
      const res = await fetch('/api/polls/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pollId, userId: MOCK_USER_ID, option: selectedOption }),
      });
      if (!res.ok) throw new Error();
      setVoteSuccess(true);
      setSelectedOption('');
      fetchPollResults();
    } catch {
      setVoteError(t('voteError'));
    }
    setVoting(false);
  }

  if (loading) return <div className="container py-4">Loading...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;
  if (!topic) return null;

  // Count votes per option
  let optionCounts: Record<string, number> = {};
  if (Array.isArray(pollResults?.votes)) {
    for (const v of pollResults.votes) {
      optionCounts[v.option] = (optionCounts[v.option] || 0) + 1;
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">{topic.title}</h2>
      <div className="mb-3 text-muted">{topic.description}</div>
      {selectedVersion && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{selectedIdx === latestVersionIdx ? t('latest') : `${t('version')} ${selectedVersion.versionNumber}`}</h5>
            <div><strong>Subject:</strong> {selectedVersion.content?.subject}</div>
            <div><strong>Summary:</strong> {selectedVersion.content?.summary}</div>
            <div><strong>Conclusion:</strong> {selectedVersion.content?.conclusion}</div>
            <div><strong>Poll Question:</strong> {selectedVersion.content?.pollQuestion}</div>
            {Array.isArray(selectedVersion.content?.pollOptions) && selectedVersion.content.pollOptions.length > 0 && (
              <form className="mt-3" onSubmit={handleVote}>
                <div className="mb-2 fw-bold">{t('pollVote')}</div>
                <div className="mb-3">
                  {selectedVersion.content.pollOptions.map((opt: string, idx: number) => (
                    <div className="form-check" key={idx}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="pollOption"
                        id={`pollOption${idx}`}
                        value={opt}
                        checked={selectedOption === opt}
                        onChange={() => setSelectedOption(opt)}
                        disabled={voting}
                      />
                      <label className="form-check-label" htmlFor={`pollOption${idx}`}>{opt}</label>
                    </div>
                  ))}
                </div>
                {voteError && <div className="text-danger mb-2">{voteError}</div>}
                {voteSuccess && <div className="text-success mb-2">{t('voteSuccess')}</div>}
                <button className="btn btn-primary" type="submit" disabled={voting || !selectedOption}>
                  {voting ? t('voting') : t('submitVote')}
                </button>
              </form>
            )}
            {/* Poll Results */}
            <div className="mt-4">
              <h6>{t('pollResults')}</h6>
              {resultsLoading ? (
                <div className="text-muted">Loading...</div>
              ) : resultsError ? (
                <div className="text-danger">{resultsError}</div>
              ) : pollResults && Array.isArray(selectedVersion.content?.pollOptions) ? (
                <table className="table table-bordered w-auto">
                  <thead>
                    <tr>
                      <th>{t('option')}</th>
                      <th>{t('votes')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedVersion.content.pollOptions.map((opt: string, idx: number) => (
                      <tr key={idx}>
                        <td>{opt}</td>
                        <td>{optionCounts[opt] || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-muted">{t('noVotesYet')}</div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        <h5>{t('versionHistory')}</h5>
        {versions.length === 0 ? (
          <div className="text-muted">{t('noVersions')}</div>
        ) : (
          <ul className="list-group list-group-flush">
            {versions.map((ver: any, idx: number) => (
              <li className={`list-group-item d-flex align-items-center${idx === selectedIdx ? ' active' : ''}`} key={ver._id || idx}>
                <button
                  className={`btn btn-sm me-2${idx === selectedIdx ? ' btn-primary' : ' btn-outline-primary'}`}
                  onClick={() => setSelectedVersionIdx(idx)}
                  disabled={idx === selectedIdx}
                >
                  {idx === latestVersionIdx ? t('latest') : `${t('version')} ${ver.versionNumber}`}
                </button>
                <span className="ms-2 small text-muted">{new Date(ver.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <h5>{t('comments')}</h5>
        <CommentsSection t={t} />
      </div>
      <button className="btn btn-primary" onClick={() => setShowDiscussionModal(true)}>{t('startDiscussion')}</button>
      <StartDiscussionModal
        show={showDiscussionModal}
        onClose={() => setShowDiscussionModal(false)}
        topicId={topicId}
        t={t}
      />
      <DiscussionsList topicId={topicId} t={t} />
    </div>
  );
}

// CommentsSection component (mocked, local state)
function CommentsSection({ t }: { t: (key: string) => string }) {
  const [comments, setComments] = React.useState<any[]>([]);
  const [commentText, setCommentText] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    setTimeout(() => {
      if (!commentText.trim()) {
        setError(t('commentError'));
        setSubmitting(false);
        return;
      }
      setComments(prev => [
        { text: commentText, date: new Date().toLocaleString() },
        ...prev,
      ]);
      setCommentText('');
      setSuccess(true);
      setSubmitting(false);
    }, 700);
  }

  return (
    <div>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            placeholder={t('commentPlaceholder')}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            disabled={submitting}
          />
          <button className="btn btn-primary" type="submit" disabled={submitting || !commentText.trim()}>
            {submitting ? t('commenting') : t('submitComment')}
          </button>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
        {success && <div className="text-success mt-2">{t('commentSuccess')}</div>}
      </form>
      {comments.length === 0 ? (
        <div className="text-muted">{t('noComments')}</div>
      ) : (
        <ul className="list-group">
          {comments.map((c, i) => (
            <li className="list-group-item" key={i}>
              <div>{c.text}</div>
              <div className="small text-muted">{c.date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// StartDiscussionModal component
function StartDiscussionModal({ show, onClose, topicId, t }: { show: boolean; onClose: () => void; topicId: string; t: (key: string) => string }) {
  const [usernames, setUsernames] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    const participants = usernames.split(',').map(u => u.trim()).filter(Boolean);
    setTimeout(async () => {
      try {
        // TODO: Replace with real creatorId from auth/session
        const creatorId = 'mock-user-id';
        const res = await fetch('/api/discussions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topicId, creatorId, participants }),
        });
        if (!res.ok) throw new Error();
        setSuccess(true);
        setUsernames('');
        onClose();
      } catch {
        setError(t('discussionError'));
      }
      setSubmitting(false);
    }, 700);
  }

  if (!show) return null;
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{t('startDiscussion')}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">{t('discussionParticipants')}</label>
                <input
                  className="form-control"
                  placeholder={t('discussionUsernamePlaceholder')}
                  value={usernames}
                  onChange={e => setUsernames(e.target.value)}
                  disabled={submitting}
                />
              </div>
              {error && <div className="text-danger mb-2">{error}</div>}
              {success && <div className="text-success mb-2">{t('discussionSuccess')}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
                {t('cancel')}
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? t('starting') : t('start')}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}

// DiscussionsList component
function DiscussionsList({ topicId, t }: { topicId: string; t: (key: string) => string }) {
  const [discussions, setDiscussions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    async function fetchDiscussions() {
      try {
        const res = await fetch(`/api/discussions?topicId=${topicId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setDiscussions(Array.isArray(data) ? data : []);
      } catch {
        setError('Failed to load discussions.');
      }
      setLoading(false);
    }
    if (topicId) fetchDiscussions();
  }, [topicId]);

  return (
    <div className="mt-5">
      <h5>{t('discussions')}</h5>
      {loading ? (
        <div className="text-muted">Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : discussions.length === 0 ? (
        <div className="text-muted">{t('noDiscussions')}</div>
      ) : (
        <ul className="list-group">
          {discussions.map((d, i) => (
            <li className="list-group-item" key={d._id || i}>
              <a href={`/discussions/${d._id}`} className="text-decoration-none text-reset">
                <div><strong>{t('participants')}:</strong> {Array.isArray(d.participants) ? d.participants.join(', ') : ''}</div>
                <div><strong>{t('status')}:</strong> {t(d.status)}</div>
                {(d.status === 'active' || d.status === 'voting') && d.endTime && (
                  <div><strong>{t('timeRemaining')}:</strong> <Countdown endTime={d.endTime} /></div>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Countdown component
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