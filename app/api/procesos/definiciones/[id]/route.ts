import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import ProcessDefinition, { IProcessDefinition } from '@/models/ProcessDefinition';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const proceso = await (ProcessDefinition.findById(params.id) as any)
      .populate('propietario', 'nombre email')
      .populate('departamento', 'nombre');

    if (!proceso) {
      return NextResponse.json({ success: false, error: 'Proceso no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: proceso });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const proceso = await ProcessDefinition.findByIdAndUpdate(params.id, body, { new: true });

    if (!proceso) {
      return NextResponse.json({ success: false, error: 'Proceso no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: proceso });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const proceso = await ProcessDefinition.findByIdAndUpdate(
      params.id,
      { activo: false },
      { new: true }
    );

    if (!proceso) {
      return NextResponse.json({ success: false, error: 'Proceso no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Proceso eliminado' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}