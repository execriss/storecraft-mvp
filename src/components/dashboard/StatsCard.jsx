import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { formatCurrency, formatNumber } from '@/utils/format'

export default function StatsCard({ label, value, change, format, icon: Icon }) {
  const isPositive = change >= 0
  const formattedValue =
    format === 'currency' ? formatCurrency(value) : formatNumber(value)

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-700">
            <Icon size={18} className="text-gray-400" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{formattedValue}</p>
      <div className="mt-2 flex items-center gap-1">
        {isPositive ? (
          <TrendingUp size={14} className="text-emerald-500" />
        ) : (
          <TrendingDown size={14} className="text-red-500" />
        )}
        <span
          className={cn(
            'text-xs font-medium',
            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
          )}
        >
          {isPositive ? '+' : ''}
          {change}%
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">vs mes anterior</span>
      </div>
    </div>
  )
}
