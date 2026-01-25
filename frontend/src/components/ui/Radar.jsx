import { motion } from "framer-motion";
import clsx from "clsx";

export default function Radar({ className }) {
    return (
        <div className={clsx("relative flex items-center justify-center overflow-hidden rounded-full bg-slate-900", className)}>
            {/* Grid/Rings */}
            <div className="absolute inset-0 border border-slate-700/50 rounded-full" />
            <div className="absolute inset-[15%] border border-slate-700/50 rounded-full" />
            <div className="absolute inset-[30%] border border-slate-700/50 rounded-full" />
            <div className="absolute inset-[45%] border border-slate-700/50 rounded-full" />

            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-slate-700/30" />
            <div className="absolute h-full w-[1px] bg-slate-700/30" />

            {/* Scanning Beam */}
            <motion.div
                className="absolute w-full h-full rounded-full"
                style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(239, 68, 68, 0.4) 360deg)"
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: Infinity
                }}
            />

            {/* Pulsing Blip (Center) */}
            <div className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" />

            {/* Random Blips (Decorations) */}
            <motion.div
                className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-red-400 rounded-full opacity-0"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-red-400 rounded-full opacity-0"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, delay: 1.2, repeat: Infinity }}
            />
        </div>
    );
}
