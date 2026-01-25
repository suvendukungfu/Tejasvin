import { useEffect } from "react";
import { useRecruiterStore } from "../../../app/store";

export const useRecruiterLogic = () => {
    const { isDemoMode, simulateIncident } = useRecruiterStore();

    useEffect(() => {
        if (!isDemoMode) return;

        // Simulate an incident every 8 seconds
        const interval = setInterval(() => {
            // In a real app, this would add to the store. 
            // For now, we'll just trigger the logger via the store action
            simulateIncident();

            // Optional: Dispatch a custom event or toast here to show UI feedback
            // const event = new CustomEvent('new-incident', { detail: { id: Date.now() } });
            // window.dispatchEvent(event);

        }, 8000);

        return () => clearInterval(interval);
    }, [isDemoMode, simulateIncident]);
};
