import { useEmergencyStore, useUserStore } from "../../../app/store";
import { X, Phone, ShieldCheck, Flame, Heart, AlertTriangle, HeartPulse } from "lucide-react";
import { useState } from "react";
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
        const [showNumbers, setShowNumbers] = useState(false);
        const { aiAdvice } = useEmergencyStore();

        const emergencyNumbers = [
            { name: "Police", number: "100", icon: <ShieldCheck className="w-5 h-5" /> },
            { name: "Ambulance", number: "102", icon: <Heart className="w-5 h-5" /> },
            { name: "Fire", number: "101", icon: <Flame className="w-5 h-5" /> }
        ];

        return (
            <div className="fixed inset-0 z-[100] bg-red-600 flex flex-col items-center justify-center text-white animate-in fade-in duration-300">

                {/* Pulsing Background */}
                <div className="absolute inset-0 bg-red-700 animate-pulse" />

                <div className="relative z-10 flex flex-col items-center space-y-8 p-6 text-center w-full max-w-md">
                    <ShieldCheck className="w-24 h-24 text-white" />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-black uppercase tracking-widest">
                            Help Requested
                        </h1>
                        <p className="text-red-100 text-lg font-medium opacity-90">
                            Responders and authorities notified.
                        </p>
                    </div>

                    {/* AI FIRST AID ADVICE */}
                    {aiAdvice && (
                        <div className="bg-white text-red-700 rounded-3xl p-6 shadow-2xl border-4 border-white/20 animate-in zoom-in duration-500 delay-200">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-5 h-5" />
                                <span className="text-xs font-black uppercase tracking-widest">Immediate First-Aid</span>
                            </div>
                            <p className="text-sm font-bold leading-relaxed">
                                {aiAdvice}
                            </p>
                        </div>
                    )}

                    {/* REAL-TIME VITALS SYNC */}
                    {useEmergencyStore.getState().latestVitals && (
                        <div className="w-full bg-red-700/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <HeartPulse className="w-4 h-4 text-white animate-pulse" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Patient Status</p>
                                    <p className="font-bold text-sm">{useEmergencyStore.getState().latestVitals.status}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black">{useEmergencyStore.getState().latestVitals.heartRate}</p>
                                <p className="text-[10px] font-black opacity-50 uppercase">BPM</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 w-full">
                        <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">Live Tracker ID</p>
                        <p className="font-mono text-xl font-bold">{activeIncidentId}</p>
                    </div>

                    {/* Hotline Menu */}
                    <div className="w-full space-y-3">
                        <button
                            onClick={() => setShowNumbers(!showNumbers)}
                            className="w-full py-4 bg-black/20 hover:bg-black/30 border border-white/10 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all"
                        >
                            <Phone className="w-5 h-5" />
                            {showNumbers ? "Hide Quick Dial" : "Call Authorities Directly"}
                        </button>

                        {showNumbers && (
                            <div className="grid grid-cols-1 gap-2 animate-in slide-in-from-top-4 duration-300">
                                {emergencyNumbers.map((num) => (
                                    <a
                                        key={num.number}
                                        href={`tel:${num.number}`}
                                        className="flex items-center justify-between p-4 bg-white/20 hover:bg-white/30 rounded-xl transition-colors border border-white/10"
                                    >
                                        <div className="flex items-center gap-3">
                                            {num.icon}
                                            <span className="font-bold">{num.name}</span>
                                        </div>
                                        <span className="bg-white text-red-600 px-3 py-1 rounded-lg text-sm font-black">{num.number}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={cancelSOS}
                        className="mt-4 px-12 py-4 bg-white text-red-600 font-black rounded-2xl shadow-xl hover:bg-red-50 transition active:scale-95 uppercase tracking-widest"
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
