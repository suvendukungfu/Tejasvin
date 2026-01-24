import { WifiOff, AlertTriangle } from "lucide-react";
import { useOfflineStatus } from "../../hooks/useOfflineStatus";

export default function OfflineBanner() {
    const isOffline = useOfflineStatus();

    if (!isOffline) return null;

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-lg">
            <div className="bg-amber-600/90 backdrop-blur-md border border-amber-500/50 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="p-2 bg-white/20 rounded-full">
                    <WifiOff className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-sm">You are currently offline</h3>
                    <p className="text-xs text-amber-100 font-medium">
                        Emergency alerts may be delayed. App is running in offline mode.
                    </p>
                </div>
                <AlertTriangle className="w-4 h-4 text-amber-200 animate-pulse" />
            </div>
        </div>
    );
}
