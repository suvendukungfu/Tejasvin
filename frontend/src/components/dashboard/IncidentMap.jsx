import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { incidents } from "../../data/mockIncidents";

/* =========================
   Normal Colored Marker
   ========================= */
const normalIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

/* =========================
   Critical Pulse Marker
   ========================= */
const criticalPulseIcon = new L.DivIcon({
  className: "leaflet-critical-pulse",
  html: `
    <div style="
      width:14px;
      height:14px;
      background:#ef4444;
      border-radius:50%;
      border:2px solid white;
    "></div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

/* =========================
   Position Offset Helper
   ========================= */
const getPosition = (incident, index) => {
  if (incident.severity === "Critical") {
    return [incident.lat, incident.lng];
  }
  // slight offset to avoid overlapping nearby incidents
  const offset = 0.00015 * index;
  return [incident.lat + offset, incident.lng + offset];
};

/* =========================
   Incident Map Component
   ========================= */
export default function IncidentMap() {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={12}
      className="h-full w-full rounded-xl"
    >
      {/* Dark Map Tiles */}
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {incidents.map((incident, index) => {
        const isCritical =
          incident.severity === "Critical" && incident.status === "Active";

        const markerColor =
          incident.severity === "Severe"
            ? "orange"
            : incident.severity === "Moderate"
            ? "yellow"
            : "green";

        return (
          <Marker
            key={incident.id}
            position={getPosition(incident, index)}
            icon={isCritical ? criticalPulseIcon : normalIcon(markerColor)}
            zIndexOffset={isCritical ? 1000 : 400}
            eventHandlers={{
              click: () => navigate(`/incident/${incident.id}`),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{incident.id}</p>
                <p>{incident.location}</p>
                <p>Severity: {incident.severity}</p>
                <p>Status: {incident.status}</p>
                <p>Impact: {incident.force} N</p>
                <p className="text-blue-400 mt-1 cursor-pointer">
                  Click for details →
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
