import { useEmergencyStore } from "../../app/store";

export default function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incidents: liveIncidents } = useEmergencyStore();

  const incident = liveIncidents?.find((i) => (i._id || i.id) === id) || incidents.find((i) => i.id === id);

  if (!incident) {
    logger.warn(`Incident not found in details view: ${id}`);
    return (
      <div className="max-w-3xl mx-auto p-12 text-center bg-slate-900 rounded-3xl border border-slate-800">
        <p className="text-slate-400 mb-6">Incident not found or has been resolved.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl border border-slate-700 hover:bg-slate-700 transition-all font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Incident Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-400 hover:underline flex items-center gap-1"
        >
          ← Back to Feed
        </button>
      </div>

      {/* Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-center">
          <span className="font-mono text-sm text-slate-500">{incident.id || incident._id || 'ID_MISSING'}</span>
          <SeverityBadge severity={incident.severity || 'Unknown'} />
        </div>

        <div className="border-l-4 border-blue-500 pl-4 py-1">
          <p className="text-2xl font-bold text-white leading-tight">
            {typeof incident.location === 'string'
              ? incident.location
              : incident.location?.coordinates
                ? `Active SOS at ${incident.location.coordinates[1].toFixed(4)}, ${incident.location.coordinates[0].toFixed(4)}`
                : 'Location Not Specified'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm border-t border-white/5 pt-6">
          <div className="space-y-1">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Current Status</p>
            <p className="text-slate-200 font-medium">{incident.status || 'Active'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Impact Force</p>
            <p className="text-slate-200 font-medium">{incident.force ?? incident.telemetry?.force_n ?? '0'} N</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Reported Time</p>
            <p className="text-slate-200 font-medium">
              {incident.time || (incident.createdAt ? new Date(incident.createdAt).toLocaleTimeString() : '--:--')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Mission Coordinates</p>
            <p className="text-slate-200 font-medium">
              {incident.location?.coordinates
                ? `${incident.location.coordinates[1].toFixed(4)}, ${incident.location.coordinates[0].toFixed(4)}`
                : incident.lat
                  ? `${incident.lat.toFixed(4)}, ${incident.lng.toFixed(4)}`
                  : 'N/A'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="flex-1 py-4 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 rounded-2xl font-bold transition-all">
            Notify Nearby Police
          </button>
          <button className="flex-1 py-4 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/20 rounded-2xl font-bold transition-all">
            Dispatch Medical Team
          </button>
        </div>
      </div>
    </div>
  );
}
