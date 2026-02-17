import { Link } from 'react-router'
import { ArrowLeft, RotateCcw, Zap, X } from 'lucide-react'
import useCustomizationStore from '@/stores/useCustomizationStore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ColorPicker from '@/components/ui/ColorPicker'
import LogoUploader from './LogoUploader'

const colorLabels = {
  primary: 'Primario',
  secondary: 'Secundario',
  accent: 'Acento',
  background: 'Fondo',
  text: 'Texto',
}

export default function CustomizationPanel({ onClose }) {
  const storeName = useCustomizationStore((s) => s.storeName)
  const colors = useCustomizationStore((s) => s.colors)
  const setStoreName = useCustomizationStore((s) => s.setStoreName)
  const setColor = useCustomizationStore((s) => s.setColor)
  const resetColors = useCustomizationStore((s) => s.resetColors)

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <Link to="/templates" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-900 dark:bg-white">
              <Zap size={14} className="text-white dark:text-gray-900" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white text-sm">StoreCraft</span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 md:hidden cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        {/* Store name */}
        <Input
          label="Nombre de la tienda"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Mi Tienda"
        />

        {/* Logo */}
        <LogoUploader />

        {/* Colors */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Colores</label>
            <button
              onClick={resetColors}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
            >
              <RotateCcw size={12} />
              Resetear
            </button>
          </div>
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
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-4">
        <Link to="/dashboard">
          <Button className="w-full bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:text-white dark:hover:bg-violet-700">
            Continuar al dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
