import { io } from "socket.io-client";

// In a real app, this would come from an environment variable
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

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
            console.log("Connected to real-time rescue network");
        });

        this.socket.on("disconnect", () => {
            console.log("Lost connection to rescue network");
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
            this.socket.on(event, callback);
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
