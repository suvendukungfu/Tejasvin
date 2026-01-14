export default function SeverityBadge({ severity }) {
  const severityStyles = {
    Critical: "bg-red-500/20 text-red-400 border-red-500/40",
    Severe: "bg-orange-500/20 text-orange-400 border-orange-500/40",
    Moderate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    Minor: "bg-green-500/20 text-green-400 border-green-500/40",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border ${
        severityStyles[severity] || "bg-slate-700 text-slate-300"
      }`}
    >
      {severity}
    </span>
  );
}
