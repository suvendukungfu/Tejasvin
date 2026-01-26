import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Fix for Leaflet icon not showing
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Site {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    type: string;
}

interface MapProps {
    sites: Site[];
    selectedSites: number[];
    onSiteSelect: (id: number) => void;
}

const MapPreview = ({ sites, selectedSites, onSiteSelect }: MapProps) => {
    const selectedSiteObjects = sites.filter(s => selectedSites.includes(s.id));
    const polylinePositions = selectedSiteObjects.map(s => [s.latitude, s.longitude] as [number, number]);

    return (
        <div style={{ height: '500px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--color-accent)' }}>
            <MapContainer
                center={[26.75, 78.4]} // Chambal center ish
                zoom={9}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {sites.map(site => (
                    <Marker key={site.id} position={[site.latitude, site.longitude]}>
                        <Popup>
                            <strong>{site.name}</strong><br />
                            {site.type}<br />
                            <button onClick={() => onSiteSelect(site.id)}>
                                {selectedSites.includes(site.id) ? 'Remove' : 'Add to Trip'}
                            </button>
                        </Popup>
                    </Marker>
                ))}

                {selectedSites.length >= 2 && (
                    <Polyline positions={polylinePositions} color="var(--color-secondary)" />
                )}
            </MapContainer>
        </div>
    );
};

export default MapPreview;
