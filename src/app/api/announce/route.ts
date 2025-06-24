import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Announcement } from "@/interfaces/Announcement";
import { User } from "@/interfaces/User";

if (!process.env.PASSWORD) {
    throw new Error("Required environment variables are not set");
}

export async function POST(request: Request) {
    const { channelName, channelDescription, message, targetIds, password } = await request.json();

    if (!channelName || !message || !targetIds || !password) {
        return NextResponse.json({ success: false, error: "Missing required fields!" }, { status: 400 });
    }

    const targetIdsArray: number[] = targetIds.split(",").map((id: string) => Number(id.trim()));

    if (targetIdsArray.length === 0 || targetIdsArray.some(id => isNaN(id))) {
        return NextResponse.json({ success: false, error: "No valid target IDs provided!" }, { status: 400 });
    }

    if (password !== process.env.PASSWORD) {
        return NextResponse.json({ success: false, error: "Invalid password!" }, { status: 401 });
    }

    if (message.length > 1024) {
        return NextResponse.json({ success: false, error: "Message cannot exceed 1024 characters!" }, { status: 400 });
    }

    // Get authenticated user
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("osu_user");
    if (!userCookie?.value) {
        return NextResponse.json({ success: false, error: "Not authenticated!" }, { status: 401 });
    }

    const user: User = JSON.parse(userCookie.value);


    const announcement: Announcement = {
        type: "ANNOUNCE",
        channel: {
            name: channelName,
            description: channelDescription,
        },
        message,
        target_ids: targetIdsArray,
    };

    try {
        const response = await fetch("https://osu.ppy.sh/api/v2/chat/channels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${user.access_token}`,
            },
            body: JSON.stringify(announcement),
        });


        if (response.status !== 200) {
            return NextResponse.json({ success: false, error: `Failed to send announcement: ${response.statusText}` }, { status: 500 });
        }

        return NextResponse.json(
            { success: true, message: `Announcement sent to ${targetIdsArray.length} users!` },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ success: false, error: `Failed to send announcement: ${error}` }, { status: 500 });
    }
}
