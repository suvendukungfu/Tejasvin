import { IUser } from '../../../shared/types/domain';

export interface IMatchResult {
    helper: IUser;
    matchScore: number;
    distance_m: number;
}

export class MatchingService {
    /**
     * Ranks nearby helpers using a multi-objective scoring function.
     * Weights:
     * - Proximity (Distance): 40%
     * - Reliability (Trust + Saves): 30%
     * - Skill Match (Medical): 30%
     */
    public static rankHelpers(incidentLat: number, incidentLng: number, helpers: IUser[]): IMatchResult[] {
        return helpers.map(helper => {
            const distance = this.calculateDistance(
                incidentLat,
                incidentLng,
                helper.location?.lat || 0,
                helper.location?.lng || 0
            );

            // 1. Proximity Score (0-100)
            // Linear decay: 100 at 0m, 0 at 5km
            const maxDist = 5000;
            const proxScore = Math.max(0, 100 * (1 - distance / maxDist));

            // 2. Reliability Score (0-100)
            const isVerified = helper.isVerified ? 1 : 0.5;
            const saves = helper.stats?.saves || 0;
            // Logarithmic growth for saves: 0->0, 10->50, 100->100
            const saveScore = Math.min(100, Math.log1p(saves) * 25);
            const relScore = (isVerified * 50) + (saveScore * 0.5);

            // 3. Skill Score (0-100)
            // Bonus for medical skills
            const medicalSkills = ['CPR', 'EMT', 'FirstAid', 'Doctor', 'Nurse'];
            const hasMedical = helper.skills?.some(s => medicalSkills.includes(s)) ? 1 : 0;
            const skillScore = hasMedical * 100;

            // Final Weighted Score
            const matchScore = (proxScore * 0.4) + (relScore * 0.3) + (skillScore * 0.3);

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
