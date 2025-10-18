#!/bin/bash

# 🚀 Script de Deploy Automático para 9001APP v7
# Este script automatiza el deploy desde GitHub al servidor VPS

echo "🚀 Iniciando deploy de 9001APP v7..."

# Configuración del servidor
SERVER_USER="root"
SERVER_HOST="tu-servidor.com"
SERVER_PATH="/var/www/9001app-v7"
GITHUB_REPO="https://github.com/Sergiocharata1977/iso9001-v7.git"

# 1. Conectar al servidor y actualizar el código
echo "📦 Actualizando código desde GitHub..."
ssh $SERVER_USER@$SERVER_HOST << EOF
    # Crear directorio si no existe
    mkdir -p $SERVER_PATH
    cd $SERVER_PATH
    
    # Si es la primera vez, clonar el repositorio
    if [ ! -d ".git" ]; then
        git clone $GITHUB_REPO .
    fi
    
    # Actualizar código
    git pull origin main
    
    # Instalar dependencias
    npm install
    
    # Construir el proyecto
    npm run build
    
    # Reiniciar PM2 (si está usando PM2)
    pm2 restart 9001app-v7 || pm2 start npm --name "9001app-v7" -- start
    
    echo "✅ Deploy completado exitosamente"
EOF

echo "🎉 Deploy finalizado. Verifica en: http://tu-servidor.com"
