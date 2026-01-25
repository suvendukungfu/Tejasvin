
import { useEffect } from "react";

export default function RadarOverlay() {
    return (
        <div className="pointer-events-none absolute inset-0 z-[500] overflow-hidden rounded-xl">
            {/* Radar Sweep Line */}
            <div
                className="absolute inset-[0] w-full h-full animate-[spin_4s_linear_infinite]"
                style={{
                    background: "conic-gradient(from 0deg at 50% 50%, transparent 60%, rgba(59, 130, 246, 0.1) 80%, rgba(59, 130, 246, 0.4) 100%)"
                }}
            />

            {/* Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-blue-500/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-blue-500/10 rounded-full" />

            {/* Grid Lines (Crosshair) */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-blue-500/10" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-blue-500/10" />

            {/* Decorative Text */}
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-blue-500/60 uppercase">
                Scanning Area...
            </div>
        </div>
    );
}
