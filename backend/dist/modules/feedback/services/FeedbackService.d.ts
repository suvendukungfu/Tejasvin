import { IFeedback } from '../models/Feedback';
export declare class FeedbackService {
    createFeedback(data: Partial<IFeedback>): Promise<IFeedback>;
    getFeedbackForUser(userId: string): Promise<IFeedback[]>;
}
