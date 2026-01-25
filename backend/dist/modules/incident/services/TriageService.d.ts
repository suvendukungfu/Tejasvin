import { IIncident } from '../../../shared/types/domain';
export interface ITriageResult {
    advice: string;
    priority: IIncident['severity'];
    confidence: number;
}
export declare class TriageService {
    private static knowledgeBase;
    /**
     * Analyzes incident data to provide triage insights.
     * In v2, this will eventually interface with an ML inference server.
     */
    static triage(description?: string, type?: string): ITriageResult;
}
