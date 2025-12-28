import type { AuthState } from '@/types/auth';

const AUTH_TOKEN_KEY = 'authToken';
const USER_NAME_KEY = 'userName';
const EXPIRE_TIME_KEY = 'expireTime';

/**
 * Calculate expiration time (23 hours from now) in UTC.
 */
export function calculateExpireTime(): string {
    const now = new Date();
    const expireTime = new Date(now.getTime() + 23 * 60 * 60 * 1000);
    return expireTime.toISOString(); // UTC format
}

/**
 * Save authentication data to localStorage.
 */
export function saveAuthData(token: string, userName: string): void {
    const expireTime = calculateExpireTime();
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_NAME_KEY, userName);
    localStorage.setItem(EXPIRE_TIME_KEY, expireTime);
}

/**
 * Get authentication data from localStorage.
 */
export function getAuthData(): AuthState | null {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userName = localStorage.getItem(USER_NAME_KEY);
    const expireTime = localStorage.getItem(EXPIRE_TIME_KEY);

    if (!token || !userName || !expireTime) {
        return null;
    }

    return { token, userName, expireTime };
}

/**
 * Clear all authentication data from localStorage.
 */
export function clearAuthData(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(EXPIRE_TIME_KEY);
}

/**
 * Check if the current session has expired.
 * Compares current UTC time with stored expiration time.
 */
export function isSessionExpired(): boolean {
    if (typeof window === 'undefined') return true;

    const expireTime = localStorage.getItem(EXPIRE_TIME_KEY);
    if (!expireTime) return true;

    const now = new Date();
    const expire = new Date(expireTime);
    return now > expire; // Both are in UTC
}
