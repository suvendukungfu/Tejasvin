import { io } from "socket.io-client";
import logger from "../utils/logger";

// In a real app, this would come from an environment variable
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect() {
        if (this.socket) return;

        this.socket = io(SOCKET_URL, {
            autoConnect: true,
            reconnectionAttempts: 5,
        });

        this.socket.on("connect", () => {
            logger.info("Connected to real-time rescue network");
        });

        this.socket.on("disconnect", () => {
            logger.warn("Lost connection to rescue network");
        });

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, (data) => {
                if (!data) {
                    logger.warn(`Received empty payload for socket event: ${event}`);
                    return;
                }
                try {
                    callback(data);
                } catch (error) {
                    logger.error(`Error in socket event handler [${event}]`, error);
                }
            });
        }
    }

    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }
}

const socketService = new SocketService();
export default socketService;
