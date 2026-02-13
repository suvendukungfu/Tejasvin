import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { estimateTrip, getGuides, getSites, saveTrip } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { GripVertical, Trash2, Plus, Calendar, IndianRupee, User, Info, Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import MapPreview from '../components/MapPreview';

// --- Components ---

const SortableItem = ({ id, site, onRemove }: { id: number, site: any, onRemove: (id: number) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '1.25rem', 
        marginBottom: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        cursor: 'default',
        border: '1px solid rgba(255,255,255,0.6)'
    };

    return (
        <div ref={setNodeRef} style={style} className="card glass">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div {...attributes} {...listeners} style={{ cursor: 'grab', color: 'var(--color-primary)', padding: '0.5rem', opacity: 0.7 }}>
                    <GripVertical size={22} />
                </div>
                <img src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} alt={site.name} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>{site.name}</h4>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
                        Est. {site.avg_visit_time_mins} mins
                    </span>
                </div>
            </div>
            <button 
                onClick={() => onRemove(id)} 
                className="btn btn-outline"
                style={{ color: 'var(--color-error)', borderColor: 'rgba(198, 40, 40, 0.3)', padding: '0.5rem', borderRadius: '8px' }}
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
                onSuccess={async () => {
                    try {
                        // Call Backend
                        const response = await saveTrip({
                            userId: 1, // specific user ID or from context often better
                            name: `My Trip to ${selectedSitesData[0]?.name || 'History'}`,
                            totalCost: estimate?.totalCost,
                            totalTime: estimate?.totalTimeMinutes,
                            siteIds: selectedSiteIds,
                            guideId: input.guideId ? Number(input.guideId) : null
                        });

                        setShowPayment(false);
                        if (response.data && (response.data.success || response.data.tripId)) {
                            alert('Trip Successfully Booked and Saved!');
                            navigate('/bookings'); // Navigate to Bookings page
                        } else {
                            // Fallback for mock if needed
                            alert('Trip Booked! (Mock Saved)');
                            navigate('/');
                        }
                    } catch (err) {
                        console.error("Failed to save trip:", err);
                        alert('Payment successful, but failed to save trip details. Please contact support.');
                    }
                }}
            />
            
            <div className="container" style={{ padding: '3rem 2rem' }}>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Plan Your Trip</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>Curate your path through history. Collect stories, not just souvenirs.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }} className="trip-builder-grid">
                    
                    {/* Left Column: Itinerary Builder */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Your Itinerary</h2>
                                {selectedSiteIds.length > 0 && (
                                    <button 
                                        onClick={() => setShowMap(!showMap)}
                                        className="btn btn-outline"
                                        style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                                    >
                                        <MapIcon size={16} /> {showMap ? 'Hide Map' : 'View Map'}
                                    </button>
                                )}
                            </div>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Drag to reorder</span>
                        </div>

                        {showMap && selectedSiteIds.length > 0 && (
                            <div style={{ height: '350px', marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                                <MapPreview sites={selectedSitesData} />
                            </div>
                        )}

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
                                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>Your chronicle is waiting to be written.</p>
                                <button 
                                    onClick={() => navigate('/explore')} 
                                    className="btn btn-outline"
                                >
                                    Explore & Collect Stories
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
                                        <div key={site.id} className="card glass" style={{
                                            padding: '1.25rem',
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            gap: '1rem',
                                            border: '1px solid rgba(255,255,255,0.7)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img src={site.image_url || 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'} alt={site.name} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>{site.name}</h4>
                                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{site.type}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedSiteIds([...selectedSiteIds, site.id])}
                                                className="btn btn-primary"
                                                style={{ padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem' }}
                                            >
                                                <Plus size={18} /> Add
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Controls & Estimate */}
                    <div style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
                         <div className="card glass" style={{ padding: '2.5rem', border: '1px solid rgba(255,255,255,0.6)' }}>
                            <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Trip Details</h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                                    <IndianRupee size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }}/> Total Budget
                                </label>
                                <input
                                    type="number"
                                    value={input.budget}
                                    onChange={e => setInput({ ...input, budget: Number(e.target.value) })}
                                    className="modern-input"
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                                    <Calendar size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }}/> Duration (Days)
                                </label>
                                <input
                                    type="number"
                                    value={input.days}
                                    onChange={e => setInput({ ...input, days: Number(e.target.value) })}
                                    className="modern-input"
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                                    <User size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }}/> Local Guide
                                </label>
                                <select
                                    value={input.guideId}
                                    onChange={e => setInput({ ...input, guideId: e.target.value })}
                                    className="modern-input"
                                    style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232C2420' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                                >
                                    <option value="">No Guide</option>
                                    {guides.map(g => (
                                        <option key={g.id} value={g.id}>{g.name} (₹{g.fee_per_day}/day)</option>
                                    ))}
                                </select>
                            </div>

                            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)' }} />

                            {loading && <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center', fontStyle: 'italic' }}>Calculating best plan...</div>}

                            {estimate && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Entry Fees</span>
                                        <span style={{ fontWeight: 500 }}>₹{estimate.breakdown.entryFees}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Guide</span>
                                        <span style={{ fontWeight: 500 }}>₹{estimate.breakdown.guideCost}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Food & Stay (Est.)</span>
                                        <span style={{ fontWeight: 500 }}>₹{estimate.breakdown.food + estimate.breakdown.accommodation}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Transport (Est.)</span>
                                        <span style={{ fontWeight: 500 }}>₹{estimate.breakdown.transport}</span>
                                    </div>

                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        marginTop: '1.5rem', 
                                        paddingTop: '1.5rem',
                                        borderTop: '2px dashed rgba(0,0,0,0.1)',
                                        fontWeight: 800, 
                                        fontSize: '1.5rem',
                                        color: estimate.isWithinBudget ? 'var(--color-success)' : 'var(--color-error)',
                                        fontFamily: 'var(--font-heading)'
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
