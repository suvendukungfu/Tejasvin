import { Request, Response } from 'express';
import { mysqlPool } from '../config/mysql';
import { RowDataPacket } from 'mysql2';

export const getRegions = async (req: Request, res: Response) => {
    try {
        const [rows] = await mysqlPool.query('SELECT * FROM regions');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching regions', error });
    }
};

export const getRegionBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const [rows] = await mysqlPool.query<RowDataPacket[]>('SELECT * FROM regions WHERE slug = ?', [slug]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Region not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching region', error });
    }
};
