import { Card } from '../shared/Card';
import type { StudentDTO } from '@/types';

export interface StudentCardProps {
    student: StudentDTO;
}

export function StudentCard({ student }: StudentCardProps) {
    const avatarUrl = student.avatar?.url;
    const displayName = student.nickName || student.name;

    return (
        <Card>
            <div className="flex items-center gap-4">
                {/* Avatar */}
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {displayName}
                    </h3>

                    <div className="space-y-1 mt-2">
                        {student.nickName && (
                            <p className="text-sm text-gray-600">
                                Full name: <span className="text-gray-900">{student.name}</span>
                            </p>
                        )}

                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600">
                                Gender: <span className="text-gray-900 capitalize">{student.gender.toLowerCase()}</span>
                            </span>
                            <span className="text-gray-600">
                                Code: <span className="text-gray-900 font-mono text-xs">{student.code}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
