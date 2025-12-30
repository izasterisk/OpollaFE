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
        <Card>
            <div className="flex items-start gap-4">
                {/* Avatar */}
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                    />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {displayName}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {/* Skill */}
                        <div>
                            <span className="text-gray-600">Skill:</span>
                            <p className="font-medium text-gray-900 capitalize">
                                {data.skill.toLowerCase().replace('_', ' ')}
                            </p>
                        </div>

                        {/* Unit */}
                        {data.unitName && (
                            <div>
                                <span className="text-gray-600">Unit:</span>
                                <p className="font-medium text-gray-900">{data.unitName}</p>
                            </div>
                        )}

                        {/* Completion */}
                        <div>
                            <span className="text-gray-600">Completion:</span>
                            <p className={`font-semibold ${data.appCompletion === 100 ? 'text-green-600' :
                                    data.appCompletion !== null ? 'text-yellow-600' :
                                        'text-gray-400'
                                }`}>
                                {formatPercentage(data.appCompletion)}
                            </p>
                        </div>

                        {/* Score */}
                        <div>
                            <span className="text-gray-600">Score:</span>
                            <p className={`font-semibold ${data.appScore !== null && data.appScore >= 75 ? 'text-green-600' :
                                    data.appScore !== null ? 'text-yellow-600' :
                                        'text-gray-400'
                                }`}>
                                {formatPercentage(data.appScore)}
                            </p>
                        </div>

                        {/* Time */}
                        <div>
                            <span className="text-gray-600">Time Spent:</span>
                            <p className="font-medium text-gray-900">
                                {formatSeconds(data.appTime)}
                            </p>
                        </div>

                        {/* Last Accessed */}
                        {data.lastAccessedAt && (
                            <div>
                                <span className="text-gray-600">Last Access:</span>
                                <p className="text-xs text-gray-700">
                                    {new Date(data.lastAccessedAt).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Completed badge */}
                    {data.completedAt && (
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ Completed
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
