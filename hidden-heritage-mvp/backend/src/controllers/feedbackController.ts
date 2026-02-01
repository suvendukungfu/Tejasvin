import { Request, Response } from 'express';
import Feedback, { IFeedback } from '../models/Feedback';

export const submitFeedback = async (req: Request, res: Response) => {
    try {
        const { name, email, rating, message } = req.body;
        const feedback = new Feedback({ name, email, rating, message });
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error });
    }
};

export const getAllFeedbacks = async (req: Request, res: Response) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedbacks', error });
    }
};
