export interface Announcement {
    type: "ANNOUNCE";
    channel: AnnouncementChannel;
    message: string;
    target_ids: number[];
}

interface AnnouncementChannel {
    name: string;
    description?: string;
}
