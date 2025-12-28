/**
 * Home Page
 * ==========
 * Placeholder home page for the application.
 * Replace this with your actual home page implementation.
 */

export default function HomePage(): React.ReactElement {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
                    🚀 Opolla Frontend
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Next.js 16.1.1 + TypeScript + Tailwind CSS
                </p>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
                    Project scaffold complete. Start building your features!
                </p>
            </div>
        </main>
    );
}
