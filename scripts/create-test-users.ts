#!/usr/bin/env ts-node

/**
 * 🧪 Script para crear usuarios de prueba
 * 
 * Este script crea usuarios de prueba para cada organización
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { User } from '../models/User';

// Cargar variables de entorno
config();

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

function log(message: string, color: keyof typeof colors = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function createTestUsers(): Promise<void> {
  try {
    log('🔗 Conectando a MongoDB...', 'blue');
    
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "9001app"
    });
    
    log('✅ Conexión exitosa a MongoDB', 'green');
    
    // Limpiar usuarios existentes (opcional)
    log('🧹 Limpiando usuarios existentes...', 'yellow');
    await User.deleteMany({});
    
    // Usuarios de prueba para cada organización
    const testUsers = [
      // TechCorp SA (org-001)
      {
        name: 'Admin TechCorp',
        email: 'admin@techcorp.com',
        password: 'admin123',
        role: 'admin' as const,
        organization_id: 'org-001',
        is_active: true
      },
      {
        name: 'María González',
        email: 'maria@techcorp.com',
        password: 'user123',
        role: 'manager' as const,
        organization_id: 'org-001',
        is_active: true
      },
      {
        name: 'Carlos López',
        email: 'carlos@techcorp.com',
        password: 'user123',
        role: 'user' as const,
        organization_id: 'org-001',
        is_active: true
      },
      
      // Agro Solutions (org-002)
      {
        name: 'Admin Agro',
        email: 'admin@agro.com',
        password: 'admin123',
        role: 'admin' as const,
        organization_id: 'org-002',
        is_active: true
      },
      {
        name: 'Ana Martínez',
        email: 'ana@agro.com',
        password: 'user123',
        role: 'manager' as const,
        organization_id: 'org-002',
        is_active: true
      },
      
      // Industrias del Sur (org-003)
      {
        name: 'Admin Industrias',
        email: 'admin@industrias.com',
        password: 'admin123',
        role: 'admin' as const,
        organization_id: 'org-003',
        is_active: true
      },
      {
        name: 'Pedro Rodríguez',
        email: 'pedro@industrias.com',
        password: 'user123',
        role: 'user' as const,
        organization_id: 'org-003',
        is_active: true
      },
      
      // Consultora Norte (org-004)
      {
        name: 'Admin Consultora',
        email: 'admin@consultora.com',
        password: 'admin123',
        role: 'admin' as const,
        organization_id: 'org-004',
        is_active: true
      },
      {
        name: 'Laura Sánchez',
        email: 'laura@consultora.com',
        password: 'user123',
        role: 'manager' as const,
        organization_id: 'org-004',
        is_active: true
      }
    ];

    log(`📝 Creando ${testUsers.length} usuarios de prueba...`, 'blue');
    
    // Crear usuarios
    const createdUsers = [];
    for (const userData of testUsers) {
      try {
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        
        // Crear usuario
        const user = new User({
          ...userData,
          password: hashedPassword
        });
        
        await user.save();
        createdUsers.push(user);
        
        log(`  ✅ ${user.name} (${user.email}) - ${user.organization_id}`, 'green');
      } catch (error: any) {
        log(`  ❌ Error creando usuario ${userData.name}: ${error.message}`, 'red');
      }
    }
    
    log(`\n🎉 Usuarios creados exitosamente: ${createdUsers.length}/${testUsers.length}`, 'green');
    
    // Mostrar resumen por organización
    log('\n📊 Resumen por organización:', 'cyan');
    const orgs = ['org-001', 'org-002', 'org-003', 'org-004'];
    const orgNames = {
      'org-001': 'TechCorp SA',
      'org-002': 'Agro Solutions',
      'org-003': 'Industrias del Sur',
      'org-004': 'Consultora Norte'
    };
    
    for (const orgId of orgs) {
      const orgUsers = createdUsers.filter(u => u.organization_id === orgId);
      log(`  ${orgNames[orgId as keyof typeof orgNames]} (${orgId}): ${orgUsers.length} usuarios`, 'cyan');
      orgUsers.forEach(user => {
        log(`    - ${user.name} (${user.email}) - ${user.role}`, 'magenta');
      });
    }
    
    log('\n🔑 Credenciales de prueba:', 'yellow');
    log('  Para probar el login, usa:', 'yellow');
    log('  Email: admin@techcorp.com', 'yellow');
    log('  Contraseña: admin123', 'yellow');
    log('  Organización: Se detecta automáticamente (TechCorp SA)', 'yellow');
    
    // Cerrar conexión
    await mongoose.connection.close();
    log('\n✅ Script completado exitosamente!', 'green');
    
  } catch (error: any) {
    log(`❌ Error: ${error.message}`, 'red');
    console.error(error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createTestUsers();
}

export { createTestUsers };
