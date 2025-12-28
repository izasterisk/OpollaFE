'use client';

import { useAuth } from '@/hooks/useAuth';

export function Header() {
    const { userName, logout, isLoading } = useAuth();

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
                            {userName || 'User'}
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
