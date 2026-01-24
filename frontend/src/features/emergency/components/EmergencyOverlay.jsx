import { useEffect } from "react";
import { useEmergencyStore, useUserStore } from "../../../app/store";
import { X, Phone, ShieldCheck } from "lucide-react";
import clsx from "clsx";

export default function EmergencyOverlay() {
    const { status, countdownValue, setCountdown, activeIncidentId, cancelSOS, confirmSOS } = useEmergencyStore();
    const { location } = useUserStore();

    /* ---------------- COUNTDOWN LOGIC ---------------- */
    useEffect(() => {
        let timer;
        if (status === 'COUNTDOWN') {
            if (countdownValue > 0) {
                timer = setTimeout(() => setCountdown(countdownValue - 1), 1000);
            } else {
                confirmSOS(location);
            }
        }
        return () => clearTimeout(timer);
    }, [status, countdownValue, setCountdown, confirmSOS, location]);

    // If IDLE, render nothing
    if (status === 'IDLE' || status === 'RESOLVED') return null;

    /* ---------------- CONNECTING STATE ---------------- */
    if (status === 'CONNECTING') {
        return (
            <div className="fixed inset-0 z-[100] bg-slate-950/95 flex flex-col items-center justify-center text-white">
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-t-4 border-red-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-4 border-t-4 border-red-500/50 rounded-full animate-spin reverse"></div>
                </div>
                <h2 className="text-2xl font-bold animate-pulse">Contacting Authorities...</h2>
                <p className="text-slate-400 mt-2">Establishing secure connection</p>
            </div>
        );
    }

    /* ---------------- ACTIVE STATE ---------------- */
    if (status === 'ACTIVE') {
        return (
            <div className="fixed inset-0 z-[100] bg-red-600 flex flex-col items-center justify-center text-white animate-in fade-in duration-300">

                {/* Pulsing Background */}
                <div className="absolute inset-0 bg-red-700 animate-pulse" />

                <div className="relative z-10 flex flex-col items-center space-y-8 p-6 text-center">
                    <ShieldCheck className="w-24 h-24 text-white" />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-black uppercase tracking-widest">
                            Help Requested
                        </h1>
                        <p className="text-red-100 text-lg">
                            Responders and authorities have been notified.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 w-full max-w-sm">
                        <p className="text-sm font-semibold uppercase opacity-70 mb-1">Incident ID</p>
                        <p className="font-mono text-xl">{activeIncidentId}</p>
                    </div>

                    <p className="text-sm animate-pulse">
                        📍 Broadcasting live location...
                    </p>

                    <button
                        onClick={cancelSOS}
                        className="mt-8 px-8 py-3 bg-white text-red-600 font-bold rounded-full shadow-lg hover:bg-red-50 transition"
                    >
                        I AM SAFE NOW
                    </button>
                </div>
            </div>
        );
    }

    /* ---------------- COUNTDOWN STATE ---------------- */
    return (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center text-white animate-in zoom-in duration-200">

            <h2 className="text-2xl font-bold mb-8 text-red-500 uppercase tracking-widest">
                Emergency Alert
            </h2>

            {/* Countdown Circle */}
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                        cx="96" cy="96" r="92"
                        fill="transparent"
                        stroke="#ef4444"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 92}
                        strokeDashoffset={2 * Math.PI * 92 * (1 - countdownValue / 5)}
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>
                {/* Number */}
                <span className="text-8xl font-black text-red-500 font-display">
                    {countdownValue}
                </span>
            </div>

            <p className="mt-8 text-slate-400">
                Sending alert in seconds...
            </p>

            {/* Actions */}
            <div className="flex gap-4 mt-12 w-full max-w-xs px-4">
                <button
                    onClick={cancelSOS}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-semibold transition"
                >
                    <X className="w-5 h-5" />
                    Cancel
                </button>
                <button
                    onClick={() => confirmSOS(location)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 font-semibold transition"
                >
                    <Phone className="w-5 h-5" />
                    Send Now
                </button>
            </div>

        </div>
    );
}
