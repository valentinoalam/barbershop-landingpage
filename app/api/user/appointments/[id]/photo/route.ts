import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: appointmentId } = await params
    const formData = await request.formData()
    const photo = formData.get("photo") as File

    if (!photo) {
      return NextResponse.json({ error: "No photo provided" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Upload the photo to a storage service (AWS S3, Cloudinary, etc.)
    // 2. Get the URL of the uploaded photo
    // 3. Update the appointment record with the photo URL

    // For now, we'll simulate this process
    const photoUrl = `https://example.com/photos/${appointmentId}-${Date.now()}.jpg`

    const updatedAppointment = await prisma.shift.update({
      where: { id: appointmentId },
      data: {
        // Add a photoUrl field to your Shift model in schema.prisma
        // photoUrl: photoUrl
      },
      include: {
        service: true,
        barber: true,
        office: true,
      },
    })

    return NextResponse.json({
      message: "Photo uploaded successfully",
      photoUrl,
      appointment: updatedAppointment,
    })
  } catch (error) {
    console.error("Error uploading photo:", error)
    return NextResponse.json({ error: "Failed to upload photo" }, { status: 500 })
  }
}
