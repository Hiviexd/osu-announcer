import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
    title: "osu! announcer",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.variable} antialiased font-roboto`}>{children}</body>
        </html>
    );
}
