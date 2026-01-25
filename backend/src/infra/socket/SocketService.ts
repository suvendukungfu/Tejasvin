import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class SocketService {
    private static instance: SocketService;
    private io: SocketIOServer | null = null;

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public async init(server: HttpServer): Promise<void> {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        // Setup Redis Adapter for High Availability
        if (process.env.REDIS_URL) {
            const pubClient = createClient({ url: process.env.REDIS_URL });
            const subClient = pubClient.duplicate();
            await Promise.all([pubClient.connect(), subClient.connect()]);
            this.io.adapter(createAdapter(pubClient, subClient));
            console.log("📡 WebSocket Redis Adapter enabled for HA scaling.");
        }

        this.io.on('connection', (socket: Socket) => {
            console.log('User connected to Rescue v2:', socket.id);

            socket.on('emergency:sos', (data: any) => {
                console.log('🆘 SOS ALARM (v2):', data);
                // Business logic for broadcast will go here or in a dedicated SocketHandler
                socket.broadcast.emit('mission:offered', data);
            });

            socket.on('incident:vitals_update', (data: any) => {
                console.log('❤️ Vitals Update:', data);
                socket.broadcast.emit('incident:vitals_sync', data);
            });

            socket.on('mission:accepted', (data: any) => {
                console.log('✅ Mission Accepted:', data);
                socket.broadcast.emit('mission:start', data);
            });

            // V2 Infrastructure Simulation Events
            socket.on('vehicle:update', (data: any) => {
                // Relay vehicle telemetry to all connected clients (Admin/Dashboard)
                // console.log('🚗 V2I Telemetry:', data.id, data.speed_kmh);
                socket.broadcast.emit('infrastructure:update', data);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected from Rescue v2');
            });
        });
    }

    public getIO(): SocketIOServer {
        if (!this.io) {
            throw new Error('Socket.io not initialized!');
        }
        return this.io;
    }
}
