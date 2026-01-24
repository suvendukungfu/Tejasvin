const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route    GET api/admin/users
// @desc     Get all users (with role filter)
// @access   Private/Admin
router.get('/users', [auth, admin], async (req, res) => {
    try {
        const { role } = req.query;
        const query = role ? { role } : {};
        const users = await User.find(query).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT api/admin/verify/:id
// @desc     Verify/Revoke responder identity
// @access   Private/Admin
router.put('/verify/:id', [auth, admin], async (req, res) => {
    try {
        const { isVerified } = req.body;
        let user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });
        if (user.role !== 'responder') return res.status(400).json({ msg: 'Only responders can be verified' });

        user.isVerified = isVerified;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
