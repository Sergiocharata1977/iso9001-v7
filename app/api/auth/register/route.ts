import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { name, email, password, role = 'user', organization_id = 'org-001' } = await request.json();
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nombre, email y contraseña son requeridos' },
        { status: 400 }
      );
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 400 }
      );
    }
    
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Crear usuario
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      organization_id,
      is_active: true
    });
    
    await user.save();
    
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
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization_id: user.organization_id,
      is_active: user.is_active
    };
    
    return NextResponse.json({
      success: true,
      user: userResponse,
      token
    });
    
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

