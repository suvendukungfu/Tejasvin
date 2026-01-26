import { IUser } from '../../../shared/types/domain';
export interface IMatchResult {
    helper: IUser;
    matchScore: number;
    distance_m: number;
}
export declare class MatchingService {
    /**
     * Ranks nearby helpers using a multi-objective scoring function.
     * Weights:
     * - Proximity (Distance): 40%
     * - Reliability (Trust + Saves): 30%
     * - Skill Match (Medical): 30%
     */
    static rankHelpers(incidentLat: number, incidentLng: number, helpers: IUser[]): IMatchResult[];
    private static calculateDistance;
}
