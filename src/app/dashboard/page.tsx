'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
    const router = useRouter();
    const { checkSession, isAuthenticated } = useAuth();

    useEffect(() => {
        // Check session on mount
        if (!checkSession() || !isAuthenticated) {
            router.push('/login');
        }
    }, [checkSession, isAuthenticated, router]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Empty dashboard content */}
            </main>
        </div>
    );
}
