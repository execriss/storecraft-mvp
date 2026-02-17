import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router'
import { Settings2 } from 'lucide-react'
import { getTemplateById } from '@/data/templates'
import useCustomizationStore from '@/stores/useCustomizationStore'
import CustomizationPanel from '@/components/template-selector/CustomizationPanel'
import LivePreviewFrame from '@/components/template-selector/LivePreviewFrame'
import { cn } from '@/utils/cn'

export default function TemplateCustomizationPage() {
  const { templateId } = useParams()
  const selectTemplate = useCustomizationStore((s) => s.selectTemplate)
  const template = getTemplateById(templateId)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    if (template) {
      selectTemplate(templateId)
    }
  }, [templateId, template, selectTemplate])

  if (!template) {
    return <Navigate to="/templates" replace />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {panelOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setPanelOpen(false)}
        />
      )}

      {/* Left panel - desktop: static, mobile: slide-in drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-80 shrink-0 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900',
          'md:static md:translate-x-0',
          'transform transition-transform duration-300',
          panelOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <CustomizationPanel onClose={() => setPanelOpen(false)} />
      </div>

      {/* Right panel - live preview */}
      <div className="flex-1 min-w-0">
        <LivePreviewFrame templateId={templateId} />
      </div>

      {/* Mobile FAB to open panel */}
      <button
        onClick={() => setPanelOpen(true)}
        className="fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700 md:hidden cursor-pointer"
      >
        <Settings2 size={24} />
      </button>
    </div>
  )
}
