/**
 * Format seconds to human-readable time string
 * Handles large values (billions of seconds)
 * @param seconds - Time in seconds (can be very large)
 * @returns Formatted string like "2h 30m" or "45m 20s" or "------" if null
 */
export function formatSeconds(seconds: number | null): string {
    if (seconds === null || seconds === undefined) {
        return '------';
    }

    // Handle edge cases
    if (seconds === 0) return '0s';
    if (seconds < 0) return '------';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts: string[] = [];

    if (hours > 0) {
        parts.push(`${hours}h`);
    }
    if (minutes > 0) {
        parts.push(`${minutes}m`);
    }
    if (secs > 0 && hours === 0) { // Only show seconds if less than 1 hour
        parts.push(`${secs}s`);
    }

    return parts.length > 0 ? parts.join(' ') : '0s';
}

/**
 * Format percentage value
 * @param value - Percentage value (0-100) or null
 * @returns Formatted string like "85%" or "------" if null
 */
export function formatPercentage(value: number | null): string {
    if (value === null || value === undefined) {
        return '------';
    }
    return `${Math.round(value)}%`;
}

/**
 * Format date to YYYY-MM-DD
 * @param date - Date object or ISO string
 * @returns Formatted date string
 */
export function formatDateToYYYYMMDD(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Get today's date in UTC+7 timezone in YYYY-MM-DD format
 */
export function getTodayUTC7(): string {
    const now = new Date();
    // Add 7 hours for UTC+7
    const utc7Date = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    return formatDateToYYYYMMDD(utc7Date);
}

/**
 * Format ISO date string to readable format
 * @param isoString - ISO date string
 * @returns Formatted date like "Dec 30, 2025"
 */
export function formatDate(isoString: string | null): string {
    if (!isoString) return '------';

    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

/**
 * Get max date for date picker (today in YYYY-MM-DD format)
 */
export function getMaxDate(): string {
    return formatDateToYYYYMMDD(new Date());
}
