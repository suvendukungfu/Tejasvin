export declare class ETAService {
    private static AVG_CITY_SPEED_KMH;
    private static AMBULANCE_SPEED_MULTIPLIER;
    /**
     * Predicts ETA in minutes based on distance and transport mode.
     */
    static predictArrival(distance_m: number, isProfessionalResponder?: boolean): number;
    /**
     * Provides a dynamic arrival window (min - max minutes)
     */
    static predictWindow(distance_m: number): {
        min: number;
        max: number;
    };
}
