import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import { Map as MapIcon, Satellite } from 'lucide-react';


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
    image_url?: string;
}

interface MapPreviewProps {
    sites: Site[];
}

// Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
};

// --- MAP CONTROLLER (FlyTo Animations) ---
const MapController = ({ center, zoom, selectedSites }: { center: [number, number], zoom: number, selectedSites: Site[] }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedSites.length > 1) {
            // Fit bounds if multiple sites
            const bounds = L.latLngBounds(selectedSites.map(s => [s.latitude, s.longitude]));
            map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5, easeLinearity: 0.25 });
        } else {
            // Fly to center
            map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });
        }
    }, [center, zoom, selectedSites, map]);

    return null;
};

const MapPreview = ({ sites }: MapPreviewProps) => {
    const [selectedSiteIds, setSelectedSiteIds] = useState<number[]>([]);
    const [optimizedRoute, setOptimizedRoute] = useState<Site[] | null>(null);
    const [mapMode, setMapMode] = useState<'dark' | 'satellite'>('dark');

    // Default center 
    const defaultCenter: [number, number] = [26.6500, 78.3000]; 
    
    // Determine center 
    const lastSelected = sites.find(s => s.id === selectedSiteIds[selectedSiteIds.length - 1]);
    const center: [number, number] = lastSelected 
        ? [lastSelected.latitude, lastSelected.longitude] 
        : (sites.length > 0 ? [sites[0].latitude, sites[0].longitude] : defaultCenter);

    const toggleSiteSelection = (id: number) => {
        setOptimizedRoute(null);
        setSelectedSiteIds(prev => 
            prev.includes(id) ? prev.filter(siteId => siteId !== id) : [...prev, id]
        );
    };

    const handlePlanRoute = () => {
        const sitesToRoute = selectedSiteIds.length > 0 
            ? sites.filter(s => selectedSiteIds.includes(s.id))
            : []; 

        if (sitesToRoute.length < 2) {
            alert("Select at least 2 locations.");
            return;
        }

        // Greedy TSP
        let unvisited = [...sitesToRoute];
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

    // Custom Icons with System Variables
    const createNumberedIcon = (number: number) => L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: var(--color-spatial-accent); color: var(--color-spatial-text); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 800; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.5); font-size: 0.75rem;">${number}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
    }) as L.DivIcon;

    const createSelectedIcon = () => L.divIcon({
        className: 'custom-icon-selected',
        html: `<div style="background-color: var(--color-spatial-text); color: var(--color-spatial-accent); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border: 2px solid var(--color-spatial-accent); box-shadow: 0 0 15px var(--color-spatial-accent);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    }) as L.DivIcon;

    const createDefaultIcon = () => L.divIcon({
        className: 'custom-icon-default',
        html: `<div style="background-color: rgba(255,255,255,0.8); border-radius: 50%; width: 16px; height: 16px; border: 2px solid rgba(0,0,0,0.5);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    }) as L.DivIcon;

    return (
        <div style={{ position: 'relative', height: '100%', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            
            {/* Control Panel */}
            <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '8px' }}>
                
                {/* Layer Toggle */}
                <div style={{ background: 'var(--material-glass)', backdropFilter: 'blur(10px)', padding: '4px', borderRadius: '100px', display: 'flex', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <button 
                        onClick={() => setMapMode('dark')}
                        title="Neural Map"
                        style={{ background: mapMode === 'dark' ? 'rgba(0,0,0,0.1)' : 'transparent', color: mapMode === 'dark' ? 'var(--color-spatial-text)' : 'rgba(0,0,0,0.5)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}
                    >
                        <MapIcon size={16} />
                    </button>
                    <button 
                        onClick={() => setMapMode('satellite')}
                        title="Satellite Feed"
                        style={{ background: mapMode === 'satellite' ? 'rgba(0,0,0,0.1)' : 'transparent', color: mapMode === 'satellite' ? 'var(--color-spatial-text)' : 'rgba(0,0,0,0.5)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}
                    >
                        <Satellite size={16} />
                    </button>
                </div>

                <div style={{ background: 'var(--material-glass)', backdropFilter: 'blur(10px)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-spatial-accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    {selectedSiteIds.length} TARGETS LOCKED
                </div>
                
                <button 
                    onClick={handlePlanRoute}
                    disabled={selectedSiteIds.length < 2}
                    style={{ 
                        fontSize: '0.75rem',
                        padding: '0.75rem 1.5rem',
                        opacity: selectedSiteIds.length < 2 ? 0.5 : 1,
                        cursor: selectedSiteIds.length < 2 ? 'not-allowed' : 'pointer',
                        background: selectedSiteIds.length < 2 ? 'rgba(0,0,0,0.5)' : 'var(--color-spatial-accent)',
                        color: selectedSiteIds.length < 2 ? 'white' : 'var(--color-spatial-text)',
                        border: 'none',
                        borderRadius: '100px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s'
                    }}
                >
                    Initialize Path
                </button>
            </div>

            <MapContainer 
                center={center} 
                zoom={10} 
                scrollWheelZoom={false} 
                style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
                zoomControl={false}
            >
                <MapController 
                    center={center} 
                    zoom={mapMode === 'satellite' ? 12 : 10} 
                    selectedSites={sites.filter(s => selectedSiteIds.includes(s.id))} 
                />

                {/* Base Layers */}
                {mapMode === 'dark' ? (
                     <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                ) : (
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                )}
                
                {/* Route Line */}
                {optimizedRoute && (
                    <Polyline 
                        positions={optimizedRoute.map(site => [site.latitude, site.longitude])}
                        color="var(--color-spatial-accent)" 
                        dashArray="8, 12" 
                        weight={3}
                        opacity={0.8}
                    />
                )}

                {/* Markers */}
                {sites.map((site) => {
                    let icon = createDefaultIcon();
                    if (optimizedRoute) {
                        const index = optimizedRoute.findIndex(s => s.id === site.id);
                        if (index !== -1) icon = createNumberedIcon(index + 1);
                    } else if (selectedSiteIds.includes(site.id)) {
                        icon = createSelectedIcon();
                    }

                    return (
                        <Marker 
                            key={site.id} 
                            position={[site.latitude, site.longitude]}
                            icon={icon as any}
                        >
                            <Popup 
                                closeButton={false} 
                                className="glass-popup"
                                autoPan={false}
                            >
                                <div style={{ width: '200px', padding: '0px' }}>
                                    <div style={{ height: '100px', width: '100%', overflow: 'hidden', borderRadius: '8px 8px 0 0', position: 'relative' }}>
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                                        <img src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} alt={site.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', bottom: '8px', left: '12px', color: 'white', fontWeight: 700, fontSize: '0.9rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                            {site.name}
                                        </div>
                                    </div>
                                    <div style={{ padding: '12px', background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(10px)', borderRadius: '0 0 8px 8px', color: 'white' }}>
                                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase' }}>{site.type}</div>
                                        <button 
                                            onClick={() => toggleSiteSelection(site.id)}
                                            style={{
                                                width: '100%',
                                                background: selectedSiteIds.includes(site.id) ? 'rgba(239, 68, 68, 0.2)' : 'var(--color-spatial-accent)',
                                                color: selectedSiteIds.includes(site.id) ? '#ef4444' : 'var(--color-spatial-text)',
                                                border: selectedSiteIds.includes(site.id) ? '1px solid #ef4444' : 'none',
                                                padding: '8px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}
                                        >
                                            {selectedSiteIds.includes(site.id) ? 'Remove' : 'Select Target'}
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
            <style>{`
                .leaflet-popup-content-wrapper {
                    background: transparent !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                }
                .leaflet-popup-tip {
                    background: rgba(20,20,20,0.95) !important;
                }
            `}</style>
        </div>
    );
};

export default MapPreview;
