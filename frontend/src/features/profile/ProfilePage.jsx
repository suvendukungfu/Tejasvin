import { useState } from "react";
import { useUserStore } from "../../app/store";
import {
    User,
    ShieldCheck,
    MapPin,
    Award,
    Heart,
    Star,
    Zap,
    Edit3,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import api from "../../services/api";
import logger from "../../utils/logger";
import ContactManager from "./ContactManager";
import clsx from "clsx";

export default function ProfilePage() {
    const { user, setUser } = useUserStore();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.put("/auth/profile", { name, bio });
            setUser(res.data);
            setIsEditing(false);
        } catch (err) {
            logger.error("Failed to update profile", err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-8 animate-fade-in-up">

            {/* Profile Header */}
            <div className="relative glass-card rounded-3xl overflow-hidden shadow-2xl">
                <div className="h-40 bg-gradient-to-r from-red-600/30 to-blue-600/30" />

                <div className="px-10 pb-10">
                    <div className="flex flex-col md:flex-row md:items-end -mt-14 gap-8">
                        <div className="relative">
                            <div className="w-36 h-36 rounded-3xl bg-slate-900 border-[6px] border-slate-900 overflow-hidden shadow-2xl">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {user.isVerified && (
                                <div className="absolute -bottom-3 -right-3 bg-blue-500 text-white p-2 rounded-xl shadow-lg border-4 border-slate-900">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-2 mb-2">
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl font-display font-black text-white tracking-tight">{user.name}</h1>
                                <span className={clsx(
                                    "px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border",
                                    user.role === 'responder'
                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        : "bg-slate-800 text-slate-400 border-slate-700"
                                )}>
                                    {user.role}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-slate-500" />
                                    <span>{user.location?.lat ? `${user.location.lat.toFixed(4)}, ${user.location.lng.toFixed(4)}` : "Location Unknown"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-slate-500" />
                                    <span>{user.badges?.length || 0} Badges Earned</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all flex items-center gap-2 text-sm font-bold shadow-lg"
                        >
                            <Edit3 className="w-4 h-4" />
                            {isEditing ? "Cancel Edit" : "Edit Profile"}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleUpdate} className="mt-10 space-y-6 max-w-xl border-t border-white/5 pt-8 animate-fade-in-up">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Display Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full glass-input px-5 py-3 rounded-xl outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Share your responder experience..."
                                    className="w-full glass-input px-5 py-3 rounded-xl outline-none h-32 resize-none"
                                />
                            </div>
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-8 py-3 bg-slate-800 text-slate-400 rounded-xl font-bold border border-slate-700 hover:bg-slate-700 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="mt-8 text-slate-400 leading-relaxed max-w-3xl text-lg font-light border-t border-white/5 pt-8">
                            {user.bio || "No bio added yet. Tell the community about yourself!"}
                        </p>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    icon={<Heart className="w-7 h-7 text-red-500" />}
                    label="Saves Recorded"
                    value={user.stats?.saves || 0}
                    sub="Lives assisted"
                    color="red"
                />
                <StatCard
                    icon={<Zap className="w-7 h-7 text-amber-500" />}
                    label="Missions Joined"
                    value={user.stats?.missionsJoined || 0}
                    sub="Activity points"
                    color="amber"
                />
                <StatCard
                    icon={<Star className="w-7 h-7 text-blue-500" />}
                    label="Rescue Rating"
                    value={user.stats?.rating?.toFixed(1) || "5.0"}
                    sub="Community trust"
                    color="blue"
                />
            </div>

            {/* Badges & Verification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel rounded-3xl p-10 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white font-display">Trust & Verification</h2>
                        {user.isVerified ? (
                            <div className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <ShieldCheck className="w-4 h-4" />
                                Verified
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-amber-500/20">
                                <AlertCircle className="w-4 h-4" />
                                Pending
                            </div>
                        )}
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                        Verified responders undergo background checks to ensure community safety. Verification unlocks priority mission alerts and the "Verified" badge.
                    </p>
                    {!user.isVerified && (
                        <button className="w-full py-4 bg-slate-800 text-white rounded-xl text-sm font-bold border border-slate-700 hover:bg-slate-700 transition-all uppercase tracking-widest shadow-lg">
                            Apply for Verification
                        </button>
                    )}
                </div>

                <div className="glass-panel rounded-3xl p-10 space-y-8">
                    <h2 className="text-2xl font-bold text-white font-display">Achievement Badges</h2>
                    <div className="flex flex-wrap gap-3">
                        {user.badges && user.badges.length > 0 ? (
                            user.badges.map((badge, i) => (
                                <div key={i} className="flex items-center gap-2.5 bg-slate-800/80 border border-slate-700 px-5 py-3 rounded-2xl shadow-sm hover:border-slate-500 transition-all cursor-default">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-sm font-bold text-slate-200">{badge}</span>
                                </div>
                            ))
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-800 rounded-2xl text-slate-600 font-medium">
                                No badges earned yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Emergency Contacts Section */}
            <ContactManager />
        </div>
    );
}

function StatCard({ icon, label, value, sub, color }) {
    const colorClasses = {
        red: "from-red-500/20 to-transparent border-red-500/20 hover:border-red-500/40",
        amber: "from-amber-500/20 to-transparent border-amber-500/20 hover:border-amber-500/40",
        blue: "from-blue-500/20 to-transparent border-blue-500/20 hover:border-blue-500/40"
    };

    return (
        <div className={clsx(
            "relative glass-panel rounded-3xl p-8 transition-all duration-300 group overflow-hidden hover:-translate-y-1",
            "bg-gradient-to-br", colorClasses[color] || "border-slate-800"
        )}>
            <div className="relative z-10 flex items-start justify-between">
                <div className="space-y-1">
                    <div className="text-4xl font-black text-white font-display tracking-tight">{value}</div>
                    <div className="text-sm font-bold text-slate-300 uppercase tracking-wide">{label}</div>
                    <div className="text-xs text-slate-500 font-medium">{sub}</div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            </div>
        </div>
    );
}
