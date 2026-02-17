import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X, Zap } from 'lucide-react'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navLinks = [
  { label: 'Plantillas', href: '/templates' },
  { label: 'Precios', href: '/#precios' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 dark:bg-white">
            <Zap size={18} className="text-white dark:text-gray-900" />
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">StoreCraft</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                location.pathname === link.href
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            Iniciar sesion
          </Button>
          <Link to="/templates">
            <Button size="sm">Empezar gratis</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 dark:border-gray-800 dark:bg-gray-900">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tema</span>
              <ThemeToggle />
            </div>
            <Button variant="secondary" size="sm" className="w-full">
              Iniciar sesion
            </Button>
            <Link to="/templates" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full">
                Empezar gratis
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
