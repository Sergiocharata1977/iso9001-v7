import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: '✅ API funcionando correctamente',
    version: '9001APP v7',
    timestamp: new Date().toISOString()
  })
}

