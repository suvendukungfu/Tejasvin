export declare class FalseAlertDetector {
    /**
     * Determine if an event is likely a false positive.
     * @param telemetry Sensor data history
     * @returns Confidence score (0.0 to 1.0 that it IS a real accident)
     */
    static analyze(telemetry: any): number;
}
