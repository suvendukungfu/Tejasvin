import clsx from "clsx";

export default function Badge({ children, variant = "default", className }) {
    const variants = {
        default: "bg-slate-800 text-slate-400 border-slate-700",
        blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        red: "bg-red-500/10 text-red-500 border-red-500/20",
        green: "bg-green-500/10 text-green-500 border-green-500/20",
        amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };

    return (
        <span className={clsx(
            "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
            variants[variant] || variants.default,
            className
        )}>
            {children}
        </span>
    );
}
