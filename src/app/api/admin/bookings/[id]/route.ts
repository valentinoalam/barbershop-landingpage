import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { status } = body

    if (!["confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updatedBooking = await prisma.shift.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            name: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },
        service: {
          select: {
            name: true,
            price: true,
            time: true,
          },
        },
        barber: {
          select: {
            name: true,
            image: true,
          },
        },
        office: {
          select: {
            location: true,
          },
        },
      },
    })

    return NextResponse.json({ booking: updatedBooking }, { status: 200 })
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.shift.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting booking:", error)
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 })
  }
}
