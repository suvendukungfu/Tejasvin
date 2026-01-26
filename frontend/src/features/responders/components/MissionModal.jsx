import { useMissionStore } from "../../../app/store";
import { Navigation, X, ShieldAlert, BadgeCheck } from "lucide-react";
import logger from "../../../utils/logger";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function MissionModal() {
    const { activeMission, missionStatus, acceptMission, cancelMission, startNavigation } = useMissionStore();

    const isVisible = activeMission && (missionStatus === 'OFFERED' || missionStatus === 'ACCEPTED');

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none p-4 pb-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
                        onClick={cancelMission}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                    >

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
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={cancelMission}
                                    className="py-3 px-4 rounded-xl font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                                >
                                    Decline
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={async () => {
                                        try {
                                            if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
                                            await acceptMission(activeMission._id || activeMission.id);
                                            startNavigation();
                                            logger.info("Mission accepted", { missionId: activeMission._id || activeMission.id });
                                        } catch (error) {
                                            logger.error("Failed to accept mission", error);
                                        }
                                    }}
                                    className="py-3 px-4 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                                >
                                    <Navigation className="w-4 h-4 fill-current" />
                                    Accept Mission
                                </motion.button>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
