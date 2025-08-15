import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ offices })
  } catch (error) {
    console.error("Error fetching offices:", error)
    return NextResponse.json({ error: "Failed to fetch offices" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { location } = await request.json()

    if (!location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    const office = await prisma.office.create({
      data: {
        location,
      },
    })

    return NextResponse.json({ office }, { status: 201 })
  } catch (error) {
    console.error("Error creating office:", error)
    return NextResponse.json({ error: "Failed to create office" }, { status: 500 })
  }
}
