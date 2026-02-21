import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Map,
  Compass,
  Users,
  Wallet,
  LogOut,
  ChevronLeft,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Sectors', path: '/admin/sectors', icon: Map },
  { label: 'Missions', path: '/admin/missions', icon: Compass },
  { label: 'User Registry', path: '/admin/users', icon: Users },
  { label: 'Financial Brief', path: '/admin/finance', icon: Wallet },
];

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay"
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 45,
            }}
          />
        )}
      </AnimatePresence>

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">HH</div>
          <div className="sidebar-logo-text">
            <span>Hidden Heritage</span>
            <span>Mission Control v2.0</span>
          </div>
          <button
            onClick={onClose}
            style={{
              display: 'none',
              marginLeft: 'auto',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              padding: 4,
            }}
            className="sidebar-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Operations</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <item.icon size={18} className="sidebar-link-icon" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="sidebar-section-label" style={{ marginTop: 16 }}>
            Future Modules
          </div>
          <div
            className="sidebar-link"
            style={{ cursor: 'default', opacity: 0.3 }}
            title="Coming soon"
          >
            <ChevronLeft
              size={18}
              className="sidebar-link-icon"
              style={{ transform: 'rotate(180deg)' }}
            />
            <span>Field Reports</span>
          </div>
          <div
            className="sidebar-link"
            style={{ cursor: 'default', opacity: 0.3 }}
            title="Coming soon"
          >
            <ChevronLeft
              size={18}
              className="sidebar-link-icon"
              style={{ transform: 'rotate(180deg)' }}
            />
            <span>AR Relic Viewer</span>
          </div>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <LogOut size={16} />
            <span>End Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
