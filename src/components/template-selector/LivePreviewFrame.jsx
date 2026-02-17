import { Monitor, Tablet, Smartphone } from 'lucide-react'
import useCustomizationStore from '@/stores/useCustomizationStore'
import StoreNavbar from '@/components/store-templates/shared/StoreNavbar'
import StoreFooter from '@/components/store-templates/shared/StoreFooter'
import CartDrawer from '@/components/store-templates/shared/CartDrawer'
import VogueHome from '@/components/store-templates/vogue/VogueHome'
import ByteStoreHome from '@/components/store-templates/bytestore/ByteStoreHome'
import FreshMarketHome from '@/components/store-templates/freshmarket/FreshMarketHome'
import { cn } from '@/utils/cn'

const devices = [
  { id: 'desktop', icon: Monitor, label: 'Desktop' },
  { id: 'tablet', icon: Tablet, label: 'Tablet' },
  { id: 'mobile', icon: Smartphone, label: 'Móvil' },
]

const deviceWidths = {
  desktop: 'w-full max-w-full',
  tablet: 'w-full max-w-[768px]',
  mobile: 'w-full max-w-[375px]',
}

const templateComponents = {
  vogue: VogueHome,
  bytestore: ByteStoreHome,
  freshmarket: FreshMarketHome,
}

export default function LivePreviewFrame({ templateId }) {
  const colors = useCustomizationStore((s) => s.colors)
  const previewDevice = useCustomizationStore((s) => s.previewDevice)
  const setPreviewDevice = useCustomizationStore((s) => s.setPreviewDevice)

  const TemplateComponent = templateComponents[templateId]

  const cssVars = {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
    '--color-background': colors.background,
    '--color-text': colors.text,
  }

  return (
    <div className="flex h-full flex-col bg-gray-100 dark:bg-gray-950">
      {/* Device toolbar */}
      <div className="flex items-center justify-center gap-1 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 py-2.5">
        {devices.map((device) => {
          const Icon = device.icon
          return (
            <button
              key={device.id}
              onClick={() => setPreviewDevice(device.id)}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer',
                previewDevice === device.id
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
              )}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{device.label}</span>
            </button>
          )
        })}
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto p-2 sm:p-4 flex justify-center">
        <div
          className={cn(
            'mx-auto overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300',
            deviceWidths[previewDevice],
            previewDevice !== 'desktop' && 'max-h-full'
          )}
          style={{
            ...cssVars,
            backgroundColor: 'var(--color-background)',
          }}
        >
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <StoreNavbar />
            {TemplateComponent && <TemplateComponent />}
            <StoreFooter />
          </div>
          <CartDrawer />
        </div>
      </div>
    </div>
  )
}
