#!/usr/bin/env node

/**
 * 🚀 Script de Control para Migración Modular 9001app-v6 → v7
 * 
 * Este script automatiza las verificaciones de calidad durante la migración
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

function checkCommand(command, description) {
  try {
    log(`🔍 ${description}...`, 'blue');
    execSync(command, { stdio: 'pipe' });
    log(`✅ ${description} - OK`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} - ERROR`, 'red');
    console.error(error.message);
    return false;
  }
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description} - Existe`, 'green');
    return true;
  } else {
    log(`❌ ${description} - No encontrado`, 'red');
    return false;
  }
}

function checkModuleStructure(moduleName) {
  log(`\n📁 Verificando estructura del módulo: ${moduleName}`, 'cyan');
  
  const checks = [
    { path: `app/${moduleName}/page.tsx`, desc: 'Página principal' },
    { path: `app/${moduleName}/components`, desc: 'Carpeta de componentes' },
    { path: `models/${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}.ts`, desc: 'Modelo de datos' },
    { path: `api/${moduleName}/route.ts`, desc: 'API endpoint' }
  ];
  
  let passed = 0;
  checks.forEach(check => {
    if (checkFileExists(check.path, check.desc)) {
      passed++;
    }
  });
  
  return passed === checks.length;
}

// Función principal
function main() {
  log('🚀 INICIANDO VERIFICACIÓN DE MIGRACIÓN MODULAR', 'bright');
  log('================================================', 'bright');
  
  const checks = [
    { cmd: 'npx tsc --noEmit', desc: 'Verificación de TypeScript' },
    { cmd: 'npm run lint', desc: 'Verificación de ESLint' },
    { cmd: 'npm run build', desc: 'Build de producción' }
  ];
  
  let allPassed = true;
  
  // Verificaciones generales
  log('\n🔧 VERIFICACIONES GENERALES', 'yellow');
  checks.forEach(check => {
    if (!checkCommand(check.cmd, check.desc)) {
      allPassed = false;
    }
  });
  
  // Verificar conexión MongoDB
  log('\n🗄️ VERIFICACIÓN DE BASE DE DATOS', 'yellow');
  if (!checkFileExists('.env', 'Archivo de variables de entorno')) {
    allPassed = false;
  }
  
  // Verificar estructura base
  log('\n📂 VERIFICACIÓN DE ESTRUCTURA BASE', 'yellow');
  const baseFiles = [
    'app/layout.tsx',
    'app/page.tsx',
    'lib/dbConnect.ts',
    'package.json'
  ];
  
  baseFiles.forEach(file => {
    if (!checkFileExists(file, file)) {
      allPassed = false;
    }
  });
  
  // Verificar módulos migrados
  log('\n🧩 VERIFICACIÓN DE MÓDULOS MIGRADOS', 'yellow');
  const modules = ['auth', 'departamentos', 'puestos', 'personas', 'procesos', 'documentos', 'auditorias', 'indicadores'];
  
  let migratedModules = 0;
  modules.forEach(module => {
    if (checkModuleStructure(module)) {
      migratedModules++;
      log(`✅ Módulo ${module} - Estructura completa`, 'green');
    } else {
      log(`⚠️ Módulo ${module} - Estructura incompleta`, 'yellow');
    }
  });
  
  // Resumen final
  log('\n📊 RESUMEN DE VERIFICACIÓN', 'bright');
  log('================================', 'bright');
  
  if (allPassed) {
    log('🎉 ¡TODAS LAS VERIFICACIONES PASARON!', 'green');
    log('✅ El proyecto está listo para deploy', 'green');
  } else {
    log('⚠️ ALGUNAS VERIFICACIONES FALLARON', 'yellow');
    log('❌ Revisa los errores antes del deploy', 'red');
  }
  
  log(`📈 Módulos migrados: ${migratedModules}/${modules.length}`, 'blue');
  
  // Comandos de deploy
  if (allPassed) {
    log('\n🚀 COMANDOS PARA DEPLOY:', 'bright');
    log('git add .', 'cyan');
    log('git commit -m "feat: migrar módulo [NOMBRE]"', 'cyan');
    log('git push origin main', 'cyan');
  }
  
  process.exit(allPassed ? 0 : 1);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { main, checkCommand, checkFileExists, checkModuleStructure };

