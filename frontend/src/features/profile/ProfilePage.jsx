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
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 animate-fade-in-up">

            {/* Profile Header */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="h-32 bg-gradient-to-r from-red-600 to-blue-600 opacity-20" />

                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end -mt-12 gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-3xl bg-slate-800 border-4 border-slate-900 overflow-hidden shadow-xl">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {user.isVerified && (
                                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full shadow-lg border-4 border-slate-900">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-black uppercase tracking-widest text-slate-400 border border-slate-700">
                                    {user.role}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    <span>{user.location?.lat ? `${user.location.lat.toFixed(4)}, ${user.location.lng.toFixed(4)}` : "Location Unknown"}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Award className="w-4 h-4" />
                                    <span>{user.badges?.length || 0} Badges Earned</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all flex items-center gap-2 text-sm font-semibold"
                        >
                            <Edit3 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleUpdate} className="mt-8 space-y-4 max-w-lg">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Display Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Share your responder experience..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500/50 transition-all h-24 resize-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 bg-slate-800 text-slate-400 rounded-xl font-bold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="mt-6 text-slate-400 leading-relaxed max-w-2xl">
                            {user.bio || "No bio added yet. Tell the community about yourself!"}
                        </p>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    icon={<Heart className="w-6 h-6 text-red-500" />}
                    label="Saves Recorded"
                    value={user.stats?.saves || 0}
                    sub="Lives assisted"
                />
                <StatCard
                    icon={<Zap className="w-6 h-6 text-amber-500" />}
                    label="Missions Joined"
                    value={user.stats?.missionsJoined || 0}
                    sub="Activity points"
                />
                <StatCard
                    icon={<Star className="w-6 h-6 text-blue-500" />}
                    label="Rescue Rating"
                    value={user.stats?.rating?.toFixed(1) || "5.0"}
                    sub="Community trust"
                />
            </div>

            {/* Badges & Verification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Trust & Verification</h2>
                        {user.isVerified ? (
                            <div className="flex items-center gap-1.5 text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-400/20">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Verified
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-400/20">
                                <AlertCircle className="w-3.5 h-3.5" />
                                Pending
                            </div>
                        )}
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Verified responders undergo background checks to ensure community safety. Verification unlocks priority mission alerts and the "Verified" badge.
                    </p>
                    {!user.isVerified && (
                        <button className="w-full py-3 bg-slate-800 text-white rounded-xl text-sm font-bold border border-slate-700 hover:bg-slate-700 transition-all">
                            Apply for Verification
                        </button>
                    )}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
                    <h2 className="text-xl font-bold text-white">Achievement Badges</h2>
                    <div className="flex flex-wrap gap-4">
                        {user.badges && user.badges.length > 0 ? (
                            user.badges.map((badge, i) => (
                                <div key={i} className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl shadow-sm group hover:border-slate-600 transition-all">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-sm font-semibold text-slate-300">{badge}</span>
                                </div>
                            ))
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center py-6 border-2 border-dashed border-slate-800 rounded-2xl text-slate-600 italic text-sm">
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

function StatCard({ icon, label, value, sub }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                {icon}
            </div>
            <div>
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="text-sm font-bold text-slate-300">{label}</div>
                <div className="text-xs text-slate-500 font-medium">{sub}</div>
            </div>
        </div>
    );
}
