const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    victim: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, default: 'Accident' },
    description: { type: String },
    severity: { type: String, enum: ['Low', 'Moderate', 'Severe', 'Critical'], default: 'Moderate' },
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
    address: String,
    status: { type: String, enum: ['Active', 'Resolved', 'Cancelled'], default: 'Active' },
    responders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    timestamp: { type: Date, default: Date.now },
    resolvedAt: Date
});

// Index for Geospatial queries
IncidentSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Incident', IncidentSchema);
