import { useEffect, useState } from "react";
import StatsCard from "./components/StatsCard";
import IncidentItem from "./components/IncidentItem";
import LiveMap from "../map/components/LiveMap";
import api from "../../services/api";
import logger from "../../utils/logger";
import SkeletonCard from "./components/SkeletonCard";

export default function Dashboard() {
  const [stats, setStats] = useState({ activeSOS: 0, criticalSOS: 0, totalSaves: 0 });
  const [activeIncidents, setActiveIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, incidentsRes] = await Promise.all([
          api.get("/incidents/stats"),
          api.get("/incidents")
        ]);

        if (statsRes && statsRes.data) {
          setStats(statsRes.data);
        }

        if (incidentsRes && Array.isArray(incidentsRes.data)) {
          setActiveIncidents(incidentsRes.data);
        } else {
          setActiveIncidents([]);
        }
      } catch (err) {
        logger.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // 10s polling for live dashboard

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">

      {/* ================= KPI / STATS SECTION ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatsCard
              title="Active SOS"
              value={stats.activeSOS}
              subtitle="Emergency alerts"
              color="#ef4444"
              danger={stats.activeSOS > 0}
            />

            <StatsCard
              title="Critical Alerts"
              value={stats.criticalSOS}
              subtitle="Life-threatening"
              color="#f59e0b"
              danger={stats.criticalSOS > 0}
            />

            <StatsCard
              title="Avg Response Time"
              value={4.2}
              subtitle="Live average (min)"
              color="#3b82f6"
            />

            <StatsCard
              title="Total Saves"
              value={stats.totalSaves}
              subtitle="Successful rescues"
              color="#22c55e"
            />
          </>
        )}
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
            Live Incident Feed
          </h3>

          <div className="space-y-4">
            {activeIncidents.length > 0 ? (
              activeIncidents.map((incident) => (
                <IncidentItem key={incident._id || incident.id} incident={incident} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-600 italic text-sm">
                No active incidents reported.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
