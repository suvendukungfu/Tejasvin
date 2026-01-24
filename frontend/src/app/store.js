import { create } from 'zustand';
import socketService from '../services/socket';

// --- Emergency Store ---

export const useEmergencyStore = create((set) => ({
    status: 'IDLE', // 'IDLE' | 'COUNTDOWN' | 'CONNECTING' | 'ACTIVE' | 'RESOLVED'
    activeIncidentId: null,
    aiAdvice: null,
    countdownValue: 5,
    activeResponders: {}, // { responderId: { lat, lng, name } }

    triggerSOS: () => set({ status: 'COUNTDOWN', countdownValue: 5 }),

    cancelSOS: () => set({ status: 'IDLE', countdownValue: 5, activeResponders: {}, aiAdvice: null }),

    confirmSOS: async (location) => {
        set({ status: 'CONNECTING' });
        const { user } = useUserStore.getState();

        const payload = {
            type: 'Accident',
            description: "Vehicle collision near coordinates", // Mock description for now
            lat: location?.lat || 28.6139,
            lng: location?.lng || 77.2090,
            userId: user?.id || null
        };

        try {
            const api = (await import('../services/api')).default;
            const res = await api.post('/incidents', payload);

            // Emit via socket for real-time broadcast and also save result locally
            socketService.emit('emergency:sos', payload);

            set({
                status: 'ACTIVE',
                activeIncidentId: res.data._id,
                aiAdvice: res.data.aiAdvice
            });
        } catch (err) {
            console.error('SOS registration failed:', err);
            set({ status: 'IDLE' });
        }
    },

    updateResponderLocation: (data) => set((state) => ({
        activeResponders: {
            ...state.activeResponders,
            [data.responderName]: { lat: data.lat, lng: data.lng, name: data.responderName }
        }
    })),

    setCountdown: (value) => set({ countdownValue: value }),

    reset: () => set({ status: 'IDLE', activeIncidentId: null, aiAdvice: null, countdownValue: 5, activeResponders: {} }),

    markResolved: (responderInfo) => set({
        status: 'RESOLVED',
        lastResponder: responderInfo // { id, name }
    })
}));


// --- User/Location Store ---

export const useUserStore = create((set) => ({
    user: null, // { id, name, email, role }
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    location: null,
    locationPermission: 'prompt', // 'granted' | 'denied' | 'prompt'

    setLocation: (lat, lng) => set({ location: { lat, lng } }),
    setPermission: (status) => set({ locationPermission: status }),

    // Auth Actions
    setUser: (userData) => set({ user: userData, isAuthenticated: true }),

    login: (userData, token) => {
        localStorage.setItem('token', token);
        set({ user: userData, token, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
    }
}));


// --- Recruiter/Demo Store ---

export const useRecruiterStore = create((set) => ({
    isDemoMode: false,
    toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),

    // Simulation Logic
    simulateIncident: () => {
        const id = `INC-DEMO-${Date.now().toString().slice(-4)}`;
        // In a real app, this would push to the incidents array store
        // For now, we'll just log it or maybe we need an incident store?
        // Let's assume we handle the "live" incidents in a separate store later.
        console.log("Simulating Incident:", id);
        return id;
    }
}));


// --- Mission/Responder Store ---

export const useMissionStore = create((set) => ({
    activeMission: null, // Incident Object or ID
    missionStatus: 'IDLE', // 'IDLE' | 'OFFERED' | 'ACCEPTED' | 'ON_ROUTE' | 'ARRIVED' | 'COMPLETED'

    offerMission: (incident) => set({ activeMission: incident, missionStatus: 'OFFERED' }),

    acceptMission: () => set({ missionStatus: 'ACCEPTED' }),

    startNavigation: () => set({ missionStatus: 'ON_ROUTE' }),

    arriveAtMission: () => set({ missionStatus: 'ARRIVED' }),

    completeMission: () => set((state) => ({
        missionStatus: 'COMPLETED',
        lastCompletedMission: state.activeMission
    })),

    cancelMission: () => set({ activeMission: null, missionStatus: 'IDLE' }),
}));
