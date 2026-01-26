"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeverityClassifier = void 0;
class SeverityClassifier {
    /**
     * Analyze telemetry to determine incident severity.
     * Returns: 'Critical' | 'Severe' | 'Moderate' | 'Low'
     */
    static classify(telemetry) {
        const { speed, gForce, airbagDeployed } = telemetry;
        // 1. Critical: High speed + High G-Force + Airbag
        if (gForce > 4.0 || (speed > 80 && airbagDeployed)) {
            return 'Critical';
        }
        // 2. Severe: Significant G-Force or High Speed
        if (gForce > 2.5 || speed > 60) {
            return 'Severe';
        }
        // 3. Moderate: Low speed impact
        if (gForce > 1.5 || speed > 30) {
            return 'Moderate';
        }
        // 4. Low: Minor bumps
        return 'Low';
    }
    /**
     * Generate AI advice based on severity.
     */
    static getAdvice(severity) {
        switch (severity) {
            case 'Critical':
                return 'DO NOT MOVE the victim. Check breathing. Apply pressure to bleeding.';
            case 'Severe':
                return 'Check for consciousness. Keep victim warm. Do not give water.';
            case 'Moderate':
                return 'Move to safety if possible. Check for hidden injuries.';
            case 'Low':
                return 'Exchange insurance info. Take photos of damage.';
            default:
                return 'Stay calm and wait for help.';
        }
    }
}
exports.SeverityClassifier = SeverityClassifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V2ZXJpdHlDbGFzc2lmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaW5jaWRlbnQvY2xhc3NpZmllcnMvU2V2ZXJpdHlDbGFzc2lmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBLE1BQWEsa0JBQWtCO0lBQzNCOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBd0I7UUFDcEMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsU0FBUyxDQUFDO1FBRXBELGtEQUFrRDtRQUNsRCxJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxJQUFJLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDakQsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVELCtDQUErQztRQUMvQyxJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQzdCLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRCxnQ0FBZ0M7UUFDaEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUM3QixPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQsc0JBQXNCO1FBQ3RCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBZ0I7UUFDN0IsUUFBUSxRQUFRLEVBQUUsQ0FBQztZQUNmLEtBQUssVUFBVTtnQkFDWCxPQUFPLHNFQUFzRSxDQUFDO1lBQ2xGLEtBQUssUUFBUTtnQkFDVCxPQUFPLCtEQUErRCxDQUFDO1lBQzNFLEtBQUssVUFBVTtnQkFDWCxPQUFPLHdEQUF3RCxDQUFDO1lBQ3BFLEtBQUssS0FBSztnQkFDTixPQUFPLGlEQUFpRCxDQUFDO1lBQzdEO2dCQUNJLE9BQU8sOEJBQThCLENBQUM7UUFDOUMsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQTVDRCxnREE0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmludGVyZmFjZSBUZWxlbWV0cnlEYXRhIHtcbiAgICBzcGVlZDogbnVtYmVyOyAgICAgICAvLyBrbS9oXG4gICAgZ0ZvcmNlOiBudW1iZXI7ICAgICAgLy8gZ1xuICAgIGltcGFjdFpvbmU/OiBzdHJpbmc7IC8vIGUuZy4gJ2Zyb250JywgJ3NpZGUnLCAncmVhcidcbiAgICBhaXJiYWdEZXBsb3llZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTZXZlcml0eUNsYXNzaWZpZXIge1xuICAgIC8qKlxuICAgICAqIEFuYWx5emUgdGVsZW1ldHJ5IHRvIGRldGVybWluZSBpbmNpZGVudCBzZXZlcml0eS5cbiAgICAgKiBSZXR1cm5zOiAnQ3JpdGljYWwnIHwgJ1NldmVyZScgfCAnTW9kZXJhdGUnIHwgJ0xvdydcbiAgICAgKi9cbiAgICBzdGF0aWMgY2xhc3NpZnkodGVsZW1ldHJ5OiBUZWxlbWV0cnlEYXRhKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgeyBzcGVlZCwgZ0ZvcmNlLCBhaXJiYWdEZXBsb3llZCB9ID0gdGVsZW1ldHJ5O1xuXG4gICAgICAgIC8vIDEuIENyaXRpY2FsOiBIaWdoIHNwZWVkICsgSGlnaCBHLUZvcmNlICsgQWlyYmFnXG4gICAgICAgIGlmIChnRm9yY2UgPiA0LjAgfHwgKHNwZWVkID4gODAgJiYgYWlyYmFnRGVwbG95ZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0NyaXRpY2FsJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDIuIFNldmVyZTogU2lnbmlmaWNhbnQgRy1Gb3JjZSBvciBIaWdoIFNwZWVkXG4gICAgICAgIGlmIChnRm9yY2UgPiAyLjUgfHwgc3BlZWQgPiA2MCkge1xuICAgICAgICAgICAgcmV0dXJuICdTZXZlcmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMy4gTW9kZXJhdGU6IExvdyBzcGVlZCBpbXBhY3RcbiAgICAgICAgaWYgKGdGb3JjZSA+IDEuNSB8fCBzcGVlZCA+IDMwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ01vZGVyYXRlJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDQuIExvdzogTWlub3IgYnVtcHNcbiAgICAgICAgcmV0dXJuICdMb3cnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIEFJIGFkdmljZSBiYXNlZCBvbiBzZXZlcml0eS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QWR2aWNlKHNldmVyaXR5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHNldmVyaXR5KSB7XG4gICAgICAgICAgICBjYXNlICdDcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdETyBOT1QgTU9WRSB0aGUgdmljdGltLiBDaGVjayBicmVhdGhpbmcuIEFwcGx5IHByZXNzdXJlIHRvIGJsZWVkaW5nLic7XG4gICAgICAgICAgICBjYXNlICdTZXZlcmUnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnQ2hlY2sgZm9yIGNvbnNjaW91c25lc3MuIEtlZXAgdmljdGltIHdhcm0uIERvIG5vdCBnaXZlIHdhdGVyLic7XG4gICAgICAgICAgICBjYXNlICdNb2RlcmF0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdNb3ZlIHRvIHNhZmV0eSBpZiBwb3NzaWJsZS4gQ2hlY2sgZm9yIGhpZGRlbiBpbmp1cmllcy4nO1xuICAgICAgICAgICAgY2FzZSAnTG93JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0V4Y2hhbmdlIGluc3VyYW5jZSBpbmZvLiBUYWtlIHBob3RvcyBvZiBkYW1hZ2UuJztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdTdGF5IGNhbG0gYW5kIHdhaXQgZm9yIGhlbHAuJztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==