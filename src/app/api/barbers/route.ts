import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const barbers = await prisma.barber.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
    })

    return NextResponse.json({ barbers }, { status: 200 })
  } catch (error) {
    console.error("Error fetching barbers:", error)
    return NextResponse.json({ error: "Failed to fetch barbers" }, { status: 500 })
  }
}
