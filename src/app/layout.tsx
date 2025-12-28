/**
 * Root Layout
 * ============
 * The root layout wraps all pages in the application.
 * This is where you add global providers, fonts, and metadata.
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Opolla',
        template: '%s | Opolla',
    },
    description: 'Opolla Frontend Application',
    keywords: ['opolla', 'next.js', 'react'],
    authors: [{ name: 'Opolla Team' }],
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
    return (
        <html lang="en" className={inter.variable}>
            <body className="min-h-screen bg-white antialiased dark:bg-slate-900">
                {/* Add global providers here (e.g., AuthProvider, ThemeProvider) */}
                {children}
            </body>
        </html>
    );
}
