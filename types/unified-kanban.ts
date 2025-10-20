export interface KanbanCardProps {
  item: {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
    assignee?: string;
    dueDate?: string;
    tags?: string[];
    progress?: number;
    columnId?: string;
    [key: string]: any;
  };
  onClick?: (item: any) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
  readOnly?: boolean;
  showActions?: boolean;
  customRenderer?: (item: any) => React.ReactNode;
}

export interface KanbanColumnProps {
  // Compatibilidad con el componente KanbanColumn actual
  column: {
    id: string;
    title: string;
    color?: string;
    maxItems?: number;
    allowDrop?: boolean;
    [key: string]: any;
  };
  items: KanbanCardProps['item'][];

  // Callbacks a nivel de ítems
  onItemMove?: (itemId: string, sourceColumnId: string, targetColumnId: string, index: number) => void;
  onItemClick?: (item: any) => void;
  onItemEdit?: (item: any) => void;
  onItemDelete?: (item: any) => void;
  onDropItem?: (itemId: string, targetColumnId: string) => void;

  // UI flags y renderers
  readOnly?: boolean;
  showActions?: boolean;
  customCardRenderer?: (item: KanbanCardProps['item']) => React.ReactNode;

  // Drag state superficial para integración futura
  draggedItem?: KanbanCardProps['item'] | null;
  onDragStart?: (itemId: string) => void;
  onDragEnd?: () => void;
}

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  status: string;
  columnId: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  progress?: number;
  [key: string]: any;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  maxItems?: number;
  allowDrop?: boolean;
  [key: string]: any;
}

export interface UnifiedKanbanProps {
  columns: KanbanColumn[];
  items: KanbanItem[];
  onItemMove: (itemId: string, sourceColumnId: string, targetColumnId: string, newIndex: number) => void;
  onItemClick?: (item: KanbanItem) => void;
  onItemEdit?: (item: KanbanItem) => void;
  onItemDelete?: (item: KanbanItem) => void;
  loading?: boolean;
  error?: string;
  readOnly?: boolean;
  showActions?: boolean;
  customCardRenderer?: (item: KanbanItem) => React.ReactNode;
}

export interface KanbanBoardProps {
  columns: KanbanColumnProps[];
  onCardMove?: (cardId: string, sourceColumn: string, targetColumn: string) => void;
  onCardAdd?: (columnId: string) => void;
  onCardEdit?: (cardId: string) => void;
  onCardDelete?: (cardId: string) => void;
}

// ===== Tipos unificados adicionales para tableros Kanban =====
export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  status: string;
  columnId: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  progress?: number;
  [key: string]: any;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  maxItems?: number;
  allowDrop?: boolean;
  [key: string]: any;
}

export interface UnifiedKanbanProps {
  columns: KanbanColumn[];
  items: KanbanItem[];
  onItemMove: (
    itemId: string,
    sourceColumnId: string,
    targetColumnId: string,
    newIndex: number
  ) => void;
  onItemClick?: (item: KanbanItem) => void;
  onItemEdit?: (item: KanbanItem) => void;
  onItemDelete?: (item: KanbanItem) => void;
  loading?: boolean;
  error?: string;
  readOnly?: boolean;
  showActions?: boolean;
  customCardRenderer?: (item: KanbanItem) => React.ReactNode;
}

// Configuración de prioridades para normalizar variantes de Badge
export const priorityConfig = {
  critical: {
    label: 'Crítica',
    color: 'bg-red-100 text-red-700 border-red-200'
  },
  high: {
    label: 'Alta',
    color: 'bg-orange-100 text-orange-700 border-orange-200'
  },
  medium: {
    label: 'Media',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  low: {
    label: 'Baja',
    color: 'bg-green-100 text-green-700 border-green-200'
  }
} as const;
