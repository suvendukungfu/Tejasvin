import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldAlert, Mail, Lock, UserPlus, Fingerprint, AlertCircle } from "lucide-react";
import api from "../../services/api";
import logger from "../../utils/logger";
import clsx from "clsx";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("victim");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post('/auth/register', { name, email, password, role });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.msg || "Registration failed. Please try again.");
            logger.error("Registration failed", err, { email, role });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-160px)] px-6 py-12 overflow-hidden">

            {/* Background Ambient Glow (Blue for Signup) */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[128px] pointer-events-none opacity-40 mix-blend-screen animate-pulse-subtle" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none opacity-40 mix-blend-screen" />

            <div className="w-full max-w-md glass-card rounded-3xl p-8 animate-fade-in-up z-10">

                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-900/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-lg shadow-blue-500/10">
                        <Fingerprint className="w-8 h-8 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    </div>
                    <h1 className="text-4xl font-display font-black text-white tracking-tight text-center">
                        Join <span className="text-gradient-blue">Network</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-3 text-center max-w-[80%] leading-relaxed">
                        Create your secure identity for the global rescue grid.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-950/30 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm backdrop-blur-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full glass-input px-4 py-3.5 rounded-xl outline-none"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full glass-input px-4 py-3.5 rounded-xl outline-none"
                            placeholder="name@agency.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full glass-input px-4 py-3.5 rounded-xl outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Role Selection</label>
                        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-950/50 rounded-2xl border border-white/5">
                            <button
                                type="button"
                                onClick={() => setRole("victim")}
                                className={clsx(
                                    "py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all",
                                    role === 'victim'
                                        ? "bg-slate-800 text-white shadow-lg ring-1 ring-white/10"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                )}
                            >
                                Standard
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("responder")}
                                className={clsx(
                                    "py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all",
                                    role === 'responder'
                                        ? "bg-blue-600 text-white shadow-lg ring-1 ring-white/20 shadow-blue-500/20"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                )}
                            >
                                Responder
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={clsx(
                            "w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl",
                            "hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20",
                            "flex items-center justify-center gap-2 border border-white/10 uppercase tracking-widest text-sm",
                            loading && "opacity-80"
                        )}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <UserPlus className="w-5 h-5" />
                        )}
                        {loading ? "Registering..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-slate-500">
                    Already a member?
                    <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 ml-1.5 hover:underline decoration-blue-500/30 underline-offset-4 transition-all">
                        Sign In
                    </Link>
                </div>

            </div>
        </div>
    );
}
