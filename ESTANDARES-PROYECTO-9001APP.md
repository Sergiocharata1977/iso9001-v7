# 📐 ESTÁNDARES DEL PROYECTO 9001APP-V6

**Versión**: 1.0  
**Fecha**: 17 de Octubre 2025  
**Documento Obligatorio para TODAS las IAs**

---

## ⚠️ REGLA DE ORO: CASE SENSITIVITY

Este proyecto se desarrolla en **Windows** pero se despliega en **Linux (Hostinger VPS)**.

- **Windows**: Case-insensitive (`Logo.tsx` = `logo.tsx`)
- **Linux**: Case-sensitive (`Logo.tsx` ≠ `logo.tsx`)

**CONSECUENCIA**: Los imports DEBEN coincidir EXACTAMENTE con los nombres de archivo.

---

## 📁 CONVENCIONES DE NOMENCLATURA

### 1. **Componentes UI Base (shadcn/ui)** ✅

```
Formato: kebab-case.tsx
Ubicación: frontend/src/components/ui/
Ejemplos:
  - button.tsx
  - input.tsx
  - card.tsx
  - select.tsx
  
Imports:
  import { Button } from '@/components/ui/button'
  import { Card } from '@/components/ui/card'
```

### 2. **Componentes Personalizados/Custom** ✅

```
Formato: PascalCase.tsx
Ubicación: frontend/src/components/ui/
Ejemplos:
  - Modal.tsx
  - DataTable.tsx
  - LoadingSpinner.tsx
  - UnifiedKanban.tsx
  - KanbanCard.tsx
  
Imports:
  import { Modal } from '@/components/ui/Modal'
  import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
  import { UnifiedKanban } from '@/components/ui/UnifiedKanban'
```

### 3. **Componentes de Módulos** ✅

```
Formato: PascalCase.tsx
Ubicación: frontend/src/components/[modulo]/
Ejemplos:
  - components/crm/EmpresasForm.tsx
  - components/rrhh/PersonalForm.tsx
  - components/process/ProcessListing.tsx
  
Imports:
  import { EmpresasForm } from '@/components/crm/EmpresasForm'
  import { PersonalForm } from '@/components/rrhh/PersonalForm'
```

### 4. **Hooks** ✅

```
Formato: camelCase.ts (con prefijo 'use')
Ubicación: frontend/src/hooks/
Ejemplos:
  - useABM.ts
  - useAuth.ts
  - useToast.ts
  
Imports:
  import { useABM } from '@/hooks/useABM'
  import useAuth from '@/hooks/useAuth'
```

### 5. **Servicios** ✅

```
Formato: camelCase.ts (con sufijo 'Service')
Ubicación: frontend/src/services/
Ejemplos:
  - crmService.ts
  - authService.ts
  - processService.ts
  
Imports:
  import { crmService } from '@/services/crmService'
```

### 6. **Páginas (Next.js App Router)** ✅

```
Formato: kebab-case (carpetas) + page.tsx
Ubicación: frontend/src/app/
Ejemplos:
  - app/crm/page.tsx
  - app/rrhh/personal-abm/page.tsx
  - app/procesos/[id]/kanban/page.tsx
```

### 7. **Carpetas** ✅

```
Formato: kebab-case o camelCase (NUNCA PascalCase)
Correctos:
  - components/rrhh/ ✅
  - components/crm/ ✅
  - app/super-admin/ ✅
  
Incorrectos:
  - components/RRHH/ ❌
  - components/CRM/ ❌
```

---

## 🚫 REGLAS ESTRICTAS

### ❌ PROHIBIDO

1. **Mezclar mayúsculas y minúsculas en nombres de carpetas**
   ```
   ❌ components/RRHH/
   ✅ components/rrhh/
   ```

2. **Usar kebab-case para componentes custom**
   ```
   ❌ components/ui/loading-spinner.tsx (si es custom)
   ✅ components/ui/LoadingSpinner.tsx
   ```

3. **Imports que no coincidan con archivos**
   ```
   ❌ from '@/components/ui/logout-button' // si archivo es LogoutButton.tsx
   ✅ from '@/components/ui/LogoutButton'
   ```

4. **Imports relativos para componentes UI**
   ```
   ❌ from '../../../ui/UnifiedKanban'
   ✅ from '@/components/ui/UnifiedKanban'
   ```

### ✅ OBLIGATORIO

1. **Siempre usar imports absolutos (`@/`)**
   ```typescript
   ✅ import { Modal } from '@/components/ui/Modal'
   ❌ import { Modal } from '../../../components/ui/Modal'
   ```

2. **Verificar case en TODOS los imports**
   ```typescript
   // Si el archivo es LoadingSpinner.tsx
   ✅ from '@/components/ui/LoadingSpinner'
   ❌ from '@/components/ui/loading-spinner'
   ```

3. **Mantener consistencia en exports de index.ts**
   ```typescript
   // frontend/src/components/ui/index.ts
   export { LoadingSpinner } from './LoadingSpinner'  // ✅
   export { button } from './button'  // ❌
   ```

---

## 🔧 CONFIGURACIÓN DEL PROYECTO

### tsconfig.json (OBLIGATORIO)

```json
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,  // ⚠️ CRÍTICO
    "strict": true
  }
}
```

### .eslintrc.json (RECOMENDADO)

```json
{
  "rules": {
    "import/no-unresolved": ["error", {
      "caseSensitive": true
    }]
  }
}
```

---

## 📋 CHECKLIST PARA IAs

Antes de crear o modificar archivos, verificar:

- [ ] ¿El nombre del archivo sigue la convención correcta?
- [ ] ¿Los imports usan la ruta absoluta (`@/`)?
- [ ] ¿El case del import coincide con el archivo?
- [ ] ¿La carpeta está en minúsculas o camelCase?
- [ ] ¿He verificado que no exista el archivo con otro case?

---

## 🔍 COMANDOS DE VERIFICACIÓN

### Buscar imports problemáticos

```powershell
# Windows PowerShell
Get-ChildItem -Path "frontend\src" -Recurse -Include *.tsx,*.ts | Select-String "@/components/ui/[a-z-]+" | Where-Object { $_.Line -notmatch "(button|input|card|badge)" }
```

```bash
# Linux/Mac
grep -r "@/components/ui/[a-z-]" frontend/src --include="*.tsx" --include="*.ts"
```

### Verificar archivos con mayúsculas inconsistentes

```powershell
# Buscar archivos con PascalCase en carpetas que deberían ser minúsculas
Get-ChildItem -Path "frontend\src\components" -Recurse -Directory | Where-Object { $_.Name -cmatch "^[A-Z]" }
```

---

## 🎯 MAPA RÁPIDO DE DECISIONES

```
┌─ ¿Es un componente de shadcn/ui?
│  ├─ SÍ → kebab-case.tsx (button.tsx)
│  └─ NO → ¿Es un componente?
│          ├─ SÍ → PascalCase.tsx (Modal.tsx)
│          └─ NO → ¿Es un hook?
│                  ├─ SÍ → camelCase.ts (useABM.ts)
│                  └─ NO → ¿Es un servicio?
│                          ├─ SÍ → camelCase.ts (crmService.ts)
│                          └─ NO → ¿Es una página?
│                                  └─ SÍ → kebab-case/page.tsx
```

---

## 🚀 WORKFLOW PARA NUEVOS COMPONENTES

### Crear componente UI custom:

```typescript
// 1. Crear archivo: LoadingSpinner.tsx (PascalCase)
// frontend/src/components/ui/LoadingSpinner.tsx
export function LoadingSpinner() {
  return <div>Loading...</div>
}

// 2. Exportar en index.ts
// frontend/src/components/ui/index.ts
export { LoadingSpinner } from './LoadingSpinner'

// 3. Usar en otros archivos
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
// O
import { LoadingSpinner } from '@/components/ui'
```

---

## ⚡ COMANDOS RÁPIDOS

```bash
# Build local (Windows)
npm run build

# Verificar errores TypeScript
npx tsc --noEmit

# Limpiar y rebuild
rm -rf .next && npm run build
```

---

## 📞 SOPORTE

Si una IA encuentra un error de "Module not found":

1. **Verificar el nombre del archivo físico**
   ```bash
   ls -la frontend/src/components/ui/ | grep -i "loading"
   ```

2. **Verificar el import**
   ```typescript
   // Si archivo es LoadingSpinner.tsx
   ✅ from '@/components/ui/LoadingSpinner'
   ❌ from '@/components/ui/loading-spinner'
   ```

3. **Verificar index.ts**
   ```typescript
   // Debe tener:
   export { LoadingSpinner } from './LoadingSpinner'
   ```

---

## 🔄 PROCESO DE CORRECCIÓN

Si se encuentra un problema de case sensitivity:

1. **NO renombrar archivos** (Git en Windows tiene problemas)
2. **SÍ corregir los imports** para que coincidan con los archivos
3. **Actualizar index.ts** si es necesario
4. **Verificar con build** antes de commit

---

**Última actualización**: 17 de Octubre 2025  
**Mantenido por**: Equipo 9001app-v6  
**Versión**: 1.0

---

_Este documento es la única fuente de verdad para nomenclatura en el proyecto._

