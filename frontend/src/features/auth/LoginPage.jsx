import { ShieldAlert, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../../app/store";
import api from "../../services/api";
import logger from "../../utils/logger";

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
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-6">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-fade-in-up">

                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 bg-red-600/20 rounded-2xl flex items-center justify-center mb-4">
                        <ShieldAlert className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">Welcome Back</h1>
                    <p className="text-slate-400 text-sm mt-1 text-center">Enter your credentials to access the rescue network</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm animate-shake">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-red-500 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white pl-11 pr-4 py-3 rounded-xl outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-slate-600"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-red-500 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white pl-11 pr-4 py-3 rounded-xl outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-slate-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 active:scale-[0.98] transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <LogIn className="w-5 h-5" />
                        )}
                        {loading ? "Signing in..." : "Sign In to Tejasvin"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                    Don't have an account?
                    <Link to="/signup" className="text-red-400 font-semibold hover:text-red-300 ml-1.5 underline decoration-red-500/30 underline-offset-4">
                        Create Account
                    </Link>
                </div>

            </div>
        </div>
    );
}
