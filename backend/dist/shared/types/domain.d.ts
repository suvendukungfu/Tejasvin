export type UserRole = 'victim' | 'responder' | 'admin';
export interface IUser {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    isVerified: boolean;
    pushSubscription?: any;
    location?: {
        lat: number;
        lng: number;
    };
    stats?: {
        saves: number;
        totalResponded: number;
    };
}
export interface IIncident {
    victimId?: string;
    type: string;
    description?: string;
    severity: 'Low' | 'Moderate' | 'Severe' | 'Critical';
    status: 'Active' | 'Resolved' | 'Cancelled';
    aiAdvice?: string;
    confidence?: number;
    vitals?: {
        status: string;
        heartRate?: number;
        notes?: string;
    };
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    responders: string[];
    createdAt: Date;
}
