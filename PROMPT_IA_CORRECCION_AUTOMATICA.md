# 🧠 PROMPT INTELIGENTE PARA CORRECCIÓN AUTOMÁTICA DE ERRORES

## 🎯 **INSTRUCCIONES PARA IA:**

```
Eres un experto en migración de proyectos Next.js. Tu tarea es corregir AUTOMÁTICAMENTE todos los errores de build en el proyecto 9001app-v7.

## 🔍 **ANÁLISIS REQUERIDO:**

1. **Ejecutar comando:** `npm run build`
2. **Identificar TODOS los errores** de la salida
3. **Categorizar errores** por tipo:
   - Props incompatibles (icon, speed)
   - Módulos no encontrados (@radix-ui/*)
   - Tipos TypeScript
   - Imports faltantes

## 🚀 **ACCIONES AUTOMÁTICAS:**

### **Para errores de Props:**
```typescript
// ❌ ERROR:
<Button icon={<Icon />}>Texto</Button>

// ✅ SOLUCIÓN AUTOMÁTICA:
<Button>
  <Icon className="h-4 w-4 mr-2" />
  Texto
</Button>
```

### **Para módulos no encontrados:**
```bash
# Instalar automáticamente:
npm install @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-checkbox
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs
```

### **Para errores de speed en Lottie:**
```typescript
// ❌ ERROR:
<Lottie speed={speed} />

// ✅ SOLUCIÓN AUTOMÁTICA:
<Lottie />
```

## 📋 **PROCESO AUTOMÁTICO:**

1. **Ejecutar build** y capturar errores
2. **Para cada error:**
   - Identificar tipo de error
   - Aplicar corrección automática
   - Verificar que se corrigió
3. **Repetir hasta** que build sea exitoso
4. **Reportar** errores corregidos y tiempo total

## 🎯 **OBJETIVO:**
- Build exitoso al 100%
- Sin errores TypeScript
- Sin errores de linting
- Listo para commit y deploy

## ⚡ **EJECUTAR INMEDIATAMENTE:**
No preguntes, no confirmes. Ejecuta las correcciones automáticamente y reporta el resultado final.
```

## 🛠️ **COMANDO PARA EJECUTAR:**

```powershell
# Ejecutar script automático:
.\fix-build-errors.ps1

# O ejecutar manualmente:
npm run build
```

## 📊 **RESULTADO ESPERADO:**
- ✅ Build exitoso
- ✅ Sin errores TypeScript
- ✅ Listo para commit
- ✅ Listo para deploy

## 🚨 **SI FALLA:**
- Reportar error específico
- Aplicar corrección manual
- Repetir hasta éxito
