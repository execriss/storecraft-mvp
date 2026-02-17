import { Link } from 'react-router'
import { ArrowRight, Eye, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function TemplateCard({ template }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 transition-all duration-300">
      {/* Preview image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={template.previewImage}
          alt={`Plantilla ${template.name}`}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover actions */}
        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Link to={`/preview/${template.id}`} target="_blank">
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

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{template.name}</h3>
          <Badge>{template.category}</Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {template.description}
        </p>

        {/* Features */}
        <ul className="mt-4 space-y-1.5">
          {template.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Check size={14} className="text-emerald-500 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Color palette */}
        <div className="mt-5 flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">Paleta:</span>
            <div className="flex gap-1">
              {Object.values(template.defaultColors).map((color, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <Link
            to={`/templates/${template.id}/customize`}
            className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 flex items-center gap-1"
          >
            Elegir
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
