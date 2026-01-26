"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeverityClassifier = void 0;
class SeverityClassifier {
    /**
     * Prediction model for accident severity.
     * In v2 Production, this will call out to a specialized Python microservice (FastAPI/TorchServe).
     */
    static predict(telemetry) {
        const { force_n, speed_kmh } = telemetry;
        // Mocking logic that simulates a Random Forest Classifier
        if (force_n > 500 || (speed_kmh > 80 && force_n > 200)) {
            return 'Critical';
        }
        if (force_n > 200 || speed_kmh > 40) {
            return 'Severe';
        }
        if (force_n > 50) {
            return 'Moderate';
        }
        return 'Low';
    }
    /**
     * Provides confidence score based on telemetry completeness.
     */
    static getConfidence(telemetry) {
        let signals = 0;
        if (telemetry.force_n > 0)
            signals++;
        if (telemetry.speed_kmh > 0)
            signals++;
        if (telemetry.accel_x !== 0)
            signals++;
        return Math.min(0.99, 0.4 + (signals * 0.2));
    }
}
exports.SeverityClassifier = SeverityClassifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V2ZXJpdHlDbGFzc2lmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaW5jaWRlbnQvc2VydmljZXMvU2V2ZXJpdHlDbGFzc2lmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVlBLE1BQWEsa0JBQWtCO0lBQzNCOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBMkI7UUFDN0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFFekMsMERBQTBEO1FBQzFELElBQUksT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDckQsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVELElBQUksT0FBTyxHQUFHLEdBQUcsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDbEMsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVELElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ2YsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBMkI7UUFDbkQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxTQUFTLENBQUMsU0FBUyxHQUFHLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXZDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNKO0FBbkNELGdEQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbmNpZGVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC90eXBlcy9kb21haW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZW5zb3JUZWxlbWV0cnkge1xuICAgIHNwZWVkX2ttaDogbnVtYmVyO1xuICAgIGZvcmNlX246IG51bWJlcjtcbiAgICBhY2NlbF94OiBudW1iZXI7XG4gICAgYWNjZWxfeTogbnVtYmVyO1xuICAgIGFjY2VsX3o6IG51bWJlcjtcbiAgICBpbXBhY3RfZHVyYXRpb25fbXM6IG51bWJlcjtcbiAgICBkZWx0YV92ZWxvY2l0eV9rbWg/OiBudW1iZXI7IC8vIENoYW5nZSBpbiB2ZWxvY2l0eSBkdXJpbmcgaW1wYWN0XG59XG5cbmV4cG9ydCBjbGFzcyBTZXZlcml0eUNsYXNzaWZpZXIge1xuICAgIC8qKlxuICAgICAqIFByZWRpY3Rpb24gbW9kZWwgZm9yIGFjY2lkZW50IHNldmVyaXR5LlxuICAgICAqIEluIHYyIFByb2R1Y3Rpb24sIHRoaXMgd2lsbCBjYWxsIG91dCB0byBhIHNwZWNpYWxpemVkIFB5dGhvbiBtaWNyb3NlcnZpY2UgKEZhc3RBUEkvVG9yY2hTZXJ2ZSkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwcmVkaWN0KHRlbGVtZXRyeTogSVNlbnNvclRlbGVtZXRyeSk6IElJbmNpZGVudFsnc2V2ZXJpdHknXSB7XG4gICAgICAgIGNvbnN0IHsgZm9yY2Vfbiwgc3BlZWRfa21oIH0gPSB0ZWxlbWV0cnk7XG5cbiAgICAgICAgLy8gTW9ja2luZyBsb2dpYyB0aGF0IHNpbXVsYXRlcyBhIFJhbmRvbSBGb3Jlc3QgQ2xhc3NpZmllclxuICAgICAgICBpZiAoZm9yY2VfbiA+IDUwMCB8fCAoc3BlZWRfa21oID4gODAgJiYgZm9yY2VfbiA+IDIwMCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnQ3JpdGljYWwnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvcmNlX24gPiAyMDAgfHwgc3BlZWRfa21oID4gNDApIHtcbiAgICAgICAgICAgIHJldHVybiAnU2V2ZXJlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb3JjZV9uID4gNTApIHtcbiAgICAgICAgICAgIHJldHVybiAnTW9kZXJhdGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICdMb3cnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGNvbmZpZGVuY2Ugc2NvcmUgYmFzZWQgb24gdGVsZW1ldHJ5IGNvbXBsZXRlbmVzcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldENvbmZpZGVuY2UodGVsZW1ldHJ5OiBJU2Vuc29yVGVsZW1ldHJ5KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHNpZ25hbHMgPSAwO1xuICAgICAgICBpZiAodGVsZW1ldHJ5LmZvcmNlX24gPiAwKSBzaWduYWxzKys7XG4gICAgICAgIGlmICh0ZWxlbWV0cnkuc3BlZWRfa21oID4gMCkgc2lnbmFscysrO1xuICAgICAgICBpZiAodGVsZW1ldHJ5LmFjY2VsX3ggIT09IDApIHNpZ25hbHMrKztcblxuICAgICAgICByZXR1cm4gTWF0aC5taW4oMC45OSwgMC40ICsgKHNpZ25hbHMgKiAwLjIpKTtcbiAgICB9XG59XG4iXX0=