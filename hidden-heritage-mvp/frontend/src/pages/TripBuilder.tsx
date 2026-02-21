import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { estimateTrip, getGuides, getSites, saveTrip } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { GripVertical, Trash2, Plus, Clock, Target, Shield, CheckCircle2, ChevronRight, Map as MapIcon, Info, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MapPreview from '../components/MapPreview';

// --- Heritage Neutral Theme Constants ---
const THEME = {
    bg: '#F9F7F2', // Warm Sandstone Beige
    surface: '#FFFFFF', // Pure White / Ivory
    surfaceSecondary: '#F0EDE4', // Soft Stone Contrast
    accent: '#B89550', // Muted Sandstone Gold
    textPrimary: '#2A2A2A', // Deep Charcoal
    textSecondary: '#6D6D6D', // Warm Gray
    border: 'rgba(0, 0, 0, 0.08)',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
    glass: 'rgba(255, 255, 255, 0.8)',
};

// --- Components ---

const MissionTile = ({ id, site, onRemove }: { id: number, site: any, onRemove: (id: number) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    return (
        <motion.div 
            ref={setNodeRef} 
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                zIndex: isDragging ? 100 : 1,
                marginBottom: '1rem'
            }} 
            layout
        >
             <div style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '1.25rem',
                 padding: '1.25rem', 
                 background: THEME.surface,
                 borderRadius: '12px', 
                 border: `1px solid ${isDragging ? THEME.accent : THEME.border}`,
                 boxShadow: isDragging ? '0 30px 60px rgba(0,0,0,0.1)' : THEME.shadow,
                 transition: 'all 0.3s'
             }}>
                <div {...attributes} {...listeners} style={{ cursor: 'grab', color: THEME.textSecondary, display: 'flex' }}>
                    <GripVertical size={20} />
                </div>
                
                <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img 
                        src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} 
                        alt={site.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                </div>

                <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: THEME.textPrimary, fontWeight: 600, letterSpacing: '-0.01em' }}>{site.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', color: THEME.textSecondary, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Clock size={12} /> {site.avg_visit_time_mins}m
                        </span>
                        <span style={{ fontSize: '0.7rem', color: THEME.accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Sequence</span>
                    </div>
                </div>

                <button onClick={() => onRemove(id)} style={{ background: 'transparent', border: 'none', color: '#E5E5E5', cursor: 'pointer', padding: '0.5rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF4D4D'} onMouseLeave={(e) => e.currentTarget.style.color = '#E5E5E5'}>
                    <Trash2 size={16} />
                </button>
            </div>
        </motion.div>
    );
};

const TripBuilder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    // State
    const [selectedSiteIds, setSelectedSiteIds] = useState<number[]>(location.state?.initialSelection || []);
    const [allSites, setAllSites] = useState<any[]>([]);
    const [guides, setGuides] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [estimate, setEstimate] = useState<any>(null);
    const [checkoutStep, setCheckoutStep] = useState<'review' | 'funding' | 'success' | null>(null);

    const [input, setInput] = useState({
        budget: 20000,
        days: 3,
        guideId: '',
        supportLevel: 'expert'
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        getSites().then(res => setAllSites(res.data)).catch(console.error);
        getGuides().then(res => setGuides(res.data)).catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedSiteIds.length > 0) calculate();
        else setEstimate(null);
    }, [selectedSiteIds, input]);

    const calculate = async () => {
        setLoading(true);
        try {
            const res = await estimateTrip({
                siteIds: selectedSiteIds,
                days: input.days,
                budget: input.budget,
                guideId: input.guideId ? Number(input.guideId) : undefined
            });
            setEstimate(res.data);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const handleToggleSite = (id: number) => {
        setSelectedSiteIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
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

    const selectedSitesData = selectedSiteIds.map(id => allSites.find(s => s.id === id)).filter(s => !!s);

    return (
        <div className="min-h-screen" style={{ background: THEME.bg, color: THEME.textPrimary }}>
            <NavBar />
            
            <PaymentModal
                isOpen={checkoutStep !== null && checkoutStep !== 'success'}
                onClose={() => setCheckoutStep(null)}
                amount={estimate ? Math.round(estimate.totalCost * 1.18) : 0}
                onSuccess={async () => {
                    try {
                        await saveTrip({
                            userId: user?.id || 1,
                            name: `Expedition: ${selectedSitesData[0]?.name || 'Explorer'}`,
                            totalCost: estimate?.totalCost,
                            totalTime: estimate?.totalTimeMinutes,
                            siteIds: selectedSiteIds,
                            guideId: input.guideId ? Number(input.guideId) : null
                        });
                        setCheckoutStep('success');
                    } catch (err) { alert('Authorization failed. Contact Command.'); }
                }}
            />

            {/* Redesigned Success Overlay (Light Archive Theme) */}
            <AnimatePresence>
                {checkoutStep === 'success' && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(249, 247, 242, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
                    >
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', maxWidth: '440px', padding: '3rem', background: 'white', borderRadius: '24px', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F0E6D2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                <CheckCircle2 size={40} color={THEME.accent} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontFamily: 'serif', marginBottom: '1rem', color: THEME.textPrimary }}>Mission Logged</h2>
                            <p style={{ color: THEME.textSecondary, marginBottom: '2.5rem', lineHeight: 1.6 }}>Your expedition parameters have been archived. Specialist support has been notified of your sequence.</p>
                            <button 
                                onClick={() => navigate('/bookings')} 
                                style={{ width: '100%', background: THEME.accent, border: 'none', color: 'white', padding: '1.25rem', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                View My Archive
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 3-COLUMN DASHBOARD --- */}
            <div className="grid-12" style={{ height: '100vh', paddingTop: '80px', gap: 0 }}>
                
                {/* 1. LEFT: Interactive Map Panel (Light Theme) */}
                <div className="builder-map-panel" style={{ background: THEME.surfaceSecondary, borderRight: `1px solid ${THEME.border}`, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: THEME.glass, padding: '0.6rem 1rem', borderRadius: '100px', backdropFilter: 'blur(10px)', border: `1px solid ${THEME.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                             <MapIcon size={14} color={THEME.accent} />
                             <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: THEME.textPrimary }}>Expedition Map</span>
                         </div>
                    </div>
                    {/* Map container with soft Ivory panel styling */}
                    <div style={{ width: '100%', height: '100%', padding: '1rem' }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', border: `4px solid white`, boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
                             <MapPreview sites={allSites} selectedSiteIds={selectedSiteIds} onToggleSite={handleToggleSite} />
                        </div>
                    </div>
                </div>

                {/* 2. CENTER: Mission Setup (Target Sequence) */}
                <div className="builder-main-panel" style={{ overflowY: 'auto', padding: '2.5rem 4rem', background: THEME.bg }}>
                    <div style={{ marginBottom: '3.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: THEME.accent, marginBottom: '0.75rem' }}>
                            <Lock size={12} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Consolidated Archive</span>
                        </div>
                        <h1 className="builder-title" style={{ fontSize: '2.8rem', fontFamily: 'serif', color: THEME.textPrimary, margin: 0, fontWeight: 500, letterSpacing: '-0.02em' }}>Mission Setup</h1>
                        <p style={{ color: THEME.textSecondary, marginTop: '1.25rem', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '90%' }}>Each expedition begins with intentional curation. Configure your sequence to unlock specialist logistics and archival support.</p>
                    </div>

                    <div style={{ minHeight: '300px' }}>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={selectedSiteIds} strategy={verticalListSortingStrategy}>
                                {selectedSitesData.map((site) => (
                                    <MissionTile key={site.id} id={site.id} site={site} onRemove={handleToggleSite} />
                                ))}
                            </SortableContext>
                        </DndContext>

                        {selectedSiteIds.length === 0 && (
                            <div style={{ padding: '6rem 2rem', textAlign: 'center', border: `2px dashed ${THEME.border}`, borderRadius: '24px', background: 'rgba(255,255,255,0.4)' }}>
                                <Target size={32} color={THEME.textSecondary} style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
                                <h3 style={{ fontSize: '0.85rem', color: THEME.textSecondary, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>No Destinations Selected</h3>
                                <p style={{ fontSize: '0.85rem', color: THEME.textSecondary, marginTop: '0.75rem', opacity: 0.8 }}>Use the digital map or explore sectors below.</p>
                            </div>
                        )}
                    </div>

                    {/* Editorial Sector Recommendations */}
                    <div style={{ marginTop: '6rem', borderTop: `1px solid ${THEME.border}`, paddingTop: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                            <Info size={16} color={THEME.accent} />
                            <h3 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', color: THEME.textPrimary, fontWeight: 800 }}>Field Intelligence</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                            {allSites.filter(s => !selectedSiteIds.includes(s.id)).slice(0, 2).map((site) => (
                                <div key={site.id} style={{ background: THEME.surface, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${THEME.border}`, transition: 'all 0.3s', boxShadow: THEME.shadow }}>
                                    <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))' }} />
                                        <img src={site.image_url} alt={site.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '1.25rem' }}>
                                        <h4 style={{ margin: 0, fontSize: '1rem', color: THEME.textPrimary, fontWeight: 600 }}>{site.name}</h4>
                                        <button 
                                            onClick={() => handleToggleSite(site.id)}
                                            style={{ marginTop: '1.25rem', width: '100%', background: '#F5F5F3', border: `1px solid ${THEME.border}`, color: THEME.textPrimary, padding: '0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', letterSpacing: '0.05em', transition: 'all 0.2s' }}
                                            onMouseEnter={(e) => {e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = THEME.accent;}}
                                            onMouseLeave={(e) => {e.currentTarget.style.background = '#F5F5F3'; e.currentTarget.style.borderColor = THEME.border;}}
                                        >
                                            <Plus size={14} /> ADD TO BRIEF
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. RIGHT: Logistics & Funding Panel (Refined Neutral) */}
                <div className="builder-side-panel" style={{ background: THEME.surface, borderLeft: `1px solid ${THEME.border}`, padding: '3rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: THEME.textSecondary, marginBottom: '3rem', fontWeight: 800 }}>Expedition Logistics</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: THEME.textSecondary, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Budget (INR)</label>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        type="number" value={input.budget} 
                                        onChange={e => setInput({ ...input, budget: Number(e.target.value) })}
                                        style={{ width: '100%', background: THEME.bg, border: `1px solid ${THEME.border}`, padding: '1rem 1.25rem', borderRadius: '12px', color: THEME.textPrimary, fontSize: '1.1rem', outline: 'none', fontWeight: 600 }}
                                    />
                                    <div style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: THEME.textSecondary, fontWeight: 700 }}>INR</div>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: THEME.textSecondary, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expedition Duration (Days)</label>
                                <input 
                                    type="number" value={input.days} 
                                    onChange={e => setInput({ ...input, days: Number(e.target.value) })}
                                    style={{ width: '100%', background: THEME.bg, border: `1px solid ${THEME.border}`, padding: '1rem 1.25rem', borderRadius: '12px', color: THEME.textPrimary, fontSize: '1.1rem', outline: 'none' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: THEME.textSecondary, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Specialist Assignment</label>
                                <select 
                                    value={input.guideId} onChange={e => setInput({ ...input, guideId: e.target.value })}
                                    style={{ width: '100%', background: THEME.bg, border: `1px solid ${THEME.border}`, padding: '1rem 1.25rem', borderRadius: '12px', color: THEME.textPrimary, fontSize: '0.95rem', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                                >
                                    <option value="">No Specialist Support</option>
                                    {guides.map(g => <option key={g.id} value={g.id}>{g.name} — {g.specialty}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ paddingTop: '2.5rem', borderTop: `1px solid ${THEME.border}` }}>
                        {estimate ? (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span style={{ color: THEME.textSecondary }}>Projected Outlay</span>
                                        <span style={{ color: THEME.textPrimary, fontWeight: 600 }}>₹{estimate.totalCost.toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span style={{ color: THEME.textSecondary }}>Estimated Field Time</span>
                                        <span style={{ color: THEME.textPrimary, fontWeight: 600 }}>{Math.ceil(estimate.totalTimeMinutes / 60)} Hours</span>
                                    </div>
                                </div>

                                <div style={{ background: THEME.surfaceSecondary, border: `1px solid ${THEME.border}`, padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                                    <div style={{ fontSize: '0.7rem', color: THEME.textSecondary, textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800, letterSpacing: '0.05em' }}>Financial Brief</div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: `1px solid ${THEME.border}`, paddingBottom: '1.25rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: THEME.textSecondary }}>Base Expedition Fees</span>
                                            <span style={{ color: THEME.textPrimary, fontWeight: 500 }}>₹{(estimate.breakdown.entryFees + estimate.breakdown.transport + estimate.breakdown.food + estimate.breakdown.accommodation).toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: THEME.textSecondary }}>Specialist Support</span>
                                            <span style={{ color: THEME.textPrimary, fontWeight: 500 }}>₹{estimate.breakdown.guideCost.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                            <span style={{ color: THEME.textSecondary }}>Heritage Tax (18% GST)</span>
                                            <span style={{ color: THEME.textPrimary, fontWeight: 500 }}>₹{(estimate.totalCost * 0.18).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: 500, color: (estimate.totalCost * 1.18) <= input.budget ? THEME.textPrimary : '#DC2626', fontFamily: 'serif' }}>₹{(estimate.totalCost * 1.18).toLocaleString()}</span>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <span style={{ fontSize: '0.6rem', color: THEME.textSecondary, fontWeight: 700, textTransform: 'uppercase' }}>Total Authorized</span>
                                            <span style={{ fontSize: '0.75rem', color: THEME.accent, fontWeight: 700 }}>VERIFIED</span>
                                        </div>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {(estimate.totalCost * 1.18) > input.budget && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }} 
                                                animate={{ height: 'auto', opacity: 1 }} 
                                                exit={{ height: 0, opacity: 0 }}
                                                style={{ marginTop: '1.25rem', background: 'rgba(220, 38, 38, 0.05)', border: '1px solid rgba(220, 38, 38, 0.2)', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                                            >
                                                <Shield size={16} color="#DC2626" />
                                                <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 600, lineHeight: 1.4 }}>
                                                    OVER BUDGET: This sequence requires ₹{((estimate.totalCost * 1.18) - input.budget).toLocaleString()} additional funding.
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02, backgroundColor: '#000' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        if (!isAuthenticated) navigate('/login');
                                        else setCheckoutStep('review');
                                    }}
                                    disabled={loading}
                                    style={{ 
                                        width: '100%', 
                                        background: THEME.textPrimary, 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '1.25rem', 
                                        borderRadius: '12px', 
                                        fontWeight: 700, 
                                        fontSize: '0.85rem', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.15em', 
                                        cursor: 'pointer', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        gap: '0.75rem',
                                        transition: 'all 0.3s',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {loading ? 'CALCULATING...' : (
                                        <>
                                            PROCEED TO SECURE PAYMENT <ChevronRight size={18} />
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: '#FDFDFB', borderRadius: '16px', border: `1px dashed ${THEME.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <Lock size={24} color={THEME.textSecondary} style={{ opacity: 0.2 }} />
                                <span style={{ fontSize: '0.75rem', color: THEME.textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Logistics Locked</span>
                                <p style={{ fontSize: '0.75rem', color: THEME.textSecondary, opacity: 0.6, lineHeight: 1.5, margin: 0 }}>Select mission targets on the map to initialize regional logistics and cost estimation.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <style>{`
                .grid-12 { display: grid; grid-template-columns: repeat(12, 1fr); }
                .builder-map-panel { grid-column: span 4; height: calc(100vh - 80px); }
                .builder-main-panel { grid-column: span 5; height: calc(100vh - 80px); }
                .builder-side-panel { grid-column: span 3; height: calc(100vh - 80px); }

                @media (max-width: 1200px) {
                    .builder-map-panel { grid-column: span 12; height: 400px; }
                    .builder-main-panel { grid-column: span 7; height: auto; }
                    .builder-side-panel { grid-column: span 5; height: auto; }
                }

                @media (max-width: 900px) {
                    .builder-main-panel { grid-column: span 12; padding: 2rem !important; }
                    .builder-side-panel { grid-column: span 12; border-left: none; border-top: 1px solid ${THEME.border}; }
                    .builder-title { font-size: 2.2rem !important; }
                }

                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #E0DDD5; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #CEC9BC; }
            `}</style>
        </div>
    );
};

export default TripBuilder;
