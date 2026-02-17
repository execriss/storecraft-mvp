import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react'
import { dashboardStats } from '@/data/dashboard-stats'
import StatsCard from '@/components/dashboard/StatsCard'
import SalesChart from '@/components/dashboard/SalesChart'
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable'

const statIcons = {
  revenue: DollarSign,
  orders: ShoppingCart,
  products: Package,
  visitors: Users,
}

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Vista general de tu tienda</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            format={stat.format}
            icon={statIcons[stat.id]}
          />
        ))}
      </div>

      {/* Chart + Recent orders */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SalesChart />
        <RecentOrdersTable />
      </div>
    </div>
  )
}
