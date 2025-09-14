import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Type definitions for API response
export interface Product {
  id: number;
  name: string;
  description: string | null;
  quantity: number;
  imageUrl: string | null;
}

export interface ProductsResponse {
  products?: Product[];
  error?: string;
}

export async function GET() {
  try {
    // Use select to only fetch required fields for optimal performance
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        quantity: true,
        imageUrl: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Add basic caching headers for static product data
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    // Log the full error for debugging
    console.error("Error fetching products:", error);

    // Return generic error message to client
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, quantity, imageUrl } = body;

    if (!name || quantity === undefined) {
      return NextResponse.json(
        { error: "Name and quantity are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        quantity: parseInt(quantity),
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}