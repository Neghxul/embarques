import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
    params: { id: string }
}

// PUT /api/orders/{id} - Actualiza una orden existente
export async function PUT(request: Request, { params }: RouteParams) {
    const id = params.id;
    try {
        const json = await request.json();
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                purchaseOrder: json.purchaseOrder,
                invoice: json.invoice,
                status: json.status,
            },
        });
        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error(`Error updating order ${id}:`, error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}