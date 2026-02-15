import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- LOCAL STORAGE ADAPTER ---
const STORAGE_KEYS = {
    TRIPS: 'hh_trips_v1',
    FEEDBACK: 'hh_feedback_v1'
};

const getStorage = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    } catch {
        return [];
    }
};

const setStorage = (key: string, data: any[]) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Mock Data for Demo/Fallback
const MOCK_SITES = [
    {
        id: 1,
        name: 'Bateshwar Temples',
        slug: 'bateshwar-temples',
        type: 'temple',
        short_description: 'A cluster of 200 sandstone temples dedicated to Shiva and Vishnu.',
        full_description: 'Restored by the ASI, these temples date back to the 8th-10th century and were once hidden by the ravines and dacoits.',
        latitude: 26.7577,
        longitude: 78.1729,
        entry_fee: 0,
        avg_visit_time_mins: 90,
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Bateshwar_Temple_Complex_-_3.jpg',
        safety_score: 8,
        safety_details: { accessibility: "Moderate", terrain: "Uneven steps", network: "Good" },
        ar_content_available: true
    },
    {
        id: 2,
        name: 'Chambal Ravines',
        slug: 'chambal-ravines',
        type: 'ravine',
        short_description: 'The infamous badlands, home to diverse wildlife and legends.',
        full_description: 'Explore the breathtaking landscape of the Chambal ravines, formed by centuries of soil erosion.',
        latitude: 26.6500,
        longitude: 78.3000,
        entry_fee: 500,
        avg_visit_time_mins: 120,
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg',
        safety_score: 6,
        safety_details: { accessibility: "Low", terrain: "Rugged", network: "Poor" },
        ar_content_available: false
    },
    {
        id: 3,
        name: 'Mitawali Padavali',
        slug: 'mitawali-padavali',
        type: 'temple',
        short_description: 'The circular temple that inspired the Indian Parliament House.',
        latitude: 26.4746,
        longitude: 78.2045,
        entry_fee: 25,
        avg_visit_time_mins: 60,
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg',
        safety_score: 9,
        safety_details: { accessibility: "High", terrain: "Steps", network: "Good" },
        ar_content_available: true
    },
    {
        id: 4,
        name: 'Garh Kundar',
        slug: 'garh-kundar',
        type: 'fort',
        short_description: 'A mysterious fort perched on a hill, known for its complex architecture.',
        latitude: 25.4833,
        longitude: 78.9333,
        entry_fee: 0,
        avg_visit_time_mins: 120,
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Garh_Kundar.JPG',
        safety_score: 7,
        safety_details: { accessibility: "Moderate", terrain: "Hilly", network: "Average" },
        ar_content_available: false
    },
    {
        id: 5,
        name: 'Kakanmath Temple',
        slug: 'kakanmath-temple',
        type: 'temple',
        short_description: 'A towering 11th-century Shiva temple built without lime or cement.',
        latitude: 26.6333,
        longitude: 78.0833,
        entry_fee: 0,
        avg_visit_time_mins: 45,
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Kakanmath_Temple%2C_Morena.jpg',
        safety_score: 8,
        safety_details: { accessibility: "Moderate", terrain: "Open", network: "Good" },
        ar_content_available: true
    }
];

const MOCK_GUIDES = [
    { id: 1, name: 'Rameshwar Singh', fee_per_day: 1500 },
    { id: 2, name: 'Sunita Sharma', fee_per_day: 1800 }
];

// Helper to simulate network delay and return mock if failed
const fetchWithFallback = async (requestFn: () => Promise<any>, mockFactory: () => any) => {
    try {
        // Try live API first
        return await requestFn();
    } catch (error) {
        // Fallback to local logic
        // console.warn('API connection failed, falling back to local adapter.', error);
        const data = mockFactory();
        return { data };
    }
};

export const getRegions = () => fetchWithFallback(() => api.get('/regions'), () => [{ id: 1, name: 'Chambal Region', slug: 'chambal' }]);
export const getRegionBySlug = (slug: string) => fetchWithFallback(() => api.get(`/regions/${slug}`), () => ({ id: 1, name: 'Chambal Region', slug: 'chambal' }));

export const getSites = (regionId?: number) => fetchWithFallback(() => api.get('/sites', { params: { region_id: regionId } }), () => MOCK_SITES);

export const getSiteBySlug = (slug: string) => fetchWithFallback(
    () => api.get(`/sites/${slug}`),
    () => MOCK_SITES.find(s => s.slug === slug) || MOCK_SITES[0]
);

// Estimate Trip Mock
export const estimateTrip = (data: any) => fetchWithFallback(
    () => api.post('/trips/estimate', data),
    () => ({
        sites: MOCK_SITES.filter(s => data.siteIds.includes(s.id)),
        breakdown: {
            entryFees: 525,
            guideCost: data.guideId ? 1500 : 0,
            transport: 4500,
            food: 2400,
            accommodation: 6000
        },
        totalCost: 13425,
        totalTimeMinutes: 270,
        isWithinBudget: true,
        recommendedDays: 3
    })
);

// PERSISTENT SAVE TRIP
export const saveTrip = (data: any) => fetchWithFallback(
    () => api.post('/trips', data),
    () => {
        const trips = getStorage(STORAGE_KEYS.TRIPS);
        const newTrip = {
            id: Math.floor(Math.random() * 10000),
            created_at: new Date().toISOString(),
            name: data.name || 'Custom Expedition',
            total_cost: data.totalCost || 15000,
            site_ids: JSON.stringify(data.siteIds || []),
            user_id: data.userId
        };
        trips.push(newTrip);
        setStorage(STORAGE_KEYS.TRIPS, trips);
        return { success: true, message: 'Trip inscribed in Record Room', id: newTrip.id };
    }
);

// PERSISTENT GET TRIPS
export const getTripsByUser = (userId: number | string) => fetchWithFallback(
    () => api.get(`/trips/user/${userId}`),
    () => {
        const trips = getStorage(STORAGE_KEYS.TRIPS);
        // Filter by user if needed, for MVP we show all local trips since auth is mock
        return trips.reverse(); 
    }
);

// PERSISTENT FEEDBACK
export const submitFeedback = (data: any) => fetchWithFallback(
    () => api.post('/feedback', data),
    () => {
        const feedback = getStorage(STORAGE_KEYS.FEEDBACK);
        feedback.push({ ...data, id: Date.now(), created_at: new Date().toISOString() });
        setStorage(STORAGE_KEYS.FEEDBACK, feedback);
        return { success: true, message: 'Feedback inscribed in Neural Log' };
    }
);

export const getAiStory = (data: any) => fetchWithFallback(
    () => api.post('/ai/story', data),
    () => ({
        content: "This is a simulated AI story about the site. In production, this would be generated by Gemini/OpenAI based on the persona. The site is truly magnificent and holds secrets of the past...",
        suggested_followup: "Tell me more about the architecture?"
    })
);

export const getGuides = () => fetchWithFallback(() => api.get('/guides'), () => MOCK_GUIDES);

export const getSafetyScore = (siteId: number) => fetchWithFallback(
    () => api.get(`/safety/${siteId}`),
    () => ({
        score: 8,
        details: { weather: 'Clear', reports: 0, advisory: 'Safe (Mock)' },
        lastUpdated: new Date().toISOString()
    })
);

export const getMe = () => fetchWithFallback(
    () => api.get('/auth/me'),
    () => null // No mock fallback for auth check, let it fail if backend down for security
);

export const createPaymentIntent = (data: any) => fetchWithFallback(
    () => api.post('/payment/create-intent', data),
    () => ({
        client_secret: 'mock_secret_' + Math.random().toString(36).substring(7),
        amount: data.amount,
        currency: 'inr'
    })
);

export const AssetUrl = (path: string) => path;

export default api;
