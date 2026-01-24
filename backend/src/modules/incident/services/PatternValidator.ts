import { ISensorTelemetry } from './SeverityClassifier';

export class PatternValidator {
    /**
     * Accidental Drop Pattern:
     * - Very high G-force peak (Impact)
     * - Instantaneous stop
     * - ZERO velocity before impact (User dropped phone while standing)
     */
    public static isAccidentalDrop(telemetry: ISensorTelemetry): boolean {
        const { force_n, speed_kmh } = telemetry;

        // If speed was near zero, it's likely a phone drop, not a vehicle accident
        if (speed_kmh < 5 && force_n > 100) {
            return true;
        }
        return false;
    }

    /**
     * Vehicle Impact Pattern:
     * - High initial speed
     * - Sharp deceleration
     * - Sustained force or multiple peaks (Rolling/Tumbling)
     */
    public static isLikelyAccident(telemetry: ISensorTelemetry): boolean {
        const { force_n, speed_kmh, impact_duration_ms } = telemetry;

        // Vehicle collisions have momentum
        if (speed_kmh > 15 && force_n > 50) {
            return true;
        }

        // Long impact duration suggests tumbling or crushing
        if (impact_duration_ms > 200 && force_n > 30) {
            return true;
        }

        return false;
    }

    /**
     * Comprehensive validation check
     */
    public static validateAlert(telemetry: ISensorTelemetry): { valid: boolean; reason?: string } {
        if (this.isAccidentalDrop(telemetry)) {
            return { valid: false, reason: 'Pattern suggests accidental device drop.' };
        }

        if (!this.isLikelyAccident(telemetry)) {
            return { valid: false, reason: 'Insufficient momentum for vehicle-scale accident.' };
        }

        return { valid: true };
    }
}
