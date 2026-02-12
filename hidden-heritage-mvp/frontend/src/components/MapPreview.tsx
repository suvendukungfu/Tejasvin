import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
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

// Haversine formula to calculate distance between two points
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

const MapPreview = ({ sites }: MapPreviewProps) => {
    const [optimizedRoute, setOptimizedRoute] = useState<Site[] | null>(null);

    // Default center if no sites (Chambal region approx)
    const defaultCenter: [number, number] = [26.6500, 78.3000]; 
    
    // Determine center based on first site or default
    const center: [number, number] = sites.length > 0 
        ? [sites[0].latitude, sites[0].longitude] 
        : defaultCenter;

    const handlePlanRoute = () => {
        if (sites.length < 2) return;

        // Greedy TSP Algorithm
        let unvisited = [...sites];
        let current = unvisited[0]; // Start with the first site
        const route = [current];
        unvisited = unvisited.filter(s => s.id !== current.id);

        while (unvisited.length > 0) {
            let nearest = unvisited[0];
            let minDist = Infinity;

            for (const site of unvisited) {
                const dist = calculateDistance(current.latitude, current.longitude, site.latitude, site.longitude);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = site;
                }
            }

            route.push(nearest);
            current = nearest;
            unvisited = unvisited.filter(s => s.id !== nearest.id);
        }

        setOptimizedRoute(route);
    };

    // Custom numbered icon for route
    const createNumberedIcon = (number: number) => {
        return L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: #d97706; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${number}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    };

    return (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
            
            {/* Route Button */}
            <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
                <button 
                    onClick={handlePlanRoute}
                    className="btn btn-primary"
                    style={{ 
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                        fontSize: '0.9rem',
                        padding: '0.5rem 1rem'
                    }}
                >
                    📍 Plan Shortest Route
                </button>
            </div>

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
                
                {/* Draw Route Line */}
                {optimizedRoute && (
                    <Polyline 
                        positions={optimizedRoute.map(site => [site.latitude, site.longitude])}
                        color="#d97706" // Amber-600
                        dashArray="10, 10" 
                        weight={4}
                    />
                )}

                {/* Render Markers (Use Optimized Order if available, else default list) */}
                {(optimizedRoute || sites).map((site, index) => (
                    <Marker 
                        key={site.id} 
                        position={[site.latitude, site.longitude]}
                        icon={optimizedRoute ? createNumberedIcon(index + 1) : DefaultIcon}
                    >
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <strong>{site.name}</strong><br />
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>{site.type}</span>
                                {optimizedRoute && <div style={{marginTop: '0.25rem', fontWeight: 'bold', color: '#d97706'}}>Stop #{index + 1}</div>}
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
        </div>
    );
};

export default MapPreview;
