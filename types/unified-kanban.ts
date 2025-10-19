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
  id: string;
  title: string;
  cards: KanbanCardProps[];
  onCardMove?: (cardId: string, targetColumn: string) => void;
  onCardAdd?: (columnId: string) => void;
}

export interface KanbanBoardProps {
  columns: KanbanColumnProps[];
  onCardMove?: (cardId: string, sourceColumn: string, targetColumn: string) => void;
  onCardAdd?: (columnId: string) => void;
  onCardEdit?: (cardId: string) => void;
  onCardDelete?: (cardId: string) => void;
}
