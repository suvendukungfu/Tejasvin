"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const FeedbackService_1 = require("../services/FeedbackService");
class FeedbackController {
    constructor() {
        this.feedbackService = new FeedbackService_1.FeedbackService();
    }
    async create(req, res) {
        try {
            const { incidentId, toUserId, role, rating, comment } = req.body;
            const feedback = await this.feedbackService.createFeedback({
                incidentId,
                fromUserId: req.user.id,
                toUserId,
                role,
                rating,
                comment
            });
            res.status(201).json(feedback);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
}
exports.FeedbackController = FeedbackController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZGJhY2tDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZmVlZGJhY2svY29udHJvbGxlcnMvRmVlZGJhY2tDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlFQUE4RDtBQUU5RCxNQUFhLGtCQUFrQjtJQUczQjtRQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLEdBQWE7UUFDM0MsSUFBSSxDQUFDO1lBQ0QsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ2pFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUM7Z0JBQ3ZELFVBQVU7Z0JBQ1YsVUFBVSxFQUFHLEdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsUUFBUTtnQkFDUixJQUFJO2dCQUNKLE1BQU07Z0JBQ04sT0FBTzthQUNWLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFBQyxPQUFPLEdBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDTCxDQUFDO0NBQ0o7QUF4QkQsZ0RBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IEZlZWRiYWNrU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL0ZlZWRiYWNrU2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBGZWVkYmFja0NvbnRyb2xsZXIge1xuICAgIHByaXZhdGUgZmVlZGJhY2tTZXJ2aWNlOiBGZWVkYmFja1NlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mZWVkYmFja1NlcnZpY2UgPSBuZXcgRmVlZGJhY2tTZXJ2aWNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGNyZWF0ZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW5jaWRlbnRJZCwgdG9Vc2VySWQsIHJvbGUsIHJhdGluZywgY29tbWVudCB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBjb25zdCBmZWVkYmFjayA9IGF3YWl0IHRoaXMuZmVlZGJhY2tTZXJ2aWNlLmNyZWF0ZUZlZWRiYWNrKHtcbiAgICAgICAgICAgICAgICBpbmNpZGVudElkLFxuICAgICAgICAgICAgICAgIGZyb21Vc2VySWQ6IChyZXEgYXMgYW55KS51c2VyLmlkLFxuICAgICAgICAgICAgICAgIHRvVXNlcklkLFxuICAgICAgICAgICAgICAgIHJvbGUsXG4gICAgICAgICAgICAgICAgcmF0aW5nLFxuICAgICAgICAgICAgICAgIGNvbW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24oZmVlZGJhY2spO1xuICAgICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuc2VuZCgnU2VydmVyIEVycm9yJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=