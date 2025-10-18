#!/usr/bin/env node

/**
 * 🔍 Script para explorar colecciones MongoDB
 * 
 * Este script explora las colecciones y muestra documentos de ejemplo
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

async function exploreCollections() {
  try {
    log('🔍 Explorando colecciones MongoDB...', 'blue');
    
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "9001app"
    });
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    log(`📊 Encontradas ${collections.length} colecciones:`, 'green');
    
    for (const collection of collections) {
      const collectionName = collection.name;
      const collectionObj = db.collection(collectionName);
      
      // Obtener estadísticas de la colección
      const count = await collectionObj.countDocuments();
      const sampleDoc = await collectionObj.findOne();
      
      log(`\n📋 Colección: ${collectionName}`, 'cyan');
      log(`  📊 Documentos: ${count}`, 'blue');
      
      if (sampleDoc) {
        log(`  🔍 Estructura del documento:`, 'yellow');
        const keys = Object.keys(sampleDoc);
        keys.forEach(key => {
          const value = sampleDoc[key];
          const type = typeof value;
          const preview = type === 'object' ? JSON.stringify(value).substring(0, 50) + '...' : String(value).substring(0, 50);
          log(`    - ${key}: ${type} = ${preview}`, 'magenta');
        });
      } else {
        log(`  ⚠️ Colección vacía`, 'yellow');
      }
    }
    
    // Buscar colecciones específicas del proyecto
    log('\n🎯 Colecciones específicas del proyecto 9001app:', 'green');
    const projectCollections = [
      'users', 'departamentos', 'puestos', 'personnel', 
      'procesos', 'documentos', 'auditorias', 'indicadores',
      'organizations', 'userfeaturepermissions'
    ];
    
    for (const collectionName of projectCollections) {
      try {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        const sampleDoc = await collection.findOne();
        
        if (count > 0) {
          log(`\n✅ ${collectionName}:`, 'green');
          log(`  📊 Documentos: ${count}`, 'blue');
          
          if (sampleDoc) {
            log(`  🔍 Campos principales:`, 'yellow');
            Object.keys(sampleDoc).slice(0, 5).forEach(key => {
              log(`    - ${key}`, 'magenta');
            });
          }
        } else {
          log(`⚠️ ${collectionName}: No encontrada o vacía`, 'yellow');
        }
      } catch (error) {
        log(`❌ ${collectionName}: Error al acceder`, 'red');
      }
    }
    
    // Cerrar conexión
    await mongoose.connection.close();
    log('\n✅ Exploración completada!', 'green');
    
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  exploreCollections();
}

module.exports = { exploreCollections };

