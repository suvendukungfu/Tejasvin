import { IIncident } from '../../../shared/types/domain';

export interface ITriageResult {
    advice: string;
    priority: IIncident['severity'];
    confidence: number;
}

export class TriageService {
    private static knowledgeBase: Record<string, { advice: string; priority: IIncident['severity'] }> = {
        'accident': {
            advice: "Apply pressure to any bleeding wounds. Move to a safe area if possible but do not move if spinal injury is suspected.",
            priority: "Critical"
        },
        'heart': {
            advice: "Keep the patient calm and seated. Loosen tight clothing. If they take medication for a heart condition, help them take it.",
            priority: "Critical"
        },
        'choking': {
            advice: "Encourage coughing. If unable to breathe, perform 5 back blows followed by 5 abdominal thrusts (Heimlich maneuver).",
            priority: "Critical"
        },
        'burn': {
            advice: "Run cool water over the burn for 10-20 minutes. Do not apply ice, butter, or ointments. Cover with a clean, dry cloth.",
            priority: "Moderate"
        },
        'fracture': {
            advice: "Immobilize the affected limb using a splint or padding. Apply ice to reduce swelling. Do not attempt to realign the bone.",
            priority: "Moderate"
        }
    };

    /**
     * Analyzes incident data to provide triage insights.
     * In v2, this will eventually interface with an ML inference server.
     */
    public static triage(description: string = '', type: string = ''): ITriageResult {
        const desc = description.toLowerCase();
        const typeLower = type.toLowerCase();

        let result: ITriageResult = {
            advice: "Stay calm and wait for help. Ensure the scene is safe for responders.",
            priority: "Moderate",
            confidence: 0.85
        };

        for (const [key, data] of Object.entries(this.knowledgeBase)) {
            if (desc.includes(key) || typeLower.includes(key)) {
                result = {
                    ...data,
                    confidence: 0.95 + (Math.random() * 0.04)
                };
                break;
            }
        }

        return result;
    }
}
