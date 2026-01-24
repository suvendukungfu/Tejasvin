"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriageService = void 0;
class TriageService {
    /**
     * Analyzes incident data to provide triage insights.
     * In v2, this will eventually interface with an ML inference server.
     */
    static triage(description = '', type = '') {
        const desc = description.toLowerCase();
        const typeLower = type.toLowerCase();
        let result = {
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
exports.TriageService = TriageService;
TriageService.knowledgeBase = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJpYWdlU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2luY2lkZW50L3NlcnZpY2VzL1RyaWFnZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsTUFBYSxhQUFhO0lBd0J0Qjs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQXNCLEVBQUUsRUFBRSxPQUFlLEVBQUU7UUFDNUQsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyQyxJQUFJLE1BQU0sR0FBa0I7WUFDeEIsTUFBTSxFQUFFLHVFQUF1RTtZQUMvRSxRQUFRLEVBQUUsVUFBVTtZQUNwQixVQUFVLEVBQUUsSUFBSTtTQUNuQixDQUFDO1FBRUYsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDM0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDaEQsTUFBTSxHQUFHO29CQUNMLEdBQUcsSUFBSTtvQkFDUCxVQUFVLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQztpQkFDNUMsQ0FBQztnQkFDRixNQUFNO1lBQ1YsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOztBQWpETCxzQ0FrREM7QUFqRGtCLDJCQUFhLEdBQXdFO0lBQ2hHLFVBQVUsRUFBRTtRQUNSLE1BQU0sRUFBRSx1SEFBdUg7UUFDL0gsUUFBUSxFQUFFLFVBQVU7S0FDdkI7SUFDRCxPQUFPLEVBQUU7UUFDTCxNQUFNLEVBQUUsNEhBQTRIO1FBQ3BJLFFBQVEsRUFBRSxVQUFVO0tBQ3ZCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsTUFBTSxFQUFFLHFIQUFxSDtRQUM3SCxRQUFRLEVBQUUsVUFBVTtLQUN2QjtJQUNELE1BQU0sRUFBRTtRQUNKLE1BQU0sRUFBRSx3SEFBd0g7UUFDaEksUUFBUSxFQUFFLFVBQVU7S0FDdkI7SUFDRCxVQUFVLEVBQUU7UUFDUixNQUFNLEVBQUUsMkhBQTJIO1FBQ25JLFFBQVEsRUFBRSxVQUFVO0tBQ3ZCO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbmNpZGVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC90eXBlcy9kb21haW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUcmlhZ2VSZXN1bHQge1xuICAgIGFkdmljZTogc3RyaW5nO1xuICAgIHByaW9yaXR5OiBJSW5jaWRlbnRbJ3NldmVyaXR5J107XG4gICAgY29uZmlkZW5jZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgVHJpYWdlU2VydmljZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMga25vd2xlZGdlQmFzZTogUmVjb3JkPHN0cmluZywgeyBhZHZpY2U6IHN0cmluZzsgcHJpb3JpdHk6IElJbmNpZGVudFsnc2V2ZXJpdHknXSB9PiA9IHtcbiAgICAgICAgJ2FjY2lkZW50Jzoge1xuICAgICAgICAgICAgYWR2aWNlOiBcIkFwcGx5IHByZXNzdXJlIHRvIGFueSBibGVlZGluZyB3b3VuZHMuIE1vdmUgdG8gYSBzYWZlIGFyZWEgaWYgcG9zc2libGUgYnV0IGRvIG5vdCBtb3ZlIGlmIHNwaW5hbCBpbmp1cnkgaXMgc3VzcGVjdGVkLlwiLFxuICAgICAgICAgICAgcHJpb3JpdHk6IFwiQ3JpdGljYWxcIlxuICAgICAgICB9LFxuICAgICAgICAnaGVhcnQnOiB7XG4gICAgICAgICAgICBhZHZpY2U6IFwiS2VlcCB0aGUgcGF0aWVudCBjYWxtIGFuZCBzZWF0ZWQuIExvb3NlbiB0aWdodCBjbG90aGluZy4gSWYgdGhleSB0YWtlIG1lZGljYXRpb24gZm9yIGEgaGVhcnQgY29uZGl0aW9uLCBoZWxwIHRoZW0gdGFrZSBpdC5cIixcbiAgICAgICAgICAgIHByaW9yaXR5OiBcIkNyaXRpY2FsXCJcbiAgICAgICAgfSxcbiAgICAgICAgJ2Nob2tpbmcnOiB7XG4gICAgICAgICAgICBhZHZpY2U6IFwiRW5jb3VyYWdlIGNvdWdoaW5nLiBJZiB1bmFibGUgdG8gYnJlYXRoZSwgcGVyZm9ybSA1IGJhY2sgYmxvd3MgZm9sbG93ZWQgYnkgNSBhYmRvbWluYWwgdGhydXN0cyAoSGVpbWxpY2ggbWFuZXV2ZXIpLlwiLFxuICAgICAgICAgICAgcHJpb3JpdHk6IFwiQ3JpdGljYWxcIlxuICAgICAgICB9LFxuICAgICAgICAnYnVybic6IHtcbiAgICAgICAgICAgIGFkdmljZTogXCJSdW4gY29vbCB3YXRlciBvdmVyIHRoZSBidXJuIGZvciAxMC0yMCBtaW51dGVzLiBEbyBub3QgYXBwbHkgaWNlLCBidXR0ZXIsIG9yIG9pbnRtZW50cy4gQ292ZXIgd2l0aCBhIGNsZWFuLCBkcnkgY2xvdGguXCIsXG4gICAgICAgICAgICBwcmlvcml0eTogXCJNb2RlcmF0ZVwiXG4gICAgICAgIH0sXG4gICAgICAgICdmcmFjdHVyZSc6IHtcbiAgICAgICAgICAgIGFkdmljZTogXCJJbW1vYmlsaXplIHRoZSBhZmZlY3RlZCBsaW1iIHVzaW5nIGEgc3BsaW50IG9yIHBhZGRpbmcuIEFwcGx5IGljZSB0byByZWR1Y2Ugc3dlbGxpbmcuIERvIG5vdCBhdHRlbXB0IHRvIHJlYWxpZ24gdGhlIGJvbmUuXCIsXG4gICAgICAgICAgICBwcmlvcml0eTogXCJNb2RlcmF0ZVwiXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQW5hbHl6ZXMgaW5jaWRlbnQgZGF0YSB0byBwcm92aWRlIHRyaWFnZSBpbnNpZ2h0cy5cbiAgICAgKiBJbiB2MiwgdGhpcyB3aWxsIGV2ZW50dWFsbHkgaW50ZXJmYWNlIHdpdGggYW4gTUwgaW5mZXJlbmNlIHNlcnZlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyaWFnZShkZXNjcmlwdGlvbjogc3RyaW5nID0gJycsIHR5cGU6IHN0cmluZyA9ICcnKTogSVRyaWFnZVJlc3VsdCB7XG4gICAgICAgIGNvbnN0IGRlc2MgPSBkZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0eXBlTG93ZXIgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgbGV0IHJlc3VsdDogSVRyaWFnZVJlc3VsdCA9IHtcbiAgICAgICAgICAgIGFkdmljZTogXCJTdGF5IGNhbG0gYW5kIHdhaXQgZm9yIGhlbHAuIEVuc3VyZSB0aGUgc2NlbmUgaXMgc2FmZSBmb3IgcmVzcG9uZGVycy5cIixcbiAgICAgICAgICAgIHByaW9yaXR5OiBcIk1vZGVyYXRlXCIsXG4gICAgICAgICAgICBjb25maWRlbmNlOiAwLjg1XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChjb25zdCBba2V5LCBkYXRhXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmtub3dsZWRnZUJhc2UpKSB7XG4gICAgICAgICAgICBpZiAoZGVzYy5pbmNsdWRlcyhrZXkpIHx8IHR5cGVMb3dlci5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlOiAwLjk1ICsgKE1hdGgucmFuZG9tKCkgKiAwLjA0KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiJdfQ==