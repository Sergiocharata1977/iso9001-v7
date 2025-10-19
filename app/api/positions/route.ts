import { NextRequest, NextResponse } from 'next/server';
import { Position } from '@/models/Position';
import { dbConnect } from '@/lib/dbConnect';
import { z } from 'zod';

// Esquema de validación para crear puesto
const createPositionSchema = z.object({
  id: z.string().min(1, 'El ID es obligatorio'),
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion_responsabilidades: z.string().optional(),
  requisitos_experiencia: z.string().optional(),
  requisitos_formacion: z.string().optional(),
  departamento_id: z.string().optional(),
  reporta_a_id: z.string().optional(),
  organization_id: z.string().min(1, 'El ID de organización es obligatorio'),
  nivel_jerarquico: z.enum(['Ejecutivo', 'Gerencial', 'Coordinación', 'Supervisión', 'Analista', 'Técnico', 'Operativo']).optional(),
  salario_rango: z.string().optional(),
  cantidad_empleados: z.coerce.number().optional(),
  estado: z.enum(['activo', 'inactivo']).default('activo'),
});

// GET /api/positions - Obtener puestos con filtros y paginación
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const organization_id = searchParams.get('organization_id');
    const departamento_id = searchParams.get('departamento_id');
    const nivel_jerarquico = searchParams.get('nivel_jerarquico');
    const estado = searchParams.get('estado');

    if (!organization_id) {
      return NextResponse.json(
        { success: false, error: 'organization_id es requerido' },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // Construir query
    const query: any = { organization_id };

    if (estado) {
      query.estado = estado;
    }

    if (departamento_id) {
      query.departamento_id = departamento_id;
    }

    if (nivel_jerarquico) {
      query.nivel_jerarquico = nivel_jerarquico;
    }

    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { descripcion_responsabilidades: { $regex: search, $options: 'i' } },
        { requisitos_formacion: { $regex: search, $options: 'i' } }
      ];
    }

    // Ejecutar query con paginación
    const [positions, total] = await Promise.all([
      Position.find(query)
        .sort({ nombre: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Position.countDocuments(query)
    ]);

    const response = {
      success: true,
      data: positions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + positions.length < total
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error obteniendo puestos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error obteniendo puestos',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// POST /api/positions - Crear nuevo puesto
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validar datos de entrada
    const validatedData = createPositionSchema.parse(body);

    // Verificar que no exista un puesto con el mismo ID en la organización
    const existingPosition = await Position.findOne({
      id: validatedData.id,
      organization_id: validatedData.organization_id
    });

    if (existingPosition) {
      return NextResponse.json(
        { success: false, error: 'Ya existe un puesto con este ID en la organización' },
        { status: 400 }
      );
    }

    // Crear el puesto
    const position = new Position(validatedData);
    await position.save();

    return NextResponse.json({
      success: true,
      data: position,
      message: 'Puesto creado exitosamente'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creando puesto:', error);

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
        error: 'Error creando puesto',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}