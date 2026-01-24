export default function MapControls({
  showHeatmap,
  setShowHeatmap,
  showRadius,
  setShowRadius,
  showCluster,
  setShowCluster,
}) {
  const btn = (active) =>
    `px-3 py-1.5 rounded-lg text-xs font-medium transition
     ${active
       ? "bg-blue-600/20 text-blue-400 border border-blue-500/40"
       : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"}`;

  return (
    <div className="absolute top-4 right-4 z-[1000] 
                    bg-slate-900/80 backdrop-blur-md 
                    border border-slate-700 rounded-xl 
                    p-2 flex gap-2 shadow-lg">

      <button
        className={btn(true)}
        title="Live incidents"
      >
        🔴 Live
      </button>

      <button
        onClick={() => setShowHeatmap(!showHeatmap)}
        className={btn(showHeatmap)}
      >
        🔥 Heatmap
      </button>

      <button
        onClick={() => setShowRadius(!showRadius)}
        className={btn(showRadius)}
      >
        📡 Radius
      </button>

      <button
        onClick={() => setShowCluster(!showCluster)}
        className={btn(showCluster)}
      >
        🧩 Cluster
      </button>
    </div>
  );
}
