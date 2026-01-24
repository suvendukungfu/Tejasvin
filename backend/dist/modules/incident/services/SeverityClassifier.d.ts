import { IIncident } from '../../../shared/types/domain';
export interface ISensorTelemetry {
    speed_kmh: number;
    force_n: number;
    accel_x: number;
    accel_y: number;
    accel_z: number;
    impact_duration_ms: number;
}
export declare class SeverityClassifier {
    /**
     * Prediction model for accident severity.
     * In v2 Production, this will call out to a specialized Python microservice (FastAPI/TorchServe).
     */
    static predict(telemetry: ISensorTelemetry): IIncident['severity'];
    /**
     * Provides confidence score based on telemetry completeness.
     */
    static getConfidence(telemetry: ISensorTelemetry): number;
}
