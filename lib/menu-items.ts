import { Home, FileText, Target, TrendingUp, BarChart3, Settings, Users, Building2 } from 'lucide-react';

export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
  {
    id: 'rrhh',
    label: 'Recursos Humanos',
    icon: Users,
    submenu: [
      { id: 'departamentos', label: 'Departamentos', href: '/dashboard/departments' },
      { id: 'puestos', label: 'Puestos', href: '/dashboard/positions' },
      { id: 'personal', label: 'Personal', href: '/dashboard/employees' },
    ]
  },
  {
    id: 'procesos',
    label: 'Procesos ISO',
    icon: FileText,
    submenu: [
      { id: 'definiciones', label: 'Definiciones', href: '/procesos/definiciones' },
      { id: 'registros', label: 'Registros', href: '/procesos/registros' },
    ]
  },
  {
    id: 'calidad',
    label: 'Calidad',
    icon: Target,
    submenu: [
      { id: 'objetivos', label: 'Objetivos', href: '/calidad/objetivos' },
      { id: 'indicadores', label: 'Indicadores', href: '/calidad/indicadores' },
      { id: 'mediciones', label: 'Mediciones', href: '/calidad/mediciones' },
    ]
  },
  { id: 'admin', label: 'Admin', icon: Settings, href: '/admin' },
];