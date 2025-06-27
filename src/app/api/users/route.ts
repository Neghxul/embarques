import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/users?role=VENDEDOR - Obtiene usuarios por rol
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');

  if (role !== 'VENDEDOR') {
      return new NextResponse('Invalid role specified', { status: 400 });
  }

  try {
    const vendedores = await prisma.user.findMany({
      where: {
        role: 'VENDEDOR',
      },
      select: { // Solo enviamos los datos necesarios
        id: true,
        name: true,
        email: true
      }
    });
    return NextResponse.json(vendedores);
  } catch (error) {
    console.error("Error fetching vendedores:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}