import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { estimateTrip, getGuides, getSites, saveTrip } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { GripVertical, Trash2, Plus, Info, Map as MapIcon, Clock } from 'lucide-react';
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
                 background: isDragging ? 'rgba(255,255,255,1)' : 'var(--color-surface-glass)', 
                 backdropFilter: 'blur(12px)', 
                 borderRadius: '32px', 
                 border: isDragging ? '2px solid var(--color-accent)' : '1px solid rgba(0,0,0,0.05)', 
                 boxShadow: isDragging ? '0 30px 60px rgba(0,0,0,0.2)' : '0 10px 30px -10px rgba(0,0,0,0.04)', 
                 marginBottom: '1rem',
                 transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
             }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div {...attributes} {...listeners} style={{ cursor: 'grab', color: 'var(--color-text-tertiary)', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <GripVertical size={20} />
                    </div>
                    <div style={{ width: '80px', height: '80px', borderRadius: '20px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
                        <img src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} alt={site.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontWeight: 600 }}>{site.name}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.4rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Clock size={14} /> {site.avg_visit_time_mins} mins
                            </span>
                             <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                                ₹{site.entry_fee}
                            </span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => onRemove(id)} 
                    className="btn-icon-danger"
                    title="Remove"
                    style={{ background: 'rgba(239, 68, 68, 0.05)', borderRadius: '16px' }}
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
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={estimate?.totalCost || 0}
                onSuccess={async () => {
                    try {
                        const response = await saveTrip({
                            userId: user?.id || 1,
                            name: `My Trip to ${selectedSitesData[0]?.name || 'History'}`,
                            totalCost: estimate?.totalCost,
                            totalTime: estimate?.totalTimeMinutes,
                            siteIds: selectedSiteIds,
                            guideId: input.guideId ? Number(input.guideId) : null
                        });

                        setShowPayment(false);
                        if (response.data && (response.data.success || response.data.tripId)) {
                            alert('Trip Successfully Booked and Saved!');
                            navigate('/bookings');
                        } else {
                            alert('Trip Booked! (Mock Saved)');
                            navigate('/');
                        }
                    } catch (err) {
                        console.error("Failed to save trip:", err);
                        alert('Payment successful, but failed to save trip details. Please contact support.');
                    }
                }}
            />
            
            {/* Cinematic Hero */}
            <section style={{ height: '50vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                 <motion.div style={{ position: 'absolute', inset: 0, y: yHero, scale: 1.1, zIndex: 0 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, var(--color-bg-body) 100%)', zIndex: 1 }} />
                    <img 
                        src={navigatorHero} 
                        alt="Cartography" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(10%) contrast(1.1) brightness(0.8)' }}
                    />
                </motion.div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ height: '1px', width: '40px', background: 'var(--color-accent)' }}></span>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)' }}>The Navigator</span>
                        </div>
                        <h1 className="text-display" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'white', lineHeight: 1 }}>
                            Expedition <br/>
                            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--color-accent)' }}>Planner.</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="container" style={{ paddingBottom: '8rem' }}>
                <div className="grid-12" style={{ alignItems: 'start', marginTop: '-4rem' }}>
                    
                    {/* Left Column: Itinerary Builder */}
                    <div style={{ gridColumn: 'span 8', position: 'relative', zIndex: 20 }}>
                        <div style={{ 
                            background: 'white', 
                            padding: '3rem', 
                            borderRadius: '32px', 
                            boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <h2 className="text-h2" style={{ margin: 0, fontSize: '1.75rem' }}>Your Chronicle</h2>
                                    {selectedSiteIds.length > 0 && (
                                        <button 
                                            onClick={() => setShowMap(!showMap)}
                                            className="btn-text"
                                            style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}
                                        >
                                            <MapIcon size={16} /> {showMap ? 'Hide Map' : 'View Path'}
                                        </button>
                                    )}
                                </div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', fontStyle: 'italic', background: 'rgba(0,0,0,0.03)', padding: '4px 12px', borderRadius: '50px' }}>
                                    Drag to prioritize
                                </span>
                            </div>

                            <AnimatePresence>
                                {showMap && selectedSiteIds.length > 0 && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                                        animate={{ height: '400px', opacity: 1, marginBottom: '3rem' }}
                                        exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                                        style={{ borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                                    >
                                        <MapPreview sites={selectedSitesData} />
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
                                            border: '2px dashed rgba(0,0,0,0.08)', 
                                            borderRadius: '32px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '1.5rem'
                                        }}
                                    >
                                        <div style={{ padding: '20px', background: 'rgba(200, 163, 89, 0.05)', borderRadius: '50%', color: 'var(--color-accent)' }}>
                                            <MapIcon size={32} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Empty Scroll</h3>
                                            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '300px', margin: '0 auto' }}>Select sites from the Atlas to begin constructing your legacy journey.</p>
                                        </div>
                                        <button 
                                            onClick={() => navigate('/explore')} 
                                            className="btn btn-outline"
                                            style={{ marginTop: '1.5rem' }}
                                        >
                                            Browse the Atlas
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {/* Smart Suggestions */}
                        <div style={{ marginTop: '6rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.1))' }} />
                                <h3 className="text-h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.1rem', fontSize: '1rem' }}>Recommended Discoveries</h3>
                                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.1))' }} />
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
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
                                            className="suggestion-card heritage-tile" 
                                            style={{
                                                padding: '2rem',
                                                background: 'white',
                                                borderRadius: '32px',
                                                display: 'flex', 
                                                flexDirection: 'column',
                                                gap: '1.25rem',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                                                border: '1px solid rgba(0,0,0,0.02)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '80px', height: '80px', borderRadius: '20px', overflow: 'hidden', flexShrink: 0 }}>
                                                    <img src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} alt={site.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>{site.name}</h4>
                                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600 }}>{site.type}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedSiteIds([...selectedSiteIds, site.id])}
                                                className="btn-text"
                                                style={{ 
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    border: '1px solid rgba(0,0,0,0.08)',
                                                    borderRadius: '16px',
                                                    padding: '0.75rem',
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                <Plus size={16} /> Add to Itinerary
                                            </button>
                                        </motion.div>
                                    ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Navigator's Console */}
                    <div style={{ gridColumn: 'span 4', position: 'sticky', top: '120px', zIndex: 20 }}>
                         <div style={{ 
                             padding: '3rem 2.5rem', 
                             background: '#1A1A1A', 
                             borderRadius: '32px', 
                             boxShadow: '0 40px 80px rgba(0,0,0,0.15)',
                             color: 'white',
                             position: 'relative',
                             overflow: 'hidden'
                         }}>
                            {/* Accent Glow */}
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--color-accent)', filter: 'blur(80px)', opacity: 0.15 }}></div>

                            <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>Logistics Console</h3>

                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                                    Fiscal Limit (₹)
                                </label>
                                <input
                                    type="number"
                                    value={input.budget}
                                    onChange={e => setInput({ ...input, budget: Number(e.target.value) })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1.25rem', 
                                        borderRadius: '20px', 
                                        border: '1px solid rgba(255,255,255,0.08)', 
                                        background: 'rgba(255,255,255,0.03)',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        fontFamily: 'monospace'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                                    Expedition Period (Days)
                                </label>
                                <input
                                    type="number"
                                    value={input.days}
                                    onChange={e => setInput({ ...input, days: Number(e.target.value) })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1.25rem', 
                                        borderRadius: '20px', 
                                        border: '1px solid rgba(255,255,255,0.08)', 
                                        background: 'rgba(255,255,255,0.03)',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        fontFamily: 'monospace'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '3rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
                                    Assign Guild Expert
                                </label>
                                <select
                                    value={input.guideId}
                                    onChange={e => setInput({ ...input, guideId: e.target.value })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '1.25rem', 
                                        borderRadius: '20px', 
                                        border: '1px solid rgba(255,255,255,0.08)', 
                                        background: 'rgba(255,255,255,0.03)',
                                        color: 'white',
                                        appearance: 'none'
                                    }}
                                >
                                    <option value="">Independent Study</option>
                                    {guides.map(g => (
                                        <option key={g.id} value={g.id} style={{ background: '#1A1A1A' }}>{g.name} (₹{g.fee_per_day}/day)</option>
                                    ))}
                                </select>
                            </div>

                            <AnimatePresence>
                                {loading && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        exit={{ opacity: 0 }}
                                        style={{ color: 'var(--color-accent)', textAlign: 'center', fontSize: '0.85rem', marginBottom: '1rem', fontStyle: 'italic' }}
                                    >
                                        Running algorithmic check...
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {estimate && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Historic Entry Fees</span>
                                            <span>₹{estimate.breakdown.entryFees}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Expert Honorarium</span>
                                            <span>₹{estimate.breakdown.guideCost}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Estimated Provisions</span>
                                            <span>₹{estimate.breakdown.food + estimate.breakdown.accommodation + estimate.breakdown.transport}</span>
                                        </div>
                                    </div>

                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'baseline',
                                        marginTop: '1.5rem', 
                                        paddingTop: '2rem',
                                        borderTop: '2px dashed rgba(255,255,255,0.2)',
                                    }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Total Provision</span>
                                        <span style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: estimate.isWithinBudget ? 'var(--color-accent)' : 'var(--color-error)' }}>₹{estimate.totalCost.toLocaleString()}</span>
                                    </div>

                                    {!estimate.isWithinBudget && (
                                        <div style={{ 
                                            marginTop: '1rem', 
                                            color: '#fca5a5', 
                                            fontSize: '0.85rem', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.5rem',
                                            padding: '12px',
                                            background: 'rgba(220, 38, 38, 0.1)',
                                            borderRadius: '8px'
                                        }}>
                                            <Info size={16} /> Exceeds mapped budget.
                                        </div>
                                    )}

                                    <button
                                        style={{
                                            width: '100%',
                                            marginTop: '3rem',
                                            padding: '1.25rem',
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            letterSpacing: '0.1rem',
                                            textTransform: 'uppercase',
                                            background: estimate.isWithinBudget ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
                                            color: estimate.isWithinBudget ? 'black' : 'white',
                                            border: 'none',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                        onClick={() => {
                                            if (!isAuthenticated) navigate('/login');
                                            else setShowPayment(true);
                                        }}
                                    >
                                        {isAuthenticated ? 'Finalize Expedition' : 'Initialize Portal'}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
             <style>{`
                .btn-icon-danger {
                    background: transparent;
                    border: none;
                    color: rgba(0,0,0,0.2);
                    cursor: pointer;
                    padding: 10px;
                    transition: all 0.2s;
                }
                .btn-icon-danger:hover {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                }
                .btn-text {
                    background: transparent;
                    border: none;
                    color: var(--color-primary);
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-text:hover {
                    color: var(--color-accent);
                }
                .glass-input:focus {
                    outline: none;
                    border-color: var(--color-accent) !important;
                    background: rgba(255,255,255,0.1) !important;
                }
                @media (max-width: 1100px) {
                    .grid-12 > div {
                        grid-column: span 12 !important;
                    }
                    div[style*="sticky"] {
                        position: static !important;
                        margin-top: 3rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default TripBuilder;
