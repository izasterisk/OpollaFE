import { Card } from '../shared/Card';
import { formatSeconds, formatPercentage } from '@/utils';
import type { HomeLearningDTO } from '@/types';

export interface HomeLearningCardProps {
    data: HomeLearningDTO;
}

export function HomeLearningCard({ data }: HomeLearningCardProps) {
    const avatarUrl = data.studentAvatar;
    const displayName = data.studentName;

    return (
        <Card className="py-3">
            <div className="flex items-center gap-4">
                {/* Avatar */}
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                )}

                {/* Name */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                        {displayName}
                    </h3>
                </div>

                {/* Metrics - Horizontal */}
                <div className="flex items-center gap-6 text-sm">
                    {/* Completion */}
                    <div className="text-center">
                        <span className="text-gray-600 text-xs block">Completion</span>
                        <p className={`font-semibold ${data.appCompletion === 100 ? 'text-green-600' :
                                data.appCompletion !== null ? 'text-yellow-600' :
                                    'text-gray-400'
                            }`}>
                            {formatPercentage(data.appCompletion)}
                        </p>
                    </div>

                    {/* Score */}
                    <div className="text-center">
                        <span className="text-gray-600 text-xs block">Score</span>
                        <p className={`font-semibold ${data.appScore !== null && data.appScore >= 75 ? 'text-green-600' :
                                data.appScore !== null ? 'text-yellow-600' :
                                    'text-gray-400'
                            }`}>
                            {formatPercentage(data.appScore)}
                        </p>
                    </div>

                    {/* Time Spent */}
                    <div className="text-center min-w-[80px]">
                        <span className="text-gray-600 text-xs block">Time Spent</span>
                        <p className="font-medium text-gray-900">
                            {formatSeconds(data.appTime)}
                        </p>
                    </div>

                    {/* Completed Badge */}
                    <div className="flex-shrink-0">
                        {data.completedAt ? (
                            <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ✓ Completed
                            </div>
                        ) : (
                            <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                Incomplete
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
