import { useEffect } from "react";
import { useUserStore } from "../../../app/store";
import logger from "../../../utils/logger";

export const useGeolocation = () => {
    const { setLocation, setPermission } = useUserStore();

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setPermission("denied");
            return;
        }

        const handleSuccess = (position) => {
            if (!position || !position.coords) {
                logger.error("Geolocation success called with invalid position object");
                return;
            }
            const { latitude, longitude } = position.coords;
            if (typeof latitude !== 'number' || typeof longitude !== 'number') {
                logger.error("Invalid coordinate types received from geolocation");
                return;
            }
            setPermission("granted");
            setLocation(latitude, longitude);
        };

        const handleError = (error) => {
            if (!error) return;
            if (error.code === error.PERMISSION_DENIED) {
                setPermission("denied");
            }
            logger.warn("Geolocation error", {
                code: error.code,
                message: error.message
            });
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 5000,
        };

        const watchId = navigator.geolocation.watchPosition(
            handleSuccess,
            handleError,
            options
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [setLocation, setPermission]);
};
