import { IIncidentDocument } from '../models/Incident';
import { ISensorTelemetry } from './SeverityClassifier';
import { IIncident } from '../../../shared/types/domain';
export declare class IncidentService {
    /**
     * Creates a new incident with AI triage and sensor validation.
     */
    createIncident(data: Partial<IIncident>, telemetry?: ISensorTelemetry): Promise<IIncidentDocument>;
    /**
     * Updates patient vitals.
     */
    updateVitals(id: string, vitals: IIncident['vitals']): Promise<IIncidentDocument | null>;
    /**
     * Gets active incidents.
     */
    getActiveIncidents(): Promise<IIncidentDocument[]>;
    /**
     * Accepts a mission.
     */
    acceptMission(incidentId: string, responderId: string): Promise<IIncidentDocument | null>;
}
