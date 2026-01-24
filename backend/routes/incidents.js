const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const auth = require('../middleware/auth');

// @route    GET api/incidents
// @desc     Get all active incidents
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const incidents = await Incident.find({ status: 'Active' })
            .populate('victim', 'name')
            .sort({ timestamp: -1 });
        res.json(incidents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/incidents
// @desc     Create an incident (Victim view)
// @access   Private
router.post('/', auth, async (req, res) => {
    const { type, severity, lat, lng, address } = req.body;

    try {
        const newIncident = new Incident({
            victim: req.user.id,
            type,
            severity,
            location: {
                type: 'Point',
                coordinates: [lng, lat]
            },
            address
        });

        const incident = await newIncident.save();
        res.json(incident);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT api/incidents/:id/accept
// @desc     Accept a mission (Responder view)
// @access   Private
router.put('/:id/accept', auth, async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({ msg: 'Incident not found' });
        }

        if (incident.status !== 'Active') {
            return res.status(400).json({ msg: 'Incident is no longer active' });
        }

        // Add responder if not already there
        if (!incident.responders.includes(req.user.id)) {
            incident.responders.push(req.user.id);
            await incident.save();
        }

        res.json(incident);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
