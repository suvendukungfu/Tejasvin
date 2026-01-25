import IncidentModel, { IIncidentDocument } from '../models/Incident';
// import { TriageService } from './TriageService'; // DEPRECATED
import { SeverityClassifier } from '../classifiers/SeverityClassifier';
import { FalseAlertDetector } from '../classifiers/FalseAlertDetector';
import { IIncident } from '../../../shared/types/domain';

export class IncidentService {
    /**
     * Creates a new incident with AI triage and sensor validation.
     */
    public async createIncident(data: Partial<IIncident>, telemetry?: any): Promise<IIncidentDocument> {
        // 1. Validate if it's a false alert using Heuristic Detector
        const alertConfidence = FalseAlertDetector.analyze(telemetry);

        // If confidence is extremely low (< 0.2), we might reject it, but for safety critical apps,
        // we usually accept it with a "Low Confidence" flag.
        // For MVP, if < 0.1, we throw (very obvious fake).
        if (alertConfidence < 0.1 && telemetry) {
            throw new Error(`False Alert Detected: Confidence only ${(alertConfidence * 100).toFixed(1)}%`);
        }

        // 2. Classify Severity
        // Default to "Moderate" if no telemetry, or use the classifiers.
        let priority = 'Moderate';
        let advice = 'Stay calm. Help is on the way.';

        if (telemetry) {
            priority = SeverityClassifier.classify(telemetry);
            advice = SeverityClassifier.getAdvice(priority);
        } else {
            // Fallback triage for manual text (e.g. if user Typed "Fire")
            // Simple keyword matching for now
            if (data.description?.toLowerCase().includes('fire')) priority = 'Critical';
            if (data.description?.toLowerCase().includes('bleeding')) priority = 'Severe';
        }

        const newIncident = new IncidentModel({
            ...data,
            severity: priority,
            aiAdvice: advice,
            confidence: alertConfidence, // Store the detector confidence
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

    /**
     * Gets dashboard statistics.
     */
    public async getStats(): Promise<any> {
        const [activeCount, criticalCount, totalCount] = await Promise.all([
            IncidentModel.countDocuments({ status: 'Active' }),
            IncidentModel.countDocuments({ status: 'Active', severity: 'Critical' }),
            IncidentModel.countDocuments({ status: 'Resolved' })
        ]);

        return {
            activeSOS: activeCount,
            criticalSOS: criticalCount,
            totalSaves: totalCount
        };
    }
}
