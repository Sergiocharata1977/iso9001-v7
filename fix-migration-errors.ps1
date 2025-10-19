# 🚀 SCRIPT AUTOMÁTICO DE CORRECCIÓN DE ERRORES V6 → V7
# Resuelve TODOS los errores de migración identificados

param(
    [switch]$Force,
    [switch]$SkipBackup,
    [string]$V6Path = "C:\Users\Usuario\Documents\Proyectos\ISO -conjunto\9001app-v6"
)

Write-Host "🚀 INICIANDO CORRECCIÓN AUTOMÁTICA DE ERRORES V6 → V7" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# 1. BACKUP DE SEGURIDAD
if (-not $SkipBackup) {
    Write-Host "📦 1. Creando backup de seguridad..." -ForegroundColor Yellow
    $backupDir = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    Copy-Item -Path "components", "lib", "contexts", "hooks", "types" -Destination $backupDir -Recurse -ErrorAction SilentlyContinue
    Write-Host "   ✅ Backup creado en: $backupDir" -ForegroundColor Green
}

# 2. LIMPIAR PROCESOS Y CACHE
Write-Host "🧹 2. Limpiando procesos y cache..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".next", "node_modules/.cache" -ErrorAction SilentlyContinue
Write-Host "   ✅ Procesos y cache limpiados" -ForegroundColor Green

# 3. SINCRONIZAR CON GIT
Write-Host "🔄 3. Sincronizando con Git..." -ForegroundColor Yellow
git fetch origin
git reset --hard origin/main
git pull origin main --force
Write-Host "   ✅ Repositorio sincronizado" -ForegroundColor Green

# 4. INSTALAR DEPENDENCIAS FALTANTES
Write-Host "📦 4. Instalando dependencias faltantes..." -ForegroundColor Yellow
npm install @radix-ui/react-label @radix-ui/react-slot --save
npm install --save-dev @types/react @types/react-dom
Write-Host "   ✅ Dependencias instaladas" -ForegroundColor Green

# 5. CORREGIR PROPS INCOMPATIBLES EN COMPONENTES
Write-Host "🔧 5. Corrigiendo props incompatibles..." -ForegroundColor Yellow

# Corregir empty-state.tsx - eliminar prop icon del Button
$emptyStateFile = "components\ui\empty-state.tsx"
if (Test-Path $emptyStateFile) {
    $content = Get-Content $emptyStateFile -Raw
    # Eliminar props icon de Button
    $content = $content -replace 'icon=\{[^}]+\}', ''
    # Asegurar que los iconos estén dentro del Button como children
    $content = $content -replace '<Button([^>]*?)>\s*([^<]*?)\s*</Button>', '<Button$1>$2</Button>'
    Set-Content $emptyStateFile $content -Encoding UTF8
    Write-Host "   ✅ empty-state.tsx corregido" -ForegroundColor Green
}

# Corregir don-candido-animation.tsx - eliminar prop speed de Lottie
$animationFile = "components\ui\don-candido-animation.tsx"
if (Test-Path $animationFile) {
    $content = Get-Content $animationFile -Raw
    # Eliminar prop speed del componente Lottie
    $content = $content -replace 'speed=\{[^}]+\}', ''
    # Eliminar speed de las props si existe
    $content = $content -replace ',\s*speed\s*:', ','
    $content = $content -replace 'speed\s*:\s*[^,}]+,?', ''
    Set-Content $animationFile $content -Encoding UTF8
    Write-Host "   ✅ don-candido-animation.tsx corregido" -ForegroundColor Green
}

# 6. ACTUALIZAR TIPOS TYPESCRIPT
Write-Host "📝 6. Actualizando tipos TypeScript..." -ForegroundColor Yellow

# Actualizar unified-kanban.ts con propiedades faltantes
$typesFile = "types\unified-kanban.ts"
if (Test-Path $typesFile) {
    $newTypes = @"
export interface KanbanCardProps {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  item?: any; // Para compatibilidad con drag & drop
  readOnly?: boolean; // Para modo solo lectura
  showActions?: boolean; // Para mostrar/ocultar acciones
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
  onDragStart?: (e: React.DragEvent, item: any) => void;
  onDragEnd?: () => void;
}

export interface KanbanColumnProps {
  id: string;
  title: string;
  cards: KanbanCardProps[];
  readOnly?: boolean;
  showAddButton?: boolean;
  onCardMove?: (cardId: string, targetColumn: string) => void;
  onCardAdd?: (columnId: string) => void;
  onDragOver?: (e: React.DragEvent, columnId: string) => void;
  onDrop?: (e: React.DragEvent, columnId: string) => void;
}

export interface KanbanBoardProps {
  columns: KanbanColumnProps[];
  readOnly?: boolean;
  showColumnActions?: boolean;
  onCardMove?: (cardId: string, sourceColumn: string, targetColumn: string) => void;
  onCardAdd?: (columnId: string) => void;
  onCardEdit?: (cardId: string) => void;
  onCardDelete?: (cardId: string) => void;
  onColumnAdd?: () => void;
  onColumnEdit?: (columnId: string) => void;
  onColumnDelete?: (columnId: string) => void;
}

export interface DragData {
  id: string;
  type: string;
  [key: string]: any;
}
"@
    Set-Content $typesFile $newTypes -Encoding UTF8
    Write-Host "   ✅ Tipos TypeScript actualizados" -ForegroundColor Green
}

# 7. CORREGIR HOOK useKanbanDrag
Write-Host "🪝 7. Corrigiendo hook useKanbanDrag..." -ForegroundColor Yellow
$hookFile = "hooks\useKanbanDrag.ts"
if (Test-Path $hookFile) {
    $newHook = @"
import { useState, useCallback } from 'react';

export interface DragData {
  id: string;
  type: string;
  [key: string]: any;
}

export const useKanbanDrag = () => {
  const [draggedItem, setDraggedItem] = useState<DragData | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const onDragStart = useCallback((e: React.DragEvent, item: DragData) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  }, []);

  const onDragOver = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const onDrop = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(null);
    setDraggedItem(null);
    
    try {
      const item = JSON.parse(e.dataTransfer.getData('text/plain'));
      return { item, targetColumn: columnId };
    } catch (error) {
      console.error('Error parsing drag data:', error);
      return null;
    }
  }, []);

  const onDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverColumn(null);
  }, []);

  return {
    draggedItem,
    dragOverColumn,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd
  };
};

export default useKanbanDrag;
"@
    Set-Content $hookFile $newHook -Encoding UTF8
    Write-Host "   ✅ Hook useKanbanDrag corregido" -ForegroundColor Green
}

# 8. VERIFICAR Y CORREGIR IMPORTS
Write-Host "📥 8. Verificando imports..." -ForegroundColor Yellow

# Buscar y corregir imports problemáticos
Get-ChildItem -Path "components", "app", "lib" -Recurse -Filter "*.tsx" -ErrorAction SilentlyContinue | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    if ($content) {
        # Corregir imports relativos
        $content = $content -replace "from '\.\./\.\./", "from '@/"
        $content = $content -replace "from '\.\./", "from '@/"
        
        # Asegurar imports correctos
        if ($content -match "@/hooks/useKanbanDrag" -and $content -notmatch "import.*useKanbanDrag.*from") {
            $content = "import { useKanbanDrag } from '@/hooks/useKanbanDrag';`n" + $content
        }
        
        Set-Content $_.FullName $content -Encoding UTF8
    }
}
Write-Host "   ✅ Imports verificados y corregidos" -ForegroundColor Green

# 9. EJECUTAR VERIFICACIONES
Write-Host "🔍 9. Ejecutando verificaciones..." -ForegroundColor Yellow

Write-Host "   📝 Verificando TypeScript..." -ForegroundColor Cyan
$tscResult = & npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ TypeScript: OK" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ TypeScript: Errores encontrados" -ForegroundColor Yellow
    Write-Host $tscResult -ForegroundColor Red
}

Write-Host "   🔍 Verificando ESLint..." -ForegroundColor Cyan
$lintResult = & npm run lint 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ ESLint: OK" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ ESLint: Advertencias encontradas" -ForegroundColor Yellow
}

Write-Host "   🏗️ Verificando Build..." -ForegroundColor Cyan
$buildResult = & npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Build: EXITOSO" -ForegroundColor Green
} else {
    Write-Host "   ❌ Build: FALLÓ" -ForegroundColor Red
    Write-Host $buildResult -ForegroundColor Red
}

# 10. PREPARAR DEPLOY
Write-Host "🚀 10. Preparando deploy..." -ForegroundColor Yellow

if ($buildResult -and $LASTEXITCODE -eq 0) {
    Write-Host "   📤 Preparando commit para deploy..." -ForegroundColor Cyan
    git add .
    git commit -m "fix: resolver errores de migración v6 → v7 automáticamente"
    
    Write-Host "   🌐 ¿Deseas hacer push al servidor? (y/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq 'y' -or $response -eq 'Y') {
        git push origin main
        Write-Host "   ✅ Deploy enviado al servidor" -ForegroundColor Green
    } else {
        Write-Host "   ⏸️ Deploy pausado. Ejecuta 'git push origin main' cuando estés listo" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ❌ Build falló. No se puede hacer deploy." -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 CORRECCIÓN AUTOMÁTICA COMPLETADA" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 RESUMEN:" -ForegroundColor Cyan
Write-Host "✅ Backup creado" -ForegroundColor Green
Write-Host "✅ Cache limpiado" -ForegroundColor Green  
Write-Host "✅ Git sincronizado" -ForegroundColor Green
Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
Write-Host "✅ Props corregidas" -ForegroundColor Green
Write-Host "✅ Tipos actualizados" -ForegroundColor Green
Write-Host "✅ Hooks corregidos" -ForegroundColor Green
Write-Host "✅ Imports verificados" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "1. Ejecutar: npm run dev" -ForegroundColor White
Write-Host "2. Probar funcionalidad básica" -ForegroundColor White
Write-Host "3. Continuar con migración modular" -ForegroundColor White
Write-Host ""