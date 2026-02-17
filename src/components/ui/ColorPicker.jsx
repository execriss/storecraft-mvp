import { cn } from '@/utils/cn'

export default function ColorPicker({
  label,
  value,
  onChange,
  className,
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div
          className="h-9 w-9 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
          style={{ backgroundColor: value }}
        />
      </div>
      <div className="flex-1">
        {label && (
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
        )}
        <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          {value}
        </span>
      </div>
    </div>
  )
}
