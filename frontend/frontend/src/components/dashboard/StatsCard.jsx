import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

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
      className={`
        relative bg-slate-900 border rounded-xl p-5 transition
        hover:-translate-y-1 hover:shadow-xl
        ${
          danger
            ? "border-red-500/50 ring-2 ring-red-500/30"
            : "border-slate-800 hover:border-slate-700"
        }
      `}
    >
      {danger && (
        <div className="absolute inset-0 rounded-xl bg-red-500/10 blur-xl" />
      )}

      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-slate-400">{title}</h3>
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>

        <div className="text-3xl font-semibold text-white">
          {animatedValue}
        </div>

        <p className="text-sm text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
