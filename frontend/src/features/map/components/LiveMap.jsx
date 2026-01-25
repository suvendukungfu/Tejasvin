import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useUserStore, useMissionStore } from "../../../app/store";
import { useGeolocation } from "../hooks/useGeolocation";
import { incidents } from "../../emergency/data/mockIncidents"; // Adjusted path
import { Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Sub-component to handle map centering
function RecenterMap({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.flyTo([lat, lng], 15);
        }
    }, [lat, lng, map]);
    return null;
}

export default function LiveMap() {
    // Start tracking
    useGeolocation();

    const { location, locationPermission } = useUserStore();
    const { activeMission, missionStatus } = useMissionStore();

    // Default center (New Delhi as fallback)
    const defaultCenter = [28.6139, 77.2090];
    const center = (location && typeof location.lat === 'number' && typeof location.lng === 'number')
        ? [location.lat, location.lng]
        : defaultCenter;

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden z-0">

            {/* Map Control Buttons */}
            <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
                <button
                    onClick={() => {/* Trigger recenter logic via state or ref if needed */ }}
                    className="p-2 bg-slate-800 text-white rounded-lg shadow-lg hover:bg-slate-700"
                    title="Recenter"
                >
                    <Navigation className="w-5 h-5" />
                </button>
            </div>

            <MapContainer
                center={center}
                zoom={13}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Auto Recenter */}
                {location && <RecenterMap lat={location.lat} lng={location.lng} />}

                {/* User Marker (Blue Pulse) */}
                {location && typeof location.lat === 'number' && typeof location.lng === 'number' && (
                    <Marker
                        position={[location.lat, location.lng]}
                        icon={L.divIcon({
                            className: "bg-transparent",
                            html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg relative">
                        <div class="absolute inset-[-8px] bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                      </div>`
                        })}
                    >
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                {/* Navigation Route (Simulated) */}
                {missionStatus === 'ON_ROUTE' &&
                    location && typeof location.lat === 'number' && typeof location.lng === 'number' &&
                    activeMission && typeof activeMission.lat === 'number' && typeof activeMission.lng === 'number' && (
                        <Polyline
                            positions={[
                                [location.lat, location.lng],
                                [activeMission.lat, activeMission.lng]
                            ]}
                            color="#3b82f6"
                            weight={4}
                            dashArray="10, 10"
                            className="animate-pulse"
                        />
                    )}

                {/* Incident Markers */}
                <MarkerClusterGroup chunkedLoading>
                    {Array.isArray(incidents) && incidents.map((incident) => {
                        if (!incident || typeof incident.lat !== 'number' || typeof incident.lng !== 'number') return null;
                        return (
                            <Marker
                                key={incident.id || `${incident.lat}-${incident.lng}`}
                                position={[incident.lat, incident.lng]}
                                eventHandlers={{
                                    click: () => {/* Logic for incident click if needed */ },
                                }}
                            >
                                <Popup>
                                    <div className="text-slate-900">
                                        <strong className="block text-sm font-bold">{incident.type || 'Unknown incident'}</strong>
                                        <span className="text-xs text-slate-500">Severity: {incident.severity || 'N/A'}</span>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MarkerClusterGroup>
            </MapContainer>

            {/* Permission Warning */}
            {locationPermission === 'denied' && (
                <div className="absolute top-0 left-0 w-full bg-red-600/90 text-white p-2 text-center text-sm z-[500]">
                    Location permission denied. Map may not show your position.
                </div>
            )}
        </div>
    );
}
