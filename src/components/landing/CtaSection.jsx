import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function CtaSection() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 dark:bg-gray-800 px-8 py-16 sm:px-16 sm:py-24">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              ¿Listo para crear tu tienda?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Unite a más de 500 emprendedores que ya venden online con StoreCraft.
              Empezá gratis, sin tarjeta de crédito.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/templates">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 text-base px-8"
                >
                  Empezar ahora
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Setup en menos de 5 minutos · Sin código · Cancelá cuando quieras
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
