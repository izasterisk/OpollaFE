/**
 * Home Page
 * ==========
 * Redirects to dashboard if authenticated, otherwise to login.
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthData, isSessionExpired } from '@/utils/auth.utils';

export default function HomePage(): React.ReactElement {
    const router = useRouter();

    useEffect(() => {
        const authData = getAuthData();
        if (authData && !isSessionExpired()) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, [router]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="text-center">
                <p className="text-lg text-slate-600">Redirecting...</p>
            </div>
        </main>
    );
}
