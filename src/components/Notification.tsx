import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

type NotificationProps = {
    message: string | null;
    type: "success" | "error" | null;
};

export function Notification({ message, type }: NotificationProps) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: -20, x: "-50%" }}
                    className={`fixed top-4 left-1/2 p-4 rounded-lg shadow-lg ${
                        type === "success" ? "bg-green-500" : "bg-red-500"
                    } text-white flex items-center gap-3 z-50`}>
                    <FontAwesomeIcon icon={type === "success" ? faCheck : faExclamationTriangle} className="text-lg" />
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
