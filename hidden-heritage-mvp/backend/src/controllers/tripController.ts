import { Request, Response } from 'express';
import { calculateTrip } from '../services/tripService';
import { mysqlPool } from '../config/mysql';

export const estimateTrip = async (req: Request, res: Response) => {
    try {
        const { siteIds, days, budget, guideId } = req.body;

        if (!siteIds || siteIds.length === 0) {
            return res.status(400).json({ message: 'Please select at least one site.' });
        }

        const estimate = await calculateTrip({ siteIds, days, budget, guideId });
        res.json(estimate);
    } catch (error: any) {
        res.status(500).json({ message: 'Error calculating trip', error: error.message });
    }
};

export const saveTrip = async (req: Request, res: Response) => {
    try {
        const { userId, name, totalCost, totalTime, siteIds, guideId } = req.body;

        const [result] = await mysqlPool.query(
            'INSERT INTO trips (user_id, name, total_cost, total_time_mins, site_ids, guide_id) VALUES (?, ?, ?, ?, ?, ?)',
            [userId || 'guest', name, totalCost, totalTime, JSON.stringify(siteIds), guideId]
        );

        res.status(201).json({ message: 'Trip saved successfully', tripId: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error saving trip', error });
    }
};
