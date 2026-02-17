import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import useCartStore from '@/stores/useCartStore'
import { formatCurrency } from '@/utils/format'

export default function CartDrawer() {
  const items = useCartStore((s) => s.items)
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className="flex items-center justify-between border-b px-5 py-4"
            style={{ borderColor: 'color-mix(in srgb, var(--color-text) 10%, transparent)' }}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} style={{ color: 'var(--color-text)' }} />
              <h2 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                Carrito ({items.length})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-lg p-1.5 hover:opacity-70 cursor-pointer"
              style={{ color: 'var(--color-text)' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center opacity-40">
                <ShoppingBag size={40} style={{ color: 'var(--color-text)' }} />
                <p className="mt-3 text-sm" style={{ color: 'var(--color-text)' }}>
                  Tu carrito está vacío
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-lg border p-3"
                    style={{ borderColor: 'color-mix(in srgb, var(--color-text) 10%, transparent)' }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
                        {item.name}
                      </p>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--color-accent)' }}>
                        {formatCurrency(item.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded border cursor-pointer"
                          style={{
                            borderColor: 'color-mix(in srgb, var(--color-text) 20%, transparent)',
                            color: 'var(--color-text)',
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm w-5 text-center" style={{ color: 'var(--color-text)' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded border cursor-pointer"
                          style={{
                            borderColor: 'color-mix(in srgb, var(--color-text) 20%, transparent)',
                            color: 'var(--color-text)',
                          }}
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-xs opacity-40 hover:opacity-70 cursor-pointer"
                          style={{ color: 'var(--color-text)' }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div
              className="border-t px-5 py-4 space-y-3"
              style={{ borderColor: 'color-mix(in srgb, var(--color-text) 10%, transparent)' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium" style={{ color: 'var(--color-text)' }}>Total</span>
                <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                  {formatCurrency(total)}
                </span>
              </div>
              <button
                className="w-full rounded-lg py-2.5 text-sm font-medium cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-background)',
                }}
              >
                Finalizar compra
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
