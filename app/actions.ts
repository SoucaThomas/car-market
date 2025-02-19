"use server";

import { prisma } from "@/prisma/prisma";

export const getCarBrands = async (): Promise<
  { id: number; label: string }[]
> => {
  const result = await prisma.makes.findMany({ orderBy: { make_name: "asc" } });
  const response = result.map((item) => {
    return {
      id: item.make_id,
      label: item.make_name.charAt(0).toUpperCase() + item.make_name.slice(1),
    };
  });
  return response;
};

export const getCarModels = async (carBrand: {
  id: number;
  label: string;
}): Promise<{ id: number; label: string }[]> => {
  if (!carBrand) return [];

  const result = await prisma.cars.findMany({
    where: { make_id: carBrand.id },
    orderBy: { model_name: "asc" },
    distinct: ["model_name"],
  });
  const response = result.map((item) => {
    return {
      id: item.car_model_id,
      label: item.model_name.charAt(0).toUpperCase() + item.model_name.slice(1),
    };
  });
  return response;
};
