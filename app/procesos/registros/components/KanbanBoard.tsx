'use client';

import { ProcessStatus } from '@/models/ProcessRecord';

interface KanbanBoardProps {
  registros: any[];
  onUpdateStatus: (id: string, newStatus: ProcessStatus) => void;
}

export default function KanbanBoard({ registros, onUpdateStatus }: KanbanBoardProps) {
  const columns = [
    { id: ProcessStatus.PENDIENTE, title: 'Pendiente', color: 'bg-gray-100' },
    { id: ProcessStatus.EN_PROCESO, title: 'En Proceso', color: 'bg-blue-100' },
    { id: ProcessStatus.COMPLETADO, title: 'Completado', color: 'bg-green-100' },
  ];

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'border-l-4 border-red-500';
      case 'media': return 'border-l-4 border-yellow-500';
      case 'baja': return 'border-l-4 border-green-500';
      default: return '';
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {columns.map(column => (
        <div key={column.id} className={`${column.color} p-4 rounded-lg`}>
          <h3 className="font-bold mb-4">{column.title}</h3>
          <div className="space-y-3">
            {registros
              .filter(r => r.estado === column.id)
              .map(registro => (
                <div
                  key={registro._id}
                  className={`bg-white p-4 rounded-lg shadow cursor-move ${getPriorityColor(registro.prioridad)}`}
                  draggable
                  onDragEnd={() => {
                    // Implementar lógica de drag & drop
                  }}
                >
                  <h4 className="font-semibold text-sm">{registro.titulo}</h4>
                  <p className="text-xs text-gray-600 mt-1">{registro.descripcion}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {registro.proceso?.codigo}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      registro.prioridad === 'alta' ? 'bg-red-100 text-red-700' :
                      registro.prioridad === 'media' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {registro.prioridad}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}