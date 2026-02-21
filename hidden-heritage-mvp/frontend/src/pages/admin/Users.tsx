import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, BadgeCheck, UserCircle2 } from 'lucide-react';
import { users } from '../../data/adminMockData';
import type { UserRole } from '../../types/admin';

type RoleFilter = 'all' | UserRole;

const Users = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const roleCounts = {
    admin: users.filter((u) => u.role === 'admin').length,
    specialist: users.filter((u) => u.role === 'specialist').length,
    explorer: users.filter((u) => u.role === 'explorer').length,
  };

  const totalVerified = users.filter((u) => u.verifiedSpecialist).length;

  return (
    <>
      <div className="page-header">
        <h1>
          User <span className="page-header-accent">Registry</span>
        </h1>
        <p>Manage personnel, role assignments, and specialist verification status</p>
      </div>

      {/* Role Distribution */}
      <div className="summary-row">
        <div className="summary-chip">
          <UserCircle2 size={14} /> Total Users{' '}
          <span className="summary-chip-value">{users.length}</span>
        </div>
        <div className="summary-chip">
          <Shield size={14} style={{ color: 'var(--hud-purple)' }} /> Admins{' '}
          <span className="summary-chip-value">{roleCounts.admin}</span>
        </div>
        <div className="summary-chip">
          <BadgeCheck size={14} style={{ color: 'var(--hud-cyan)' }} /> Specialists{' '}
          <span className="summary-chip-value">{roleCounts.specialist}</span>
        </div>
        <div className="summary-chip">
          <span style={{ color: 'var(--hud-amber)' }}>◆</span> Explorers{' '}
          <span className="summary-chip-value">{roleCounts.explorer}</span>
        </div>
        <div className="summary-chip">
          <span style={{ color: 'var(--hud-cyan)' }}>✓</span> Verified{' '}
          <span className="summary-chip-value">{totalVerified}</span>
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
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {(['all', 'admin', 'specialist', 'explorer'] as RoleFilter[]).map((role) => (
          <button
            key={role}
            className={`filter-btn ${roleFilter === role ? 'active' : ''}`}
            onClick={() => setRoleFilter(role)}
          >
            {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1) + 's'}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="hud-card"
      >
        <table className="hud-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Expeditions</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((user) => (
                <tr key={user.id}>
                  <td className="mono">{user.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          background:
                            user.role === 'admin'
                              ? 'linear-gradient(135deg, var(--hud-purple), var(--hud-cyan))'
                              : user.role === 'specialist'
                              ? 'linear-gradient(135deg, var(--hud-cyan), var(--hud-green))'
                              : 'linear-gradient(135deg, var(--hud-amber), #ff6d00)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: 'white',
                          flexShrink: 0,
                        }}
                      >
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <span style={{ fontWeight: 600, color: 'white' }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>
                    {user.email}
                  </td>
                  <td>
                    <span className={`badge badge-role-${user.role}`}>{user.role}</span>
                  </td>
                  <td>
                    {user.verifiedSpecialist ? (
                      <span className="badge-verified">
                        <BadgeCheck size={12} /> Verified
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'rgba(255,255,255,0.3)',
                          fontStyle: 'italic',
                        }}
                      >
                        —
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      style={{
                        fontFamily: 'var(--hud-font-mono)',
                        fontWeight: 600,
                        color: 'var(--hud-amber)',
                      }}
                    >
                      {user.expeditionsCompleted}
                    </span>
                  </td>
                  <td
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'var(--hud-font-mono)',
                      fontSize: '0.78rem',
                    }}
                  >
                    {new Date(user.joinedAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <div className="empty-state-icon">👤</div>
                    <p className="empty-state-text">No users match your criteria</p>
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

export default Users;
