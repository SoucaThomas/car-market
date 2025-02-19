/*
  Warnings:

  - You are about to drop the column `make` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `carBrand` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "make",
ADD COLUMN     "carBrand" TEXT NOT NULL;
