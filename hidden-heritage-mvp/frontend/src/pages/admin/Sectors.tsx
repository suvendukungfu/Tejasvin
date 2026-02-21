import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Globe } from 'lucide-react';
import { sectors } from '../../data/adminMockData';
import type { Sector } from '../../types/admin';

type StatusFilter = 'all' | Sector['status'];

const Sectors = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filtered = sectors.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.region.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = {
    active: sectors.filter((s) => s.status === 'active').length,
    surveying: sectors.filter((s) => s.status === 'surveying').length,
    restricted: sectors.filter((s) => s.status === 'restricted').length,
    archived: sectors.filter((s) => s.status === 'archived').length,
  };

  return (
    <>
      <div className="page-header">
        <h1>
          Sectors <span className="page-header-accent">Management</span>
        </h1>
        <p>Monitor and manage heritage exploration sectors across the subcontinent</p>
      </div>

      {/* Summary Chips */}
      <div className="summary-row">
        <div className="summary-chip">
          <Globe size={14} /> Total Sectors{' '}
          <span className="summary-chip-value">{sectors.length}</span>
        </div>
        <div className="summary-chip">
          <span style={{ color: 'var(--hud-green)' }}>●</span> Active{' '}
          <span className="summary-chip-value">{statusCounts.active}</span>
        </div>
        <div className="summary-chip">
          <span style={{ color: 'var(--hud-amber)' }}>●</span> Surveying{' '}
          <span className="summary-chip-value">{statusCounts.surveying}</span>
        </div>
        <div className="summary-chip">
          <span style={{ color: 'var(--hud-red)' }}>●</span> Restricted{' '}
          <span className="summary-chip-value">{statusCounts.restricted}</span>
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
            placeholder="Search sectors or regions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {(['all', 'active', 'surveying', 'restricted', 'archived'] as StatusFilter[]).map(
          (status) => (
            <button
              key={status}
              className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Sectors Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="hud-card"
      >
        <table className="hud-table">
          <thead>
            <tr>
              <th>Sector ID</th>
              <th>Name</th>
              <th>Region</th>
              <th>Sites</th>
              <th>Status</th>
              <th>Discovered</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((sector) => (
                <tr key={sector.id}>
                  <td className="mono">{sector.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={14} style={{ color: 'var(--hud-cyan)', flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, color: 'white' }}>{sector.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.5)' }}>{sector.region}</td>
                  <td>
                    <span
                      style={{
                        fontFamily: 'var(--hud-font-mono)',
                        color: 'var(--hud-amber)',
                        fontWeight: 600,
                      }}
                    >
                      {sector.heritageSites.length}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${sector.status}`}>{sector.status}</span>
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--hud-font-mono)', fontSize: '0.8rem' }}>
                    {new Date(sector.discoveredAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <p className="empty-state-text">No sectors match your search criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </>
  );
};

export default Sectors;
