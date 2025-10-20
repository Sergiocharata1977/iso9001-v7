import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import ProcessRecord from '@/models/ProcessRecord';

export async function GET() {
  try {
    await dbConnect();
    const registros = await ProcessRecord.find()
      .populate('proceso', 'codigo nombre')
      .populate('responsable', 'nombre email')
      .sort({ fechaCreacion: -1 });

    return NextResponse.json({ success: true, data: registros });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const registro = await ProcessRecord.create(body);
    return NextResponse.json({ success: true, data: registro }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}