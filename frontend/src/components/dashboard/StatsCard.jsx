export default function StatsCard({ title, value, subtitle, color }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm text-slate-400">{title}</h3>
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Main Value */}
      <div className="text-3xl font-semibold text-white">
        {value}
      </div>

      {/* Subtitle */}
      <p className="text-sm text-slate-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
}
