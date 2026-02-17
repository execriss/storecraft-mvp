import { templates } from '@/data/templates'
import TemplateCard from './TemplateCard'

export default function TemplateGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  )
}
