'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar, 
  User,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { useKanbanDrag } from '../../hooks/useKanbanDrag';
import { useKanbanDrop } from '../../hooks/useKanbanDrop';
import type { 
  UnifiedKanbanProps, 
  KanbanItem, 
  KanbanColumn,
  KanbanCardProps,
  KanbanColumnProps
} from '../../types/unified-kanban';
import { priorityConfig } from '../../types/unified-kanban';

// Componente de tarjeta individual
const KanbanCard: React.FC<KanbanCardProps> = ({
  item,
  onClick,
  onEdit,
  onDelete,
  readOnly = false,
  showActions = true,
  customRenderer
}) => {
  const handleEdit = () => onEdit?.(item.id);
  const handleDelete = () => onDelete?.(item.id);
  // TODO: Implementar drag-and-drop con Atlassian
  // const { onDragStart, onDragEnd } = useKanbanDrag();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Si hay un renderer personalizado, usarlo
  if (customRenderer) {
    return (
      <div className="">
        {customRenderer(item)}
      </div>
    );
  }

  const daysUntilDue = item.dueDate ? getDaysUntilDue(item.dueDate) : null;

  return (
    <Card
      className="mb-3 transition-all hover:shadow-md group"
      onClick={() => onClick?.(item)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-sm font-medium mb-1 line-clamp-2">
              {item.title}
            </CardTitle>
            {item.description && (
              <p className="text-xs text-gray-600 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
          {showActions && !readOnly && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onClick?.(item);
                }}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          {/* Prioridad y Tags */}
          <div className="flex gap-1 flex-wrap">
            {item.priority && (
              <Badge 
                variant="outline" 
                className={`text-xs ${priorityConfig[item.priority]?.color}`}
              >
                {priorityConfig[item.priority]?.label}
              </Badge>
            )}
            {item.tags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Responsable */}
          {item.assignee && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <User className="h-3 w-3" />
              <span className="truncate">{item.assignee}</span>
            </div>
          )}

          {/* Fecha de vencimiento */}
          {item.dueDate && (
            <div className="flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              <span className={`${
                daysUntilDue !== null && daysUntilDue < 0 
                  ? 'text-red-600 font-medium' 
                  : daysUntilDue !== null && daysUntilDue <= 3
                  ? 'text-orange-600 font-medium'
                  : 'text-gray-600'
              }`}>
                {formatDate(item.dueDate)}
                {daysUntilDue !== null && (
                  <span className="ml-1">
                    ({daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} días vencida` : 
                      daysUntilDue === 0 ? 'Vence hoy' : 
                      `${daysUntilDue} días`})
                  </span>
                )}
              </span>
            </div>
          )}

          {/* Progreso */}
          {item.progress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progreso</span>
                <span>{item.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de columna
const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  items,
  onItemClick,
  onItemEdit,
  onItemDelete,
  onDropItem,
  readOnly = false,
  showActions = true
}) => {
  const [isOver, setIsOver] = useState(false);

  const { onDragOver, onDrop } = useKanbanDrop();

  const canAcceptMore = !column.maxItems || items.length < column.maxItems;

  return (
    <div className="bg-gray-50 rounded-lg p-4 min-h-96">
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: column.color || '#6B7280' }}
        />
        <h3 className="font-medium text-sm">{column.title}</h3>
        <Badge variant="outline" className="ml-auto">
          {items.length}
          {column.maxItems && ` / ${column.maxItems}`}
        </Badge>
      </div>
      
      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column.id)}
        className={`min-h-32 transition-all rounded-lg ${
          isOver && canAcceptMore
            ? 'bg-blue-50 border-2 border-blue-300 border-dashed' 
            : isOver && !canAcceptMore
            ? 'bg-red-50 border-2 border-red-300 border-dashed'
            : ''
        }`}
      >
        {items.map((item) => (
          <KanbanCard
            key={item.id}
            item={item}
            onClick={onItemClick}
            onEdit={onItemEdit}
            onDelete={onItemDelete}
            readOnly={readOnly}
            showActions={showActions}
          />
        ))}
        
        {/* Indicador de límite alcanzado */}
        {column.maxItems && items.length >= column.maxItems && (
          <div className="text-center py-4 text-sm text-gray-500">
            <AlertTriangle className="h-4 w-4 mx-auto mb-1" />
            Límite máximo alcanzado
          </div>
        )}
        
        {/* Placeholder cuando está vacío */}
        {items.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-400">
            {readOnly ? 'Sin elementos' : 'Arrastra elementos aquí'}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal UnifiedKanban
const UnifiedKanban: React.FC<UnifiedKanbanProps> = ({
  columns,
  items,
  onItemMove,
  onItemClick,
  onItemEdit,
  onItemDelete,
  loading = false,
  error,
  readOnly = false,
  showActions = true,
  customCardRenderer
}) => {
  // Agrupar items por columna
  const itemsByColumn = useMemo(() => {
    const grouped: Record<string, KanbanItem[]> = {};
    columns.forEach(column => {
      grouped[column.id] = items.filter(item => item.columnId === column.id);
    });
    return grouped;
  }, [columns, items]);

  const handleItemMove = (itemId: string, targetColumnId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.columnId === targetColumnId) return;

    const sourceColumnId = item.columnId;
    const targetItems = itemsByColumn[targetColumnId] || [];
    const newIndex = targetItems.length; // Agregar al final por defecto

    onItemMove(itemId, sourceColumnId, targetColumnId, newIndex);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4" style={{ 
      gridTemplateColumns: `repeat(${columns.length}, minmax(280px, 1fr))` 
    }}>
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          items={itemsByColumn[column.id] || []}
          onItemClick={onItemClick}
          onItemEdit={onItemEdit}
          onItemDelete={onItemDelete}
          onDropItem={handleItemMove}
          readOnly={readOnly}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

export default UnifiedKanban;
export { KanbanCard, KanbanColumn };
export type { KanbanCardProps, KanbanColumnProps };
