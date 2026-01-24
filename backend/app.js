const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const webPush = require('web-push');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security Headers
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use('/api/', limiter);

// Configure Web Push
webPush.setVapidDetails(
    process.env.EMAIL || 'mailto:admin@example.com',
    process.env.VAPID_PUBLIC_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rescue_network')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/incidents', require('./routes/incidents'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/admin', require('./routes/admin'));

const Incident = require('./models/Incident');

// --- Socket Handlers ---
io.on('connection', (socket) => {
    console.log('User connected to Rescue Network:', socket.id);

    socket.on('emergency:sos', async (data) => {
        console.log('🆘 SOS ALARM RECEIVED:', data);

        try {
            const { triageIncident } = require('./services/aiTriage');
            const aiAnalysis = triageIncident(data.description, data.type);

            const newIncident = new Incident({
                type: data.type || 'Accident',
                description: data.description,
                severity: aiAnalysis.priority,
                aiAdvice: aiAnalysis.advice,
                confidence: aiAnalysis.confidence,
                location: {
                    type: 'Point',
                    coordinates: [data.lng, data.lat]
                }
            });

            const savedIncident = await newIncident.save();

            // Notify Emergency Contacts
            const Contact = require('./models/Contact');
            const contacts = await Contact.find({ user: data.userId || null });
            contacts.forEach(c => {
                console.log(`📡 [SMS SIM] Sent to ${c.phone} (${c.name}): SOS from contact at http://maps.google.com/?q=${data.lat},${data.lng}`);
            });

            // BROADCAST PUSH NOTIFICATIONS TO ALL RESPONDERS
            const User = require('./models/User');
            const responders = await User.find({ role: 'responder', pushSubscription: { $exists: true } });

            const pushPayload = JSON.stringify({
                title: 'CRITICAL: Nearby SOS Alert',
                body: `${data.type} incident reported nearby! Click to respond.`,
                icon: '/icons/logo-192.png',
                data: { url: `/incident/${savedIncident._id}` }
            });

            responders.forEach(responder => {
                webPush.sendNotification(responder.pushSubscription, pushPayload)
                    .catch(err => console.error(`Push failed for ${responder.name}:`, err));
            });

            socket.broadcast.emit('mission:offered', {
                ...data,
                id: savedIncident._id,
                status: savedIncident.status
            });
        } catch (err) {
            console.error("Failed to save incident:", err);
        }
    });

    socket.on('responder:location', (data) => {
        // data: { incidentId, lat, lng, responderName }
        console.log(`🚑 Responder ${data.responderName} moving for ${data.incidentId}`);
        // Broadcast to everyone else (including the victim)
        socket.broadcast.emit('incident:responder_update', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from Rescue Network');
    });
});

app.get('/', (req, res) => {
    res.send('Rescue Network Backend is running!');
});

server.listen(port, () => {
    console.log(`Rescue Server is running on port ${port}`);
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        msg: 'Something went wrong on the server',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

