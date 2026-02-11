import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { estimateTrip, getGuides, getSites } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { GripVertical, Trash2, Plus, Calendar, IndianRupee, User, Info } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Components ---

const SortableItem = ({ id, site, onRemove }: { id: number, site: any, onRemove: (id: number) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="card" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div {...attributes} {...listeners} style={{ cursor: 'grab', color: 'var(--color-text-secondary)', padding: '0.5rem' }}>
                    <GripVertical size={20} />
                </div>
                <img src={site.image_url || 'https://placehold.co/100x100'} alt={site.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{site.name}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Est. {site.avg_visit_time_mins} mins</span>
                </div>
            </div>
            <button 
                onClick={() => onRemove(id)} 
                className="btn btn-outline"
                style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)', padding: '0.4rem', borderRadius: '6px' }}
                title="Remove"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

// --- Main Page ---

const TripBuilder = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // State
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
    const { isAuthenticated } = useAuth(); // Assuming useAuth imported

    const handleRemove = (id: number) => {
        setSelectedSiteIds(ids => ids.filter(i => i !== id));
    };

    const selectedSitesData = selectedSiteIds.map(id => allSites.find(s => s.id === id)).filter(s => !!s);

    return (
        <div className="min-h-screen bg-bg-body">
            <NavBar />
            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={estimate?.totalCost || 0}
                onSuccess={() => {
                    setShowPayment(false);
                    alert('Trip Successfully Booked!');
                    navigate('/'); // Or to a 'My Trips' page
                }}
            />
            
            <div className="container" style={{ padding: '3rem 2rem' }}>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Plan Your Journey</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Customize your itinerary, get cost estimates, and book local guides.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }} className="trip-builder-grid">
                    
                    {/* Left Column: Itinerary Builder */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Your Itinerary</h2>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Drag to reorder</span>
                        </div>

                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={selectedSiteIds} strategy={verticalListSortingStrategy}>
                                {selectedSitesData.map((site) => (
                                    <div key={site.id} className="card" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                         {/* We need to use SortableItem component to properly hook into dnd-kit. 
                                             Swapping the div above for the SortableItem component defined earlier. 
                                             Note: The styling in SortableItem needs to match the card class.
                                         */}
                                        <SortableItem id={site.id} site={site} onRemove={handleRemove} />
                                    </div>
                                ))}
                            </SortableContext>
                        </DndContext>
                        
                        {/* Fix: SortableItem needs to be direct child? No, SortableContext needs items. 
                            The map above wraps SortableItem in a div which might break ref.
                            Actually, let's just render SortableItem directly in the map.
                        */}
                         <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={selectedSiteIds} strategy={verticalListSortingStrategy}>
                                {selectedSitesData.map((site) => (
                                    <SortableItem key={site.id} id={site.id} site={site} onRemove={handleRemove} />
                                ))}
                            </SortableContext>
                        </DndContext>


                        {selectedSiteIds.length === 0 && (
                            <div style={{ 
                                padding: '3rem', 
                                textAlign: 'center', 
                                border: '2px dashed #ddd', 
                                borderRadius: '12px',
                                backgroundColor: 'rgba(0,0,0,0.02)'
                            }}>
                                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>No sites selected for your trip yet.</p>
                                <button 
                                    onClick={() => navigate('/explore')} 
                                    className="btn btn-outline"
                                >
                                    Browse Sites to Add
                                </button>
                            </div>
                        )}

                        {/* Smart Suggestions */}
                        <div style={{ marginTop: '4rem' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>You Might Also Like</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {allSites
                                    .filter(s => !selectedSiteIds.includes(s.id)) // Not already selected
                                    .slice(0, 4) // Suggest 4
                                    .map(site => (
                                        <div key={site.id} className="card" style={{
                                            padding: '1rem',
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img src={site.image_url} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{site.name}</h4>
                                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{site.type}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedSiteIds([...selectedSiteIds, site.id])}
                                                className="btn btn-outline"
                                                style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.9rem' }}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Controls & Estimate */}
                    <div style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
                         <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Trip Settings</h3>

                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                                    <IndianRupee size={14} style={{ display: 'inline', marginRight: '4px' }}/> Total Budget
                                </label>
                                <input
                                    type="number"
                                    value={input.budget}
                                    onChange={e => setInput({ ...input, budget: Number(e.target.value) })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.8rem', 
                                        borderRadius: '6px', 
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                                    <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }}/> Duration (Days)
                                </label>
                                <input
                                    type="number"
                                    value={input.days}
                                    onChange={e => setInput({ ...input, days: Number(e.target.value) })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.8rem', 
                                        borderRadius: '6px', 
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                                    <User size={14} style={{ display: 'inline', marginRight: '4px' }}/> Local Guide
                                </label>
                                <select
                                    value={input.guideId}
                                    onChange={e => setInput({ ...input, guideId: e.target.value })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.8rem', 
                                        borderRadius: '6px', 
                                        border: '1px solid #ddd',
                                        fontSize: '1rem',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <option value="">No Guide</option>
                                    {guides.map(g => (
                                        <option key={g.id} value={g.id}>{g.name} (₹{g.fee_per_day}/day)</option>
                                    ))}
                                </select>
                            </div>

                            <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid #eee' }} />

                            {loading && <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>Calculating best plan...</div>}

                            {estimate && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Entry Fees</span>
                                        <span>₹{estimate.breakdown.entryFees}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Guide</span>
                                        <span>₹{estimate.breakdown.guideCost}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Food & Stay (Est.)</span>
                                        <span>₹{estimate.breakdown.food + estimate.breakdown.accommodation}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Transport (Est.)</span>
                                        <span>₹{estimate.breakdown.transport}</span>
                                    </div>

                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        marginTop: '1.5rem', 
                                        paddingTop: '1rem',
                                        borderTop: '1px dashed #ddd',
                                        fontWeight: 700, 
                                        fontSize: '1.3rem',
                                        color: estimate.isWithinBudget ? 'var(--color-success)' : 'var(--color-error)'
                                    }}>
                                        <span>Total Est.</span>
                                        <span>₹{estimate.totalCost}</span>
                                    </div>
                                    {!estimate.isWithinBudget && (
                                        <div style={{ 
                                            marginTop: '0.5rem', 
                                            color: 'var(--color-error)', 
                                            fontSize: '0.85rem', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.25rem' 
                                        }}>
                                            <Info size={14} /> Exceeds your budget of ₹{input.budget}
                                        </div>
                                    )}

                                    <div style={{ marginTop: '1.5rem', padding: '0.8rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: '6px', fontSize: '0.9rem' }}>
                                        <strong>Total Time:</strong> {Math.floor(estimate.totalTimeMinutes / 60)} hrs {estimate.totalTimeMinutes % 60} mins
                                        {estimate.recommendedDays > input.days && (
                                            <p style={{ color: 'var(--color-warning)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Info size={14} /> We recommend {estimate.recommendedDays} days for this trip.
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        style={{
                                            width: '100%',
                                            marginTop: '1.5rem',
                                            opacity: isAuthenticated ? 1 : 0.8
                                        }}
                                        className="btn btn-primary"
                                        onClick={() => {
                                            if (!isAuthenticated) navigate('/login');
                                            else setShowPayment(true);
                                        }}
                                    >
                                        {isAuthenticated ? 'Pay & Book Now' : 'Login to Book'}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 900px) {
                    .trip-builder-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default TripBuilder;
