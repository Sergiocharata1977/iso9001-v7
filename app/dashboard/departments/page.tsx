'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, UserCheck, TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Interfaces
interface Department {
  id: string;
  nombre: string;
  descripcion?: string;
  responsable_id?: string;
  organization_id: string;
  objetivos?: string;
  presupuesto?: number;
  cantidad_empleados?: number;
  estado: string;
  created_at: Date;
  updated_at: Date;
}

interface DepartmentStats {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Cargar datos iniciales
  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  const loadDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/departments?organization_id=org-001&page=1&limit=20');
      const result = await response.json();

      if (result.success) {
        setDepartments(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Error al cargar departamentos"
        });
      }
    } catch (error) {
      console.error('Error cargando departamentos:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al cargar los datos de departamentos"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stats: DepartmentStats[] = [
    {
      title: 'Total Departamentos',
      value: departments.length.toString(),
      change: '+2',
      changeType: 'positive',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Personal Total',
      value: departments.reduce((acc, dept) => acc + (dept.cantidad_empleados || 0), 0).toString(),
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Departamentos Activos',
      value: departments.filter(d => d.estado === 'activo').length.toString(),
      change: '0%',
      changeType: 'neutral',
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Presupuesto Total',
      value: `$${(departments.reduce((acc, dept) => acc + (dept.presupuesto || 0), 0) / 1000).toFixed(0)}k`,
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Departamentos</h1>
          <p className="text-gray-600 mt-2">
            Administración de la estructura organizacional y departamentos
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Departamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' :
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">vs mes anterior</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor} flex-shrink-0`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Departments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Departamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Cargando departamentos...</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay departamentos</h3>
              <p className="text-gray-500 mb-4">Comienza creando tu primer departamento</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Departamento
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((department) => (
                <Card key={department.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{department.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-2">{department.descripcion}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            department.estado === 'activo'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {department.estado}
                          </span>
                        </div>
                        {department.cantidad_empleados && (
                          <p className="text-sm text-gray-500">
                            {department.cantidad_empleados} empleados
                          </p>
                        )}
                        {department.presupuesto && (
                          <p className="text-sm text-gray-500">
                            Presupuesto: ${department.presupuesto.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}