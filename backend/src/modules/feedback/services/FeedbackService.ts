import Feedback, { IFeedback } from '../models/Feedback';

export class FeedbackService {
    public async createFeedback(data: Partial<IFeedback>): Promise<IFeedback> {
        const feedback = new Feedback(data);
        return await feedback.save();
    }

    public async getFeedbackForUser(userId: string): Promise<IFeedback[]> {
        return await Feedback.find({ toUserId: userId }).sort({ createdAt: -1 });
    }
}
