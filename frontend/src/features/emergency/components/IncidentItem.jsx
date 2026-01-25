import SeverityBadge from "./SeverityBadge";
import clsx from "clsx";
import { Clock, MapPin, Activity } from "lucide-react";
import { useMissionStore } from "../../../app/store";

export default function IncidentItem({ incident }) {
  const { offerMission } = useMissionStore();

  if (!incident) return null;

  const isCritical = incident.severity === "Critical" && incident.status === "Active";

  const dotColor =
    incident.severity === "Critical"
      ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
      : incident.severity === "Severe"
        ? "bg-orange-500"
        : incident.severity === "Moderate"
          ? "bg-yellow-400"
          : "bg-green-500";

  return (
    <div className="relative pl-8 group">
      {/* Timeline vertical line */}
      <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-slate-800 group-hover:bg-slate-700 transition" />

      {/* Severity dot */}
      <div
        className={clsx(
          "absolute left-[6px] top-6 w-3 h-3 rounded-full border border-slate-900 z-10",
          dotColor,
          isCritical && "animate-ping"
        )}
      />

      {/* Static dot for ping center */}
      {isCritical && (
        <div className={clsx("absolute left-[6px] top-6 w-3 h-3 rounded-full z-10", dotColor)} />
      )}

      {/* Incident Card */}
      <div
        onClick={() => incident && offerMission(incident)} // Added guard
        className={clsx(
          "relative rounded-xl p-4 cursor-pointer transition-all duration-200 border",
          "hover:-translate-y-0.5 hover:shadow-lg group-hover:bg-slate-800/20",
          isCritical
            ? "bg-red-950/20 border-red-500/20 shadow-[0_0_20px_rgba(220,38,38,0.1)]"
            : "bg-slate-900/40 border-slate-800/60"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-slate-400">
            {incident.id || incident._id || 'ID_MISSING'}
          </span>
          <SeverityBadge severity={incident.severity || 'Unknown'} />
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-4 h-4 text-action-base mt-0.5" />
          <p className="text-sm font-medium text-slate-200 leading-tight">
            {typeof incident.location === 'string'
              ? incident.location
              : incident.location?.coordinates
                ? `Coords: ${incident.location.coordinates[1].toFixed(4)}, ${incident.location.coordinates[0].toFixed(4)}`
                : 'Location Not Provided'}
          </p>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 border-t border-white/5 pt-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{incident.time || (incident.createdAt ? new Date(incident.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--')}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Activity className="w-3.5 h-3.5" />
            <span>{incident.force ?? incident.telemetry?.force_n ?? '0'} N</span>
          </div>
        </div>

        {/* Hover Action Hint (Subtle) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
          <span className="text-slate-500">→</span>
        </div>
      </div>
    </div>
  );
}
