/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const trees = await prisma.tree.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(trees);
    } catch (error: any) {
        return NextResponse.json({ error: `Error fetching trees: ${error}` }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const tree = await prisma.tree.create({
            data: {
                name: body.name,
                age: parseInt(body.age),
                type: body.type,
                isFruitful: body.isFruitful,
            },
        });
        return NextResponse.json(tree);
    } catch (error: any) {
        return NextResponse.json({ error: `Error creating tree:  ${error}` }, { status: 500 });
    }
}