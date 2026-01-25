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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QiwrQkFBb0M7QUFDcEMsZ0RBQXdCO0FBQ3hCLG9EQUE0QjtBQUM1QixvREFBNEI7QUFDNUIsd0RBQXNEO0FBQ3RELGdFQUE2RDtBQUU3RCxVQUFVO0FBQ1YsdUVBQXVEO0FBQ3ZELG1FQUErQztBQUUvQyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUEsbUJBQVksRUFBQyxHQUFHLENBQUMsQ0FBQztBQUVyQyxLQUFLLFVBQVUsU0FBUztJQUNwQixVQUFVO0lBQ1YsTUFBTSxJQUFBLG9CQUFTLEdBQUUsQ0FBQztJQUVsQixlQUFlO0lBQ2YsTUFBTSw2QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVuRCxhQUFhO0lBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxDQUFDO0lBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLFNBQVM7SUFDVCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxnQkFBVSxDQUFDLENBQUM7SUFDcEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBYyxDQUFDLENBQUM7SUFFN0MsdUJBQXVCO0lBQ3ZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFRLEVBQUUsSUFBcUIsRUFBRSxHQUFxQixFQUFFLEtBQTJCLEVBQUUsRUFBRTtRQUM1RixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixHQUFHLEVBQUUsbUNBQW1DO1lBQ3hDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDbkUsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7SUFFdEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMscUNBQXFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgY3JlYXRlU2VydmVyIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCBoZWxtZXQgZnJvbSAnaGVsbWV0JztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmltcG9ydCB7IGNvbm5lY3REQiB9IGZyb20gJy4vaW5mcmEvZGF0YWJhc2UvbW9uZ29vc2UnO1xuaW1wb3J0IHsgU29ja2V0U2VydmljZSB9IGZyb20gJy4vaW5mcmEvc29ja2V0L1NvY2tldFNlcnZpY2UnO1xuXG4vLyBNb2R1bGVzXG5pbXBvcnQgaW5jaWRlbnRSb3V0ZXMgZnJvbSAnLi9tb2R1bGVzL2luY2lkZW50L3JvdXRlcyc7XG5pbXBvcnQgYXV0aFJvdXRlcyBmcm9tICcuL21vZHVsZXMvYXV0aC9yb3V0ZXMnO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IGh0dHBTZXJ2ZXIgPSBjcmVhdGVTZXJ2ZXIoYXBwKTtcblxuYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKCkge1xuICAgIC8vIEluaXQgREJcbiAgICBhd2FpdCBjb25uZWN0REIoKTtcblxuICAgIC8vIEluaXQgU29ja2V0c1xuICAgIGF3YWl0IFNvY2tldFNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5pbml0KGh0dHBTZXJ2ZXIpO1xuXG4gICAgLy8gTWlkZGxld2FyZVxuICAgIGFwcC51c2UoaGVsbWV0KCkpO1xuICAgIGFwcC51c2UoY29ycygpKTtcbiAgICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcblxuICAgIC8vIFJvdXRlc1xuICAgIGFwcC51c2UoJy9hcGkvdjIvYXV0aCcsIGF1dGhSb3V0ZXMpO1xuICAgIGFwcC51c2UoJy9hcGkvdjIvaW5jaWRlbnRzJywgaW5jaWRlbnRSb3V0ZXMpO1xuXG4gICAgLy8gR2xvYmFsIEVycm9yIEhhbmRsZXJcbiAgICBhcHAudXNlKChlcnI6IGFueSwgX3JlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIF9uZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjayk7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgICAgICAgIG1zZzogJ1NvbWV0aGluZyB3ZW50IHdyb25nIGluIFJlc2N1ZSB2MicsXG4gICAgICAgICAgICBlcnJvcjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBlcnIubWVzc2FnZSA6IHt9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgNTAwMTtcblxuICAgIGh0dHBTZXJ2ZXIubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYPCfmoAgUmVzY3VlIE5ldHdvcmsgdjIgKFRTKSBpcyBydW5uaW5nIG9uIHBvcnQgJHtQT1JUfWApO1xuICAgIH0pO1xufVxuXG5ib290c3RyYXAoKS5jYXRjaChlcnIgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhdGFsIGNyYXNoIGluIFJlc2N1ZSB2MiBib290c3RyYXA6JywgZXJyKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG59KTtcbiJdfQ==