import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { DayOfWeek } from "@prisma/client"

// Interval antar slot booking, dalam menit. Sesuaikan kalau bisnisnya butuh
// granularitas lain (mis. 15 menit).
const SLOT_INTERVAL_MINUTES = 30

// Index array ini mengikuti Date.getDay() (0 = Minggu, 1 = Senin, dst),
// dan nilainya harus sama persis dengan yang disimpan di BarberSchedule.dayOfWeek.
const DAY_NAMES: DayOfWeek[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
]

/**
 * Menghasilkan daftar slot waktu berformat "HH:mm" dari startTime sampai
 * sebelum endTime, dengan jarak antar slot sebesar intervalMinutes.
 */
function generateSlots(startTime: string, endTime: string, intervalMinutes: number): string[] {
  const slots: string[] = []
  const [startHour, startMinute] = startTime.split(":").map(Number)
  const [endHour, endMinute] = endTime.split(":").map(Number)

  let current = startHour * 60 + startMinute
  const end = endHour * 60 + endMinute

  while (current < end) {
    const hour = Math.floor(current / 60)
    const minute = current % 60
    slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)
    current += intervalMinutes
  }

  return slots
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const barberId = searchParams.get("barberId")
    const date = searchParams.get("date")

    if (!barberId || !date) {
      return NextResponse.json({ error: "barberId and date are required" }, { status: 400 })
    }

    const barber = await prisma.barber.findUnique({
      where: { id: barberId },
      select: { id: true },
    })

    if (!barber) {
      return NextResponse.json({ error: "Barber not found" }, { status: 404 })
    }

    const dateObj = new Date(date)
    const dayOfWeek = DAY_NAMES[dateObj.getDay()]

    // Ambil jadwal kerja barber pada hari tsb (bisa lebih dari satu jika
    // barber bekerja di beberapa cabang dengan jam berbeda di hari yang sama)
    const schedules = await prisma.barberSchedule.findMany({
      where: { barberId, dayOfWeek, isOff: false },
    })

    // Ambil booking yang sudah ada di tanggal tsb, kecuali yang dibatalkan
    // (PENDING tetap dianggap menahan slot supaya tidak double-book)
    const bookings = await prisma.booking.findMany({
      where: {
        barberId,
        appointmentDate: dateObj,
        status: { not: "CANCELLED" },
      },
      select: { startTime: true },
    })

    const bookedSlots = bookings.map((booking) => booking.startTime)

    const allSlots = schedules.flatMap((schedule) =>
      generateSlots(schedule.startTime, schedule.endTime, SLOT_INTERVAL_MINUTES),
    )
    const daySchedule = Array.from(new Set(allSlots)).sort()

    const availableSlots = daySchedule.filter((slot) => !bookedSlots.includes(slot))

    return NextResponse.json(
      {
        availableSlots,
        bookedSlots,
        totalSlots: daySchedule.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error checking availability:", error)
    return NextResponse.json({ error: "Failed to check availability" }, { status: 500 })
  }
}