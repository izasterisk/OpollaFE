export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    disabled = false,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const canGoPrevious = currentPage > 1 && !disabled;
    const canGoNext = currentPage < totalPages && !disabled;

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrevious}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
                Previous
            </button>

            <span className="px-4 py-2 text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
                Next
            </button>
        </div>
    );
}
