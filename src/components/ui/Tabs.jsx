import { cn } from '@/utils/cn'

export default function Tabs({ tabs, activeTab, onChange, className }) {
  return (
    <div className={cn('border-b border-gray-200 dark:border-gray-700', className)}>
      <nav className="flex gap-1 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium rounded-t-lg cursor-pointer',
              'border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
