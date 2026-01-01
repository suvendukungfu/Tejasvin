import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { incidents } from "../../data/mockIncidents";

// Normal marker
const normalIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

// Pulsing marker for critical
const criticalPulseIcon = new L.DivIcon({
  className: "leaflet-critical-pulse",
  html: `<div style="
    width:14px;
    height:14px;
    background:#ef4444;
    border-radius:50%;
    border:2px solid white;
  "></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export default function IncidentMap() {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={12}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {incidents.map((incident) => {
        const isCritical =
          incident.severity === "Critical" && incident.status === "Active";

        return (
          <Marker
            key={incident.id}
            position={[incident.lat, incident.lng]}
            icon={
              isCritical
                ? criticalPulseIcon
                : normalIcon(
                    incident.severity === "Severe"
                      ? "orange"
                      : incident.severity === "Moderate"
                      ? "yellow"
                      : "green"
                  )
            }
            eventHandlers={{
              click: () => navigate(`/incident/${incident.id}`),
            }}
          >
            <Popup>
              <strong>{incident.id}</strong>
              <br />
              {incident.location}
              <br />
              Severity: {incident.severity}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
