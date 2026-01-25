"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const IncidentSchema = new mongoose_1.Schema({
    victim: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
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
    responders: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });
IncidentSchema.index({ location: '2dsphere' });
exports.default = mongoose_1.default.model('Incident', IncidentSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5jaWRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9pbmNpZGVudC9tb2RlbHMvSW5jaWRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBc0Q7QUFNdEQsTUFBTSxjQUFjLEdBQVcsSUFBSSxpQkFBTSxDQUFDO0lBQ3RDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTtJQUNwRCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUU7SUFDM0MsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUM3QixRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQztRQUMvQyxPQUFPLEVBQUUsVUFBVTtLQUN0QjtJQUNELFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDMUIsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUM1QixNQUFNLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUU7UUFDN0MsU0FBUyxFQUFFLE1BQU07UUFDakIsS0FBSyxFQUFFLE1BQU07S0FDaEI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7UUFDeEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLGFBQWE7S0FDaEU7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDO1FBQ3pDLE9BQU8sRUFBRSxRQUFRO0tBQ3BCO0lBQ0QsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUMxRCxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0NBQy9DLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV6QixjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFFL0Msa0JBQWUsa0JBQVEsQ0FBQyxLQUFLLENBQW9CLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50IH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgSUluY2lkZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3R5cGVzL2RvbWFpbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUluY2lkZW50RG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudCwgSUluY2lkZW50IHtcbn1cblxuY29uc3QgSW5jaWRlbnRTY2hlbWE6IFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIHZpY3RpbTogeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ1VzZXInIH0sXG4gICAgdHlwZTogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdBY2NpZGVudCcgfSxcbiAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICBzZXZlcml0eToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGVudW06IFsnTG93JywgJ01vZGVyYXRlJywgJ1NldmVyZScsICdDcml0aWNhbCddLFxuICAgICAgICBkZWZhdWx0OiAnTW9kZXJhdGUnXG4gICAgfSxcbiAgICBhaUFkdmljZTogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICBjb25maWRlbmNlOiB7IHR5cGU6IE51bWJlciB9LFxuICAgIHZpdGFsczoge1xuICAgICAgICBzdGF0dXM6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnVW5zdGFibGUnIH0sXG4gICAgICAgIGhlYXJ0UmF0ZTogTnVtYmVyLFxuICAgICAgICBub3RlczogU3RyaW5nXG4gICAgfSxcbiAgICBsb2NhdGlvbjoge1xuICAgICAgICB0eXBlOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJ1BvaW50JyB9LFxuICAgICAgICBjb29yZGluYXRlczogeyB0eXBlOiBbTnVtYmVyXSwgcmVxdWlyZWQ6IHRydWUgfSAvLyBbbG5nLCBsYXRdXG4gICAgfSxcbiAgICBzdGF0dXM6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBlbnVtOiBbJ0FjdGl2ZScsICdSZXNvbHZlZCcsICdDYW5jZWxsZWQnXSxcbiAgICAgICAgZGVmYXVsdDogJ0FjdGl2ZSdcbiAgICB9LFxuICAgIHJlc3BvbmRlcnM6IFt7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnVXNlcicgfV0sXG4gICAgdGltZXN0YW1wOiB7IHR5cGU6IERhdGUsIGRlZmF1bHQ6IERhdGUubm93IH0sXG59LCB7IHRpbWVzdGFtcHM6IHRydWUgfSk7XG5cbkluY2lkZW50U2NoZW1hLmluZGV4KHsgbG9jYXRpb246ICcyZHNwaGVyZScgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVsPElJbmNpZGVudERvY3VtZW50PignSW5jaWRlbnQnLCBJbmNpZGVudFNjaGVtYSk7XG4iXX0=