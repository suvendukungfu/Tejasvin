import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { incidents } from "../../data/mockIncidents";

// Marker colors by severity
const severityIcon = (severity) => {
  const colors = {
    Critical: "red",
    Severe: "orange",
    Moderate: "yellow",
    Minor: "green",
  };

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${colors[severity] || "blue"}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
};

export default function IncidentMap() {
  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={12}
      className="h-full w-full rounded-xl"
    >
      {/* Dark map tiles */}
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {incidents.map((incident) => (
        <Marker
          key={incident.id}
          position={[incident.lat, incident.lng]}
          icon={severityIcon(incident.severity)}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{incident.id}</p>
              <p>{incident.location}</p>
              <p>Severity: {incident.severity}</p>
              <p>Status: {incident.status}</p>
              <p>Impact: {incident.force} N</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
