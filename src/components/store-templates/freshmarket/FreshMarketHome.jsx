import { Truck, Leaf, Clock } from 'lucide-react'
import { productsByTemplate } from '@/data/products'
import StoreHero from '../shared/StoreHero'
import ProductCard from '../shared/ProductCard'

export default function FreshMarketHome() {
  const products = productsByTemplate.freshmarket

  return (
    <div>
      <StoreHero
        image="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80"
        title="Del campo a tu mesa"
        subtitle="Productos orgánicos y artesanales seleccionados con cuidado. Frescos cada día."
        align="center"
      />

      {/* Delivery banner */}
      <section
        className="py-6 px-4 sm:px-6"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {[
            { icon: Truck, text: 'Envío en el día' },
            { icon: Leaf, text: '100% Orgánico' },
            { icon: Clock, text: 'Pedí hasta las 18hs' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.text} className="flex items-center gap-2">
                <Icon size={18} style={{ color: 'var(--color-secondary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
              Nuestros productos
            </h2>
            <p className="mt-2 text-sm opacity-60" style={{ color: 'var(--color-text)' }}>
              Seleccionados cuidadosamente de productores locales
            </p>
          </div>
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
