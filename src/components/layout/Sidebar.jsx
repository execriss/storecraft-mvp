import { Link, useLocation } from 'react-router'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  ExternalLink,
  Zap,
  ChevronLeft,
  X,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const menuItems = [
  { label: 'Inicio', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Productos', href: '/dashboard/products', icon: Package },
  { label: 'Pedidos', href: '/dashboard/orders', icon: ShoppingCart },
  { label: 'Configuracion', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar({ collapsed, onToggle, onCloseMobile }) {
  const location = useLocation()

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile()
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-gray-100 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900',
        collapsed ? 'w-[68px]' : 'w-64'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex h-16 items-center border-b border-gray-100 dark:border-gray-800',
          collapsed ? 'justify-center px-2' : 'justify-between px-4'
        )}
      >
        <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden" onClick={handleNavClick}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 dark:bg-white">
            <Zap size={18} className="text-white dark:text-gray-900" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-gray-900 dark:text-white truncate">
              StoreCraft
            </span>
          )}
        </Link>
        {/* Close button - mobile */}
        <button
          onClick={onCloseMobile}
          className="flex lg:hidden h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer"
        >
          <X size={16} />
        </button>
        {/* Collapse button - desktop (only when expanded) */}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            onClick={onToggle}
            className="hidden lg:flex w-full items-center justify-center rounded-lg px-3 py-2.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer mb-1"
          >
            <ChevronLeft size={20} className="rotate-180" />
          </button>
        )}
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === '/dashboard'
              ? location.pathname === '/dashboard'
              : location.pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={handleNavClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
              )}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-3">
        <Link
          to="/preview/vogue"
          target="_blank"
          onClick={handleNavClick}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
          )}
        >
          <ExternalLink size={20} className="shrink-0" />
          {!collapsed && <span>Ver mi tienda</span>}
        </Link>
      </div>
    </aside>
  )
}
