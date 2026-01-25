import { ISensorTelemetry } from './SeverityClassifier';

export class PatternValidator {
    /**
     * Accidental Drop Pattern (Updated for Gradient Analysis):
     * - Very high G-force peak (Impact)
     * - ZERO or negligible change in velocity (User dropped phone while standing or in moving car)
     * - Delta V is the key differentiator.
     */
    public static isAccidentalDrop(telemetry: ISensorTelemetry): boolean {
        const { force_n, speed_kmh, delta_velocity_kmh } = telemetry;
        const deltaV = delta_velocity_kmh || 0;

        // Condition 1: Standing drop (High force, zero speed)
        if (speed_kmh < 5 && force_n > 100) return true;

        // Condition 2: Moving drop (High force, high speed, BUT low delta-v)
        // e.g. Dropping phone in a car moving at 60kmh. Speed stays ~60kmh.
        if (force_n > 100 && deltaV < 5) return true;

        return false;
    }

    /**
     * Vehicle Impact Pattern (Updated for Momentum):
     * - Significant G-force
     * - RAPID change in velocity (Delta V > 20 km/h) signifies hitting an obstacle
     */
    public static isLikelyAccident(telemetry: ISensorTelemetry): boolean {
        const { force_n, speed_kmh, impact_duration_ms, delta_velocity_kmh } = telemetry;
        const deltaV = delta_velocity_kmh || 0;

        // Vehicle collisions have momentum AND rapid deceleration
        if (force_n > 500 && deltaV > 20) {
            return true;
        }

        // Rolling/Tumbling (Sustained force, moderate deceleration)
        if (impact_duration_ms > 200 && force_n > 30 && deltaV > 10) {
            return true;
        }

        // Fallback for older legacy sensors without delta_v
        if (!delta_velocity_kmh && speed_kmh > 15 && force_n > 50) {
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
