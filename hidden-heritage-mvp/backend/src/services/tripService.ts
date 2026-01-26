import { mysqlPool } from '../config/mysql';
import { RowDataPacket } from 'mysql2';

interface TripEstimateInput {
    siteIds: number[];
    days: number;
    budget: number;
    guideId?: number;
}

export const calculateTrip = async (input: TripEstimateInput) => {
    const { siteIds, days, budget, guideId } = input;

    // Fetch sites
    const [sites] = await mysqlPool.query<RowDataPacket[]>('SELECT * FROM sites WHERE id IN (?)', [siteIds]);

    if (sites.length === 0) {
        throw new Error('No valid sites found');
    }

    // Fetch guide if selected
    let guide = null;
    if (guideId) {
        const [guides] = await mysqlPool.query<RowDataPacket[]>('SELECT * FROM guides WHERE id = ?', [guideId]);
        if (guides.length > 0) guide = guides[0];
    }

    // Calculate costs
    const entryFees = sites.reduce((sum: number, site: any) => sum + Number(site.entry_fee), 0);
    const guideCost = guide ? Number(guide.fee_per_day) * days : 0;

    // Estimates
    const transportCostPerDay = 1500; // Placeholder: private car rental estimate
    const foodCostPerDay = 800; // Placeholder
    const accommodationPerDay = 2000; // Placeholder

    const totalTransport = transportCostPerDay * days;
    const totalFood = foodCostPerDay * days;
    const totalAccommodation = accommodationPerDay * days;

    const totalCost = entryFees + guideCost + totalTransport + totalFood + totalAccommodation;

    // Time calculation
    const totalVisitMinutes = sites.reduce((sum: number, site: any) => sum + site.avg_visit_time_mins, 0);
    const travelTimeMinutes = sites.length * 45; // Avg 45 mins between sites placeholder
    const totalTimeMinutes = totalVisitMinutes + travelTimeMinutes;

    return {
        sites,
        guide,
        breakdown: {
            entryFees,
            guideCost,
            transport: totalTransport,
            food: totalFood,
            accommodation: totalAccommodation,
        },
        totalCost,
        totalTimeMinutes,
        isWithinBudget: totalCost <= budget,
        recommendedDays: Math.ceil(totalTimeMinutes / (8 * 60)) // Assuming 8 hours touring per day
    };
};
