import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { estimateTrip, getGuides, getSites, saveTrip } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { GripVertical, Trash2, Plus, Clock, Crosshair, Target, Shield, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import MapPreview from '../components/MapPreview';

// Heritage Cinematic Assets
import navigatorHero from '../assets/heritage/navigator.png';

// --- Components ---

const SortableItem = ({ id, site, onRemove }: { id: number, site: any, onRemove: (id: number) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 1,
        position: 'relative' as const
    };

    return (
        <motion.div 
            ref={setNodeRef} 
            style={style} 
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`mission-card group ${isDragging ? 'dragging' : ''}`}
        >
             <div className="card-glass-content" style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'space-between', 
                 padding: '1.5rem', 
                 background: isDragging ? 'rgba(200, 163, 89, 0.15)' : 'rgba(255,255,255,0.03)', 
                 backdropFilter: 'blur(12px)', 
                 borderRadius: '2px', 
                 borderLeft: isDragging ? '4px solid var(--color-gold)' : '4px solid rgba(255,255,255,0.1)',
                 border: '1px solid rgba(255,255,255,0.05)',
                 boxShadow: isDragging ? '0 30px 60px rgba(0,0,0,0.5)' : 'none', 
                 marginBottom: '0.75rem',
                 position: 'relative',
                 overflow: 'hidden',
                 transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
             }}>
                 {/* Micro-Grid Overlay */}
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 100%', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
                    <div {...attributes} {...listeners} style={{ cursor: 'grab', color: 'rgba(255,255,255,0.3)', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <GripVertical size={20} />
                    </div>
                    
                    {/* Tactical Thumbnail */}
                    <div style={{ width: '80px', height: '60px', borderRadius: '2px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                        <img 
                            src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} 
                            alt={site.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6) contrast(1.1)' }} 
                        />
                         <div style={{ position: 'absolute', inset: 0, background: 'rgba(14, 14, 14, 0.2)', mixBlendMode: 'multiply' }} />
                    </div>

                    <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px', opacity: 0.8 }}>TARGET LOCKED</div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'monospace', color: 'white', fontWeight: 600, letterSpacing: '0.05em' }}>{site.name.toUpperCase()}</h4>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'monospace' }}>
                                <Clock size={12} /> {site.avg_visit_time_mins}m
                            </span>
                             <span style={{ fontSize: '0.75rem', color: 'white', fontFamily: 'monospace', opacity: 0.7 }}>
                                INR {site.entry_fee}
                            </span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => onRemove(id)} 
                    className="btn-icon-danger"
                    title="Abort Target"
                    style={{ background: 'transparent', color: 'rgba(255,255,255,0.2)', position: 'relative', zIndex: 2, padding: '10px' }}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </motion.div>
    );
};

// --- Main Page ---

const TripBuilder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 150]);

    // State
    const [showMap, setShowMap] = useState(false);
    const [selectedSiteIds, setSelectedSiteIds] = useState<number[]>(location.state?.initialSelection || []);
    const [allSites, setAllSites] = useState<any[]>([]);
    const [guides, setGuides] = useState<any[]>([]);

    // Default to sensible initial values
    const [input, setInput] = useState({
        budget: 20000,
        days: 3,
        guideId: ''
    });

    const [estimate, setEstimate] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Fetch Data
    useEffect(() => {
        getSites().then(res => setAllSites(res.data)).catch(console.error);
        getGuides().then(res => setGuides(res.data)).catch(console.error);
    }, []);

    // Update logic when selection changes
    useEffect(() => {
        if (selectedSiteIds.length > 0) {
            calculate();
        }
    }, [selectedSiteIds, input]);

    const calculate = async () => {
        if (selectedSiteIds.length === 0) {
            setEstimate(null);
            return;
        }
        setLoading(true);
        try {
            const res = await estimateTrip({
                siteIds: selectedSiteIds,
                days: input.days,
                budget: input.budget,
                guideId: input.guideId ? Number(input.guideId) : undefined
            });
            setEstimate(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setSelectedSiteIds((items) => {
                const oldIndex = items.indexOf(Number(active.id));
                const newIndex = items.indexOf(Number(over!.id));
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const [showPayment, setShowPayment] = useState(false);
    const { isAuthenticated, user } = useAuth();

    const handleRemove = (id: number) => {
        setSelectedSiteIds(ids => ids.filter(i => i !== id));
    };

    const selectedSitesData = selectedSiteIds.map(id => allSites.find(s => s.id === id)).filter(s => !!s);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="min-h-screen" style={{ background: '#0E0E0E', color: '#E0E0E0' }}> {/* Deep Charcoal Background */}
            <NavBar />
            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={estimate?.totalCost || 0}
                onSuccess={async () => {
                    try {
                        const response = await saveTrip({
                            userId: user?.id || 1,
                            name: `Mission: ${selectedSitesData[0]?.name || 'Alpha'}`,
                            totalCost: estimate?.totalCost,
                            totalTime: estimate?.totalTimeMinutes,
                            siteIds: selectedSiteIds,
                            guideId: input.guideId ? Number(input.guideId) : null
                        });

                        setShowPayment(false);
                        if (response.data && (response.data.success || response.data.tripId)) {
                            alert('Mission Parameters Confirmed. Deployment Authorized.');
                            navigate('/bookings');
                        } else {
                            alert('Mission Authorized (Simulation)');
                            navigate('/');
                        }
                    } catch (err) {
                        console.error("Failed to save trip:", err);
                        alert('Logistics Failure. Retry Comms.');
                    }
                }}
            />
            
            {/* Cinematic Hero: Mission Overview */}
            <section style={{ height: '45vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                 <motion.div style={{ position: 'absolute', inset: 0, y: yHero, scale: 1.05, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(14,14,14,0.4) 0%, #0E0E0E 100%)', zIndex: 1 }} />
                    <img 
                        src={navigatorHero} 
                        alt="Mission Control" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1) brightness(0.4)' }}
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--color-gold)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-gold)' }} />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', fontFamily: 'monospace' }}>
                                Field Operations
                            </span>
                        </div>
                        <h1 className="text-display" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'white', lineHeight: 1, fontFamily: 'monospace', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                            MISSION BRIEFING.
                        </h1>
                        <p style={{ maxWidth: '600px', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                            Each expedition begins with intent. Configure your journey parameters before entering the archive.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container" style={{ paddingBottom: '8rem' }}>
                <div className="grid-12" style={{ alignItems: 'start', marginTop: '5rem' }}>
                    
                    {/* Left Column: Target Sequence (Main Content) */}
                    <div style={{ gridColumn: 'span 8', position: 'relative', zIndex: 20 }}>
                        <div style={{ 
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)', 
                            padding: '3rem', 
                            borderRadius: '2px', 
                            borderLeft: '1px solid rgba(255,255,255,0.05)',
                            position: 'relative'
                        }}>
                             <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '1px', background: 'var(--color-gold)' }} /> {/* Subtle Accent */}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <h2 className="text-h2" style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'white' }}>
                                        Target Sequence
                                    </h2>
                                    {selectedSiteIds.length > 0 && (
                                        <button 
                                            onClick={() => setShowMap(!showMap)}
                                            style={{ 
                                                background: 'rgba(255,255,255,0.05)', 
                                                border: '1px solid rgba(255,255,255,0.1)', 
                                                color: 'var(--color-gold)', 
                                                padding: '8px 16px', 
                                                borderRadius: '2px', 
                                                fontSize: '0.7rem', 
                                                textTransform: 'uppercase', 
                                                letterSpacing: '0.1em', 
                                                cursor: 'pointer', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '8px',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <Crosshair size={14} /> {showMap ? 'Close Feed' : 'Sat-Link'}
                                        </button>
                                    )}
                                </div>
                                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                                    DRAG TO RE-PRIORITIZE
                                </span>
                            </div>

                            <AnimatePresence>
                                {showMap && selectedSiteIds.length > 0 && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                                        animate={{ height: '400px', opacity: 1, marginBottom: '3rem' }}
                                        exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                                        style={{ overflow: 'hidden', border: '1px solid var(--color-gold)', position: 'relative' }}
                                    >
                                        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, color: 'var(--color-gold)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', background: 'black', padding: '4px' }}>LIVE SATELLITE FEED</div>
                                        <MapPreview sites={selectedSitesData} />
                                        {/* Cinematic Scanlines */}
                                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))', backgroundSize: '100% 2px, 3px 100%', pointerEvents: 'none' }} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div 
                                className="itinerary-list" 
                                style={{ minHeight: '300px' }}
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                            >
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={selectedSiteIds} strategy={verticalListSortingStrategy}>
                                        {selectedSitesData.map((site) => (
                                            <SortableItem key={site.id} id={site.id} site={site} onRemove={handleRemove} />
                                        ))}
                                    </SortableContext>
                                </DndContext>

                                {selectedSiteIds.length === 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }}
                                        style={{ 
                                            padding: '6rem 4rem', 
                                            textAlign: 'center', 
                                            border: '1px dashed rgba(255,255,255,0.1)', 
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '1.5rem',
                                            background: 'rgba(255,255,255,0.01)'
                                        }}
                                    >
                                        <div style={{ opacity: 0.3 }}><Target size={48} color="white" /></div>
                                        <div>
                                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>NO TARGETS ACQUIRED</h3>
                                        </div>
                                        <button 
                                            onClick={() => navigate('/explore')} 
                                            style={{ 
                                                background: 'transparent', 
                                                border: '1px solid rgba(255,255,255,0.2)', 
                                                color: 'white', 
                                                padding: '14px 28px', 
                                                borderRadius: '2px', 
                                                cursor: 'pointer', 
                                                fontFamily: 'monospace', 
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em'
                                            }}
                                        >
                                            Initiate Sector Scan
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {/* Available Target Grid */}
                        <div style={{ marginTop: '5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                                <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
                                <h3 className="text-h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.15rem', fontSize: '0.8rem', fontFamily: 'monospace', color: 'white' }}>Available Targets</h3>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                {allSites
                                    .filter(s => !selectedSiteIds.includes(s.id))
                                    .slice(0, 3) // Show first 3 suggestions
                                    .map((site, i) => (
                                        <motion.div 
                                            key={site.id} 
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1, duration: 0.8 }}
                                            viewport={{ once: true }}
                                            whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }}
                                            style={{
                                                padding: '0',
                                                background: '#141414',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                display: 'flex', 
                                                flexDirection: 'column',
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}
                                        >
                                           <div style={{ height: '140px', position: 'relative' }}>
                                                <img 
                                                    src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} 
                                                    alt={site.name} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3)' }} 
                                                />
                                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #141414 0%, transparent 100%)' }} />
                                                <div style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.6rem', color: 'white', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>AVAILABLE</div>
                                           </div>

                                            <div style={{ padding: '1.5rem' }}>
                                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontFamily: 'monospace', color: 'white', letterSpacing: '0.05em' }}>{site.name}</h4>
                                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                                                    {site.description ? site.description.substring(0, 80) + '...' : 'Heritage site sector available for exploration.'}
                                                </p>
                                                
                                                <button
                                                    onClick={() => setSelectedSiteIds([...selectedSiteIds, site.id])}
                                                    style={{ 
                                                        width: '100%',
                                                        marginTop: '1.5rem',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        padding: '12px',
                                                        color: 'white',
                                                        fontSize: '0.75rem',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '8px',
                                                        fontFamily: 'monospace',
                                                        letterSpacing: '0.1em',
                                                        transition: 'background 0.2s'
                                                    }}
                                                >
                                                    <Plus size={14} /> ADD TO BRIEF
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Logistics Override (Navigator's Console) */}
                    <div style={{ gridColumn: 'span 4', position: 'sticky', top: '120px', zIndex: 20 }}>
                         <div style={{ 
                             padding: '2.5rem', 
                             background: 'rgba(20, 20, 20, 0.6)', // Glass Dark
                             backdropFilter: 'blur(20px)',
                             border: '1px solid rgba(255,255,255,0.05)',
                             color: 'white',
                             position: 'relative',
                             overflow: 'hidden'
                         }}>
                            {/* Decorative Top Line */}
                             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, var(--color-gold) 0, transparent 100%)' }} />

                             <h3 style={{ marginBottom: '2.5rem', fontSize: '0.9rem', fontFamily: 'monospace', color: 'white', textTransform: 'uppercase', letterSpacing: '0.2rem', opacity: 0.8 }}>Logistics Override</h3>

                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                                    Auth Budget Limit (INR)
                                </label>
                                <input
                                    type="number"
                                    value={input.budget}
                                    onChange={e => setInput({ ...input, budget: Number(e.target.value) })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1rem', 
                                        borderRadius: '2px', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        background: '#0E0E0E',
                                        color: 'var(--color-gold)',
                                        fontSize: '1.1rem',
                                        fontFamily: 'monospace',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                                    Mission Duration (Days)
                                </label>
                                <input
                                    type="number"
                                    value={input.days}
                                    onChange={e => setInput({ ...input, days: Number(e.target.value) })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1rem', 
                                        borderRadius: '2px', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        background: '#0E0E0E',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        fontFamily: 'monospace',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                                    Personnel Assignment
                                </label>
                                <select
                                    value={input.guideId}
                                    onChange={e => setInput({ ...input, guideId: e.target.value })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1rem', 
                                        borderRadius: '2px', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        background: '#0E0E0E',
                                        color: 'white',
                                        fontFamily: 'monospace',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="">Solo Operative</option>
                                    {guides.map(g => (
                                        <option key={g.id} value={g.id}>Specialist {g.name} (INR {g.fee_per_day}/day)</option>
                                    ))}
                                </select>
                            </div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '2rem' }} />

                            <AnimatePresence>
                                {loading && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        exit={{ opacity: 0 }}
                                        style={{ color: 'var(--color-gold)', textAlign: 'center', fontSize: '0.75rem', marginBottom: '1rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}
                                    >
                                        [ COMPUTING LOGISTICS... ]
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {estimate && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.4)' }}>ENTRY FEES</span>
                                            <span>Rs. {estimate.breakdown.entryFees}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.4)' }}>PERSONNEL</span>
                                            <span>Rs. {estimate.breakdown.guideCost}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.4)' }}>PROVISIONS</span>
                                            <span>Rs. {estimate.breakdown.food + estimate.breakdown.accommodation + estimate.breakdown.transport}</span>
                                        </div>
                                    </div>

                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'baseline',
                                        marginTop: '1rem', 
                                        paddingTop: '1.5rem',
                                        borderTop: '1px dashed rgba(255,255,255,0.2)',
                                    }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>EST. TOTAL</span>
                                        <span style={{ fontSize: '1.5rem', fontFamily: 'monospace', color: estimate.isWithinBudget ? 'var(--color-gold)' : '#ef4444' }}>₹{estimate.totalCost.toLocaleString()}</span>
                                    </div>

                                    {!estimate.isWithinBudget && (
                                        <div style={{ 
                                            marginTop: '1.5rem', 
                                            color: '#ef4444', 
                                            fontSize: '0.7rem', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.75rem',
                                            padding: '12px',
                                            background: 'rgba(239, 68, 68, 0.05)',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            fontFamily: 'monospace'
                                        }}>
                                            <AlertTriangle size={14} /> 
                                            <span>EXCEEDS AUTH LIMIT BY ₹{(estimate.totalCost - input.budget).toLocaleString()}</span>
                                        </div>
                                    )}

                                    <button
                                        style={{
                                            width: '100%',
                                            marginTop: '2rem',
                                            padding: '1.25rem',
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            letterSpacing: '0.15rem',
                                            textTransform: 'uppercase',
                                            background: estimate.isWithinBudget ? 'white' : 'rgba(255,255,255,0.05)',
                                            color: estimate.isWithinBudget ? 'black' : 'rgba(255,255,255,0.4)', // Dim if distinct
                                            border: 'none',
                                            cursor: estimate.isWithinBudget ? 'pointer' : 'not-allowed', // Disable if over budget? Or allow override? User prompt didn't specify blocking, but "Logistics Override" implies control. Let's allow it but warn. Actually I'll keep it simple for now and allow but styled differently.
                                            fontFamily: 'monospace',
                                            transition: 'all 0.3s'
                                        }}
                                        onClick={() => {
                                            if (!isAuthenticated) navigate('/login');
                                            else setShowPayment(true);
                                        }}
                                    >
                                        {isAuthenticated ? 'AUTHORIZE MISSION' : 'LINK ID TO PROCEED'}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripBuilder;
