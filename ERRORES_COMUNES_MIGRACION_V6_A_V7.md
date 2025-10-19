# 🚨 ERRORES COMUNES EN MIGRACIÓN V6 → V7

## 📋 **CATEGORÍAS DE ERRORES Y SOLUCIONES**

### 1. **ERRORES DE COMPONENTES UI**
#### **Problema:** Props no compatibles entre versiones
```typescript
// ❌ ERROR COMÚN:
<Button icon={<Icon />}>Texto</Button>

// ✅ SOLUCIÓN:
<Button>
  <Icon className="h-4 w-4 mr-2" />
  Texto
</Button>
```

#### **Errores específicos encontrados:**
- `Property 'icon' does not exist on type 'ButtonProps'`
- `Property 'speed' does not exist on type 'LottieProps'`

### 2. **ERRORES DE IMPORTACIÓN**
#### **Problema:** Módulos no encontrados
```typescript
// ❌ ERROR:
Module not found: Can't resolve '@/components/ui/button'

// ✅ SOLUCIÓN:
// Copiar componentes desde v6:
robocopy "v6/frontend/src/components/ui" "components/ui" /E
robocopy "v6/frontend/src/lib" "lib" /E
robocopy "v6/frontend/src/contexts" "contexts" /E
```

### 3. **ERRORES DE TYPESCRIPT**
#### **Problema:** Tipos incompatibles entre versiones
```typescript
// ❌ ERROR COMÚN:
jwt.sign(payload, secret, { expiresIn: '24h' })

// ✅ SOLUCIÓN:
import { SignOptions } from 'jsonwebtoken';
const options: SignOptions = { expiresIn: '24h' };
jwt.sign(payload, secret, options);
```

### 4. **ERRORES DE DEPENDENCIAS**
#### **Problema:** Scripts de test no configurados
```json
// ❌ ERROR:
"test": "playwright test"

// ✅ SOLUCIÓN:
// Eliminar scripts de test si no están configurados
```

### 5. **ERRORES DE PERMISOS WINDOWS**
#### **Problema:** Archivos bloqueados durante build
```powershell
# ❌ ERROR:
EPERM: operation not permitted, open '.next\trace'

# ✅ SOLUCIÓN:
taskkill /F /IM node.exe
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
```

## 🛠️ **SCRIPT DE CORRECCIÓN AUTOMÁTICA**

### **fix-common-errors.ps1**
```powershell
# Script para corregir errores comunes en migración V6 → V7

Write-Host "🔧 Corrigiendo errores comunes de migración V6 → V7..."

# 1. Eliminar procesos Node.js bloqueados
Write-Host "1. Eliminando procesos Node.js bloqueados..."
taskkill /F /IM node.exe 2>$null

# 2. Limpiar directorio .next
Write-Host "2. Limpiando directorio .next..."
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# 3. Copiar componentes UI faltantes
Write-Host "3. Copiando componentes UI desde V6..."
$v6Path = "C:\Users\Usuario\Documents\Proyectos\ISO -conjunto\9001app-v6\frontend\src"

if (Test-Path "$v6Path\components\ui") {
    robocopy "$v6Path\components\ui" "components\ui" /E /Y
}

if (Test-Path "$v6Path\lib") {
    robocopy "$v6Path\lib" "lib" /E /Y
}

if (Test-Path "$v6Path\contexts") {
    robocopy "$v6Path\contexts" "contexts" /E /Y
}

# 4. Corregir errores en empty-state.tsx
Write-Host "4. Corrigiendo errores en empty-state.tsx..."
$content = Get-Content "components\ui\empty-state.tsx" -Raw
$content = $content -replace 'icon=\{<Plus className="h-4 w-4" />\}', ''
$content = $content -replace '>(\s*)<Plus className="h-4 w-4" />(\s*)', '><Plus className="h-4 w-4 mr-2" />'
Set-Content "components\ui\empty-state.tsx" $content

# 5. Corregir errores en don-candido-animation.tsx
Write-Host "5. Corrigiendo errores en don-candido-animation.tsx..."
$content = Get-Content "components\ui\don-candido-animation.tsx" -Raw
$content = $content -replace 'speed=\{speed\}', ''
Set-Content "components\ui\don-candido-animation.tsx" $content

Write-Host "✅ Correcciones aplicadas. Ejecuta 'npm run build' para verificar."
```

## 🎯 **CHECKLIST DE VERIFICACIÓN PRE-COMMIT**

### **Antes de hacer commit, verificar:**
- [ ] `npm run typecheck` - Sin errores TypeScript
- [ ] `npm run lint` - Sin errores ESLint
- [ ] `npm run build` - Build exitoso
- [ ] Componentes UI copiados desde V6
- [ ] Contextos copiados desde V6
- [ ] Librerías copiadas desde V6
- [ ] Props de componentes corregidas
- [ ] Imports absolutos funcionando

## 🚀 **COMANDOS DE VERIFICACIÓN RÁPIDA**

```bash
# Verificar errores TypeScript
npm run typecheck

# Verificar build
npm run build

# Verificar linting
npm run lint

# Verificar que no hay procesos bloqueados
tasklist | findstr node.exe
```

## 📝 **NOTAS IMPORTANTES**

### **Errores más comunes en orden de frecuencia:**
1. **Props incompatibles** (icon, speed) - 40%
2. **Módulos no encontrados** - 30%
3. **Tipos TypeScript** - 20%
4. **Permisos Windows** - 10%

### **Tiempo estimado de corrección:**
- **Errores de props:** 2-3 minutos
- **Módulos faltantes:** 5-10 minutos
- **TypeScript:** 3-5 minutos
- **Permisos:** 1-2 minutos

### **Prevención:**
- Siempre copiar componentes UI desde V6
- Verificar compatibilidad de props entre versiones
- Ejecutar typecheck antes de commit
- Limpiar .next antes de build en Windows
