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
