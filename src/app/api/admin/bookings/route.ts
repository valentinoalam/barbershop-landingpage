import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface Where {appointmentDate:{gte:Date;lt:Date};status: string; barberId: string} 
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const status = searchParams.get("status")
    const barberId = searchParams.get("barberId")

    const where: Where= {} as Where

    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)

      where.appointmentDate = {
        gte: startDate,
        lt: endDate,
      }
    }

    if (status && status !== "all") {
      where.status = status
    }

    if (barberId && barberId !== "all") {
      where.barberId = barberId
    }

    const bookings = await prisma.shift.findMany({
      where,
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
      orderBy: [{ appointmentDate: "asc" }, { appointmentTime: "asc" }],
    })

    return NextResponse.json({ bookings }, { status: 200 })
  } catch (error) {
    console.error("Error fetching admin bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
