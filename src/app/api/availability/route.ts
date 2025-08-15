import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const barberId = searchParams.get("barberId")
    const date = searchParams.get("date")

    if (!barberId || !date) {
      return NextResponse.json({ error: "barberId and date are required" }, { status: 400 })
    }

    // Get all bookings for this barber on this date
    const bookings = await prisma.shift.findMany({
      where: {
        barberId,
        appointmentDate: new Date(date),
        status: "confirmed",
      },
      select: {
        appointmentTime: true,
      },
    })

    const bookedSlots = bookings.map((booking) => booking.appointmentTime)

    // Define barber schedules (this could be moved to database later)
    const barberSchedules: Record<string, Record<string, string[]>> = {
      ethan: {
        monday: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"],
        tuesday: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"],
        wednesday: [
          "9:00 AM",
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
        ],
        thursday: [
          "9:00 AM",
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
        ],
        friday: [
          "9:00 AM",
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
        ],
        saturday: ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
        sunday: [],
      },
      liam: {
        monday: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
        tuesday: [
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
        ],
        wednesday: [],
        thursday: [
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "2:00 PM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
        ],
        friday: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
        saturday: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM"],
        sunday: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"],
      },
      noah: {
        monday: ["9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
        tuesday: [
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
        ],
        wednesday: [
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
        ],
        thursday: [
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "2:30 PM",
          "3:00 PM",
          "3:30 PM",
          "4:00 PM",
        ],
        friday: ["9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
        saturday: [],
        sunday: [],
      },
    }

    // Get barber info to determine schedule
    const barber = await prisma.barber.findUnique({
      where: { id: barberId },
      select: { name: true },
    })

    if (!barber) {
      return NextResponse.json({ error: "Barber not found" }, { status: 404 })
    }

    // Get day of week
    const dateObj = new Date(date)
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()

    // Get barber's schedule for this day (using first name in lowercase)
    const barberKey = barber.name.split(" ")[0].toLowerCase()
    const daySchedule = barberSchedules[barberKey]?.[dayName] || []

    // Filter out booked slots
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
