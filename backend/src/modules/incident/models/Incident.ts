import mongoose, { Schema, Document } from 'mongoose';
import { IIncident } from '../../../shared/types/domain';

export interface IIncidentDocument extends Document, IIncident {
}

const IncidentSchema: Schema = new Schema({
    victim: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, default: 'Accident' },
    description: { type: String },
    severity: {
        type: String,
        enum: ['Low', 'Moderate', 'Severe', 'Critical'],
        default: 'Moderate'
    },
    aiAdvice: { type: String },
    confidence: { type: Number },
    vitals: {
        status: { type: String, default: 'Unstable' },
        heartRate: Number,
        notes: String
    },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true } // [lng, lat]
    },
    status: {
        type: String,
        enum: ['Active', 'Resolved', 'Cancelled'],
        default: 'Active'
    },
    responders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

IncidentSchema.index({ location: '2dsphere' });

export default mongoose.model<IIncidentDocument>('Incident', IncidentSchema);
