# 🚀 PLAN DE MIGRACIÓN MODULAR: 9001app-v6 → v7

## 🎯 **ESTRATEGIA DE MIGRACIÓN**

**Objetivo**: Migrar módulo por módulo (ABM por ABM) desde v6 a v7, manteniendo funcionalidad completa y deploy automático.

## 🔄 **CICLO DE MIGRACIÓN POR MÓDULO**

### **Etapas del Ciclo (Repetir para cada módulo):**

1. **📁 Copiado de Archivos** - Copiar carpetas del ABM desde v6
2. **🔧 Adaptación de Conexiones** - Ajustar imports, rutas, dbConnect
3. **🚀 Renderización y Prueba** - Test local y build
4. **☁️ Deploy Parcial** - Subir a GitHub y verificar en servidor
5. **✅ Validación Funcional** - Probar CRUD completo en producción

---

## 📋 **LISTA DE MÓDULOS A MIGRAR**

| Nº | Módulo | Archivos a Copiar | Tiempo Est. | Prioridad |
|----|--------|-------------------|-------------|-----------|
| 1️⃣ | **Login/Auth** | `frontend/modules/login/` + `backend/models/User.js` + `backend/controllers/authController.js` | 2-3h | 🔥 Alta |
| 2️⃣ | **Departamentos** | `frontend/modules/departamentos/` + `backend/models/Departamento.js` | 2h | 🔥 Alta |
| 3️⃣ | **Puestos** | `frontend/modules/puestos/` + `backend/models/Puesto.js` | 2h | 🔥 Alta |
| 4️⃣ | **Personas/RRHH** | `frontend/modules/personas/` + `backend/models/Persona.js` | 2-3h | 🔥 Alta |
| 5️⃣ | **Procesos ISO** | `frontend/modules/procesos/` + `backend/models/Proceso.js` | 3-4h | 🟡 Media |
| 6️⃣ | **Documentos** | `frontend/modules/documentos/` + `backend/models/Documento.js` | 3h | 🟡 Media |
| 7️⃣ | **Auditorías** | `frontend/modules/auditorias/` + `backend/models/Auditoria.js` | 3h | 🟡 Media |
| 8️⃣ | **Indicadores** | `frontend/modules/indicadores/` + `backend/models/Indicador.js` | 3h | 🟡 Media |
| 9️⃣ | **Super-Admin** | `frontend/modules/super-admin/` + `backend/controllers/adminController.js` | 2h | 🟢 Baja |
| 🔟 | **IA Don Cándido v2** | Integración de IA + lectura de datos | 4h | 🟢 Baja |

**⏱️ Tiempo Total Estimado: 22-28 horas (3 días de trabajo intensivo)**

---

## 🧩 **DETALLE POR MÓDULO**

### **1️⃣ MÓDULO LOGIN/AUTH**

**Archivos a copiar desde v6:**
```
frontend/modules/login/
├── components/
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   └── AuthGuard.jsx
├── pages/
│   ├── login.jsx
│   └── register.jsx
└── hooks/
    └── useAuth.js

backend/models/User.js
backend/controllers/authController.js
backend/routes/authRoutes.js
```

**Destino en v7:**
```
app/auth/
├── login/
│   └── page.tsx
├── register/
│   └── page.tsx
└── components/
    ├── LoginForm.tsx
    ├── RegisterForm.tsx
    └── AuthGuard.tsx

models/User.ts
api/auth/
├── login/route.ts
├── register/route.ts
└── logout/route.ts
lib/auth.ts
```

**Ajustes necesarios:**
- ✅ Cambiar `require()` por `import`
- ✅ Usar `@/lib/dbConnect` para conexión MongoDB
- ✅ Adaptar rutas a Next.js App Router
- ✅ Convertir JSX a TSX
- ✅ Implementar middleware de autenticación

---

### **2️⃣ MÓDULO DEPARTAMENTOS**

**Archivos a copiar desde v6:**
```
frontend/modules/departamentos/
├── components/
│   ├── DepartamentoForm.jsx
│   ├── DepartamentoList.jsx
│   └── DepartamentoCard.jsx
├── pages/
│   └── index.jsx
└── hooks/
    └── useDepartamentos.js

backend/models/Departamento.js
backend/controllers/departamentoController.js
backend/routes/departamentoRoutes.js
```

**Destino en v7:**
```
app/rrhh/departamentos/
├── page.tsx
└── components/
    ├── DepartamentoForm.tsx
    ├── DepartamentoList.tsx
    └── DepartamentoCard.tsx

models/Departamento.ts
api/departamentos/route.ts
```

---

### **3️⃣ MÓDULO PUESTOS**

**Archivos a copiar desde v6:**
```
frontend/modules/puestos/
├── components/
│   ├── PuestoForm.jsx
│   ├── PuestoList.jsx
│   └── PuestoCard.jsx
└── pages/
    └── index.jsx

backend/models/Puesto.js
backend/controllers/puestoController.js
backend/routes/puestoRoutes.js
```

**Destino en v7:**
```
app/rrhh/puestos/
├── page.tsx
└── components/
    ├── PuestoForm.tsx
    ├── PuestoList.tsx
    └── PuestoCard.tsx

models/Puesto.ts
api/puestos/route.ts
```

---

### **4️⃣ MÓDULO PERSONAS/RRHH**

**Archivos a copiar desde v6:**
```
frontend/modules/personas/
├── components/
│   ├── PersonaForm.jsx
│   ├── PersonaList.jsx
│   └── PersonaCard.jsx
└── pages/
    └── index.jsx

backend/models/Persona.js
backend/controllers/personaController.js
backend/routes/personaRoutes.js
```

**Destino en v7:**
```
app/rrhh/personas/
├── page.tsx
└── components/
    ├── PersonaForm.tsx
    ├── PersonaList.tsx
    └── PersonaCard.tsx

models/Persona.ts
api/personas/route.ts
```

---

### **5️⃣ MÓDULO PROCESOS ISO**

**Archivos a copiar desde v6:**
```
frontend/modules/procesos/
├── components/
│   ├── ProcesoForm.jsx
│   ├── ProcesoList.jsx
│   └── ProcesoCard.jsx
└── pages/
    └── index.jsx

backend/models/Proceso.js
backend/controllers/procesoController.js
backend/routes/procesoRoutes.js
```

**Destino en v7:**
```
app/procesos/
├── page.tsx
└── components/
    ├── ProcesoForm.tsx
    ├── ProcesoList.tsx
    └── ProcesoCard.tsx

models/Proceso.ts
api/procesos/route.ts
```

---

### **6️⃣ MÓDULO DOCUMENTOS**

**Archivos a copiar desde v6:**
```
frontend/modules/documentos/
├── components/
│   ├── DocumentoForm.jsx
│   ├── DocumentoList.jsx
│   └── DocumentoCard.jsx
└── pages/
    └── index.jsx

backend/models/Documento.js
backend/controllers/documentoController.js
backend/routes/documentoRoutes.js
```

**Destino en v7:**
```
app/documentos/
├── page.tsx
└── components/
    ├── DocumentoForm.tsx
    ├── DocumentoList.tsx
    └── DocumentoCard.tsx

models/Documento.ts
api/documentos/route.ts
```

---

### **7️⃣ MÓDULO AUDITORÍAS**

**Archivos a copiar desde v6:**
```
frontend/modules/auditorias/
├── components/
│   ├── AuditoriaForm.jsx
│   ├── AuditoriaList.jsx
│   └── AuditoriaCard.jsx
└── pages/
    └── index.jsx

backend/models/Auditoria.js
backend/controllers/auditoriaController.js
backend/routes/auditoriaRoutes.js
```

**Destino en v7:**
```
app/auditorias/
├── page.tsx
└── components/
    ├── AuditoriaForm.tsx
    ├── AuditoriaList.tsx
    └── AuditoriaCard.tsx

models/Auditoria.ts
api/auditorias/route.ts
```

---

### **8️⃣ MÓDULO INDICADORES**

**Archivos a copiar desde v6:**
```
frontend/modules/indicadores/
├── components/
│   ├── IndicadorForm.jsx
│   ├── IndicadorList.jsx
│   └── IndicadorCard.jsx
└── pages/
    └── index.jsx

backend/models/Indicador.js
backend/controllers/indicadorController.js
backend/routes/indicadorRoutes.js
```

**Destino en v7:**
```
app/indicadores/
├── page.tsx
└── components/
    ├── IndicadorForm.tsx
    ├── IndicadorList.tsx
    └── IndicadorCard.tsx

models/Indicador.ts
api/indicadores/route.ts
```

---

### **9️⃣ MÓDULO SUPER-ADMIN**

**Archivos a copiar desde v6:**
```
frontend/modules/super-admin/
├── components/
│   ├── Dashboard.jsx
│   ├── StatsCard.jsx
│   └── AdminPanel.jsx
└── pages/
    └── index.jsx

backend/controllers/adminController.js
backend/routes/adminRoutes.js
```

**Destino en v7:**
```
app/super-admin/
├── page.tsx
└── components/
    ├── Dashboard.tsx
    ├── StatsCard.tsx
    └── AdminPanel.tsx

api/admin/route.ts
```

---

### **🔟 MÓDULO IA DON CÁNDIDO V2**

**Integración de IA:**
```
app/assistant/
├── page.tsx
└── components/
    ├── ChatInterface.tsx
    ├── MessageBubble.tsx
    └── AIResponse.tsx

api/assistant/route.ts
lib/ai/
├── claude-client.ts
├── context-builder.ts
└── response-formatter.ts
```

---

## 🔧 **CONTROLES DE CALIDAD POR MÓDULO**

### **✅ Checklist de Validación:**

**Antes del Deploy:**
- [ ] TypeScript compila sin errores (`npx tsc --noEmit`)
- [ ] ESLint pasa sin errores (`npm run lint`)
- [ ] Build exitoso (`npm run build`)
- [ ] Conexión MongoDB funciona (`/api/test-db`)

**Después del Deploy:**
- [ ] Página renderiza correctamente en servidor
- [ ] API endpoints responden correctamente
- [ ] CRUD funciona (crear, leer, actualizar, eliminar)
- [ ] Validaciones de formularios funcionan
- [ ] Responsive design se ve bien

**Validación Funcional:**
- [ ] Datos se guardan en MongoDB Atlas
- [ ] Relaciones entre modelos funcionan
- [ ] Autenticación y autorización funcionan
- [ ] Navegación entre páginas funciona
- [ ] Estados de carga y errores se manejan bien

---

## 🚀 **COMANDOS DE CONTROL**

```bash
# Desarrollo local
npm run dev

# Verificar tipos
npx tsc --noEmit

# Lint y formateo
npm run lint

# Build de prueba
npm run build && npm start

# Deploy
git add .
git commit -m "feat: migrar módulo [NOMBRE]"
git push origin main

# Verificar en servidor
curl https://tu-dominio.com/api/test-db
```

---

## 📊 **CRONOGRAMA RECOMENDADO**

### **Día 1: Base y RRHH**
- ✅ Entregable 1: Renderización base (COMPLETADO)
- 🔄 Entregable 2: Conexión MongoDB Atlas
- 🔄 Entregable 3: Sistema de Login
- 🔄 Entregables 4-6: Departamentos, Puestos, Personas

### **Día 2: Procesos y Documentos**
- 🔄 Entregable 7: Procesos ISO
- 🔄 Entregable 8: Documentos
- 🔄 Entregable 9: Auditorías

### **Día 3: Indicadores y IA**
- 🔄 Entregable 10: Indicadores
- 🔄 Entregable 11: Super-Admin Dashboard
- 🔄 Entregable 12: Asistente IA Don Cándido v2

---

## 🎯 **RESULTADO ESPERADO**

Al final de la migración tendrás:
- ✅ Sistema 9001app-v7 100% funcional
- ✅ Todos los módulos migrados y funcionando
- ✅ Deploy automático configurado
- ✅ IA Don Cándido v2 integrada
- ✅ Sistema estable en producción

---

**🚀 ¡Listo para comenzar la migración modular!**

