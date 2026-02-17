import { Cpu, Headphones, Monitor, Gamepad2 } from 'lucide-react'
import { productsByTemplate } from '@/data/products'
import ProductCard from '../shared/ProductCard'

const categories = [
  { name: 'Audio', icon: Headphones },
  { name: 'Periféricos', icon: Gamepad2 },
  { name: 'Monitores', icon: Monitor },
  { name: 'Componentes', icon: Cpu },
]

export default function ByteStoreHome() {
  const products = productsByTemplate.bytestore

  return (
    <div>
      {/* Hero - tech style */}
      <section className="relative py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-10 right-10 h-64 w-64 rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          <div
            className="absolute bottom-10 left-10 h-48 w-48 rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-medium mb-4"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)',
              color: 'var(--color-accent)',
            }}
          >
            Ofertas de temporada
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--color-text)' }}>
            Tecnología que{' '}
            <span style={{ color: 'var(--color-accent)' }}>inspira</span>
          </h1>
          <p className="mt-4 text-base opacity-60 max-w-xl mx-auto" style={{ color: 'var(--color-text)' }}>
            Los mejores gadgets y periféricos para potenciar tu setup. Envíos a todo el país.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.name}
                className="flex items-center gap-3 rounded-xl p-4 cursor-pointer hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-secondary)',
                }}
              >
                <Icon size={20} style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {cat.name}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
            Productos destacados
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
