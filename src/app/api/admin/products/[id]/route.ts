import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json()
    const { name, price, description, stock, available, favorite } = body

    if (!name || !description || price === undefined || stock === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const product = await prisma.products.update({
      where: { id },
      data: {
        name,
        price,
        description,
        stock,
        available: available ?? true,
        favorite: favorite ?? false,
      },
    })

    return NextResponse.json({ product })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if product has any associated purchase orders
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      where: { productId: params.id },
    })

    if (purchaseOrders.length > 0) {
      return NextResponse.json({ error: "Cannot delete product with existing purchase orders" }, { status: 400 })
    }

    await prisma.products.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
