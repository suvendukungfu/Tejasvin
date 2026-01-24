import { useParams, useNavigate } from "react-router-dom";
import { incidents } from "./data/mockIncidents";
import SeverityBadge from "./components/SeverityBadge";

export default function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const incident = incidents.find((i) => i.id === id);

  if (!incident) {
    return (
      <p className="text-slate-400">Incident not found.</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Incident Details
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-400 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">{incident.id}</span>
          <SeverityBadge severity={incident.severity} />
        </div>

        <p className="text-slate-300">
          📍 {incident.location}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p>
            <span className="text-slate-400">Status:</span>{" "}
            {incident.status}
          </p>
          <p>
            <span className="text-slate-400">Impact Force:</span>{" "}
            {incident.force} N
          </p>
          <p>
            <span className="text-slate-400">Reported:</span>{" "}
            {incident.time}
          </p>
          <p>
            <span className="text-slate-400">Coordinates:</span>{" "}
            {incident.lat}, {incident.lng}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg">
            Notify Police
          </button>
          <button className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg">
            Dispatch Hospital
          </button>
        </div>

      </div>
    </div>
  );
}
