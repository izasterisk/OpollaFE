/**
 * API Client Service
 * ===================
 * Base service for API interactions.
 * All API services should extend or use this module.
 *
 * RULES:
 * 1. All HTTP calls MUST go through this layer.
 * 2. UI components should NEVER call axios directly.
 * 3. Each domain/feature should have its own service file.
 *
 * EXAMPLE USAGE:
 * ```typescript
 * // src/services/user.service.ts
 * import { httpGet, httpPost } from '@/lib/axios';
 * import type { User, CreateUserDto } from '@/types/user';
 *
 * export const userService = {
 *   getAll: () => httpGet<User[]>('/api/users'),
 *   getById: (id: string) => httpGet<User>(`/api/users/${id}`),
 *   create: (data: CreateUserDto) => httpPost<User, CreateUserDto>('/api/users', data),
 * };
 * ```
 */

import {
    httpGet,
    httpPost,
    httpPut,
    httpPatch,
    httpDelete,
} from '@/lib/axios';

// Re-export HTTP methods for use in domain-specific services
export { httpGet, httpPost, httpPut, httpPatch, httpDelete };

/**
 * Generic API response wrapper.
 * Adjust based on your backend's response structure.
 */
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

/**
 * Paginated response structure.
 * Adjust based on your backend's pagination implementation.
 */
export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

/**
 * Base query parameters for paginated requests.
 */
export interface PaginationParams {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/**
 * Build query string from parameters object.
 * Filters out undefined/null values.
 */
export function buildQueryString(
    params: Record<string, string | number | boolean | undefined | null>
): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
}
