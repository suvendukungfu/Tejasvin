"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternValidator = void 0;
class PatternValidator {
    /**
     * Accidental Drop Pattern:
     * - Very high G-force peak (Impact)
     * - Instantaneous stop
     * - ZERO velocity before impact (User dropped phone while standing)
     */
    static isAccidentalDrop(telemetry) {
        const { force_n, speed_kmh } = telemetry;
        // If speed was near zero, it's likely a phone drop, not a vehicle accident
        if (speed_kmh < 5 && force_n > 100) {
            return true;
        }
        return false;
    }
    /**
     * Vehicle Impact Pattern:
     * - High initial speed
     * - Sharp deceleration
     * - Sustained force or multiple peaks (Rolling/Tumbling)
     */
    static isLikelyAccident(telemetry) {
        const { force_n, speed_kmh, impact_duration_ms } = telemetry;
        // Vehicle collisions have momentum
        if (speed_kmh > 15 && force_n > 50) {
            return true;
        }
        // Long impact duration suggests tumbling or crushing
        if (impact_duration_ms > 200 && force_n > 30) {
            return true;
        }
        return false;
    }
    /**
     * Comprehensive validation check
     */
    static validateAlert(telemetry) {
        if (this.isAccidentalDrop(telemetry)) {
            return { valid: false, reason: 'Pattern suggests accidental device drop.' };
        }
        if (!this.isLikelyAccident(telemetry)) {
            return { valid: false, reason: 'Insufficient momentum for vehicle-scale accident.' };
        }
        return { valid: true };
    }
}
exports.PatternValidator = PatternValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF0dGVyblZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2luY2lkZW50L3NlcnZpY2VzL1BhdHRlcm5WYWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBYSxnQkFBZ0I7SUFDekI7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBMkI7UUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFFekMsMkVBQTJFO1FBQzNFLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUEyQjtRQUN0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUU3RCxtQ0FBbUM7UUFDbkMsSUFBSSxTQUFTLEdBQUcsRUFBRSxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUNqQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQscURBQXFEO1FBQ3JELElBQUksa0JBQWtCLEdBQUcsR0FBRyxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUMzQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUEyQjtRQUNuRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ25DLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSwwQ0FBMEMsRUFBRSxDQUFDO1FBQ2hGLENBQUM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDcEMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLG1EQUFtRCxFQUFFLENBQUM7UUFDekYsQ0FBQztRQUVELE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNKO0FBckRELDRDQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZW5zb3JUZWxlbWV0cnkgfSBmcm9tICcuL1NldmVyaXR5Q2xhc3NpZmllcic7XG5cbmV4cG9ydCBjbGFzcyBQYXR0ZXJuVmFsaWRhdG9yIHtcbiAgICAvKipcbiAgICAgKiBBY2NpZGVudGFsIERyb3AgUGF0dGVybjpcbiAgICAgKiAtIFZlcnkgaGlnaCBHLWZvcmNlIHBlYWsgKEltcGFjdClcbiAgICAgKiAtIEluc3RhbnRhbmVvdXMgc3RvcFxuICAgICAqIC0gWkVSTyB2ZWxvY2l0eSBiZWZvcmUgaW1wYWN0IChVc2VyIGRyb3BwZWQgcGhvbmUgd2hpbGUgc3RhbmRpbmcpXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc0FjY2lkZW50YWxEcm9wKHRlbGVtZXRyeTogSVNlbnNvclRlbGVtZXRyeSk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB7IGZvcmNlX24sIHNwZWVkX2ttaCB9ID0gdGVsZW1ldHJ5O1xuXG4gICAgICAgIC8vIElmIHNwZWVkIHdhcyBuZWFyIHplcm8sIGl0J3MgbGlrZWx5IGEgcGhvbmUgZHJvcCwgbm90IGEgdmVoaWNsZSBhY2NpZGVudFxuICAgICAgICBpZiAoc3BlZWRfa21oIDwgNSAmJiBmb3JjZV9uID4gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmVoaWNsZSBJbXBhY3QgUGF0dGVybjpcbiAgICAgKiAtIEhpZ2ggaW5pdGlhbCBzcGVlZFxuICAgICAqIC0gU2hhcnAgZGVjZWxlcmF0aW9uXG4gICAgICogLSBTdXN0YWluZWQgZm9yY2Ugb3IgbXVsdGlwbGUgcGVha3MgKFJvbGxpbmcvVHVtYmxpbmcpXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc0xpa2VseUFjY2lkZW50KHRlbGVtZXRyeTogSVNlbnNvclRlbGVtZXRyeSk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB7IGZvcmNlX24sIHNwZWVkX2ttaCwgaW1wYWN0X2R1cmF0aW9uX21zIH0gPSB0ZWxlbWV0cnk7XG5cbiAgICAgICAgLy8gVmVoaWNsZSBjb2xsaXNpb25zIGhhdmUgbW9tZW50dW1cbiAgICAgICAgaWYgKHNwZWVkX2ttaCA+IDE1ICYmIGZvcmNlX24gPiA1MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb25nIGltcGFjdCBkdXJhdGlvbiBzdWdnZXN0cyB0dW1ibGluZyBvciBjcnVzaGluZ1xuICAgICAgICBpZiAoaW1wYWN0X2R1cmF0aW9uX21zID4gMjAwICYmIGZvcmNlX24gPiAzMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHJlaGVuc2l2ZSB2YWxpZGF0aW9uIGNoZWNrXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB2YWxpZGF0ZUFsZXJ0KHRlbGVtZXRyeTogSVNlbnNvclRlbGVtZXRyeSk6IHsgdmFsaWQ6IGJvb2xlYW47IHJlYXNvbj86IHN0cmluZyB9IHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY2NpZGVudGFsRHJvcCh0ZWxlbWV0cnkpKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIHJlYXNvbjogJ1BhdHRlcm4gc3VnZ2VzdHMgYWNjaWRlbnRhbCBkZXZpY2UgZHJvcC4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaXNMaWtlbHlBY2NpZGVudCh0ZWxlbWV0cnkpKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIHJlYXNvbjogJ0luc3VmZmljaWVudCBtb21lbnR1bSBmb3IgdmVoaWNsZS1zY2FsZSBhY2NpZGVudC4nIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSB9O1xuICAgIH1cbn1cbiJdfQ==