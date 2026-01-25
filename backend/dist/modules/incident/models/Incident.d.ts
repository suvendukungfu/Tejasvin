import mongoose, { Document } from 'mongoose';
import { IIncident } from '../../../shared/types/domain';
export interface IIncidentDocument extends Document, IIncident {
}
declare const _default: mongoose.Model<IIncidentDocument, {}, {}, {}, mongoose.Document<unknown, {}, IIncidentDocument, {}, mongoose.DefaultSchemaOptions> & IIncidentDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IIncidentDocument>;
export default _default;
