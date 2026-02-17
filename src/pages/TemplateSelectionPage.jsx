import { Sparkles } from 'lucide-react'
import TemplateGrid from '@/components/template-selector/TemplateGrid'

export default function TemplateSelectionPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
            <Sparkles size={14} />
            <span>3 plantillas profesionales</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Elegí tu plantilla ideal
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Cada diseño está optimizado para tu rubro. Elegí una, personalizala
            y empezá a vender.
          </p>
        </div>

        {/* Grid */}
        <TemplateGrid />
      </div>
    </div>
  )
}
