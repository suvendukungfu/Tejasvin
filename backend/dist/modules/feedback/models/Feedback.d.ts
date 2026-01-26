import mongoose, { Document } from 'mongoose';
export interface IFeedback extends Document {
    incidentId: string;
    fromUserId: string;
    toUserId: string;
    role: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IFeedback, {}, {}, {}, mongoose.Document<unknown, {}, IFeedback, {}, mongoose.DefaultSchemaOptions> & IFeedback & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IFeedback>;
export default _default;
