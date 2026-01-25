import mongoose, { Document } from 'mongoose';
import { IUser } from '../../../shared/types/domain';
export interface IUserDocument extends Document, IUser {
}
declare const _default: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, mongoose.DefaultSchemaOptions> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUserDocument>;
export default _default;
