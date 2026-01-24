const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'responder'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    bio: String,
    stats: {
        saves: { type: Number, default: 0 },
        missionsJoined: { type: Number, default: 0 },
        rating: { type: Number, default: 5.0 }
    },
    badges: [{ type: String }],
    pushSubscription: { type: Object },
    location: {
        lat: Number,
        lng: Number
    },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
