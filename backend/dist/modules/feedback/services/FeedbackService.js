"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
class FeedbackService {
    async createFeedback(data) {
        const feedback = new Feedback_1.default(data);
        return await feedback.save();
    }
    async getFeedbackForUser(userId) {
        return await Feedback_1.default.find({ toUserId: userId }).sort({ createdAt: -1 });
    }
}
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZGJhY2tTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmVlZGJhY2svc2VydmljZXMvRmVlZGJhY2tTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUF5RDtBQUV6RCxNQUFhLGVBQWU7SUFDakIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUF3QjtRQUNoRCxNQUFNLFFBQVEsR0FBRyxJQUFJLGtCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsT0FBTyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQWM7UUFDMUMsT0FBTyxNQUFNLGtCQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQ0o7QUFURCwwQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGZWVkYmFjaywgeyBJRmVlZGJhY2sgfSBmcm9tICcuLi9tb2RlbHMvRmVlZGJhY2snO1xuXG5leHBvcnQgY2xhc3MgRmVlZGJhY2tTZXJ2aWNlIHtcbiAgICBwdWJsaWMgYXN5bmMgY3JlYXRlRmVlZGJhY2soZGF0YTogUGFydGlhbDxJRmVlZGJhY2s+KTogUHJvbWlzZTxJRmVlZGJhY2s+IHtcbiAgICAgICAgY29uc3QgZmVlZGJhY2sgPSBuZXcgRmVlZGJhY2soZGF0YSk7XG4gICAgICAgIHJldHVybiBhd2FpdCBmZWVkYmFjay5zYXZlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldEZlZWRiYWNrRm9yVXNlcih1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8SUZlZWRiYWNrW10+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZlZWRiYWNrLmZpbmQoeyB0b1VzZXJJZDogdXNlcklkIH0pLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xuICAgIH1cbn1cbiJdfQ==