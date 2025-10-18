#!/usr/bin/env node

/**
 * 🔍 Script para verificar conexión MongoDB Atlas
 * 
 * Este script verifica la conexión y lista las colecciones disponibles
 */

const mongoose = require('mongoose');
require('dotenv').config();

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkMongoConnection() {
  try {
    log('🔍 Verificando conexión a MongoDB Atlas...', 'blue');
    
    // Verificar variables de entorno
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      log('❌ MONGO_URI no está definida en .env', 'red');
      return false;
    }
    
    log(`📡 Conectando a: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`, 'cyan');
    
    // Conectar a MongoDB
    await mongoose.connect(mongoUri, {
      dbName: "9001app"
    });
    
    log('✅ Conexión exitosa a MongoDB Atlas!', 'green');
    
    // Obtener información de la base de datos
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    
    log(`📊 Base de datos: ${dbName}`, 'blue');
    
    // Listar colecciones
    log('\n📋 Colecciones disponibles:', 'yellow');
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      log('⚠️ No hay colecciones en la base de datos', 'yellow');
    } else {
      collections.forEach((collection, index) => {
        log(`  ${index + 1}. ${collection.name}`, 'green');
      });
    }
    
    // Obtener estadísticas de la base de datos
    const stats = await db.stats();
    log(`\n📈 Estadísticas de la base de datos:`, 'blue');
    log(`  - Tamaño: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`, 'cyan');
    log(`  - Colecciones: ${stats.collections}`, 'cyan');
    log(`  - Documentos: ${stats.objects}`, 'cyan');
    
    // Verificar colecciones específicas del proyecto
    log('\n🔍 Verificando colecciones del proyecto 9001app:', 'yellow');
    const projectCollections = [
      'users', 'departamentos', 'puestos', 'personnel', 
      'procesos', 'documentos', 'auditorias', 'indicadores'
    ];
    
    for (const collectionName of projectCollections) {
      try {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        if (count > 0) {
          log(`  ✅ ${collectionName}: ${count} documentos`, 'green');
        } else {
          log(`  ⚠️ ${collectionName}: 0 documentos`, 'yellow');
        }
      } catch (error) {
        log(`  ❌ ${collectionName}: Error al verificar`, 'red');
      }
    }
    
    // Cerrar conexión
    await mongoose.connection.close();
    log('\n✅ Verificación completada exitosamente!', 'green');
    
    return true;
    
  } catch (error) {
    log(`❌ Error de conexión: ${error.message}`, 'red');
    log(`🔧 Verifica que:`, 'yellow');
    log(`  - MONGO_URI esté correcta en .env`, 'yellow');
    log(`  - La base de datos esté accesible`, 'yellow');
    log(`  - Las credenciales sean válidas`, 'yellow');
    
    return false;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  checkMongoConnection()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      log(`❌ Error fatal: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = { checkMongoConnection };

