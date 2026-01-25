import { IIncident } from '../../../shared/types/domain';

export interface ISensorTelemetry {
    speed_kmh: number;
    force_n: number;
    accel_x: number;
    accel_y: number;
    accel_z: number;
    impact_duration_ms: number;
}

export class SeverityClassifier {
    /**
     * Prediction model for accident severity.
     * In v2 Production, this will call out to a specialized Python microservice (FastAPI/TorchServe).
     */
    public static predict(telemetry: ISensorTelemetry): IIncident['severity'] {
        const { force_n, speed_kmh } = telemetry;

        // Mocking logic that simulates a Random Forest Classifier
        if (force_n > 500 || (speed_kmh > 80 && force_n > 200)) {
            return 'Critical';
        }

        if (force_n > 200 || speed_kmh > 40) {
            return 'Severe';
        }

        if (force_n > 50) {
            return 'Moderate';
        }

        return 'Low';
    }

    /**
     * Provides confidence score based on telemetry completeness.
     */
    public static getConfidence(telemetry: ISensorTelemetry): number {
        let signals = 0;
        if (telemetry.force_n > 0) signals++;
        if (telemetry.speed_kmh > 0) signals++;
        if (telemetry.accel_x !== 0) signals++;

        return Math.min(0.99, 0.4 + (signals * 0.2));
    }
}
