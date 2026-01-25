import { Bell, Settings, ShieldAlert, ToggleLeft, ToggleRight, LogOut, User as UserIcon, EyeOff } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { useRecruiterStore, useUserStore } from "../../app/store";

function DemoToggle() {
  const { isDemoMode, toggleDemoMode } = useRecruiterStore();

  // Tactical Mode Logic (Local State for now, could be in store)
  const [isTactical, setIsTactical] = React.useState(false);

  React.useEffect(() => {
    if (isTactical) {
      document.body.classList.add('tactical-mode');
    } else {
      document.body.classList.remove('tactical-mode');
    }
  }, [isTactical]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsTactical(!isTactical)}
        className={`
          p-1.5 rounded-full border transition-all
          ${isTactical
            ? "bg-red-950/30 border-red-500/50 text-red-500"
            : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"}
        `}
        title="Toggle Tactical Night Vision"
        aria-label="Toggle Tactical Mode"
      >
        <EyeOff className="w-4 h-4" />
      </button>

      <button
        onClick={toggleDemoMode}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all
          ${isDemoMode
            ? "bg-purple-500/10 border-purple-500/50 text-purple-400"
            : "bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300"}
        `}
        aria-label="Toggle Demo Mode"
      >
        {isDemoMode ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
        <span className="text-xs font-semibold uppercase tracking-wider">
          {isDemoMode ? "Recruiter" : "Standard"}
        </span>
      </button>
    </div>
  );
}

export default function Navbar() {
  const { user, isAuthenticated, logout } = useUserStore();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

        {/* Floating Glass Bar */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl rounded-full px-6 py-3 flex items-center justify-between w-full gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity" aria-label="Home">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/20">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <div className="absolute inset-0 rounded-lg bg-red-500/20 animate-pulse" />
            </div>
            <h1 className="text-xl font-display font-bold text-white tracking-tight hidden sm:block">
              Accident<span className="text-red-500">Alert</span>
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition ${isActive("/") ? "text-white" : "text-slate-400 hover:text-white"}`}
            >
              Dashboard
            </Link>
            <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition">Live Map</Link>
            <DemoToggle />
          </nav>

          {/* Right Icons & User */}
          <div className="flex items-center gap-3 ml-auto">

            {/* User Info */}
            <Link to="/profile" className="hidden md:flex flex-col items-end mr-1 hover:opacity-80 transition-opacity">
              <span className="text-xs font-bold text-white leading-none">{user?.name || "User"}</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-black leading-tight mt-0.5">{user?.role}</span>
            </Link>

            <button
              className="bg-white/10 hover:bg-white/20 active:bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-200 p-2 rounded-full relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-300" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900" />
            </button>

            <div className="group relative">
              <Link
                to="/profile"
                className="block bg-white/10 hover:bg-white/20 active:bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-200 w-8 h-8 rounded-full overflow-hidden border-2 border-slate-700"
                aria-label="Profile"
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>

            <button
              onClick={logout}
              className="bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 p-2 rounded-full border border-white/10 transition-all"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
