import { ShoppingBag, Menu } from 'lucide-react'
import useCustomizationStore from '@/stores/useCustomizationStore'
import useCartStore from '@/stores/useCartStore'

export default function StoreNavbar() {
  const storeName = useCustomizationStore((s) => s.storeName)
  const logoUrl = useCustomizationStore((s) => s.logoUrl)
  const items = useCartStore((s) => s.items)
  const toggleCart = useCartStore((s) => s.toggleCart)

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <header
      className="sticky top-0 z-20 border-b backdrop-blur-lg"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-background) 85%, transparent)',
        borderColor: 'color-mix(in srgb, var(--color-text) 10%, transparent)',
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo + name */}
        <div className="flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="" className="h-7 w-7 rounded object-contain" />
          ) : (
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-background)',
              }}
            >
              {storeName.charAt(0)}
            </div>
          )}
          <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
            {storeName}
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          {['Inicio', 'Productos', 'Contacto'].map((link) => (
            <span
              key={link}
              className="text-sm cursor-pointer opacity-70 hover:opacity-100"
              style={{ color: 'var(--color-text)' }}
            >
              {link}
            </span>
          ))}
        </nav>

        {/* Cart + mobile menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCart}
            className="relative rounded-lg p-2 hover:opacity-80 cursor-pointer"
            style={{ color: 'var(--color-text)' }}
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-background)',
                }}
              >
                {itemCount}
              </span>
            )}
          </button>
          <button
            className="sm:hidden rounded-lg p-2 cursor-pointer"
            style={{ color: 'var(--color-text)' }}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
