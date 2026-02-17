import { Link } from 'react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 h-[600px] w-[600px] rounded-full bg-violet-100/50 blur-3xl dark:bg-violet-900/20" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 h-[400px] w-[400px] rounded-full bg-amber-100/40 blur-3xl dark:bg-amber-900/15" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
            <Sparkles size={14} />
            <span>Nuevo: 3 plantillas profesionales disponibles</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Crea tu tienda online{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
              en minutos
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            Elige una plantilla, personaliza tu marca y empieza a vender.
            Nosotros nos encargamos del hosting, dominio y todo lo técnico.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/templates">
              <Button size="lg" className="text-base px-8">
                Empezar gratis
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/#precios">
              <Button variant="secondary" size="lg" className="text-base px-8">
                Ver precios
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  />
                ))}
              </div>
              <span>+500 tiendas creadas</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1">4.9/5 valoración</span>
            </div>
          </div>
        </div>

        {/* Hero image - mockup */}
        <div className="mt-16 sm:mt-20">
          <div className="relative mx-auto max-w-5xl">
            {/* Browser frame */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50 overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1 text-xs text-gray-400 border border-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500">
                  mitienda.storecraft.com
                </div>
              </div>
              {/* Store preview */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                  alt="Vista previa de una tienda StoreCraft"
                  className="h-full w-full object-cover"
                />
                {/* Overlay with store elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -left-4 top-1/3 hidden lg:block rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Nueva venta</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">$129.99</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-1/2 hidden lg:block rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <svg className="h-4 w-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Nuevo cliente</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">María G.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
