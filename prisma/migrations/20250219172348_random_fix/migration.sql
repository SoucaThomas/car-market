/*
  Warnings:

  - You are about to drop the column `transmission` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleType` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `country` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engineSize` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `milage` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "transmission",
DROP COLUMN "vehicleType",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "engineSize" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "milage" DOUBLE PRECISION NOT NULL;
