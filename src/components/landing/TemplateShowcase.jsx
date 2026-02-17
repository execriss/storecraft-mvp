import { Link } from 'react-router'
import { ArrowRight, Eye } from 'lucide-react'
import { templates } from '@/data/templates'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function TemplateShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Plantillas
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Diseños profesionales para cada rubro
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Cada plantilla está optimizada para convertir visitantes en clientes.
          </p>
        </div>

        {/* Templates grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 transition-all duration-300"
            >
              {/* Preview image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={template.previewImage}
                  alt={`Plantilla ${template.name}`}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover overlay actions */}
                <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <Link to={`/preview/${template.id}`}>
                      <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm">
                        <Eye size={16} />
                        Vista previa
                      </Button>
                    </Link>
                    <Link to={`/templates/${template.id}/customize`}>
                      <Button size="sm">
                        Personalizar
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <Badge>{template.category}</Badge>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {template.description}
                </p>

                {/* Color palette preview */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-gray-400 dark:text-gray-500">Colores:</span>
                  <div className="flex gap-1">
                    {Object.values(template.defaultColors).map((color, i) => (
                      <div
                        key={i}
                        className="h-5 w-5 rounded-full border border-gray-200 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/templates">
            <Button variant="secondary" size="lg">
              Ver todas las plantillas
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
