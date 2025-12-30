import { Card } from '../shared/Card';
import { formatDate } from '@/utils';
import type { ClassDTO } from '@/types';

export interface ClassCardProps {
    classData: ClassDTO;
    onClick: () => void;
}

export function ClassCard({ classData, onClick }: ClassCardProps) {
    return (
        <Card onClick={onClick}>
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {classData.name}
                </h3>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Code:</span>
                        <span className="font-medium text-gray-900">{classData.code}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="text-gray-900">{formatDate(classData.startDate)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">End Date:</span>
                        <span className="text-gray-900">{formatDate(classData.endDate)}</span>
                    </div>

                    {classData.closedDate && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Closed:</span>
                            <span className="text-red-600">{formatDate(classData.closedDate)}</span>
                        </div>
                    )}

                    <div className="flex justify-between pt-2 border-t border-gray-100">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-semibold text-blue-600">{classData.totalStudent}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
