export class FalseAlertDetector {
    /**
     * Determine if an event is likely a false positive.
     * @param telemetry Sensor data history
     * @returns Confidence score (0.0 to 1.0 that it IS a real accident)
     */
    static analyze(telemetry: any): number {
        // Mock Logic:
        // Real crashes usually have a "spike" followed by 0 speed.
        // Phone drops might have a high G spike but continue moving (picked up) or have rotation.

        if (!telemetry) return 0.5; // Uncertain

        let confidence = 0.0;

        // Factor 1: G-Force Threshold
        if (telemetry.gForce > 2.0) confidence += 0.4;

        // Factor 2: Sudden Stop
        if (telemetry.speed === 0 && telemetry.preCrashSpeed > 30) confidence += 0.3;

        // Factor 3: Airbag Signal (High trust)
        if (telemetry.airbagDeployed) confidence += 0.3;

        // result cap
        return Math.min(confidence, 0.99);
    }
}
