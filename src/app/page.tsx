"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUsers, faComment, faKey, faHashtag } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "@/hooks/useAuth";
import { useAnnounce } from "@/hooks/useAnnounce";
import { useNotification } from "@/hooks/useNotification";
import { LoginButton } from "@/components/LoginButton";
import { UserDisplay } from "@/components/UserDisplay";
import { Notification } from "@/components/Notification";

export default function Home() {
    const { user, loading, login, isLoggingIn, logout } = useAuth();
    const { sendAnnouncement, sending } = useAnnounce();
    const { notification, showNotification } = useNotification();

    const [formData, setFormData] = useState({
        channelName: "",
        channelDescription: "",
        message: "",
        targetIds: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.channelName || !formData.message || !formData.targetIds || !formData.password) {
            showNotification("Please fill in all required fields", "error");
            return;
        }

        if (formData.message.length > 1024) {
            showNotification("Message cannot exceed 1024 characters", "error");
            return;
        }

        const result = await sendAnnouncement(formData);

        if (result.success) {
            showNotification("Announcement sent successfully!", "success");
            setFormData({
                channelName: "",
                channelDescription: "",
                message: "",
                targetIds: "",
                password: "",
            });
        } else {
            showNotification(result.error || "Failed to send announcement", "error");
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (loading) {
        return;
    }

    return (
        <>
            <Notification message={notification.message} type={notification.type} />

            <div className="min-h-screen bg-gradient-to-tr from-gray-700 via-gray-900 to-neutral-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md">
                    {/* Main Card */}
                    <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-white">osu! Announcer</h1>
                            </div>
                            <p className="text-gray-400 text-sm">Wrapper for the osu! announcement API</p>
                            <p className="text-gray-400 text-sm">
                                You&apos;ll need the announce usergroup to use this.
                            </p>
                        </motion.div>

                        {user ? (
                            <>
                                <UserDisplay user={user} onLogout={logout} />

                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-4">
                                    {/* Channel Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            <FontAwesomeIcon icon={faHashtag} className="mr-2 text-slate-400" />
                                            Channel Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.channelName}
                                            onChange={(e) => handleInputChange("channelName", e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-slate-300/50 focus:bg-gray-700/70 transition-all"
                                            placeholder="Enter channel name"
                                            autoComplete="off"
                                            required
                                        />
                                    </div>

                                    {/* Channel Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            <FontAwesomeIcon icon={faHashtag} className="mr-2 text-slate-400" />
                                            Channel Description
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.channelDescription}
                                            onChange={(e) => handleInputChange("channelDescription", e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-slate-300/50 focus:bg-gray-700/70 transition-all"
                                            placeholder="Enter channel description"
                                            autoComplete="off"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <div className="flex justify-between mt-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <FontAwesomeIcon icon={faComment} className="mr-2 text-slate-400" />
                                                Message
                                            </label>

                                            <span
                                                className={`text-xs ${
                                                    formData.message.length > 1000 ? "text-red-400" : "text-gray-500"
                                                }`}>
                                                {formData.message.length}/1024
                                            </span>
                                        </div>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => handleInputChange("message", e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-slate-300/50 focus:bg-gray-700/70 transition-all resize-none"
                                            placeholder="Enter your announcement message"
                                            rows={4}
                                            maxLength={1024}
                                            autoComplete="off"
                                            required
                                        />
                                    </div>

                                    {/* Target IDs */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            <FontAwesomeIcon icon={faUsers} className="mr-2 text-slate-400" />
                                            Target User IDs
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.targetIds}
                                            onChange={(e) => handleInputChange("targetIds", e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-slate-300/50 focus:bg-gray-700/70 transition-all"
                                            placeholder="123456,789012,345678"
                                            autoComplete="off"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Comma-separated user IDs</p>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            <FontAwesomeIcon icon={faKey} className="mr-2 text-slate-400" />
                                            Admin Password
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange("password", e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-slate-300/50 focus:bg-gray-700/70 transition-all"
                                            placeholder="Enter admin password"
                                            autoComplete="off"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={sending}
                                        whileHover={sending ? {} : { scale: 1.02 }}
                                        whileTap={sending ? {} : { scale: 0.98 }}
                                        className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700 text-white rounded-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer">
                                        {sending ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                                                Send Announcement
                                            </>
                                        )}
                                    </motion.button>
                                </motion.form>
                            </>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                                <LoginButton onClick={login} disabled={isLoggingIn} />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
