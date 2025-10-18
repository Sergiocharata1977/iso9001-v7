import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ ok: true, message: "✅ Conexión MongoDB exitosa" });
  } catch (error) {
    return NextResponse.json({ ok: false, error });
  }
}