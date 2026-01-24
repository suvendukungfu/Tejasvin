import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './infra/database/mongoose';
import { SocketService } from './infra/socket/SocketService';

// Modules
import incidentRoutes from './modules/incident/routes';
import authRoutes from './modules/auth/routes';

dotenv.config();

const app = express();
const httpServer = createServer(app);

async function bootstrap() {
    // Init DB
    await connectDB();

    // Init Sockets
    await SocketService.getInstance().init(httpServer);

    // Middleware
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/v2/auth', authRoutes);
    app.use('/api/v2/incidents', incidentRoutes);

    // Global Error Handler
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).json({
            msg: 'Something went wrong in Rescue v2',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
        });
    });

    const PORT = process.env.PORT || 5001;

    httpServer.listen(PORT, () => {
        console.log(`🚀 Rescue Network v2 (TS) is running on port ${PORT}`);
    });
}

bootstrap().catch(err => {
    console.error('Fatal crash in Rescue v2 bootstrap:', err);
    process.exit(1);
});
