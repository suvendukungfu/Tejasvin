import { Request, Response } from 'express';
export declare class FeedbackController {
    private feedbackService;
    constructor();
    create(req: Request, res: Response): Promise<void>;
}
