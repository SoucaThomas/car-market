-- CreateTable
CREATE TABLE "CarMakes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarMakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModels" (
    "id" SERIAL NOT NULL,
    "makeId" INTEGER NOT NULL,
    "makeName" VARCHAR(255) NOT NULL,
    "modelName" VARCHAR(255) NOT NULL,
    "transmissionType" VARCHAR(255),
    "vehicleType" VARCHAR(255),
    "drive" VARCHAR(255),
    "fuelType" VARCHAR(255),

    CONSTRAINT "CarModels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarModels" ADD CONSTRAINT "CarModels_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "CarMakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
