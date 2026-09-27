import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { BookingStatus } from "@prisma/client"

/**
 * Menambahkan sejumlah menit ke waktu berformat "HH:mm" dan
 * mengembalikan hasilnya dalam format yang sama.
 */
function addMinutesToTime(time: string, minutesToAdd: number): string {
  const [hours, minutes] = time.split(":").map(Number)
  const totalMinutes = hours * 60 + minutes + minutesToAdd
  const newHours = Math.floor(totalMinutes / 60) % 24
  const newMinutes = totalMinutes % 60
  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceId, barberId, officeId, appointmentDate, appointmentTime, customerInfo } = body

    if (!serviceId || !barberId || !officeId || !appointmentDate || !appointmentTime || !customerInfo) {
      return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 })
    }

    const email = customerInfo.email || `${customerInfo.phone}@temp.com`

    // 1. Cari atau buat User
    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: customerInfo.name.split(" ")[0] || customerInfo.name,
          lastName: customerInfo.name.split(" ").slice(1).join(" ") || "",
          email,
          phone: customerInfo.phone,
          admin: false,
          confirm: true,
        },
      })
    }

    // 2. Cari atau buat Customer yang terhubung ke User (relasi 1-1)
    let customer = await prisma.customer.findUnique({ where: { userId: user.id } })

    if (!customer) {
      customer = await prisma.customer.create({
        data: { userId: user.id },
      })
    }

    // 3. Ambil service untuk menghitung endTime dari durationMinutes
    const service = await prisma.service.findUnique({ where: { id: serviceId } })

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    const startTime = appointmentTime
    const endTime = addMinutesToTime(startTime, service.durationMinutes)
    const parsedDate = new Date(appointmentDate)

    // 4. Cek apakah slot masih tersedia untuk barber tersebut
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barberId,
        appointmentDate: parsedDate,
        startTime,
        status: { not: BookingStatus.CANCELLED },
      },
    })

    if (existingBooking) {
      return NextResponse.json({ error: "This time slot is no longer available" }, { status: 409 })
    }

    // 5. Buat booking
    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        serviceId,
        barberId,
        officeId,
        appointmentDate: parsedDate,
        startTime,
        endTime,
        status: BookingStatus.CONFIRMED,
        notes: customerInfo.notes || null,
      },
      include: {
        customer: { include: { user: true } },
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

    const bookings = await prisma.booking.findMany({
      where: {
        barberId,
        appointmentDate: new Date(date),
        status: { not: BookingStatus.CANCELLED },
      },
      select: {
        startTime: true,
        endTime: true,
        service: {
          select: {
            name: true,
            durationMinutes: true,
          },
        },
      },
    })

    const bookedSlots = bookings.map((booking) => booking.startTime)

    return NextResponse.json({ bookedSlots }, { status: 200 })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}