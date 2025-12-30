import { ReactNode } from 'react';

export interface CardProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

export function Card({ children, onClick, className = '' }: CardProps) {
    const clickableClasses = onClick
        ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200'
        : '';

    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-lg border border-gray-200 shadow-md p-5 ${clickableClasses} ${className}`}
        >
            {children}
        </div>
    );
}
