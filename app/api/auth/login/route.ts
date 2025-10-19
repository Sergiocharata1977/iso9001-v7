import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }
    
    // Buscar usuario por email (la organización se detecta automáticamente)
    const user = await User.findOne({ 
      email
    }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }
    
    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }
    
    // Verificar que el usuario esté activo
    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Usuario inactivo' },
        { status: 401 }
      );
    }
    
    // Generar JWT
    const token = jwt.sign(
      { 
        userId: user._id.toString(), 
        email: user.email, 
        role: user.role,
        organization_id: user.organization_id 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );
    
    // Respuesta sin contraseña
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization_id: user.organization_id,
      is_active: user.is_active,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
    
    return NextResponse.json({
      success: true,
      user: userResponse,
      token,
      organization: {
        id: user.organization_id,
        name: getOrganizationName(user.organization_id)
      }
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

function getOrganizationName(orgId: string): string {
  const orgNames: { [key: string]: string } = {
    'org-001': 'TechCorp SA',
    'org-002': 'Agro Solutions',
    'org-003': 'Industrias del Sur',
    'org-004': 'Consultora Norte'
  }
  return orgNames[orgId] || orgId
}

