import { Save } from 'lucide-react'
import { toast } from 'sonner'
import useCustomizationStore from '@/stores/useCustomizationStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ColorPicker from '@/components/ui/ColorPicker'

const colorLabels = {
  primary: 'Primario',
  secondary: 'Secundario',
  accent: 'Acento',
  background: 'Fondo',
  text: 'Texto',
}

export default function DashboardSettingsPage() {
  const storeName = useCustomizationStore((s) => s.storeName)
  const logoUrl = useCustomizationStore((s) => s.logoUrl)
  const colors = useCustomizationStore((s) => s.colors)
  const setStoreName = useCustomizationStore((s) => s.setStoreName)
  const setColor = useCustomizationStore((s) => s.setColor)

  function handleSave() {
    toast.success('Configuración guardada correctamente')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuración</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ajustes generales de tu tienda</p>
        </div>
        <Button onClick={handleSave}>
          <Save size={18} />
          Guardar
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General */}
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">General</h2>
          <div className="space-y-4">
            <Input
              label="Nombre de la tienda"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Logo actual
              </label>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-16 w-16 rounded-lg border border-gray-200 dark:border-gray-600 object-contain p-1" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600 text-gray-300 dark:text-gray-500 text-xs">
                  Sin logo
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Colores de la tienda</h2>
          <div className="space-y-3">
            {Object.entries(colors).map(([key, value]) => (
              <ColorPicker
                key={key}
                label={colorLabels[key]}
                value={value}
                onChange={(v) => setColor(key, v)}
              />
            ))}
          </div>

          {/* Color preview */}
          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Vista previa</p>
            <div
              className="rounded-lg p-4 border"
              style={{
                backgroundColor: colors.background,
                borderColor: `${colors.text}20`,
              }}
            >
              <p className="text-sm font-medium" style={{ color: colors.text }}>
                {storeName}
              </p>
              <div className="mt-2 flex gap-2">
                <span
                  className="rounded px-2 py-1 text-xs"
                  style={{ backgroundColor: colors.primary, color: colors.background }}
                >
                  Primario
                </span>
                <span
                  className="rounded px-2 py-1 text-xs"
                  style={{ backgroundColor: colors.accent, color: colors.background }}
                >
                  Acento
                </span>
                <span
                  className="rounded px-2 py-1 text-xs"
                  style={{ backgroundColor: colors.secondary, color: colors.text }}
                >
                  Secundario
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
