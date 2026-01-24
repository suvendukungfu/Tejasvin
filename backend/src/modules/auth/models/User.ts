import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../../../shared/types/domain';

export interface IUserDocument extends Document, IUser {
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['victim', 'responder', 'admin'],
        default: 'victim'
    },
    isVerified: { type: Boolean, default: false },
    pushSubscription: { type: Object },
    stats: {
        saves: { type: Number, default: 0 },
        totalResponded: { type: Number, default: 0 }
    }
}, { timestamps: true });

export default mongoose.model<IUserDocument>('User', UserSchema);
