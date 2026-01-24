import { Request, Response } from 'express';
export declare class IncidentController {
    private incidentService;
    constructor();
    create(req: Request, res: Response): Promise<void>;
    getActive(_req: Request, res: Response): Promise<void>;
    updateVitals(req: Request, res: Response): Promise<void>;
}
