import { useState, useRef } from "react";
import { useEmergencyStore } from "../../../app/store";
import { AlertCircle } from "lucide-react";
import clsx from "clsx";
import logger from "../../../utils/logger";

export default function SOSButton() {
    const { status, triggerSOS } = useEmergencyStore();
    const [isHolding, setIsHolding] = useState(false);
    const pressStartTime = useRef(null);
    const timerRef = useRef(null);

    // If we are already in countdown or active, hide the main FAB (overlay takes over)
    // or change its appearance. For now, let's hide it if not IDLE to avoid confusion, 
    // assumming the Overlay will handle the rest.
    if (status !== 'IDLE') return null;

    const handlePointerDown = (e) => {
        e.preventDefault(); // Prevent text selection/scrolling
        setIsHolding(true);
        pressStartTime.current = Date.now();

        // Haptic feedback loop start
        if (navigator.vibrate) {
            navigator.vibrate(100);
            const hapticInterval = setInterval(() => {
                if (navigator.vibrate) navigator.vibrate(40);
            }, 300); // Pulse every 300ms while holding

            // Store interval to clear it
            timerRef.currentHaptic = hapticInterval;
        }

        // Start 3s timer
        timerRef.current = setTimeout(() => {
            logger.emergency("SOS triggered via long-press");
            triggerSOS();
            if (navigator.vibrate) navigator.vibrate([300, 100, 300, 100, 500]);
            if (timerRef.currentHaptic) clearInterval(timerRef.currentHaptic);
            setIsHolding(false);
        }, 3000);
    };

    const handlePointerUp = () => {
        setIsHolding(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (timerRef.currentHaptic) {
            clearInterval(timerRef.currentHaptic);
            timerRef.currentHaptic = null;
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">

            {/* Visual Hint */}
            <span className={clsx(
                "text-white text-sm font-medium transition-opacity duration-300",
                isHolding ? "opacity-100" : "opacity-0"
            )}>
                Hold to Send SOS
            </span>

            {/* Button Material */}
            <div className="relative group">

                {/* Pulsing Rings (Decoration) */}
                {!isHolding && (
                    <>
                        <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping" />
                        <div className="absolute inset-[-4px] rounded-full bg-red-500 opacity-10 animate-pulse" />
                    </>
                )}

                {/* Progress Ring SVG */}
                {isHolding && (
                    <svg className="absolute inset-[-8px] w-[96px] h-[96px] rotate-[-90deg]">
                        <circle
                            cx="48" cy="48" r="46"
                            fill="transparent"
                            stroke="#fee2e2" // red-100
                            strokeWidth="4"
                            className="opacity-30"
                        />
                        <circle
                            cx="48" cy="48" r="46"
                            fill="transparent"
                            stroke="#ef4444" // red-500
                            strokeWidth="4"
                            strokeDasharray="289" // 2 * pi * 46
                            strokeDashoffset="0"
                            className="animate-[dash_3s_linear_forwards]"
                        />
                    </svg>
                )}

                {/* The Button */}
                <button
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className={clsx(
                        "w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 scale-100 active:scale-95 touch-none select-none",
                        "bg-gradient-to-br from-red-500 to-red-600 border-4 border-slate-900",
                        isHolding ? "scale-90" : "hover:scale-105"
                    )}
                    aria-label="Emergency SOS"
                >
                    <AlertCircle className="w-10 h-10 text-white" />
                </button>
            </div>

            {/* Tailwind Animation for the ring stroke */}
            <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 289; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
        </div>
    );
}
