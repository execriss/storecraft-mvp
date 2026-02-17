import { Palette, MousePointerClick, Rocket, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Elegí tu plantilla',
    description:
      'Explorá nuestras plantillas diseñadas por expertos para diferentes rubros. Moda, tecnología, gastronomía y más.',
    color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  },
  {
    icon: Palette,
    title: 'Personalizá tu marca',
    description:
      'Cambiá colores, logo y nombre en tiempo real. Mirá cómo queda tu tienda mientras la editás.',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
  {
    icon: Rocket,
    title: 'Publicá y vendé',
    description:
      'Con un click tu tienda está online. Dominio propio, SSL, hosting y pagos incluidos.',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  {
    icon: ShieldCheck,
    title: 'Nosotros nos encargamos',
    description:
      'Actualizaciones, seguridad, backups y soporte técnico. Vos concentrate en vender.',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Cómo funciona
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Tu tienda lista en 3 simples pasos
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            No necesitás saber programar ni diseñar. StoreCraft hace todo por vos.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-[2px] bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 -translate-x-4" />
                )}

                <div className="text-center">
                  {/* Step number + icon */}
                  <div className="relative inline-flex">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 dark:bg-white text-xs font-bold text-white dark:text-gray-900">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
