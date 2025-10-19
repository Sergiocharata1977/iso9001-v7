import { NextRequest, NextResponse } from 'next/server';
import { Position } from '@/models/Position';
import { dbConnect } from '@/lib/dbConnect';
import { z } from 'zod';

// Esquema de validación para actualizar puesto
const updatePositionSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').optional(),
  descripcion_responsabilidades: z.string().optional(),
  requisitos_experiencia: z.string().optional(),
  requisitos_formacion: z.string().optional(),
  departamento_id: z.string().optional(),
  reporta_a_id: z.string().optional(),
  nivel_jerarquico: z.enum(['Ejecutivo', 'Gerencial', 'Coordinación', 'Supervisión', 'Analista', 'Técnico', 'Operativo']).optional(),
  salario_rango: z.string().optional(),
  cantidad_empleados: z.coerce.number().optional(),
  estado: z.enum(['activo', 'inactivo']).optional(),
});

// GET /api/positions/[id] - Obtener un puesto por ID
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

    const position = await Position.findOne({
      id: params.id,
      organization_id
    });

    if (!position) {
      return NextResponse.json(
        { success: false, error: 'Puesto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: position
    });

  } catch (error) {
    console.error('Error obteniendo puesto:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error obteniendo puesto',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// PUT /api/positions/[id] - Actualizar puesto
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
    const validatedData = updatePositionSchema.parse(body);

    // Buscar y actualizar el puesto
    const position = await Position.findOneAndUpdate(
      { id: params.id, organization_id },
      { ...validatedData, updated_at: new Date() },
      { new: true, runValidators: true }
    );

    if (!position) {
      return NextResponse.json(
        { success: false, error: 'Puesto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: position,
      message: 'Puesto actualizado exitosamente'
    });

  } catch (error) {
    console.error('Error actualizando puesto:', error);

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
        error: 'Error actualizando puesto',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/positions/[id] - Eliminar puesto (soft delete)
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
    const position = await Position.findOneAndUpdate(
      { id: params.id, organization_id },
      { estado: 'inactivo', updated_at: new Date() },
      { new: true }
    );

    if (!position) {
      return NextResponse.json(
        { success: false, error: 'Puesto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Puesto eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando puesto:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error eliminando puesto',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}