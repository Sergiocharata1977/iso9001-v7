import { NextRequest, NextResponse } from 'next/server';
import { Employee } from '@/models/Employee';
import { dbConnect } from '@/lib/dbConnect';
import { z } from 'zod';

// Esquema de validación para crear empleado
const createEmployeeSchema = z.object({
  id: z.string().min(1, 'El ID es obligatorio'),
  organization_id: z.string().min(1, 'El ID de organización es obligatorio'),
  nombres: z.string().min(1, 'Los nombres son obligatorios'),
  apellidos: z.string().min(1, 'Los apellidos son obligatorios'),
  email: z.string().email('Email inválido'),
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
  estado: z.enum(['Activo', 'Inactivo', 'Licencia', 'Suspendido']).default('Activo'),
  tipo_personal: z.enum(['administrativo', 'ventas', 'técnico', 'supervisor', 'gerencial', 'operativo']).default('administrativo'),
  meta_mensual: z.coerce.number().optional(),
  comision_porcentaje: z.coerce.number().optional(),
  especialidad_ventas: z.string().optional(),
  fecha_inicio_ventas: z.string().optional(),
  zona_venta: z.string().optional(),
});

// GET /api/employees - Obtener empleados con filtros y paginación
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const organization_id = searchParams.get('organization_id');
    const departamento_id = searchParams.get('departamento_id');
    const puesto_id = searchParams.get('puesto_id');
    const tipo_personal = searchParams.get('tipo_personal');
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

    if (puesto_id) {
      query.puesto_id = puesto_id;
    }

    if (tipo_personal) {
      query.tipo_personal = tipo_personal;
    }

    if (search) {
      query.$or = [
        { nombres: { $regex: search, $options: 'i' } },
        { apellidos: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { numero_legajo: { $regex: search, $options: 'i' } }
      ];
    }

    // Ejecutar query con paginación
    const [employees, total] = await Promise.all([
      Employee.find(query)
        .sort({ apellidos: 1, nombres: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Employee.countDocuments(query)
    ]);

    const response = {
      success: true,
      data: employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + employees.length < total
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error obteniendo empleados:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error obteniendo empleados',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// POST /api/employees - Crear nuevo empleado
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

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
    const validatedData = createEmployeeSchema.parse(body);

    // Verificar que no exista un empleado con el mismo ID o email en la organización
    const existingEmployee = await Employee.findOne({
      $and: [
        { organization_id: validatedData.organization_id },
        {
          $or: [
            { id: validatedData.id },
            { email: validatedData.email }
          ]
        }
      ]
    });

    if (existingEmployee) {
      const conflictField = existingEmployee.id === validatedData.id ? 'ID' : 'email';
      return NextResponse.json(
        { success: false, error: `Ya existe un empleado con este ${conflictField} en la organización` },
        { status: 400 }
      );
    }

    // Crear el empleado
    const employee = new Employee(validatedData);
    await employee.save();

    return NextResponse.json({
      success: true,
      data: employee,
      message: 'Empleado creado exitosamente'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creando empleado:', error);

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
        error: 'Error creando empleado',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}