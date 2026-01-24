import { useAnimatedCounter } from "../../../hooks/useAnimatedCounter";
import clsx from "clsx";

export default function StatsCard({
  title,
  value,
  subtitle,
  color,
  danger = false,
}) {
  const animatedValue = useAnimatedCounter(value, 900);

  return (
    <div
      className={clsx(
        "relative rounded-xl p-5 transition-all duration-300 group overflow-hidden",
        "hover:-translate-y-1 hover:shadow-2xl",
        danger
          ? "bg-red-900/10 border border-red-500/30"
          : "bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl"
      )}
    >
      {/* Background Glow for Danger items */}
      {danger && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-50" />
      )}

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
            {title}
          </h3>
          <span
            className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: color, color: color }}
          />
        </div>

        <div className="text-4xl font-display font-semibold text-white tracking-tight">
          {animatedValue}
        </div>

        <p className="text-xs font-medium text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
