import { Request, Response } from 'express';
import { getLiveSafetyData } from '../services/safetyML';

export const getSafetyScore = async (req: Request, res: Response) => {
    try {
        const siteId = Number(req.params.siteId);
        const data = await getLiveSafetyData(siteId);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'ML Error' });
    }
};
