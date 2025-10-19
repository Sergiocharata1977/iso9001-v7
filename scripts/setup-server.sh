#!/bin/bash

# 🚀 Script de configuración inicial del servidor VPS
# Este script se ejecuta UNA VEZ para configurar el servidor

echo "🚀 Configurando servidor VPS para 9001APP v7..."

# Variables
PROJECT_DIR="/var/www/9001app-v7"
GITHUB_REPO="https://github.com/Sergiocharata1977/iso9001-v7.git"
APP_NAME="9001app-v7"

# 1. Crear directorio del proyecto
echo "📁 Creando directorio del proyecto..."
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# 2. Clonar el repositorio si no existe
if [ ! -d ".git" ]; then
    echo "📦 Clonando repositorio desde GitHub..."
    git clone $GITHUB_REPO .
else
    echo "✅ Repositorio ya existe, actualizando..."
    git pull origin main
fi

# 3. Instalar dependencias
echo "📥 Instalando dependencias..."
npm install

# 4. Crear archivo .env del servidor
echo "⚙️ Configurando variables de entorno..."
cat > .env << EOF
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
EOF

# 5. Build del proyecto
echo "🔨 Construyendo proyecto..."
npm run build

# 6. Instalar PM2 globalmente si no está instalado
if ! command -v pm2 &> /dev/null; then
    echo "📦 Instalando PM2..."
    npm install -g pm2
fi

# 7. Configurar PM2
echo "⚙️ Configurando PM2..."
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start npm --name $APP_NAME -- start
pm2 save
pm2 startup

echo "✅ Configuración del servidor completada!"
echo "🌐 La aplicación debería estar disponible en: http://31.97.162.229:3000"
echo "📊 Verificar estado con: pm2 status"
