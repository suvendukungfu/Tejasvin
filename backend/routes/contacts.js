const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// @route    GET api/contacts
// @desc     Get all contacts for user
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/contacts
// @desc     Add emergency contact
// @access   Private
router.post('/', auth, async (req, res) => {
    const { name, phone, relationship } = req.body;

    try {
        const newContact = new Contact({
            user: req.user.id,
            name,
            phone,
            relationship
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE api/contacts/:id
// @desc     Delete contact
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        // Check user ownership
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await contact.deleteOne();
        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
