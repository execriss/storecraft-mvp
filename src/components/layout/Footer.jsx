import { Link } from 'react-router'
import { Zap } from 'lucide-react'

const footerLinks = {
  Producto: [
    { label: 'Plantillas', href: '/templates' },
    { label: 'Precios', href: '/#precios' },
    { label: 'Ejemplos', href: '/#ejemplos' },
  ],
  Empresa: [
    { label: 'Nosotros', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contacto', href: '#' },
  ],
  Legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Terminos', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 dark:bg-white">
                <Zap size={18} className="text-white dark:text-gray-900" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">StoreCraft</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Crea tu tienda online en minutos. Sin codigo, sin complicaciones.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h4>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-6">
          <p className="text-center text-sm text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} StoreCraft. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
