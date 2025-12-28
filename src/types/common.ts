/**
 * Common Type Definitions
 * ========================
 * Shared types and interfaces used across the application.
 *
 * ORGANIZATION GUIDE:
 * - common.ts: Shared/utility types used across multiple features
 * - [feature].ts: Feature-specific types (e.g., user.ts, product.ts)
 *
 * NAMING CONVENTIONS:
 * - Interfaces: PascalCase with 'I' prefix optional (e.g., User or IUser)
 * - DTOs: Suffix with 'Dto' (e.g., CreateUserDto, UpdateProductDto)
 * - Request types: Suffix with 'Request' (e.g., LoginRequest)
 * - Response types: Suffix with 'Response' (e.g., LoginResponse)
 */

/**
 * Generic nullable type helper.
 */
export type Nullable<T> = T | null;

/**
 * Make specific properties optional.
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required.
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>;

/**
 * Extract the element type from an array type.
 */
export type ArrayElement<T> = T extends readonly (infer E)[] ? E : never;

/**
 * Common ID type - adjust based on your backend (string for UUID, number for int).
 */
export type ID = string;

/**
 * Base entity interface with common fields.
 */
export interface BaseEntity {
    id: ID;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

/**
 * Sort direction enum.
 */
export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

/**
 * Generic select option for dropdowns.
 */
export interface SelectOption<T = string> {
    label: string;
    value: T;
    disabled?: boolean;
}

/**
 * Error response from API.
 */
export interface ErrorResponse {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
    statusCode: number;
}

/**
 * Success response from API.
 */
export interface SuccessResponse<T = unknown> {
    success: true;
    message?: string;
    data: T;
}

/**
 * Union type for API responses.
 */
export type ApiResult<T> = SuccessResponse<T> | ErrorResponse;
