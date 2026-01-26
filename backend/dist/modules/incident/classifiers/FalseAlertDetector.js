"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FalseAlertDetector = void 0;
class FalseAlertDetector {
    /**
     * Determine if an event is likely a false positive.
     * @param telemetry Sensor data history
     * @returns Confidence score (0.0 to 1.0 that it IS a real accident)
     */
    static analyze(telemetry) {
        // Mock Logic:
        // Real crashes usually have a "spike" followed by 0 speed.
        // Phone drops might have a high G spike but continue moving (picked up) or have rotation.
        if (!telemetry)
            return 0.5; // Uncertain
        let confidence = 0.0;
        // Factor 1: G-Force Threshold
        if (telemetry.gForce > 2.0)
            confidence += 0.4;
        // Factor 2: Sudden Stop
        if (telemetry.speed === 0 && telemetry.preCrashSpeed > 30)
            confidence += 0.3;
        // Factor 3: Airbag Signal (High trust)
        if (telemetry.airbagDeployed)
            confidence += 0.3;
        // result cap
        return Math.min(confidence, 0.99);
    }
}
exports.FalseAlertDetector = FalseAlertDetector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFsc2VBbGVydERldGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaW5jaWRlbnQvY2xhc3NpZmllcnMvRmFsc2VBbGVydERldGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsa0JBQWtCO0lBQzNCOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQWM7UUFDekIsY0FBYztRQUNkLDJEQUEyRDtRQUMzRCwwRkFBMEY7UUFFMUYsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLFlBQVk7UUFFeEMsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBRXJCLDhCQUE4QjtRQUM5QixJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRztZQUFFLFVBQVUsSUFBSSxHQUFHLENBQUM7UUFFOUMsd0JBQXdCO1FBQ3hCLElBQUksU0FBUyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLGFBQWEsR0FBRyxFQUFFO1lBQUUsVUFBVSxJQUFJLEdBQUcsQ0FBQztRQUU3RSx1Q0FBdUM7UUFDdkMsSUFBSSxTQUFTLENBQUMsY0FBYztZQUFFLFVBQVUsSUFBSSxHQUFHLENBQUM7UUFFaEQsYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNKO0FBM0JELGdEQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBGYWxzZUFsZXJ0RGV0ZWN0b3Ige1xuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiBhbiBldmVudCBpcyBsaWtlbHkgYSBmYWxzZSBwb3NpdGl2ZS5cbiAgICAgKiBAcGFyYW0gdGVsZW1ldHJ5IFNlbnNvciBkYXRhIGhpc3RvcnlcbiAgICAgKiBAcmV0dXJucyBDb25maWRlbmNlIHNjb3JlICgwLjAgdG8gMS4wIHRoYXQgaXQgSVMgYSByZWFsIGFjY2lkZW50KVxuICAgICAqL1xuICAgIHN0YXRpYyBhbmFseXplKHRlbGVtZXRyeTogYW55KTogbnVtYmVyIHtcbiAgICAgICAgLy8gTW9jayBMb2dpYzpcbiAgICAgICAgLy8gUmVhbCBjcmFzaGVzIHVzdWFsbHkgaGF2ZSBhIFwic3Bpa2VcIiBmb2xsb3dlZCBieSAwIHNwZWVkLlxuICAgICAgICAvLyBQaG9uZSBkcm9wcyBtaWdodCBoYXZlIGEgaGlnaCBHIHNwaWtlIGJ1dCBjb250aW51ZSBtb3ZpbmcgKHBpY2tlZCB1cCkgb3IgaGF2ZSByb3RhdGlvbi5cblxuICAgICAgICBpZiAoIXRlbGVtZXRyeSkgcmV0dXJuIDAuNTsgLy8gVW5jZXJ0YWluXG5cbiAgICAgICAgbGV0IGNvbmZpZGVuY2UgPSAwLjA7XG5cbiAgICAgICAgLy8gRmFjdG9yIDE6IEctRm9yY2UgVGhyZXNob2xkXG4gICAgICAgIGlmICh0ZWxlbWV0cnkuZ0ZvcmNlID4gMi4wKSBjb25maWRlbmNlICs9IDAuNDtcblxuICAgICAgICAvLyBGYWN0b3IgMjogU3VkZGVuIFN0b3BcbiAgICAgICAgaWYgKHRlbGVtZXRyeS5zcGVlZCA9PT0gMCAmJiB0ZWxlbWV0cnkucHJlQ3Jhc2hTcGVlZCA+IDMwKSBjb25maWRlbmNlICs9IDAuMztcblxuICAgICAgICAvLyBGYWN0b3IgMzogQWlyYmFnIFNpZ25hbCAoSGlnaCB0cnVzdClcbiAgICAgICAgaWYgKHRlbGVtZXRyeS5haXJiYWdEZXBsb3llZCkgY29uZmlkZW5jZSArPSAwLjM7XG5cbiAgICAgICAgLy8gcmVzdWx0IGNhcFxuICAgICAgICByZXR1cm4gTWF0aC5taW4oY29uZmlkZW5jZSwgMC45OSk7XG4gICAgfVxufVxuIl19