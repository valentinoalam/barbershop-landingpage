import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const services = await prisma.services.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        time: true,
      },
    })

    return NextResponse.json({ services }, { status: 200 })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
