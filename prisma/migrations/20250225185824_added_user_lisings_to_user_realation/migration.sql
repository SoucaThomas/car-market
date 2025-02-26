/*
  Warnings:

  - Added the required column `listedCars` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratedCars` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "listedCars" INTEGER NOT NULL,
ADD COLUMN     "ratedCars" INTEGER NOT NULL;
