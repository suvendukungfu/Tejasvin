// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useNavigate } from "react-router-dom";
// import L from "leaflet";
// import { incidents } from "../../data/mockIncidents";
// import MarkerClusterGroup from "react-leaflet-cluster";


// /* =========================
//    Normal Colored Marker
//    ========================= */
// const normalIcon = (color) =>
//   new L.Icon({
//     iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
//     shadowUrl:
//       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

// /* =========================
//    Critical Pulse Marker
//    ========================= */
// const criticalPulseIcon = new L.DivIcon({
//   className: "leaflet-critical-pulse",
//   html: `
//     <div style="
//       width:14px;
//       height:14px;
//       background:#ef4444;
//       border-radius:50%;
//       border:2px solid white;
//     "></div>
//   `,
//   iconSize: [30, 30],
//   iconAnchor: [15, 15],
// });

// /* =========================
//    Position Offset Helper
//    ========================= */
// const getPosition = (incident, index) => {
//   if (incident.severity === "Critical") {
//     return [incident.lat, incident.lng];
//   }
//   // slight offset to avoid overlapping nearby incidents
//   const offset = 0.00015 * index;
//   return [incident.lat + offset, incident.lng + offset];
// };

// /* =========================
//    Incident Map Component
//    ========================= */
// export default function IncidentMap() {
//   const navigate = useNavigate();

//   return (
//     <MapContainer
//       center={[28.6139, 77.209]}
//       zoom={12}
//       className="h-full w-full rounded-xl"
//     >
//       {/* Dark Map Tiles */}
//       <TileLayer
//         attribution="© OpenStreetMap contributors"
//         url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
//       />

//       {incidents.map((incident, index) => {
//         const isCritical =
//           incident.severity === "Critical" && incident.status === "Active";

//         const markerColor =
//           incident.severity === "Severe"
//             ? "orange"
//             : incident.severity === "Moderate"
//             ? "yellow"
//             : "green";

//         return (
//           <Marker
//             key={incident.id}
//             position={getPosition(incident, index)}
//             icon={isCritical ? criticalPulseIcon : normalIcon(markerColor)}
//             zIndexOffset={isCritical ? 1000 : 400}
//             eventHandlers={{
//               click: () => navigate(`/incident/${incident.id}`),
//             }}
//           >
//             <Popup>
//               <div className="text-sm">
//                 <p className="font-semibold">{incident.id}</p>
//                 <p>{incident.location}</p>
//                 <p>Severity: {incident.severity}</p>
//                 <p>Status: {incident.status}</p>
//                 <p>Impact: {incident.force} N</p>
//                 <p className="text-blue-400 mt-1 cursor-pointer">
//                   Click for details →
//                 </p>
//               </div>
//             </Popup>
//           </Marker>
//         );
//       })}
//     </MapContainer>
//   );
// }
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.heat";

import { incidents } from "../data/mockIncidents";
import MapControls from "./MapControls";
import { useEmergencyStore } from "../../../app/store";
import logger from "../../../utils/logger";

/* ---------- Icons ---------- */
const normalIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

const criticalPulseIcon = new L.DivIcon({
  className: "leaflet-critical-pulse",
  html: `<div style="width:14px;height:14px;background:#ef4444;border-radius:50%;border:2px solid white"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

/* ---------- Heatmap Layer ---------- */
function HeatmapLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    if (!Array.isArray(data)) return;

    const points = data
      .filter(i => i && typeof i.lat === 'number' && typeof i.lng === 'number')
      .map((i) => [
        i.lat,
        i.lng,
        i.severity === "Critical" ? 1 : 0.5,
      ]);

    if (points.length === 0) return;

    try {
      const heat = L.heatLayer(points, {
        radius: 35,
        blur: 25,
        maxZoom: 13,
      }).addTo(map);

      return () => map.removeLayer(heat);
    } catch (error) {
      logger.error("Failed to initialize HeatmapLayer", error);
    }
  }, [map, data]);

  return null;
}

/* ---------- Offset ---------- */
const getPosition = (i, idx) => {
  if (!i) return [28.6139, 77.209];

  // Support both GeoJSON (Backend) and lat/lng (Mock)
  let lat = i.lat;
  let lng = i.lng;

  if (i.location && i.location.coordinates) {
    lng = i.location.coordinates[0];
    lat = i.location.coordinates[1];
  }

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return [28.6139, 77.209];
  }

  if (i.severity === "Critical") return [lat, lng];
  const o = 0.00015 * idx;
  return [lat + o, lng + o];
};

/* ---------- Map ---------- */
export default function IncidentMap() {
  const navigate = useNavigate();

  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showRadius, setShowRadius] = useState(true);
  const [showCluster, setShowCluster] = useState(true);

  const { incidents: liveIncidents, fetchIncidents, activeResponders } = useEmergencyStore();

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 10000); // Poll every 10s for dashboard updates
    return () => clearInterval(interval);
  }, [fetchIncidents]);

  // Combine live and mock data for demo, or just use live if available
  const displayIncidents = liveIncidents && liveIncidents.length > 0 ? liveIncidents : incidents;

  const responderIcon = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="relative h-full w-full">

      {/* MAP CONTROLS */}
      <MapControls
        showHeatmap={showHeatmap}
        setShowHeatmap={setShowHeatmap}
        showRadius={showRadius}
        setShowRadius={setShowRadius}
        showCluster={showCluster}
        setShowCluster={setShowCluster}
      />

      <MapContainer
        center={[28.6139, 77.209]}
        zoom={12}
        className="h-full w-full rounded-xl"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {/* HEATMAP */}
        {showHeatmap && <HeatmapLayer data={displayIncidents} />}

        {/* ALERT RADIUS */}
        {showRadius && Array.isArray(displayIncidents) &&
          displayIncidents.map((i) => {
            const pos = getPosition(i, 0);
            return (
              <Circle
                key={`r-${i.id || i._id || Math.random()}`}
                center={pos}
                radius={i.severity === "Critical" ? 1000 : 500}
                pathOptions={{
                  color: i.severity === "Critical" ? "#ef4444" : "#facc15",
                  fillOpacity: 0.08,
                }}
              />
            );
          })}

        {/* MARKERS */}
        {Array.isArray(displayIncidents) && (showCluster ? (
          <MarkerClusterGroup>
            {displayIncidents.map(renderMarker)}
          </MarkerClusterGroup>
        ) : (
          displayIncidents.map(renderMarker)
        ))}

        {/* LIVE RESPONDERS */}
        {activeResponders && Object.values(activeResponders).map((responder, idx) => {
          if (!responder || typeof responder.lat !== 'number' || typeof responder.lng !== 'number') return null;
          return (
            <Marker
              key={`responder-${idx}`}
              position={[responder.lat, responder.lng]}
              icon={responderIcon}
              zIndexOffset={2000}
            >
              <Popup>
                <strong>Responder: {responder.name || 'Unknown'}</strong>
                <br />
                Status: On Route
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );

  function renderMarker(i, idx) {
    const isCritical =
      i.severity === "Critical" && i.status === "Active";

    const color =
      i.severity === "Severe"
        ? "orange"
        : i.severity === "Moderate"
          ? "yellow"
          : "green";

    return (
      <Marker
        key={i.id || i._id}
        position={getPosition(i, idx)}
        icon={isCritical ? criticalPulseIcon : normalIcon(color)}
        zIndexOffset={isCritical ? 1000 : 400}
        eventHandlers={{
          click: () => navigate(`/incident/${i.id || i._id}`),
        }}
      >
        <Popup>
          <strong>{i.id || i._id}</strong>
          <br />
          {typeof i.location === 'string'
            ? i.location
            : i.location?.coordinates
              ? `Coords: ${i.location.coordinates[1].toFixed(4)}, ${i.location.coordinates[0].toFixed(4)}`
              : 'Location Not Provided'}
          <br />
          AI Confidence: {(i.confidence ? i.confidence * 100 : 0).toFixed(1)}%
        </Popup>
      </Marker>
    );
  }
}
