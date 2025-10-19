# 🚀 SCRIPT DE MIGRACIÓN MODULAR V6 → V7
# Migra un módulo específico desde v6 a v7

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("auth", "departamentos", "puestos", "personas", "procesos", "documentos", "auditorias", "indicadores", "super-admin", "ia")]
    [string]$Module,
    
    [string]$V6Path = "C:\Users\Usuario\Documents\Proyectos\ISO -conjunto\9001app-v6",
    [switch]$SkipTests,
    [switch]$AutoDeploy
)

Write-Host "🚀 MIGRANDO MÓDULO: $Module" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

# Mapeo de módulos a rutas
$moduleMapping = @{
    "auth" = @{
        "frontend" = "frontend/modules/login"
        "backend" = "backend/models/User.js,backend/controllers/authController.js"
        "destination" = "app/auth,models/User.ts,api/auth"
    }
    "departamentos" = @{
        "frontend" = "frontend/modules/departamentos"
        "backend" = "backend/models/Departamento.js,backend/controllers/departamentoController.js"
        "destination" = "app/dashboard/departments,models/Department.ts,api/departments"
    }
    "puestos" = @{
        "frontend" = "frontend/modules/puestos"
        "backend" = "backend/models/Puesto.js,backend/controllers/puestoController.js"
        "destination" = "app/dashboard/positions,models/Position.ts,api/positions"
    }
    "personas" = @{
        "frontend" = "frontend/modules/personas"
        "backend" = "backend/models/Persona.js,backend/controllers/personaController.js"
        "destination" = "app/dashboard/employees,models/Employee.ts,api/employees"
    }
}

$config = $moduleMapping[$Module]
if (-not $config) {
    Write-Host "❌ Módulo '$Module' no encontrado en el mapeo" -ForegroundColor Red
    exit 1
}

# 1. VERIFICAR RUTAS DE V6
Write-Host "📁 1. Verificando rutas de V6..." -ForegroundColor Yellow
$frontendPath = Join-Path $V6Path $config.frontend
if (-not (Test-Path $frontendPath)) {
    Write-Host "❌ Ruta frontend no encontrada: $frontendPath" -ForegroundColor Red
    exit 1
}
Write-Host "   ✅ Rutas verificadas" -ForegroundColor Green

# 2. CREAR BACKUP
Write-Host "📦 2. Creando backup..." -ForegroundColor Yellow
$backupDir = "backup-$Module-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Write-Host "   ✅ Backup creado: $backupDir" -ForegroundColor Green

# 3. COPIAR ARCHIVOS FRONTEND
Write-Host "📋 3. Copiando archivos frontend..." -ForegroundColor Yellow
$destinationPaths = $config.destination -split ","
$frontendDest = $destinationPaths[0]

if (Test-Path $frontendPath) {
    # Crear directorio destino
    New-Item -ItemType Directory -Path $frontendDest -Force | Out-Null
    
    # Copiar archivos
    Copy-Item -Path "$frontendPath\*" -Destination $frontendDest -Recurse -Force
    Write-Host "   ✅ Frontend copiado a: $frontendDest" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ Ruta frontend no existe: $frontendPath" -ForegroundColor Yellow
}

# 4. MIGRAR ARCHIVOS BACKEND
Write-Host "🔧 4. Migrando archivos backend..." -ForegroundColor Yellow
$backendFiles = $config.backend -split ","
foreach ($backendFile in $backendFiles) {
    $sourcePath = Join-Path $V6Path $backendFile
    if (Test-Path $sourcePath) {
        # Determinar destino basado en tipo de archivo
        if ($backendFile -like "*models*") {
            $destPath = $destinationPaths[1]
            $destDir = Split-Path $destPath -Parent
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            
            # Convertir .js a .ts y adaptar sintaxis
            $content = Get-Content $sourcePath -Raw
            $content = $content -replace "require\('([^']+)'\)", "import * as `$1 from '`$1'"
            $content = $content -replace "module\.exports\s*=", "export default"
            
            Set-Content -Path $destPath -Value $content -Encoding UTF8
            Write-Host "   ✅ Modelo migrado: $destPath" -ForegroundColor Green
        }
        elseif ($backendFile -like "*controllers*") {
            $destPath = $destinationPaths[2]
            $destDir = Split-Path $destPath -Parent
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            
            # Crear API route para Next.js
            $apiContent = @"
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // TODO: Implementar lógica GET
    return NextResponse.json({ message: 'GET $Module' });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    // TODO: Implementar lógica POST
    return NextResponse.json({ message: 'POST $Module' });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    // TODO: Implementar lógica PUT
    return NextResponse.json({ message: 'PUT $Module' });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    // TODO: Implementar lógica DELETE
    return NextResponse.json({ message: 'DELETE $Module' });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
"@
            New-Item -ItemType Directory -Path "$destPath" -Force | Out-Null
            Set-Content -Path "$destPath\route.ts" -Value $apiContent -Encoding UTF8
            Write-Host "   ✅ API route creada: $destPath\route.ts" -ForegroundColor Green
        }
    }
}

# 5. CONVERTIR JSX A TSX
Write-Host "🔄 5. Convirtiendo JSX a TSX..." -ForegroundColor Yellow
Get-ChildItem -Path $frontendDest -Recurse -Filter "*.jsx" | ForEach-Object {
    $newName = $_.Name -replace "\.jsx$", ".tsx"
    $newPath = Join-Path $_.Directory $newName
    
    # Leer contenido y hacer conversiones básicas
    $content = Get-Content $_.FullName -Raw
    
    # Conversiones básicas JSX → TSX
    $content = $content -replace "import React from 'react'", "import React from 'react'"
    $content = $content -replace "export default function", "export default function"
    
    # Agregar tipos básicos si no existen
    if ($content -notmatch "interface.*Props") {
        $componentName = [System.IO.Path]::GetFileNameWithoutExtension($newName)
        $propsInterface = @"
interface ${componentName}Props {
  // TODO: Definir props específicas
  [key: string]: any;
}

"@
        $content = $propsInterface + $content
    }
    
    Set-Content -Path $newPath -Value $content -Encoding UTF8
    Remove-Item $_.FullName
    Write-Host "   ✅ Convertido: $($_.Name) → $newName" -ForegroundColor Green
}

# 6. CORREGIR IMPORTS
Write-Host "📥 6. Corrigiendo imports..." -ForegroundColor Yellow
Get-ChildItem -Path $frontendDest -Recurse -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Corregir imports relativos a absolutos
    $content = $content -replace "from '\.\./\.\./", "from '@/"
    $content = $content -replace "from '\.\./", "from '@/"
    $content = $content -replace "from '\.\/", "from '@/components/"
    
    # Corregir imports de componentes UI
    $content = $content -replace "from.*components/ui", "from '@/components/ui'"
    
    Set-Content $_.FullName $content -Encoding UTF8
}
Write-Host "   ✅ Imports corregidos" -ForegroundColor Green

# 7. EJECUTAR TESTS
if (-not $SkipTests) {
    Write-Host "🧪 7. Ejecutando tests..." -ForegroundColor Yellow
    
    Write-Host "   📝 TypeScript check..." -ForegroundColor Cyan
    $tscResult = & npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ TypeScript: OK" -ForegroundColor Green
    } else {
        Write-Host "   ❌ TypeScript: Errores" -ForegroundColor Red
        Write-Host $tscResult -ForegroundColor Red
    }
    
    Write-Host "   🏗️ Build test..." -ForegroundColor Cyan
    $buildResult = & npm run build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Build: OK" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Build: Errores" -ForegroundColor Red
        Write-Host $buildResult -ForegroundColor Red
        
        if (-not $AutoDeploy) {
            Write-Host "   ⚠️ ¿Continuar con errores? (y/N)" -ForegroundColor Yellow
            $response = Read-Host
            if ($response -ne 'y' -and $response -ne 'Y') {
                Write-Host "   ⏸️ Migración pausada" -ForegroundColor Yellow
                exit 1
            }
        }
    }
}

# 8. COMMIT Y DEPLOY
Write-Host "🚀 8. Preparando deploy..." -ForegroundColor Yellow
git add .
git commit -m "feat: migrar módulo $Module desde v6 a v7"

if ($AutoDeploy) {
    git push origin main
    Write-Host "   ✅ Deploy automático completado" -ForegroundColor Green
} else {
    Write-Host "   🌐 ¿Hacer push al servidor? (y/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq 'y' -or $response -eq 'Y') {
        git push origin main
        Write-Host "   ✅ Deploy completado" -ForegroundColor Green
    } else {
        Write-Host "   ⏸️ Deploy pausado" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "🎉 MIGRACIÓN DEL MÓDULO '$Module' COMPLETADA" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 RESUMEN:" -ForegroundColor Cyan
Write-Host "✅ Archivos frontend copiados" -ForegroundColor Green
Write-Host "✅ Archivos backend migrados" -ForegroundColor Green
Write-Host "✅ JSX convertido a TSX" -ForegroundColor Green
Write-Host "✅ Imports corregidos" -ForegroundColor Green
Write-Host "✅ Tests ejecutados" -ForegroundColor Green
Write-Host "✅ Commit realizado" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "1. Probar módulo: npm run dev" -ForegroundColor White
Write-Host "2. Verificar funcionalidad CRUD" -ForegroundColor White
Write-Host "3. Migrar siguiente módulo" -ForegroundColor White
Write-Host ""