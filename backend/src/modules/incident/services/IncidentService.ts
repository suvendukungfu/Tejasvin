import IncidentModel, { IIncidentDocument } from '../models/Incident';
import { TriageService } from './TriageService';
import { SeverityClassifier, ISensorTelemetry } from './SeverityClassifier';
import { PatternValidator } from './PatternValidator';
import { IIncident } from '../../../shared/types/domain';

export class IncidentService {
    /**
     * Creates a new incident with AI triage and sensor validation.
     */
    public async createIncident(data: Partial<IIncident>, telemetry?: ISensorTelemetry): Promise<IIncidentDocument> {
        // 1. Validate if it's a false alert
        if (telemetry) {
            const validation = PatternValidator.validateAlert(telemetry);
            if (!validation.valid) {
                throw new Error(`False Alert Detected: ${validation.reason}`);
            }
        }

        // 2. Perform advanced triage
        const triageResult = TriageService.triage(data.description, data.type);

        // 3. Refine severity if telemetry is available
        const finalSeverity = telemetry
            ? SeverityClassifier.predict(telemetry)
            : triageResult.priority;

        const newIncident = new IncidentModel({
            ...data,
            severity: finalSeverity,
            aiAdvice: triageResult.advice,
            confidence: telemetry ? SeverityClassifier.getConfidence(telemetry) : triageResult.confidence,
            status: 'Active'
        });

        return await newIncident.save();
    }

    /**
     * Updates patient vitals.
     */
    public async updateVitals(id: string, vitals: IIncident['vitals']): Promise<IIncidentDocument | null> {
        return await IncidentModel.findByIdAndUpdate(
            id,
            { $set: { vitals } },
            { new: true }
        );
    }

    /**
     * Gets active incidents.
     */
    public async getActiveIncidents(): Promise<IIncidentDocument[]> {
        return await IncidentModel.find({ status: 'Active' })
            .populate('victim', 'name')
            .sort({ createdAt: -1 });
    }

    /**
     * Accepts a mission.
     */
    public async acceptMission(incidentId: string, responderId: string): Promise<IIncidentDocument | null> {
        return await IncidentModel.findOneAndUpdate(
            { _id: incidentId, status: 'Active' },
            { $addToSet: { responders: responderId } },
            { new: true }
        );
    }
}
