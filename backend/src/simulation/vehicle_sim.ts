
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';
const VEHICLE_ID = `SIM-CAR-${Math.floor(Math.random() * 1000)}`;

console.log(`🚗 Starting Vehicle Simulator [${VEHICLE_ID}]...`);

const socket = io(SOCKET_URL, {
    transports: ['websocket'],
});

// Mock Route (Circular path around Central Delhi)
const route = [
    { lat: 28.6139, lng: 77.2090 }, // Center
    { lat: 28.6145, lng: 77.2100 },
    { lat: 28.6150, lng: 77.2110 },
    { lat: 28.6155, lng: 77.2120 },
    { lat: 28.6160, lng: 77.2130 },
    { lat: 28.6150, lng: 77.2140 }, // Turn
    { lat: 28.6140, lng: 77.2130 },
    { lat: 28.6130, lng: 77.2120 },
    { lat: 28.6120, lng: 77.2110 },
    { lat: 28.6130, lng: 77.2100 }, // Loop back
];

let currentIndex = 0;
let speed = 40; // km/h

socket.on('connect', () => {
    console.log('✅ Connected to Rescue Network Infrastructure');

    // Simulate Telemetry Loop
    setInterval(() => {
        const coords = route[currentIndex];

        // Add some noise/jitter
        const lat = coords.lat + (Math.random() - 0.5) * 0.0001;
        const lng = coords.lng + (Math.random() - 0.5) * 0.0001;

        // Simulate driving loop
        currentIndex = (currentIndex + 1) % route.length;

        // Random speed variance
        speed = Math.max(20, Math.min(80, speed + (Math.random() - 0.5) * 5));

        const telemetry = {
            id: VEHICLE_ID,
            type: 'autonomous_vehicle',
            lat,
            lng,
            speed_kmh: Math.round(speed),
            status: 'OK',
            timestamp: Date.now()
        };

        // Emit Vehicle-to-Infrastructure (V2I) message
        socket.emit('vehicle:update', telemetry);
        process.stdout.write(`\r📡 V2I Tx: Lat:${lat.toFixed(4)} Lng:${lng.toFixed(4)} Speed:${Math.round(speed)}km/h`);

    }, 2000); // Update every 2 seconds
});

socket.on('disconnect', () => {
    console.log('\n❌ Disconnected from network');
});
