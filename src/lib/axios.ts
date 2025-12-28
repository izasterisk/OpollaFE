/**
 * Axios Instance Configuration
 * =============================
 * Centralized Axios instance for all HTTP requests to the backend API.
 *
 * RULES:
 * 1. NEVER import axios directly in components or pages.
 * 2. NEVER make HTTP calls directly from UI components.
 * 3. ALWAYS use this instance through the services layer (src/services/).
 *
 * This module provides:
 * - Pre-configured base URL from environment
 * - Request/Response interceptors for common handling
 * - Centralized error handling
 * - Type-safe request methods
 */

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios';

import { env } from '@/config/env';

/**
 * Custom error type for API errors.
 */
export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

/**
 * Create and configure the Axios instance.
 */
function createAxiosInstance(): AxiosInstance {
    const instance = axios.create({
        baseURL: env.BE_URL,
        timeout: 30000, // 30 seconds
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    // ================================================================
    // Request Interceptor
    // ================================================================
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // Add authorization header if token exists
            // TODO: Implement actual token retrieval from your auth system
            const token = getAuthToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // ================================================================
    // Response Interceptor
    // ================================================================
    instance.interceptors.response.use(
        (response) => {
            // Return the response data directly for successful requests
            return response;
        },
        (error: AxiosError<ApiError>) => {
            // Handle specific error status codes
            if (error.response) {
                const { status } = error.response;

                switch (status) {
                    case 401:
                        // Unauthorized - clear auth and redirect to login
                        handleUnauthorized();
                        break;
                    case 403:
                        // Forbidden
                        console.error('Access forbidden');
                        break;
                    case 404:
                        // Not found
                        console.error('Resource not found');
                        break;
                    case 500:
                        // Server error
                        console.error('Server error occurred');
                        break;
                    default:
                        // Other errors
                        console.error(`HTTP Error: ${status}`);
                }
            } else if (error.request) {
                // Request was made but no response received
                console.error('Network error - no response received');
            } else {
                // Error in request configuration
                console.error('Request configuration error:', error.message);
            }

            return Promise.reject(error);
        }
    );

    return instance;
}

/**
 * Get authentication token.
 * TODO: Implement based on your auth system (localStorage, cookies, etc.)
 */
function getAuthToken(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem('authToken');
}

/**
 * Handle unauthorized (401) responses.
 * TODO: Implement based on your auth system.
 */
function handleUnauthorized(): void {
    // Placeholder - implement based on your authentication system
    // Example:
    // - Clear stored tokens
    // - Redirect to login page
    // - Show notification
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        // window.location.href = '/login';
    }
}

/**
 * Singleton Axios instance.
 * Use this for all HTTP requests to the backend API.
 */
export const apiClient = createAxiosInstance();

/**
 * Type-safe GET request helper.
 */
export async function httpGet<T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<T> {
    const response = await apiClient.get<T>(url, config);
    return response.data;
}

/**
 * Type-safe POST request helper.
 */
export async function httpPost<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
}

/**
 * Type-safe PUT request helper.
 */
export async function httpPut<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
}

/**
 * Type-safe PATCH request helper.
 */
export async function httpPatch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
}

/**
 * Type-safe DELETE request helper.
 */
export async function httpDelete<T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<T> {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
}
