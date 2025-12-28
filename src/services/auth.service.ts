import { env } from '@/config/env';
import type { LoginRequest, ProfileResponse } from '@/types/auth';
import type { APIResponse } from '@/types/common';
import { httpPost } from '@/lib/axios';

export const authService = {
    /**
     * Login with username and password.
     * POST /api/Login
     */
    login: async (username: string, password: string): Promise<ProfileResponse> => {
        const request: LoginRequest = { username, password };
        const response = await httpPost<APIResponse<ProfileResponse>>(
            `${env.NEXT_PUBLIC_BE_URL}/api/Login`,
            request
        );
        return response.data;
    },

    /**
     * Logout - clear server-side session.
     * POST /api/Login/logout
     */
    logout: async (username: string): Promise<void> => {
        await httpPost<APIResponse<{ message: string }>>(
            `${env.NEXT_PUBLIC_BE_URL}/api/Login/logout`,
            { username }
        );
    },
};
