export declare class AnalyticsService {
    static getAccidentHotspots(): Promise<{
        lat: any;
        lng: any;
        intensity: number;
    }[]>;
    static getStats(): Promise<{
        total: number;
        active: number;
        critical: number;
    }>;
}
