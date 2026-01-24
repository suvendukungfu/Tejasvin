/**
 * Mock AI Triage Service
 * In production, this would call an LLM (Gemini/OpenAI) or a custom TensorFlow model.
 */

const triageIncident = (description, type) => {
    const desc = (description || '').toLowerCase();

    const knowledgeBase = {
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

    // Keyword matching for triage
    let result = {
        advice: "Stay calm and wait for help. Ensure the scene is safe for responders.",
        priority: "Moderate",
        confidence: 0.85
    };

    for (const [key, data] of Object.entries(knowledgeBase)) {
        if (desc.includes(key) || (type && type.toLowerCase().includes(key))) {
            result = {
                ...data,
                confidence: 0.95 + (Math.random() * 0.04)
            };
            break;
        }
    }

    return result;
};

module.exports = { triageIncident };
