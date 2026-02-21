import { useLocation } from 'react-router-dom';
import { Bell, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const routeTitles: Record<string, string> = {
  '/admin': 'System Overview',
  '/admin/sectors': 'Sectors Management',
  '/admin/missions': 'Mission Monitoring',
  '/admin/users': 'User Registry',
  '/admin/finance': 'Financial Brief',
};

const AdminHeader = () => {
  const { user } = useAuth();
  const location = useLocation();

  const currentTitle = routeTitles[location.pathname] || 'Mission Control';
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'AD';

  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="header-breadcrumb">
          Mission Control <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>{' '}
          <span>{currentTitle}</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-status">
          <div className="status-dot" />
          <span>All Systems Nominal</span>
        </div>

        <button
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--hud-border)',
            borderRadius: 10,
            padding: '8px',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Notifications"
        >
          <Bell size={16} />
        </button>

        <div className="header-user">
          <div className="header-avatar">{initials}</div>
          <div className="header-user-info">
            <span className="header-user-name">{user?.name || 'Admin'}</span>
            <span className="header-user-role">
              <Shield size={10} />
              {user?.role || 'admin'}
              {user?.role === 'specialist' && (
                <span
                  style={{
                    color: 'var(--hud-cyan)',
                    marginLeft: 2,
                    fontSize: '0.7rem',
                  }}
                  title="Verified Specialist"
                >
                  ✓
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
