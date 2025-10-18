#!/usr/bin/env node

/**
 * 🔍 Script para verificar datos existentes en MongoDB
 * 
 * Este script busca organizaciones, usuarios y datos existentes del v6
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

async function checkExistingData() {
  try {
    log('🔍 Verificando datos existentes en MongoDB...', 'blue');
    
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "9001app"
    });
    
    const db = mongoose.connection.db;
    
    // Buscar todas las colecciones
    const collections = await db.listCollections().toArray();
    
    log(`\n📊 Colecciones encontradas: ${collections.length}`, 'green');
    
    for (const collection of collections) {
      const collectionName = collection.name;
      const collectionObj = db.collection(collectionName);
      const count = await collectionObj.countDocuments();
      
      if (count > 0) {
        log(`\n📋 ${collectionName}: ${count} documentos`, 'cyan');
        
        // Mostrar algunos documentos de ejemplo
        const sampleDocs = await collectionObj.find({}).limit(3).toArray();
        
        if (sampleDocs.length > 0) {
          log(`  🔍 Estructura de documentos:`, 'yellow');
          const firstDoc = sampleDocs[0];
          Object.keys(firstDoc).slice(0, 8).forEach(key => {
            const value = firstDoc[key];
            const preview = typeof value === 'object' ? 
              JSON.stringify(value).substring(0, 50) + '...' : 
              String(value).substring(0, 50);
            log(`    - ${key}: ${preview}`, 'magenta');
          });
        }
        
        // Si es una colección de usuarios u organizaciones, mostrar más detalles
        if (collectionName.toLowerCase().includes('user') || 
            collectionName.toLowerCase().includes('organization') ||
            collectionName.toLowerCase().includes('org')) {
          
          log(`  👥 Documentos de ${collectionName}:`, 'blue');
          sampleDocs.forEach((doc, index) => {
            log(`    ${index + 1}. ID: ${doc._id}`, 'cyan');
            if (doc.name) log(`       Nombre: ${doc.name}`, 'cyan');
            if (doc.email) log(`       Email: ${doc.email}`, 'cyan');
            if (doc.organization_id) log(`       Org ID: ${doc.organization_id}`, 'cyan');
          });
        }
      }
    }
    
    // Buscar específicamente colecciones relacionadas con organizaciones y usuarios
    log('\n🎯 Buscando colecciones específicas:', 'green');
    
    const specificCollections = [
      'users', 'user', 'organizations', 'organization', 
      'departments', 'department', 'personnel', 'person'
    ];
    
    for (const collectionName of specificCollections) {
      try {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        
        if (count > 0) {
          log(`\n✅ ${collectionName}: ${count} documentos encontrados`, 'green');
          
          // Mostrar algunos documentos
          const docs = await collection.find({}).limit(5).toArray();
          docs.forEach((doc, index) => {
            log(`  ${index + 1}. ${JSON.stringify(doc, null, 2)}`, 'cyan');
          });
        } else {
          log(`⚠️ ${collectionName}: No encontrada o vacía`, 'yellow');
        }
      } catch (error) {
        // Colección no existe, continuar
      }
    }
    
    // Cerrar conexión
    await mongoose.connection.close();
    log('\n✅ Verificación completada!', 'green');
    
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  checkExistingData();
}

module.exports = { checkExistingData };
