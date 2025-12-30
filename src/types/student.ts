import type { PaginatedResponse } from './api';

export interface AvatarDTO {
    id: number;
    originalname: string;
    mimetype: string;
    size: number;
    key: string;
    url: string;
    isAPOFeedbackIcon: boolean;
    createdAt: string;
    updatedAt: string;
    creatorId: number | null;
    galleryId: number | null;
    avatarBaseId: number | null;
}

export interface StudentReport {
    attendance: number | null;
    workbookCompletion: number | null;
    workbookScore: number | null;
    apo: number;
    learningObjective: number | null;
    totalSession: number;
}

export interface HomeLearningReport {
    appCompletion: number | null;
    appScore: number | null;
    appTime: number | null;
    totalHomeLearning: number;
}

export interface StudentDTO {
    id: number;
    name: string;
    code: string;
    nickName: string | null;
    dob: string | null;
    gender: string;
    hubId: number;
    avatarType: string;
    usingDevice: string | null;
    createdAt: string;
    updatedAt: string;
    avatar: AvatarDTO | null;
    avatarId: number | null;
    parentId: number;
    builtAvatar: any[];
    report: StudentReport | null;
    homeLearningReport: HomeLearningReport | null;
}

export type StudentPagingResponse = PaginatedResponse<StudentDTO>;

// Request DTOs
export interface GetStudentsRequest {
    token: string;
    classId: string;
}

export interface HomeLearningDTO {
    id: number;
    studentId: number;
    studentName: string;
    studentAvatar?: string;
    classId: number;
    assignDate: string;
    cmsResourceId: number;
    cmsHomeLearningId: number;
    appCompletion: number | null;
    appScore: number | null;
    appTime: number | null;
    skill: string;
    completedAt: string | null;
    lastSession: string | null;
    unitName: string | null;
    lastAccessedAt: string | null;
    createdAt: string;
    updatedAt: string;
    studentClassId: number;
}

export type HomeLearningPagingResponse = PaginatedResponse<HomeLearningDTO>;

export interface GetHomeLearningRequest {
    token: string;
    classId: string;
    choosenDate: string; // YYYY-MM-DD format
}
