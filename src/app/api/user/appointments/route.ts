import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const appointments = await prisma.shift.findMany({
      where: {
        userId: userId,
      },
      include: {
        service: true,
        barber: true,
        office: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        appointmentDate: "desc",
      },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching user appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}
