# 🎯 PROMPT DE MIGRACIÓN: MÓDULOS PROCESOS ISO 9001 (VERSIÓN CORTA)

## 📋 CONTEXTO

Eres un asistente IA especializado en migración de código. Tu tarea es migrar los módulos de **Procesos ISO 9001** desde **9001app-v6** hacia **9001app-v7** (Next.js 14 + MongoDB + TypeScript).

**Módulos a migrar:**
1. **ProcessDefinition** (Definiciones de Procesos)
2. **ProcessRecord** (Registros de Procesos con Kanban)
3. **QualityObjective** (Objetivos de Calidad)
4. **QualityIndicator** (Indicadores de Calidad)
5. **Measurement** (Mediciones)
6. **Menú lateral izquierdo** (Sidebar con navegación básica)

**Tiempo estimado: 12-14 horas**

---

## 🎯 ENTREGABLES

### ✅ ENTREGABLE 1: Menú Lateral (Sidebar) - 1.5 horas

**Archivos a crear:**
```
components/layout/Sidebar.tsx
lib/menu-items.ts
app/layout.tsx (actualizar)
```

**Código del Sidebar:**

```typescript
// lib/menu-items.ts
import { Home, FileText, Target, TrendingUp, BarChart3, Settings } from 'lucide-react';

export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
  { 
    id: 'procesos', 
    label: 'Procesos ISO', 
    icon: FileText,
    submenu: [
      { id: 'definiciones', label: 'Definiciones', href: '/procesos/definiciones' },
      { id: 'registros', label: 'Registros', href: '/procesos/registros' },
    ]
  },
  { 
    id: 'calidad', 
    label: 'Calidad', 
    icon: Target,
    submenu: [
      { id: 'objetivos', label: 'Objetivos', href: '/calidad/objetivos' },
      { id: 'indicadores', label: 'Indicadores', href: '/calidad/indicadores' },
      { id: 'mediciones', label: 'Mediciones', href: '/calidad/mediciones' },
    ]
  },
  { id: 'admin', label: 'Admin', icon: Settings, href: '/admin' },
];
```

```typescript
// components/layout/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/lib/menu-items';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(['procesos', 'calidad']);

  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => 
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">9001APP v7</h1>
        <p className="text-gray-400 text-sm">Sistema ISO 9001</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map(item => (
          <div key={item.id}>
            {item.href ? (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive(item.href) ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {openMenus.includes(item.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {openMenus.includes(item.id) && item.submenu && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.submenu.map(subItem => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className={`block px-4 py-2 rounded-lg text-sm ${
                          isActive(subItem.href) ? 'bg-blue-600' : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {subItem.label}
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

```typescript
// app/layout.tsx - ACTUALIZAR
import Sidebar from '@/components/layout/Sidebar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-gray-50 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

---

### ✅ ENTREGABLE 2: ProcessDefinition (Definiciones de Procesos) - 3 horas

**Archivos a crear:**
```
models/ProcessDefinition.ts
app/api/procesos/definiciones/route.ts
app/api/procesos/definiciones/[id]/route.ts
app/procesos/definiciones/page.tsx
```

**Modelo:**

```typescript
// models/ProcessDefinition.ts
import mongoose, { Schema, Document } from 'mongoose';

export enum ProcessType {
  ESTRATEGICO = 'estrategico',
  OPERATIVO = 'operativo',
  SOPORTE = 'soporte',
}

export interface IProcessDefinition extends Document {
  codigo: string;
  nombre: string;
  descripcion: string;
  tipo: ProcessType;
  propietario: mongoose.Types.ObjectId;
  departamento?: mongoose.Types.ObjectId;
  activo: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const ProcessDefinitionSchema = new Schema<IProcessDefinition>(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: /^PROC-[A-Z0-9-]+$/,
    },
    nombre: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    descripcion: {
      type: String,
      required: true,
      minlength: 10,
    },
    tipo: {
      type: String,
      enum: Object.values(ProcessType),
      required: true,
    },
    propietario: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    departamento: {
      type: Schema.Types.ObjectId,
      ref: 'Departamento',
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' } }
);

export default mongoose.models.ProcessDefinition || 
  mongoose.model<IProcessDefinition>('ProcessDefinition', ProcessDefinitionSchema);
```

**API Route:**

```typescript
// app/api/procesos/definiciones/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ProcessDefinition from '@/models/ProcessDefinition';

export async function GET() {
  try {
    await dbConnect();
    const procesos = await ProcessDefinition.find({ activo: true })
      .populate('propietario', 'nombre email')
      .populate('departamento', 'nombre')
      .sort({ codigo: 1 });

    return NextResponse.json({ success: true, data: procesos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const proceso = await ProcessDefinition.create(body);
    return NextResponse.json({ success: true, data: proceso }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
```

**Página:**

```typescript
// app/procesos/definiciones/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function DefinicionesPage() {
  const [procesos, setProcesos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/procesos/definiciones')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProcesos(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Definiciones de Procesos</h1>
      <div className="grid gap-4">
        {procesos.map((proceso: any) => (
          <div key={proceso._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{proceso.codigo} - {proceso.nombre}</h3>
            <p className="text-sm text-gray-600">{proceso.descripcion}</p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {proceso.tipo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### ✅ ENTREGABLE 3: ProcessRecord con Kanban - 4 horas

**Archivos a crear:**
```
models/ProcessRecord.ts
app/api/procesos/registros/route.ts
app/procesos/registros/page.tsx
app/procesos/registros/components/KanbanBoard.tsx
```

**Modelo:**

```typescript
// models/ProcessRecord.ts
import mongoose, { Schema, Document } from 'mongoose';

export enum ProcessStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado',
}

export interface IProcessRecord extends Document {
  proceso: mongoose.Types.ObjectId;
  titulo: string;
  descripcion?: string;
  estado: ProcessStatus;
  responsable: mongoose.Types.ObjectId;
  fechaInicio?: Date;
  fechaFin?: Date;
  prioridad: 'baja' | 'media' | 'alta';
  fechaCreacion: Date;
}

const ProcessRecordSchema = new Schema<IProcessRecord>(
  {
    proceso: {
      type: Schema.Types.ObjectId,
      ref: 'ProcessDefinition',
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    descripcion: String,
    estado: {
      type: String,
      enum: Object.values(ProcessStatus),
      default: ProcessStatus.PENDIENTE,
    },
    responsable: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fechaInicio: Date,
    fechaFin: Date,
    prioridad: {
      type: String,
      enum: ['baja', 'media', 'alta'],
      default: 'media',
    },
  },
  { timestamps: { createdAt: 'fechaCreacion' } }
);

export default mongoose.models.ProcessRecord || 
  mongoose.model<IProcessRecord>('ProcessRecord', ProcessRecordSchema);
```

**Kanban Component:**

```typescript
// app/procesos/registros/components/KanbanBoard.tsx
'use client';

import { ProcessStatus } from '@/models/ProcessRecord';

interface KanbanBoardProps {
  registros: any[];
  onUpdateStatus: (id: string, newStatus: ProcessStatus) => void;
}

export default function KanbanBoard({ registros, onUpdateStatus }: KanbanBoardProps) {
  const columns = [
    { id: ProcessStatus.PENDIENTE, title: 'Pendiente', color: 'bg-gray-100' },
    { id: ProcessStatus.EN_PROCESO, title: 'En Proceso', color: 'bg-blue-100' },
    { id: ProcessStatus.COMPLETADO, title: 'Completado', color: 'bg-green-100' },
  ];

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'border-l-4 border-red-500';
      case 'media': return 'border-l-4 border-yellow-500';
      case 'baja': return 'border-l-4 border-green-500';
      default: return '';
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {columns.map(column => (
        <div key={column.id} className={`${column.color} p-4 rounded-lg`}>
          <h3 className="font-bold mb-4">{column.title}</h3>
          <div className="space-y-3">
            {registros
              .filter(r => r.estado === column.id)
              .map(registro => (
                <div
                  key={registro._id}
                  className={`bg-white p-4 rounded-lg shadow cursor-move ${getPriorityColor(registro.prioridad)}`}
                  draggable
                  onDragEnd={() => {
                    // Implementar lógica de drag & drop
                  }}
                >
                  <h4 className="font-semibold text-sm">{registro.titulo}</h4>
                  <p className="text-xs text-gray-600 mt-1">{registro.descripcion}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {registro.proceso?.codigo}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      registro.prioridad === 'alta' ? 'bg-red-100 text-red-700' :
                      registro.prioridad === 'media' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {registro.prioridad}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Página con Kanban:**

```typescript
// app/procesos/registros/page.tsx
'use client';

import { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import { ProcessStatus } from '@/models/ProcessRecord';

export default function RegistrosPage() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegistros();
  }, []);

  const loadRegistros = async () => {
    const res = await fetch('/api/procesos/registros');
    const data = await res.json();
    if (data.success) setRegistros(data.data);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, newStatus: ProcessStatus) => {
    await fetch(`/api/procesos/registros/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: newStatus }),
    });
    loadRegistros();
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Registros de Procesos - Kanban</h1>
      <KanbanBoard registros={registros} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
}
```

---

### ✅ ENTREGABLE 4: QualityObjective (Objetivos de Calidad) - 2 horas

**Archivos:**
```
models/QualityObjective.ts
app/api/calidad/objetivos/route.ts
app/calidad/objetivos/page.tsx
```

**Modelo:**

```typescript
// models/QualityObjective.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IQualityObjective extends Document {
  codigo: string;
  descripcion: string;
  meta: number;
  unidad: string;
  proceso?: mongoose.Types.ObjectId;
  responsable: mongoose.Types.ObjectId;
  fechaInicio: Date;
  fechaFin: Date;
  avance: number;
  activo: boolean;
}

const QualityObjectiveSchema = new Schema<IQualityObjective>({
  codigo: { type: String, required: true, unique: true, uppercase: true },
  descripcion: { type: String, required: true },
  meta: { type: Number, required: true },
  unidad: { type: String, required: true },
  proceso: { type: Schema.Types.ObjectId, ref: 'ProcessDefinition' },
  responsable: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  avance: { type: Number, default: 0, min: 0, max: 100 },
  activo: { type: Boolean, default: true },
});

export default mongoose.models.QualityObjective || 
  mongoose.model<IQualityObjective>('QualityObjective', QualityObjectiveSchema);
```

**Página con progreso:**

```typescript
// app/calidad/objetivos/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ObjetivosPage() {
  const [objetivos, setObjetivos] = useState([]);

  useEffect(() => {
    fetch('/api/calidad/objetivos')
      .then(res => res.json())
      .then(data => data.success && setObjetivos(data.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Objetivos de Calidad</h1>
      <div className="grid gap-4">
        {objetivos.map((obj: any) => (
          <div key={obj._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">{obj.codigo}</h3>
                <p className="text-gray-600">{obj.descripcion}</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">{obj.avance}%</span>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  obj.avance >= 80 ? 'bg-green-500' :
                  obj.avance >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${obj.avance}%` }}
              />
            </div>
            
            <div className="mt-3 text-sm text-gray-500">
              Meta: {obj.meta} {obj.unidad}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### ✅ ENTREGABLE 5: QualityIndicator (Indicadores) - 2.5 horas

**Archivos:**
```
models/QualityIndicator.ts
app/api/calidad/indicadores/route.ts
app/calidad/indicadores/page.tsx
```

**Modelo:**

```typescript
// models/QualityIndicator.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IQualityIndicator extends Document {
  codigo: string;
  nombre: string;
  descripcion: string;
  objetivo?: mongoose.Types.ObjectId;
  proceso?: mongoose.Types.ObjectId;
  formula: string;
  meta: number;
  unidad: string;
  frecuencia: 'diaria' | 'semanal' | 'mensual' | 'trimestral' | 'anual';
  responsable: mongoose.Types.ObjectId;
  activo: boolean;
}

const QualityIndicatorSchema = new Schema<IQualityIndicator>({
  codigo: { type: String, required: true, unique: true, uppercase: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  objetivo: { type: Schema.Types.ObjectId, ref: 'QualityObjective' },
  proceso: { type: Schema.Types.ObjectId, ref: 'ProcessDefinition' },
  formula: { type: String, required: true },
  meta: { type: Number, required: true },
  unidad: { type: String, required: true },
  frecuencia: { 
    type: String, 
    enum: ['diaria', 'semanal', 'mensual', 'trimestral', 'anual'],
    default: 'mensual' 
  },
  responsable: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activo: { type: Boolean, default: true },
});

export default mongoose.models.QualityIndicator || 
  mongoose.model<IQualityIndicator>('QualityIndicator', QualityIndicatorSchema);
```

**Página:**

```typescript
// app/calidad/indicadores/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function IndicadoresPage() {
  const [indicadores, setIndicadores] = useState([]);

  useEffect(() => {
    fetch('/api/calidad/indicadores')
      .then(res => res.json())
      .then(data => data.success && setIndicadores(data.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Indicadores de Calidad</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {indicadores.map((ind: any) => (
          <div key={ind._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg">{ind.codigo}</h3>
                <p className="text-gray-600 text-sm">{ind.nombre}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                {ind.frecuencia}
              </span>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Fórmula:</p>
              <code className="text-sm font-mono">{ind.formula}</code>
            </div>
            
            <div className="mt-3 flex justify-between text-sm">
              <span>Meta: <strong>{ind.meta} {ind.unidad}</strong></span>
              <span className="text-gray-500">{ind.proceso?.codigo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### ✅ ENTREGABLE 6: Measurement (Mediciones) - 2 horas

**Archivos:**
```
models/Measurement.ts
app/api/calidad/mediciones/route.ts
app/calidad/mediciones/page.tsx
```

**Modelo:**

```typescript
// models/Measurement.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMeasurement extends Document {
  indicador: mongoose.Types.ObjectId;
  fecha: Date;
  valor: number;
  responsable: mongoose.Types.ObjectId;
  observaciones?: string;
  fechaRegistro: Date;
}

const MeasurementSchema = new Schema<IMeasurement>({
  indicador: { 
    type: Schema.Types.ObjectId, 
    ref: 'QualityIndicator', 
    required: true 
  },
  fecha: { type: Date, required: true },
  valor: { type: Number, required: true },
  responsable: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  observaciones: String,
}, { timestamps: { createdAt: 'fechaRegistro' } });

export default mongoose.models.Measurement || 
  mongoose.model<IMeasurement>('Measurement', MeasurementSchema);
```

**Página con tabla:**

```typescript
// app/calidad/mediciones/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function MedicionesPage() {
  const [mediciones, setMediciones] = useState([]);

  useEffect(() => {
    fetch('/api/calidad/mediciones')
      .then(res => res.json())
      .then(data => data.success && setMediciones(data.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mediciones</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Indicador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Observaciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mediciones.map((med: any) => (
              <tr key={med._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(med.fecha).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  {med.indicador?.codigo} - {med.indicador?.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold text-lg">
                    {med.valor} {med.indicador?.unidad}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {med.observaciones || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

### Pre-Migración:
```bash
# 1. Instalar dependencias
npm install
npm install lucide-react

# 2. Verificar MongoDB
type .env  # Debe tener MONGO_URI

# 3. Verificar dbConnect existe
dir lib\dbConnect.ts
```

### Post-Migración:
```bash
# 1. TypeScript sin errores
npx tsc --noEmit

# 2. Build exitoso
npm run build

# 3. Verificar en navegador
npm run dev
# http://localhost:3000/procesos/definiciones
# http://localhost:3000/procesos/registros
# http://localhost:3000/calidad/objetivos
# http://localhost:3000/calidad/indicadores
# http://localhost:3000/calidad/mediciones
```

---

## 📊 RESUMEN

| Entregable | Tiempo | Archivos |
|------------|--------|----------|
| Menú Sidebar | 1.5h | 3 |
| Definiciones | 3h | 4 |
| Registros (Kanban) | 4h | 5 |
| Objetivos | 2h | 3 |
| Indicadores | 2.5h | 3 |
| Mediciones | 2h | 3 |
| **TOTAL** | **15h** | **21** |

---

**🚀 ¿Listo para comenzar?**

Responde: "✅ Entendido. Empiezo con el Sidebar y luego los módulos uno por uno."

