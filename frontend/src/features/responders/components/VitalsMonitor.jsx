import { useState } from "react";
import { Heart, Activity, ClipboardList, Send, Loader2, CheckCircle2 } from "lucide-react";
import api from "../../../services/api";

export default function VitalsMonitor({ incidentId, onUpdate }) {
    const [heartRate, setHeartRate] = useState(80);
    const [status, setStatus] = useState("Unstable");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.put(`/incidents/${incidentId}/vitals`, {
                heartRate,
                status,
                notes
            });
            socketService.emit('incident:vitals_update', {
                incidentId,
                vitals: { heartRate, status, notes }
            });

            if (onUpdate) onUpdate(res.data);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            console.error("Vitals update failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-white tracking-tight">Patient Vitals</h3>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${status === 'Stable' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                    {status}
                </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-1.5">
                            <Heart className="w-3 h-3 text-red-500" /> Heart Rate (BPM)
                        </label>
                        <input
                            type="number"
                            value={heartRate}
                            onChange={(e) => setHeartRate(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono outline-none focus:border-blue-500/50 transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Condition Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-blue-500/50 transition-all appearance-none"
                        >
                            <option value="Unstable">Unstable</option>
                            <option value="Stabilizing">Stabilizing</option>
                            <option value="Stable">Stable</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-1.5">
                        <ClipboardList className="w-3 h-3" /> Medical Notes
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Injuries, medications given, etc..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-blue-500/50 h-20 resize-none transition-all"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${success
                        ? 'bg-green-600 text-white shadow-green-500/20'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                        }`}
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (success ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />)}
                    {success ? 'Vitals Synced' : 'Update Vitals'}
                </button>
            </form>
        </div>
    );
}
