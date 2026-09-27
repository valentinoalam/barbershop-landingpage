/**
 * Seed data mockup untuk sistem booking barbershop.
 * Jalankan dengan: npx prisma db seed
 * (tambahkan "prisma": { "seed": "ts-node seed.ts" } di package.json)
 */
import { PrismaClient, DayOfWeek, BookingStatus } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // -------------------------------------------------------------------------
  // 1. Offices
  // -------------------------------------------------------------------------
  const downtown = await prisma.office.create({
    data: {
      location: "Downtown Branch",
      address: "123 Main Street, Jakarta Pusat",
      phone: "(021) 555-0101",
    },
  })

  const uptown = await prisma.office.create({
    data: {
      location: "Uptown Branch",
      address: "88 Sudirman Avenue, Jakarta Selatan",
      phone: "(021) 555-0202",
    },
  })

  // -------------------------------------------------------------------------
  // 2. Barbers
  // -------------------------------------------------------------------------
  const ethan = await prisma.barber.create({
    data: {
      name: "Ethan Carter",
      image: "/barbers/ethan-carter.jpg",
      specialty: "Classic Cuts & Fades",
      experienceYears: 8,
      bio: "Ethan is known for precise classic fades and old-school straight razor finishes.",
    },
  })

  const liam = await prisma.barber.create({
    data: {
      name: "Liam Harper",
      image: "/barbers/liam-harper.jpg",
      specialty: "Modern Styles & Beard Work",
      experienceYears: 6,
      bio: "Liam specializes in modern textured cuts and detailed beard sculpting.",
    },
  })

  const noah = await prisma.barber.create({
    data: {
      name: "Noah Bennett",
      image: "/barbers/noah-bennett.jpg",
      specialty: "Premium Shaves & Styling",
      experienceYears: 10,
      bio: "Noah brings a decade of experience in premium hot-towel shaves and styling.",
    },
  })

  // -------------------------------------------------------------------------
  // 3. Barber <-> Office assignments
  // -------------------------------------------------------------------------
  await prisma.barberOffice.createMany({
    data: [
      { barberId: ethan.id, officeId: downtown.id },
      { barberId: liam.id, officeId: downtown.id },
      { barberId: liam.id, officeId: uptown.id },
      { barberId: noah.id, officeId: uptown.id },
    ],
  })

  // -------------------------------------------------------------------------
  // 4. Weekly schedules (Mon-Sat 09:00-17:00, Sunday off)
  // -------------------------------------------------------------------------
  const workDays: DayOfWeek[] = [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
  ]

  const barberOfficePairs = [
    { barberId: ethan.id, officeId: downtown.id },
    { barberId: liam.id, officeId: downtown.id },
    { barberId: liam.id, officeId: uptown.id },
    { barberId: noah.id, officeId: uptown.id },
  ]

  for (const pair of barberOfficePairs) {
    for (const day of workDays) {
      await prisma.barberSchedule.create({
        data: {
          barberId: pair.barberId,
          officeId: pair.officeId,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "17:00",
          isOff: false,
        },
      })
    }
    await prisma.barberSchedule.create({
      data: {
        barberId: pair.barberId,
        officeId: pair.officeId,
        dayOfWeek: DayOfWeek.SUNDAY,
        startTime: "00:00",
        endTime: "00:00",
        isOff: true,
      },
    })
  }

  // -------------------------------------------------------------------------
  // 5. Services (price disimpan dalam sen -> 2500 = $25.00)
  // -------------------------------------------------------------------------
  const [haircut, beardTrim, hotTowelShave, fullPackage] = await Promise.all([
    prisma.service.create({
      data: {
        name: "Classic Haircut",
        description: "Precision haircut tailored to your style, includes wash and finish.",
        price: 2500,
        durationMinutes: 30,
      },
    }),
    prisma.service.create({
      data: {
        name: "Beard Trim",
        description: "Shape and trim to keep your beard sharp and well-defined.",
        price: 1500,
        durationMinutes: 20,
      },
    }),
    prisma.service.create({
      data: {
        name: "Hot Towel Shave",
        description: "Traditional straight razor shave with hot towel treatment.",
        price: 3000,
        durationMinutes: 40,
      },
    }),
    prisma.service.create({
      data: {
        name: "Full Package",
        description: "Haircut, beard trim, and hot towel shave combined.",
        price: 6000,
        durationMinutes: 75,
      },
    }),
  ])

  // -------------------------------------------------------------------------
  // 6. Customers
  // -------------------------------------------------------------------------
  const [budi, sari] = await Promise.all([
    prisma.customer.create({
      data: { name: "Budi Santoso", phone: "081234567890", email: "budi@example.com" },
    }),
    prisma.customer.create({
      data: { name: "Sari Wulandari", phone: "081298765432", email: "sari@example.com" },
    }),
  ])

  // -------------------------------------------------------------------------
  // 7. Sample bookings (2 hari ke depan, contoh data)
  // -------------------------------------------------------------------------
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  await prisma.booking.createMany({
    data: [
      {
        customerId: budi.id,
        serviceId: haircut.id,
        barberId: ethan.id,
        officeId: downtown.id,
        appointmentDate: tomorrow,
        startTime: "10:00",
        endTime: "10:30",
        status: BookingStatus.CONFIRMED,
        notes: "Suka model fade pendek di samping.",
      },
      {
        customerId: sari.id,
        serviceId: fullPackage.id,
        barberId: noah.id,
        officeId: uptown.id,
        appointmentDate: tomorrow,
        startTime: "13:00",
        endTime: "14:15",
        status: BookingStatus.PENDING,
      },
    ],
  })

  console.log("Seed selesai:")
  console.log({
    offices: [downtown.location, uptown.location],
    barbers: [ethan.name, liam.name, noah.name],
    services: [haircut.name, beardTrim.name, hotTowelShave.name, fullPackage.name],
    customers: [budi.name, sari.name],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })