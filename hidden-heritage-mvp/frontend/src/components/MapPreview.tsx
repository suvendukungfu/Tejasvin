import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 

// Fix Leaflet's default icon path issues with Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
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
    slug?: string;
}

interface MapPreviewProps {
    sites: Site[];
}

const MapPreview = ({ sites }: MapPreviewProps) => {
    // Default center if no sites (Chambal region approx)
    const defaultCenter: [number, number] = [26.6500, 78.3000]; 
    
    // Determine center based on first site or default
    const center: [number, number] = sites.length > 0 
        ? [sites[0].latitude, sites[0].longitude] 
        : defaultCenter;

    return (
        <MapContainer 
            center={center} 
            zoom={9} 
            scrollWheelZoom={false} 
            style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sites.map(site => (
                <Marker 
                    key={site.id} 
                    position={[site.latitude, site.longitude]}
                >
                    <Popup>
                        <div style={{ textAlign: 'center' }}>
                            <strong>{site.name}</strong><br />
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>{site.type}</span>
                            {site.slug && (
                                <div style={{ marginTop: '0.5rem' }}>
                                    <a href={`/site/${site.slug}`} style={{ color: '#d97706', fontWeight: 500, textDecoration: 'none' }}>
                                        View Details
                                    </a>
                                </div>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapPreview;
