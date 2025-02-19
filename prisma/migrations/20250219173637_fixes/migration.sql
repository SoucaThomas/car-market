/*
  Warnings:

  - You are about to drop the column `milage` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "milage",
ALTER COLUMN "year" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "mileage" DROP NOT NULL,
ALTER COLUMN "mileage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "drive" DROP NOT NULL,
ALTER COLUMN "fuelType" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "carBrand" DROP NOT NULL,
ALTER COLUMN "carModel" DROP NOT NULL,
ALTER COLUMN "condition" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "engineSize" DROP NOT NULL;
