/**
 * Seed data mockup untuk sistem booking + retail barbershop.
 * Menggabungkan seed.ts (Category/Products/PayMethods/PurchaseOrder)
 * dan seed2.ts (Office/Barber/Schedule/Service/Booking), disesuaikan
 * dengan schema.prisma yang aktif — termasuk relasi User <-> Customer.
 *
 * Jalankan dengan: npx prisma db seed
 * (pastikan ada "prisma": { "seed": "ts-node seed.ts" } di package.json)
 */
import { PrismaClient, DayOfWeek, BookingStatus } from "@prisma/client"
import { PrismaLibSql } from '@prisma/adapter-libsql';
const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

// Masukkan adapter ke dalam PrismaClient
const adapter = new PrismaLibSql({
  url: dbUrl,
});
const prisma = new PrismaClient({ adapter });


async function main() {
  // ---------------------------------------------------------------------
  // 0. Bersihkan data lama (urutan mengikuti dependensi foreign key)
  // ---------------------------------------------------------------------
  await prisma.purchaseOrder.deleteMany({})
  await prisma.booking.deleteMany({})
  await prisma.barberSchedule.deleteMany({})
  await prisma.barberOffice.deleteMany({})
  await prisma.customer.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.barber.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.office.deleteMany({})
  await prisma.products.deleteMany({})
  await prisma.payMethods.deleteMany({})
  await prisma.category.deleteMany({})

  // ---------------------------------------------------------------------
  // 1. Categories & Products (retail)
  // ---------------------------------------------------------------------
  const classicCategory = await prisma.category.create({
    data: { description: "Classic Barbershop Products" },
  })

  const modernCategory = await prisma.category.create({
    data: { description: "Modern Styling Products" },
  })

  const [pomade, beardOil] = await Promise.all([
    prisma.products.create({
      data: {
        name: "Premium Hair Pomade",
        price: 25.99,
        description: "High-quality styling pomade for classic looks",
        stock: 50,
        available: true,
        favorite: true,
        categoryId: classicCategory.id,
      },
    }),
    prisma.products.create({
      data: {
        name: "Beard Oil",
        price: 18.99,
        description: "Nourishing beard oil for healthy facial hair",
        stock: 30,
        available: true,
        favorite: false,
        categoryId: modernCategory.id,
      },
    }),
  ])

  // ---------------------------------------------------------------------
  // 2. Payment methods
  // ---------------------------------------------------------------------
  const [cash, creditCard] = await Promise.all([
    prisma.payMethods.create({ data: { description: "Cash" } }),
    prisma.payMethods.create({ data: { description: "Credit Card" } }),
    prisma.payMethods.create({ data: { description: "Debit Card" } }),
  ])

  // ---------------------------------------------------------------------
  // 3. Offices
  // ---------------------------------------------------------------------
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

  // ---------------------------------------------------------------------
  // 4. Barbers
  // ---------------------------------------------------------------------
  const ethan = await prisma.barber.create({
    data: {
      name: "Ethan Carter",
      image: "/img/capster/ethan-carter-barber.png",
      specialty: "Classic Cuts & Fades",
      experienceYears: 8,
      bio: "Ethan is known for precise classic fades and old-school straight razor finishes.",
    },
  })

  const liam = await prisma.barber.create({
    data: {
      name: "Liam Harper",
      image: "/img/capster/liam-harper-barber-portrait.png",
      specialty: "Modern Styles & Beard Work",
      experienceYears: 6,
      bio: "Liam specializes in modern textured cuts and detailed beard sculpting.",
    },
  })

  const noah = await prisma.barber.create({
    data: {
      name: "Noah Bennett",
      image: "/img/capster/noah-bennett-barber.png",
      specialty: "Premium Shaves & Styling",
      experienceYears: 10,
      bio: "Noah brings a decade of experience in premium hot-towel shaves and styling.",
    },
  })

  // ---------------------------------------------------------------------
  // 5. Barber <-> Office assignments
  // ---------------------------------------------------------------------
  const barberOfficePairs = [
    { barberId: ethan.id, officeId: downtown.id },
    { barberId: liam.id, officeId: downtown.id },
    { barberId: liam.id, officeId: uptown.id },
    { barberId: noah.id, officeId: uptown.id },
  ]

  await prisma.barberOffice.createMany({ data: barberOfficePairs })

  // ---------------------------------------------------------------------
  // 6. Weekly schedules (Mon-Sat 09:00-17:00, Sunday off)
  // ---------------------------------------------------------------------
  const workDays: DayOfWeek[] = [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
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

  // ---------------------------------------------------------------------
  // 7. Services (price disimpan dalam sen -> 2500 = $25.00)
  // ---------------------------------------------------------------------
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

  // ---------------------------------------------------------------------
  // 8. Users & Customers
  //    (schema: nama/phone/email ada di User, Customer hanya userId+notes)
  // ---------------------------------------------------------------------
  const budiUser = await prisma.user.create({
    data: {
      name: "Budi",
      lastName: "Santoso",
      email: "budi@example.com",
      phone: "081234567890",
      confirm: true,
    },
  })

  const sariUser = await prisma.user.create({
    data: {
      name: "Sari",
      lastName: "Wulandari",
      email: "sari@example.com",
      phone: "081298765432",
      confirm: true,
    },
  })

  const budi = await prisma.customer.create({
    data: {
      userId: budiUser.id,
      notes: "Suka model fade pendek di samping.",
    },
  })

  const sari = await prisma.customer.create({
    data: {
      userId: sariUser.id,
    },
  })

  // ---------------------------------------------------------------------
  // 9. Sample bookings (besok, contoh data)
  // ---------------------------------------------------------------------
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

  // ---------------------------------------------------------------------
  // 10. Sample purchase orders (retail products)
  // ---------------------------------------------------------------------
  await prisma.purchaseOrder.createMany({
    data: [
      {
        customerId: budi.id,
        productId: pomade.id,
        payMethodId: cash.id,
        quantity: 1,
        amount: pomade.price,
      },
      {
        customerId: sari.id,
        productId: beardOil.id,
        payMethodId: creditCard.id,
        quantity: 2,
        amount: beardOil.price * 2,
      },
    ],
  })

  console.log("Database seeded successfully!")
  console.log({
    categories: 2,
    products: [pomade.name, beardOil.name],
    offices: [downtown.location, uptown.location],
    barbers: [ethan.name, liam.name, noah.name],
    services: [haircut.name, beardTrim.name, hotTowelShave.name, fullPackage.name],
    users: [`${budiUser.name} ${budiUser.lastName}`, `${sariUser.name} ${sariUser.lastName}`],
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