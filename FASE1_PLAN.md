# Fase 1 - Plan de Trabajo para 2 Desarrolladores

## Stack Confirmado
**Next.js 15 App Router + Supabase** (Auth + PostgreSQL + Storage)

---

## Estrategia de Ramas

```
master
  └── fase1                    ← rama de integración de la fase
        ├── feat/fase1-infra   ← Dev A (infraestructura)
        └── feat/fase1-auth    ← Dev B (autenticación UI)
```

Flujo:
- Ambos crean su rama desde `fase1`
- PRs apuntan a `fase1`
- `fase1` → `master` cuando la fase esté completa y testeada

---

## Día 1: Kickoff Conjunto (AMBOS, ~4-6hs)

Esto se hace junto para que los dos partan de la misma base.

### 1. Crear proyecto Next.js
```bash
# En una carpeta nueva (o renombrar la actual)
npx create-next-app@latest storecraft-mvp --js --app --tailwind --src-dir --no-turbopack
```

### 2. Instalar todas las dependencias de entrada
```bash
npm install @supabase/supabase-js @supabase/ssr
npm install zustand sonner lucide-react clsx tailwind-merge
npm install @tanstack/react-query
```

### 3. Configurar estructura base (src/)
```
src/
├── app/
│   ├── layout.jsx             ← layout raíz (fuente Inter, Toaster, Providers)
│   ├── page.jsx               ← LandingPage (redirect desde /)
│   ├── (saas)/                ← grupo rutas públicas SaaS
│   │   ├── templates/
│   │   │   └── page.jsx
│   │   └── layout.jsx         ← SaasLayout (Navbar + Footer)
│   ├── (dashboard)/           ← grupo rutas protegidas
│   │   ├── layout.jsx         ← DashboardLayout (Sidebar + Topbar)
│   │   └── dashboard/
│   │       ├── page.jsx
│   │       ├── products/page.jsx
│   │       ├── orders/page.jsx
│   │       └── settings/page.jsx
│   ├── (auth)/                ← grupo rutas de auth
│   │   ├── layout.jsx
│   │   ├── login/page.jsx
│   │   ├── register/page.jsx
│   │   ├── forgot-password/page.jsx
│   │   └── verify-email/page.jsx
│   ├── templates/
│   │   └── [templateId]/
│   │       └── customize/page.jsx
│   └── preview/
│       └── [templateId]/page.jsx
├── components/                ← copiar todo de src/components/ del MVP
├── stores/                    ← copiar todo de src/stores/ del MVP
├── data/                      ← copiar todo de src/data/ del MVP
├── hooks/                     ← copiar todo de src/hooks/ del MVP
├── utils/                     ← copiar todo de src/utils/ del MVP
└── lib/                       ← NUEVO (vacío por ahora, cada dev lo llena)
```

### 4. Crear .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 5. Crear proyecto en Supabase
- Uno de los dos crea el proyecto en supabase.com
- Compartir las claves por un canal seguro (no commitear)
- Instalar Supabase CLI: `npm install -g supabase`
- `supabase init` en la raíz del proyecto

### 6. Commitear la base y crear ramas
```bash
git add .
git commit -m "chore: setup base Next.js + Supabase para Fase 1"
git checkout -b fase1
git push origin fase1

# Dev A:
git checkout -b feat/fase1-infra
# Dev B:
git checkout -b feat/fase1-auth
```

---

## Dev A — Infraestructura y Base de Datos

**Rama:** `feat/fase1-infra`
**Archivos que son de tu exclusiva responsabilidad:**
- `src/lib/supabase.js` (cliente browser)
- `src/lib/supabase-server.js` (cliente server)
- `supabase/migrations/` (todas las migraciones SQL)
- `src/app/api/` (API routes si se necesitan)
- `next.config.js`
- Migración de todas las páginas existentes a Next.js

---

### Tarea A-1: Clientes Supabase
**⚡ Hacerlo primero (Día 2) — Dev B lo necesita para conectar auth**

`src/lib/supabase.js` — cliente para componentes cliente:
```javascript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
```

`src/lib/supabase-server.js` — cliente para Server Components y Server Actions:
```javascript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

**→ Pushear esto apenas esté listo y avisar a Dev B.**

---

### Tarea A-2: Migraciones de Base de Datos

Archivo: `supabase/migrations/20260223000001_initial_schema.sql`

```sql
-- Habilitar UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Usuarios del SaaS
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'pro', 'enterprise')),
  plan_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tiendas
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Mi Tienda',
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT NOT NULL CHECK (template_id IN ('vogue', 'bytestore', 'freshmarket')),
  logo_url TEXT,
  custom_domain TEXT,
  is_published BOOLEAN DEFAULT false,
  colors JSONB NOT NULL DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Categorias
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  UNIQUE(store_id, slug)
);

-- Productos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  original_price DECIMAL(10,2),
  image_url TEXT,
  category TEXT,
  badge TEXT,
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Clientes de cada tienda
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(store_id, email)
);

-- Pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  order_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB,
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT,
  payment_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(store_id, order_number)
);
```

---

### Tarea A-3: Row Level Security (RLS)

Archivo: `supabase/migrations/20260223000002_rls_policies.sql`

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users: solo ver/editar el propio perfil
CREATE POLICY "users_select_own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Stores: solo el dueño puede ver/editar sus tiendas
CREATE POLICY "stores_select_own" ON stores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "stores_insert_own" ON stores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "stores_update_own" ON stores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "stores_delete_own" ON stores FOR DELETE USING (auth.uid() = user_id);

-- Products: el dueño de la tienda maneja sus productos
CREATE POLICY "products_select_own" ON products FOR SELECT
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "products_insert_own" ON products FOR INSERT
  WITH CHECK (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "products_update_own" ON products FOR UPDATE
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "products_delete_own" ON products FOR DELETE
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));

-- Categories: igual que products
CREATE POLICY "categories_select_own" ON categories FOR SELECT
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "categories_insert_own" ON categories FOR INSERT
  WITH CHECK (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "categories_update_own" ON categories FOR UPDATE
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "categories_delete_own" ON categories FOR DELETE
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));

-- Orders y Customers: igual
CREATE POLICY "orders_select_own" ON orders FOR SELECT
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "orders_insert_own" ON orders FOR INSERT
  WITH CHECK (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "orders_update_own" ON orders FOR UPDATE
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));

CREATE POLICY "customers_select_own" ON customers FOR SELECT
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "customers_insert_own" ON customers FOR INSERT
  WITH CHECK (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
CREATE POLICY "customers_update_own" ON customers FOR UPDATE
  USING (store_id IN (SELECT id FROM stores WHERE user_id = auth.uid()));
```

---

### Tarea A-4: Supabase Storage

Archivo: `supabase/migrations/20260223000003_storage.sql`

```sql
-- Bucket para logos de tiendas
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('logos', 'logos', true, 2097152, ARRAY['image/jpeg','image/png','image/webp','image/svg+xml']);

-- Bucket para imágenes de productos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('products', 'products', true, 5242880, ARRAY['image/jpeg','image/png','image/webp']);

-- Bucket para avatars de usuarios
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg','image/png','image/webp']);

-- Políticas de storage
CREATE POLICY "logos_upload_own" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "logos_read_public" ON storage.objects FOR SELECT
  USING (bucket_id = 'logos');
CREATE POLICY "logos_delete_own" ON storage.objects FOR DELETE
  USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "products_upload_own" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "products_read_public" ON storage.objects FOR SELECT
  USING (bucket_id = 'products');
CREATE POLICY "products_delete_own" ON storage.objects FOR DELETE
  USING (bucket_id = 'products' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "avatars_upload_own" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "avatars_read_public" ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
CREATE POLICY "avatars_delete_own" ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

Para aplicar las migraciones:
```bash
supabase db push
# o en el Supabase SQL Editor directamente
```

---

### Tarea A-5: Trigger para crear perfil de usuario automáticamente

Archivo: `supabase/migrations/20260223000004_user_trigger.sql`

```sql
-- Cuando alguien se registra en Auth, crear su fila en public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

### Tarea A-6: Migrar páginas existentes a Next.js

Migrar el contenido de cada `pages/*.jsx` del MVP actual a su equivalente en `app/`:

| Antes (Vite)                        | Después (Next.js)                              |
|-------------------------------------|------------------------------------------------|
| `pages/LandingPage.jsx`             | `app/page.jsx`                                 |
| `pages/TemplateSelectionPage.jsx`   | `app/(saas)/templates/page.jsx`               |
| `pages/TemplateCustomizationPage.jsx` | `app/templates/[templateId]/customize/page.jsx` |
| `pages/StorePreviewPage.jsx`        | `app/preview/[templateId]/page.jsx`           |
| `pages/DashboardOverviewPage.jsx`   | `app/(dashboard)/dashboard/page.jsx`          |
| `pages/DashboardProductsPage.jsx`   | `app/(dashboard)/dashboard/products/page.jsx` |
| `pages/DashboardOrdersPage.jsx`     | `app/(dashboard)/dashboard/orders/page.jsx`   |
| `pages/DashboardSettingsPage.jsx`   | `app/(dashboard)/dashboard/settings/page.jsx` |

**Importante al migrar:** Agregar `'use client'` en el tope de cada página por ahora (son todas client-side). En fases futuras se optimizará con Server Components.

Adaptar `useThemeStore.js` para que no ejecute `localStorage`/`window` en server:
```javascript
// Al inicio del store, reemplazar getInitialTheme por:
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('storecraft-theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
```

---

### Checklist Dev A

- [ ] A-1: Clientes Supabase (browser + server) → **pushear apenas termine**
- [ ] A-2: Migración SQL (todas las tablas)
- [ ] A-3: RLS policies
- [ ] A-4: Storage buckets y políticas
- [ ] A-5: Trigger de nuevo usuario
- [ ] A-6: Migración de páginas existentes
- [ ] A-extra: `next.config.js` con alias `@/` y config de imágenes
- [ ] PR a `fase1` con todo funcionando

---

---

## Dev B — Autenticación y UI

**Rama:** `feat/fase1-auth`
**Archivos que son de tu exclusiva responsabilidad:**
- `src/app/(auth)/` (todas las páginas de auth)
- `src/components/auth/` (todos los componentes de auth)
- `src/middleware.js` (protección de rutas)
- `src/hooks/useAuth.js`
- `src/components/layout/Navbar.jsx` (agregar lógica de auth)
- `src/components/layout/DashboardLayout.jsx` (agregar guard de auth)

---

### Tarea B-1: AuthProvider y hook useAuth

`src/components/auth/AuthProvider.jsx`:
```jsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escuchar cambios de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}
```

Agregar `AuthProvider` al layout raíz `src/app/layout.jsx`:
```jsx
// Coordinar con Dev A quién edita este archivo primero
// o hacerlo en la integración final
import { AuthProvider } from '@/components/auth/AuthProvider'
// ...
<AuthProvider>{children}</AuthProvider>
```

**Nota:** Para trabajar sin bloqueos mientras Dev A termina `src/lib/supabase.js`, podés crear un mock temporal:
```javascript
// src/lib/supabase.js (MOCK TEMPORAL - Dev A lo reemplazará)
export function createClient() {
  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ error: { message: 'Backend pendiente' } }),
      signUp: async () => ({ error: { message: 'Backend pendiente' } }),
      signOut: async () => ({}),
    }
  }
}
```

---

### Tarea B-2: Componentes de formularios de auth

`src/components/auth/LoginForm.jsx`:
```jsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Bienvenido de vuelta')
      router.push('/dashboard')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
      />
      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>
    </form>
  )
}
```

`src/components/auth/RegisterForm.jsx` — similar al anterior pero con:
- Campo `full_name`
- Llamar a `supabase.auth.signUp({ email, password, options: { data: { full_name } } })`
- Redirigir a `/verify-email` al éxito

`src/components/auth/ForgotPasswordForm.jsx` — solo campo email:
- Llamar a `supabase.auth.resetPasswordForEmail(email)`
- Mostrar mensaje de confirmación

---

### Tarea B-3: Páginas de autenticación

`src/app/(auth)/layout.jsx` — layout centrado para auth:
```jsx
import { Zap } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 dark:bg-white">
              <Zap size={20} className="text-white dark:text-gray-900" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">StoreCraft</span>
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
```

`src/app/(auth)/login/page.jsx`:
```jsx
import Link from 'next/link'
import LoginForm from '@/components/auth/LoginForm'

export const metadata = { title: 'Iniciar sesión — StoreCraft' }

export default function LoginPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-gray-500">Bienvenido de vuelta</p>
      </div>
      <LoginForm />
      <div className="mt-6 space-y-3 text-center text-sm">
        <Link href="/forgot-password" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ¿Olvidaste tu contraseña?
        </Link>
        <p className="text-gray-500">
          ¿No tenés cuenta?{' '}
          <Link href="/register" className="font-medium text-gray-900 underline dark:text-white">
            Registrarse
          </Link>
        </p>
      </div>
    </>
  )
}
```

Similar para `/register/page.jsx` y `/forgot-password/page.jsx`.

`src/app/(auth)/verify-email/page.jsx` — página estática que indica revisar el email.

---

### Tarea B-4: Middleware de protección de rutas

`src/middleware.js`:
```javascript
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirigir a login si no está autenticado y quiere acceder al dashboard
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si ya está autenticado y va a /login o /register, redirigir al dashboard
  if (user && (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/register'
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
```

---

### Tarea B-5: Actualizar Navbar con auth real

En `src/components/layout/Navbar.jsx`, reemplazar los botones mock de "Iniciar sesión" / "Empezar gratis":

```jsx
// Agregar al inicio del componente:
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Dentro del componente:
const { user, loading } = useAuth()
const router = useRouter()
const supabase = createClient()

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/')
  router.refresh()
}

// Reemplazar los botones CTA desktop por:
{loading ? null : user ? (
  <div className="flex items-center gap-3">
    <ThemeToggle />
    <Link href="/dashboard">
      <Button variant="ghost" size="sm">Dashboard</Button>
    </Link>
    <Button size="sm" variant="secondary" onClick={handleLogout}>
      Cerrar sesión
    </Button>
  </div>
) : (
  <div className="flex items-center gap-3">
    <ThemeToggle />
    <Link href="/login">
      <Button variant="ghost" size="sm">Iniciar sesión</Button>
    </Link>
    <Link href="/register">
      <Button size="sm">Empezar gratis</Button>
    </Link>
  </div>
)}
```

---

### Checklist Dev B

- [ ] B-1: AuthProvider + useAuth hook
- [ ] B-2: LoginForm, RegisterForm, ForgotPasswordForm
- [ ] B-3: Páginas de auth (login, register, forgot-password, verify-email)
- [ ] B-4: Middleware de protección de rutas
- [ ] B-5: Navbar actualizada con auth real
- [ ] B-extra: Probar flujo completo (registro → verificar email → login → dashboard → logout)
- [ ] PR a `fase1` con todo funcionando

---

---

## Puntos de Sincronización

### Sync 1 (Día 2-3): Dev A pushea los clientes Supabase
Apenas Dev A tenga `src/lib/supabase.js` y `src/lib/supabase-server.js` listos y pusheados a `feat/fase1-infra`, Dev B los mergea a su rama para reemplazar el mock y conectar los formularios reales.

```bash
# Dev B, en su rama:
git fetch origin
git merge origin/feat/fase1-infra -- src/lib/supabase.js src/lib/supabase-server.js
```

### Sync 2 (Final): Integración de ambas ramas en `fase1`

Orden recomendado:
1. Dev A hace PR de `feat/fase1-infra` → `fase1` (primero, porque es la base)
2. Dev B hace PR de `feat/fase1-auth` → `fase1` (después, puede haber conflictos menores en `layout.jsx`)
3. Resolver conflictos juntos si los hay
4. Prueba end-to-end del flujo completo
5. PR de `fase1` → `master`

---

## Mapa de Archivos (Sin Conflictos)

| Archivo / Carpeta                          | Dev A | Dev B |
|--------------------------------------------|-------|-------|
| `src/lib/supabase.js`                      | ✅    |       |
| `src/lib/supabase-server.js`               | ✅    |       |
| `supabase/migrations/`                     | ✅    |       |
| `next.config.js`                           | ✅    |       |
| `src/app/(saas)/`                          | ✅    |       |
| `src/app/(dashboard)/`                     | ✅    |       |
| `src/app/templates/` (customize, preview)  | ✅    |       |
| `src/stores/useThemeStore.js` (adaptación) | ✅    |       |
| `src/app/(auth)/`                          |       | ✅    |
| `src/components/auth/`                     |       | ✅    |
| `src/middleware.js`                        |       | ✅    |
| `src/hooks/useAuth.js`                     |       | ✅    |
| `src/components/layout/Navbar.jsx`         |       | ✅    |
| `src/components/layout/DashboardLayout.jsx`|       | ✅    |
| `src/app/layout.jsx` (layout raíz)         | ⚠️ coordinar | ⚠️ coordinar |

**`src/app/layout.jsx` es el único archivo que los dos tocan.** Solución: Dev A lo crea con la estructura base, Dev B agrega el `AuthProvider` en la integración final o a través del Sync 2.

---

## Checklist Final de Fase 1

### Infraestructura
- [ ] Proyecto Next.js corriendo localmente
- [ ] Proyecto Supabase creado y claves en `.env.local`
- [ ] Todas las migraciones SQL aplicadas
- [ ] RLS testeado: usuario A no puede ver datos de usuario B
- [ ] Storage buckets creados y accesibles

### Autenticación
- [ ] Registro con email/password funciona
- [ ] Email de verificación llega
- [ ] Login funciona
- [ ] Logout funciona
- [ ] `/dashboard` redirige a `/login` si no hay sesión
- [ ] `/login` redirige a `/dashboard` si ya hay sesión
- [ ] Navbar muestra estado de auth correcto

### Funcionalidad existente
- [ ] Landing page funciona igual que antes
- [ ] Selector de plantillas funciona
- [ ] Customización y preview funcionan
- [ ] Dashboard con datos mock sigue funcionando
- [ ] Dark mode funciona
- [ ] Responsive en mobile

---

## Dependencias entre Tareas

```
Kickoff (Día 1)
    │
    ├── Dev A: A-1 Clientes Supabase ──────────────────► Dev B puede desbloquear B-2
    │
    ├── Dev A: A-2 Migraciones (independiente)
    │
    ├── Dev A: A-3 RLS (depende de A-2)
    │
    ├── Dev A: A-4 Storage (independiente de A-2/A-3)
    │
    ├── Dev A: A-5 Trigger (depende de A-2)
    │
    ├── Dev A: A-6 Migración de páginas (independiente de A-2/A-3)
    │
    ├── Dev B: B-1 AuthProvider (puede empezar con mock desde Día 2)
    │
    ├── Dev B: B-2 Formularios (puede empezar con mock desde Día 2)
    │
    ├── Dev B: B-3 Páginas auth (independiente)
    │
    ├── Dev B: B-4 Middleware (independiente)
    │
    └── Dev B: B-5 Navbar (puede hacerse con mock, conectar auth en Sync 2)
```
