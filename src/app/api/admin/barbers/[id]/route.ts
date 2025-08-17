import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Destructure the id from the context.params object here.
    const resolvedParams = context.params;
    const id = resolvedParams.id;
    const { name, image } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const barber = await prisma.barber.update({
      where: { id },
      data: {
        name,
        image: image || null,
      },
    })

    return NextResponse.json({ barber })
  } catch (error) {
    console.error("Error updating barber:", error)
    return NextResponse.json({ error: "Failed to update barber" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Check if barber has any bookings
    const bookingCount = await prisma.shift.count({
      where: { barberId: id },
    })

    if (bookingCount > 0) {
      return NextResponse.json({ error: "Cannot delete barber with existing bookings" }, { status: 400 })
    }

    await prisma.barber.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Barber deleted successfully" })
  } catch (error) {
    console.error("Error deleting barber:", error)
    return NextResponse.json({ error: "Failed to delete barber" }, { status: 500 })
  }
}
