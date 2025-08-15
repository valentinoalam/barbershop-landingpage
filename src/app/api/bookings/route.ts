import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, serviceId, barberId, officeId, appointmentDate, appointmentTime, customerInfo } = body

    // First, create or find the user
    let user = await prisma.user.findUnique({
      where: { email: customerInfo.email || `${customerInfo.phone}@temp.com` },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: customerInfo.name.split(" ")[0] || customerInfo.name,
          lastName: customerInfo.name.split(" ").slice(1).join(" ") || "",
          email: customerInfo.email || `${customerInfo.phone}@temp.com`,
          phone: customerInfo.phone,
          admin: false,
          confirm: true,
        },
      })
    }

    // Check if the time slot is still available
    const existingBooking = await prisma.shift.findFirst({
      where: {
        barberId,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        status: "confirmed",
      },
    })

    if (existingBooking) {
      return NextResponse.json({ error: "This time slot is no longer available" }, { status: 409 })
    }

    // Create the booking
    const booking = await prisma.shift.create({
      data: {
        userId: user.id,
        serviceId,
        barberId,
        officeId,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        status: "confirmed",
        notes: customerInfo.notes || null,
      },
      include: {
        user: true,
        service: true,
        barber: true,
        office: true,
      },
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const barberId = searchParams.get("barberId")
    const date = searchParams.get("date")

    if (!barberId || !date) {
      return NextResponse.json({ error: "barberId and date are required" }, { status: 400 })
    }

    const bookings = await prisma.shift.findMany({
      where: {
        barberId,
        appointmentDate: new Date(date),
        status: "confirmed",
      },
      select: {
        appointmentTime: true,
        service: {
          select: {
            name: true,
            time: true,
          },
        },
      },
    })

    const bookedSlots = bookings.map((booking) => booking.appointmentTime)

    return NextResponse.json({ bookedSlots }, { status: 200 })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
