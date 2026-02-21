import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import { financialRecords, revenueBySector, sectorDistribution } from '../../data/adminMockData';

const Finance = () => {
  const totalFunding = financialRecords
    .filter((r) => (r.type === 'funding' || r.type === 'donation') && r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = financialRecords
    .filter((r) => (r.type === 'expedition_cost' || r.type === 'payout') && r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0);

  const pending = financialRecords.filter((r) => r.status === 'pending');
  const pendingTotal = pending.reduce((sum, r) => sum + r.amount, 0);

  return (
    <>
      <div className="page-header">
        <h1>
          Financial <span className="page-header-accent">Brief</span>
        </h1>
        <p>Budget allocation, expedition costs, payouts, and funding analytics</p>
      </div>

      {/* Financial Stats */}
      <div className="stats-grid">
        <StatsCard
          title="Total Funding"
          value={`₹${(totalFunding / 100000).toFixed(1)}L`}
          icon={<TrendingUp size={18} />}
          accentColor="#00e676"
          trend={{ value: '+18% vs last quarter', direction: 'up' }}
          delay={0}
        />
        <StatsCard
          title="Total Expenses"
          value={`₹${(totalExpenses / 100000).toFixed(1)}L`}
          icon={<ArrowDownRight size={18} />}
          accentColor="#ff5252"
          delay={0.1}
        />
        <StatsCard
          title="Net Balance"
          value={`₹${((totalFunding - totalExpenses) / 100000).toFixed(1)}L`}
          icon={<Wallet size={18} />}
          accentColor="#00e5ff"
          trend={{ value: 'Healthy', direction: 'up' }}
          delay={0.2}
        />
        <StatsCard
          title="Pending Actions"
          value={`₹${(pendingTotal / 1000).toFixed(0)}K`}
          icon={<Clock size={18} />}
          accentColor="#ffab00"
          trend={{ value: `${pending.length} items`, direction: 'down' }}
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="admin-grid-2">
        {/* Revenue vs Expenses by Sector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hud-card"
        >
          <div className="hud-card-header">
            <h3 className="hud-card-title">Revenue vs Expenses by Sector</h3>
            <ArrowUpRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
          </div>
          <div className="hud-card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueBySector} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" />
                  <YAxis tickFormatter={(v: number) => `₹${v / 1000}K`} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(12, 18, 30, 0.95)',
                      border: '1px solid rgba(0, 229, 255, 0.15)',
                      borderRadius: 10,
                    }}
                    formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
                  />
                  <Bar dataKey="revenue" name="Revenue" fill="#00e5ff" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#ff5252" radius={[4, 4, 0, 0]} opacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Sector Distribution Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hud-card"
        >
          <div className="hud-card-header">
            <h3 className="hud-card-title">Heritage Sites by Sector</h3>
          </div>
          <div className="hud-card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorDistribution}
                    dataKey="sites"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={55}
                    paddingAngle={3}
                    stroke="transparent"
                  >
                    {sectorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(12, 18, 30, 0.95)',
                      border: '1px solid rgba(0, 229, 255, 0.15)',
                      borderRadius: 10,
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transaction Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hud-card"
      >
        <div className="hud-card-header">
          <h3 className="hud-card-title">Transaction Log</h3>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--hud-font-mono)' }}>
            {financialRecords.length} RECORDS
          </span>
        </div>
        <table className="hud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Sector</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {financialRecords.map((record) => (
              <tr key={record.id}>
                <td className="mono">{record.id}</td>
                <td>
                  <span
                    className={`badge ${
                      record.type === 'funding' || record.type === 'donation'
                        ? 'badge-active'
                        : record.type === 'payout'
                        ? 'badge-pending'
                        : 'badge-restricted'
                    }`}
                  >
                    {record.type.replace('_', ' ')}
                  </span>
                </td>
                <td style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {record.description}
                </td>
                <td style={{ color: 'rgba(255,255,255,0.5)' }}>{record.sectorName}</td>
                <td>
                  <span
                    style={{
                      fontFamily: 'var(--hud-font-mono)',
                      fontWeight: 600,
                      color:
                        record.type === 'funding' || record.type === 'donation'
                          ? 'var(--hud-green)'
                          : 'var(--hud-red)',
                    }}
                  >
                    {record.type === 'funding' || record.type === 'donation' ? '+' : '-'}₹
                    {record.amount.toLocaleString()}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-${record.status}`}>{record.status}</span>
                </td>
                <td
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'var(--hud-font-mono)',
                    fontSize: '0.78rem',
                  }}
                >
                  {new Date(record.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </>
  );
};

export default Finance;
