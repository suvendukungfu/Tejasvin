import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
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
    const [selectedSiteIds, setSelectedSiteIds] = useState<number[]>([]);
    const [optimizedRoute, setOptimizedRoute] = useState<Site[] | null>(null);

    // Default center if no sites (Chambal region approx)
    const defaultCenter: [number, number] = [26.6500, 78.3000]; 
    
    // Determine center based on first site or default
    const center: [number, number] = sites.length > 0 
        ? [sites[0].latitude, sites[0].longitude] 
        : defaultCenter;

    const toggleSiteSelection = (id: number) => {
        setOptimizedRoute(null); // Reset route when selection changes
        setSelectedSiteIds(prev => 
            prev.includes(id) ? prev.filter(siteId => siteId !== id) : [...prev, id]
        );
    };

    const handlePlanRoute = () => {
        // Use selected sites, or if none selected, warn user
        const sitesToRoute = selectedSiteIds.length > 0 
            ? sites.filter(s => selectedSiteIds.includes(s.id))
            : []; 

        if (sitesToRoute.length < 2) {
            alert("Please select at least 2 locations to plan a route.");
            return;
        }

        // Greedy TSP Algorithm
        let unvisited = [...sitesToRoute];
        // Start with the first site in the list (simplification)
        let current = unvisited[0]; 
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

    // Custom Icons
    const createNumberedIcon = (number: number) => {
        return L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: var(--color-gold); color: var(--color-charcoal); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 800; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-size: 0.75rem;">${number}</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        }) as L.DivIcon;
    };

    const createSelectedIcon = () => {
        return L.divIcon({
            className: 'custom-icon-selected',
            html: `<div style="background-color: #1A1A1A; color: var(--color-gold); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: 2px solid var(--color-gold); box-shadow: 0 0 12px var(--color-gold);">✓</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        }) as L.DivIcon;
    };

    return (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
            
            {/* Control Panel */}
            <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '5px' }}>
                <div style={{ background: 'white', padding: '5px 10px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {selectedSiteIds.length} sites selected
                </div>
                <button 
                    onClick={handlePlanRoute}
                    className="btn-cinematic"
                    style={{ 
                        fontSize: '0.75rem',
                        padding: '0.6rem 1.25rem',
                        opacity: selectedSiteIds.length < 2 ? 0.7 : 1,
                        cursor: selectedSiteIds.length < 2 ? 'not-allowed' : 'pointer',
                        background: selectedSiteIds.length < 2 ? 'rgba(0,0,0,0.4)' : 'var(--color-gold)',
                        color: selectedSiteIds.length < 2 ? 'white' : 'var(--color-charcoal)',
                        border: 'none',
                        borderRadius: '32px',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    📍 Plan Route
                </button>
            </div>

            <MapContainer 
                center={center} 
                zoom={9} 
                scrollWheelZoom={false} 
                style={{ height: '100%', width: '100%', borderRadius: '32px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Draw Route Line */}
                {optimizedRoute && (
                    <Polyline 
                        positions={optimizedRoute.map(site => [site.latitude, site.longitude])}
                        color="var(--color-gold)" 
                        dashArray="12, 12" 
                        weight={5}
                    />
                )}

                {/* Render Markers */}
                {sites.map((site) => {
                    // Determine Icon
                    let icon = DefaultIcon;
                    if (optimizedRoute) {
                        const index = optimizedRoute.findIndex(s => s.id === site.id);
                        if (index !== -1) icon = createNumberedIcon(index + 1) as any;
                    } else if (selectedSiteIds.includes(site.id)) {
                        icon = createSelectedIcon() as any;
                    }

                    return (
                        <Marker 
                            key={site.id} 
                            position={[site.latitude, site.longitude]}
                            icon={icon as any}
                        >
                            <Popup>
                                <div style={{ textAlign: 'center', minWidth: '150px' }}>
                                    <strong>{site.name}</strong><br />
                                    <span style={{ fontSize: '0.8rem', color: '#666' }}>{site.type}</span>
                                    
                                    {optimizedRoute && (
                                        <div style={{marginTop: '0.25rem', fontWeight: 'bold', color: '#d97706'}}>
                                            Stop #{optimizedRoute.findIndex(s => s.id === site.id) + 1}
                                        </div>
                                    )}

                                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <button 
                                            onClick={() => toggleSiteSelection(site.id)}
                                            style={{
                                                background: selectedSiteIds.includes(site.id) ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-gold)',
                                                color: selectedSiteIds.includes(site.id) ? '#ef4444' : 'var(--color-charcoal)',
                                                border: selectedSiteIds.includes(site.id) ? '1px solid #ef4444' : 'none',
                                                padding: '8px 16px',
                                                borderRadius: '32px',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                fontWeight: 700
                                            }}
                                        >
                                            {selectedSiteIds.includes(site.id) ? 'Remove Selection' : 'Add to Expedition'}
                                        </button>
                                        
                                        {site.slug && (
                                            <a href={`/site/${site.slug}`} style={{ color: '#d97706', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>
                                                View Details
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default MapPreview;
