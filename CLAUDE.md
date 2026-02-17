# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

StoreCraft - MVP visual de un SaaS para crear tiendas online. Los usuarios eligen entre 3 plantillas (Vogue, ByteStore, FreshMarket), personalizan colores/nombre/logo y obtienen su tienda. Actualmente solo frontend con datos mock, sin backend.

## Commands

- `npm run dev` - Start dev server (Vite, http://localhost:5173)
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm run preview` - Preview production build

## Tech Stack

- React 19 (JavaScript, no TypeScript)
- Vite 7 with `@/` path alias → `./src`
- Tailwind CSS v4 (native Vite plugin via `@tailwindcss/vite`, no config file needed)
- React Router v7 (declarative mode, `react-router` package)
- Zustand for state management
- Lucide React for icons
- Sonner for toast notifications

## Architecture

**Routing** (`src/App.jsx`): BrowserRouter with two layout groups:
- `SaasLayout` wraps public routes (`/`, `/templates`)
- `DashboardLayout` wraps admin routes (`/dashboard/*`)
- Fullscreen routes: `/templates/:templateId/customize`, `/preview/:templateId`

**Components** organized by domain:
- `components/ui/` - Reusable primitives (Button, Card, Input, Badge, Modal, ColorPicker)
- `components/layout/` - Page layouts (Navbar, Footer, Sidebar, SaasLayout, DashboardLayout)
- `components/landing/` - Landing page sections
- `components/template-selector/` - Template selection and customization UI
- `components/dashboard/` - Admin dashboard components
- `components/store-templates/` - The 3 store templates, each in its own folder + `shared/` for common store UI

**State** (`src/stores/`): Zustand stores - `useCustomizationStore` (colors, name, logo), `useCartStore`, `useDashboardStore`

**Data** (`src/data/`): Mock/hardcoded data files for templates, products, orders, etc.

## Key Patterns

- Use `cn()` from `@/utils/cn` for conditional Tailwind classes (clsx + tailwind-merge)
- Use `formatCurrency()`, `formatDate()`, `formatNumber()` from `@/utils/format` (es-AR locale)
- Store template theming uses CSS custom properties (`--color-primary`, etc.) set inline and consumed via `bg-[var(--color-primary)]` in Tailwind
- Images use Unsplash URLs directly in mock data (no local image files)

## Conventions

- Language: all responses, comments, and UI text in Spanish
- No TypeScript - plain JSX only
- Formatting locale: es-AR (Argentine Spanish)
- Font: Inter (loaded from Google Fonts)
