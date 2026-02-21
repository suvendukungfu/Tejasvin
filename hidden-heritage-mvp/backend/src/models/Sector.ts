import mongoose, { Schema, Document } from 'mongoose';

export interface ISector extends Document {
  name: string;
  region: string;
  heritageSites: string[];
  status: 'active' | 'surveying' | 'restricted' | 'archived';
  coordinatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

const SectorSchema = new Schema<ISector>(
  {
    name: { type: String, required: true, unique: true },
    region: { type: String, required: true },
    heritageSites: [{ type: String }],
    status: {
      type: String,
      enum: ['active', 'surveying', 'restricted', 'archived'],
      default: 'surveying',
    },
    coordinatorId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISector>('Sector', SectorSchema);
