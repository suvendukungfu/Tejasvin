"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentService = void 0;
const Incident_1 = __importDefault(require("../models/Incident"));
const TriageService_1 = require("./TriageService");
const SeverityClassifier_1 = require("./SeverityClassifier");
const PatternValidator_1 = require("./PatternValidator");
class IncidentService {
    /**
     * Creates a new incident with AI triage and sensor validation.
     */
    async createIncident(data, telemetry) {
        // 1. Validate if it's a false alert
        if (telemetry) {
            const validation = PatternValidator_1.PatternValidator.validateAlert(telemetry);
            if (!validation.valid) {
                throw new Error(`False Alert Detected: ${validation.reason}`);
            }
        }
        // 2. Perform advanced triage
        const triageResult = TriageService_1.TriageService.triage(data.description, data.type);
        // 3. Refine severity if telemetry is available
        const finalSeverity = telemetry
            ? SeverityClassifier_1.SeverityClassifier.predict(telemetry)
            : triageResult.priority;
        const newIncident = new Incident_1.default({
            ...data,
            severity: finalSeverity,
            aiAdvice: triageResult.advice,
            confidence: telemetry ? SeverityClassifier_1.SeverityClassifier.getConfidence(telemetry) : triageResult.confidence,
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
}
exports.IncidentService = IncidentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5jaWRlbnRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaW5jaWRlbnQvc2VydmljZXMvSW5jaWRlbnRTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUFzRTtBQUN0RSxtREFBZ0Q7QUFDaEQsNkRBQTRFO0FBQzVFLHlEQUFzRDtBQUd0RCxNQUFhLGVBQWU7SUFDeEI7O09BRUc7SUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQXdCLEVBQUUsU0FBNEI7UUFDOUUsb0NBQW9DO1FBQ3BDLElBQUksU0FBUyxFQUFFLENBQUM7WUFDWixNQUFNLFVBQVUsR0FBRyxtQ0FBZ0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQztRQUNMLENBQUM7UUFFRCw2QkFBNkI7UUFDN0IsTUFBTSxZQUFZLEdBQUcsNkJBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkUsK0NBQStDO1FBQy9DLE1BQU0sYUFBYSxHQUFHLFNBQVM7WUFDM0IsQ0FBQyxDQUFDLHVDQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDdkMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFFNUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxrQkFBYSxDQUFDO1lBQ2xDLEdBQUcsSUFBSTtZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxZQUFZLENBQUMsTUFBTTtZQUM3QixVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyx1Q0FBa0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVO1lBQzdGLE1BQU0sRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFVLEVBQUUsTUFBMkI7UUFDN0QsT0FBTyxNQUFNLGtCQUFhLENBQUMsaUJBQWlCLENBQ3hDLEVBQUUsRUFDRixFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQ3BCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUNoQixDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLGtCQUFrQjtRQUMzQixPQUFPLE1BQU0sa0JBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDaEQsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7YUFDMUIsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQWtCLEVBQUUsV0FBbUI7UUFDOUQsT0FBTyxNQUFNLGtCQUFhLENBQUMsZ0JBQWdCLENBQ3ZDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQ3JDLEVBQUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQzFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUNoQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBOURELDBDQThEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbmNpZGVudE1vZGVsLCB7IElJbmNpZGVudERvY3VtZW50IH0gZnJvbSAnLi4vbW9kZWxzL0luY2lkZW50JztcbmltcG9ydCB7IFRyaWFnZVNlcnZpY2UgfSBmcm9tICcuL1RyaWFnZVNlcnZpY2UnO1xuaW1wb3J0IHsgU2V2ZXJpdHlDbGFzc2lmaWVyLCBJU2Vuc29yVGVsZW1ldHJ5IH0gZnJvbSAnLi9TZXZlcml0eUNsYXNzaWZpZXInO1xuaW1wb3J0IHsgUGF0dGVyblZhbGlkYXRvciB9IGZyb20gJy4vUGF0dGVyblZhbGlkYXRvcic7XG5pbXBvcnQgeyBJSW5jaWRlbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdHlwZXMvZG9tYWluJztcblxuZXhwb3J0IGNsYXNzIEluY2lkZW50U2VydmljZSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbmNpZGVudCB3aXRoIEFJIHRyaWFnZSBhbmQgc2Vuc29yIHZhbGlkYXRpb24uXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGNyZWF0ZUluY2lkZW50KGRhdGE6IFBhcnRpYWw8SUluY2lkZW50PiwgdGVsZW1ldHJ5PzogSVNlbnNvclRlbGVtZXRyeSk6IFByb21pc2U8SUluY2lkZW50RG9jdW1lbnQ+IHtcbiAgICAgICAgLy8gMS4gVmFsaWRhdGUgaWYgaXQncyBhIGZhbHNlIGFsZXJ0XG4gICAgICAgIGlmICh0ZWxlbWV0cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBQYXR0ZXJuVmFsaWRhdG9yLnZhbGlkYXRlQWxlcnQodGVsZW1ldHJ5KTtcbiAgICAgICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFsc2UgQWxlcnQgRGV0ZWN0ZWQ6ICR7dmFsaWRhdGlvbi5yZWFzb259YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyAyLiBQZXJmb3JtIGFkdmFuY2VkIHRyaWFnZVxuICAgICAgICBjb25zdCB0cmlhZ2VSZXN1bHQgPSBUcmlhZ2VTZXJ2aWNlLnRyaWFnZShkYXRhLmRlc2NyaXB0aW9uLCBkYXRhLnR5cGUpO1xuXG4gICAgICAgIC8vIDMuIFJlZmluZSBzZXZlcml0eSBpZiB0ZWxlbWV0cnkgaXMgYXZhaWxhYmxlXG4gICAgICAgIGNvbnN0IGZpbmFsU2V2ZXJpdHkgPSB0ZWxlbWV0cnlcbiAgICAgICAgICAgID8gU2V2ZXJpdHlDbGFzc2lmaWVyLnByZWRpY3QodGVsZW1ldHJ5KVxuICAgICAgICAgICAgOiB0cmlhZ2VSZXN1bHQucHJpb3JpdHk7XG5cbiAgICAgICAgY29uc3QgbmV3SW5jaWRlbnQgPSBuZXcgSW5jaWRlbnRNb2RlbCh7XG4gICAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgICAgc2V2ZXJpdHk6IGZpbmFsU2V2ZXJpdHksXG4gICAgICAgICAgICBhaUFkdmljZTogdHJpYWdlUmVzdWx0LmFkdmljZSxcbiAgICAgICAgICAgIGNvbmZpZGVuY2U6IHRlbGVtZXRyeSA/IFNldmVyaXR5Q2xhc3NpZmllci5nZXRDb25maWRlbmNlKHRlbGVtZXRyeSkgOiB0cmlhZ2VSZXN1bHQuY29uZmlkZW5jZSxcbiAgICAgICAgICAgIHN0YXR1czogJ0FjdGl2ZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ld0luY2lkZW50LnNhdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHBhdGllbnQgdml0YWxzLlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVWaXRhbHMoaWQ6IHN0cmluZywgdml0YWxzOiBJSW5jaWRlbnRbJ3ZpdGFscyddKTogUHJvbWlzZTxJSW5jaWRlbnREb2N1bWVudCB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEluY2lkZW50TW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUoXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIHsgJHNldDogeyB2aXRhbHMgfSB9LFxuICAgICAgICAgICAgeyBuZXc6IHRydWUgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYWN0aXZlIGluY2lkZW50cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0QWN0aXZlSW5jaWRlbnRzKCk6IFByb21pc2U8SUluY2lkZW50RG9jdW1lbnRbXT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgSW5jaWRlbnRNb2RlbC5maW5kKHsgc3RhdHVzOiAnQWN0aXZlJyB9KVxuICAgICAgICAgICAgLnBvcHVsYXRlKCd2aWN0aW0nLCAnbmFtZScpXG4gICAgICAgICAgICAuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWNjZXB0cyBhIG1pc3Npb24uXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGFjY2VwdE1pc3Npb24oaW5jaWRlbnRJZDogc3RyaW5nLCByZXNwb25kZXJJZDogc3RyaW5nKTogUHJvbWlzZTxJSW5jaWRlbnREb2N1bWVudCB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEluY2lkZW50TW9kZWwuZmluZE9uZUFuZFVwZGF0ZShcbiAgICAgICAgICAgIHsgX2lkOiBpbmNpZGVudElkLCBzdGF0dXM6ICdBY3RpdmUnIH0sXG4gICAgICAgICAgICB7ICRhZGRUb1NldDogeyByZXNwb25kZXJzOiByZXNwb25kZXJJZCB9IH0sXG4gICAgICAgICAgICB7IG5ldzogdHJ1ZSB9XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19