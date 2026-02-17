import { cn } from '@/utils/cn'

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900',
          'dark:border-gray-600 dark:bg-gray-800 dark:text-white',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900',
          'dark:focus:border-white dark:focus:ring-white',
          'disabled:bg-gray-50 disabled:text-gray-500 dark:disabled:bg-gray-900',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}
