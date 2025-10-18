import { CheckCircle2, Database, Rocket } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-5xl w-full space-y-8 text-center">
        {/* Logo y Título */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">
            🚀 9001APP v7
          </h1>
          <p className="text-xl text-gray-600">
            Sistema de Gestión ISO 9001 - Next.js 14
          </p>
        </div>

        {/* Estado del Proyecto */}
        <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              ✅ Entregable 1: Renderización Base Completada
            </h2>
          </div>

          {/* Checklist */}
          <div className="grid gap-4 text-left max-w-2xl mx-auto">
            <ChecklistItem 
              icon={<Rocket className="w-5 h-5" />}
              text="Next.js 14 configurado correctamente"
              completed
            />
            <ChecklistItem 
              icon={<CheckCircle2 className="w-5 h-5" />}
              text="TypeScript y Tailwind CSS activos"
              completed
            />
            <ChecklistItem 
              icon={<Database className="w-5 h-5" />}
              text="Preparado para conexión MongoDB Atlas"
              pending
            />
          </div>
        </div>

        {/* Próximos Pasos */}
        <div className="bg-blue-500 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">📋 Próximos Pasos</h3>
          <p className="text-sm opacity-90">
            Entregable 2: Configurar conexión MongoDB Atlas
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          <p>Versión 0.1.0 - Proyecto base funcionando ✨</p>
        </div>
      </div>
    </main>
  )
}

function ChecklistItem({ 
  icon, 
  text, 
  completed = false, 
  pending = false 
}: { 
  icon: React.ReactNode
  text: string
  completed?: boolean
  pending?: boolean
}) {
  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
      completed ? 'bg-green-50' : pending ? 'bg-yellow-50' : 'bg-gray-50'
    }`}>
      <div className={
        completed ? 'text-green-600' : pending ? 'text-yellow-600' : 'text-gray-400'
      }>
        {icon}
      </div>
      <span className={
        completed ? 'text-green-900' : pending ? 'text-yellow-900' : 'text-gray-600'
      }>
        {text}
      </span>
      {completed && (
        <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
      )}
    </div>
  )
}

