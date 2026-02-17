import { salesByMonth } from '@/data/dashboard-stats'
import { formatNumber } from '@/utils/format'

export default function SalesChart() {
  const maxValue = Math.max(...salesByMonth.map((d) => d.value))

  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6">
        Ventas por mes
      </h3>
      <div className="flex items-end gap-2 sm:gap-3 h-48">
        {salesByMonth.map((item, i) => {
          const height = (item.value / maxValue) * 100
          const isLast = i === salesByMonth.length - 1
          return (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium truncate w-full text-center">
                ${formatNumber(Math.round(item.value / 1000))}k
              </span>
              <div className="w-full relative" style={{ height: '100%' }}>
                <div
                  className={`absolute bottom-0 w-full rounded-t-md transition-all duration-500 ${
                    isLast
                      ? 'bg-gradient-to-t from-violet-600 to-violet-400'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className={`text-[10px] sm:text-xs ${isLast ? 'font-semibold text-violet-600 dark:text-violet-400' : 'text-gray-400 dark:text-gray-500'}`}>
                {item.month}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
