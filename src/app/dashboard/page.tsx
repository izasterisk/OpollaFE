'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { ClassCard, Spinner, ErrorToast, Pagination } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { classService } from '@/services';
import type { ClassDTO } from '@/types';

export default function DashboardPage() {
    const router = useRouter();
    const { checkSession, isAuthenticated } = useAuth();

    const [classes, setClasses] = useState<ClassDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        // Check session on mount - only once
        if (!checkSession() || !isAuthenticated) {
            router.push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty deps - run only on mount

    useEffect(() => {
        const fetchClasses = async () => {
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

                const response = await classService.getClasses(token, page, pageSize);
                setClasses(response.data);
                setTotalPages(response.totalPages);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch classes';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClasses();
    }, [page, router]); // Only depend on page and router

    const handleClassClick = (classId: number) => {
        router.push(`/class/${classId}/students` as any);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Classes</h1>
                    <p className="text-gray-600 mt-2">Select a class to view students</p>
                </div>

                {/* Error Toast */}
                {error && (
                    <ErrorToast
                        message={error}
                        onClose={() => setError(null)}
                    />
                )}

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <>
                        {/* Empty State */}
                        {classes.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No classes found</p>
                            </div>
                        ) : (
                            <>
                                {/* Class Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {classes.map((classData) => (
                                        <ClassCard
                                            key={classData.id}
                                            classData={classData}
                                            onClick={() => handleClassClick(classData.id)}
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
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
            </main>
        </div>
    );
}
