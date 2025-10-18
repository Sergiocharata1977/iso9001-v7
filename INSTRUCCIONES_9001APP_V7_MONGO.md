# 🚀 PROYECTO 9001APP-V7 – INSTRUCCIONES PARA IA DE DESARROLLO (MongoDB Atlas)

## 🧭 CONTEXTO GENERAL

**Ubicación local de los proyectos:**
```
Documentos/
└── Proyectos/
    └── ISO - conjunto/
        ├── 9001app-v2/
        ├── 9001app-v6/
        ├── 9001app-v7/      ← Proyecto actual
        ├── Nueva carpeta/
        └── paso nexts/
```

**Relación entre versiones:**
- `9001app-v6`: versión anterior, contiene backend y frontend separados, conectados a MongoDB Atlas.
- `9001app-v7`: nueva versión, Next.js 14 limpio, reutiliza la misma base de datos MongoDB Atlas.
- El desarrollo se realiza desde **Windows**, pero debe ejecutarse sin errores en **Linux (Hostinger)**.

---

## 🧠 ROL

**Arquitecto Técnico del Proyecto 9001app-v7**

---

## 🎯 OBJETIVO GENERAL

Crear una nueva versión del sistema **9001app**, basada en la arquitectura de **9001app-v6**, pero partiendo desde **cero (entorno Next.js 14 limpio)** y **manteniendo la conexión con MongoDB Atlas**.  
El objetivo es garantizar un **deploy 100% funcional en Linux** y mantener compatibilidad con todos los módulos del sistema ISO (procesos, documentos, auditorías, etc.).

---

## ⚙️ ESTRUCTURA DEL PROYECTO

```
9001app-v7/
├── app/                → Páginas, rutas y vistas (Next.js App Router)
├── api/                → Endpoints backend (API Routes con conexión Mongo)
├── components/         → Componentes reutilizables (UI)
├── lib/                → Funciones helper y conexión a MongoDB
│   └── dbConnect.ts    → Conexión a Mongo Atlas
├── models/             → Modelos Mongoose (copiados de v6)
├── public/             → Imágenes, logos, archivos estáticos
├── utils/              → Validaciones y helpers
├── .env                → Variables de entorno (copiadas desde v6)
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

> 📌 **Nota:**  
> Esta versión utiliza **Next.js 14 + Mongoose** para unificar backend y frontend, evitando los errores de subcarpetas del v6.

---

## 🧩 ENTREGABLES FUNCIONALES

Cada entregable es una **etapa renderizable**, verificable mediante un enlace activo del servidor (Hostinger).

| Nº | Entregable | Descripción | Resultado Esperado |
|----|-------------|--------------|--------------------|
| **1** | 🧱 **Renderización Base en Linux (Proyecto 0 - Next.js)** | Crear y deployar un Next.js limpio en Hostinger. | Página `/` visible y API `/api/hello` funcionando. |
| **2** | 🔗 **Conexión MongoDB Atlas** | Copiar `.env` de v6, implementar `lib/dbConnect.ts`. | `/api/test-db` devuelve conexión exitosa. |
| **3** | 🔐 **Sistema de Logeo** | Copiar módulo de login y auth desde v6. | Autenticación funcional con Mongo. |
| **4** | 🧍‍♂️ **Departamentos y Puestos** | Migrar modelos Mongoose y vistas de v6. | CRUD operativo en `/rrhh/departamentos`. |
| **5** | 🧾 **Procesos ISO y Documentos** | Copiar módulos y rutas internas del v6. | Procesos y documentos activos y editables. |
| **6** | 🧮 **Indicadores y Auditorías** | Conectar indicadores y auditorías con DB. | Tablero `/super-admin` visible y renderizado. |
| **7** | 🤖 **Asistente IA (Don Cándido v2)** | Integrar IA para responder consultas ISO. | IA activa y operativa en `/assistant`. |

---

## 🔧 INSTRUCCIONES TÉCNICAS PARA LA IA DE DESARROLLO

### 1️⃣ Crear entorno limpio en Next.js 14
```bash
cd "Documentos/Proyectos/ISO - conjunto"
npx create-next-app@latest 9001app-v7 --typescript --app --tailwind
cd 9001app-v7
npm install mongoose @shadcn/ui lucide-react
```

### 2️⃣ Copiar y configurar archivo `.env`
Desde `9001app-v6`, copiar el archivo `.env` a la raíz de `9001app-v7`.  
Debe contener la misma variable de conexión a Mongo Atlas:
```
MONGO_URI="mongodb+srv://usuario:clave@cluster.mongodb.net/9001app"
NEXTAUTH_SECRET="clave_secreta"
```
> ⚠️ No modificar el nombre de las variables. El nuevo proyecto debe reconocerlas tal cual.

### 3️⃣ Crear la conexión a MongoDB (`lib/dbConnect.ts`)
```ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ Faltan variables de entorno: MONGO_URI no está definida.");
}

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI, {
    dbName: "9001app",
  });
};
```

### 4️⃣ Probar conexión
Crear endpoint `/api/test-db/route.ts`:
```ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ ok: true, message: "✅ Conexión MongoDB exitosa" });
  } catch (error) {
    return NextResponse.json({ ok: false, error });
  }
}
```

### 5️⃣ Subir a GitHub y deployar
```bash
git init
git add .
git commit -m "feat: versión base Next.js con Mongo Atlas"
git branch -M main
git remote add origin https://github.com/usuario/9001app-v7.git
git push -u origin main
```

**Hostinger (Linux):**
- Node.js 18+  
- Directorio raíz `/`
- Build: `npm run build`
- Start: `npm start`

Verificar:
- `https://tudominio.com/` → render correcto.  
- `https://tudominio.com/api/test-db` → responde conexión exitosa.

---

## 🧠 CONDICIONES DE ÉXITO

✅ Proyecto base renderizado en Linux.  
✅ Conexión MongoDB Atlas estable.  
✅ Módulos copiados de v6 funcionando.  
✅ IA “Don Cándido v2” conectada a los datos.  
✅ Repositorio actualizado y documentado.

---

## 📦 COMANDOS DE CONTROL
```bash
# Verificar tipos
npx tsc --noEmit

# Lint antes de commit
npm run lint

# Build de prueba
npm run build
```

---

## 📞 SOPORTE Y REFERENCIAS
- **Base anterior:** `/9001app-v6/`
- **Versión actual:** `/9001app-v7/`
- **Hosting destino:** Hostinger Linux
- **Base de datos:** MongoDB Atlas (mismo .env que v6)
- **Repositorio GitHub:** `https://github.com/usuario/9001app-v7`

---

📄 **Fin de Documento – 9001app-v7 Setup Técnico (MongoDB Atlas)**
