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
const FeedbackSchema = new mongoose_1.Schema({
    incidentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Incident', required: true },
    fromUserId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    toUserId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Feedback', FeedbackSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZGJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9mZWVkYmFjay9tb2RlbHMvRmVlZGJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBc0Q7QUFZdEQsTUFBTSxjQUFjLEdBQVcsSUFBSSxpQkFBTSxDQUFDO0lBQ3RDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQzVFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3hFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTtJQUN0RCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtJQUN4RCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0NBQzVCLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV6QixrQkFBZSxrQkFBUSxDQUFDLEtBQUssQ0FBWSxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCB9IGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IGludGVyZmFjZSBJRmVlZGJhY2sgZXh0ZW5kcyBEb2N1bWVudCB7XG4gICAgaW5jaWRlbnRJZDogc3RyaW5nO1xuICAgIGZyb21Vc2VySWQ6IHN0cmluZztcbiAgICB0b1VzZXJJZDogc3RyaW5nO1xuICAgIHJvbGU6IHN0cmluZztcbiAgICByYXRpbmc6IG51bWJlcjtcbiAgICBjb21tZW50OiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xufVxuXG5jb25zdCBGZWVkYmFja1NjaGVtYTogU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gICAgaW5jaWRlbnRJZDogeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ0luY2lkZW50JywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICBmcm9tVXNlcklkOiB7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnVXNlcicsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgdG9Vc2VySWQ6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdVc2VyJyB9LFxuICAgIHJvbGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgIHJhdGluZzogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlLCBtaW46IDEsIG1heDogNSB9LFxuICAgIGNvbW1lbnQ6IHsgdHlwZTogU3RyaW5nIH0sXG59LCB7IHRpbWVzdGFtcHM6IHRydWUgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVsPElGZWVkYmFjaz4oJ0ZlZWRiYWNrJywgRmVlZGJhY2tTY2hlbWEpO1xuIl19