import { mockOrders, orderStatuses } from '@/data/orders'
import { formatCurrency, formatDate } from '@/utils/format'
import Badge from '@/components/ui/Badge'

export default function RecentOrdersTable() {
  const recentOrders = mockOrders.slice(0, 5)

  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Pedidos recientes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <th className="px-5 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Pedido</th>
              <th className="px-5 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Cliente</th>
              <th className="px-5 py-3 text-left font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Fecha</th>
              <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">Total</th>
              <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => {
              const status = orderStatuses[order.status]
              return (
                <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 dark:border-gray-700/50 dark:hover:bg-gray-700/50">
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{order.customer}</td>
                  <td className="px-5 py-3 text-gray-400 dark:text-gray-500 hidden sm:table-cell">{formatDate(order.date)}</td>
                  <td className="px-5 py-3 text-right font-medium text-gray-900 dark:text-white">{formatCurrency(order.total)}</td>
                  <td className="px-5 py-3 text-right">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
