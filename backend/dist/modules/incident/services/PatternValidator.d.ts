import { ISensorTelemetry } from './SeverityClassifier';
export declare class PatternValidator {
    /**
     * Accidental Drop Pattern:
     * - Very high G-force peak (Impact)
     * - Instantaneous stop
     * - ZERO velocity before impact (User dropped phone while standing)
     */
    static isAccidentalDrop(telemetry: ISensorTelemetry): boolean;
    /**
     * Vehicle Impact Pattern:
     * - High initial speed
     * - Sharp deceleration
     * - Sustained force or multiple peaks (Rolling/Tumbling)
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
