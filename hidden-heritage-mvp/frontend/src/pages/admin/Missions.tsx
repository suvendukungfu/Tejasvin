import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Clock, CheckCircle2, XCircle, Pause } from 'lucide-react';
import { missions } from '../../data/adminMockData';
import type { Mission } from '../../types/admin';

type StatusFilter = 'all' | Mission['status'];

const statusIcons: Record<Mission['status'], React.ReactNode> = {
  active: <Compass size={14} />,
  completed: <CheckCircle2 size={14} />,
  pending: <Clock size={14} />,
  aborted: <XCircle size={14} />,
};

const Missions = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filtered = missions.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.explorerName.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    active: missions.filter((m) => m.status === 'active').length,
    completed: missions.filter((m) => m.status === 'completed').length,
    pending: missions.filter((m) => m.status === 'pending').length,
    aborted: missions.filter((m) => m.status === 'aborted').length,
  };

  return (
    <>
      <div className="page-header">
        <h1>
          Mission <span className="page-header-accent">Monitoring</span>
        </h1>
        <p>Track all field expeditions, verification progress, and assignment status</p>
      </div>

      {/* Summary */}
      <div className="summary-row">
        <div className="summary-chip">
          <Compass size={14} /> Active{' '}
          <span className="summary-chip-value">{counts.active}</span>
        </div>
        <div className="summary-chip">
          <CheckCircle2 size={14} /> Completed{' '}
          <span className="summary-chip-value">{counts.completed}</span>
        </div>
        <div className="summary-chip">
          <Pause size={14} /> Pending{' '}
          <span className="summary-chip-value">{counts.pending}</span>
        </div>
        <div className="summary-chip">
          <XCircle size={14} /> Aborted{' '}
          <span className="summary-chip-value">{counts.aborted}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.25)',
            }}
          />
          <input
            className="filter-input"
            style={{ paddingLeft: 36 }}
            placeholder="Search missions, explorers, or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {(['all', 'active', 'completed', 'pending', 'aborted'] as StatusFilter[]).map((s) => (
          <button
            key={s}
            className={`filter-btn ${statusFilter === s ? 'active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Mission Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
        }}
      >
        {filtered.map((mission, i) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="hud-card"
            style={{ cursor: 'default' }}
          >
            <div style={{ padding: '20px 24px' }}>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 16,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--hud-font-mono)',
                      fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.3)',
                      display: 'block',
                      marginBottom: 4,
                    }}
                  >
                    {mission.id}
                  </span>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'white',
                      fontFamily: 'var(--hud-font-sans)',
                      lineHeight: 1.4,
                    }}
                  >
                    {mission.title}
                  </h4>
                </div>
                <span className={`badge badge-${mission.status}`}>
                  {statusIcons[mission.status]} {mission.status}
                </span>
              </div>

              {/* Details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px 24px',
                  fontSize: '0.8rem',
                }}
              >
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.35)', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    Explorer
                  </span>
                  <span style={{ color: 'var(--hud-cyan)', fontWeight: 600 }}>
                    {mission.explorerName}
                  </span>
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.35)', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    Location
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>{mission.location}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.35)', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    Started
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--hud-font-mono)', fontSize: '0.75rem' }}>
                    {new Date(mission.startedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.35)', display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    Verification
                  </span>
                  <span className={`badge-verification ${mission.verificationLevel}`}>
                    {mission.verificationLevel.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {mission.notes && (
                <div
                  style={{
                    marginTop: 14,
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'rgba(255, 82, 82, 0.05)',
                    border: '1px solid rgba(255, 82, 82, 0.1)',
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.5)',
                    fontStyle: 'italic',
                  }}
                >
                  ⚠ {mission.notes}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state" style={{ marginTop: 32 }}>
          <div className="empty-state-icon">🔭</div>
          <p className="empty-state-text">No missions match your criteria</p>
        </div>
      )}
    </>
  );
};

export default Missions;
