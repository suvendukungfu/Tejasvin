const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    incident: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true },
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The victim/responder being rated
    role: { type: String, enum: ['victim', 'responder'], required: true }, // Role of the person GIVING the feedback
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
