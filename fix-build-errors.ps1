# 🔧 SCRIPT AUTOMÁTICO PARA CORREGIR ERRORES DE BUILD V6 → V7
# Ejecutar: .\fix-build-errors.ps1

Write-Host "🚀 Iniciando corrección automática de errores de build..." -ForegroundColor Green

# 1. Eliminar procesos Node.js bloqueados
Write-Host "1. Eliminando procesos Node.js bloqueados..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null

# 2. Limpiar directorio .next
Write-Host "2. Limpiando directorio .next..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# 3. Instalar dependencias faltantes
Write-Host "3. Instalando dependencias faltantes..." -ForegroundColor Yellow
npm install @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs

# 4. Corregir errores en empty-state.tsx
Write-Host "4. Corrigiendo errores en empty-state.tsx..." -ForegroundColor Yellow
$emptyStatePath = "components\ui\empty-state.tsx"
if (Test-Path $emptyStatePath) {
    $content = Get-Content $emptyStatePath -Raw
    
    # Corregir icon props en Button
    $content = $content -replace 'icon=\{<Plus className="h-4 w-4" />\}', ''
    $content = $content -replace 'icon=\{<Plus className="h-12 w-12 text-gray-400" />\}', ''
    
    # Mover iconos dentro del Button
    $content = $content -replace '>(\s*)<Plus className="h-4 w-4" />(\s*)', '><Plus className="h-4 w-4 mr-2" />'
    
    Set-Content $emptyStatePath $content
    Write-Host "   ✅ empty-state.tsx corregido" -ForegroundColor Green
}

# 5. Corregir errores en don-candido-animation.tsx
Write-Host "5. Corrigiendo errores en don-candido-animation.tsx..." -ForegroundColor Yellow
$animationPath = "components\ui\don-candido-animation.tsx"
if (Test-Path $animationPath) {
    $content = Get-Content $animationPath -Raw
    $content = $content -replace 'speed=\{speed\}', ''
    Set-Content $animationPath $content
    Write-Host "   ✅ don-candido-animation.tsx corregido" -ForegroundColor Green
}

# 6. Buscar y corregir TODOS los errores de icon en Button
Write-Host "6. Buscando y corrigiendo errores de icon en Button..." -ForegroundColor Yellow
Get-ChildItem -Path "components\ui" -Filter "*.tsx" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'icon=\{.*?\}') {
        $content = $content -replace 'icon=\{.*?\}', ''
        Set-Content $_.FullName $content
        Write-Host "   ✅ Corregido: $($_.Name)" -ForegroundColor Green
    }
}

# 7. Buscar y corregir TODOS los errores de speed en Lottie
Write-Host "7. Buscando y corrigiendo errores de speed en Lottie..." -ForegroundColor Yellow
Get-ChildItem -Path "components\ui" -Filter "*.tsx" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'speed=\{.*?\}') {
        $content = $content -replace 'speed=\{.*?\}', ''
        Set-Content $_.FullName $content
        Write-Host "   ✅ Corregido: $($_.Name)" -ForegroundColor Green
    }
}

# 8. Verificar build
Write-Host "8. Verificando build..." -ForegroundColor Yellow
$buildResult = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ BUILD EXITOSO!" -ForegroundColor Green
    Write-Host "🚀 Listo para commit y deploy!" -ForegroundColor Green
} else {
    Write-Host "❌ Build falló. Revisando errores..." -ForegroundColor Red
    Write-Host $buildResult
}

Write-Host "`n🎯 Script completado. Revisa los resultados arriba." -ForegroundColor Cyan
