import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'

export default function SaasLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
