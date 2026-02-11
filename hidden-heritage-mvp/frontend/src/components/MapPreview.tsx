import { MapPin, Navigation } from 'lucide-react';

interface Site {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    type: string;
}

interface MapPreviewProps {
    sites: Site[];
}

const MapPreview = ({ sites }: MapPreviewProps) => {
    // For MVP/Demo, we are replacing the heavy Leaflet map with a stylized static preview
    // that still indicates function but looks better and is less error-prone for this stage.
    
    // Calculate center or use default
    const centerSite = sites[0] || { latitude: 20.5937, longitude: 78.9629 };

    return (
        <div 
            className="card"
            style={{ 
                height: '500px', 
                backgroundColor: '#e5e7eb', 
                position: 'relative', 
                overflow: 'hidden',
                padding: 0,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
             {/* Simulated Map Background */}
             <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.5,
                position: 'absolute',
                inset: 0
            }} />

            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '2rem', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Interactive Map</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                    Map view is currently optimized for desktop. <br/>
                    {sites.length} sites available in this region.
                </p>
                
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {sites.slice(0, 3).map(site => (
                         <div key={site.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', padding: '0.25rem 0.5rem', backgroundColor: 'white', borderRadius: '50px', border: '1px solid #ddd' }}>
                            <MapPin size={12} color="var(--color-primary)" /> {site.name}
                         </div>
                    ))}
                    {sites.length > 3 && <span style={{ fontSize: '0.8rem', alignSelf: 'center' }}>+{sites.length - 3} more</span>}
                </div>

                <button 
                    className="btn btn-outline"
                    style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${centerSite.latitude},${centerSite.longitude}`, '_blank')}
                >
                    <Navigation size={16} /> Open in Google Maps
                </button>
            </div>
        </div>
    );
};

export default MapPreview;
