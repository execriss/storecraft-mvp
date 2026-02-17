import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'sonner'
import SaasLayout from '@/components/layout/SaasLayout'
import DashboardLayout from '@/components/layout/DashboardLayout'
import LandingPage from '@/pages/LandingPage'
import TemplateSelectionPage from '@/pages/TemplateSelectionPage'
import TemplateCustomizationPage from '@/pages/TemplateCustomizationPage'
import StorePreviewPage from '@/pages/StorePreviewPage'
import DashboardOverviewPage from '@/pages/DashboardOverviewPage'
import DashboardProductsPage from '@/pages/DashboardProductsPage'
import DashboardOrdersPage from '@/pages/DashboardOrdersPage'
import DashboardSettingsPage from '@/pages/DashboardSettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas del SaaS */}
        <Route element={<SaasLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="templates" element={<TemplateSelectionPage />} />
        </Route>

        {/* Personalizacion - fullscreen */}
        <Route path="templates/:templateId/customize" element={<TemplateCustomizationPage />} />

        {/* Dashboard admin */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverviewPage />} />
          <Route path="products" element={<DashboardProductsPage />} />
          <Route path="orders" element={<DashboardOrdersPage />} />
          <Route path="settings" element={<DashboardSettingsPage />} />
        </Route>

        {/* Preview de tienda */}
        <Route path="preview/:templateId" element={<StorePreviewPage />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  )
}
