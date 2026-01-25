import { Request, Response } from 'express';
import { FeedbackService } from '../services/FeedbackService';

export class FeedbackController {
    private feedbackService: FeedbackService;

    constructor() {
        this.feedbackService = new FeedbackService();
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { incidentId, toUserId, role, rating, comment } = req.body;
            const feedback = await this.feedbackService.createFeedback({
                incidentId,
                fromUserId: (req as any).user.id,
                toUserId,
                role,
                rating,
                comment
            });
            res.status(201).json(feedback);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
}
