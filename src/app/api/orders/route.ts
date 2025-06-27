import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/orders - Obtiene todas las órdenes
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        consecutive: 'desc',
      },
      include: {
        customer: true,
        shipment: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST /api/orders - Crea una nueva orden (simplificado)
export async function POST(request: Request) {
    try {
        const json = await request.json();

        // En un caso real, validarías que el customerId y los productos existan
        const newOrder = await prisma.order.create({
            data: {
                purchaseOrder: json.purchaseOrder,
                invoice: json.invoice,
                status: json.status || 'PENDIENTE',
                // Esto es un ejemplo, necesitarás una forma de seleccionar un cliente
                customerId: 'clxwbx91w000010m5pczznd4h', // REEMPLAZAR con un ID de cliente real de tu DB
            }
        });
        return NextResponse.json(newOrder, { status: 201 });

    } catch (error) {
        console.error("Error creating order:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}