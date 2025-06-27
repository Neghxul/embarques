import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// GET /api/orders - No changes needed here
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { consecutive: 'desc' },
      include: {
        customer: true,
        shipment: true,
        items: { include: { product: true } },
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST /api/orders - Creates a new order with items (LOGIC CORRECTED)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerId, vendedorId, purchaseOrder, invoice, rev, status, items } = body;

        if (!customerId || !vendedorId || !items || !Array.isArray(items) || items.length === 0) {
            return new NextResponse('Customer, seller, and at least one item are required.', { status: 400 });
        }
        
        const createdOrder = await prisma.$transaction(async (tx) => {
            // 1. For each item in the form, find its product ID. If the product
            // doesn't exist by its code, create it on the fly (upsert).
            const productsInOrder = await Promise.all(
              items.map((item: any) => {
                if (!item.code) {
                  throw new Error('Each item must have a product code.');
                }
                return tx.product.upsert({
                  where: { code: item.code },
                  update: {}, // We don't need to update the product if it exists
                  create: {
                    code: item.code,
                    description: item.description || 'No description',
                  },
                });
              })
            );

            // 2. Create the main Order record
            const order = await tx.order.create({
                data: {
                    purchaseOrder,
                    invoice,
                    rev,
                    status: status || 'PENDIENTE',
                    customerId: customerId,
                    vendedorId: vendedorId,
                }
            });

            // 3. Prepare the OrderItem data, now using the correct product IDs
            const orderItemsData = items.map((item: any, index: number) => {
                const productId = productsInOrder[index].id;
                if (!item.quantity || item.unitPrice == null) {
                    throw new Error('Each item must have a quantity and price.');
                }
                return {
                    orderId: order.id,
                    productId: productId, // Use the real, found/created product ID
                    quantity: parseInt(item.quantity, 10),
                    unitPrice: parseFloat(item.unitPrice),
                };
            });
            
            // 4. Create all the OrderItem records
            await tx.orderItem.createMany({
                data: orderItemsData,
            });

            return order;
        });
        
        return NextResponse.json(createdOrder, { status: 201 });

    } catch (error: any) {
        console.error("Error creating order:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return new NextResponse(`Database Error: ${error.message}`, { status: 400 });
        }
        // Return a more generic error message for other cases
        return new NextResponse(error.message || 'Internal Server Error', { status: 500 });
    }
}
