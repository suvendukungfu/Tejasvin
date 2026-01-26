"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentService = void 0;
const Incident_1 = __importDefault(require("../models/Incident"));
// import { TriageService } from './TriageService'; // DEPRECATED
const SeverityClassifier_1 = require("../classifiers/SeverityClassifier");
const FalseAlertDetector_1 = require("../classifiers/FalseAlertDetector");
class IncidentService {
    /**
     * Creates a new incident with AI triage and sensor validation.
     */
    async createIncident(data, telemetry) {
        // 1. Validate if it's a false alert using Heuristic Detector
        const alertConfidence = FalseAlertDetector_1.FalseAlertDetector.analyze(telemetry);
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
            priority = SeverityClassifier_1.SeverityClassifier.classify(telemetry);
            advice = SeverityClassifier_1.SeverityClassifier.getAdvice(priority);
        }
        else {
            // Fallback triage for manual text (e.g. if user Typed "Fire")
            // Simple keyword matching for now
            if (data.description?.toLowerCase().includes('fire'))
                priority = 'Critical';
            if (data.description?.toLowerCase().includes('bleeding'))
                priority = 'Severe';
        }
        const newIncident = new Incident_1.default({
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
    async updateVitals(id, vitals) {
        return await Incident_1.default.findByIdAndUpdate(id, { $set: { vitals } }, { new: true });
    }
    /**
     * Gets active incidents.
     */
    async getActiveIncidents() {
        return await Incident_1.default.find({ status: 'Active' })
            .populate('victim', 'name')
            .sort({ createdAt: -1 });
    }
    /**
     * Accepts a mission.
     */
    async acceptMission(incidentId, responderId) {
        return await Incident_1.default.findOneAndUpdate({ _id: incidentId, status: 'Active' }, { $addToSet: { responders: responderId } }, { new: true });
    }
    /**
     * Gets dashboard statistics.
     */
    async getStats() {
        const [activeCount, criticalCount, totalCount] = await Promise.all([
            Incident_1.default.countDocuments({ status: 'Active' }),
            Incident_1.default.countDocuments({ status: 'Active', severity: 'Critical' }),
            Incident_1.default.countDocuments({ status: 'Resolved' })
        ]);
        return {
            activeSOS: activeCount,
            criticalSOS: criticalCount,
            totalSaves: totalCount
        };
    }
}
exports.IncidentService = IncidentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5jaWRlbnRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaW5jaWRlbnQvc2VydmljZXMvSW5jaWRlbnRTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUFzRTtBQUN0RSxpRUFBaUU7QUFDakUsMEVBQXVFO0FBQ3ZFLDBFQUF1RTtBQUd2RSxNQUFhLGVBQWU7SUFDeEI7O09BRUc7SUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQXdCLEVBQUUsU0FBZTtRQUNqRSw2REFBNkQ7UUFDN0QsTUFBTSxlQUFlLEdBQUcsdUNBQWtCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTlELDRGQUE0RjtRQUM1RixxREFBcUQ7UUFDckQsbURBQW1EO1FBQ25ELElBQUksZUFBZSxHQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BHLENBQUM7UUFFRCx1QkFBdUI7UUFDdkIsaUVBQWlFO1FBQ2pFLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBRyxnQ0FBZ0MsQ0FBQztRQUU5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ1osUUFBUSxHQUFHLHVDQUFrQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRCxNQUFNLEdBQUcsdUNBQWtCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELENBQUM7YUFBTSxDQUFDO1lBQ0osOERBQThEO1lBQzlELGtDQUFrQztZQUNsQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQzVFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUFFLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDbEYsQ0FBQztRQUVELE1BQU0sV0FBVyxHQUFHLElBQUksa0JBQWEsQ0FBQztZQUNsQyxHQUFHLElBQUk7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsTUFBTTtZQUNoQixVQUFVLEVBQUUsZUFBZSxFQUFFLGdDQUFnQztZQUM3RCxNQUFNLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBVSxFQUFFLE1BQTJCO1FBQzdELE9BQU8sTUFBTSxrQkFBYSxDQUFDLGlCQUFpQixDQUN4QyxFQUFFLEVBQ0YsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUNwQixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FDaEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxrQkFBa0I7UUFDM0IsT0FBTyxNQUFNLGtCQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQ2hELFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2FBQzFCLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFrQixFQUFFLFdBQW1CO1FBQzlELE9BQU8sTUFBTSxrQkFBYSxDQUFDLGdCQUFnQixDQUN2QyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUNyQyxFQUFFLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUMxQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FDaEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxRQUFRO1FBQ2pCLE1BQU0sQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUMvRCxrQkFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQztZQUNsRCxrQkFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO1lBQ3hFLGtCQUFhLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDO1NBQ3ZELENBQUMsQ0FBQztRQUVILE9BQU87WUFDSCxTQUFTLEVBQUUsV0FBVztZQUN0QixXQUFXLEVBQUUsYUFBYTtZQUMxQixVQUFVLEVBQUUsVUFBVTtTQUN6QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBeEZELDBDQXdGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbmNpZGVudE1vZGVsLCB7IElJbmNpZGVudERvY3VtZW50IH0gZnJvbSAnLi4vbW9kZWxzL0luY2lkZW50Jztcbi8vIGltcG9ydCB7IFRyaWFnZVNlcnZpY2UgfSBmcm9tICcuL1RyaWFnZVNlcnZpY2UnOyAvLyBERVBSRUNBVEVEXG5pbXBvcnQgeyBTZXZlcml0eUNsYXNzaWZpZXIgfSBmcm9tICcuLi9jbGFzc2lmaWVycy9TZXZlcml0eUNsYXNzaWZpZXInO1xuaW1wb3J0IHsgRmFsc2VBbGVydERldGVjdG9yIH0gZnJvbSAnLi4vY2xhc3NpZmllcnMvRmFsc2VBbGVydERldGVjdG9yJztcbmltcG9ydCB7IElJbmNpZGVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC90eXBlcy9kb21haW4nO1xuXG5leHBvcnQgY2xhc3MgSW5jaWRlbnRTZXJ2aWNlIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluY2lkZW50IHdpdGggQUkgdHJpYWdlIGFuZCBzZW5zb3IgdmFsaWRhdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgY3JlYXRlSW5jaWRlbnQoZGF0YTogUGFydGlhbDxJSW5jaWRlbnQ+LCB0ZWxlbWV0cnk/OiBhbnkpOiBQcm9taXNlPElJbmNpZGVudERvY3VtZW50PiB7XG4gICAgICAgIC8vIDEuIFZhbGlkYXRlIGlmIGl0J3MgYSBmYWxzZSBhbGVydCB1c2luZyBIZXVyaXN0aWMgRGV0ZWN0b3JcbiAgICAgICAgY29uc3QgYWxlcnRDb25maWRlbmNlID0gRmFsc2VBbGVydERldGVjdG9yLmFuYWx5emUodGVsZW1ldHJ5KTtcblxuICAgICAgICAvLyBJZiBjb25maWRlbmNlIGlzIGV4dHJlbWVseSBsb3cgKDwgMC4yKSwgd2UgbWlnaHQgcmVqZWN0IGl0LCBidXQgZm9yIHNhZmV0eSBjcml0aWNhbCBhcHBzLFxuICAgICAgICAvLyB3ZSB1c3VhbGx5IGFjY2VwdCBpdCB3aXRoIGEgXCJMb3cgQ29uZmlkZW5jZVwiIGZsYWcuXG4gICAgICAgIC8vIEZvciBNVlAsIGlmIDwgMC4xLCB3ZSB0aHJvdyAodmVyeSBvYnZpb3VzIGZha2UpLlxuICAgICAgICBpZiAoYWxlcnRDb25maWRlbmNlIDwgMC4xICYmIHRlbGVtZXRyeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWxzZSBBbGVydCBEZXRlY3RlZDogQ29uZmlkZW5jZSBvbmx5ICR7KGFsZXJ0Q29uZmlkZW5jZSAqIDEwMCkudG9GaXhlZCgxKX0lYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAyLiBDbGFzc2lmeSBTZXZlcml0eVxuICAgICAgICAvLyBEZWZhdWx0IHRvIFwiTW9kZXJhdGVcIiBpZiBubyB0ZWxlbWV0cnksIG9yIHVzZSB0aGUgY2xhc3NpZmllcnMuXG4gICAgICAgIGxldCBwcmlvcml0eSA9ICdNb2RlcmF0ZSc7XG4gICAgICAgIGxldCBhZHZpY2UgPSAnU3RheSBjYWxtLiBIZWxwIGlzIG9uIHRoZSB3YXkuJztcblxuICAgICAgICBpZiAodGVsZW1ldHJ5KSB7XG4gICAgICAgICAgICBwcmlvcml0eSA9IFNldmVyaXR5Q2xhc3NpZmllci5jbGFzc2lmeSh0ZWxlbWV0cnkpO1xuICAgICAgICAgICAgYWR2aWNlID0gU2V2ZXJpdHlDbGFzc2lmaWVyLmdldEFkdmljZShwcmlvcml0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBGYWxsYmFjayB0cmlhZ2UgZm9yIG1hbnVhbCB0ZXh0IChlLmcuIGlmIHVzZXIgVHlwZWQgXCJGaXJlXCIpXG4gICAgICAgICAgICAvLyBTaW1wbGUga2V5d29yZCBtYXRjaGluZyBmb3Igbm93XG4gICAgICAgICAgICBpZiAoZGF0YS5kZXNjcmlwdGlvbj8udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZmlyZScpKSBwcmlvcml0eSA9ICdDcml0aWNhbCc7XG4gICAgICAgICAgICBpZiAoZGF0YS5kZXNjcmlwdGlvbj8udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYmxlZWRpbmcnKSkgcHJpb3JpdHkgPSAnU2V2ZXJlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld0luY2lkZW50ID0gbmV3IEluY2lkZW50TW9kZWwoe1xuICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAgIHNldmVyaXR5OiBwcmlvcml0eSxcbiAgICAgICAgICAgIGFpQWR2aWNlOiBhZHZpY2UsXG4gICAgICAgICAgICBjb25maWRlbmNlOiBhbGVydENvbmZpZGVuY2UsIC8vIFN0b3JlIHRoZSBkZXRlY3RvciBjb25maWRlbmNlXG4gICAgICAgICAgICBzdGF0dXM6ICdBY3RpdmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhd2FpdCBuZXdJbmNpZGVudC5zYXZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBwYXRpZW50IHZpdGFscy5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlVml0YWxzKGlkOiBzdHJpbmcsIHZpdGFsczogSUluY2lkZW50Wyd2aXRhbHMnXSk6IFByb21pc2U8SUluY2lkZW50RG9jdW1lbnQgfCBudWxsPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCBJbmNpZGVudE1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICB7ICRzZXQ6IHsgdml0YWxzIH0gfSxcbiAgICAgICAgICAgIHsgbmV3OiB0cnVlIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFjdGl2ZSBpbmNpZGVudHMuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldEFjdGl2ZUluY2lkZW50cygpOiBQcm9taXNlPElJbmNpZGVudERvY3VtZW50W10+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEluY2lkZW50TW9kZWwuZmluZCh7IHN0YXR1czogJ0FjdGl2ZScgfSlcbiAgICAgICAgICAgIC5wb3B1bGF0ZSgndmljdGltJywgJ25hbWUnKVxuICAgICAgICAgICAgLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjY2VwdHMgYSBtaXNzaW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBhY2NlcHRNaXNzaW9uKGluY2lkZW50SWQ6IHN0cmluZywgcmVzcG9uZGVySWQ6IHN0cmluZyk6IFByb21pc2U8SUluY2lkZW50RG9jdW1lbnQgfCBudWxsPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCBJbmNpZGVudE1vZGVsLmZpbmRPbmVBbmRVcGRhdGUoXG4gICAgICAgICAgICB7IF9pZDogaW5jaWRlbnRJZCwgc3RhdHVzOiAnQWN0aXZlJyB9LFxuICAgICAgICAgICAgeyAkYWRkVG9TZXQ6IHsgcmVzcG9uZGVyczogcmVzcG9uZGVySWQgfSB9LFxuICAgICAgICAgICAgeyBuZXc6IHRydWUgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgZGFzaGJvYXJkIHN0YXRpc3RpY3MuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldFN0YXRzKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IFthY3RpdmVDb3VudCwgY3JpdGljYWxDb3VudCwgdG90YWxDb3VudF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBJbmNpZGVudE1vZGVsLmNvdW50RG9jdW1lbnRzKHsgc3RhdHVzOiAnQWN0aXZlJyB9KSxcbiAgICAgICAgICAgIEluY2lkZW50TW9kZWwuY291bnREb2N1bWVudHMoeyBzdGF0dXM6ICdBY3RpdmUnLCBzZXZlcml0eTogJ0NyaXRpY2FsJyB9KSxcbiAgICAgICAgICAgIEluY2lkZW50TW9kZWwuY291bnREb2N1bWVudHMoeyBzdGF0dXM6ICdSZXNvbHZlZCcgfSlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZVNPUzogYWN0aXZlQ291bnQsXG4gICAgICAgICAgICBjcml0aWNhbFNPUzogY3JpdGljYWxDb3VudCxcbiAgICAgICAgICAgIHRvdGFsU2F2ZXM6IHRvdGFsQ291bnRcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=