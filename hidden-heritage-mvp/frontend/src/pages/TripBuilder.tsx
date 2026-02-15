import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { estimateTrip, getGuides, getSites, saveTrip } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { GripVertical, Trash2, Plus, Clock, Crosshair, Target, Shield } from 'lucide-react';
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
            whileHover={{ scale: 1.01, x: 5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`itinerary-card group ${isDragging ? 'dragging' : ''}`}
        >
             <div className="card-glass-content" style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'space-between', 
                 padding: '1.25rem', 
                 background: isDragging ? 'rgba(200, 163, 89, 0.1)' : 'rgba(255,255,255,0.03)', 
                 backdropFilter: 'blur(12px)', 
                 borderRadius: '4px', // Tactical corner
                 borderLeft: isDragging ? '4px solid var(--color-gold)' : '4px solid rgba(255,255,255,0.1)',
                 border: '1px solid rgba(255,255,255,0.05)',
                 boxShadow: isDragging ? '0 30px 60px rgba(0,0,0,0.5)' : 'none', 
                 marginBottom: '0.5rem',
                 transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
             }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div {...attributes} {...listeners} style={{ cursor: 'grab', color: 'rgba(255,255,255,0.3)', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <GripVertical size={20} />
                    </div>
                    <div style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, filter: 'grayscale(0.5)' }}>
                        <img src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} alt={site.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontFamily: 'monospace', color: 'white', fontWeight: 600, letterSpacing: '0.05em' }}>{site.name.toUpperCase()}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.4rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'monospace' }}>
                                <Clock size={12} /> {site.avg_visit_time_mins}m
                            </span>
                             <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 600, fontFamily: 'monospace' }}>
                                INR {site.entry_fee}
                            </span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => onRemove(id)} 
                    className="btn-icon-danger"
                    title="Abort Target"
                    style={{ background: 'transparent', color: 'rgba(255,255,255,0.2)' }}
                >
                    <Trash2 size={16} />
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
        <div className="min-h-screen" style={{ background: '#050505', color: '#FFF' }}>
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
                        alert('Payment verified. Mission log update failed. Contact command.');
                    }
                }}
            />
            
            {/* Cinematic Hero */}
            <section style={{ height: '40vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                 <motion.div style={{ position: 'absolute', inset: 0, y: yHero, scale: 1.1, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, #050505 100%)', zIndex: 1 }} />
                    <img 
                        src={navigatorHero} 
                        alt="Cartography" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2) brightness(0.6)' }}
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Target size={18} color="var(--color-gold)" />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)' }}>Tactical Logistics</span>
                        </div>
                        <h1 className="text-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'white', lineHeight: 1, fontFamily: 'monospace' }}>
                            MISSION BREIFING.
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="container" style={{ paddingBottom: '8rem' }}>
                <div className="grid-12" style={{ alignItems: 'start', marginTop: '4rem' }}>
                    
                    {/* Left Column: Itinerary Builder */}
                    <div style={{ gridColumn: 'span 8', position: 'relative', zIndex: 20 }}>
                        <div style={{ 
                            background: '#0A0A0A', 
                            padding: '3rem', 
                            borderRadius: '4px', 
                            borderLeft: '1px solid rgba(255,255,255,0.1)',
                            borderTop: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <h2 className="text-h2" style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target Sequence</h2>
                                    {selectedSiteIds.length > 0 && (
                                        <button 
                                            onClick={() => setShowMap(!showMap)}
                                            style={{ background: 'transparent', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', padding: '8px 16px', borderRadius: '4px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <Crosshair size={14} /> {showMap ? 'Hide Sat-View' : 'Sat-View'}
                                        </button>
                                    )}
                                </div>
                                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                                    DRAG TO REORDER PRIORITIES
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
                                        {/* Grid overlay for satellite targeting look */}
                                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
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
                                            gap: '1.5rem'
                                        }}
                                    >
                                        <div style={{ opacity: 0.3 }}><Target size={48} /></div>
                                        <div>
                                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>NO TARGETS ACQUIRED</h3>
                                        </div>
                                        <button 
                                            onClick={() => navigate('/explore')} 
                                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'monospace', textTransform: 'uppercase' }}
                                        >
                                            Initiate Scan
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {/* Smart Suggestions */}
                        <div style={{ marginTop: '4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ width: '40px', height: '2px', background: 'var(--color-gold)' }} />
                                <h3 className="text-h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '0.85rem', fontFamily: 'monospace' }}>Intelligence Reports</h3>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {allSites
                                    .filter(s => !selectedSiteIds.includes(s.id))
                                    .slice(0, 3)
                                    .map((site, i) => (
                                        <motion.div 
                                            key={site.id} 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            style={{
                                                padding: '1.5rem',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                display: 'flex', 
                                                flexDirection: 'column',
                                                gap: '1rem'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '60px', height: '60px', borderRadius: '2px', overflow: 'hidden', flexShrink: 0, filter: 'grayscale(0.8)' }}>
                                                    <img src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} alt={site.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontFamily: 'monospace', color: 'white' }}>{site.name}</h4>
                                                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{site.type}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedSiteIds([...selectedSiteIds, site.id])}
                                                style={{ 
                                                    width: '100%',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: 'none',
                                                    padding: '8px',
                                                    color: 'white',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    fontFamily: 'monospace'
                                                }}
                                            >
                                                <Plus size={14} /> ADD TARGET
                                            </button>
                                        </motion.div>
                                    ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Navigator's Console */}
                    <div style={{ gridColumn: 'span 4', position: 'sticky', top: '120px', zIndex: 20 }}>
                         <div style={{ 
                             padding: '2rem', 
                             background: '#111', 
                             border: '1px solid rgba(255,255,255,0.1)',
                             color: 'white',
                             position: 'relative',
                             overflow: 'hidden'
                         }}>
                            {/* Decorative Grid */}
                             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'repeating-linear-gradient(90deg, var(--color-gold) 0, var(--color-gold) 10px, transparent 10px, transparent 20px)' }} />

                            <h3 style={{ marginBottom: '2rem', fontSize: '1rem', fontFamily: 'monospace', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Logistics Override</h3>

                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                                    Auth Budget Limit (INR)
                                </label>
                                <input
                                    type="number"
                                    value={input.budget}
                                    onChange={e => setInput({ ...input, budget: Number(e.target.value) })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1rem', 
                                        borderRadius: '0', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        background: 'black',
                                        color: 'var(--color-gold)',
                                        fontSize: '1rem',
                                        fontFamily: 'monospace'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                                    Mission Duration (Days)
                                </label>
                                <input
                                    type="number"
                                    value={input.days}
                                    onChange={e => setInput({ ...input, days: Number(e.target.value) })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1rem', 
                                        borderRadius: '0', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        background: 'black',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontFamily: 'monospace'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                                    Personnel Assignment
                                </label>
                                <select
                                    value={input.guideId}
                                    onChange={e => setInput({ ...input, guideId: e.target.value })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1rem', 
                                        borderRadius: '0', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        background: 'black',
                                        color: 'white',
                                        fontFamily: 'monospace'
                                    }}
                                >
                                    <option value="">Solo Operative</option>
                                    {guides.map(g => (
                                        <option key={g.id} value={g.id}>Specialist {g.name} (INR {g.fee_per_day}/day)</option>
                                    ))}
                                </select>
                            </div>

                            <AnimatePresence>
                                {loading && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        exit={{ opacity: 0 }}
                                        style={{ color: 'var(--color-gold)', textAlign: 'center', fontSize: '0.8rem', marginBottom: '1rem', fontFamily: 'monospace' }}
                                    >
                                        [ COMPUTING LOGISTICS... ]
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {estimate && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>ENTRY FEES</span>
                                            <span>Rs. {estimate.breakdown.entryFees}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>PERSONNEL</span>
                                            <span>Rs. {estimate.breakdown.guideCost}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>PROVISIONS</span>
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
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>EST. TOTAL</span>
                                        <span style={{ fontSize: '1.5rem', fontFamily: 'monospace', color: estimate.isWithinBudget ? 'var(--color-gold)' : '#ef4444' }}>₹{estimate.totalCost.toLocaleString()}</span>
                                    </div>

                                    {!estimate.isWithinBudget && (
                                        <div style={{ 
                                            marginTop: '1rem', 
                                            color: '#ef4444', 
                                            fontSize: '0.75rem', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.5rem',
                                            padding: '8px',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            fontFamily: 'monospace'
                                        }}>
                                            <Shield size={14} /> EXCEEDS AUTH LIMIT
                                        </div>
                                    )}

                                    <button
                                        style={{
                                            width: '100%',
                                            marginTop: '2rem',
                                            padding: '1rem',
                                            fontSize: '0.9rem',
                                            fontWeight: 700,
                                            letterSpacing: '0.1rem',
                                            textTransform: 'uppercase',
                                            background: estimate.isWithinBudget ? 'white' : 'rgba(255,255,255,0.1)',
                                            color: 'black',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontFamily: 'monospace'
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
