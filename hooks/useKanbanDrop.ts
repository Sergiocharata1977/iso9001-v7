'use client';

import React from 'react';

export interface DropParseResult {
  item: any | null;
  columnId?: string | null;
}

// Stub inicial para habilitar el build. Más adelante migramos el DnD real con Atlassian
export const useKanbanDrop = (..._args: any[]) => {
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const onDrop = (e: React.DragEvent, columnId?: string): DropParseResult => {
    e.preventDefault();
    try {
      const text = e.dataTransfer?.getData('text/plain') ?? '';
      const item = text ? JSON.parse(text) : null;
      return { item, columnId: columnId ?? null };
    } catch {
      return { item: null, columnId: columnId ?? null };
    }
  };

  return { onDragOver, onDrop };
};

export default useKanbanDrop;


