import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      select: {
        id: true,
        location: true,
      },
    })

    return NextResponse.json({ offices }, { status: 200 })
  } catch (error) {
    console.error("Error fetching offices:", error)
    return NextResponse.json({ error: "Failed to fetch offices" }, { status: 500 })
  }
}
