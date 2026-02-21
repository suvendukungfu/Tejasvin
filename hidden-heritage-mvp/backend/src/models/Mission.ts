import mongoose, { Schema, Document } from 'mongoose';

export interface IMission extends Document {
  title: string;
  explorerId: string;
  location: string;
  sectorId: string;
  status: 'active' | 'completed' | 'pending' | 'aborted';
  verificationLevel: 'unverified' | 'field-verified' | 'expert-verified' | 'certified';
  startedAt: Date;
  completedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MissionSchema = new Schema<IMission>(
  {
    title: { type: String, required: true },
    explorerId: { type: String, required: true },
    location: { type: String, required: true },
    sectorId: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'completed', 'pending', 'aborted'],
      default: 'pending',
    },
    verificationLevel: {
      type: String,
      enum: ['unverified', 'field-verified', 'expert-verified', 'certified'],
      default: 'unverified',
    },
    startedAt: { type: Date, required: true },
    completedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IMission>('Mission', MissionSchema);
