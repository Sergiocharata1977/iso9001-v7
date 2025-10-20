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
    [key: string]: any;
  };
  items: KanbanCardProps['item'][];

  // Callbacks a nivel de ítems
  onItemMove: (itemId: string, sourceColumnId: string, targetColumnId: string, index: number) => void;
  onItemClick?: (itemId: string) => void;
  onItemEdit?: (itemId: string) => void;
  onItemDelete?: (itemId: string) => void;

  // UI flags y renderers
  readOnly?: boolean;
  showActions?: boolean;
  customCardRenderer?: (item: KanbanCardProps['item']) => React.ReactNode;

  // Drag state superficial para integración futura
  draggedItem?: KanbanCardProps['item'] | null;
  onDragStart?: (itemId: string) => void;
  onDragEnd?: () => void;
}

export interface KanbanBoardProps {
  columns: KanbanColumnProps[];
  onCardMove?: (cardId: string, sourceColumn: string, targetColumn: string) => void;
  onCardAdd?: (columnId: string) => void;
  onCardEdit?: (cardId: string) => void;
  onCardDelete?: (cardId: string) => void;
}
