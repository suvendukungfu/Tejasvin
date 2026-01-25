export class ETAService {
    private static AVG_CITY_SPEED_KMH = 30;
    private static AMBULANCE_SPEED_MULTIPLIER = 1.5;

    /**
     * Predicts ETA in minutes based on distance and transport mode.
     */
    public static predictArrival(distance_m: number, isProfessionalResponder: boolean = false): number {
        const speedKmh = isProfessionalResponder
            ? this.AVG_CITY_SPEED_KMH * this.AMBULANCE_SPEED_MULTIPLIER
            : this.AVG_CITY_SPEED_KMH;

        const speedMs = (speedKmh * 1000) / 3600;
        const timeSeconds = distance_m / speedMs;

        // Add 2-minute buffer for "dispatch overhead"
        return Math.ceil((timeSeconds / 60) + 2);
    }

    /**
     * Provides a dynamic arrival window (min - max minutes)
     */
    public static predictWindow(distance_m: number): { min: number; max: number } {
        const baseEta = this.predictArrival(distance_m);
        return {
            min: Math.max(1, baseEta - 1),
            max: baseEta + 3
        };
    }
}
