import StatsCard from "../components/dashboard/StatsCard";
import IncidentItem from "../components/dashboard/IncidentItem";
import { incidents } from "../data/mockIncidents";
import IncidentMap from "../components/dashboard/IncidentMap";


export default function Dashboard() {
  return (
    <div className="space-y-8">
      
      {/* ================= KPI / STATS SECTION ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Incidents"
          value="12"
          subtitle="Currently ongoing"
          color="#ef4444"
        />

        <StatsCard
          title="Incidents Today"
          value="38"
          subtitle="Reported today"
          color="#f59e0b"
        />

        <StatsCard
          title="Avg Response Time"
          value="4.2 min"
          subtitle="Emergency dispatch"
          color="#3b82f6"
        />

        <StatsCard
          title="Resolved"
          value="26"
          subtitle="Cases closed"
          color="#22c55e"
        />
      </div>

      {/* ================= MAIN DASHBOARD SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: MAP PLACEHOLDER (NEXT STEP) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center h-[420px]">
          <p className="text-slate-400 text-sm">
            🗺️ Live Incident Map (coming next)
          </p>
              </div>
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl h-[420px] p-2">
  <IncidentMap />
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
