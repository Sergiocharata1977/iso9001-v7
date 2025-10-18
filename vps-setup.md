# 🚀 Configuración del Servidor VPS para 9001APP v7

## 📋 Requisitos del Servidor

### Sistema Operativo
- **Ubuntu 20.04+** o **CentOS 8+**
- **Node.js 18+**
- **Git**
- **PM2** (para gestión de procesos)
- **Nginx** (como proxy reverso)

## 🔧 Comandos de Instalación en el Servidor

### 1. Instalar Node.js 18+
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Instalar PM2 globalmente
```bash
sudo npm install -g pm2
```

### 3. Instalar Nginx
```bash
sudo apt update
sudo apt install nginx
```

### 4. Configurar Nginx
Crear archivo `/etc/nginx/sites-available/9001app-v7`:
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/9001app-v7 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Configurar SSL con Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

## 📁 Estructura en el Servidor

```
/var/www/9001app-v7/
├── .git/              # Repositorio Git
├── app/               # Código de la aplicación
├── package.json       # Dependencias
├── .env               # Variables de entorno
└── node_modules/      # Dependencias instaladas
```

## 🔑 Variables de Entorno Necesarias

Crear archivo `.env` en el servidor:
```env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb+srv://9001app:admin123@9001app-v6.hatcfr...
NEXTAUTH_SECRET=tu_secreto_jwt_aqui
NEXTAUTH_URL=https://tu-dominio.com
```

## 🚀 Comandos de Deploy Manual

```bash
# 1. Conectar al servidor
ssh root@tu-servidor.com

# 2. Ir al directorio del proyecto
cd /var/www/9001app-v7

# 3. Actualizar código
git pull origin main

# 4. Instalar dependencias
npm install

# 5. Construir proyecto
npm run build

# 6. Reiniciar aplicación
pm2 restart 9001app-v7
```

## 🔄 Automatización con GitHub Actions

Para configurar el deploy automático:

1. **En GitHub**: Ve a Settings → Secrets and variables → Actions
2. **Agregar estos secrets**:
   - `VPS_HOST`: IP o dominio del servidor
   - `VPS_USER`: usuario SSH (ej: root)
   - `VPS_SSH_KEY`: clave privada SSH

3. **Configurar SSH en el servidor**:
```bash
# En el servidor, agregar la clave pública de GitHub
echo "ssh-rsa AAAAB3NzaC1yc2E..." >> ~/.ssh/authorized_keys
```

## 📊 Monitoreo con PM2

```bash
# Ver estado de la aplicación
pm2 status

# Ver logs
pm2 logs 9001app-v7

# Reiniciar aplicación
pm2 restart 9001app-v7

# Detener aplicación
pm2 stop 9001app-v7
```

## 🎯 Resultado Final

Después de la configuración, tu aplicación estará disponible en:
- **HTTP**: `http://tu-dominio.com`
- **HTTPS**: `https://tu-dominio.com` (con SSL automático)

---

**¡Listo para deploy automático! 🚀**
