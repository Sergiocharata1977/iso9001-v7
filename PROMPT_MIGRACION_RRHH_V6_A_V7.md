# 🎯 PROMPT DE MIGRACIÓN: MÓDULOS RRHH (Departamentos, Puestos, Personal)

## 📋 CONTEXTO

Eres un asistente IA especializado en migración de código. Tu tarea es migrar los módulos de **Departamentos**, **Puestos** y **Personal** desde **9001app-v6** hacia **9001app-v7** (Next.js 14 + MongoDB + TypeScript).

---

## 🎯 OBJETIVOS PRINCIPALES

1. **Copiar archivos** desde v6 manteniendo la lógica existente
2. **Adaptar imports y rutas** a Next.js 14 App Router
3. **Convertir a TypeScript** con tipos estrictos
4. **Integrar con MongoDB** usando `@/lib/dbConnect`
5. **Mantener funcionalidad CRUD** completa
6. **Cumplir estándares del proyecto** (nomenclatura, case sensitivity)

---

## 📦 ENTREGABLES ESPECÍFICOS

### ✅ ENTREGABLE 1: Módulo DEPARTAMENTOS
**Tiempo estimado: 2 horas**

**Archivos a entregar:**
```
models/Departamento.ts                           // Modelo Mongoose
app/api/departamentos/route.ts                   // API CRUD (GET, POST)
app/api/departamentos/[id]/route.ts              // API CRUD (GET, PUT, DELETE)
app/rrhh/departamentos/page.tsx                  // Página principal
app/rrhh/departamentos/components/               // Componentes
    ├── DepartamentoForm.tsx
    ├── DepartamentoList.tsx
    └── DepartamentoCard.tsx
```

**Criterios de aceptación:**
- [ ] Modelo Mongoose con validaciones TypeScript
- [ ] API endpoints funcionando (GET, POST, PUT, DELETE)
- [ ] Página renderiza correctamente
- [ ] Formulario de creación/edición funcional
- [ ] Listado con acciones (editar, eliminar)
- [ ] Validaciones de frontend y backend
- [ ] Build exitoso sin errores TypeScript

---

### ✅ ENTREGABLE 2: Módulo PUESTOS
**Tiempo estimado: 2 horas**

**Archivos a entregar:**
```
models/Puesto.ts                                 // Modelo Mongoose
app/api/puestos/route.ts                         // API CRUD (GET, POST)
app/api/puestos/[id]/route.ts                    // API CRUD (GET, PUT, DELETE)
app/rrhh/puestos/page.tsx                        // Página principal
app/rrhh/puestos/components/                     // Componentes
    ├── PuestoForm.tsx
    ├── PuestoList.tsx
    └── PuestoCard.tsx
```

**Criterios de aceptación:**
- [ ] Modelo Mongoose con relación a Departamentos
- [ ] API endpoints funcionando (GET, POST, PUT, DELETE)
- [ ] Página renderiza correctamente
- [ ] Formulario con selector de departamento
- [ ] Listado con acciones (editar, eliminar)
- [ ] Relación con departamentos funcional
- [ ] Build exitoso sin errores TypeScript

---

### ✅ ENTREGABLE 3: Módulo PERSONAL
**Tiempo estimado: 3 horas**

**Archivos a entregar:**
```
models/Personal.ts                               // Modelo Mongoose
app/api/personal/route.ts                        // API CRUD (GET, POST)
app/api/personal/[id]/route.ts                   // API CRUD (GET, PUT, DELETE)
app/rrhh/personal/page.tsx                       // Página principal
app/rrhh/personal/components/                    // Componentes
    ├── PersonalForm.tsx
    ├── PersonalList.tsx
    └── PersonalCard.tsx
```

**Criterios de aceptación:**
- [ ] Modelo Mongoose con relaciones a Departamentos y Puestos
- [ ] API endpoints funcionando (GET, POST, PUT, DELETE)
- [ ] Página renderiza correctamente
- [ ] Formulario con selectores de departamento y puesto
- [ ] Listado con acciones (editar, eliminar)
- [ ] Relaciones funcionando correctamente
- [ ] Build exitoso sin errores TypeScript

---

## 🔄 PROCESO DE MIGRACIÓN (PASO A PASO)

### 📁 FASE 1: COPIADO DE ARCHIVOS (30 min)

**Paso 1.1 - Localizar archivos en v6:**
```bash
# Ruta base: ../9001app-v6/

# Modelos Backend:
backend/src/models/Departamento.js
backend/src/models/Position.js (o Puesto.js)
backend/src/models/Personnel.js (o Personal.js)

# Controladores Backend:
backend/src/controllers/departamentoController.js
backend/src/controllers/positionController.js
backend/src/controllers/personnelController.js

# Páginas Frontend:
frontend/src/app/rrhh/departamentos/
frontend/src/app/rrhh/puestos/
frontend/src/app/rrhh/personal/
```

**Paso 1.2 - Copiar archivos a v7:**
```bash
# Crear estructura de carpetas
mkdir -p models
mkdir -p app/api/departamentos
mkdir -p app/api/puestos
mkdir -p app/api/personal
mkdir -p app/rrhh/departamentos/components
mkdir -p app/rrhh/puestos/components
mkdir -p app/rrhh/personal/components

# Copiar archivos (sin modificar aún)
# - Modelos → models/
# - Controladores → convertir a API routes
# - Componentes → app/rrhh/[modulo]/components/
# - Páginas → app/rrhh/[modulo]/page.tsx
```

---

### 🔧 FASE 2: ADAPTACIÓN DE MODELOS (45 min)

**Para cada modelo (Departamento, Puesto, Personal):**

**Paso 2.1 - Convertir a TypeScript:**
```typescript
// models/Departamento.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Definir interfaz TypeScript
export interface IDepartamento extends Document {
  nombre: string;
  descripcion?: string;
  codigo?: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

// 2. Definir schema Mongoose
const DepartamentoSchema = new Schema<IDepartamento>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      unique: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    codigo: {
      type: String,
      trim: true,
      uppercase: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'fechaCreacion',
      updatedAt: 'fechaActualizacion',
    },
  }
);

// 3. Exportar modelo con verificación
const Departamento: Model<IDepartamento> =
  mongoose.models.Departamento ||
  mongoose.model<IDepartamento>('Departamento', DepartamentoSchema);

export default Departamento;
```

**Paso 2.2 - Ajustes específicos:**
- ✅ Cambiar `require()` por `import`
- ✅ Agregar tipos TypeScript a todos los campos
- ✅ Mantener validaciones de v6
- ✅ Agregar `mongoose.models` check para Hot Reload
- ✅ Exportar interfaz y modelo

**Paso 2.3 - Relaciones (Puesto y Personal):**
```typescript
// models/Puesto.ts
departamento: {
  type: Schema.Types.ObjectId,
  ref: 'Departamento',
  required: [true, 'El departamento es obligatorio'],
}

// models/Personal.ts
departamento: {
  type: Schema.Types.ObjectId,
  ref: 'Departamento',
  required: true,
},
puesto: {
  type: Schema.Types.ObjectId,
  ref: 'Puesto',
  required: true,
}
```

---

### 🚀 FASE 3: CREACIÓN DE API ROUTES (1 hora)

**Para cada módulo, crear dos archivos de ruta:**

**Archivo 1: `app/api/[modulo]/route.ts` (GET all, POST)**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Departamento from '@/models/Departamento';

// GET - Listar todos
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const departamentos = await Departamento.find({ activo: true })
      .sort({ fechaCreacion: -1 });

    return NextResponse.json({
      success: true,
      data: departamentos,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const departamento = await Departamento.create(body);

    return NextResponse.json(
      {
        success: true,
        data: departamento,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }
}
```

**Archivo 2: `app/api/[modulo]/[id]/route.ts` (GET, PUT, DELETE)**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Departamento from '@/models/Departamento';

// GET - Obtener uno
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const departamento = await Departamento.findById(params.id);

    if (!departamento) {
      return NextResponse.json(
        { success: false, error: 'Departamento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: departamento,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Actualizar
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();
    const departamento = await Departamento.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!departamento) {
      return NextResponse.json(
        { success: false, error: 'Departamento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: departamento,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE - Eliminar (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const departamento = await Departamento.findByIdAndUpdate(
      params.id,
      { activo: false },
      { new: true }
    );

    if (!departamento) {
      return NextResponse.json(
        { success: false, error: 'Departamento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: departamento,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

**Ajustes para Puestos y Personal:**
- Para **Puestos**: Agregar `.populate('departamento')` en GET
- Para **Personal**: Agregar `.populate('departamento puesto')` en GET

---

### 🎨 FASE 4: COMPONENTES FRONTEND (2 horas)

**Estructura de cada módulo:**

**Archivo: `app/rrhh/[modulo]/page.tsx`**

```typescript
'use client';

import { useState, useEffect } from 'react';
import DepartamentoForm from './components/DepartamentoForm';
import DepartamentoList from './components/DepartamentoList';

export default function DepartamentosPage() {
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar departamentos
  const fetchDepartamentos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/departamentos');
      const data = await response.json();

      if (data.success) {
        setDepartamentos(data.data);
      }
    } catch (error) {
      console.error('Error al cargar departamentos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Departamentos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario */}
        <DepartamentoForm
          departamento={selectedDepartamento}
          onSuccess={() => {
            fetchDepartamentos();
            setSelectedDepartamento(null);
          }}
          onCancel={() => setSelectedDepartamento(null)}
        />

        {/* Listado */}
        <DepartamentoList
          departamentos={departamentos}
          isLoading={isLoading}
          onEdit={setSelectedDepartamento}
          onDelete={fetchDepartamentos}
        />
      </div>
    </div>
  );
}
```

**Archivo: `app/rrhh/[modulo]/components/[Modulo]Form.tsx`**

```typescript
'use client';

import { useState, useEffect } from 'react';

interface DepartamentoFormProps {
  departamento: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function DepartamentoForm({
  departamento,
  onSuccess,
  onCancel,
}: DepartamentoFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    codigo: '',
  });

  useEffect(() => {
    if (departamento) {
      setFormData({
        nombre: departamento.nombre || '',
        descripcion: departamento.descripcion || '',
        codigo: departamento.codigo || '',
      });
    }
  }, [departamento]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = departamento
        ? `/api/departamentos/${departamento._id}`
        : '/api/departamentos';

      const method = departamento ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Departamento guardado exitosamente');
        setFormData({ nombre: '', descripcion: '', codigo: '' });
        onSuccess();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el departamento');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {departamento ? 'Editar' : 'Nuevo'} Departamento
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Nombre *
        </label>
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) =>
            setFormData({ ...formData, nombre: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Código</label>
        <input
          type="text"
          value={formData.codigo}
          onChange={(e) =>
            setFormData({ ...formData, codigo: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Descripción
        </label>
        <textarea
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {departamento ? 'Actualizar' : 'Crear'}
        </button>

        {departamento && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
```

**Archivo: `app/rrhh/[modulo]/components/[Modulo]List.tsx`**

```typescript
'use client';

interface DepartamentoListProps {
  departamentos: any[];
  isLoading: boolean;
  onEdit: (departamento: any) => void;
  onDelete: () => void;
}

export default function DepartamentoList({
  departamentos,
  isLoading,
  onEdit,
  onDelete,
}: DepartamentoListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este departamento?')) {
      return;
    }

    try {
      const response = await fetch(`/api/departamentos/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Departamento eliminado exitosamente');
        onDelete();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar el departamento');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        Lista de Departamentos ({departamentos.length})
      </h2>

      <div className="space-y-3">
        {departamentos.map((departamento) => (
          <div
            key={departamento._id}
            className="border p-4 rounded-md hover:bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{departamento.nombre}</h3>
                {departamento.codigo && (
                  <p className="text-sm text-gray-600">
                    Código: {departamento.codigo}
                  </p>
                )}
                {departamento.descripcion && (
                  <p className="text-sm text-gray-700 mt-1">
                    {departamento.descripcion}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(departamento)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(departamento._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {departamentos.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No hay departamentos registrados
          </p>
        )}
      </div>
    </div>
  );
}
```

**Ajustes para Puestos:**
- Agregar selector de departamento en el formulario
- Mostrar departamento en el listado

**Ajustes para Personal:**
- Agregar selectores de departamento y puesto
- Agregar campos adicionales (email, teléfono, etc.)
- Mostrar más información en el listado

---

### ✅ FASE 5: VALIDACIÓN Y TESTING (30 min)

**Checklist de validación:**

```bash
# 1. Verificar TypeScript
npx tsc --noEmit

# 2. Verificar ESLint
npm run lint

# 3. Build de prueba
npm run build

# 4. Iniciar en modo desarrollo
npm run dev
```

**Probar CRUD completo para cada módulo:**
- [ ] ✅ Crear nuevo registro
- [ ] ✅ Listar registros
- [ ] ✅ Editar registro existente
- [ ] ✅ Eliminar registro
- [ ] ✅ Validaciones funcionan
- [ ] ✅ Relaciones se muestran correctamente (Puestos/Personal)

**Verificar en navegador:**
```
http://localhost:3000/rrhh/departamentos
http://localhost:3000/rrhh/puestos
http://localhost:3000/rrhh/personal
```

**Verificar API endpoints:**
```bash
# GET
curl http://localhost:3000/api/departamentos

# POST
curl -X POST http://localhost:3000/api/departamentos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"IT","codigo":"IT01"}'
```

---

## 📏 ESTÁNDARES OBLIGATORIOS

### 🔤 Nomenclatura (CRÍTICO)

**✅ CORRECTO:**
```
models/Departamento.ts                    // PascalCase
models/Puesto.ts                          // PascalCase
models/Personal.ts                        // PascalCase

app/rrhh/departamentos/page.tsx           // kebab-case (carpetas)
app/rrhh/departamentos/components/        // kebab-case (carpetas)
    DepartamentoForm.tsx                  // PascalCase (componentes)
    DepartamentoList.tsx                  // PascalCase (componentes)
```

**❌ INCORRECTO:**
```
models/departamento.ts                    // ❌ minúsculas
app/rrhh/Departamentos/page.tsx          // ❌ PascalCase en carpeta
components/departamento-form.tsx          // ❌ kebab-case en componente
```

### 📦 Imports (OBLIGATORIO)

**✅ USAR IMPORTS ABSOLUTOS:**
```typescript
import dbConnect from '@/lib/dbConnect';
import Departamento from '@/models/Departamento';
```

**❌ NO USAR IMPORTS RELATIVOS:**
```typescript
import dbConnect from '../../../lib/dbConnect';  // ❌
```

### 🎯 Tipos TypeScript (OBLIGATORIO)

**Todos los archivos deben tener:**
- ✅ Interfaces para modelos (`IDepartamento`, `IPuesto`, `IPersonal`)
- ✅ Props tipadas en componentes
- ✅ Tipos en funciones API
- ✅ Sin usar `any` (excepto en catch de errors)

---

## 🚦 CRITERIOS DE ÉXITO FINAL

### ✅ Checklist Final (Todos deben cumplirse):

**Modelos:**
- [ ] 3 modelos creados (Departamento, Puesto, Personal)
- [ ] Interfaces TypeScript exportadas
- [ ] Validaciones Mongoose configuradas
- [ ] Relaciones funcionando (Puesto→Departamento, Personal→Puesto/Departamento)

**API Routes:**
- [ ] 6 archivos de rutas creados (2 por módulo)
- [ ] GET all funciona para cada módulo
- [ ] POST funciona para cada módulo
- [ ] GET by ID funciona para cada módulo
- [ ] PUT funciona para cada módulo
- [ ] DELETE (soft) funciona para cada módulo
- [ ] Populate de relaciones funciona

**Frontend:**
- [ ] 3 páginas principales creadas
- [ ] 9 componentes creados (3 por módulo)
- [ ] Formularios funcionan (crear y editar)
- [ ] Listados muestran datos correctamente
- [ ] Acciones de editar/eliminar funcionan
- [ ] Selectores de relaciones funcionan (Puestos/Personal)

**Calidad del Código:**
- [ ] TypeScript compila sin errores (`npx tsc --noEmit`)
- [ ] ESLint pasa sin errores (`npm run lint`)
- [ ] Build exitoso (`npm run build`)
- [ ] Nomenclatura cumple estándares del proyecto
- [ ] Imports absolutos (`@/`) en todos los archivos
- [ ] Sin warnings en consola

**Funcionalidad:**
- [ ] CRUD completo funciona para Departamentos
- [ ] CRUD completo funciona para Puestos
- [ ] CRUD completo funciona para Personal
- [ ] Relaciones se guardan y muestran correctamente
- [ ] Validaciones frontend y backend funcionan

---

## 📊 REPORTE FINAL ESPERADO

Al completar la tarea, proporcionar:

```markdown
# ✅ MIGRACIÓN COMPLETADA: Módulos RRHH

## 📁 Archivos Creados:

### Modelos (3):
- [x] models/Departamento.ts
- [x] models/Puesto.ts
- [x] models/Personal.ts

### API Routes (6):
- [x] app/api/departamentos/route.ts
- [x] app/api/departamentos/[id]/route.ts
- [x] app/api/puestos/route.ts
- [x] app/api/puestos/[id]/route.ts
- [x] app/api/personal/route.ts
- [x] app/api/personal/[id]/route.ts

### Páginas (3):
- [x] app/rrhh/departamentos/page.tsx
- [x] app/rrhh/puestos/page.tsx
- [x] app/rrhh/personal/page.tsx

### Componentes (9):
- [x] app/rrhh/departamentos/components/DepartamentoForm.tsx
- [x] app/rrhh/departamentos/components/DepartamentoList.tsx
- [x] app/rrhh/departamentos/components/DepartamentoCard.tsx
- [x] app/rrhh/puestos/components/PuestoForm.tsx
- [x] app/rrhh/puestos/components/PuestoList.tsx
- [x] app/rrhh/puestos/components/PuestoCard.tsx
- [x] app/rrhh/personal/components/PersonalForm.tsx
- [x] app/rrhh/personal/components/PersonalList.tsx
- [x] app/rrhh/personal/components/PersonalCard.tsx

## ✅ Validaciones:
- [x] TypeScript: 0 errores
- [x] ESLint: 0 errores
- [x] Build: Exitoso
- [x] CRUD Departamentos: Funcional ✅
- [x] CRUD Puestos: Funcional ✅
- [x] CRUD Personal: Funcional ✅

## 📸 Evidencias:
- Screenshot de `/rrhh/departamentos`
- Screenshot de `/rrhh/puestos`
- Screenshot de `/rrhh/personal`
- Log de build exitoso

## 🎯 Tiempo Real: [X] horas
```

---

## 🚨 ADVERTENCIAS CRÍTICAS

### ⚠️ ERRORES COMUNES A EVITAR:

1. **Case Sensitivity**: Windows ≠ Linux
   - ✅ `from '@/models/Departamento'` (si archivo es `Departamento.ts`)
   - ❌ `from '@/models/departamento'`

2. **Imports relativos**:
   - ❌ `from '../../../models/Departamento'`
   - ✅ `from '@/models/Departamento'`

3. **Olvidar dbConnect**:
   ```typescript
   // ✅ SIEMPRE en API routes
   await dbConnect();
   ```

4. **No exportar interfaces**:
   ```typescript
   // ✅ Exportar siempre
   export interface IDepartamento extends Document { ... }
   ```

5. **Usar `any` sin necesidad**:
   - ✅ Tipar todo correctamente
   - ❌ `const data: any = ...`

---

## 🎓 RECURSOS DE REFERENCIA

**Archivos base ya existentes en v7:**
```
lib/dbConnect.ts              // Conexión MongoDB
models/User.ts                // Ejemplo de modelo
app/api/auth/login/route.ts   // Ejemplo de API route
```

**Documentación:**
- Next.js 14 App Router: https://nextjs.org/docs/app
- Mongoose TypeScript: https://mongoosejs.com/docs/typescript.html
- MongoDB Atlas: Conectado y funcionando

---

## 🚀 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev

# Verificar tipos
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build

# Ver estructura
tree models app/rrhh app/api
```

---

## ✅ INICIO DE LA TAREA

**Confirma que entiendes la tarea respondiendo:**

```
✅ Entendido. Voy a migrar los módulos de:
1. Departamentos
2. Puestos  
3. Personal

Comenzaré por:
- Fase 1: Copiar archivos desde v6
- Fase 2: Adaptar modelos a TypeScript + Mongoose
- Fase 3: Crear API routes
- Fase 4: Crear componentes frontend
- Fase 5: Validar y testear

Tiempo estimado: 6-7 horas
```

**¿Estás listo para comenzar?**

---

_Este prompt fue generado para la migración específica de módulos RRHH de 9001app-v6 a v7._  
_Fecha: Octubre 2025_  
_Versión: 1.0_


