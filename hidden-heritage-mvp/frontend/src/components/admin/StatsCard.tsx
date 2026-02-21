import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  accentColor: string;
  trend?: { value: string; direction: 'up' | 'down' };
  delay?: number;
}

const StatsCard = ({ title, value, icon, accentColor, trend, delay = 0 }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0, 0, 1] }}
      className="stats-card"
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div className="stats-card-header">
        <span className="stats-card-label">{title}</span>
        <div
          className="stats-card-icon"
          style={{
            background: `${accentColor}15`,
            color: accentColor,
          }}
        >
          {icon}
        </div>
      </div>
      <div className="stats-card-value">{value}</div>
      {trend && (
        <div className={`stats-card-trend ${trend.direction}`}>
          <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
          {trend.value}
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;
