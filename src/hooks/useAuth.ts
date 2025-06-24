import { useState, useEffect } from "react";
import { User } from "@/interfaces/User";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in on mount
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth/user");
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = () => {
        if (isLoggingIn) return;
        setIsLoggingIn(true);
        window.location.href = "/api/auth/login";
    };

    const logout = async () => {
        await fetch("/api/auth/logout");
        setUser(null);

        // needed for triggering the form animation
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 50);
    };

    return { user, loading, login, isLoggingIn, logout };
}
