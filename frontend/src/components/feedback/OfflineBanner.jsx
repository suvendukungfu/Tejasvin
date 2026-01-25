import { WifiOff, AlertTriangle, RefreshCw, CheckCircle2 } from "lucide-react";
import { useOfflineStatus } from "../../hooks/useOfflineStatus";
import { useState, useEffect } from "react";

export default function OfflineBanner() {
    const isOffline = useOfflineStatus();
    const [isReconnecting, setIsReconnecting] = useState(false);
    const [showBackOnline, setShowBackOnline] = useState(false);

    useEffect(() => {
        if (!isOffline && !showBackOnline) {
            // Just came back online
            setShowBackOnline(true);
            const timer = setTimeout(() => setShowBackOnline(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOffline]);

    const handleRetry = () => {
        setIsReconnecting(true);
        window.location.reload();
    };

    if (showBackOnline) {
        return (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm">
                <div className="bg-green-600/90 backdrop-blur-md border border-green-500/50 text-white p-3 rounded-xl shadow-xl flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-bold">Back Online</span>
                </div>
            </div>
        );
    }

    if (!isOffline) return null;

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-lg">
            <div className="bg-amber-600/90 backdrop-blur-md border border-amber-500/50 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="p-2 bg-white/20 rounded-full">
                    <WifiOff className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-sm">Connection Lost</h3>
                    <p className="text-xs text-amber-100 font-medium">
                        Using cached data. Emergency features may be limited.
                    </p>
                </div>
                <button
                    onClick={handleRetry}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    disabled={isReconnecting}
                >
                    <RefreshCw className={`w-4 h-4 ${isReconnecting ? 'animate-spin' : ''}`} />
                </button>
            </div>
        </div>
    );
}
