'use client';

import { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import { ProcessStatus } from '@/models/ProcessRecord';

export default function RegistrosPage() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegistros();
  }, []);

  const loadRegistros = async () => {
    const res = await fetch('/api/procesos/registros');
    const data = await res.json();
    if (data.success) setRegistros(data.data);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, newStatus: ProcessStatus) => {
    await fetch(`/api/procesos/registros/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: newStatus }),
    });
    loadRegistros();
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Registros de Procesos - Kanban</h1>
      <KanbanBoard registros={registros} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
}