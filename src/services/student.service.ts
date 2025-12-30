import { apiClient } from '@/lib/axios';
import type {
    APIResponse,
    StudentPagingResponse,
    GetStudentsRequest,
    HomeLearningPagingResponse,
    HomeLearningDTO,
    GetHomeLearningRequest,
} from '@/types';

export const studentService = {
    /**
     * Get paginated list of students by class ID
     */
    getStudents: async (
        token: string,
        classId: string,
        page: number = 1,
        pageSize: number = 10
    ): Promise<StudentPagingResponse> => {
        const payload: GetStudentsRequest = { token, classId };
        const response = await apiClient.post<APIResponse<StudentPagingResponse>>(
            `/api/Student?page=${page}&pageSize=${pageSize}`,
            payload
        );

        if (!response.data.status || !response.data.data) {
            throw new Error(response.data.errors[0] || 'Failed to fetch students');
        }

        return response.data.data;
    },

    /**
     * Get home learning progress for a specific date
     * Fetches ALL data (loops through pages with pageSize=1000)
     */
    getHomeLearningProgress: async (
        token: string,
        classId: string,
        choosenDate: string
    ): Promise<HomeLearningDTO[]> => {
        const allData: HomeLearningDTO[] = [];
        let currentPage = 1;
        const pageSize = 1000;
        let hasMorePages = true;

        while (hasMorePages) {
            const payload: GetHomeLearningRequest = { token, classId, choosenDate };
            const response = await apiClient.post<APIResponse<HomeLearningPagingResponse>>(
                `/api/Student/progress?page=${currentPage}&pageSize=${pageSize}`,
                payload
            );

            if (!response.data.status || !response.data.data) {
                throw new Error(response.data.errors[0] || 'Failed to fetch home learning progress');
            }

            const pageData = response.data.data;
            allData.push(...pageData.data);

            // Check if there are more pages
            hasMorePages = currentPage < pageData.totalPages;
            currentPage++;
        }

        return allData;
    },
};
