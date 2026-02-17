import { Check } from 'lucide-react'
import { pricingPlans } from '@/data/pricing-plans'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'

export default function PricingSection() {
  return (
    <section id="precios" className="py-20 sm:py-28 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Precios
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Planes simples y transparentes
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Sin costos ocultos. Cancela cuando quieras.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3 items-start">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative rounded-2xl border p-8 transition-all duration-300',
                plan.highlighted
                  ? 'border-violet-200 bg-white shadow-xl shadow-violet-100/50 lg:scale-105 z-10 dark:border-violet-800 dark:bg-gray-800 dark:shadow-violet-900/20'
                  : 'border-gray-200 bg-white hover:shadow-lg dark:border-gray-700 dark:bg-gray-800'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1 text-sm font-medium text-white">
                    Más popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  ${plan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
              </div>

              <Button
                variant={plan.highlighted ? 'primary' : 'secondary'}
                className={cn('mt-6 w-full', plan.highlighted && 'bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:text-white dark:hover:bg-violet-700')}
              >
                {plan.cta}
              </Button>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={cn(
                        'shrink-0 mt-0.5',
                        plan.highlighted ? 'text-violet-600 dark:text-violet-400' : 'text-emerald-500'
                      )}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
