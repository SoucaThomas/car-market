"use server";

import { prisma } from "@/prisma/prisma";
import { z } from "zod";
import { auth, User } from "@/auth";
import { headers } from "next/headers";
import type { Listing, Upload } from "@prisma/client";
import { formSchema } from "@/constants";

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
      label:
        (item.model_name ?? "").charAt(0).toUpperCase() +
        (item.model_name ?? "").slice(1),
    };
  });
  return response;
};

const listingSchema = z.object({
  carBrand: z.string(),
  carModel: z.string(),
  condition: z.string(),
  year: z.number(),
  title: z.string(),
  price: z.number(),
  engineSize: z.number(),
  country: z.string(),
  fuelType: z.string(),
  mileage: z.number(),
  color: z.string(),
  description: z.string(),
  files: z.any(),
});

export const createCarListing = async (
  listingData: z.infer<typeof listingSchema>
): Promise<void> => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Promise.reject("User not authenticated");
  }

  try {
    const data = listingSchema.parse(listingData);
    await prisma.listing.create({
      data: {
        userId: session.user.id,
        carBrand: data.carBrand,
        carModel: data.carModel,
        year: data.year,
        title: data.title,
        price: data.price,
        engineSize: data.engineSize,
        mileage: data.mileage,
        country: data.country,
        fuelType: data.fuelType,
        color: data.color,
        description: data.description,
        condition: data.condition,
        drive: "FWD", //! Hardcoded TODO FIX
        createdAt: new Date(),
        images: {
          create: data.files.map((file: Upload) => ({
            url: file.url,
            key: file.key,
            name: file.name,
            type: file.type,
            size: file.size,
            userId: session.user.id,
          })),
        },
      },
    });
    return Promise.resolve();
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
};

export const getUserListings = async (
  user: User
): Promise<
  {
    id: number;
    title: string;
    status: string;
    price: number;
  }[]
> => {
  const result = await prisma.listing.findMany({
    where: { userId: user.id.toString() },
    select: {
      id: true,
      title: true,
      status: true,
      price: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return result.map((item) => ({
    id: item.id,
    title: item.title || "Untitled",
    status: item.status.toString(),
    price: item.price || 0,
  }));
};

export const getHomeListings = async (): Promise<
  (Listing & { images: Upload[] })[]
> => {
  const result = await prisma.listing.findMany({
    where: { status: "approved" },
    orderBy: { createdAt: "asc" },
    include: {
      images: true,
    },
  });

  console.log(result);

  return result;
};

export const createListing = async (
  data: z.infer<typeof formSchema>
): Promise<Listing> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Promise.reject("User not authenticated");
    }

    const listing = await prisma.listing.create({
      data: {
        title: data.listingTitle,
        condition: data.carCondtition,
        carBrand: data.brand,
        carModel: data.model,
        year: data.year,
        price: data.price,
        country: data.country,
        engineSize: data.engineSize,
        mileage: data.mileage,
        drive: data.drive,
        fuelType: data.fuelType,
        color: data.color,
        description: data.description,
        userId: session.user.id,
        images: {},
      },
    });

    const files = data.Pictures;

    for (const file of files) {
      await prisma.upload.update({
        where: {
          key: file.key,
        },
        data: {
          listingId: listing.id,
        },
      });
    }

    return Promise.resolve(listing);
  } catch (error) {
    return Promise.reject(error);
  }
};
