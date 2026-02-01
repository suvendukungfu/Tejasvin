import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
    name: string;
    email: string;
    rating?: number;
    message: string;
    createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);
