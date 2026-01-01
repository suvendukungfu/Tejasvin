import { useNavigate } from "react-router-dom";
import SeverityBadge from "./SeverityBadge";

export default function IncidentItem({ incident }) {
  const navigate = useNavigate();

  const isCritical =
    incident.severity === "Critical" && incident.status === "Active";

  return (
    <div
      onClick={() => navigate(`/incident/${incident.id}`)}
      className={`
        bg-slate-900 border rounded-xl p-4 cursor-pointer transition
        ${isCritical
          ? "border-red-500/60 ring-2 ring-red-500/40 animate-pulse"
          : "border-slate-800 hover:border-slate-700 hover:bg-slate-800/40"}
      `}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white">
          {incident.id}
        </span>
        <SeverityBadge severity={incident.severity} />
      </div>

      {/* Location */}
      <p className="text-sm text-slate-300 mb-1">
        📍 {incident.location}
      </p>

      {/* Meta */}
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>{incident.time}</span>
        <span>
          Impact: <span className="text-slate-300">{incident.force} N</span>
        </span>
      </div>

      {/* Status */}
      <div className="mt-3">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            incident.status === "Active"
              ? "bg-red-500/10 text-red-400"
              : "bg-green-500/10 text-green-400"
          }`}
        >
          {incident.status}
        </span>
      </div>
    </div>
  );
}
