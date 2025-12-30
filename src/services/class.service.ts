import { apiClient } from '@/lib/axios';
import type {
    APIResponse,
    ClassPagingResponse,
    GetClassesRequest,
} from '@/types';

export const classService = {
    /**
     * Get paginated list of classes
     */
    getClasses: async (
        token: string,
        page: number = 1,
        pageSize: number = 10
    ): Promise<ClassPagingResponse> => {
        const payload: GetClassesRequest = { token };
        const response = await apiClient.post<APIResponse<ClassPagingResponse>>(
            `/api/Class?page=${page}&pageSize=${pageSize}`,
            payload
        );

        if (!response.data.status || !response.data.data) {
            throw new Error(response.data.errors[0] || 'Failed to fetch classes');
        }

        return response.data.data;
    },
};
