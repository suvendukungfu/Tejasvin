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
const UserSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2F1dGgvbW9kZWxzL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBc0Q7QUFNdEQsTUFBTSxVQUFVLEdBQVcsSUFBSSxpQkFBTSxDQUFDO0lBQ2xDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN0QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUNyRCxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDMUMsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQztRQUN0QyxPQUFPLEVBQUUsUUFBUTtLQUNwQjtJQUNELFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtJQUM3QyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDbEMsS0FBSyxFQUFFO1FBQ0gsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1FBQ25DLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtLQUMvQztDQUNKLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV6QixrQkFBZSxrQkFBUSxDQUFDLEtBQUssQ0FBZ0IsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBJVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC90eXBlcy9kb21haW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyRG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudCwgSVVzZXIge1xufVxuXG5jb25zdCBVc2VyU2NoZW1hOiBTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgICBuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICBlbWFpbDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB1bmlxdWU6IHRydWUgfSxcbiAgICBwYXNzd29yZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgcm9sZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGVudW06IFsndmljdGltJywgJ3Jlc3BvbmRlcicsICdhZG1pbiddLFxuICAgICAgICBkZWZhdWx0OiAndmljdGltJ1xuICAgIH0sXG4gICAgaXNWZXJpZmllZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIHB1c2hTdWJzY3JpcHRpb246IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgc3RhdHM6IHtcbiAgICAgICAgc2F2ZXM6IHsgdHlwZTogTnVtYmVyLCBkZWZhdWx0OiAwIH0sXG4gICAgICAgIHRvdGFsUmVzcG9uZGVkOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCB9XG4gICAgfVxufSwgeyB0aW1lc3RhbXBzOiB0cnVlIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbDxJVXNlckRvY3VtZW50PignVXNlcicsIFVzZXJTY2hlbWEpO1xuIl19