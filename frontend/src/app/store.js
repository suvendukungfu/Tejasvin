import { create } from 'zustand';
import socketService from '../services/socket';

// --- Emergency Store ---

export const useEmergencyStore = create((set) => ({
    status: 'IDLE', // 'IDLE' | 'COUNTDOWN' | 'CONNECTING' | 'ACTIVE' | 'RESOLVED'
    activeIncidentId: null,
    countdownValue: 5,

    triggerSOS: () => set({ status: 'COUNTDOWN', countdownValue: 5 }),

    cancelSOS: () => set({ status: 'IDLE', countdownValue: 5 }),

    confirmSOS: (location) => {
        set({ status: 'CONNECTING' });

        // Real Socket Emit
        socketService.emit('emergency:sos', {
            type: 'Accident',
            severity: 'Critical',
            lat: location?.lat || 28.6139,
            lng: location?.lng || 77.2090,
            time: new Date().toLocaleTimeString()
        });

        setTimeout(() => {
            console.log('SOS CONFIRMED - API TRIGGERED');
            set({ status: 'ACTIVE', activeIncidentId: `INC-${Date.now()}` });
        }, 2000);
    },

    setCountdown: (value) => set({ countdownValue: value }),

    reset: () => set({ status: 'IDLE', activeIncidentId: null, countdownValue: 5 }),
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

    completeMission: () => set({ missionStatus: 'COMPLETED' }),

    cancelMission: () => set({ activeMission: null, missionStatus: 'IDLE' }),
}));
