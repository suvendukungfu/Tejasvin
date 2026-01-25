import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
    incidentId: string;
    fromUserId: string;
    toUserId: string;
    role: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
    incidentId: { type: Schema.Types.ObjectId, ref: 'Incident', required: true },
    fromUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    toUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);
