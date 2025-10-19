import { NextRequest, NextResponse } from 'next/server';
import { Department } from '@/models/Department';
import { dbConnect } from '@/lib/dbConnect';
import { z } from 'zod';

// Esquema de validación para actualizar departamento
const updateDepartmentSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').optional(),
  descripcion: z.string().optional(),
  responsable_id: z.string().optional(),
  objetivos: z.string().optional(),
  presupuesto: z.coerce.number().optional(),
  cantidad_empleados: z.coerce.number().optional(),
  estado: z.enum(['activo', 'inactivo']).optional(),
});

// GET /api/departments/[id] - Obtener un departamento por ID
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

    const department = await Department.findOne({
      id: params.id,
      organization_id
    });

    if (!department) {
      return NextResponse.json(
        { success: false, error: 'Departamento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: department
    });

  } catch (error) {
    console.error('Error obteniendo departamento:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error obteniendo departamento',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// PUT /api/departments/[id] - Actualizar departamento
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

    // Validar datos de entrada
    const validatedData = updateDepartmentSchema.parse(body);

    // Buscar y actualizar el departamento
    const department = await Department.findOneAndUpdate(
      { id: params.id, organization_id },
      { ...validatedData, updated_at: new Date() },
      { new: true, runValidators: true }
    );

    if (!department) {
      return NextResponse.json(
        { success: false, error: 'Departamento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: department,
      message: 'Departamento actualizado exitosamente'
    });

  } catch (error) {
    console.error('Error actualizando departamento:', error);

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
        error: 'Error actualizando departamento',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/departments/[id] - Eliminar departamento (soft delete)
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

    // Soft delete: cambiar estado a inactivo
    const department = await Department.findOneAndUpdate(
      { id: params.id, organization_id },
      { estado: 'inactivo', updated_at: new Date() },
      { new: true }
    );

    if (!department) {
      return NextResponse.json(
        { success: false, error: 'Departamento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Departamento eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando departamento:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error eliminando departamento',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}