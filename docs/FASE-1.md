# Fase 1 — Fundamentos Backend

**Stack**: Next.js App Router + Supabase (DB + Auth + Storage)
**Repo nuevo**: zero-skills (nueva cuenta GitHub)
**Dominio planificado**: zero-skills.com

> Estrategia: primero migramos todo a Next.js sin auth. Una vez migrado, conectamos Supabase.

---

## David — Backend & Supabase

### 1.2 Base de Datos
- [ ] Crear las 6 tablas: `users`, `stores`, `products`, `categories`, `orders`, `customers`
- [ ] Configurar Row Level Security (RLS) en cada tabla

### 1.3 Autenticación
- [ ] Habilitar Auth: email/password + OAuth Google
- [ ] Configurar templates de email (verificación + reset de contraseña)

### 1.4 Storage
- [ ] Crear buckets: `logos`, `product-images`, `avatars`
- [ ] Configurar políticas de acceso por bucket

### Al terminar
- [ ] Compartir `.env.example` con las variables de Supabase

---

## Exequiel — Frontend & Next.js

### 1.1 Setup
- [ ] Inicializar proyecto Next.js App Router (JS, no TS)
- [ ] Configurar Tailwind CSS v4 + alias `@/` + fuente Inter
- [ ] Definir estructura de rutas App Router (ver tabla abajo)

### Migración de componentes
- [ ] Migrar `components/ui/` y `components/layout/`
- [ ] Migrar las 3 plantillas de tienda (`store-templates/`)
- [ ] Migrar stores Zustand y mock data

### Conectar Supabase (después de recibir `.env`)
- [ ] Instalar `@supabase/supabase-js` + `@supabase/ssr`
- [ ] Crear `lib/supabase/client.js` y `lib/supabase/server.js`
- [ ] Configurar `middleware.js` para proteger `/dashboard/*`

---

## Punto de integración (juntos)

- [ ] Test de conexión Next.js ↔ Supabase
- [ ] Verificar variables de entorno en local
- [ ] Smoke test del dashboard con datos reales

---

## Estructura de rutas Next.js

| Ruta | Descripción | Acceso |
|---|---|---|
| `app/(saas)/` | Landing + selección de plantillas | Público |
| `app/(dashboard)/dashboard/` | Admin del dueño de tienda | Protegido |
| `app/store/[slug]/` | Tienda pública del cliente | Público (SSR) |
| `app/(auth)/` | Login, register, forgot-password | Público |

---

## Variables de entorno necesarias

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```
