import { productsByTemplate } from '@/data/products'
import StoreHero from '../shared/StoreHero'
import ProductCard from '../shared/ProductCard'

export default function VogueHome() {
  const products = productsByTemplate.vogue

  return (
    <div>
      <StoreHero
        image="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80"
        title="Nueva Colección Otoño"
        subtitle="Descubrí las tendencias que van a definir la temporada. Elegancia atemporal con un toque moderno."
        align="center"
      />

      {/* Products section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-widest opacity-50" style={{ color: 'var(--color-text)' }}>
              Selección curada
            </p>
            <h2 className="mt-2 text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
              Lo más destacado
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature banner */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      >
        <div className="mx-auto max-w-6xl grid sm:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Envío gratis', desc: 'En compras mayores a $50' },
            { title: 'Devolución fácil', desc: '30 días para cambios' },
            { title: 'Pago seguro', desc: 'Todas las tarjetas' },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>
                {item.title}
              </h3>
              <p className="mt-1 text-xs opacity-50" style={{ color: 'var(--color-text)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
