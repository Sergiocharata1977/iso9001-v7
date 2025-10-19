# 📋 CONFIGURACIÓN INICIAL COMPLETA - 9001APP v7

> **Documento de referencia rápida** para configuración local, servidor VPS y Git  
> **Actualizado:** $(date)  
> **Versión:** v7 - Multi-Tenant Ready

---

## 🏠 **CONFIGURACIÓN LOCAL (Windows)**

### **1. Estructura del Proyecto**
```
C:\Users\Usuario\Documents\Proyectos\ISO -conjunto\9001app-v7\
├── app/                    # Next.js App Router
├── lib/                    # Utilidades y conexiones
├── models/                 # Modelos de MongoDB
├── scripts/                # Scripts de automatización
├── .github/workflows/      # GitHub Actions
├── .env                    # Variables de entorno
└── package.json           # Dependencias
```

### **2. Variables de Entorno (.env)**
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (Atlas Cloud)
MONGO_URI=mongodb+srv://9001app:admin123@9001app-v6.xxxxx.mongodb.net/9001app-v7?retryWrites=true&w=majority
MONGODB_TEST_URI=mongodb+srv://9001app:admin123@9001app-v6.xxxxx.mongodb.net/9001app-v7-test

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_here_change_in_production
JWT_EXPIRES_IN=24h

# NextAuth Configuration
NEXTAUTH_SECRET=your_jwt_secret_here_change_in_production
NEXTAUTH_URL=http://localhost:3000

# Claude API (Don Cándido v2)
CLAUDE_API_KEY=sk-ant-api03-RbYwv5Tq5UrVOMOFNI6R-xxxxx
```

### **3. Comandos Locales Esenciales**
```bash
# Desarrollo
npm run dev                 # Servidor de desarrollo en localhost:3000

# Build y Deploy
npm run build              # Build de producción
npm run start              # Servidor de producción

# Base de datos
npm run db:seed            # Crear usuarios de prueba
npm run db:check           # Verificar conexión MongoDB

# Git
git add .                  # Agregar cambios
git commit -m "mensaje"    # Commit con mensaje
git push origin main       # Push a GitHub
```

---

## 🌐 **CONFIGURACIÓN SERVIDOR VPS (Hostinger)**

### **1. Información del Servidor**
- **IP:** 31.97.162.229
- **Usuario:** root
- **Puerto:** 3000 (aplicación), 22 (SSH)
- **Directorio:** /var/www/9001app-v7
- **Proceso Manager:** PM2

### **2. Estructura en el Servidor**
```bash
/var/www/9001app-v7/
├── app/                    # Código de la aplicación
├── .env                    # Variables de entorno del servidor
├── package.json           # Dependencias
├── .next/                 # Build de producción
└── logs/                  # Logs de PM2
```

### **3. Variables de Entorno del Servidor (.env)**
```bash
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Configuration (Atlas Cloud)
MONGO_URI=mongodb+srv://9001app:admin123@9001app-v6.xxxxx.mongodb.net/9001app-v7?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_here_change_in_production
JWT_EXPIRES_IN=24h

# CORS Configuration
FRONTEND_URL=http://31.97.162.229:3000
```

### **4. Comandos del Servidor**
```bash
# Acceso SSH
ssh root@31.97.162.229

# Navegar al proyecto
cd /var/www/9001app-v7

# Actualizar código
git pull origin main

# Instalar dependencias
npm install

# Build de producción
npm run build

# Gestión con PM2
pm2 restart 9001app-v7     # Reiniciar aplicación
pm2 stop 9001app-v7        # Detener aplicación
pm2 start npm --name "9001app-v7" -- start  # Iniciar aplicación
pm2 status                 # Ver estado
pm2 logs 9001app-v7        # Ver logs
```

---

## 🔧 **CONFIGURACIÓN GIT & GITHUB**

### **1. Repositorio GitHub**
- **URL:** https://github.com/Sergiocharata1977/iso9001-v7.git
- **Rama principal:** main
- **Deploy automático:** ✅ Configurado

### **2. Secrets Configuradas en GitHub**
```
VPS_HOST = 31.97.162.229
VPS_USER = root
VPS_SSH_KEY = [clave SSH privada completa]
```

### **3. GitHub Actions Workflow**
- **Archivo:** `.github/workflows/deploy.yml`
- **Trigger:** Push a main branch
- **Acción:** Deploy automático al VPS via SSH

### **4. Comandos Git Esenciales**
```bash
# Verificar estado
git status
git log --oneline -5

# Sincronizar cambios
git add .
git commit -m "descripción del cambio"
git push origin main

# Verificar remoto
git remote -v
```

---

## 🚀 **FLUJO DE DEPLOY AUTOMÁTICO**

### **1. Deploy Automático (Recomendado)**
```
1. Cambios en código local
2. git add . && git commit -m "mensaje"
3. git push origin main
4. GitHub Actions se ejecuta automáticamente
5. Deploy al VPS via SSH
6. Aplicación disponible en http://31.97.162.229:3000
```

### **2. Deploy Manual (Si es necesario)**
```bash
# Opción A: Script local
./deploy.sh

# Opción B: SSH directo al servidor
ssh root@31.97.162.229
cd /var/www/9001app-v7
git pull origin main
npm install
npm run build
pm2 restart 9001app-v7
```

---

## 🔍 **VERIFICACIÓN Y TROUBLESHOOTING**

### **1. Verificar Estado Local**
```bash
# Aplicación funcionando
http://localhost:3000

# Base de datos conectada
npm run db:check

# Build exitoso
npm run build
```

### **2. Verificar Estado del Servidor**
```bash
# Aplicación funcionando
http://31.97.162.229:3000

# Estado de PM2
pm2 status

# Logs de la aplicación
pm2 logs 9001app-v7 --lines 20

# Verificar proceso
ps aux | grep node
```

### **3. Verificar GitHub Actions**
- Ir a: https://github.com/Sergiocharata1977/iso9001-v7/actions
- Verificar que el último workflow fue exitoso
- Revisar logs si hay errores

---

## 📞 **CONTACTOS Y ENLACES RÁPIDOS**

### **Enlaces Importantes**
- **Aplicación Local:** http://localhost:3000
- **Aplicación VPS:** http://31.97.162.229:3000
- **GitHub Repo:** https://github.com/Sergiocharata1977/iso9001-v7
- **GitHub Actions:** https://github.com/Sergiocharata1977/iso9001-v7/actions
- **MongoDB Atlas:** https://cloud.mongodb.com/

### **Acceso SSH al Servidor**
```bash
ssh root@31.97.162.229
```

---

## 🎯 **CHECKLIST DIARIO**

### **Al comenzar el día:**
- [ ] Verificar que la aplicación local funciona (localhost:3000)
- [ ] Verificar que la aplicación VPS funciona (31.97.162.229:3000)
- [ ] Revisar GitHub Actions para ver si hay errores
- [ ] Verificar logs del servidor si hay problemas

### **Antes de hacer cambios:**
- [ ] Hacer backup de archivos importantes
- [ ] Verificar que el repositorio está actualizado
- [ ] Probar cambios en local primero

### **Después de hacer cambios:**
- [ ] Commit y push a GitHub
- [ ] Verificar que el deploy automático funcionó
- [ ] Probar la aplicación en el VPS
- [ ] Documentar cambios importantes

---

## 📝 **NOTAS IMPORTANTES**

1. **MongoDB Atlas:** Usar la misma base de datos que v6 para compatibilidad
2. **Multi-tenant:** Cada usuario tiene su organization_id automáticamente
3. **PM2:** Siempre usar PM2 para gestionar el proceso en el servidor
4. **Build:** Siempre hacer build después de cambios importantes
5. **Logs:** Revisar logs si hay problemas de rendimiento

---

**Última actualización:** $(date)  
**Mantenido por:** Sergio Charata  
**Versión del documento:** 1.0
