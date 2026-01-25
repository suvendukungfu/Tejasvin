import { IUser } from '../../../shared/types/domain';

export interface IMatchResult {
    helper: IUser;
    matchScore: number;
    distance_m: number;
}

export class MatchingService {
    /**
     * Ranks nearby helpers using a multi-objective scoring function.
     * Score = (Trust * 0.4) + (Log(saves+1) * 0.2) + (1/Distance * 0.4)
     */
    public static rankHelpers(incidentLat: number, incidentLng: number, helpers: IUser[]): IMatchResult[] {
        return helpers.map(helper => {
            const distance = this.calculateDistance(
                incidentLat,
                incidentLng,
                helper.location?.lat || 0,
                helper.location?.lng || 0
            );

            // Mock trust and saves if missing for scoring demo
            const trust = helper.isVerified ? 100 : 50;
            const saves = helper.stats?.saves || 0;

            // Normalize distance (Max score for < 500m, decays after)
            const distanceScore = Math.max(0, 100 - (distance / 50));

            const matchScore = (trust * 0.4) + (Math.log1p(saves) * 20) + (distanceScore * 0.4);

            return {
                helper,
                matchScore,
                distance_m: distance
            };
        }).sort((a, b) => b.matchScore - a.matchScore);
    }

    private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
}
