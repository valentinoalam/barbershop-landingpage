import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { location } = await request.json()
    

    if (!location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    const office = await prisma.office.update({
      where: { id },
      data: {
        location,
      },
    })

    return NextResponse.json({ office })
  } catch (error) {
    console.error("Error updating office:", error)
    return NextResponse.json({ error: "Failed to update office" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if office has any bookings
    const bookingCount = await prisma.shift.count({
      where: { officeId: id },
    })

    if (bookingCount > 0) {
      return NextResponse.json({ error: "Cannot delete office with existing bookings" }, { status: 400 })
    }

    await prisma.office.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Office deleted successfully" })
  } catch (error) {
    console.error("Error deleting office:", error)
    return NextResponse.json({ error: "Failed to delete office" }, { status: 500 })
  }
}
