import { useState, useEffect } from "react";
import { ShieldCheck, UserCheck, UserX, Activity, Map, RefreshCw, Loader2 } from "lucide-react";
import api from "../../services/api";
import logger from "../../utils/logger";
import Badge from "../../components/ui/Badge";

export default function AdminDashboard() {
    const [responders, setResponders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalUsers: 0, pendingVerification: 0 });

    const fetchData = async () => {
        setLoading(true);
        try {
            // In a real app, this would be a secure admin-only endpoint
            const [userRes, statsRes] = await Promise.all([
                api.get("/admin/users?role=responder"),
                api.get("/incidents/stats")
            ]);
            setResponders(userRes.data || []);
            setStats({ ...statsRes.data, pendingVerification: (userRes.data || []).filter(r => !r.isVerified).length });
        } catch (err) {
            logger.error("Failed to fetch admin data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleVerification = async (userId, currentStatus) => {
        try {
            await api.put(`/admin/verify/${userId}`, { isVerified: !currentStatus });
            setResponders(responders.map(r => r._id === userId ? { ...r, isVerified: !currentStatus } : r));
        } catch (err) {
            logger.error("Verification toggle failed", err, { userId });
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-6 py-10">

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-2xl">
                        <ShieldCheck className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Admin Control Center</h1>
                        <p className="text-slate-500 text-sm">Manage responders and system health</p>
                    </div>
                </div>
                <button
                    onClick={fetchData}
                    className="p-3 hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
                >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AdminStatCard icon={<Activity className="text-red-500" />} label="System Vitality" value="Healthy" sub="All nodes operational" />
                <AdminStatCard icon={<UserCheck className="text-blue-500" />} label="Verified Responders" value={responders.filter(r => r.isVerified).length} sub="Ready for dispatch" />
                <AdminStatCard icon={<UserX className="text-amber-500" />} label="Pending Review" value={stats.pendingVerification} sub="Requires action" />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="px-8 py-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Responder Verification Queue</h2>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Live Queue
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-800 bg-slate-800/20">
                            <tr>
                                <th className="px-8 py-4">Responder</th>
                                <th className="px-8 py-4">Credentials</th>
                                <th className="px-8 py-4">Saves</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-slate-700 mx-auto" />
                                    </td>
                                </tr>
                            ) : responders.map((r) => (
                                <tr key={r._id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${r.name}`} className="w-10 h-10 rounded-xl bg-slate-800" />
                                            <div>
                                                <div className="text-sm font-bold text-white">{r.name}</div>
                                                <div className="text-xs text-slate-500">{r.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="text-xs text-slate-400 font-medium">EMT Registered</div>
                                    </td>
                                    <td className="px-8 py-5 font-mono text-sm text-blue-400">{r.stats?.saves || 0}</td>
                                    <td className="px-8 py-5">
                                        {r.isVerified ? (
                                            <Badge variant="blue">Verified</Badge>
                                        ) : (
                                            <Badge variant="amber">Under Review</Badge>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button
                                            onClick={() => toggleVerification(r._id, r.isVerified)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${r.isVerified
                                                ? 'bg-slate-800 text-red-500 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/20'
                                                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20'
                                                }`}
                                        >
                                            {r.isVerified ? 'Revoke Access' : 'Verify Identity'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

function AdminStatCard({ icon, label, value, sub }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
                {icon}
            </div>
            <div>
                <div className="text-4xl font-black text-white">{value}</div>
                <div className="text-sm font-bold text-slate-400 tracking-tight">{label}</div>
                <div className="text-xs text-slate-600 mt-1">{sub}</div>
            </div>
        </div>
    );
}
