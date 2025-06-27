import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    // Return an empty array if there's no query to search for
    return NextResponse.json([]);
  }

  try {
    const customers = await prisma.customer.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive', // Case-insensitive search
        },
      },
      take: 5, // Limit results to prevent sending too much data
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        contactName: true,
      },
    });
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Customer search error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
