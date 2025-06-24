import { useState } from "react";

type NotificationType = "success" | "error" | null;

export function useNotification() {
    const [notification, setNotification] = useState<{
        message: string | null;
        type: NotificationType;
    }>({
        message: null,
        type: null,
    });

    const showNotification = (message: string, type: NotificationType) => {
        setNotification({ message, type });

        // Auto-hide after 4 seconds
        setTimeout(() => {
            setNotification({ message: null, type: null });
        }, 4000);
    };

    const hideNotification = () => {
        setNotification({ message: null, type: null });
    };

    return {
        notification,
        showNotification,
        hideNotification,
    };
}
