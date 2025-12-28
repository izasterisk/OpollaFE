'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import {
    saveAuthData,
    getAuthData,
    clearAuthData,
    isSessionExpired,
} from '@/utils/auth.utils';

const HARDCODED_USERNAME = 'anh.ntminh@apollo.edu.vn';

export function useAuth() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Only access localStorage on client side
    const authData = typeof window !== 'undefined' ? getAuthData() : null;
    const isAuthenticated = authData !== null && !isSessionExpired();

    /**
     * Login with hardcoded username and provided password.
     */
    const login = useCallback(
        async (password: string) => {
            try {
                setIsLoading(true);
                setError(null);

                const profile = await authService.login(HARDCODED_USERNAME, password);

                // Save token and user name from staff data
                const userName = profile.staff?.name || profile.email;
                saveAuthData(profile.token, userName);

                router.push('/dashboard');
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'Đăng nhập thất bại';
                setError(errorMessage);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [router]
    );

    /**
     * Logout - clear local data and call logout API.
     */
    const logout = useCallback(async () => {
        try {
            setIsLoading(true);
            await authService.logout(HARDCODED_USERNAME);
        } catch (err) {
            console.error('Logout API failed:', err);
        } finally {
            clearAuthData();
            setIsLoading(false);
            router.push('/login');
        }
    }, [router]);

    /**
     * Check if session is still valid.
     */
    const checkSession = useCallback((): boolean => {
        if (!authData || isSessionExpired()) {
            clearAuthData();
            return false;
        }
        return true;
    }, [authData]);

    return {
        isAuthenticated,
        userName: authData?.userName || null,
        isLoading,
        error,
        login,
        logout,
        checkSession,
    };
}
