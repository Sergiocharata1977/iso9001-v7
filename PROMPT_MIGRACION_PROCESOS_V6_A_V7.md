# 🎯 PROMPT DE MIGRACIÓN: MÓDULOS PROCESOS ISO 9001 + NAVEGACIÓN

## 📋 CONTEXTO

Eres un asistente IA especializado en migración de código. Tu tarea es migrar los módulos de **Procesos ISO 9001** desde **9001app-v6** hacia **9001app-v7** (Next.js 14 + MongoDB + TypeScript).

**⚠️ ORDEN DE EJECUCIÓN CRÍTICO:**

### **PRIMERO (Obligatorio - 2 horas):**
0. **ENTREGABLE 0: MENÚS DE NAVEGACIÓN**
   - Copiar y arreglar Menú Principal
   - Copiar y arreglar Menú CRM (5 submódulos)
   - Copiar y arreglar Menú RRHH (6 submódulos)
   - Crear Menú Procesos (5 submódulos)
   - Crear Menú Calidad (4 submódulos)
   - Arreglar todos los exports (components/ui/index.ts)
   - Implementar Sidebar completo
   - Actualizar app/layout.tsx

### **DESPUÉS (14 horas):**
1. **ProcessDefinition** (Definiciones de Procesos)
2. **ProcessRecord** (Registro de Procesos)
3. **QualityObjective** (Objetivos de Calidad)
4. **QualityIndicator** (Indicadores de Calidad)
5. **Measurement** (Mediciones)

**🚨 NO CONTINUAR CON LOS MÓDULOS DE PROCESOS HASTA QUE LA NAVEGACIÓN ESTÉ 100% FUNCIONAL**

---

## 🎯 OBJETIVOS PRINCIPALES

1. **Copiar archivos** desde v6 manteniendo la lógica existente
2. **Adaptar a TypeScript** con tipos estrictos y exhaustivos
3. **Integrar con MongoDB** usando `@/lib/dbConnect`
4. **Implementar validaciones TypeScript** en cada capa (modelo, API, componentes)
5. **Manejar relaciones complejas** entre modelos
6. **Cumplir estándares del proyecto** (nomenclatura, case sensitivity)
7. **Prevenir errores comunes** de migración

---

## 📦 ENTREGABLES ESPECÍFICOS

### ✅ ENTREGABLE 0: MENÚS DE NAVEGACIÓN (CRÍTICO - HACER PRIMERO)
**Tiempo estimado: 2 horas**

**⚠️ IMPORTANTE: Este entregable debe completarse ANTES de migrar los módulos de procesos**

**Archivos a entregar:**
```
components/layout/
├── MainNav.tsx                              // Navegación principal
├── Sidebar.tsx                              // Sidebar con todos los menús
├── Header.tsx                               // Header de la app
└── Layout.tsx                               // Layout wrapper

components/navigation/
├── MenuPrincipal.tsx                        // Menú principal (Dashboard)
├── MenuCRM.tsx                              // Menú CRM completo
├── MenuRRHH.tsx                             // Menú RRHH completo
├── MenuProcesos.tsx                         // Menú Procesos (NUEVO)
└── MenuCalidad.tsx                          // Menú Calidad (NUEVO)

lib/
└── menu-items.ts                            // Configuración centralizada de menús

app/
└── layout.tsx                               // Layout principal actualizado
```

**Criterios de aceptación:**
- [ ] Menú Principal con todas las secciones
- [ ] Menú CRM con submódulos completos:
  - [ ] Empresas
  - [ ] Contactos
  - [ ] Oportunidades
  - [ ] Cotizaciones
  - [ ] Análisis de Crédito
- [ ] Menú RRHH con submódulos completos:
  - [ ] Departamentos
  - [ ] Puestos
  - [ ] Personal
  - [ ] Capacitaciones
  - [ ] Evaluaciones
  - [ ] Gestión de Desempeño
- [ ] Menú Procesos con submódulos:
  - [ ] Definiciones
  - [ ] Registros
  - [ ] Objetivos de Calidad
  - [ ] Indicadores
- [ ] Navegación con iconos (lucide-react)
- [ ] Active states en rutas actuales
- [ ] Responsive (mobile + desktop)
- [ ] TypeScript estricto en todos los componentes
- [ ] Build sin errores

**Estructura de datos centralizada:**
```typescript
// lib/menu-items.ts
import {
  Home,
  Building2,
  Users,
  FileText,
  ClipboardCheck,
  BarChart3,
  Settings,
  Briefcase,
  Target,
  TrendingUp,
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  badge?: string;
  submenu?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  description?: string;
}

// Menú Principal
export const menuPrincipal: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: Briefcase,
    submenu: [
      { id: 'empresas', label: 'Empresas', href: '/crm/empresas' },
      { id: 'contactos', label: 'Contactos', href: '/crm/contactos' },
      { id: 'oportunidades', label: 'Oportunidades', href: '/crm/oportunidades' },
      { id: 'cotizaciones', label: 'Cotizaciones', href: '/crm/cotizaciones' },
      { id: 'analisis-credito', label: 'Análisis de Crédito', href: '/crm/analisis-credito' },
    ],
  },
  {
    id: 'rrhh',
    label: 'Recursos Humanos',
    icon: Users,
    submenu: [
      { id: 'departamentos', label: 'Departamentos', href: '/rrhh/departamentos' },
      { id: 'puestos', label: 'Puestos', href: '/rrhh/puestos' },
      { id: 'personal', label: 'Personal', href: '/rrhh/personal' },
      { id: 'capacitaciones', label: 'Capacitaciones', href: '/rrhh/capacitaciones' },
      { id: 'evaluaciones', label: 'Evaluaciones', href: '/rrhh/evaluaciones' },
      { id: 'desempeno', label: 'Gestión de Desempeño', href: '/rrhh/desempeno' },
    ],
  },
  {
    id: 'procesos',
    label: 'Procesos ISO',
    icon: FileText,
    submenu: [
      { id: 'definiciones', label: 'Definiciones', href: '/procesos/definiciones' },
      { id: 'registros', label: 'Registros', href: '/procesos/registros' },
      { id: 'objetivos', label: 'Objetivos de Calidad', href: '/procesos/objetivos' },
      { id: 'indicadores', label: 'Indicadores', href: '/procesos/indicadores' },
      { id: 'mediciones', label: 'Mediciones', href: '/procesos/mediciones' },
    ],
  },
  {
    id: 'calidad',
    label: 'Gestión de Calidad',
    icon: ClipboardCheck,
    submenu: [
      { id: 'documentos', label: 'Documentos', href: '/calidad/documentos' },
      { id: 'auditorias', label: 'Auditorías', href: '/calidad/auditorias' },
      { id: 'hallazgos', label: 'Hallazgos', href: '/calidad/hallazgos' },
      { id: 'normas', label: 'Puntos de Norma', href: '/calidad/normas' },
    ],
  },
  {
    id: 'super-admin',
    label: 'Super Admin',
    icon: Settings,
    href: '/super-admin',
  },
];
```

**Componente principal del menú:**
```typescript
// components/layout/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuPrincipal, MenuItem, SubMenuItem } from '@/lib/menu-items';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menuId: string): void => {
    setOpenMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isMenuOpen = (menuId: string): boolean => {
    return openMenus.includes(menuId);
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">9001APP v7</h1>
        <p className="text-gray-400 text-sm">Sistema ISO 9001</p>
      </div>

      {/* Menú */}
      <nav className="space-y-2">
        {menuPrincipal.map((item: MenuItem) => (
          <div key={item.id}>
            {/* Item con enlace directo */}
            {item.href && !item.submenu ? (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ) : (
              /* Item con submenú */
              <>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isMenuOpen(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {/* Submenú */}
                {isMenuOpen(item.id) && item.submenu && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.submenu.map((subItem: SubMenuItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                          isActive(subItem.href)
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        {subItem.label}
                        {subItem.badge && (
                          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {subItem.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
```

**Layout principal con sidebar:**
```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '9001APP v7',
  description: 'Sistema de Gestión ISO 9001',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Contenido principal */}
          <main className="flex-1 bg-gray-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

---

### ✅ ENTREGABLE 1: Módulo DEFINICIONES DE PROCESOS
**Tiempo estimado: 3 horas**

**Archivos a entregar:**
```
models/ProcessDefinition.ts                      // Modelo principal
models/NormPoint.ts                              // Puntos de norma ISO
models/NormProcessDocRelation.ts                 // Relaciones norma-proceso-doc

app/api/procesos/definiciones/route.ts           // API CRUD
app/api/procesos/definiciones/[id]/route.ts      // API por ID
app/api/procesos/normas/route.ts                 // API Puntos de norma
app/api/procesos/relaciones/route.ts             // API Relaciones

app/procesos/definiciones/page.tsx               // Página principal
app/procesos/definiciones/components/            // Componentes
    ├── ProcessDefinitionForm.tsx
    ├── ProcessDefinitionList.tsx
    ├── ProcessDefinitionCard.tsx
    └── NormPointSelector.tsx
```

**Criterios de aceptación:**
- [ ] Modelo ProcessDefinition con tipos estrictos
- [ ] Modelo NormPoint con validaciones
- [ ] Relaciones muchos-a-muchos funcionando
- [ ] API endpoints con tipado completo
- [ ] Validaciones Zod/Yup en API
- [ ] Componentes con PropTypes TypeScript
- [ ] Selectores de relaciones funcionando
- [ ] Build sin errores TypeScript (strictMode)

---

### ✅ ENTREGABLE 2: Módulo REGISTRO DE PROCESOS
**Tiempo estimado: 3 horas**

**Archivos a entregar:**
```
models/ProcessRecord.ts                          // Registros de ejecución
models/ProcessDocument.ts                        // Documentos asociados

app/api/procesos/registros/route.ts             // API CRUD
app/api/procesos/registros/[id]/route.ts        // API por ID
app/api/procesos/registros/estadisticas/route.ts // Estadísticas

app/procesos/registros/page.tsx                  // Página principal
app/procesos/registros/[id]/page.tsx             // Detalle de registro
app/procesos/registros/components/               // Componentes
    ├── ProcessRecordForm.tsx
    ├── ProcessRecordList.tsx
    ├── ProcessRecordDetail.tsx
    └── ProcessRecordTimeline.tsx
```

**Criterios de aceptación:**
- [ ] Modelo con relación a ProcessDefinition
- [ ] Estados y workflows tipados (enum TypeScript)
- [ ] API con validaciones de estado
- [ ] Timeline de eventos implementado
- [ ] Filtros y búsqueda funcionando
- [ ] Estadísticas básicas operativas
- [ ] Build sin errores TypeScript

---

### ✅ ENTREGABLE 3: Módulo OBJETIVOS DE CALIDAD
**Tiempo estimado: 2.5 horas**

**Archivos a entregar:**
```
models/QualityObjective.ts                       // Objetivos de calidad

app/api/procesos/objetivos/route.ts             // API CRUD
app/api/procesos/objetivos/[id]/route.ts        // API por ID
app/api/procesos/objetivos/estadisticas/route.ts // Progreso

app/procesos/objetivos/page.tsx                  // Página principal
app/procesos/objetivos/components/               // Componentes
    ├── QualityObjectiveForm.tsx
    ├── QualityObjectiveList.tsx
    ├── QualityObjectiveCard.tsx
    └── QualityObjectiveProgress.tsx
```

**Criterios de aceptación:**
- [ ] Modelo con campos de seguimiento
- [ ] Relación con ProcessDefinition
- [ ] Cálculo de progreso automatizado
- [ ] Indicadores visuales de cumplimiento
- [ ] Filtros por estado y fecha
- [ ] Build sin errores TypeScript

---

### ✅ ENTREGABLE 4: Módulo INDICADORES DE CALIDAD
**Tiempo estimado: 3 horas**

**Archivos a entregar:**
```
models/QualityIndicator.ts                       // Indicadores (KPI)

app/api/procesos/indicadores/route.ts           // API CRUD
app/api/procesos/indicadores/[id]/route.ts      // API por ID
app/api/procesos/indicadores/calcular/route.ts  // Cálculos

app/procesos/indicadores/page.tsx               // Página principal
app/procesos/indicadores/[id]/page.tsx           // Detalle con gráficos
app/procesos/indicadores/components/             // Componentes
    ├── QualityIndicatorForm.tsx
    ├── QualityIndicatorList.tsx
    ├── QualityIndicatorCard.tsx
    ├── QualityIndicatorChart.tsx
    └── QualityIndicatorFormula.tsx
```

**Criterios de aceptación:**
- [ ] Modelo con fórmulas de cálculo
- [ ] Tipos para diferentes tipos de indicadores
- [ ] Relación con QualityObjective
- [ ] Cálculos automáticos implementados
- [ ] Gráficos básicos (Chart.js o Recharts)
- [ ] Alertas por umbrales
- [ ] Build sin errores TypeScript

---

### ✅ ENTREGABLE 5: Módulo MEDICIONES
**Tiempo estimado: 2.5 horas**

**Archivos a entregar:**
```
models/Measurement.ts                            // Mediciones individuales

app/api/procesos/mediciones/route.ts            // API CRUD
app/api/procesos/mediciones/[id]/route.ts       // API por ID
app/api/procesos/mediciones/analisis/route.ts   // Análisis

app/procesos/mediciones/page.tsx                 // Página principal
app/procesos/mediciones/components/              // Componentes
    ├── MeasurementForm.tsx
    ├── MeasurementList.tsx
    ├── MeasurementCard.tsx
    └── MeasurementChart.tsx
```

**Criterios de aceptación:**
- [ ] Modelo con relación a QualityIndicator
- [ ] Validaciones de rangos y valores
- [ ] API con agregaciones y análisis
- [ ] Entrada rápida de datos
- [ ] Visualización de tendencias
- [ ] Build sin errores TypeScript

---

## 🔄 PROCESO DE MIGRACIÓN (PASO A PASO)

### 📁 FASE 0: PRE-MIGRACIÓN Y SETUP (1 hora)

**⚠️ CRÍTICO: Ejecutar ANTES de comenzar**

**Paso 0.1 - Verificar dependencias:**
```bash
cd 9001app-v7

# Instalar dependencias necesarias
npm install zod react-hook-form @hookform/resolvers
npm install recharts chart.js react-chartjs-2
npm install date-fns lucide-react
npm install --save-dev @types/node

# Verificar versiones
npm list typescript mongoose next
```

**Paso 0.2 - Copiar componentes UI base desde v6:**
```bash
# CRÍTICO: Copiar TODOS los componentes UI
robocopy "..\9001app-v6\frontend\src\components\ui" ".\components\ui" /E /XO

# Verificar que existen:
dir components\ui

# Componentes mínimos requeridos:
# - button.tsx
# - input.tsx
# - select.tsx
# - card.tsx
# - badge.tsx
# - dialog.tsx (modal)
# - dropdown-menu.tsx
# - tabs.tsx
# - table.tsx
```

**Paso 0.3 - Copiar y adaptar MENÚS desde v6:**

**⚠️ CRÍTICO: Los menús deben copiarse y arreglarse PRIMERO**

```bash
# Crear estructura de carpetas
mkdir -p components\layout
mkdir -p components\navigation
mkdir -p lib

# Copiar componentes de navegación desde v6
robocopy "..\9001app-v6\frontend\src\components\layout" ".\components\layout" /E /XO
robocopy "..\9001app-v6\frontend\src\components\navigation" ".\components\navigation" /E /XO

# Si no existen en v6, crear desde cero usando el código del Entregable 0
```

**Paso 0.3.1 - Crear archivo centralizado de menús:**

```typescript
// lib/menu-items.ts - CREAR ESTE ARCHIVO
import {
  Home,
  Building2,
  Users,
  FileText,
  ClipboardCheck,
  BarChart3,
  Settings,
  Briefcase,
  Target,
  TrendingUp,
  Mail,
  Phone,
  DollarSign,
  FileCheck,
  Award,
  Calendar,
  UserCheck,
  BookOpen,
  Search,
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  badge?: string;
  submenu?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  description?: string;
}

// ============================================
// MENÚ PRINCIPAL COMPLETO
// ============================================
export const menuPrincipal: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: Briefcase,
    submenu: [
      { 
        id: 'empresas', 
        label: 'Empresas', 
        href: '/crm/empresas',
        description: 'Gestión de empresas clientes'
      },
      { 
        id: 'contactos', 
        label: 'Contactos', 
        href: '/crm/contactos',
        description: 'Gestión de contactos'
      },
      { 
        id: 'oportunidades', 
        label: 'Oportunidades', 
        href: '/crm/oportunidades',
        description: 'Oportunidades de negocio'
      },
      { 
        id: 'cotizaciones', 
        label: 'Cotizaciones', 
        href: '/crm/cotizaciones',
        description: 'Gestión de cotizaciones'
      },
      { 
        id: 'analisis-credito', 
        label: 'Análisis de Crédito', 
        href: '/crm/analisis-credito',
        description: 'Análisis crediticio de clientes'
      },
    ],
  },
  {
    id: 'rrhh',
    label: 'Recursos Humanos',
    icon: Users,
    submenu: [
      { 
        id: 'departamentos', 
        label: 'Departamentos', 
        href: '/rrhh/departamentos',
        description: 'Gestión de departamentos'
      },
      { 
        id: 'puestos', 
        label: 'Puestos', 
        href: '/rrhh/puestos',
        description: 'Gestión de puestos de trabajo'
      },
      { 
        id: 'personal', 
        label: 'Personal', 
        href: '/rrhh/personal',
        description: 'Gestión de personal'
      },
      { 
        id: 'capacitaciones', 
        label: 'Capacitaciones', 
        href: '/rrhh/capacitaciones',
        description: 'Capacitaciones y formación'
      },
      { 
        id: 'evaluaciones', 
        label: 'Evaluaciones', 
        href: '/rrhh/evaluaciones',
        description: 'Evaluaciones de desempeño'
      },
      { 
        id: 'desempeno', 
        label: 'Gestión de Desempeño', 
        href: '/rrhh/desempeno',
        description: 'Gestión integral de desempeño'
      },
    ],
  },
  {
    id: 'procesos',
    label: 'Procesos ISO',
    icon: FileText,
    submenu: [
      { 
        id: 'definiciones', 
        label: 'Definiciones', 
        href: '/procesos/definiciones',
        description: 'Definiciones de procesos'
      },
      { 
        id: 'registros', 
        label: 'Registros', 
        href: '/procesos/registros',
        description: 'Registros de ejecución'
      },
      { 
        id: 'objetivos', 
        label: 'Objetivos de Calidad', 
        href: '/procesos/objetivos',
        description: 'Objetivos de calidad'
      },
      { 
        id: 'indicadores', 
        label: 'Indicadores', 
        href: '/procesos/indicadores',
        description: 'Indicadores de gestión'
      },
      { 
        id: 'mediciones', 
        label: 'Mediciones', 
        href: '/procesos/mediciones',
        description: 'Mediciones y seguimiento'
      },
    ],
  },
  {
    id: 'calidad',
    label: 'Gestión de Calidad',
    icon: ClipboardCheck,
    submenu: [
      { 
        id: 'documentos', 
        label: 'Documentos', 
        href: '/calidad/documentos',
        description: 'Gestión documental'
      },
      { 
        id: 'auditorias', 
        label: 'Auditorías', 
        href: '/calidad/auditorias',
        description: 'Auditorías de calidad'
      },
      { 
        id: 'hallazgos', 
        label: 'Hallazgos', 
        href: '/calidad/hallazgos',
        description: 'Hallazgos y no conformidades'
      },
      { 
        id: 'normas', 
        label: 'Puntos de Norma', 
        href: '/calidad/normas',
        description: 'Puntos de norma ISO 9001'
      },
    ],
  },
  {
    id: 'super-admin',
    label: 'Super Admin',
    icon: Settings,
    href: '/super-admin',
  },
];

// ============================================
// EXPORTAR TODOS LOS MENÚS
// ============================================
export default menuPrincipal;
```

**Paso 0.3.2 - Arreglar exports en componentes UI:**

```bash
# Verificar que existe components/ui/index.ts
# Si no existe, crearlo:
```

```typescript
// components/ui/index.ts - CREAR O ACTUALIZAR
// ============================================
// EXPORTS DE COMPONENTES UI BASE (shadcn/ui)
// ============================================
export { Button } from './button';
export { Input } from './input';
export { Label } from './label';
export { Select } from './select';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
export { Badge } from './badge';
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './dialog';
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './dropdown-menu';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './table';

// ============================================
// EXPORTS DE COMPONENTES CUSTOM (si existen)
// ============================================
// Descomentar si existen estos componentes:
// export { Modal } from './Modal';
// export { LoadingSpinner } from './LoadingSpinner';
// export { DataTable } from './DataTable';
```

**Paso 0.3.3 - Actualizar app/layout.tsx:**

```typescript
// app/layout.tsx - ACTUALIZAR CON SIDEBAR
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '9001APP v7 - Sistema ISO 9001',
  description: 'Sistema de Gestión de Calidad ISO 9001',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar - Menú de navegación */}
          <Sidebar />

          {/* Contenido principal */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
```

**Paso 0.4 - Configurar TypeScript estricto:**
```json
// tsconfig.json - Verificar estas opciones
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

**Paso 0.5 - Verificar que todo funciona:**

```bash
# Limpiar cache
Remove-Item -Recurse -Force .next

# Iniciar dev
npm run dev

# Verificar en navegador:
# http://localhost:3000
# - Debe mostrar el sidebar
# - Los menús deben expandirse/contraerse
# - Los enlaces deben funcionar

# Verificar TypeScript
npx tsc --noEmit
# Debe ser 0 errores

# Si hay errores, corregirlos ANTES de continuar
```

---

### 📁 FASE 1: COPIADO DE ARCHIVOS (45 min)

**Paso 1.1 - Localizar archivos en v6:**
```bash
# Ruta base: ../9001app-v6/

# Modelos Backend:
backend/src/models/ProcessDefinition.ts
backend/src/models/ProcessRecord.ts
backend/src/models/NormPoint.ts
backend/src/models/NormProcessDocRelation.ts
backend/src/models/QualityObjective.ts
backend/src/models/QualityIndicator.ts
backend/src/models/Measurement.ts

# Controladores Backend:
backend/src/controllers/processController.ts
backend/src/controllers/qualityController.ts
backend/src/controllers/indicatorController.ts

# Páginas Frontend:
frontend/src/app/procesos/
frontend/src/app/calidad/
```

**Paso 1.2 - Crear estructura en v7:**
```bash
# Modelos
mkdir -p models

# APIs
mkdir -p app/api/procesos/definiciones
mkdir -p app/api/procesos/registros
mkdir -p app/api/procesos/objetivos
mkdir -p app/api/procesos/indicadores
mkdir -p app/api/procesos/mediciones

# Páginas
mkdir -p app/procesos/definiciones/components
mkdir -p app/procesos/registros/components
mkdir -p app/procesos/objetivos/components
mkdir -p app/procesos/indicadores/components
mkdir -p app/procesos/mediciones/components
```

---

### 🔧 FASE 2: ADAPTACIÓN DE MODELOS CON TYPESCRIPT ESTRICTO (2 horas)

**IMPORTANTE: Cada modelo debe tener validaciones exhaustivas**

#### **Ejemplo Completo: ProcessDefinition.ts**

```typescript
import mongoose, { Schema, Document, Model, Types } from 'mongoose';

/**
 * ============================================
 * TIPOS Y ENUMS TYPESCRIPT
 * ============================================
 */

// Tipos de proceso según ISO 9001
export enum ProcessType {
  ESTRATEGICO = 'estrategico',
  OPERATIVO = 'operativo',
  SOPORTE = 'soporte',
}

// Estados del proceso
export enum ProcessStatus {
  ACTIVO = 'activo',
  EN_REVISION = 'en_revision',
  INACTIVO = 'inactivo',
  OBSOLETO = 'obsoleto',
}

// Nivel de madurez del proceso
export enum MaturityLevel {
  INICIAL = 1,
  GESTIONADO = 2,
  DEFINIDO = 3,
  CUANTITATIVO = 4,
  OPTIMIZADO = 5,
}

/**
 * ============================================
 * INTERFACES TYPESCRIPT
 * ============================================
 */

// Interfaz para entradas del proceso
export interface IProcessInput {
  nombre: string;
  descripcion?: string;
  tipo: 'material' | 'informacion' | 'recurso';
  requerido: boolean;
}

// Interfaz para salidas del proceso
export interface IProcessOutput {
  nombre: string;
  descripcion?: string;
  tipo: 'producto' | 'servicio' | 'documento' | 'informacion';
  destinatario?: string;
}

// Interfaz para recursos del proceso
export interface IProcessResource {
  tipo: 'humano' | 'material' | 'tecnologico' | 'financiero';
  descripcion: string;
  responsable?: Types.ObjectId;
}

// Interfaz para riesgos del proceso
export interface IProcessRisk {
  descripcion: string;
  probabilidad: 1 | 2 | 3 | 4 | 5;
  impacto: 1 | 2 | 3 | 4 | 5;
  nivel: number; // probabilidad * impacto
  medidaControl?: string;
}

// Interfaz del documento principal
export interface IProcessDefinition extends Document {
  // Identificación
  codigo: string;
  nombre: string;
  descripcion: string;
  version: string;
  fechaVersion: Date;

  // Clasificación
  tipo: ProcessType;
  categoria?: string;
  nivelMadurez: MaturityLevel;
  estado: ProcessStatus;

  // Responsables
  propietario: Types.ObjectId; // ref: 'User'
  responsableEjecucion?: Types.ObjectId;
  equipo?: Types.ObjectId[]; // ref: 'User'

  // Departamento/Área
  departamento?: Types.ObjectId; // ref: 'Departamento'

  // Alcance
  alcance: string;
  exclusiones?: string;

  // Entradas y Salidas
  entradas: IProcessInput[];
  salidas: IProcessOutput[];

  // Recursos
  recursos: IProcessResource[];

  // Normativa (Relación con ISO 9001)
  puntosNorma: Types.ObjectId[]; // ref: 'NormPoint'

  // Documentos relacionados
  documentosRelacionados?: Types.ObjectId[]; // ref: 'Documento'

  // Indicadores
  indicadores?: Types.ObjectId[]; // ref: 'QualityIndicator'

  // Objetivos
  objetivosCalidad?: Types.ObjectId[]; // ref: 'QualityObjective'

  // Riesgos
  riesgos: IProcessRisk[];

  // Diagrama de flujo
  diagramaFlujo?: string; // URL o path

  // Frecuencia de revisión
  frecuenciaRevision: 'mensual' | 'trimestral' | 'semestral' | 'anual';
  proximaRevision?: Date;
  ultimaRevision?: Date;

  // Auditoría
  fechaCreacion: Date;
  fechaActualizacion: Date;
  creadoPor: Types.ObjectId;
  actualizadoPor?: Types.ObjectId;

  // Soft delete
  activo: boolean;
  eliminadoPor?: Types.ObjectId;
  fechaEliminacion?: Date;
}

/**
 * ============================================
 * SCHEMA MONGOOSE
 * ============================================
 */

const ProcessDefinitionSchema = new Schema<IProcessDefinition>(
  {
    // Identificación
    codigo: {
      type: String,
      required: [true, 'El código del proceso es obligatorio'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^PROC-[A-Z0-9-]+$/, 'El código debe seguir el formato PROC-XXX'],
    },
    nombre: {
      type: String,
      required: [true, 'El nombre del proceso es obligatorio'],
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
      maxlength: [200, 'El nombre no puede exceder 200 caracteres'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
      minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    },
    version: {
      type: String,
      required: true,
      default: '1.0',
      match: [/^\d+\.\d+$/, 'La versión debe tener formato X.Y (ej: 1.0)'],
    },
    fechaVersion: {
      type: Date,
      required: true,
      default: Date.now,
    },

    // Clasificación
    tipo: {
      type: String,
      enum: Object.values(ProcessType),
      required: [true, 'El tipo de proceso es obligatorio'],
    },
    categoria: {
      type: String,
      trim: true,
    },
    nivelMadurez: {
      type: Number,
      enum: Object.values(MaturityLevel),
      default: MaturityLevel.INICIAL,
    },
    estado: {
      type: String,
      enum: Object.values(ProcessStatus),
      default: ProcessStatus.ACTIVO,
    },

    // Responsables
    propietario: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El propietario del proceso es obligatorio'],
    },
    responsableEjecucion: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    equipo: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],

    // Departamento
    departamento: {
      type: Schema.Types.ObjectId,
      ref: 'Departamento',
    },

    // Alcance
    alcance: {
      type: String,
      required: [true, 'El alcance del proceso es obligatorio'],
      trim: true,
    },
    exclusiones: {
      type: String,
      trim: true,
    },

    // Entradas y Salidas
    entradas: [{
      nombre: { type: String, required: true },
      descripcion: String,
      tipo: {
        type: String,
        enum: ['material', 'informacion', 'recurso'],
        required: true,
      },
      requerido: { type: Boolean, default: true },
    }],
    salidas: [{
      nombre: { type: String, required: true },
      descripcion: String,
      tipo: {
        type: String,
        enum: ['producto', 'servicio', 'documento', 'informacion'],
        required: true,
      },
      destinatario: String,
    }],

    // Recursos
    recursos: [{
      tipo: {
        type: String,
        enum: ['humano', 'material', 'tecnologico', 'financiero'],
        required: true,
      },
      descripcion: { type: String, required: true },
      responsable: { type: Schema.Types.ObjectId, ref: 'User' },
    }],

    // Normativa
    puntosNorma: [{
      type: Schema.Types.ObjectId,
      ref: 'NormPoint',
    }],

    // Relaciones
    documentosRelacionados: [{
      type: Schema.Types.ObjectId,
      ref: 'Documento',
    }],
    indicadores: [{
      type: Schema.Types.ObjectId,
      ref: 'QualityIndicator',
    }],
    objetivosCalidad: [{
      type: Schema.Types.ObjectId,
      ref: 'QualityObjective',
    }],

    // Riesgos
    riesgos: [{
      descripcion: { type: String, required: true },
      probabilidad: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
      },
      impacto: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
      },
      nivel: { type: Number, required: true },
      medidaControl: String,
    }],

    // Diagrama
    diagramaFlujo: {
      type: String,
      trim: true,
    },

    // Revisión
    frecuenciaRevision: {
      type: String,
      enum: ['mensual', 'trimestral', 'semestral', 'anual'],
      default: 'anual',
    },
    proximaRevision: Date,
    ultimaRevision: Date,

    // Auditoría
    creadoPor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    actualizadoPor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    // Soft delete
    activo: {
      type: Boolean,
      default: true,
    },
    eliminadoPor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    fechaEliminacion: Date,
  },
  {
    timestamps: {
      createdAt: 'fechaCreacion',
      updatedAt: 'fechaActualizacion',
    },
  }
);

/**
 * ============================================
 * INDICES
 * ============================================
 */

ProcessDefinitionSchema.index({ codigo: 1 });
ProcessDefinitionSchema.index({ nombre: 1 });
ProcessDefinitionSchema.index({ tipo: 1, estado: 1 });
ProcessDefinitionSchema.index({ propietario: 1 });
ProcessDefinitionSchema.index({ departamento: 1 });
ProcessDefinitionSchema.index({ activo: 1 });

/**
 * ============================================
 * MÉTODOS Y VIRTUALS
 * ============================================
 */

// Calcular nivel de riesgo antes de guardar
ProcessDefinitionSchema.pre('save', function(next) {
  if (this.riesgos && this.riesgos.length > 0) {
    this.riesgos.forEach(riesgo => {
      riesgo.nivel = riesgo.probabilidad * riesgo.impacto;
    });
  }
  next();
});

// Virtual: Nivel de riesgo máximo
ProcessDefinitionSchema.virtual('riesgoMaximo').get(function() {
  if (!this.riesgos || this.riesgos.length === 0) return 0;
  return Math.max(...this.riesgos.map(r => r.nivel));
});

// Virtual: Días hasta próxima revisión
ProcessDefinitionSchema.virtual('diasHastaRevision').get(function() {
  if (!this.proximaRevision) return null;
  const hoy = new Date();
  const diff = this.proximaRevision.getTime() - hoy.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

/**
 * ============================================
 * MÉTODOS ESTÁTICOS
 * ============================================
 */

// Buscar procesos activos por tipo
ProcessDefinitionSchema.statics.findByType = function(
  tipo: ProcessType
): Promise<IProcessDefinition[]> {
  return this.find({ tipo, activo: true }).sort({ nombre: 1 });
};

// Buscar procesos que requieren revisión
ProcessDefinitionSchema.statics.findPendingReview = function(): Promise<
  IProcessDefinition[]
> {
  const hoy = new Date();
  return this.find({
    activo: true,
    proximaRevision: { $lte: hoy },
  }).sort({ proximaRevision: 1 });
};

/**
 * ============================================
 * EXPORTAR MODELO
 * ============================================
 */

const ProcessDefinition: Model<IProcessDefinition> =
  mongoose.models.ProcessDefinition ||
  mongoose.model<IProcessDefinition>('ProcessDefinition', ProcessDefinitionSchema);

export default ProcessDefinition;
```

---

### 🚀 FASE 3: CREACIÓN DE API ROUTES CON VALIDACIONES ESTRICTAS (2.5 horas)

**IMPORTANTE: Usar validaciones Zod en todas las APIs**

#### **Ejemplo: app/api/procesos/definiciones/route.ts**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/dbConnect';
import ProcessDefinition, {
  ProcessType,
  ProcessStatus,
  MaturityLevel,
  IProcessInput,
  IProcessOutput,
  IProcessResource,
  IProcessRisk,
} from '@/models/ProcessDefinition';

/**
 * ============================================
 * VALIDACIONES ZOD
 * ============================================
 */

// Schema para entradas
const ProcessInputSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().optional(),
  tipo: z.enum(['material', 'informacion', 'recurso']),
  requerido: z.boolean().default(true),
});

// Schema para salidas
const ProcessOutputSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().optional(),
  tipo: z.enum(['producto', 'servicio', 'documento', 'informacion']),
  destinatario: z.string().optional(),
});

// Schema para recursos
const ProcessResourceSchema = z.object({
  tipo: z.enum(['humano', 'material', 'tecnologico', 'financiero']),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  responsable: z.string().optional(),
});

// Schema para riesgos
const ProcessRiskSchema = z.object({
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  probabilidad: z.number().int().min(1).max(5),
  impacto: z.number().int().min(1).max(5),
  medidaControl: z.string().optional(),
});

// Schema principal para crear/actualizar proceso
const ProcessDefinitionSchema = z.object({
  codigo: z
    .string()
    .regex(/^PROC-[A-Z0-9-]+$/, 'El código debe seguir el formato PROC-XXX')
    .toUpperCase(),
  nombre: z.string().min(3).max(200),
  descripcion: z.string().min(10),
  version: z.string().regex(/^\d+\.\d+$/, 'Formato de versión inválido (X.Y)'),
  tipo: z.nativeEnum(ProcessType),
  categoria: z.string().optional(),
  nivelMadurez: z.nativeEnum(MaturityLevel).default(MaturityLevel.INICIAL),
  estado: z.nativeEnum(ProcessStatus).default(ProcessStatus.ACTIVO),
  propietario: z.string().min(1, 'El propietario es obligatorio'),
  responsableEjecucion: z.string().optional(),
  equipo: z.array(z.string()).optional(),
  departamento: z.string().optional(),
  alcance: z.string().min(10, 'El alcance debe ser descriptivo'),
  exclusiones: z.string().optional(),
  entradas: z.array(ProcessInputSchema).min(1, 'Debe tener al menos una entrada'),
  salidas: z.array(ProcessOutputSchema).min(1, 'Debe tener al menos una salida'),
  recursos: z.array(ProcessResourceSchema).optional(),
  puntosNorma: z.array(z.string()).optional(),
  documentosRelacionados: z.array(z.string()).optional(),
  indicadores: z.array(z.string()).optional(),
  objetivosCalidad: z.array(z.string()).optional(),
  riesgos: z.array(ProcessRiskSchema).optional(),
  diagramaFlujo: z.string().url().optional().or(z.literal('')),
  frecuenciaRevision: z.enum(['mensual', 'trimestral', 'semestral', 'anual']),
  proximaRevision: z.string().datetime().optional(),
  creadoPor: z.string().min(1),
});

/**
 * ============================================
 * TIPOS PARA RESPONSES
 * ============================================
 */

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  errors?: z.ZodError;
};

type ProcessDefinitionResponse = ApiResponse<any>;
type ProcessDefinitionListResponse = ApiResponse<any[]>;

/**
 * ============================================
 * GET - LISTAR PROCESOS
 * ============================================
 */

export async function GET(
  request: NextRequest
): Promise<NextResponse<ProcessDefinitionListResponse>> {
  try {
    await dbConnect();

    // Extraer query params con validación
    const searchParams = request.nextUrl.searchParams;
    const tipo = searchParams.get('tipo') as ProcessType | null;
    const estado = searchParams.get('estado') as ProcessStatus | null;
    const departamento = searchParams.get('departamento');
    const activo = searchParams.get('activo') !== 'false';

    // Construir filtros
    const filtros: any = { activo };

    if (tipo && Object.values(ProcessType).includes(tipo)) {
      filtros.tipo = tipo;
    }

    if (estado && Object.values(ProcessStatus).includes(estado)) {
      filtros.estado = estado;
    }

    if (departamento) {
      filtros.departamento = departamento;
    }

    // Buscar con populate
    const procesos = await ProcessDefinition.find(filtros)
      .populate('propietario', 'nombre email')
      .populate('responsableEjecucion', 'nombre email')
      .populate('equipo', 'nombre email')
      .populate('departamento', 'nombre codigo')
      .populate('puntosNorma', 'codigo nombre')
      .sort({ codigo: 1 })
      .lean<any[]>();

    return NextResponse.json({
      success: true,
      data: procesos,
    });
  } catch (error: any) {
    console.error('Error al listar procesos:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al listar procesos',
      },
      { status: 500 }
    );
  }
}

/**
 * ============================================
 * POST - CREAR PROCESO
 * ============================================
 */

export async function POST(
  request: NextRequest
): Promise<NextResponse<ProcessDefinitionResponse>> {
  try {
    await dbConnect();

    const body = await request.json();

    // Validar con Zod
    const validacion = ProcessDefinitionSchema.safeParse(body);

    if (!validacion.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Datos de entrada inválidos',
          errors: validacion.error,
        },
        { status: 400 }
      );
    }

    const datosValidados = validacion.data;

    // Verificar código único
    const existente = await ProcessDefinition.findOne({
      codigo: datosValidados.codigo,
    });

    if (existente) {
      return NextResponse.json(
        {
          success: false,
          error: `El código ${datosValidados.codigo} ya existe`,
        },
        { status: 409 }
      );
    }

    // Calcular niveles de riesgo
    if (datosValidados.riesgos) {
      datosValidados.riesgos = datosValidados.riesgos.map((riesgo: any) => ({
        ...riesgo,
        nivel: riesgo.probabilidad * riesgo.impacto,
      }));
    }

    // Crear proceso
    const proceso = await ProcessDefinition.create(datosValidados);

    // Populate para respuesta
    await proceso.populate([
      { path: 'propietario', select: 'nombre email' },
      { path: 'responsableEjecucion', select: 'nombre email' },
      { path: 'departamento', select: 'nombre codigo' },
      { path: 'puntosNorma', select: 'codigo nombre' },
    ]);

    return NextResponse.json(
      {
        success: true,
        data: proceso,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error al crear proceso:', error);

    // Error de duplicado (código único)
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: 'El código del proceso ya existe',
        },
        { status: 409 }
      );
    }

    // Error de validación de Mongoose
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Error de validación',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al crear proceso',
      },
      { status: 500 }
    );
  }
}
```

#### **Ejemplo: app/api/procesos/definiciones/[id]/route.ts**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/dbConnect';
import ProcessDefinition from '@/models/ProcessDefinition';
import mongoose from 'mongoose';

/**
 * ============================================
 * GET - OBTENER PROCESO POR ID
 * ============================================
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID de proceso inválido',
        },
        { status: 400 }
      );
    }

    const proceso = await ProcessDefinition.findById(params.id)
      .populate('propietario', 'nombre email avatar')
      .populate('responsableEjecucion', 'nombre email')
      .populate('equipo', 'nombre email')
      .populate('departamento', 'nombre codigo descripcion')
      .populate('puntosNorma', 'codigo nombre descripcion clausula')
      .populate('documentosRelacionados', 'codigo nombre tipo')
      .populate('indicadores', 'codigo nombre meta')
      .populate('objetivosCalidad', 'codigo descripcion meta')
      .populate('creadoPor', 'nombre email')
      .populate('actualizadoPor', 'nombre email');

    if (!proceso) {
      return NextResponse.json(
        {
          success: false,
          error: 'Proceso no encontrado',
        },
        { status: 404 }
      );
    }

    // Agregar virtuals
    const procesoObj = proceso.toObject({ virtuals: true });

    return NextResponse.json({
      success: true,
      data: procesoObj,
    });
  } catch (error: any) {
    console.error('Error al obtener proceso:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener proceso',
      },
      { status: 500 }
    );
  }
}

/**
 * ============================================
 * PUT - ACTUALIZAR PROCESO
 * ============================================
 */

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID de proceso inválido',
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validar datos (parcial)
    const ProcessUpdateSchema = z.object({
      nombre: z.string().min(3).max(200).optional(),
      descripcion: z.string().min(10).optional(),
      version: z.string().regex(/^\d+\.\d+$/).optional(),
      estado: z.string().optional(),
      // ... otros campos opcionales
      actualizadoPor: z.string().optional(),
    });

    const validacion = ProcessUpdateSchema.safeParse(body);

    if (!validacion.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Datos de entrada inválidos',
          errors: validacion.error,
        },
        { status: 400 }
      );
    }

    // Actualizar
    const proceso = await ProcessDefinition.findByIdAndUpdate(
      params.id,
      {
        ...validacion.data,
        fechaActualizacion: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: 'propietario', select: 'nombre email' },
      { path: 'departamento', select: 'nombre codigo' },
      { path: 'puntosNorma', select: 'codigo nombre' },
    ]);

    if (!proceso) {
      return NextResponse.json(
        {
          success: false,
          error: 'Proceso no encontrado',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: proceso,
    });
  } catch (error: any) {
    console.error('Error al actualizar proceso:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al actualizar proceso',
      },
      { status: 500 }
    );
  }
}

/**
 * ============================================
 * DELETE - ELIMINAR PROCESO (SOFT DELETE)
 * ============================================
 */

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID de proceso inválido',
        },
        { status: 400 }
      );
    }

    // Obtener usuario que elimina (desde token/sesión)
    const body = await request.json().catch(() => ({}));
    const eliminadoPor = body.eliminadoPor;

    // Soft delete
    const proceso = await ProcessDefinition.findByIdAndUpdate(
      params.id,
      {
        activo: false,
        fechaEliminacion: new Date(),
        ...(eliminadoPor && { eliminadoPor }),
      },
      { new: true }
    );

    if (!proceso) {
      return NextResponse.json(
        {
          success: false,
          error: 'Proceso no encontrado',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: proceso,
      message: 'Proceso eliminado exitosamente',
    });
  } catch (error: any) {
    console.error('Error al eliminar proceso:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al eliminar proceso',
      },
      { status: 500 }
    );
  }
}
```

---

### 🎨 FASE 4: COMPONENTES FRONTEND CON TYPESCRIPT ESTRICTO (2 horas)

**IMPORTANTE: Tipar todas las props, estados y eventos**

#### **Ejemplo: ProcessDefinitionForm.tsx**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ProcessType,
  ProcessStatus,
  MaturityLevel,
  IProcessInput,
  IProcessOutput,
  IProcessResource,
  IProcessRisk,
} from '@/models/ProcessDefinition';

/**
 * ============================================
 * TIPOS Y VALIDACIONES
 * ============================================
 */

// Schema Zod para el formulario
const ProcessFormSchema = z.object({
  codigo: z
    .string()
    .min(1, 'El código es obligatorio')
    .regex(/^PROC-[A-Z0-9-]+$/, 'Formato: PROC-XXX'),
  nombre: z.string().min(3, 'Mínimo 3 caracteres').max(200),
  descripcion: z.string().min(10, 'Mínimo 10 caracteres'),
  version: z.string().regex(/^\d+\.\d+$/, 'Formato: X.Y'),
  tipo: z.nativeEnum(ProcessType),
  estado: z.nativeEnum(ProcessStatus),
  propietario: z.string().min(1, 'Seleccione un propietario'),
  departamento: z.string().optional(),
  alcance: z.string().min(10, 'El alcance debe ser descriptivo'),
  frecuenciaRevision: z.enum(['mensual', 'trimestral', 'semestral', 'anual']),
});

type ProcessFormData = z.infer<typeof ProcessFormSchema>;

// Props del componente
interface ProcessDefinitionFormProps {
  proceso?: any; // IProcessDefinition o null
  onSuccess: () => void;
  onCancel: () => void;
}

// Estado de carga
interface LoadingState {
  usuarios: boolean;
  departamentos: boolean;
  puntosNorma: boolean;
}

/**
 * ============================================
 * COMPONENTE PRINCIPAL
 * ============================================
 */

export default function ProcessDefinitionForm({
  proceso,
  onSuccess,
  onCancel,
}: ProcessDefinitionFormProps) {
  // ============ ESTADOS ============
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    usuarios: true,
    departamentos: true,
    puntosNorma: true,
  });

  // Datos para selectores
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [puntosNorma, setPuntosNorma] = useState<any[]>([]);

  // Entradas, salidas, recursos, riesgos
  const [entradas, setEntradas] = useState<IProcessInput[]>([]);
  const [salidas, setSalidas] = useState<IProcessOutput[]>([]);
  const [recursos, setRecursos] = useState<IProcessResource[]>([]);
  const [riesgos, setRiesgos] = useState<IProcessRisk[]>([]);

  // ============ REACT HOOK FORM ============
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<ProcessFormData>({
    resolver: zodResolver(ProcessFormSchema),
    defaultValues: {
      codigo: '',
      nombre: '',
      descripcion: '',
      version: '1.0',
      tipo: ProcessType.OPERATIVO,
      estado: ProcessStatus.ACTIVO,
      propietario: '',
      departamento: '',
      alcance: '',
      frecuenciaRevision: 'anual',
    },
  });

  // ============ EFECTOS ============
  
  // Cargar datos iniciales
  useEffect(() => {
    cargarDatos();
  }, []);

  // Cargar proceso existente
  useEffect(() => {
    if (proceso) {
      reset({
        codigo: proceso.codigo,
        nombre: proceso.nombre,
        descripcion: proceso.descripcion,
        version: proceso.version,
        tipo: proceso.tipo,
        estado: proceso.estado,
        propietario: proceso.propietario?._id || '',
        departamento: proceso.departamento?._id || '',
        alcance: proceso.alcance,
        frecuenciaRevision: proceso.frecuenciaRevision,
      });

      setEntradas(proceso.entradas || []);
      setSalidas(proceso.salidas || []);
      setRecursos(proceso.recursos || []);
      setRiesgos(proceso.riesgos || []);
    }
  }, [proceso, reset]);

  // ============ FUNCIONES ============

  const cargarDatos = async (): Promise<void> => {
    try {
      // Cargar usuarios
      const resUsuarios = await fetch('/api/users');
      const dataUsuarios = await resUsuarios.json();
      if (dataUsuarios.success) {
        setUsuarios(dataUsuarios.data);
      }
      setLoading(prev => ({ ...prev, usuarios: false }));

      // Cargar departamentos
      const resDepartamentos = await fetch('/api/departamentos');
      const dataDepartamentos = await resDepartamentos.json();
      if (dataDepartamentos.success) {
        setDepartamentos(dataDepartamentos.data);
      }
      setLoading(prev => ({ ...prev, departamentos: false }));

      // Cargar puntos de norma
      const resPuntos = await fetch('/api/procesos/normas');
      const dataPuntos = await resPuntos.json();
      if (dataPuntos.success) {
        setPuntosNorma(dataPuntos.data);
      }
      setLoading(prev => ({ ...prev, puntosNorma: false }));
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setLoading({
        usuarios: false,
        departamentos: false,
        puntosNorma: false,
      });
    }
  };

  const onSubmit = async (data: ProcessFormData): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const url = proceso
        ? `/api/procesos/definiciones/${proceso._id}`
        : '/api/procesos/definiciones';

      const method = proceso ? 'PUT' : 'POST';

      // Construir payload completo
      const payload = {
        ...data,
        entradas,
        salidas,
        recursos,
        riesgos,
        creadoPor: 'USER_ID', // TODO: Obtener de sesión
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Error al guardar el proceso');
      }

      onSuccess();
    } catch (error: any) {
      console.error('Error al guardar:', error);
      setError(error.message || 'Error al guardar el proceso');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============ FUNCIONES AUXILIARES ============

  const agregarEntrada = (): void => {
    setEntradas([
      ...entradas,
      {
        nombre: '',
        descripcion: '',
        tipo: 'informacion',
        requerido: true,
      },
    ]);
  };

  const eliminarEntrada = (index: number): void => {
    setEntradas(entradas.filter((_, i) => i !== index));
  };

  const actualizarEntrada = (index: number, campo: keyof IProcessInput, valor: any): void => {
    const nuevasEntradas = [...entradas];
    nuevasEntradas[index] = {
      ...nuevasEntradas[index],
      [campo]: valor,
    };
    setEntradas(nuevasEntradas);
  };

  // ============ RENDER ============

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Título */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">
          {proceso ? 'Editar' : 'Nuevo'} Proceso
        </h2>
      </div>

      {/* Error general */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Sección 1: Identificación */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold">Identificación</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Código */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Código *
            </label>
            <input
              {...register('codigo')}
              type="text"
              placeholder="PROC-XXX"
              className="w-full px-3 py-2 border rounded-md"
              disabled={!!proceso}
            />
            {errors.codigo && (
              <p className="text-red-500 text-sm mt-1">{errors.codigo.message}</p>
            )}
          </div>

          {/* Versión */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Versión *
            </label>
            <input
              {...register('version')}
              type="text"
              placeholder="1.0"
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.version && (
              <p className="text-red-500 text-sm mt-1">{errors.version.message}</p>
            )}
          </div>
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre del Proceso *
          </label>
          <input
            {...register('nombre')}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Descripción *
          </label>
          <textarea
            {...register('descripcion')}
            rows={3}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>
          )}
        </div>
      </div>

      {/* Sección 2: Clasificación */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold">Clasificación</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de Proceso *
            </label>
            <select
              {...register('tipo')}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value={ProcessType.ESTRATEGICO}>Estratégico</option>
              <option value={ProcessType.OPERATIVO}>Operativo</option>
              <option value={ProcessType.SOPORTE}>Soporte</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Estado *
            </label>
            <select
              {...register('estado')}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value={ProcessStatus.ACTIVO}>Activo</option>
              <option value={ProcessStatus.EN_REVISION}>En Revisión</option>
              <option value={ProcessStatus.INACTIVO}>Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sección 3: Responsables */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold">Responsables</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Propietario */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Propietario del Proceso *
            </label>
            <select
              {...register('propietario')}
              className="w-full px-3 py-2 border rounded-md"
              disabled={loading.usuarios}
            >
              <option value="">Seleccionar...</option>
              {usuarios.map((usuario) => (
                <option key={usuario._id} value={usuario._id}>
                  {usuario.nombre} - {usuario.email}
                </option>
              ))}
            </select>
            {errors.propietario && (
              <p className="text-red-500 text-sm mt-1">{errors.propietario.message}</p>
            )}
          </div>

          {/* Departamento */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Departamento
            </label>
            <select
              {...register('departamento')}
              className="w-full px-3 py-2 border rounded-md"
              disabled={loading.departamentos}
            >
              <option value="">Seleccionar...</option>
              {departamentos.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sección 4: Entradas */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Entradas del Proceso</h3>
          <button
            type="button"
            onClick={agregarEntrada}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Agregar Entrada
          </button>
        </div>

        {entradas.map((entrada, index) => (
          <div key={index} className="border p-4 rounded-md space-y-2">
            <div className="flex justify-between items-start">
              <input
                type="text"
                placeholder="Nombre de la entrada"
                value={entrada.nombre}
                onChange={(e) => actualizarEntrada(index, 'nombre', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => eliminarEntrada(index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>

            <select
              value={entrada.tipo}
              onChange={(e) => actualizarEntrada(index, 'tipo', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="material">Material</option>
              <option value="informacion">Información</option>
              <option value="recurso">Recurso</option>
            </select>
          </div>
        ))}
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Guardando...' : proceso ? 'Actualizar' : 'Crear'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
```

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### ❌ ERROR 1: Props Incompatibles

**Síntoma:**
```
Type '{ icon: Element; }' is not assignable to type 'IntrinsicAttributes & ButtonProps'
```

**Causa:**
Props de v6 no compatibles con componentes de v7

**Solución:**
```typescript
// ❌ INCORRECTO (v6)
<Button icon={<Icon />}>Guardar</Button>

// ✅ CORRECTO (v7)
<Button>
  <Icon className="mr-2" />
  Guardar
</Button>
```

---

### ❌ ERROR 2: Módulos No Encontrados

**Síntoma:**
```
Module not found: Can't resolve '@/components/ui/Modal'
```

**Causa:**
Componentes UI no copiados desde v6

**Solución:**
```bash
# Copiar componentes UI desde v6
robocopy "..\9001app-v6\frontend\src\components\ui" ".\components\ui" /E /XO

# Verificar estructura
dir components\ui
```

---

### ❌ ERROR 3: Tipos Incompatibles

**Síntoma:**
```
Argument of type 'string' is not assignable to parameter of type 'ObjectId'
```

**Causa:**
Tipos de Mongoose vs strings en frontend

**Solución:**
```typescript
// ❌ INCORRECTO
propietario: string;

// ✅ CORRECTO
propietario: Types.ObjectId | string;

// O en el modelo
propietario: {
  type: Schema.Types.ObjectId,
  ref: 'User',
}
```

---

### ❌ ERROR 4: Permisos en Windows

**Síntoma:**
```
EBUSY: resource busy or locked, unlink '.next/trace'
```

**Solución:**
```powershell
# Matar procesos Node.js
taskkill /F /IM node.exe

# Limpiar .next
Remove-Item -Recurse -Force .next

# Rebuild
npm run dev
```

---

### ❌ ERROR 5: dbConnect No Importado

**Síntoma:**
```
dbConnect is not defined
```

**Solución:**
```typescript
// ✅ SIEMPRE en API routes
import dbConnect from '@/lib/dbConnect';

export async function GET() {
  await dbConnect(); // ← CRÍTICO
  // ...
}
```

---

### ❌ ERROR 6: Validación Zod Fallida

**Síntoma:**
```
ZodError: Expected string, received undefined
```

**Solución:**
```typescript
// Agregar .optional() o .nullable()
const schema = z.object({
  campo: z.string().optional(),
  // O con default
  campo: z.string().default(''),
});
```

---

### ❌ ERROR 7: Populate No Funciona

**Síntoma:**
```
Cannot read property 'nombre' of null
```

**Causa:**
Relación no poblada correctamente

**Solución:**
```typescript
// ✅ CORRECTO
const proceso = await ProcessDefinition.findById(id)
  .populate('propietario', 'nombre email')
  .populate('departamento');

// Verificar antes de usar
if (proceso.propietario) {
  console.log(proceso.propietario.nombre);
}
```

---

### ❌ ERROR 8: TypeScript Strict Mode

**Síntoma:**
```
Object is possibly 'null'
```

**Solución:**
```typescript
// ❌ INCORRECTO
const nombre = proceso.propietario.nombre;

// ✅ CORRECTO
const nombre = proceso.propietario?.nombre || 'Sin asignar';

// O con validación
if (proceso.propietario) {
  const nombre = proceso.propietario.nombre;
}
```

---

## ✅ CHECKLIST PRE-MIGRACIÓN

**⚠️ ORDEN OBLIGATORIO - Seguir exactamente:**

### **PASO 1: Verificar Entorno (5 min)**
```bash
# 1. Verificar Node.js
node --version  # Debe ser >= 18

# 2. Verificar proyecto
cd 9001app-v7
dir  # Debe existir package.json

# 3. Verificar .env
type .env  # Debe tener MONGO_URI
```

### **PASO 2: Instalar Dependencias (10 min)**
```bash
# Instalar todas las dependencias necesarias
npm install
npm install zod react-hook-form @hookform/resolvers
npm install recharts chart.js react-chartjs-2
npm install date-fns lucide-react
npm install --save-dev @types/node
```

### **PASO 3: Copiar Componentes UI desde v6 (10 min)**
```bash
# CRÍTICO: Copiar TODOS los componentes UI
robocopy "..\9001app-v6\frontend\src\components\ui" ".\components\ui" /E /XO

# Verificar que existen componentes básicos
dir components\ui\button.tsx
dir components\ui\input.tsx
dir components\ui\card.tsx
```

### **PASO 4: COMPLETAR ENTREGABLE 0 - MENÚS (2 horas) ⚠️**
**🚨 NO CONTINUAR HASTA COMPLETAR ESTE PASO**

```bash
# 1. Crear lib/menu-items.ts (copiar código completo del prompt)
# 2. Crear components/layout/Sidebar.tsx (copiar código del prompt)
# 3. Crear components/ui/index.ts con exports
# 4. Actualizar app/layout.tsx

# 5. Verificar que compila
npx tsc --noEmit

# 6. Limpiar cache
Remove-Item -Recurse -Force .next

# 7. Iniciar dev
npm run dev

# 8. VERIFICAR EN NAVEGADOR:
# http://localhost:3000
# - Debe verse el sidebar ✅
# - Menús deben expandirse ✅
# - Enlaces deben funcionar ✅
```

### **PASO 5: Validar MongoDB (5 min)**
```bash
# Test de conexión MongoDB
curl http://localhost:3000/api/test-db
# Debe responder: {"ok":true,"message":"✅ Conexión MongoDB exitosa"}
```

### **PASO 6: Build de Prueba (5 min)**
```bash
# Build completo
npm run build

# Si falla:
# 1. Revisar errores TypeScript
# 2. Corregir imports
# 3. Limpiar .next
# 4. Intentar de nuevo
```

### **✅ CONFIRMACIÓN ANTES DE CONTINUAR:**

**Responde "SÍ" a todas estas preguntas:**
- [ ] ¿El proyecto arranca con `npm run dev`?
- [ ] ¿Se ve el sidebar en http://localhost:3000?
- [ ] ¿Los menús se expanden al hacer clic?
- [ ] ¿MongoDB conecta exitosamente?
- [ ] ¿`npm run build` termina sin errores?
- [ ] ¿`npx tsc --noEmit` devuelve 0 errores?

**Si todas las respuestas son "SÍ", continuar con FASE 1 (Copiado de archivos).**
**Si alguna es "NO", DETENER y corregir antes de continuar.**

---

## ✅ CHECKLIST POST-MIGRACIÓN

**Ejecutar DESPUÉS de migrar cada módulo:**

```bash
# 1. TypeScript
npx tsc --noEmit
# ✅ 0 errores

# 2. ESLint
npm run lint
# ✅ 0 errores

# 3. Build
npm run build
# ✅ Build exitoso

# 4. Test API en dev
curl http://localhost:3000/api/procesos/definiciones
# ✅ Responde JSON

# 5. Test Frontend
# Abrir http://localhost:3000/procesos/definiciones
# ✅ Renderiza correctamente

# 6. Test CRUD completo
# ✅ Crear, Leer, Actualizar, Eliminar funcionan
```

---

## 📊 CRITERIOS DE ÉXITO FINAL

### ✅ Checklist Completo (Todos deben cumplirse):

**Menús y Navegación (ENTREGABLE 0):**
- [ ] lib/menu-items.ts creado con todos los menús
- [ ] components/layout/Sidebar.tsx funcionando
- [ ] components/ui/index.ts con todos los exports
- [ ] app/layout.tsx actualizado con Sidebar
- [ ] Menú CRM completo (5 submódulos)
- [ ] Menú RRHH completo (6 submódulos)
- [ ] Menú Procesos completo (5 submódulos)
- [ ] Menú Calidad completo (4 submódulos)
- [ ] Navegación con estados activos
- [ ] Iconos lucide-react funcionando
- [ ] Responsive (mobile + desktop)
- [ ] Build sin errores de navegación

**Modelos:**
- [ ] 7 modelos creados y tipados
- [ ] Interfaces TypeScript exportadas
- [ ] Enums para estados y tipos
- [ ] Validaciones Mongoose exhaustivas
- [ ] Relaciones correctamente definidas
- [ ] Índices optimizados

**API Routes:**
- [ ] 15 archivos de rutas creados
- [ ] Validaciones Zod en todas las APIs
- [ ] Manejo de errores tipado
- [ ] Responses con tipos correctos
- [ ] Populate de relaciones funciona
- [ ] Filtros y búsquedas operativos

**Frontend:**
- [ ] 5 páginas principales de procesos
- [ ] 20+ componentes tipados
- [ ] React Hook Form + Zod
- [ ] PropTypes estrictos
- [ ] Estados tipados
- [ ] Eventos tipados

**Calidad:**
- [ ] TypeScript strict: 0 errores
- [ ] ESLint: 0 errores
- [ ] Build: Exitoso
- [ ] CRUD completo funcional
- [ ] Relaciones funcionando
- [ ] Sin warnings en consola
- [ ] Navegación fluida entre módulos

---

## 🎯 REPORTE FINAL

Al completar, generar:

```markdown
# ✅ MIGRACIÓN COMPLETADA: Módulos Procesos ISO 9001 + Navegación

## 📁 Archivos Creados:

### ENTREGABLE 0: Menús y Navegación (4):
- [x] lib/menu-items.ts
- [x] components/layout/Sidebar.tsx
- [x] components/ui/index.ts (actualizado)
- [x] app/layout.tsx (actualizado con Sidebar)

### Modelos (7):
- [x] models/ProcessDefinition.ts
- [x] models/ProcessRecord.ts
- [x] models/NormPoint.ts
- [x] models/NormProcessDocRelation.ts
- [x] models/QualityObjective.ts
- [x] models/QualityIndicator.ts
- [x] models/Measurement.ts

### API Routes (15):
- [x] app/api/procesos/definiciones/route.ts
- [x] app/api/procesos/definiciones/[id]/route.ts
- [x] app/api/procesos/registros/route.ts
- [x] app/api/procesos/registros/[id]/route.ts
- [x] app/api/procesos/registros/estadisticas/route.ts
- [x] app/api/procesos/objetivos/route.ts
- [x] app/api/procesos/objetivos/[id]/route.ts
- [x] app/api/procesos/objetivos/estadisticas/route.ts
- [x] app/api/procesos/indicadores/route.ts
- [x] app/api/procesos/indicadores/[id]/route.ts
- [x] app/api/procesos/indicadores/calcular/route.ts
- [x] app/api/procesos/mediciones/route.ts
- [x] app/api/procesos/mediciones/[id]/route.ts
- [x] app/api/procesos/mediciones/analisis/route.ts
- [x] app/api/procesos/normas/route.ts

### Páginas (8):
- [x] app/procesos/definiciones/page.tsx
- [x] app/procesos/registros/page.tsx
- [x] app/procesos/registros/[id]/page.tsx
- [x] app/procesos/objetivos/page.tsx
- [x] app/procesos/indicadores/page.tsx
- [x] app/procesos/indicadores/[id]/page.tsx
- [x] app/procesos/mediciones/page.tsx
- [x] app/calidad/normas/page.tsx

### Componentes (30+):
**Definiciones de Procesos (5):**
- [x] ProcessDefinitionForm.tsx
- [x] ProcessDefinitionList.tsx
- [x] ProcessDefinitionCard.tsx
- [x] ProcessDefinitionDetail.tsx
- [x] NormPointSelector.tsx

**Registros de Procesos (4):**
- [x] ProcessRecordForm.tsx
- [x] ProcessRecordList.tsx
- [x] ProcessRecordDetail.tsx
- [x] ProcessRecordTimeline.tsx

**Objetivos de Calidad (4):**
- [x] QualityObjectiveForm.tsx
- [x] QualityObjectiveList.tsx
- [x] QualityObjectiveCard.tsx
- [x] QualityObjectiveProgress.tsx

**Indicadores de Calidad (5):**
- [x] QualityIndicatorForm.tsx
- [x] QualityIndicatorList.tsx
- [x] QualityIndicatorCard.tsx
- [x] QualityIndicatorChart.tsx
- [x] QualityIndicatorFormula.tsx

**Mediciones (4):**
- [x] MeasurementForm.tsx
- [x] MeasurementList.tsx
- [x] MeasurementCard.tsx
- [x] MeasurementChart.tsx

**Navegación (Entregable 0):**
- [x] Menú CRM (5 submódulos)
- [x] Menú RRHH (6 submódulos)
- [x] Menú Procesos (5 submódulos)
- [x] Menú Calidad (4 submódulos)

## ✅ Validaciones:
- [x] TypeScript strict: 0 errores
- [x] ESLint: 0 errores
- [x] Build: Exitoso ✅
- [x] Navegación: Funcional ✅
- [x] Menús CRM: Completos ✅
- [x] Menús RRHH: Completos ✅
- [x] Menús Procesos: Completos ✅
- [x] CRUD Definiciones: Funcional ✅
- [x] CRUD Registros: Funcional ✅
- [x] CRUD Objetivos: Funcional ✅
- [x] CRUD Indicadores: Funcional ✅
- [x] CRUD Mediciones: Funcional ✅

## 📊 Resumen Total:
- **Total archivos creados:** 64+
- **Líneas de código:** ~8,000+
- **Modelos:** 7
- **API Routes:** 15
- **Páginas:** 8
- **Componentes:** 30+
- **Navegación:** 4 menús principales con 20+ submódulos

## 📸 Evidencias:
**Screenshots requeridos:**
1. Sidebar con menús expandidos
2. Menú CRM desplegado
3. Menú RRHH desplegado
4. Menú Procesos desplegado
5. Página /procesos/definiciones funcionando
6. Página /procesos/registros funcionando
7. Página /procesos/indicadores con gráficos
8. Build exitoso (terminal)
9. TypeScript 0 errores (terminal)

## ⏱️ Tiempo Real: [X] horas
**Tiempo estimado:** 16 horas (2h menús + 14h procesos)
**Tiempo real:** ___ horas

## 🎯 Resultados Clave:
✅ Navegación completa y funcional
✅ Todos los menús (CRM, RRHH, Procesos, Calidad) operativos
✅ Sistema de procesos ISO 9001 completamente migrado
✅ TypeScript estricto implementado
✅ Validaciones Zod en todas las APIs
✅ Sistema listo para producción
```

---

---

## 📊 RESUMEN VISUAL DEL PROYECTO

```
┌─────────────────────────────────────────────────────────────┐
│  MIGRACIÓN COMPLETA: PROCESOS ISO 9001 + NAVEGACIÓN        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📁 ENTREGABLE 0: NAVEGACIÓN (2h) - PRIMERO                │
│  ├─ lib/menu-items.ts                                       │
│  ├─ components/layout/Sidebar.tsx                           │
│  ├─ components/ui/index.ts (exports)                        │
│  └─ app/layout.tsx                                          │
│                                                              │
│  📦 MENÚS COMPLETOS:                                        │
│  ├─ 🏢 CRM (5 submódulos)                                  │
│  ├─ 👥 RRHH (6 submódulos)                                 │
│  ├─ 📄 Procesos (5 submódulos)                             │
│  └─ ✅ Calidad (4 submódulos)                              │
│                                                              │
│  ═══════════════════════════════════════════════════════════│
│                                                              │
│  📁 ENTREGABLES 1-5: MÓDULOS PROCESOS (14h)                │
│                                                              │
│  1️⃣ ProcessDefinition (3h)                                  │
│     ├─ Modelo + API + Componentes                           │
│     └─ Relaciones con NormPoint                             │
│                                                              │
│  2️⃣ ProcessRecord (3h)                                      │
│     ├─ Registros de ejecución                               │
│     └─ Timeline + Estados                                   │
│                                                              │
│  3️⃣ QualityObjective (2.5h)                                 │
│     ├─ Objetivos de calidad                                 │
│     └─ Seguimiento de progreso                              │
│                                                              │
│  4️⃣ QualityIndicator (3h)                                   │
│     ├─ Indicadores (KPI)                                    │
│     └─ Gráficos + Cálculos                                  │
│                                                              │
│  5️⃣ Measurement (2.5h)                                      │
│     ├─ Mediciones                                           │
│     └─ Análisis de tendencias                               │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  📊 TOTALES:                                                │
│  • Tiempo: 16 horas                                         │
│  • Archivos: 64+                                            │
│  • Líneas de código: ~8,000                                 │
│  • Modelos: 7                                               │
│  • API Routes: 15                                           │
│  • Páginas: 8                                               │
│  • Componentes: 30+                                         │
│  • Menús: 4 principales (20+ submódulos)                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 INICIO DE LA MIGRACIÓN

### **Paso Inicial (CRÍTICO):**

Antes de escribir cualquier código, confirma que entiendes:

```
✅ ENTENDIDO. Voy a:

1. PRIMERO (2 horas):
   - Copiar componentes UI desde v6
   - Crear lib/menu-items.ts con TODOS los menús
   - Crear components/layout/Sidebar.tsx
   - Arreglar components/ui/index.ts con exports
   - Actualizar app/layout.tsx
   - Verificar navegación funcional en localhost:3000

2. SOLO DESPUÉS (14 horas):
   - Migrar modelos de Procesos
   - Crear API Routes con Zod
   - Crear componentes frontend
   - Implementar CRUD completo

3. VALIDACIONES CONTINUAS:
   - TypeScript strict: 0 errores
   - Build exitoso
   - Navegación funcional

Tiempo estimado total: 16 horas

¿Comenzamos con el ENTREGABLE 0 (Menús)?
```

---

**🚀 ¿Listo para comenzar la migración de Procesos ISO 9001 + Navegación?**

_Versión: 2.0 | Fecha: Octubre 2025 | Incluye: Navegación Completa + Módulos Procesos_

