import { NextRequest, NextResponse } from 'next/server';
import { Department } from '@/models/Department';
import { dbConnect } from '@/lib/dbConnect';
import { z } from 'zod';

// Esquema de validación para crear departamento
const createDepartmentSchema = z.object({
  id: z.string().min(1, 'El ID es obligatorio'),
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().optional(),
  responsable_id: z.string().optional(),
  organization_id: z.string().min(1, 'El ID de organización es obligatorio'),
  objetivos: z.string().optional(),
  presupuesto: z.coerce.number().optional(),
  cantidad_empleados: z.coerce.number().optional(),
  estado: z.enum(['activo', 'inactivo']).default('activo'),
});

// GET /api/departments - Obtener departamentos con filtros y paginación
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const organization_id = searchParams.get('organization_id');
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

    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } }
      ];
    }

    // Ejecutar query con paginación
    const [departments, total] = await Promise.all([
      Department.find(query)
        .sort({ nombre: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Department.countDocuments(query)
    ]);

    const response = {
      success: true,
      data: departments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + departments.length < total
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error obteniendo departamentos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error obteniendo departamentos',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// POST /api/departments - Crear nuevo departamento
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validar datos de entrada
    const validatedData = createDepartmentSchema.parse(body);

    // Verificar que no exista un departamento con el mismo ID en la organización
    const existingDepartment = await Department.findOne({
      id: validatedData.id,
      organization_id: validatedData.organization_id
    });

    if (existingDepartment) {
      return NextResponse.json(
        { success: false, error: 'Ya existe un departamento con este ID en la organización' },
        { status: 400 }
      );
    }

    // Crear el departamento
    const department = new Department(validatedData);
    await department.save();

    return NextResponse.json({
      success: true,
      data: department,
      message: 'Departamento creado exitosamente'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creando departamento:', error);

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
        error: 'Error creando departamento',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}