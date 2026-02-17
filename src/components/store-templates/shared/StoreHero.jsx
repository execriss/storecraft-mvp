export default function StoreHero({ image, title, subtitle, align = 'center' }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[50vh] min-h-[360px]">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div
          className={`absolute inset-0 flex flex-col justify-center px-6 sm:px-12 ${
            align === 'center' ? 'items-center text-center' : 'items-start text-left'
          }`}
        >
          <h1
            className="text-3xl font-bold sm:text-4xl lg:text-5xl max-w-2xl"
            style={{ color: 'var(--color-background)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-3 text-base sm:text-lg max-w-xl opacity-90"
              style={{ color: 'var(--color-background)' }}
            >
              {subtitle}
            </p>
          )}
          <button
            className="mt-6 rounded-lg px-6 py-2.5 text-sm font-medium cursor-pointer"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-background)',
            }}
          >
            Ver colección
          </button>
        </div>
      </div>
    </section>
  )
}
