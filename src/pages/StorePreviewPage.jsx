import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { getTemplateById } from '@/data/templates'
import useCustomizationStore from '@/stores/useCustomizationStore'
import StoreNavbar from '@/components/store-templates/shared/StoreNavbar'
import StoreFooter from '@/components/store-templates/shared/StoreFooter'
import CartDrawer from '@/components/store-templates/shared/CartDrawer'
import VogueHome from '@/components/store-templates/vogue/VogueHome'
import ByteStoreHome from '@/components/store-templates/bytestore/ByteStoreHome'
import FreshMarketHome from '@/components/store-templates/freshmarket/FreshMarketHome'

const templateComponents = {
  vogue: VogueHome,
  bytestore: ByteStoreHome,
  freshmarket: FreshMarketHome,
}

export default function StorePreviewPage() {
  const { templateId } = useParams()
  const selectTemplate = useCustomizationStore((s) => s.selectTemplate)
  const selectedTemplateId = useCustomizationStore((s) => s.selectedTemplateId)
  const colors = useCustomizationStore((s) => s.colors)
  const template = getTemplateById(templateId)

  useEffect(() => {
    if (template && selectedTemplateId !== templateId) {
      selectTemplate(templateId)
    }
  }, [templateId, template, selectedTemplateId, selectTemplate])

  if (!template) {
    return <Navigate to="/templates" replace />
  }

  const TemplateComponent = templateComponents[templateId]

  const cssVars = {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
    '--color-background': colors.background,
    '--color-text': colors.text,
  }

  return (
    <div style={{ ...cssVars, backgroundColor: 'var(--color-background)' }}>
      {/* Preview banner */}
      <div className="sticky top-0 z-30 flex items-center justify-center gap-3 bg-gray-900 px-4 py-2 text-sm text-white">
        <span>Esta es una vista previa de la plantilla <strong>{template.name}</strong></span>
        <Link
          to={`/templates/${templateId}/customize`}
          className="inline-flex items-center gap-1 rounded-md bg-white/10 px-3 py-1 text-xs font-medium hover:bg-white/20"
        >
          <ArrowLeft size={12} />
          Volver al editor
        </Link>
      </div>

      <StoreNavbar />
      {TemplateComponent && <TemplateComponent />}
      <StoreFooter />
      <CartDrawer />
    </div>
  )
}
