/*
  Warnings:

  - You are about to drop the column `listedCars` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `ratedCars` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "listedCars",
DROP COLUMN "ratedCars";
