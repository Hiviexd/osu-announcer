import { useState } from "react";

interface AnnouncementParams {
    channelName: string;
    channelDescription: string;
    message: string;
    targetIds: string;
    password: string;
}

export function useAnnounce() {
    const [sending, setSending] = useState(false);

    const sendAnnouncement = async ({
        channelName,
        channelDescription,
        message,
        targetIds,
        password,
    }: AnnouncementParams) => {
        setSending(true);

        try {
            const response = await fetch("/api/announce", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ channelName, channelDescription, message, targetIds, password }),
            });

            const data = await response.json();
            return { success: response.ok, error: data.error };
        } catch (error) {
            return { success: false, error: `Failed to send announcement: ${error}` };
        } finally {
            setSending(false);
        }
    };

    return { sendAnnouncement, sending };
}
