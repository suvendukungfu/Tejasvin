import { useState, useEffect } from "react";
import { UserPlus, Trash2, Phone, User as UserIcon, ShieldAlert, Loader2 } from "lucide-react";
import api from "../../services/api";

export default function ContactManager() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [relationship, setRelationship] = useState("");

    const fetchContacts = async () => {
        try {
            const res = await api.get("/contacts");
            setContacts(res.data);
        } catch (err) {
            console.error("Failed to fetch contacts", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name || !phone) return;

        setSubmitting(true);
        try {
            const res = await api.post("/contacts", { name, phone, relationship });
            setContacts([res.data, ...contacts]);
            setName("");
            setPhone("");
            setRelationship("");
        } catch (err) {
            console.error("Failed to add contact", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/contacts/${id}`);
            setContacts(contacts.filter(c => c._id !== id));
        } catch (err) {
            console.error("Failed to delete contact", err);
        }
    };

    return (
        <div className="space-y-8">

            {/* Add New Contact Row */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/10 rounded-xl">
                        <UserPlus className="w-5 h-5 text-blue-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Add Emergency Contact</h2>
                </div>

                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-blue-500/50"
                        />
                    </div>
                    <div className="space-y-1">
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-blue-500/50"
                        />
                    </div>
                    <div className="space-y-1">
                        <input
                            type="text"
                            placeholder="Relationship (Optional)"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-blue-500/50"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm h-full flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                        Save Contact
                    </button>
                </form>
            </div>

            {/* List section */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6">Your Safety Network</h2>

                {loading ? (
                    <div className="py-12 flex justify-center">
                        <Loader2 className="w-8 h-8 text-slate-700 animate-spin" />
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-slate-800 rounded-2xl">
                        <ShieldAlert className="w-10 h-10 text-slate-800" />
                        <p className="text-slate-500 text-sm max-w-xs italic">
                            You haven't added any emergency contacts yet. We recommend adding at least two.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl flex items-center justify-between group hover:border-slate-600 transition-all shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">{contact.name}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                            <Phone className="w-3 h-3" />
                                            {contact.phone}
                                            {contact.relationship && <span className="opacity-50">• {contact.relationship}</span>}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(contact._id)}
                                    className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex gap-3 items-start">
                    <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-500/80 leading-relaxed font-medium">
                        Contacts will be notified automatically via SMS when you trigger an emergency SOS. Ensure phone numbers include country codes for reliable delivery.
                    </p>
                </div>
            </div>

        </div>
    );
}
