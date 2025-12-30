import type { PaginatedResponse } from './api';

export interface ClassReport {
    id: number;
    attendance: number | null;
    workbookCompletion: number | null;
    workbookScore: number | null;
    apo: number;
    learningObjective: number | null;
    totalSession: number;
    createdAt: string;
    updatedAt: string;
    classId: number;
}

export interface ClassDTO {
    id: number;
    name: string;
    code: string;
    status: string;
    startDate: string;
    endDate: string;
    closedDate: string | null;
    isActive: boolean;
    totalStudent: number;
    hubId: number;
    classStatusId: number;
    avatarType: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    report: ClassReport | null;
    homeLearningReport: any | null;
    teacherId: number | null;
    centerId: number;
    curriculumId: number;
    csoId: number;
}

export type ClassPagingResponse = PaginatedResponse<ClassDTO>;

// Request DTO
export interface GetClassesRequest {
    token: string;
}
