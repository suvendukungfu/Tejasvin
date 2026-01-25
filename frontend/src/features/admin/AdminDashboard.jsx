import { useState, useEffect } from "react";
import { ShieldCheck, UserCheck, UserX, Activity, Map as MapIcon, RefreshCw, Loader2, Flame } from "lucide-react";
import api from "../../services/api";
import logger from "../../utils/logger";
import Badge from "../../components/ui/Badge";
import { MapContainer, TileLayer } from "react-leaflet";
import HeatmapLayer from "../map/components/HeatmapLayer";
import clsx from "clsx";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("responders"); // 'responders' | 'hotspots'
    const [responders, setResponders] = useState([]);
    const [hotspots, setHotspots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalUsers: 0, pendingVerification: 0 });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [userRes, statsRes, hotspotRes] = await Promise.all([
                api.get("/admin/users?role=responder"),
                api.get("/incidents/stats"),
                api.get("/analytics/hotspots").catch(() => ({ data: [] })) // Resilient fallthrough
            ]);
            setResponders(userRes.data || []);
            setStats({ ...statsRes.data, pendingVerification: (userRes.data || []).filter(r => !r.isVerified).length });
            setHotspots(hotspotRes.data || []);
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
        <div className="space-y-8 max-w-7xl mx-auto px-6 py-10 animate-fade-in-up">

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-500/10 rounded-2xl ring-1 ring-blue-500/20">
                        <ShieldCheck className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-display font-black text-white tracking-tight">Admin <span className="text-slate-500">Center</span></h1>
                        <p className="text-slate-400 font-medium">System Oversight & Analytics</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-xl flex gap-1">
                        <button
                            onClick={() => setActiveTab('responders')}
                            className={clsx("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'responders' ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300")}
                        >
                            Responders
                        </button>
                        <button
                            onClick={() => setActiveTab('hotspots')}
                            className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'hotspots' ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300")}
                        >
                            <Flame className="w-4 h-4" />
                            Hotspots
                        </button>
                    </div>

                    <button
                        onClick={fetchData}
                        className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-slate-300 border border-slate-700"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AdminStatCard icon={<Activity className="text-red-500" />} label="System Vitality" value="Healthy" sub="All nodes operational" />
                <AdminStatCard icon={<UserCheck className="text-blue-500" />} label="Verified Responders" value={responders.filter(r => r.isVerified).length} sub="Ready for dispatch" />
                <AdminStatCard icon={<Flame className="text-orange-500" />} label="Accident Hotspots" value={hotspots.length} sub="High density zones" />
            </div>

            {activeTab === 'responders' ? (
                /* RESPONDER TABLE */
                <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
                    <div className="px-8 py-6 border-b border-white/5 bg-slate-900/30 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Responder Verification Queue</h2>
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            Live Queue
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-white/5 bg-slate-900/40">
                                <tr>
                                    <th className="px-8 py-5">Responder</th>
                                    <th className="px-8 py-5">Credentials</th>
                                    <th className="px-8 py-5">Saves</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center">
                                            <Loader2 className="w-8 h-8 animate-spin text-slate-700 mx-auto" />
                                        </td>
                                    </tr>
                                ) : responders.map((r) => (
                                    <tr key={r._id} className="hover:bg-white/5 transition-colors group">
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
            ) : (
                /* HEATMAP VIEW */
                <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl h-[600px] relative border border-white/10">
                    <div className="absolute top-4 left-4 z-[500] bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl max-w-xs">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Predictive Hotspots</h3>
                                <p className="text-xs text-slate-400">Historical accident density</p>
                            </div>
                        </div>
                        <div className="text-xs text-slate-500 leading-relaxed">
                            This heatmap visualizes high-frequency accident zones based on historical telemetry. Use this for resource allocation planning.
                        </div>
                    </div>

                    <MapContainer
                        center={[12.9716, 77.5946]} // Default Bangalore
                        zoom={12}
                        className="w-full h-full"
                        zoomControl={false}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />
                        <HeatmapLayer points={hotspots} />
                    </MapContainer>
                </div>
            )}

        </div>
    );
}

function AdminStatCard({ icon, label, value, sub }) {
    return (
        <div className="glass-panel rounded-3xl p-8 shadow-xl space-y-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                {icon}
            </div>
            <div>
                <div className="text-4xl font-black text-white">{value}</div>
                <div className="text-sm font-bold text-slate-400 tracking-tight uppercase">{label}</div>
                <div className="text-xs text-slate-600 mt-1">{sub}</div>
            </div>
        </div>
    );
}
