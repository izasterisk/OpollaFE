'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
    const { logout, isLoading } = useAuth();
    const [userName, setUserName] = useState<string>('User');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Only read from localStorage after component mounts on client
        const name = typeof window !== 'undefined'
            ? localStorage.getItem('userName')
            : null;
        setUserName(name || 'User');
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by not rendering username until mounted
    if (!mounted) {
        return (
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-800">
                                Opolla Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 font-medium">User</span>
                            <button
                                disabled
                                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg opacity-50 cursor-not-allowed"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Opolla Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700 font-medium">
                            {userName}
                        </span>
                        <button
                            onClick={logout}
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            {isLoading ? 'Đang đăng xuất...' : 'Đăng xuất'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
