import { Request, Response } from 'express';
import { IncidentService } from '../services/IncidentService';

export class IncidentController {
    private incidentService: IncidentService;

    constructor() {
        this.incidentService = new IncidentService();
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { type, description, lat, lng } = req.body;
            const incident = await this.incidentService.createIncident({
                victimId: (req as any).user.id,
                type,
                description,
                location: {
                    type: 'Point',
                    coordinates: [lng, lat]
                }
            });
            res.status(201).json(incident);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    public async getActive(_req: Request, res: Response): Promise<void> {
        try {
            const incidents = await this.incidentService.getActiveIncidents();
            res.json(incidents);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    public async updateVitals(req: Request, res: Response): Promise<void> {
        try {
            const { status, heartRate, notes } = req.body;
            const incident = await this.incidentService.updateVitals(req.params.id as string, {
                status,
                heartRate,
                notes
            });
            if (!incident) {
                res.status(404).json({ msg: 'Incident not found' });
                return;
            }
            res.json(incident);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
}
