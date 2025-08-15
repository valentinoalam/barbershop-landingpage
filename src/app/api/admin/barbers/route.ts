import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const barbers = await prisma.barber.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ barbers })
  } catch (error) {
    console.error("Error fetching barbers:", error)
    return NextResponse.json({ error: "Failed to fetch barbers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, image } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const barber = await prisma.barber.create({
      data: {
        name,
        image: image || null,
      },
    })

    return NextResponse.json({ barber }, { status: 201 })
  } catch (error) {
    console.error("Error creating barber:", error)
    return NextResponse.json({ error: "Failed to create barber" }, { status: 500 })
  }
}
