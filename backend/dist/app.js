"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("./infra/database/mongoose");
const SocketService_1 = require("./infra/socket/SocketService");
// Modules
const routes_1 = __importDefault(require("./modules/incident/routes"));
const routes_2 = __importDefault(require("./modules/auth/routes"));
const routes_3 = __importDefault(require("./modules/feedback/routes"));
const routes_4 = __importDefault(require("./modules/analytics/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
async function bootstrap() {
    // Init DB
    await (0, mongoose_1.connectDB)();
    // Init Sockets
    await SocketService_1.SocketService.getInstance().init(httpServer);
    // Middleware
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Routes
    app.use('/api/v2/auth', routes_2.default);
    app.use('/api/v2/incidents', routes_1.default);
    app.use('/api/v2/feedback', routes_3.default);
    app.use('/api/v2/analytics', routes_4.default);
    // Global Error Handler
    app.use((err, _req, res, _next) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QiwrQkFBb0M7QUFDcEMsZ0RBQXdCO0FBQ3hCLG9EQUE0QjtBQUM1QixvREFBNEI7QUFDNUIsd0RBQXNEO0FBQ3RELGdFQUE2RDtBQUU3RCxVQUFVO0FBQ1YsdUVBQXVEO0FBQ3ZELG1FQUErQztBQUMvQyx1RUFBdUQ7QUFDdkQsd0VBQXlEO0FBRXpELGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDdEIsTUFBTSxVQUFVLEdBQUcsSUFBQSxtQkFBWSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXJDLEtBQUssVUFBVSxTQUFTO0lBQ3BCLFVBQVU7SUFDVixNQUFNLElBQUEsb0JBQVMsR0FBRSxDQUFDO0lBRWxCLGVBQWU7SUFDZixNQUFNLDZCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRW5ELGFBQWE7SUFDYixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsZ0JBQU0sR0FBRSxDQUFDLENBQUM7SUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksR0FBRSxDQUFDLENBQUM7SUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFeEIsU0FBUztJQUNULEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGdCQUFVLENBQUMsQ0FBQztJQUNwQyxHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGdCQUFjLENBQUMsQ0FBQztJQUM3QyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGdCQUFjLENBQUMsQ0FBQztJQUM1QyxHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGdCQUFlLENBQUMsQ0FBQztJQUU5Qyx1QkFBdUI7SUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVEsRUFBRSxJQUFxQixFQUFFLEdBQXFCLEVBQUUsS0FBMkIsRUFBRSxFQUFFO1FBQzVGLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLEdBQUcsRUFBRSxtQ0FBbUM7WUFDeEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUNuRSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztJQUV0QyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4RSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXIgfSBmcm9tICdodHRwJztcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuaW1wb3J0IGhlbG1ldCBmcm9tICdoZWxtZXQnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IHsgY29ubmVjdERCIH0gZnJvbSAnLi9pbmZyYS9kYXRhYmFzZS9tb25nb29zZSc7XG5pbXBvcnQgeyBTb2NrZXRTZXJ2aWNlIH0gZnJvbSAnLi9pbmZyYS9zb2NrZXQvU29ja2V0U2VydmljZSc7XG5cbi8vIE1vZHVsZXNcbmltcG9ydCBpbmNpZGVudFJvdXRlcyBmcm9tICcuL21vZHVsZXMvaW5jaWRlbnQvcm91dGVzJztcbmltcG9ydCBhdXRoUm91dGVzIGZyb20gJy4vbW9kdWxlcy9hdXRoL3JvdXRlcyc7XG5pbXBvcnQgZmVlZGJhY2tSb3V0ZXMgZnJvbSAnLi9tb2R1bGVzL2ZlZWRiYWNrL3JvdXRlcyc7XG5pbXBvcnQgYW5hbHl0aWNzUm91dGVzIGZyb20gJy4vbW9kdWxlcy9hbmFseXRpY3Mvcm91dGVzJztcblxuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBodHRwU2VydmVyID0gY3JlYXRlU2VydmVyKGFwcCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGJvb3RzdHJhcCgpIHtcbiAgICAvLyBJbml0IERCXG4gICAgYXdhaXQgY29ubmVjdERCKCk7XG5cbiAgICAvLyBJbml0IFNvY2tldHNcbiAgICBhd2FpdCBTb2NrZXRTZXJ2aWNlLmdldEluc3RhbmNlKCkuaW5pdChodHRwU2VydmVyKTtcblxuICAgIC8vIE1pZGRsZXdhcmVcbiAgICBhcHAudXNlKGhlbG1ldCgpKTtcbiAgICBhcHAudXNlKGNvcnMoKSk7XG4gICAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG5cbiAgICAvLyBSb3V0ZXNcbiAgICBhcHAudXNlKCcvYXBpL3YyL2F1dGgnLCBhdXRoUm91dGVzKTtcbiAgICBhcHAudXNlKCcvYXBpL3YyL2luY2lkZW50cycsIGluY2lkZW50Um91dGVzKTtcbiAgICBhcHAudXNlKCcvYXBpL3YyL2ZlZWRiYWNrJywgZmVlZGJhY2tSb3V0ZXMpO1xuICAgIGFwcC51c2UoJy9hcGkvdjIvYW5hbHl0aWNzJywgYW5hbHl0aWNzUm91dGVzKTtcblxuICAgIC8vIEdsb2JhbCBFcnJvciBIYW5kbGVyXG4gICAgYXBwLnVzZSgoZXJyOiBhbnksIF9yZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBfbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgICAgICBtc2c6ICdTb21ldGhpbmcgd2VudCB3cm9uZyBpbiBSZXNjdWUgdjInLFxuICAgICAgICAgICAgZXJyb3I6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnID8gZXJyLm1lc3NhZ2UgOiB7fVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IFBPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDUwMDE7XG5cbiAgICBodHRwU2VydmVyLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGDwn5qAIFJlc2N1ZSBOZXR3b3JrIHYyIChUUykgaXMgcnVubmluZyBvbiBwb3J0ICR7UE9SVH1gKTtcbiAgICB9KTtcbn1cblxuYm9vdHN0cmFwKCkuY2F0Y2goZXJyID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdGYXRhbCBjcmFzaCBpbiBSZXNjdWUgdjIgYm9vdHN0cmFwOicsIGVycik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG4iXX0=