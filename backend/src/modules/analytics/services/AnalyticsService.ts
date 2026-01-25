import Incident from '../../incident/models/Incident';

export class AnalyticsService {
    static async getAccidentHotspots() {
        // Aggregate incidents to find density
        // For simplicity, we stick to fetching resolved/active accidents
        // In a real app, we might cluster them here, but leaflet.heat handles clustering visually.

        const incidents = await Incident.find({}, 'location severity type timestamp').lean();

        const hotspots = incidents.map((inc: any) => {
            // Weight based on severity
            let intensity = 0.5;
            if (inc.severity === 'Critical') intensity = 1.0;
            if (inc.severity === 'Severe') intensity = 0.8;
            if (inc.severity === 'Moderate') intensity = 0.6;

            return {
                lat: inc.location.coordinates[1],
                lng: inc.location.coordinates[0],
                intensity
            };
        });

        return hotspots;
    }

    static async getStats() {
        const total = await Incident.countDocuments();
        const active = await Incident.countDocuments({ status: 'Active' });
        const critical = await Incident.countDocuments({ severity: 'Critical' });

        return { total, active, critical };
    }
}
