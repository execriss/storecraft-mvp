import { useMemo } from 'react'
import useDashboardStore from '@/stores/useDashboardStore'
import { orderStatuses } from '@/data/orders'
import { formatCurrency, formatDate } from '@/utils/format'
import Badge from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

const filterOptions = [
  { id: 'all', label: 'Todos' },
  { id: 'pending', label: 'Pendientes' },
  { id: 'processing', label: 'Procesando' },
  { id: 'shipped', label: 'Enviados' },
  { id: 'delivered', label: 'Entregados' },
  { id: 'cancelled', label: 'Cancelados' },
]

export default function DashboardOrdersPage() {
  const orders = useDashboardStore((s) => s.orders)
  const orderFilter = useDashboardStore((s) => s.orderFilter)
  const setOrderFilter = useDashboardStore((s) => s.setOrderFilter)

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'all') return orders
    return orders.filter((o) => o.status === orderFilter)
  }, [orders, orderFilter])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pedidos</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {orders.length} pedido{orders.length !== 1 ? 's' : ''} en total
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setOrderFilter(option.id)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium cursor-pointer transition-colors',
              orderFilter === option.id
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/50">
                <th className="px-5 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Pedido</th>
                <th className="px-5 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Cliente</th>
                <th className="px-5 py-3 text-left font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Productos</th>
                <th className="px-5 py-3 text-left font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Fecha</th>
                <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">Total</th>
                <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const status = orderStatuses[order.status]
                return (
                  <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 dark:border-gray-700/50 dark:hover:bg-gray-700/50">
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                    <td className="px-5 py-3">
                      <p className="text-gray-900 dark:text-white">{order.customer}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{order.email}</p>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <p className="text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
                        {order.products.join(', ')}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-gray-400 dark:text-gray-500 hidden sm:table-cell">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-gray-900 dark:text-white">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                  </tr>
                )
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-400 dark:text-gray-500">
                    No hay pedidos con este filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
