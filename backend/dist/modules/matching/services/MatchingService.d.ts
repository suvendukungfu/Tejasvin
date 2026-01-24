import { IUser } from '../../../shared/types/domain';
export interface IMatchResult {
    helper: IUser;
    matchScore: number;
    distance_m: number;
}
export declare class MatchingService {
    /**
     * Ranks nearby helpers using a multi-objective scoring function.
     * Score = (Trust * 0.4) + (Log(saves+1) * 0.2) + (1/Distance * 0.4)
     */
    static rankHelpers(incidentLat: number, incidentLng: number, helpers: IUser[]): IMatchResult[];
    private static calculateDistance;
}
