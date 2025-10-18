# 📋 TEMPLATE DE MIGRACIÓN DE MÓDULO

## 🎯 **MÓDULO: [NOMBRE_DEL_MODULO]**

### **📁 Archivos a Copiar desde v6:**

```
frontend/modules/[nombre_modulo]/
├── components/
│   ├── [Nombre]Form.jsx
│   ├── [Nombre]List.jsx
│   └── [Nombre]Card.jsx
├── pages/
│   └── index.jsx
└── hooks/
    └── use[Nombre].js

backend/models/[Nombre].js
backend/controllers/[nombre]Controller.js
backend/routes/[nombre]Routes.js
```

### **📁 Destino en v7:**

```
app/[ruta_modulo]/
├── page.tsx
└── components/
    ├── [Nombre]Form.tsx
    ├── [Nombre]List.tsx
    └── [Nombre]Card.tsx

models/[Nombre].ts
api/[nombre]/route.ts
```

### **🔧 Ajustes Necesarios:**

- [ ] Cambiar `require()` por `import`
- [ ] Usar `@/lib/dbConnect` para conexión MongoDB
- [ ] Adaptar rutas a Next.js App Router
- [ ] Convertir JSX a TSX
- [ ] Actualizar tipos TypeScript
- [ ] Implementar API Routes

### **✅ Checklist de Validación:**

**Antes del Deploy:**
- [ ] TypeScript compila sin errores
- [ ] ESLint pasa sin errores
- [ ] Build exitoso
- [ ] Conexión MongoDB funciona

**Después del Deploy:**
- [usuarios] Página renderiza correctamente
- [usuarios] API endpoints responden
- [usuarios] CRUD funciona
- [usuarios] Validaciones funcionan
- [usuarios] Responsive design

### **🚀 Comandos de Control:**

```bash
# Verificar módulo
npm run migration:check

# Verificar y deployar
npm run migration:deploy

# Verificar en servidor
curl https://tu-dominio.com/api/[nombre_modulo]
```

---

**📝 Notas:**
- Reemplazar `[NOMBRE_DEL_MODULO]` con el nombre real del módulo
- Reemplazar `[nombre_modulo]` con la versión en minúsculas
- Reemplazar `[Nombre]` con la versión capitalizada
- Reemplazar `[ruta_modulo]` con la ruta en la app

