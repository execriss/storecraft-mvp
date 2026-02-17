import { ShoppingBag, Star } from 'lucide-react'
import useCartStore from '@/stores/useCartStore'
import { formatCurrency } from '@/utils/format'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  function handleAdd() {
    addItem(product)
    openCart()
  }

  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-2 left-2 rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-background)',
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Add to cart button on hover */}
        <button
          onClick={handleAdd}
          className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-background)',
          }}
        >
          <ShoppingBag size={16} />
        </button>
      </div>

      {/* Info */}
      <div>
        <p className="text-xs opacity-50 mb-0.5" style={{ color: 'var(--color-text)' }}>
          {product.category}
        </p>
        <h3 className="text-sm font-medium leading-tight" style={{ color: 'var(--color-text)' }}>
          {product.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs line-through opacity-40" style={{ color: 'var(--color-text)' }}>
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="mt-1 flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs opacity-50" style={{ color: 'var(--color-text)' }}>
              {product.rating}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
