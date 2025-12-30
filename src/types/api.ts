// Pagination metadata
export interface PaginationMeta {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

// Generic paginated response
export interface PaginatedResponse<T> extends PaginationMeta {
    data: T[];
}
