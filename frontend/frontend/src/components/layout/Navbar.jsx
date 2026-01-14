export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      
      {/* Left: Logo / App Name */}
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <h1 className="text-lg font-semibold text-white tracking-wide">
          AccidentAlert
        </h1>
      </div>

      {/* Center: System Status */}
      <div className="hidden md:flex items-center gap-2 px-4 py-1 rounded-full bg-slate-800 border border-slate-700">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-sm text-slate-300">System Online</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-white transition">
          🔔
        </button>
        <button className="text-slate-400 hover:text-white transition">
          ⚙️
        </button>
      </div>

    </nav>
  );
}
