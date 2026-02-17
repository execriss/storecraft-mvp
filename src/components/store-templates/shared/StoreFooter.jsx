import useCustomizationStore from '@/stores/useCustomizationStore'

export default function StoreFooter() {
  const storeName = useCustomizationStore((s) => s.storeName)

  return (
    <footer
      className="border-t py-8 px-6"
      style={{
        borderColor: 'color-mix(in srgb, var(--color-text) 10%, transparent)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-50" style={{ color: 'var(--color-text)' }}>
          &copy; {new Date().getFullYear()} {storeName}. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          {['Términos', 'Privacidad', 'Contacto'].map((link) => (
            <span
              key={link}
              className="text-sm opacity-50 hover:opacity-80 cursor-pointer"
              style={{ color: 'var(--color-text)' }}
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
