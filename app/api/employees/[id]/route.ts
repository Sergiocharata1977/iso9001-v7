import { NextRequest, NextResponse } from 'next/server';
import { Employee } from '@/models/Employee';
import { dbConnect } from '@/lib/dbConnect';
import { z } from 'zod';

// Esquema de validación para actualizar empleado
const updateEmployeeSchema = z.object({
  nombres: z.string().min(1, 'Los nombres son obligatorios').optional(),
  apellidos: z.string().min(1, 'Los apellidos son obligatorios').optional(),
  email: z.string().email('Email inválido').optional(),
  telefono: z.string().optional(),
  documento_identidad: z.string().optional(),
  fecha_nacimiento: z.string().optional(),
  nacionalidad: z.string().optional(),
  direccion: z.string().optional(),
  telefono_emergencia: z.string().optional(),
  fecha_contratacion: z.string().optional(),
  numero_legajo: z.string().optional(),
  puesto_id: z.string().optional(),
  departamento_id: z.string().optional(),
  supervisor_id: z.string().optional(),
  estado: z.enum(['Activo', 'Inactivo', 'Licencia', 'Suspendido']).optional(),
  tipo_personal: z.enum(['administrativo', 'ventas', 'técnico', 'supervisor', 'gerencial', 'operativo']).optional(),
  meta_mensual: z.coerce.number().optional(),
  comision_porcentaje: z.coerce.number().optional(),
  especialidad_ventas: z.string().optional(),
  fecha_inicio_ventas: z.string().optional(),
  zona_venta: z.string().optional(),
});

// GET /api/employees/[id] - Obtener un empleado por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const organization_id = searchParams.get('organization_id');

    if (!organization_id) {
      return NextResponse.json(
        { success: false, error: 'organization_id es requerido' },
        { status: 400 }
      );
    }

    const employee = await Employee.findOne({
      id: params.id,
      organization_id
    });

    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: employee
    });

  } catch (error) {
    console.error('Error obteniendo empleado:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error obteniendo empleado',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// PUT /api/employees/[id] - Actualizar empleado
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const organization_id = searchParams.get('organization_id');

    if (!organization_id) {
      return NextResponse.json(
        { success: false, error: 'organization_id es requerido' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Convertir fechas de string a Date si existen
    if (body.fecha_nacimiento) {
      body.fecha_nacimiento = new Date(body.fecha_nacimiento);
    }
    if (body.fecha_contratacion) {
      body.fecha_contratacion = new Date(body.fecha_contratacion);
    }
    if (body.fecha_inicio_ventas) {
      body.fecha_inicio_ventas = new Date(body.fecha_inicio_ventas);
    }

    // Validar datos de entrada
    const validatedData = updateEmployeeSchema.parse(body);

    // Buscar y actualizar el empleado
    const employee = await Employee.findOneAndUpdate(
      { id: params.id, organization_id },
      { ...validatedData, updated_at: new Date() },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: employee,
      message: 'Empleado actualizado exitosamente'
    });

  } catch (error) {
    console.error('Error actualizando empleado:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Datos de entrada inválidos',
          details: error.issues
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Error actualizando empleado',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/employees/[id] - Eliminar empleado (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const organization_id = searchParams.get('organization_id');

    if (!organization_id) {
      return NextResponse.json(
        { success: false, error: 'organization_id es requerido' },
        { status: 400 }
      );
    }

    // Soft delete: cambiar estado a Inactivo
    const employee = await Employee.findOneAndUpdate(
      { id: params.id, organization_id },
      { estado: 'Inactivo', updated_at: new Date() },
      { new: true }
    );

    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Empleado eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando empleado:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error eliminando empleado',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}