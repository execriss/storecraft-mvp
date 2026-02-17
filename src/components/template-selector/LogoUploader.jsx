import { useRef } from 'react'
import { Upload, X } from 'lucide-react'
import useCustomizationStore from '@/stores/useCustomizationStore'

export default function LogoUploader() {
  const inputRef = useRef(null)
  const logoUrl = useCustomizationStore((s) => s.logoUrl)
  const setLogoUrl = useCustomizationStore((s) => s.setLogoUrl)

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setLogoUrl(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        Logo
      </label>
      {logoUrl ? (
        <div className="relative inline-block">
          <img
            src={logoUrl}
            alt="Logo"
            className="h-16 w-16 rounded-lg border border-gray-200 dark:border-gray-600 object-contain bg-white dark:bg-gray-700 p-1"
          />
          <button
            onClick={() => setLogoUrl(null)}
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex h-16 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300 cursor-pointer"
        >
          <Upload size={16} />
          Subir logo
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}
