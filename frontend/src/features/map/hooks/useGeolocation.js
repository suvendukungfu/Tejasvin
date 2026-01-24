import { useEffect } from "react";
import { useUserStore } from "../../../app/store";

export const useGeolocation = () => {
    const { setLocation, setPermission } = useUserStore();

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setPermission("denied");
            return;
        }

        const handleSuccess = (position) => {
            setPermission("granted");
            setLocation(position.coords.latitude, position.coords.longitude);
        };

        const handleError = (error) => {
            if (error.code === error.PERMISSION_DENIED) {
                setPermission("denied");
            }
            console.error("Geolocation error:", error);
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
