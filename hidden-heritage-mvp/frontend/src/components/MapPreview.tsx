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
        <div 
            className="card"
            style={{ 
                height: '100%', 
                minHeight: '400px', 
                backgroundColor: '#e5e7eb', 
                position: 'relative', 
                overflow: 'hidden',
                padding: 0,
                border: 'none'
            }}
        >
            {/* Simulated Map Background */}
            <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop")', // Abstract map texture
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.6
            }} />
            
            {/* Map Marker */}
            <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
            }}>
                <div style={{ 
                    color: 'var(--color-primary)', 
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
                    animation: 'bounce 2s infinite'
                }}>
                    <MapPin size={48} fill="var(--color-primary)" color="white" />
                </div>
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '50px', 
                    marginTop: '0.5rem',
                    boxShadow: 'var(--shadow-md)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                }}>
                    {name}
                </div>
            </div>

            {/* Controls Overlay */}
            <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                    className="btn btn-primary"
                    style={{ borderRadius: '50px', padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank')}
                >
                    <Navigation size={16} /> Get Directions
                </button>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default MapPreview;
