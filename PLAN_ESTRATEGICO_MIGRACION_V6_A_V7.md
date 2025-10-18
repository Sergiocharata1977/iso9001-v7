# 🚀 PLAN ESTRATÉGICO DE MIGRACIÓN: 9001app-v6 → v7

## 🎯 **CONSIDERACIONES ESTRATÉGICAS CLAVE**

### **✅ Principios Fundamentales:**
1. **Copiar archivos v6** - NO recrear desde cero
2. **Sistema multi-tenant** - Planificar desde el principio
3. **Login/Auth** - Esencial y crítico
4. **Procesos como eje central** - Definiciones primero, registros después
5. **RRHH en 3 etapas** - Organización, desarrollo, resto

---

## 📋 **PLAN DE MIGRACIÓN REORGANIZADO**

### **🏗️ FASE 0: FUNDAMENTOS (Crítico)**
**Tiempo estimado: 4-6 horas**

1. ✅ **Renderización Base** - COMPLETADO
2. ✅ **Conexión MongoDB Atlas** - COMPLETADO
3. 🔄 **Login/Auth + Sistema Multi-tenant** - CRÍTICO
   - Copiar: `User.ts`, `authController.ts`, `authRoutes.ts`
   - Adaptar: Multi-tenant desde el inicio
   - Validar: Autenticación JWT + permisos

### **👥 FASE 1: RRHH - ETAPA 1 (Organización)**
**Tiempo estimado: 4-5 horas**

4. 🔄 **Departamentos**
   - Copiar: `departamentos.ts`, `departmentController.ts`, `departmentRoutes.ts`
   - Adaptar: Estructura Next.js 14

5. 🔄 **Puestos/Positions**
   - Copiar: `Position.ts`, `positionController.ts`, `positionRoutes.ts`
   - Adaptar: Relación con departamentos

6. 🔄 **Personal/Personnel**
   - Copiar: `Personnel.ts`, `personnelController.ts`, `personnelRoutes.ts`
   - Adaptar: Relaciones con departamentos y puestos

### **🎓 FASE 2: RRHH - ETAPA 2 (Desarrollo)**
**Tiempo estimado: 6-8 horas**

7. 🔄 **RRHH_Capacitaciones**
   - Copiar: `RRHH_Capacitaciones.ts`, `RRHH_TemasCapacitacion.ts`
   - Adaptar: Sistema de capacitaciones

8. 🔄 **RRHH_EvaluacionesIndividuales**
   - Copiar: `RRHH_EvaluacionesIndividuales.ts`, `RRHH_EvaluacionProgramacion.ts`
   - Adaptar: Sistema de evaluaciones

9. 🔄 **GestionDesempeno**
   - Copiar: `GestionDesempeno.ts`, `gestionDesempenoController.ts`
   - Adaptar: Gestión de desempeño

10. 🔄 **IndicadoresRRHH**
    - Copiar: `IndicadoresRRHH.ts`, `indicadoresRRHHController.ts`
    - Adaptar: Indicadores de RRHH

### **⚙️ FASE 3: PROCESOS - DEFINICIONES (Eje Central)**
**Tiempo estimado: 8-10 horas**

11. 🔄 **ProcessDefinition** - DEFINICIONES DE PROCESOS
    - Copiar: `ProcessDefinition.ts`, `processDefinitionController.ts`
    - Adaptar: Definiciones de procesos (CRÍTICO)

12. 🔄 **NormPoint** - PUNTOS DE NORMA
    - Copiar: `NormPoint.ts`, `normPointController.ts`
    - Adaptar: Puntos de norma ISO

13. 🔄 **NormProcessDocRelation** - RELACIONES
    - Copiar: `NormProcessDocRelation.ts`, `normProcessDocRelationController.ts`
    - Adaptar: Relaciones norma-proceso-documento

14. 🔄 **QualityIndicator** - INDICADORES DE CALIDAD
    - Copiar: `QualityIndicator.ts`, `qualityIndicatorController.ts`
    - Adaptar: Indicadores de calidad

15. 🔄 **QualityObjective** - OBJETIVOS DE CALIDAD
    - Copiar: `QualityObjective.ts`, `qualityObjectiveController.ts`
    - Adaptar: Objetivos de calidad

### **📄 FASE 4: DOCUMENTACIÓN**
**Tiempo estimado: 4-5 horas**

16. 🔄 **Documentos**
    - Copiar: `documentos.ts`, `documentCategoryController.ts`
    - Adaptar: Gestión de documentos

17. 🔄 **DocumentCategory**
    - Copiar: `DocumentCategory.ts`, `documentCategoryController.ts`
    - Adaptar: Categorías de documentos

18. 🔄 **DocumentTemplate**
    - Copiar: `DocumentTemplate.ts`, `documentTemplateController.ts`
    - Adaptar: Plantillas de documentos

### **🔍 FASE 5: AUDITORÍAS Y HALLAZGOS**
**Tiempo estimado: 4-5 horas**

19. 🔄 **Auditorias**
    - Copiar: `Audit.ts`, `auditController.ts`
    - Adaptar: Gestión de auditorías

20. 🔄 **Hallazgos**
    - Copiar: `hallazgos.ts`, `findingController.ts`
    - Adaptar: Gestión de hallazgos

### **📊 FASE 6: DASHBOARD Y SUPER-ADMIN**
**Tiempo estimado: 3-4 horas**

21. 🔄 **Super-Admin**
    - Copiar: Estructura del dashboard
    - Adaptar: Panel de administración

22. 🔄 **Dashboard**
    - Copiar: Dashboard principal
    - Adaptar: Métricas y KPIs

### **🤖 FASE 7: IA DON CÁNDIDO**
**Tiempo estimado: 4-5 horas**

23. 🔄 **DonCandido**
    - Copiar: `donCandido.routes.ts`, `DonCandidoUsage.ts`
    - Adaptar: Asistente IA

---

## ⏱️ **CRONOGRAMA OPTIMIZADO**

| Fase | Módulos | Tiempo | Día |
|------|---------|--------|-----|
| **Fase 0** | Login + Multi-tenant | 4-6h | Día 1 |
| **Fase 1** | RRHH Organización (3) | 4-5h | Día 1 |
| **Fase 2** | RRHH Desarrollo (4) | 6-8h | Día 2 |
| **Fase 3** | Procesos Definiciones (5) | 8-10h | Día 2-3 |
| **Fase 4** | Documentación (3) | 4-5h | Día 3 |
| **Fase 5** | Auditorías (2) | 4-5h | Día 3 |
| **Fase 6** | Dashboard (2) | 3-4h | Día 4 |
| **Fase 7** | IA Don Cándido (1) | 4-5h | Día 4 |
| **TOTAL** | **23 módulos** | **37-48h** | **4 días** |

---

## 🔧 **ESTRATEGIA DE COPIA DE ARCHIVOS**

### **📁 Estructura de Copia:**

```
v6 → v7
├── backend/src/models/[Modelo].ts → models/[Modelo].ts
├── backend/src/controllers/[Modelo]Controller.ts → api/[modelo]/route.ts
├── backend/src/routes/[Modelo]Routes.ts → (integrar en route.ts)
└── frontend/src/app/[modulo]/ → app/[modulo]/
```

### **🔄 Proceso de Adaptación:**

1. **Copiar archivos** desde v6
2. **Adaptar imports** a Next.js 14
3. **Convertir a TypeScript** si es necesario
4. **Integrar con dbConnect**
5. **Adaptar rutas** a App Router
6. **Validar funcionamiento**
7. **Deploy parcial**

---

## 🎯 **MÓDULOS POSTERGADOS (Para después)**

### **📝 RRHH - Etapa 3 (Resto):**
- ReclutamientoSeleccion
- Vacantes
- Candidatos
- ClimaLaboral
- ControlAusencias
- EmployeeDeclaration

### **⚙️ Procesos - Registros (Para después):**
- ProcessRecord
- ProcessUnified
- ProcessDocument
- REGISTRO_PROCESO

### **🏢 CRM y Comerciales:**
- Todos los módulos CRM
- AnalisisCredito
- CustomerSurvey

### **📊 Módulos Adicionales:**
- Productos
- Encuestas
- Minutas
- Planes
- Objetivos
- RoadmapTask

---

## 🚀 **COMANDOS DE MIGRACIÓN**

### **Script de Copia Automática:**
```bash
# Copiar modelo
cp ../9001app-v6/backend/src/models/[Modelo].ts models/

# Copiar controlador
cp ../9001app-v6/backend/src/controllers/[Modelo]Controller.ts api/[modelo]/route.ts

# Copiar páginas frontend
cp -r ../9001app-v6/frontend/src/app/[modulo]/ app/[modulo]/
```

### **Script de Validación:**
```bash
# Verificar migración
npm run migration:check

# Deploy automático
npm run migration:deploy
```

---

## ✅ **CHECKLIST DE VALIDACIÓN POR FASE**

### **Después de cada fase:**
- [ ] TypeScript compila sin errores
- [ ] ESLint pasa sin errores
- [ ] Build exitoso
- [ ] Deploy funcional en servidor
- [ ] CRUD básico funciona
- [ ] Autenticación funciona
- [ ] Multi-tenant funciona (si aplica)

---

## 🎯 **RESULTADO ESPERADO**

Al final de la migración tendremos:
- ✅ **Sistema base funcional** con autenticación
- ✅ **RRHH completo** (organización + desarrollo)
- ✅ **Procesos definidos** (eje central)
- ✅ **Documentación** básica
- ✅ **Auditorías** básicas
- ✅ **Dashboard** funcional
- ✅ **IA Don Cándido** integrada

**Total: 23 módulos críticos en 4 días**

---

## 🚀 **PRÓXIMO PASO**

¿Empezamos con la **Fase 0: Login/Auth + Sistema Multi-tenant**?

Este es el fundamento crítico que debe funcionar perfectamente antes de continuar.
