import { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import DashboardTopbar from '@/components/dashboard/DashboardTopbar'
import { cn } from '@/utils/cn'

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - mobile */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 lg:hidden transform transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar
          collapsed={false}
          onToggle={() => setMobileOpen(false)}
          onCloseMobile={() => setMobileOpen(false)}
        />
      </div>

      {/* Sidebar - desktop */}
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Main content */}
      <div
        className={cn(
          'transition-all duration-300',
          collapsed ? 'lg:ml-[68px]' : 'lg:ml-64'
        )}
      >
        <DashboardTopbar onMenuToggle={() => setMobileOpen(true)} />
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
