import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
    site_slug: { type: String, required: true },
    mode: { type: String, enum: ['Tourist', 'Student', 'Researcher'], required: true },
    sections: [{
        title: String,
        content: String,
        source: String
    }],
    verified: { type: Boolean, default: false }
});

export const StoryModel = mongoose.model('Story', StorySchema);
