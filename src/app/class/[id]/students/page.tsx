'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import {
    StudentCard,
    HomeLearningCard,
    Spinner,
    ErrorToast,
    Pagination,
    TabSwitch,
    type Tab,
} from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { studentService } from '@/services';
import { getTodayUTC7, getMaxDate } from '@/utils';
import type { StudentDTO, HomeLearningDTO } from '@/types';

export default function ClassStudentsPage() {
    const router = useRouter();
    const params = useParams();
    const classId = params['id'] as string;
    const { checkSession, isAuthenticated } = useAuth();

    const [activeTab, setActiveTab] = useState<Tab>('students');
    const [students, setStudents] = useState<StudentDTO[]>([]);
    const [homeLearning, setHomeLearning] = useState<HomeLearningDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedDate, setSelectedDate] = useState(getTodayUTC7());
    const pageSize = 10;

    // Session check - only on mount
    useEffect(() => {
        if (!checkSession() || !isAuthenticated) {
            router.push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty deps - run only on mount

    // Fetch students
    useEffect(() => {
        if (activeTab !== 'students') return;

        const fetchStudents = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const token = typeof window !== 'undefined'
                    ? localStorage.getItem('authToken')
                    : null;

                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await studentService.getStudents(
                    token,
                    classId,
                    page,
                    pageSize
                );
                setStudents(response.data);
                setTotalPages(response.totalPages);
            } catch (err) {
                const errorMessage = err instanceof Error
                    ? err.message
                    : 'Failed to fetch students';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, [activeTab, page, classId, router]); // Remove checkSession and isAuthenticated

    // Fetch home learning progress - fetch ALL data then paginate client-side
    useEffect(() => {
        if (activeTab !== 'learning') return;

        const fetchHomeLearning = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const token = typeof window !== 'undefined'
                    ? localStorage.getItem('authToken')
                    : null;

                if (!token) {
                    router.push('/login');
                    return;
                }

                // Fetch ALL data (service now returns all records)
                const allData = await studentService.getHomeLearningProgress(
                    token,
                    classId,
                    selectedDate
                );

                // Sort: null completion/score first, then others
                const sorted = [...allData].sort((a, b) => {
                    const aIsNull = a.appCompletion === null || a.appScore === null;
                    const bIsNull = b.appCompletion === null || b.appScore === null;

                    if (aIsNull && !bIsNull) return -1; // a goes first
                    if (!aIsNull && bIsNull) return 1;  // b goes first
                    return 0; // maintain order
                });

                // Calculate pagination
                const total = sorted.length;
                const totalPagesCalc = Math.ceil(total / pageSize);
                setTotalPages(totalPagesCalc);

                // Apply client-side pagination
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const paginatedData = sorted.slice(startIndex, endIndex);

                setHomeLearning(paginatedData);
            } catch (err) {
                const errorMessage = err instanceof Error
                    ? err.message
                    : 'Failed to fetch home learning progress';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHomeLearning();
    }, [activeTab, page, selectedDate, classId, router, pageSize]); // Add pageSize to deps

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        setPage(1); // Reset to page 1 when switching tabs
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        setPage(1); // Reset to page 1 when changing date
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header with Tab Switch */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="text-blue-600 hover:text-blue-800 mb-2 inline-flex items-center gap-1"
                        >
                            ← Back to Classes
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Class Details
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Date Picker (only visible on Home Learning tab) */}
                        {activeTab === 'learning' && (
                            <div className="flex items-center gap-2">
                                <label htmlFor="date-picker" className="text-sm font-medium text-gray-900">
                                    Select Date:
                                </label>
                                <input
                                    id="date-picker"
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    max={getMaxDate()}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        )}

                        {/* Tab Switch */}
                        <TabSwitch
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                    </div>
                </div>

                {/* Error Toast */}
                {error && (
                    <ErrorToast message={error} onClose={() => setError(null)} />
                )}

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <>
                        {/* Students Tab */}
                        {activeTab === 'students' && (
                            <>
                                {students.length === 0 ? (
                                    <div className="text-center py-20">
                                        <p className="text-gray-500 text-lg">
                                            No students found
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {students.map((student) => (
                                                <StudentCard
                                                    key={student.id}
                                                    student={student}
                                                />
                                            ))}
                                        </div>

                                        <Pagination
                                            currentPage={page}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                            disabled={isLoading}
                                        />
                                    </>
                                )}
                            </>
                        )}

                        {/* Home Learning Tab */}
                        {activeTab === 'learning' && (
                            <>
                                {homeLearning.length === 0 ? (
                                    <div className="text-center py-20">
                                        <p className="text-gray-500 text-lg">
                                            No learning progress found for{' '}
                                            {new Date(selectedDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 gap-6">
                                            {homeLearning.map((data) => (
                                                <HomeLearningCard
                                                    key={data.id}
                                                    data={data}
                                                />
                                            ))}
                                        </div>

                                        <Pagination
                                            currentPage={page}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                            disabled={isLoading}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
