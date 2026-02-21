import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'explorer' | 'specialist' | 'admin';
  verifiedSpecialist: boolean;
  expeditionsCompleted: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['explorer', 'specialist', 'admin'],
      default: 'explorer',
    },
    verifiedSpecialist: { type: Boolean, default: false },
    expeditionsCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
