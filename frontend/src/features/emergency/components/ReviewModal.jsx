import { useState } from "react";
import { Star, MessageSquare, Send, X, Loader2, AlertCircle } from "lucide-react";
import api from "../../../services/api";
import logger from "../../../utils/logger";

export default function ReviewModal({ isOpen, onClose, incidentId, toUserId, toUserName, role }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoveredRating, setHoveredRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post("/feedback", {
                incidentId,
                toUserId,
                role,
                rating,
                comment
            });
            setSubmitted(true);
            setTimeout(() => {
                onClose();
                setSubmitted(false);
                setComment("");
                setRating(5);
            }, 2000);
        } catch (err) {
            logger.error("Feedback submission failed", err, { incidentId, role });
            setError("Failed to submit feedback. Our team has been notified.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">

                {/* Success Overlay inside Modal */}
                {submitted && (
                    <div className="absolute inset-0 z-10 bg-slate-900 flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                            <Send className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Feedback Shared!</h3>
                        <p className="text-slate-400 text-sm mt-1">Thank you for helping us improve the rescue network.</p>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-blue-500 fill-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Rate your Rescue</h2>
                    <p className="text-slate-400 text-sm mt-1">Tell us about your experience with <span className="text-white font-semibold">{toUserName}</span></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Star Rating Section */}
                    <div className="flex flex-col items-center gap-3">
                        <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Your Rating</label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setRating(star)}
                                    className="transition-transform active:scale-90"
                                >
                                    <Star
                                        className={`w-10 h-10 ${(hoveredRating || rating) >= star
                                            ? 'text-amber-400 fill-amber-400'
                                            : 'text-slate-700'
                                            } transition-colors`}
                                    />
                                </button>
                            ))}
                        </div>
                        <span className="text-sm font-bold text-slate-300">
                            {['Very Poor', 'Poor', 'Satisfactory', 'Good', 'Excellent'][rating - 1]}
                        </span>
                    </div>

                    <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" />
                            Comment (Optional)
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="How was the rescue? Any feedback for the responder?"
                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50 h-28 resize-none transition-all"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        Submit Feedback
                    </button>
                </form>

            </div>
        </div>
    );
}
