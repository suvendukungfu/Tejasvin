import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import { getSiteBySlug, getSafetyScore, getAiStory } from '../services/api';
import { Shield, Smartphone, Sparkles } from 'lucide-react';

const SiteDetail = () => {
    const { slug } = useParams();
    const [site, setSite] = useState<any>(null);
    const [story, setStory] = useState<any>(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [persona, setPersona] = useState('Tourist');
    const [safetyData, setSafetyData] = useState<any>(null);

    useEffect(() => {
        if (site?.id) {
            getSafetyScore(site.id).then(res => setSafetyData(res.data || res)).catch(console.error);
        }
    }, [site]);

    // Safety logic
    const currentScore = safetyData?.score ?? site?.safety_score ?? 8;
    const advisory = safetyData?.details?.advisory || 'Standard Advisory';

    useEffect(() => {
        if (slug) {
            getSiteBySlug(slug).then(res => setSite(res.data)).catch(console.error);
        }
    }, [slug]);

    const fetchAiStory = async () => {
        if (!site) return;
        setAiLoading(true);
        try {
            const res = await getAiStory({
                siteName: site.name,
                persona
            });
            setStory(res.data || res);
        } catch (e) {
            const navigate = useNavigate();

            // Mock data based on slug, real app would fetch from API
            const site = {
                name: slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                description: "A breathtaking example of medieval architecture, standing testament to the region's rich history. Explore the intricate carvings, vast courtyards, and panoramic views from the ramparts.",
                image: "https://images.unsplash.com/photo-1644903526978-0cb9947849aa?q=80&w=2070&auto=format&fit=crop",
                location: "Morena District, Madhya Pradesh",
                timings: "Sunrise to Sunset",
                entry_fee: "₹25 (Indians), ₹300 (Foreigners)",
                history: "Built in the 11th century, this site has witnessed the rise and fall of dynasties. It was believed to be a center for higher learning and astronomy."
            };

            return (
                <div className="min-h-screen bg-bg-body">
                    <NavBar />
                    <h3>Gallery</h3>
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <img src="https://placehold.co/300x200" style={{ borderRadius: '8px' }} />
                        <img src="https://placehold.co/300x200" style={{ borderRadius: '8px' }} />
                        <img src="https://placehold.co/300x200" style={{ borderRadius: '8px' }} />
                    </div>
                </div>

                    {/* AI Storyteller */ }
            <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#fdf8f4', borderRadius: '12px', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Sparkles color="var(--color-secondary)" />
                    <h3>AI History Narrator</h3>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Choose Perspective: </label>
                    <select value={persona} onChange={(e) => setPersona(e.target.value)} style={{ padding: '0.3rem', borderRadius: '4px' }}>
                        <option value="Tourist">Casual Tourist</option>
                        <option value="Student">History Student</option>
                        <option value="Researcher">Academic Researcher</option>
                    </select>
                </div>

                {story ? (
                    <div className="fade-in">
                        <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: '#444' }}>"{story.content}"</p>
                        <small style={{ display: 'block', marginTop: '1rem', color: '#888' }}>Suggested Question: {story.suggested_followup}</small>
                        <button onClick={() => setStory(null)} style={{ marginTop: '1rem', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}>Reset</button>
                    </div>
                ) : (
                    <button
                        onClick={fetchAiStory}
                        disabled={aiLoading}
                        style={{ backgroundColor: 'var(--color-secondary)', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        {aiLoading ? 'Generating...' : 'Tell me a story'}
                    </button>
                )}
            </div>
                </div >

    {/* Sidebar */ }
    < div style = {{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>



                        // Sidebar - Safety Badge
                    const currentScore = safetyData?.score ?? site.safety_score ?? 8;
const advisory = safetyData?.details?.advisory || 'Standard Advisory';

return (
    <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Shield color={currentScore >= 8 ? 'green' : currentScore >= 5 ? 'orange' : 'red'} />
            <h3>Safety Readiness (Live)</h3>
        </div>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: currentScore >= 8 ? 'green' : currentScore >= 5 ? 'orange' : 'red' }}>
            {currentScore}/10
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
            {advisory}
        </p>

        {safetyData?.details && (
            <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '0.8rem' }}>
                <p style={{ margin: 0 }}><strong>Weather:</strong> {safetyData.details.weather}</p>
                <p style={{ margin: 0 }}><strong>Recent Reports:</strong> {safetyData.details.reports}</p>
            </div>
        )}

        {/* Fallback Static Details */}
        {!safetyData && site.safety_details && (
            <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                {Object.entries(site.safety_details).map(([key, val]: any) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span style={{ textTransform: 'capitalize', color: '#888' }}>{key}:</span>
                        <span>{val}</span>
                    </div>
                ))}
            </div>
        )}
    </div>

                    {/* AR Info */ }
<div style={{ padding: '1.5rem', backgroundColor: '#eef2f5', borderRadius: '12px', color: '#444' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <Smartphone />
        <h3 style={{ margin: 0 }}>AR Experience</h3>
    </div>
    {site.ar_content_available ? (
        <div>
            <p>Immersive 3D content available.</p>
            <button style={{ marginTop: '0.5rem', width: '100%', padding: '0.5rem', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px' }}>Launch AR View</button>
        </div>
    ) : (
        <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>AR reconstruction coming soon for this site.</p>
    )}
</div>

{/* Quick Facts */ }
<div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <h3>Quick Facts</h3>
    <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}><strong>Entry:</strong> ₹{site.entry_fee}</li>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}><strong>Time:</strong> {site.avg_visit_time_mins} mins</li>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}><strong>Type:</strong> {site.type}</li>
    </ul>
</div>

                </div >

            </div >
        </>
    );
};

export default SiteDetail;
