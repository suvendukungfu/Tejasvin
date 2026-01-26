"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternValidator = void 0;
class PatternValidator {
    /**
     * Accidental Drop Pattern (Updated for Gradient Analysis):
     * - Very high G-force peak (Impact)
     * - ZERO or negligible change in velocity (User dropped phone while standing or in moving car)
     * - Delta V is the key differentiator.
     */
    static isAccidentalDrop(telemetry) {
        const { force_n, speed_kmh, delta_velocity_kmh } = telemetry;
        const deltaV = delta_velocity_kmh || 0;
        // Condition 1: Standing drop (High force, zero speed)
        if (speed_kmh < 5 && force_n > 100)
            return true;
        // Condition 2: Moving drop (High force, high speed, BUT low delta-v)
        // e.g. Dropping phone in a car moving at 60kmh. Speed stays ~60kmh.
        if (force_n > 100 && deltaV < 5)
            return true;
        return false;
    }
    /**
     * Vehicle Impact Pattern (Updated for Momentum):
     * - Significant G-force
     * - RAPID change in velocity (Delta V > 20 km/h) signifies hitting an obstacle
     */
    static isLikelyAccident(telemetry) {
        const { force_n, speed_kmh, impact_duration_ms, delta_velocity_kmh } = telemetry;
        const deltaV = delta_velocity_kmh || 0;
        // Vehicle collisions have momentum AND rapid deceleration
        if (force_n > 500 && deltaV > 20) {
            return true;
        }
        // Rolling/Tumbling (Sustained force, moderate deceleration)
        if (impact_duration_ms > 200 && force_n > 30 && deltaV > 10) {
            return true;
        }
        // Fallback for older legacy sensors without delta_v
        if (!delta_velocity_kmh && speed_kmh > 15 && force_n > 50) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF0dGVyblZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2luY2lkZW50L3NlcnZpY2VzL1BhdHRlcm5WYWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBYSxnQkFBZ0I7SUFDekI7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBMkI7UUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDN0QsTUFBTSxNQUFNLEdBQUcsa0JBQWtCLElBQUksQ0FBQyxDQUFDO1FBRXZDLHNEQUFzRDtRQUN0RCxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQztRQUVoRCxxRUFBcUU7UUFDckUsb0VBQW9FO1FBQ3BFLElBQUksT0FBTyxHQUFHLEdBQUcsSUFBSSxNQUFNLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTdDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQTJCO1FBQ3RELE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLEdBQUcsU0FBUyxDQUFDO1FBQ2pGLE1BQU0sTUFBTSxHQUFHLGtCQUFrQixJQUFJLENBQUMsQ0FBQztRQUV2QywwREFBMEQ7UUFDMUQsSUFBSSxPQUFPLEdBQUcsR0FBRyxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUMvQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsNERBQTREO1FBQzVELElBQUksa0JBQWtCLEdBQUcsR0FBRyxJQUFJLE9BQU8sR0FBRyxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQzFELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLGtCQUFrQixJQUFJLFNBQVMsR0FBRyxFQUFFLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ3hELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQTJCO1FBQ25ELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLDBDQUEwQyxFQUFFLENBQUM7UUFDaEYsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNwQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsbURBQW1ELEVBQUUsQ0FBQztRQUN6RixDQUFDO1FBRUQsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBQ0o7QUE5REQsNENBOERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNlbnNvclRlbGVtZXRyeSB9IGZyb20gJy4vU2V2ZXJpdHlDbGFzc2lmaWVyJztcblxuZXhwb3J0IGNsYXNzIFBhdHRlcm5WYWxpZGF0b3Ige1xuICAgIC8qKlxuICAgICAqIEFjY2lkZW50YWwgRHJvcCBQYXR0ZXJuIChVcGRhdGVkIGZvciBHcmFkaWVudCBBbmFseXNpcyk6XG4gICAgICogLSBWZXJ5IGhpZ2ggRy1mb3JjZSBwZWFrIChJbXBhY3QpXG4gICAgICogLSBaRVJPIG9yIG5lZ2xpZ2libGUgY2hhbmdlIGluIHZlbG9jaXR5IChVc2VyIGRyb3BwZWQgcGhvbmUgd2hpbGUgc3RhbmRpbmcgb3IgaW4gbW92aW5nIGNhcilcbiAgICAgKiAtIERlbHRhIFYgaXMgdGhlIGtleSBkaWZmZXJlbnRpYXRvci5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzQWNjaWRlbnRhbERyb3AodGVsZW1ldHJ5OiBJU2Vuc29yVGVsZW1ldHJ5KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHsgZm9yY2Vfbiwgc3BlZWRfa21oLCBkZWx0YV92ZWxvY2l0eV9rbWggfSA9IHRlbGVtZXRyeTtcbiAgICAgICAgY29uc3QgZGVsdGFWID0gZGVsdGFfdmVsb2NpdHlfa21oIHx8IDA7XG5cbiAgICAgICAgLy8gQ29uZGl0aW9uIDE6IFN0YW5kaW5nIGRyb3AgKEhpZ2ggZm9yY2UsIHplcm8gc3BlZWQpXG4gICAgICAgIGlmIChzcGVlZF9rbWggPCA1ICYmIGZvcmNlX24gPiAxMDApIHJldHVybiB0cnVlO1xuXG4gICAgICAgIC8vIENvbmRpdGlvbiAyOiBNb3ZpbmcgZHJvcCAoSGlnaCBmb3JjZSwgaGlnaCBzcGVlZCwgQlVUIGxvdyBkZWx0YS12KVxuICAgICAgICAvLyBlLmcuIERyb3BwaW5nIHBob25lIGluIGEgY2FyIG1vdmluZyBhdCA2MGttaC4gU3BlZWQgc3RheXMgfjYwa21oLlxuICAgICAgICBpZiAoZm9yY2VfbiA+IDEwMCAmJiBkZWx0YVYgPCA1KSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmVoaWNsZSBJbXBhY3QgUGF0dGVybiAoVXBkYXRlZCBmb3IgTW9tZW50dW0pOlxuICAgICAqIC0gU2lnbmlmaWNhbnQgRy1mb3JjZVxuICAgICAqIC0gUkFQSUQgY2hhbmdlIGluIHZlbG9jaXR5IChEZWx0YSBWID4gMjAga20vaCkgc2lnbmlmaWVzIGhpdHRpbmcgYW4gb2JzdGFjbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzTGlrZWx5QWNjaWRlbnQodGVsZW1ldHJ5OiBJU2Vuc29yVGVsZW1ldHJ5KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHsgZm9yY2Vfbiwgc3BlZWRfa21oLCBpbXBhY3RfZHVyYXRpb25fbXMsIGRlbHRhX3ZlbG9jaXR5X2ttaCB9ID0gdGVsZW1ldHJ5O1xuICAgICAgICBjb25zdCBkZWx0YVYgPSBkZWx0YV92ZWxvY2l0eV9rbWggfHwgMDtcblxuICAgICAgICAvLyBWZWhpY2xlIGNvbGxpc2lvbnMgaGF2ZSBtb21lbnR1bSBBTkQgcmFwaWQgZGVjZWxlcmF0aW9uXG4gICAgICAgIGlmIChmb3JjZV9uID4gNTAwICYmIGRlbHRhViA+IDIwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJvbGxpbmcvVHVtYmxpbmcgKFN1c3RhaW5lZCBmb3JjZSwgbW9kZXJhdGUgZGVjZWxlcmF0aW9uKVxuICAgICAgICBpZiAoaW1wYWN0X2R1cmF0aW9uX21zID4gMjAwICYmIGZvcmNlX24gPiAzMCAmJiBkZWx0YVYgPiAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGYWxsYmFjayBmb3Igb2xkZXIgbGVnYWN5IHNlbnNvcnMgd2l0aG91dCBkZWx0YV92XG4gICAgICAgIGlmICghZGVsdGFfdmVsb2NpdHlfa21oICYmIHNwZWVkX2ttaCA+IDE1ICYmIGZvcmNlX24gPiA1MCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHJlaGVuc2l2ZSB2YWxpZGF0aW9uIGNoZWNrXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB2YWxpZGF0ZUFsZXJ0KHRlbGVtZXRyeTogSVNlbnNvclRlbGVtZXRyeSk6IHsgdmFsaWQ6IGJvb2xlYW47IHJlYXNvbj86IHN0cmluZyB9IHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY2NpZGVudGFsRHJvcCh0ZWxlbWV0cnkpKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIHJlYXNvbjogJ1BhdHRlcm4gc3VnZ2VzdHMgYWNjaWRlbnRhbCBkZXZpY2UgZHJvcC4nIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaXNMaWtlbHlBY2NpZGVudCh0ZWxlbWV0cnkpKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIHJlYXNvbjogJ0luc3VmZmljaWVudCBtb21lbnR1bSBmb3IgdmVoaWNsZS1zY2FsZSBhY2NpZGVudC4nIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSB9O1xuICAgIH1cbn1cbiJdfQ==