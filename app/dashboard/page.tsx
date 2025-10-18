'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Building2, 
  Shield, 
  LogOut, 
  Settings, 
  BarChart3, 
  Users, 
  FileText,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UserData {
  _id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'user' | 'viewer'
  organization_id: string
  is_active: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [organization, setOrganization] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay token y usuario guardado
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    const orgData = localStorage.getItem('organization')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setOrganization(orgData || parsedUser.organization_id || 'Sin organización')
      setIsLoading(false)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('organization')
    router.push('/')
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-red-600'
      case 'manager': return 'from-blue-500 to-blue-600'
      case 'user': return 'from-green-500 to-green-600'
      case 'viewer': return 'from-gray-500 to-gray-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador'
      case 'manager': return 'Gerente'
      case 'user': return 'Usuario'
      case 'viewer': return 'Visualizador'
      default: return 'Usuario'
    }
  }

  const getOrganizationName = (orgId: string) => {
    const orgNames: { [key: string]: string } = {
      'org-001': 'TechCorp SA',
      'org-002': 'Agro Solutions',
      'org-003': 'Industrias del Sur',
      'org-004': 'Consultora Norte'
    }
    return orgNames[orgId] || orgId
  }

  const stats = [
    {
      title: 'Usuarios Activos',
      value: '24',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Documentos',
      value: '156',
      icon: FileText,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Auditorías',
      value: '8',
      icon: Award,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Indicadores',
      value: '12',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">No se pudo cargar la información del usuario</p>
          <button 
            onClick={() => router.push('/login')}
            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Ir al Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo y Título */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Volver</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">9001APP v7</h1>
                  <p className="text-sm text-slate-600">Dashboard Multi-Tenant</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              {/* Organization Info */}
              <div className="text-right">
                <div className="flex items-center gap-2 text-slate-600">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{getOrganizationName(organization)}</span>
                </div>
                <p className="text-xs text-slate-500">Organización</p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-slate-900">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getRoleColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                ¡Bienvenido, {user.name}!
              </h2>
              <p className="text-slate-600">
                Has iniciado sesión exitosamente en <strong>{getOrganizationName(organization)}</strong> como <strong>{getRoleLabel(user.role)}</strong>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Users className="w-6 h-6 text-blue-500" />
              <div className="text-left">
                <p className="font-medium text-slate-900">Gestión de RRHH</p>
                <p className="text-sm text-slate-600">Departamentos, puestos y personal</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <FileText className="w-6 h-6 text-purple-500" />
              <div className="text-left">
                <p className="font-medium text-slate-900">Documentos</p>
                <p className="text-sm text-slate-600">Gestión documental ISO</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <BarChart3 className="w-6 h-6 text-green-500" />
              <div className="text-left">
                <p className="font-medium text-slate-900">Indicadores</p>
                <p className="text-sm text-slate-600">KPIs y métricas de calidad</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* User Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Información de Sesión</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Datos del Usuario</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-600">ID:</span> {user._id}</p>
                <p><span className="text-slate-600">Nombre:</span> {user.name}</p>
                <p><span className="text-slate-600">Email:</span> {user.email}</p>
                <p><span className="text-slate-600">Rol:</span> {getRoleLabel(user.role)}</p>
                <p><span className="text-slate-600">Estado:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Datos de la Organización</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-600">ID Organización:</span> {organization}</p>
                <p><span className="text-slate-600">Nombre:</span> {getOrganizationName(organization)}</p>
                <p><span className="text-slate-600">Tipo:</span> Empresa</p>
                <p><span className="text-slate-600">Acceso:</span> Multi-Tenant</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
