import { Request, Response } from 'express';
import { mysqlPool } from '../config/mysql';

export const getGuides = async (req: Request, res: Response) => {
    try {
        const [rows] = await mysqlPool.query('SELECT * FROM guides');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching guides', error });
    }
};
