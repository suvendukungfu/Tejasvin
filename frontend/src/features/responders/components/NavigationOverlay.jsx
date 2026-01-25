import { useEffect } from "react";
import { Navigation, MapPin, CheckCircle, Clock, HeartPulse } from "lucide-react";
import { useMissionStore, useUserStore } from "../../../app/store";
import VitalsMonitor from "./VitalsMonitor";

const getDistance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export default function NavigationOverlay() {
    const { activeMission, missionStatus, arriveAtMission, completeMission, cancelMission } = useMissionStore();
    const { user, location } = useUserStore();

    useEffect(() => {
        let interval;
        if (missionStatus === 'ON_ROUTE' && activeMission) {
            // ...
        }
        return () => clearInterval(interval);
    }, [missionStatus, activeMission, location, user]);

    if ((missionStatus !== 'ON_ROUTE' && missionStatus !== 'ARRIVED') || !activeMission) return null;

    const distance = (location?.lat && location?.lng && activeMission?.lat && activeMission?.lng)
        ? getDistance(location.lat, location.lng, activeMission.lat, activeMission.lng)
        : 10000; // Fallback to large distance if data missing

    const isCloseEnough = distance <= 50; // 50 metres

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[50] p-4 pb-10 bg-slate-950 border-t border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-slide-up rounded-t-[3rem]">
            <div className="max-w-md mx-auto space-y-6">

                {missionStatus === 'ARRIVED' ? (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <HeartPulse className="w-6 h-6 text-green-500 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white leading-tight">Stabilization Phase</h3>
                                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">On-site at Incident</p>
                            </div>
                        </div>

                        <VitalsMonitor incidentId={activeMission._id || activeMission.id} />

                        <button
                            onClick={() => {
                                if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
                                completeMission();
                            }}
                            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black shadow-xl shadow-green-500/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                        >
                            <CheckCircle className="w-5 h-5" />
                            Finalize & Rescue complete
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Route Info Header */}
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center animate-pulse shadow-lg shadow-blue-500/20">
                                    <Navigation className="w-6 h-6 text-white fill-current" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Heading to Rescue</h3>
                                    <p className="text-slate-500 text-sm font-medium">
                                        {distance > 1000 ? `${(distance / 1000).toFixed(1)} km` : `${Math.round(distance)} m`} away
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-display font-black text-white leading-none mb-1">
                                    {Math.ceil(distance / 50)} min
                                </p>
                                <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Active</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to cancel this mission? This should only be done in extreme circumstances.")) {
                                        cancelMission();
                                    }
                                }}
                                className="py-4 rounded-2xl font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all"
                            >
                                Cancel
                            </button>
                            <div className="relative group">
                                {!isCloseEnough && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition shadow-xl border border-slate-700 pointer-events-none whitespace-nowrap z-20">
                                        Must be within 50m
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
                                        arriveAtMission();
                                    }}
                                    disabled={!isCloseEnough}
                                    className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 tracking-widest text-sm uppercase ${isCloseEnough
                                        ? "bg-green-600 text-white hover:bg-green-500 shadow-xl shadow-green-500/20"
                                        : "bg-slate-900 text-slate-700 border border-slate-800 cursor-not-allowed"
                                        }`}
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Arrived
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

