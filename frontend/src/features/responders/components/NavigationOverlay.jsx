import { useMissionStore } from "../../../app/store";
import { Navigation, MapPin, CheckCircle, Clock } from "lucide-react";

export default function NavigationOverlay() {
    const { missionStatus, completeMission, cancelMission } = useMissionStore();

    if (missionStatus !== 'ON_ROUTE') return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[50] p-4 pb-8 bg-slate-900 border-t border-slate-800 shadow-2xl animate-slide-up">
            <div className="max-w-md mx-auto">

                {/* Route Info Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                            <Navigation className="w-5 h-5 text-white fill-current" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Turn Right</h3>
                            <p className="text-slate-400 text-sm">Main Street • 50m</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-display font-bold text-white">2 min</p>
                        <p className="text-green-500 text-xs font-bold">Fastest Route</p>
                    </div>
                </div>

                {/* Action Slider (Simulated Button) */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={cancelMission}
                        className="py-3 rounded-xl font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={completeMission}
                        className="py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-500 transition shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Arrived
                    </button>
                </div>

            </div>
        </div>
    );
}
