import { useState, useEffect } from "react";
import { useMissionStore, useEmergencyStore } from "../../../app/store";
import { PartyPopper, CheckCircle2 } from "lucide-react";
import ReviewModal from "../../emergency/components/ReviewModal";
import clsx from "clsx";

export default function SuccessOverlay() {
    const { missionStatus, cancelMission, lastCompletedMission } = useMissionStore();
    const { status: emergencyStatus, reset: resetEmergency, lastResponder } = useEmergencyStore();
    const [showReview, setShowReview] = useState(false);

    const isMissionSuccess = missionStatus === 'COMPLETED';
    const isSOSResolved = emergencyStatus === 'RESOLVED';

    const isVisible = isMissionSuccess || isSOSResolved;

    if (!isVisible && !showReview) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-500">

            <div className="bg-slate-900 border border-success-base/30 rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(34,197,94,0.2)] animate-in zoom-in-95 duration-300">

                <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-success-base/20 rounded-full animate-ping" />
                    <div className="relative bg-success-base rounded-full w-full h-full flex items-center justify-center">
                        {isMissionSuccess ? <PartyPopper className="w-12 h-12 text-white" /> : <CheckCircle2 className="w-12 h-12 text-white" />}
                    </div>
                </div>

                <h2 className="text-3xl font-display font-bold text-white mb-2">
                    Excellent Work!
                </h2>

                <p className="text-slate-400 mb-8">
                    {isMissionSuccess
                        ? "Mission completed successfully. You've helped keep the community safe."
                        : "SOS has been resolved. Authorities are on site."}
                </p>

                <div className="bg-success-base/10 rounded-2xl p-4 mb-8 border border-success-base/10 text-success-base font-bold">
                    {isMissionSuccess ? "+500 Impact Credits" : "Situation Stabilized"}
                </div>

                <button
                    onClick={() => {
                        setShowReview(true);
                    }}
                    className="w-full py-4 bg-success-base text-white font-bold rounded-xl hover:bg-success-base/90 transition shadow-lg shadow-success-base/20"
                >
                    Rate & Finish
                </button>
            </div>

            <ReviewModal
                isOpen={showReview}
                onClose={() => {
                    setShowReview(false);
                    if (isMissionSuccess) cancelMission();
                    if (isSOSResolved) resetEmergency();
                }}
                incidentId={isMissionSuccess ? lastCompletedMission?._id : lastResponder?.incidentId}
                toUserId={isMissionSuccess ? lastCompletedMission?.userId : lastResponder?.id}
                toUserName={isMissionSuccess ? "Victim" : lastResponder?.name}
                role={isMissionSuccess ? "responder" : "victim"}
            />

        </div>
    );
}
