export type Tab = 'students' | 'learning';

export interface TabSwitchProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

export function TabSwitch({ activeTab, onTabChange }: TabSwitchProps) {
    return (
        <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
                onClick={() => onTabChange('students')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'students'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Students List
            </button>
            <button
                onClick={() => onTabChange('learning')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'learning'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Home Learning
            </button>
        </div>
    );
}
