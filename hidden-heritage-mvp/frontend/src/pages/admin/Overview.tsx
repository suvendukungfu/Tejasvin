import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { MapPin, Compass, BadgeCheck, Wallet, TrendingUp, AlertTriangle } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import { dashboardStats, monthlyTrends, fieldReports } from '../../data/adminMockData';

const Overview = () => {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <h1>
          System <span className="page-header-accent">Overview</span>
        </h1>
        <p>Real-time operational intelligence across all heritage sectors</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatsCard
          title="Heritage Sites"
          value={dashboardStats.totalHeritageSites}
          icon={<MapPin size={18} />}
          accentColor="#00e5ff"
          trend={{ value: `+${dashboardStats.sitesDiscoveredThisMonth} this month`, direction: 'up' }}
          delay={0}
        />
        <StatsCard
          title="Active Expeditions"
          value={dashboardStats.activeExpeditions}
          icon={<Compass size={18} />}
          accentColor="#ffab00"
          trend={{ value: '+12% vs last quarter', direction: 'up' }}
          delay={0.1}
        />
        <StatsCard
          title="Verified Specialists"
          value={dashboardStats.verifiedSpecialists}
          icon={<BadgeCheck size={18} />}
          accentColor="#00e676"
          trend={{ value: '+8 new this month', direction: 'up' }}
          delay={0.2}
        />
        <StatsCard
          title="Total Funding"
          value={`₹${(dashboardStats.totalFunding / 100000).toFixed(1)}L`}
          icon={<Wallet size={18} />}
          accentColor="#e040fb"
          trend={{ value: '+18% YoY', direction: 'up' }}
          delay={0.3}
        />
        <StatsCard
          title="Pending Verifications"
          value={dashboardStats.pendingVerifications}
          icon={<AlertTriangle size={18} />}
          accentColor="#ff5252"
          trend={{ value: '3 urgent', direction: 'down' }}
          delay={0.4}
        />
        <StatsCard
          title="Discovery Trend"
          value={`+${dashboardStats.sitesDiscoveredThisMonth}`}
          icon={<TrendingUp size={18} />}
          accentColor="#00e5ff"
          trend={{ value: 'Peak this quarter', direction: 'up' }}
          delay={0.5}
        />
      </div>

      {/* Charts & Reports */}
      <div className="admin-grid-2-1">
        {/* Expedition Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hud-card"
        >
          <div className="hud-card-header">
            <h3 className="hud-card-title">Expedition Activity</h3>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--hud-font-mono)' }}>
              LAST 6 MONTHS
            </span>
          </div>
          <div className="hud-card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <defs>
                    <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradAmber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffab00" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ffab00" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(12, 18, 30, 0.95)',
                      border: '1px solid rgba(0, 229, 255, 0.15)',
                      borderRadius: 10,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="expeditions"
                    stroke="#00e5ff"
                    strokeWidth={2}
                    fill="url(#gradCyan)"
                    name="Expeditions"
                  />
                  <Area
                    type="monotone"
                    dataKey="discoveries"
                    stroke="#ffab00"
                    strokeWidth={2}
                    fill="url(#gradAmber)"
                    name="Discoveries"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Recent Field Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hud-card"
        >
          <div className="hud-card-header">
            <h3 className="hud-card-title">Field Reports</h3>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--hud-font-mono)' }}>
              RECENT
            </span>
          </div>
          <div className="hud-card-body" style={{ padding: '12px 16px' }}>
            <div className="report-feed">
              {fieldReports.slice(0, 4).map((report) => (
                <div key={report.id} className="report-item">
                  <div className="report-item-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className={`priority-indicator priority-${report.priority}`} />
                        <span className="report-item-explorer">{report.explorerName}</span>
                      </div>
                      <div className="report-item-location">{report.location}</div>
                    </div>
                    <span className="report-item-time">
                      {new Date(report.timestamp).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <p className="report-item-summary">{report.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Overview;
