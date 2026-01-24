import StatsCard from "./components/StatsCard";
import IncidentItem from "./components/IncidentItem";
import LiveMap from "../map/components/LiveMap";
import { incidents } from "./data/mockIncidents";

export default function Dashboard() {
  // Derived metrics (later these will come from backend)
  const activeIncidents = incidents.filter(
    (i) => i.status === "Active"
  ).length;

  return (
    <div className="space-y-8">

      {/* ================= KPI / STATS SECTION ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatsCard
          title="Active Incidents"
          value={activeIncidents}
          subtitle="Currently ongoing"
          color="#ef4444"
          danger={activeIncidents > 0}
        />

        <StatsCard
          title="Incidents Today"
          value={38}
          subtitle="Reported today"
          color="#f59e0b"
        />

        <StatsCard
          title="Avg Response Time"
          value={4.2}
          subtitle="Emergency dispatch (min)"
          color="#3b82f6"
        />

        <StatsCard
          title="Resolved"
          value={26}
          subtitle="Cases closed"
          color="#22c55e"
        />
      </div>

      {/* ================= MAIN DASHBOARD SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: LIVE INCIDENT MAP */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl h-[420px] p-2 relative z-0">
          <LiveMap />
        </div>
        {/* Right: INCIDENT TIMELINE */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-[420px] overflow-y-auto">

          <h3 className="text-sm font-semibold text-white mb-4">
            Live Incident Timeline
          </h3>

          <div className="space-y-6">
            {incidents.map((incident) => (
              <IncidentItem key={incident.id} incident={incident} />
            ))}
          </div>

        </div>


        {/* Right: INCIDENT FEED */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-[420px] overflow-y-auto">

          <h3 className="text-sm font-semibold text-white mb-4">
            Live Incident Feed
          </h3>

          <div className="space-y-4">
            {incidents.map((incident) => (
              <IncidentItem key={incident.id} incident={incident} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
