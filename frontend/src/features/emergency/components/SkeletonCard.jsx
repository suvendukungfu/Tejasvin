export default function SkeletonCard() {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 overflow-hidden relative">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />

            <div className="w-12 h-12 rounded-2xl bg-slate-800 animate-pulse border border-slate-700" />

            <div className="space-y-3">
                <div className="h-8 w-16 bg-slate-800 rounded-lg animate-pulse" />
                <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
                <div className="h-3 w-24 bg-slate-800/50 rounded animate-pulse" />
            </div>
        </div>
    );
}
