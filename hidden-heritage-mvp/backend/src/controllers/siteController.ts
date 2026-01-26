import { Request, Response } from 'express';
import { mysqlPool } from '../config/mysql';
import { RowDataPacket } from 'mysql2';

export const getSites = async (req: Request, res: Response) => {
    try {
        const { region_id } = req.query;
        let query = 'SELECT * FROM sites';
        let params: any[] = [];

        if (region_id) {
            query += ' WHERE region_id = ?';
            params.push(region_id);
        }

        const [rows] = await mysqlPool.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sites', error });
    }
};

export const getSiteBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const [rows] = await mysqlPool.query<RowDataPacket[]>('SELECT * FROM sites WHERE slug = ?', [slug]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Site not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching site', error });
    }
};
