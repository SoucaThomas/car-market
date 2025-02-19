/*
  Warnings:

  - You are about to drop the column `model` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `carModel` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "model",
ADD COLUMN     "carModel" TEXT NOT NULL,
ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "status" "ListingStatus" NOT NULL DEFAULT 'pending';
