"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const Incident_1 = __importDefault(require("../../incident/models/Incident"));
class AnalyticsService {
    static async getAccidentHotspots() {
        // Aggregate incidents to find density
        // For simplicity, we stick to fetching resolved/active accidents
        // In a real app, we might cluster them here, but leaflet.heat handles clustering visually.
        const incidents = await Incident_1.default.find({}, 'location severity type timestamp').lean();
        const hotspots = incidents.map((inc) => {
            // Weight based on severity
            let intensity = 0.5;
            if (inc.severity === 'Critical')
                intensity = 1.0;
            if (inc.severity === 'Severe')
                intensity = 0.8;
            if (inc.severity === 'Moderate')
                intensity = 0.6;
            return {
                lat: inc.location.coordinates[1],
                lng: inc.location.coordinates[0],
                intensity
            };
        });
        return hotspots;
    }
    static async getStats() {
        const total = await Incident_1.default.countDocuments();
        const active = await Incident_1.default.countDocuments({ status: 'Active' });
        const critical = await Incident_1.default.countDocuments({ severity: 'Critical' });
        return { total, active, critical };
    }
}
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5hbHl0aWNzU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2FuYWx5dGljcy9zZXJ2aWNlcy9BbmFseXRpY3NTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhFQUFzRDtBQUV0RCxNQUFhLGdCQUFnQjtJQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQjtRQUM1QixzQ0FBc0M7UUFDdEMsaUVBQWlFO1FBQ2pFLDJGQUEyRjtRQUUzRixNQUFNLFNBQVMsR0FBRyxNQUFNLGtCQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXJGLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUN4QywyQkFBMkI7WUFDM0IsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxVQUFVO2dCQUFFLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFDakQsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLFFBQVE7Z0JBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUMvQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssVUFBVTtnQkFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBRWpELE9BQU87Z0JBQ0gsR0FBRyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsU0FBUzthQUNaLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDakIsTUFBTSxLQUFLLEdBQUcsTUFBTSxrQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlDLE1BQU0sTUFBTSxHQUFHLE1BQU0sa0JBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNuRSxNQUFNLFFBQVEsR0FBRyxNQUFNLGtCQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFekUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDdkMsQ0FBQztDQUNKO0FBaENELDRDQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbmNpZGVudCBmcm9tICcuLi8uLi9pbmNpZGVudC9tb2RlbHMvSW5jaWRlbnQnO1xuXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XG4gICAgc3RhdGljIGFzeW5jIGdldEFjY2lkZW50SG90c3BvdHMoKSB7XG4gICAgICAgIC8vIEFnZ3JlZ2F0ZSBpbmNpZGVudHMgdG8gZmluZCBkZW5zaXR5XG4gICAgICAgIC8vIEZvciBzaW1wbGljaXR5LCB3ZSBzdGljayB0byBmZXRjaGluZyByZXNvbHZlZC9hY3RpdmUgYWNjaWRlbnRzXG4gICAgICAgIC8vIEluIGEgcmVhbCBhcHAsIHdlIG1pZ2h0IGNsdXN0ZXIgdGhlbSBoZXJlLCBidXQgbGVhZmxldC5oZWF0IGhhbmRsZXMgY2x1c3RlcmluZyB2aXN1YWxseS5cblxuICAgICAgICBjb25zdCBpbmNpZGVudHMgPSBhd2FpdCBJbmNpZGVudC5maW5kKHt9LCAnbG9jYXRpb24gc2V2ZXJpdHkgdHlwZSB0aW1lc3RhbXAnKS5sZWFuKCk7XG5cbiAgICAgICAgY29uc3QgaG90c3BvdHMgPSBpbmNpZGVudHMubWFwKChpbmM6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gV2VpZ2h0IGJhc2VkIG9uIHNldmVyaXR5XG4gICAgICAgICAgICBsZXQgaW50ZW5zaXR5ID0gMC41O1xuICAgICAgICAgICAgaWYgKGluYy5zZXZlcml0eSA9PT0gJ0NyaXRpY2FsJykgaW50ZW5zaXR5ID0gMS4wO1xuICAgICAgICAgICAgaWYgKGluYy5zZXZlcml0eSA9PT0gJ1NldmVyZScpIGludGVuc2l0eSA9IDAuODtcbiAgICAgICAgICAgIGlmIChpbmMuc2V2ZXJpdHkgPT09ICdNb2RlcmF0ZScpIGludGVuc2l0eSA9IDAuNjtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsYXQ6IGluYy5sb2NhdGlvbi5jb29yZGluYXRlc1sxXSxcbiAgICAgICAgICAgICAgICBsbmc6IGluYy5sb2NhdGlvbi5jb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgICAgICBpbnRlbnNpdHlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBob3RzcG90cztcbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgZ2V0U3RhdHMoKSB7XG4gICAgICAgIGNvbnN0IHRvdGFsID0gYXdhaXQgSW5jaWRlbnQuY291bnREb2N1bWVudHMoKTtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gYXdhaXQgSW5jaWRlbnQuY291bnREb2N1bWVudHMoeyBzdGF0dXM6ICdBY3RpdmUnIH0pO1xuICAgICAgICBjb25zdCBjcml0aWNhbCA9IGF3YWl0IEluY2lkZW50LmNvdW50RG9jdW1lbnRzKHsgc2V2ZXJpdHk6ICdDcml0aWNhbCcgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgdG90YWwsIGFjdGl2ZSwgY3JpdGljYWwgfTtcbiAgICB9XG59XG4iXX0=