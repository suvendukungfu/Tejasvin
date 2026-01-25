import { Request, Response } from 'express';
import { AnalyticsService } from '../services/AnalyticsService';

export const getHotspots = async (req: Request, res: Response) => {
    try {
        const data = await AnalyticsService.getAccidentHotspots();
        res.json(data);
    } catch (err: any) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const getStats = async (req: Request, res: Response) => {
    try {
        const stats = await AnalyticsService.getStats();
        res.json(stats);
    } catch (err: any) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
