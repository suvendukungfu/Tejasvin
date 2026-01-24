const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route    POST api/feedback
// @desc     Submit feedback for a mission
// @access   Private
router.post('/', auth, async (req, res) => {
    const { incidentId, toUserId, role, rating, comment } = req.body;

    try {
        const feedback = new Feedback({
            incident: incidentId,
            fromUser: req.user.id,
            toUser: toUserId,
            role,
            rating,
            comment
        });

        await feedback.save();

        // Update the recipient's aggregate rating
        const targetUser = await User.findById(toUserId);
        if (targetUser) {
            // Simple running average simulation (In production, use dynamic aggregation)
            const currentRating = targetUser.stats?.rating || 5.0;
            const totalMissions = targetUser.stats?.missionsJoined || 1;
            const newRating = ((currentRating * totalMissions) + rating) / (totalMissions + 1);

            targetUser.stats.rating = newRating;
            await targetUser.save();
        }

        res.json(feedback);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
