import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const classicCategory = await prisma.category.create({
    data: {
      description: "Classic Barbershop Services",
    },
  })

  const modernCategory = await prisma.category.create({
    data: {
      description: "Modern Styling Services",
    },
  })

  const services = await Promise.all([
    prisma.services.create({
      data: {
        name: "Classic Cut",
        description: "Traditional haircut with scissors and clippers",
        price: 35,
        time: 45,
      },
    }),
    prisma.services.create({
      data: {
        name: "Modern Fade",
        description: "Contemporary fade cut with styling",
        price: 40,
        time: 60,
      },
    }),
    prisma.services.create({
      data: {
        name: "Beard Trim & Style",
        description: "Professional beard trimming and styling",
        price: 25,
        time: 30,
      },
    }),
    prisma.services.create({
      data: {
        name: "Complete Package",
        description: "Full service including cut, beard, and styling",
        price: 65,
        time: 90,
      },
    }),
  ])

  const offices = await Promise.all([
    prisma.office.create({
      data: {
        location: "123 Main St, Downtown",
      },
    }),
    prisma.office.create({
      data: {
        location: "456 Oak Ave, Uptown",
      },
    }),
    prisma.office.create({
      data: {
        location: "789 Pine St, Westside",
      },
    }),
    prisma.office.create({
      data: {
        location: "321 Elm Dr, Eastside",
      },
    }),
  ])

  const barbers = await Promise.all([
    prisma.barber.create({
      data: {
        name: "Ethan Carter",
        image: "/ethan-carter-barber.png",
      },
    }),
    prisma.barber.create({
      data: {
        name: "Liam Harper",
        image: "/liam-harper-barber-portrait.png",
      },
    }),
    prisma.barber.create({
      data: {
        name: "Noah Bennett",
        image: "/noah-bennett-barber.png",
      },
    }),
  ])

  const payMethods = await Promise.all([
    prisma.payMethods.create({
      data: {
        description: "Cash",
      },
    }),
    prisma.payMethods.create({
      data: {
        description: "Credit Card",
      },
    }),
    prisma.payMethods.create({
      data: {
        description: "Debit Card",
      },
    }),
  ])

  const products = await Promise.all([
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

  console.log("Database seeded successfully!")
  console.log("Created:", {
    services: services.length,
    offices: offices.length,
    barbers: barbers.length,
    payMethods: payMethods.length,
    products: products.length,
    categories: 2,
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
