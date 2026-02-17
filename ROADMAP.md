# StoreCraft - Roadmap a Produccion

## Estado Actual (MVP Visual)

**Stack**: React 19 + Vite 7 + Tailwind CSS 4 + Zustand 5 + React Router 7
**Lo que tenemos**: Landing page, 3 plantillas customizables (Vogue, ByteStore, FreshMarket), personalización en tiempo real con CSS variables, dashboard admin con CRUD de productos/pedidos, carrito de compras, dark mode, responsive design.
**Lo que NO tenemos**: Backend, base de datos, autenticación, pagos reales, deploy de tiendas, persistencia real.

---

## Fase 1: Fundamentos Backend

**Objetivo**: Levantar la infraestructura base que soporte todo lo demás.

### 1.1 Elegir Stack Backend

| Opcion | Pros | Contras | Recomendacion |
|---|---|---|---|
| **Next.js (App Router)** | Full-stack, SSR/SSG, API routes, Vercel deploy | Migración de Vite, vendor lock-in parcial | Si queremos SSR y SEO |
| **Vite + API separada (Express/Fastify)** | Mantiene el frontend actual, separación clara | Más setup, CORS, 2 deploys | Si queremos control total |
| **Supabase como BaaS** | Auth + DB + Storage + Realtime incluidos, rápido de implementar | Dependencia de terceros, limitaciones en lógica custom | Para MVP rápido a producción |

**Recomendación**: Migrar a **Next.js App Router** + **Supabase** (DB + Auth + Storage). Next.js nos da SSR para SEO de las tiendas públicas, API routes para lógica de negocio, y Supabase es el backend más rápido de implementar sin sacrificar escalabilidad.

### 1.2 Base de Datos (Supabase/PostgreSQL)

**Esquema propuesto**:

```sql
-- Usuarios del SaaS (dueños de tiendas)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free', -- free | basic | pro | enterprise
  plan_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tiendas (cada usuario puede tener 1+ tiendas según plan)
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Mi Tienda',
  slug TEXT UNIQUE NOT NULL, -- para URL: slug.storecraft.com
  template_id TEXT NOT NULL, -- vogue | bytestore | freshmarket
  logo_url TEXT,
  custom_domain TEXT,
  is_published BOOLEAN DEFAULT false,
  colors JSONB NOT NULL DEFAULT '{}',
  settings JSONB DEFAULT '{}', -- config extra (moneda, idioma, etc.)
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Productos de cada tienda
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image_url TEXT,
  category TEXT,
  badge TEXT,
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}', -- specs, weight, etc. según template
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Categorias de productos
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL, -- ORD-001, ORD-002...
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB,
  items JSONB NOT NULL, -- snapshot de productos al momento de compra
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_id TEXT, -- ID de Stripe/MercadoPago
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Clientes de cada tienda
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(store_id, email)
);
```

**Row Level Security (RLS)**: Cada query se filtra por `user_id` o `store_id` automáticamente. Un usuario solo ve datos de sus propias tiendas.

### 1.3 Autenticacion

**Provider**: Supabase Auth (o NextAuth.js si vamos con Next.js)

**Flujo**:
```
1. Registro con email/password o OAuth (Google, GitHub)
2. Verificación de email
3. Login → JWT token
4. Middleware protege rutas /dashboard/*
5. Token se envía en cada request a la API
6. RLS en Supabase verifica permisos por usuario
```

**Páginas nuevas a crear**:
- `/login` - Login con email/password + OAuth
- `/register` - Registro con plan seleccionado
- `/forgot-password` - Recuperar contraseña
- `/verify-email` - Verificación de email

**Protección de rutas**:
```jsx
// Middleware o wrapper component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/login" />
  return children
}
```

### 1.4 Storage (Imágenes)

**Supabase Storage** para:
- Logos de tiendas
- Imágenes de productos
- Avatars de usuarios

**Políticas**:
- Logos: max 2MB, formatos jpg/png/webp/svg
- Productos: max 5MB, formatos jpg/png/webp
- Optimización: resize automático a 800px ancho + thumbnail 200px
- CDN: Supabase sirve por CDN automáticamente

---

## Fase 2: Conectar Frontend con Backend

**Objetivo**: Reemplazar datos mock por datos reales sin romper la UX actual.

### 2.1 Migrar Zustand Stores a API

**Estrategia**: Mantener Zustand como cache client-side, pero sincronizar con la API.

```
ANTES (MVP):
  Zustand store ← datos hardcodeados

DESPUÉS (Producción):
  Zustand store ← React Query ← API ← Supabase
```

**Herramienta recomendada**: TanStack Query (React Query) para:
- Cache automático
- Revalidación en background
- Optimistic updates (el UI se actualiza antes de confirmar con el server)
- Loading/error states

**Ejemplo de migración para productos**:
```javascript
// hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useProducts(storeId) {
  return useQuery({
    queryKey: ['products', storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('store_id', storeId)
        .order('sort_order')
      if (error) throw error
      return data
    }
  })
}

export function useCreateProduct(storeId) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (product) => {
      const { data, error } = await supabase
        .from('products')
        .insert({ ...product, store_id: storeId })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products', storeId])
    }
  })
}
```

### 2.2 Reestructurar Carpetas

```
src/
├── app/                    # Si migramos a Next.js (App Router)
│   ├── (public)/           # Rutas públicas (landing, login)
│   ├── (dashboard)/        # Rutas protegidas del admin
│   ├── (store)/            # Rutas de tiendas públicas
│   └── api/                # API Routes
│
├── components/
│   ├── ui/                 # Mismos componentes UI (ya están bien)
│   ├── layout/             # Layouts (ya están bien)
│   ├── landing/            # Landing sections (ya están bien)
│   ├── dashboard/          # Dashboard components
│   ├── store-templates/    # Templates de tiendas
│   └── auth/               # Nuevos: LoginForm, RegisterForm, etc.
│
├── hooks/                  # Custom hooks (expandir)
│   ├── useAuth.js          # Auth state
│   ├── useStore.js         # Current store data
│   ├── useProducts.js      # Products CRUD
│   ├── useOrders.js        # Orders queries
│   └── useMediaQuery.js    # Ya existe
│
├── lib/                    # Nuevo: configuración de servicios
│   ├── supabase.js         # Cliente Supabase
│   ├── stripe.js           # Cliente Stripe
│   └── analytics.js        # Analytics setup
│
├── stores/                 # Zustand (reducir a estado client-only)
│   ├── useCartStore.js     # Se mantiene (estado efímero del carrito)
│   ├── useThemeStore.js    # Se mantiene (preferencia local)
│   └── useUIStore.js       # Nuevo: sidebar state, modals, etc.
│
├── data/                   # Eliminar gradualmente (reemplazar por API)
├── utils/                  # Se mantiene
└── types/                  # Nuevo si agregamos TypeScript
```

### 2.3 Agregar TypeScript

**Recomendación**: Migrar a TypeScript antes de agregar más código. El MVP sin TS fue correcto para velocidad, pero en producción los tipos previenen bugs.

**Estrategia de migración gradual**:
1. Renombrar archivos `.jsx` → `.tsx` de a poco
2. Empezar por `stores/`, `hooks/`, `utils/`
3. Luego `components/ui/` (ya son simples)
4. Después `pages/` y el resto
5. Configurar `strict: true` en tsconfig al final

---

## Fase 3: Tiendas Publicas (el core del negocio)

**Objetivo**: Que las tiendas de los usuarios sean accesibles en URLs públicas.

### 3.1 Routing de Tiendas

**Opciones**:

| Approach | URL | Pros | Contras |
|---|---|---|---|
| **Subdominio** | `mitienda.storecraft.com` | Profesional, limpio | DNS wildcard, SSL wildcard |
| **Path** | `storecraft.com/s/mitienda` | Simple de implementar | Menos profesional |
| **Dominio custom** | `mitienda.com` | Máximo profesionalismo | Complejo (DNS, SSL) |

**Recomendación fase inicial**: Path-based (`/s/:slug`) para simplicidad. Subdominios en Fase 5.

**Rutas de tienda pública**:
```
/s/:slug                → Storefront home
/s/:slug/product/:id    → Detalle de producto
/s/:slug/cart           → Carrito
/s/:slug/checkout       → Checkout
/s/:slug/order/:id      → Confirmación de orden
```

### 3.2 SSR/SSG para Tiendas

**Con Next.js App Router**:
```jsx
// app/(store)/s/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const store = await getStoreBySlug(params.slug)
  return {
    title: store.name,
    description: `Tienda online de ${store.name}`,
    openGraph: { images: [store.logo_url] }
  }
}

export default async function StorePage({ params }) {
  const store = await getStoreBySlug(params.slug)
  const products = await getProductsByStore(store.id)
  // Server-render la tienda con datos reales
}
```

**Beneficios**:
- SEO completo (Google indexa cada tienda)
- Performance (HTML listo al cargar)
- Open Graph para compartir en redes sociales

### 3.3 Checkout Real

**Flujo**:
```
1. Cliente agrega productos al carrito
2. Click "Finalizar compra"
3. Formulario: nombre, email, teléfono, dirección
4. Selección de envío (si aplica)
5. Pago: redirect a Stripe/MercadoPago
6. Webhook confirma pago → crea orden en DB
7. Email de confirmación al cliente
8. Notificación al dueño de la tienda
```

---

## Fase 4: Pagos y Monetización

**Objetivo**: Que los dueños de tiendas puedan cobrar, y que nosotros podamos cobrar a los dueños.

### 4.1 Pagos de Clientes (Stripe / MercadoPago)

**Stripe Connect** (recomendado para LATAM + global):
- Cada dueño de tienda tiene un Stripe Connected Account
- Los pagos van directo a su cuenta
- StoreCraft cobra una comisión (ej: 2.5% + $0.30 por transacción)
- O: pricing fijo por plan (sin comisión)

**MercadoPago** (alternativa para Argentina/LATAM):
- Similar a Stripe Connect pero con Marketplace
- Mejor para pagos locales (transferencia, efectivo)

### 4.2 Suscripciones del SaaS (Stripe Billing)

**Planes**:
```
Free:       $0/mes  → 1 tienda, 10 productos, badge "Powered by StoreCraft"
Básico:    $19/mes  → 1 tienda, 50 productos, sin badge
Pro:       $49/mes  → 3 tiendas, productos ilimitados, dominio custom
Enterprise: $99/mes → 10 tiendas, API, soporte prioritario
```

**Implementación**:
- Stripe Billing para suscripciones recurrentes
- Webhooks para actualizar plan en DB
- Middleware que verifica límites según plan
- Página de billing en `/dashboard/billing`

---

## Fase 5: Features Avanzadas

### 5.1 Dominio Personalizado
- El usuario configura `mitienda.com` → apunta a StoreCraft
- Verificación de DNS (CNAME record)
- SSL automático con Let's Encrypt (via Vercel/Cloudflare)
- Reverse proxy que mapea dominio → tienda

### 5.2 Analytics por Tienda
- Visitas, conversiones, productos más vistos
- Gráficos en el dashboard (reemplazar el chart mock actual)
- Herramientas: PostHog (open source) o Plausible

### 5.3 Email Transaccional
- Confirmación de orden
- Cambio de estado de pedido
- Bienvenida al registrarse
- Herramientas: Resend, SendGrid, o Postmark

### 5.4 Notificaciones en Tiempo Real
- Supabase Realtime para nuevas órdenes
- Push notifications (web push API)
- Sonido/badge en el dashboard cuando llega un pedido

### 5.5 Más Templates
- Sistema de templates como plugins
- Marketplace de templates (terceros pueden crear y vender)
- Template builder visual (drag & drop) - fase muy avanzada

### 5.6 Integraciones
- WhatsApp Business API (notificaciones de pedidos)
- Google Analytics / Meta Pixel
- Integración con logística (Andreani, OCA, Correo Argentino)
- Export a Excel/CSV de productos y órdenes

---

## Fase 6: Escalabilidad y DevOps

### 6.1 Infraestructura
```
Vercel (Frontend + API)
  ├── Next.js App (SSR + API Routes)
  ├── Edge Functions (middleware auth, redirects)
  └── Image Optimization (next/image)

Supabase (Backend)
  ├── PostgreSQL (datos)
  ├── Auth (usuarios)
  ├── Storage (imágenes)
  ├── Realtime (websockets)
  └── Edge Functions (webhooks, crons)

Stripe (Pagos)
  ├── Connect (pagos a tiendas)
  ├── Billing (suscripciones SaaS)
  └── Webhooks (eventos de pago)

Resend (Emails)
  └── Templates transaccionales

Cloudflare (CDN + DNS)
  ├── CDN global
  ├── DNS management
  ├── SSL automático
  └── DDoS protection
```

### 6.2 CI/CD
- GitHub Actions para tests + deploy automático
- Preview deploys por PR (Vercel)
- Migrations automáticas de DB (Supabase CLI)
- Staging environment separado

### 6.3 Monitoring
- Sentry para error tracking
- Vercel Analytics para performance
- Uptime monitoring (BetterStack)
- Logs centralizados

---

## Priorización Sugerida

| Prioridad | Fase | Estimación | Impacto |
|---|---|---|---|
| 1 | Auth + DB base (1.2, 1.3) | Alta | Sin esto no hay producto |
| 2 | Conectar productos/pedidos a DB (2.1) | Alta | Datos reales |
| 3 | Tiendas públicas con URL (3.1) | Alta | Core del negocio |
| 4 | Checkout + pagos básicos (3.3, 4.1) | Alta | Revenue |
| 5 | Suscripciones SaaS (4.2) | Media | Monetización |
| 6 | TypeScript (2.3) | Media | Calidad de código |
| 7 | Analytics (5.2) | Media | Valor para usuarios |
| 8 | Email transaccional (5.3) | Media | UX profesional |
| 9 | Dominio custom (5.1) | Baja | Feature premium |
| 10 | Más templates (5.5) | Baja | Crecimiento |

---

## Decisiones Arquitectónicas Clave

### Mantener del MVP
- Zustand para estado client-side (carrito, UI, tema)
- Tailwind CSS v4 con design system actual
- Componentes UI reutilizables (Button, Card, Input, etc.)
- Sistema de CSS variables para tematizado de tiendas
- Dark mode con @custom-variant

### Cambiar/Agregar
- React Query para datos del servidor (reemplaza mock data)
- TypeScript para type safety
- Next.js para SSR de tiendas públicas (SEO)
- Supabase para auth + DB + storage
- Stripe para pagos

### NO hacer (por ahora)
- GraphQL (REST es suficiente para este caso)
- Microservicios (monolito bien organizado escala mejor al principio)
- Kubernetes (Vercel + Supabase manejan la infra)
- App móvil nativa (PWA es suficiente)
- i18n multi-idioma (español primero, internacionalizar después)
