# 🔐 INSTRUCCIONES DE CONFIGURACIÓN DEL ARCHIVO .ENV

## 📋 **Pasos para Configurar Variables de Entorno**

### **1. Crear archivo .env**

Crea un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Configuration (Atlas Cloud)
MONGO_URI=mongodb+srv://9001app:admin123@9001app-v6.hatcfri.mongodb.net/9001app-v6?retryWrites=true&w=majority&appName=9001app-v6

# NextAuth Configuration
NEXTAUTH_SECRET=your_jwt_secret_here_change_in_production
NEXTAUTH_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_here_change_in_production
JWT_EXPIRES_IN=24h

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### **2. Configuración para Desarrollo Local**

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://9001app:admin123@9001app-v6.hatcfri.mongodb.net/9001app-v6?retryWrites=true&w=majority&appName=9001app-v6
NEXTAUTH_SECRET=dev-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=dev-jwt-secret-key-change-in-production
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:3000
```

### **3. Configuración para Producción (VPS)**

```env
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb+srv://9001app:admin123@9001app-v6.hatcfri.mongodb.net/9001app-v6?retryWrites=true&w=majority&appName=9001app-v6
NEXTAUTH_SECRET=GENERATE_A_SECURE_SECRET_HERE
NEXTAUTH_URL=http://31.97.162.229:3000
JWT_SECRET=GENERATE_A_SECURE_JWT_SECRET_HERE
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://31.97.162.229:3000
```

### **4. Generar Secretos Seguros**

Para generar secretos seguros, ejecuta en tu terminal:

```bash
# En Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# O en PowerShell
[System.Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### **5. Verificar Configuración**

Después de crear el archivo `.env`, verifica que funcione:

```bash
# Verificar conexión MongoDB
npm run db:check

# Explorar colecciones
npm run db:explore

# Iniciar servidor de desarrollo
npm run dev
```

### **⚠️ IMPORTANTE**

- ❌ **NUNCA** subas el archivo `.env` a Git
- ✅ El archivo `.env` ya está en `.gitignore`
- ✅ Usa `.env.example` como referencia
- ✅ Cambia los secretos en producción

### **📝 Notas**

- El archivo `.env` debe estar en la raíz del proyecto
- Las variables se cargan automáticamente con `dotenv`
- Next.js requiere que las variables del cliente empiecen con `NEXT_PUBLIC_`
- Para cambios en variables de entorno, reinicia el servidor

---

**🚀 ¡Configuración lista para desarrollo y producción!**
