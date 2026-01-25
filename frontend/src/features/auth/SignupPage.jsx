import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldAlert, Mail, Lock, UserPlus, Fingerprint, AlertCircle } from "lucide-react";
import api from "../../services/api";
import logger from "../../utils/logger";

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
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-6 py-12">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-fade-in-up">

                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4">
                        <Fingerprint className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">Join Network</h1>
                    <p className="text-slate-400 text-sm mt-1 text-center">Become part of the community rescue team</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Role</label>
                        <div className="grid grid-cols-2 gap-3 p-1 bg-slate-800 rounded-xl border border-slate-700">
                            <button
                                type="button"
                                onClick={() => setRole("victim")}
                                className={`py-2 rounded-lg text-sm font-bold transition-all ${role === 'victim' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}
                            >
                                Standard
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("responder")}
                                className={`py-2 rounded-lg text-sm font-bold transition-all ${role === 'responder' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}
                            >
                                Responder
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <UserPlus className="w-5 h-5" />
                        )}
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                    Already a member?
                    <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 ml-1.5 underline decoration-blue-500/30 underline-offset-4">
                        Sign In
                    </Link>
                </div>

            </div>
        </div>
    );
}
