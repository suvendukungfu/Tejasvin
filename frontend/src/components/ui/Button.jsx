import clsx from "clsx";

export default function Button({
    children,
    variant = "primary",
    size = "md",
    className,
    loading = false,
    icon: Icon,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20",
        secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
        outline: "bg-transparent border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500",
        danger: "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20",
        ghost: "bg-transparent hover:bg-slate-800 text-slate-500 hover:text-white"
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base"
    };

    return (
        <button
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    );
}
