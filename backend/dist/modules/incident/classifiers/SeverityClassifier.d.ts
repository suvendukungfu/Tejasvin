interface TelemetryData {
    speed: number;
    gForce: number;
    impactZone?: string;
    airbagDeployed?: boolean;
}
export declare class SeverityClassifier {
    /**
     * Analyze telemetry to determine incident severity.
     * Returns: 'Critical' | 'Severe' | 'Moderate' | 'Low'
     */
    static classify(telemetry: TelemetryData): string;
    /**
     * Generate AI advice based on severity.
     */
    static getAdvice(severity: string): string;
}
export {};
