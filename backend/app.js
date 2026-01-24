const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
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

const Incident = require('./models/Incident');

// --- Socket Handlers ---
io.on('connection', (socket) => {
    console.log('User connected to Rescue Network:', socket.id);

    socket.on('emergency:sos', async (data) => {
        console.log('🆘 SOS ALARM RECEIVED:', data);

        try {
            const newIncident = new Incident({
                type: data.type || 'Accident',
                severity: data.severity || 'Moderate',
                location: {
                    type: 'Point',
                    coordinates: [data.lng, data.lat]
                }
            });

            const savedIncident = await newIncident.save();

            socket.broadcast.emit('mission:offered', {
                ...data,
                id: savedIncident._id,
                status: savedIncident.status
            });
        } catch (err) {
            console.error("Failed to save incident:", err);
        }
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
