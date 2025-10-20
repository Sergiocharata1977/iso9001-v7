'use client';

import { useState, useEffect } from 'react';

export default function DefinicionesPage() {
  const [procesos, setProcesos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/procesos/definiciones')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProcesos(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Definiciones de Procesos</h1>
      <div className="grid gap-4">
        {procesos.map((proceso: any) => (
          <div key={proceso._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{proceso.codigo} - {proceso.nombre}</h3>
            <p className="text-sm text-gray-600">{proceso.descripcion}</p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {proceso.tipo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}