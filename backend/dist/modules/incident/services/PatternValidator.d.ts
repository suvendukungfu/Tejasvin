import { ISensorTelemetry } from './SeverityClassifier';
export declare class PatternValidator {
    /**
     * Accidental Drop Pattern (Updated for Gradient Analysis):
     * - Very high G-force peak (Impact)
     * - ZERO or negligible change in velocity (User dropped phone while standing or in moving car)
     * - Delta V is the key differentiator.
     */
    static isAccidentalDrop(telemetry: ISensorTelemetry): boolean;
    /**
     * Vehicle Impact Pattern (Updated for Momentum):
     * - Significant G-force
     * - RAPID change in velocity (Delta V > 20 km/h) signifies hitting an obstacle
     */
    static isLikelyAccident(telemetry: ISensorTelemetry): boolean;
    /**
     * Comprehensive validation check
     */
    static validateAlert(telemetry: ISensorTelemetry): {
        valid: boolean;
        reason?: string;
    };
}
