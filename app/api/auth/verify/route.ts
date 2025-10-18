import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { User } from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token de autorización requerido' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    
    // Verificar JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    
    // Buscar usuario
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.is_active) {
      return NextResponse.json(
        { error: 'Usuario no encontrado o inactivo' },
        { status: 401 }
      );
    }
    
    // Respuesta sin contraseña
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization_id: user.organization_id,
      is_active: user.is_active
    };
    
    return NextResponse.json({
      success: true,
      user: userResponse
    });
    
  } catch (error) {
    console.error('Error en verificación:', error);
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    );
  }
}

