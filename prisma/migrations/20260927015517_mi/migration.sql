/*
  Warnings:

  - You are about to drop the `shifts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `created_at` on the `barbers` table. All the data in the column will be lost.
  - You are about to drop the column `shift` on the `barbers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `barbers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `offices` table. All the data in the column will be lost.
  - You are about to drop the column `shift` on the `offices` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `offices` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `services` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `services` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - Added the required column `updatedAt` to the `barbers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `offices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationMinutes` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "shifts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "barber_offices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barberId" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    CONSTRAINT "barber_offices_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "barbers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "barber_offices_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "barber_schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barberId" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isOff" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "barber_schedules_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "barbers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "barber_schedules_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "barberId" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "appointmentDate" DATETIME NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "bookings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "barbers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_barbers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "specialty" TEXT,
    "experienceYears" INTEGER,
    "bio" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_barbers" ("id", "image", "name") SELECT "id", "image", "name" FROM "barbers";
DROP TABLE "barbers";
ALTER TABLE "new_barbers" RENAME TO "barbers";
CREATE TABLE "new_offices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "location" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_offices" ("id", "location") SELECT "id", "location" FROM "offices";
DROP TABLE "offices";
ALTER TABLE "new_offices" RENAME TO "offices";
CREATE TABLE "new_purchase_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "prod_id" TEXT NOT NULL,
    "pm_id" TEXT NOT NULL,
    "quant_prod" INTEGER NOT NULL,
    "ammount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "purchase_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "purchase_orders_prod_id_fkey" FOREIGN KEY ("prod_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "purchase_orders_pm_id_fkey" FOREIGN KEY ("pm_id") REFERENCES "pay_methods" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_purchase_orders" ("ammount", "created_at", "id", "pm_id", "prod_id", "quant_prod", "updated_at", "user_id") SELECT "ammount", "created_at", "id", "pm_id", "prod_id", "quant_prod", "updated_at", "user_id" FROM "purchase_orders";
DROP TABLE "purchase_orders";
ALTER TABLE "new_purchase_orders" RENAME TO "purchase_orders";
CREATE TABLE "new_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_services" ("description", "id", "name", "price") SELECT "description", "id", "name", "price" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "barber_offices_barberId_officeId_key" ON "barber_offices"("barberId", "officeId");

-- CreateIndex
CREATE UNIQUE INDEX "barber_schedules_barberId_officeId_dayOfWeek_key" ON "barber_schedules"("barberId", "officeId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "customers_userId_key" ON "customers"("userId");

-- CreateIndex
CREATE INDEX "bookings_barberId_appointmentDate_idx" ON "bookings"("barberId", "appointmentDate");

-- CreateIndex
CREATE INDEX "bookings_officeId_appointmentDate_idx" ON "bookings"("officeId", "appointmentDate");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_barberId_appointmentDate_startTime_key" ON "bookings"("barberId", "appointmentDate", "startTime");
