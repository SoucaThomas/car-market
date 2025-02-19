/*
  Warnings:

  - You are about to drop the `CarMakes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarModels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarModels" DROP CONSTRAINT "CarModels_makeId_fkey";

-- DropTable
DROP TABLE "CarMakes";

-- DropTable
DROP TABLE "CarModels";

-- CreateTable
CREATE TABLE "car_models" (
    "car_model_id" SERIAL NOT NULL,
    "make_id" INTEGER NOT NULL,
    "make_name" TEXT NOT NULL,
    "model_name" TEXT,
    "transmission_type" TEXT,
    "vehicle_type" TEXT,
    "drive" TEXT,
    "fuel_type" TEXT,

    CONSTRAINT "car_models_pkey" PRIMARY KEY ("car_model_id")
);

-- CreateTable
CREATE TABLE "makes" (
    "make_id" SERIAL NOT NULL,
    "make_name" TEXT NOT NULL,

    CONSTRAINT "makes_pkey" PRIMARY KEY ("make_id")
);
