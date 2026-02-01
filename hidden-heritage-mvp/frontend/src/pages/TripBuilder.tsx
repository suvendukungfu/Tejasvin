import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { estimateTrip, getGuides, getSites } from '../services/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { GripVertical } from 'lucide-react';

// --- Components ---

const SortableItem = ({ id, site, onRemove }: { id: number, site: any, onRemove: (id: number) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: '10px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div {...attributes} {...listeners} style={{ cursor: 'grab', color: '#999' }}>
                    <GripVertical size={20} />
                </div>
                <img src={site.image_url || 'https://placehold.co/100x100'} alt={site.name} style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                <div>
                    <h4 style={{ margin: 0 }}>{site.name}</h4>
                    <small>Est. {site.avg_visit_time_mins} mins</small>
                </div>
            </div>
            <button onClick={() => onRemove(id)} style={{ color: 'red', background: 'none', border: 'none' }}>Remove</button>
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
        <>
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
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

                {/* Left Column: Itinerary Builder */}
                <div>
                    <h1>Plan Your Journey</h1>
                    <p style={{ marginBottom: '2rem' }}>Drag and drop to reorder your itinerary.</p>

                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={selectedSiteIds} strategy={verticalListSortingStrategy}>
                            {selectedSitesData.map((site) => (
                                <SortableItem key={site.id} id={site.id} site={site} onRemove={handleRemove} />
                            ))}
                        </SortableContext>
                    </DndContext>

                    {selectedSiteIds.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed #ccc', borderRadius: '8px' }}>
                            <p>No sites selected.</p>
                            <button onClick={() => navigate('/explore')} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Browse Sites to Add</button>
                        </div>
                    )}
                    {/* Smart Suggestions */}
                    <div style={{ marginTop: '2rem' }}>
                        <h3>You Might Also Like</h3>
                        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                            {allSites
                                .filter(s => !selectedSiteIds.includes(s.id)) // Not already selected
                                .slice(0, 2) // Suggest 2
                                .map(site => (
                                    <div key={site.id} style={{
                                        padding: '1rem', border: '1px solid #ddd', borderRadius: '8px',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <img src={site.image_url} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                                            <div>
                                                <strong>{site.name}</strong>
                                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{site.type} • {site.avg_visit_time_mins} mins</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedSiteIds([...selectedSiteIds, site.id])}
                                            style={{ color: 'var(--color-secondary)', background: 'none', border: '1px solid var(--color-secondary)', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Add +
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Controls & Estimate */}
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', height: 'fit-content', position: 'sticky', top: '100px' }}>
                    <h3>Trip Settings</h3>

                    <div style={{ margin: '1rem 0' }}>
                        <label>Total Budget (INR)</label>
                        <input
                            type="number"
                            value={input.budget}
                            onChange={e => setInput({ ...input, budget: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        />
                    </div>

                    <div style={{ margin: '1rem 0' }}>
                        <label>Number of Days</label>
                        <input
                            type="number"
                            value={input.days}
                            onChange={e => setInput({ ...input, days: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        />
                    </div>

                    <div style={{ margin: '1rem 0' }}>
                        <label>Add a Guide</label>
                        <select
                            value={input.guideId}
                            onChange={e => setInput({ ...input, guideId: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        >
                            <option value="">No Guide</option>
                            {guides.map(g => (
                                <option key={g.id} value={g.id}>{g.name} (₹{g.fee_per_day}/day)</option>
                            ))}
                        </select>
                    </div>

                    <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #eee' }} />

                    {loading && <p>Calculaing...</p>}

                    {estimate && (
                        <div>
                            <h3>Estimated Cost</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Entry Fees</span>
                                <span>₹{estimate.breakdown.entryFees}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Guide</span>
                                <span>₹{estimate.breakdown.guideCost}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#666' }}>
                                <span>Est. Food & Stay</span>
                                <span>₹{estimate.breakdown.food + estimate.breakdown.accommodation}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#666' }}>
                                <span>Est. Transport</span>
                                <span>₹{estimate.breakdown.transport}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                <span>Total</span>
                                <span style={{ color: estimate.isWithinBudget ? 'green' : 'red' }}>₹{estimate.totalCost}</span>
                            </div>
                            {!estimate.isWithinBudget && <small style={{ color: 'red' }}>Over Budget</small>}

                            <div style={{ marginTop: '1rem' }}>
                                <strong>Calculated Time:</strong> {Math.floor(estimate.totalTimeMinutes / 60)} hrs {estimate.totalTimeMinutes % 60} mins
                                {estimate.recommendedDays > input.days && (
                                    <p style={{ color: 'orange', fontSize: '0.9rem' }}>Warning: {estimate.recommendedDays} days recommended for this itinerary.</p>
                                )}
                            </div>

                            <button
                                style={{
                                    width: '100%',
                                    marginTop: '2rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--color-secondary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    opacity: isAuthenticated ? 1 : 0.7
                                }}
                                onClick={() => {
                                    if (!isAuthenticated) navigate('/login');
                                    else setShowPayment(true);
                                }}
                            >
                                {isAuthenticated ? 'Pay & Book Now' : 'Login to Book'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TripBuilder;
