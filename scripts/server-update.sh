#!/bin/bash

# 🚀 Script de Actualización del Servidor para 9001APP v7
# Ejecutar DENTRO del servidor VPS

echo "🚀 Actualizando 9001APP v7 en el servidor..."

# Navegar al directorio del proyecto
cd /var/www/9001app-v7

echo "📦 Actualizando código desde GitHub..."
git pull origin main

echo "🔨 Haciendo build del proyecto..."
npm run build

echo "🚀 Reiniciando aplicación con PM2..."
pm2 restart 9001app-v7

echo "✅ Verificando estado..."
pm2 status

echo "📊 Mostrando logs recientes..."
pm2 logs 9001app-v7 --lines 5

echo "🎉 ¡Actualización completada!"
echo "🌐 Aplicación disponible en: http://31.97.162.229:3000"

