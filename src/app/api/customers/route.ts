import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, address, vendedorId } = body;
        if (!name || !vendedorId) {
            return new NextResponse('Missing required fields: name and seller are required', { status: 400 });
        }
        const newCustomer = await prisma.customer.create({
            data: { name, email, phone, address, vendedorId },
        });
        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
             return new NextResponse('A customer with this name already exists.', { status: 409 });
        }
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}