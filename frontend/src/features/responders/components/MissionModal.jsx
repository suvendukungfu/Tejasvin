import { useMissionStore } from "../../../app/store";
import { Navigation, X, ShieldAlert, BadgeCheck } from "lucide-react";
import clsx from "clsx";

export default function MissionModal() {
    const { activeMission, missionStatus, acceptMission, cancelMission, startNavigation } = useMissionStore();

    // Only show if we have an active mission offer
    if (!activeMission || missionStatus === 'IDLE' || missionStatus === 'COMPLETED') return null;

    // Different states handled by NavigationOverlay, this is mainly for the OFFER state
    if (missionStatus !== 'OFFERED' && missionStatus !== 'ACCEPTED') return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none p-4 pb-6">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={cancelMission} />

            <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-fade-in-up">

                {/* Header Map Visualization (Placeholder) */}
                <div className="h-32 bg-slate-800 relative flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-slate-900" />
                    <ShieldAlert className="w-12 h-12 text-blue-500 animate-pulse" />
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-display font-bold text-white">
                                New Emergency Alert
                            </h2>
                            <p className="text-slate-400 text-sm">
                                Nearby Incident • 2 mins away
                            </p>
                        </div>
                        <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase rounded-full">
                            Critical
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-400 text-sm">Location</span>
                            <span className="text-white font-medium text-sm text-right">{activeMission.location || "Unknown Location"}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-400 text-sm">Reward</span>
                            <div className="flex items-center gap-1 text-yellow-400 font-bold">
                                <BadgeCheck className="w-4 h-4" />
                                <span>500 Credits</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={cancelMission}
                            className="py-3 px-4 rounded-xl font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                        >
                            Decline
                        </button>
                        <button
                            onClick={() => {
                                acceptMission();
                                startNavigation();
                            }}
                            className="py-3 px-4 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                        >
                            <Navigation className="w-4 h-4 fill-current" />
                            Accept Mission
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
