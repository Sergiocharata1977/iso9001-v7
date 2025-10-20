import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import ProcessDefinition from '@/models/ProcessDefinition';

export async function GET() {
  try {
    await dbConnect();
    const procesos = await ProcessDefinition.find({ activo: true })
      .populate('propietario', 'nombre email')
      .populate('departamento', 'nombre')
      .sort({ codigo: 1 });

    return NextResponse.json({ success: true, data: procesos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const proceso = await ProcessDefinition.create(body);
    return NextResponse.json({ success: true, data: proceso }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}