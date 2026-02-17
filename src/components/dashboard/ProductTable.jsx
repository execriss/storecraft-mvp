import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/utils/format'
import Badge from '@/components/ui/Badge'

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/50">
              <th className="px-5 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Producto</th>
              <th className="px-5 py-3 text-left font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Categoría</th>
              <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">Precio</th>
              <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Stock</th>
              <th className="px-5 py-3 text-right font-medium text-gray-500 dark:text-gray-400">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 dark:border-gray-700/50 dark:hover:bg-gray-700/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700" />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <Badge>{product.category || 'Sin categoría'}</Badge>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(product.price)}</span>
                  {product.originalPrice && (
                    <span className="block text-xs text-gray-400 dark:text-gray-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 text-right hidden sm:table-cell">
                  <span className={product.stock <= 5 ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-600 dark:text-gray-300'}>
                    {product.stock ?? '—'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-gray-400 dark:text-gray-500">
                  No hay productos. Creá tu primer producto.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
