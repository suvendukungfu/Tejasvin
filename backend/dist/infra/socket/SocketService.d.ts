import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
export declare class SocketService {
    private static instance;
    private io;
    static getInstance(): SocketService;
    init(server: HttpServer): Promise<void>;
    getIO(): SocketIOServer;
}
