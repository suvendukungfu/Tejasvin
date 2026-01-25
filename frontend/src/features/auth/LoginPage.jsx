import { ShieldAlert, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../../app/store";
import api from "../../services/api";
import logger from "../../utils/logger";
import clsx from "clsx";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const login = useUserStore(state => state.login);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.user, res.data.token);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
            logger.error("Login error", err, { email });
        } finally {
            setLoading(true); // Keep it loading for a brief second for visual feel
            setTimeout(() => setLoading(false), 500);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-160px)] px-6 overflow-hidden">

            {/* Background Ambient Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[128px] pointer-events-none opacity-40 mix-blend-screen animate-pulse-subtle" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px] pointer-events-none opacity-40 mix-blend-screen" />

            <div className="w-full max-w-md glass-card rounded-3xl p-8 animate-fade-in-up z-10">

                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-900/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-lg shadow-red-500/10">
                        <ShieldAlert className="w-8 h-8 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                    </div>
                    <h1 className="text-4xl font-display font-black text-white tracking-tight text-center">
                        Welcome <span className="text-gradient-red">Back</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-3 text-center max-w-[80%] leading-relaxed">
                        Enter your credentials to access the secure rescue network.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-950/30 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-shake backdrop-blur-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-red-500 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full glass-input pl-12 pr-4 py-3.5 rounded-xl outline-none"
                                placeholder="name@agency.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-red-500 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full glass-input pl-12 pr-4 py-3.5 rounded-xl outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={clsx(
                            "w-full mt-2 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl",
                            "hover:from-red-500 hover:to-red-600 active:scale-[0.98] transition-all shadow-lg shadow-red-900/20",
                            "flex items-center justify-center gap-2 border border-white/10 uppercase tracking-widest text-sm",
                            loading && "opacity-80"
                        )}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <LogIn className="w-5 h-5" />
                        )}
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-slate-500">
                    New to the network?
                    <Link to="/signup" className="text-red-400 font-semibold hover:text-red-300 ml-1.5 hover:underline decoration-red-500/30 underline-offset-4 transition-all">
                        Create Access ID
                    </Link>
                </div>

            </div>
        </div>
    );
}
