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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V2ZXJpdHlDbGFzc2lmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaW5jaWRlbnQvc2VydmljZXMvU2V2ZXJpdHlDbGFzc2lmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVdBLE1BQWEsa0JBQWtCO0lBQzNCOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBMkI7UUFDN0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFFekMsMERBQTBEO1FBQzFELElBQUksT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDckQsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVELElBQUksT0FBTyxHQUFHLEdBQUcsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDbEMsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVELElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ2YsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBMkI7UUFDbkQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxTQUFTLENBQUMsU0FBUyxHQUFHLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXZDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNKO0FBbkNELGdEQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbmNpZGVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC90eXBlcy9kb21haW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZW5zb3JUZWxlbWV0cnkge1xuICAgIHNwZWVkX2ttaDogbnVtYmVyO1xuICAgIGZvcmNlX246IG51bWJlcjtcbiAgICBhY2NlbF94OiBudW1iZXI7XG4gICAgYWNjZWxfeTogbnVtYmVyO1xuICAgIGFjY2VsX3o6IG51bWJlcjtcbiAgICBpbXBhY3RfZHVyYXRpb25fbXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFNldmVyaXR5Q2xhc3NpZmllciB7XG4gICAgLyoqXG4gICAgICogUHJlZGljdGlvbiBtb2RlbCBmb3IgYWNjaWRlbnQgc2V2ZXJpdHkuXG4gICAgICogSW4gdjIgUHJvZHVjdGlvbiwgdGhpcyB3aWxsIGNhbGwgb3V0IHRvIGEgc3BlY2lhbGl6ZWQgUHl0aG9uIG1pY3Jvc2VydmljZSAoRmFzdEFQSS9Ub3JjaFNlcnZlKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHByZWRpY3QodGVsZW1ldHJ5OiBJU2Vuc29yVGVsZW1ldHJ5KTogSUluY2lkZW50WydzZXZlcml0eSddIHtcbiAgICAgICAgY29uc3QgeyBmb3JjZV9uLCBzcGVlZF9rbWggfSA9IHRlbGVtZXRyeTtcblxuICAgICAgICAvLyBNb2NraW5nIGxvZ2ljIHRoYXQgc2ltdWxhdGVzIGEgUmFuZG9tIEZvcmVzdCBDbGFzc2lmaWVyXG4gICAgICAgIGlmIChmb3JjZV9uID4gNTAwIHx8IChzcGVlZF9rbWggPiA4MCAmJiBmb3JjZV9uID4gMjAwKSkge1xuICAgICAgICAgICAgcmV0dXJuICdDcml0aWNhbCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9yY2VfbiA+IDIwMCB8fCBzcGVlZF9rbWggPiA0MCkge1xuICAgICAgICAgICAgcmV0dXJuICdTZXZlcmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvcmNlX24gPiA1MCkge1xuICAgICAgICAgICAgcmV0dXJuICdNb2RlcmF0ZSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJ0xvdyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgY29uZmlkZW5jZSBzY29yZSBiYXNlZCBvbiB0ZWxlbWV0cnkgY29tcGxldGVuZXNzLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q29uZmlkZW5jZSh0ZWxlbWV0cnk6IElTZW5zb3JUZWxlbWV0cnkpOiBudW1iZXIge1xuICAgICAgICBsZXQgc2lnbmFscyA9IDA7XG4gICAgICAgIGlmICh0ZWxlbWV0cnkuZm9yY2VfbiA+IDApIHNpZ25hbHMrKztcbiAgICAgICAgaWYgKHRlbGVtZXRyeS5zcGVlZF9rbWggPiAwKSBzaWduYWxzKys7XG4gICAgICAgIGlmICh0ZWxlbWV0cnkuYWNjZWxfeCAhPT0gMCkgc2lnbmFscysrO1xuXG4gICAgICAgIHJldHVybiBNYXRoLm1pbigwLjk5LCAwLjQgKyAoc2lnbmFscyAqIDAuMikpO1xuICAgIH1cbn1cbiJdfQ==