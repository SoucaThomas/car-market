'use server';

import { prisma } from '@/prisma/prisma';
import { formSchema, listingSchema, ListingWithUserAndImages, searchParams } from '../shared/types';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { z } from 'zod';
import { Listing, Upload, User } from '@prisma/client';

export const getCarBrands = async (): Promise<{ id: number; label: string }[]> => {
  const result = await prisma.makes.findMany({ orderBy: { make_name: 'asc' } });
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
    orderBy: { model_name: 'asc' },
    distinct: ['model_name'],
  });
  const response = result.map((item) => {
    return {
      id: item.car_model_id,
      label: (item.model_name ?? '').charAt(0).toUpperCase() + (item.model_name ?? '').slice(1),
    };
  });
  return response;
};

export const createCarListing = async (
  listingData: z.infer<typeof listingSchema>
): Promise<void> => {
  'use server';
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Promise.reject('User not authenticated');
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
        drive: 'FWD', //! Hardcoded TODO FIX
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

export const getHomeListings = async (
  params: searchParams
): Promise<ListingWithUserAndImages[] | Error> => {
  try {
    const result = await prisma.listing.findMany({
      where: {
        status: 'approved',
        OR: [
          { title: { contains: params.search || '', mode: 'insensitive' } },
          { carBrand: { contains: params.search || '', mode: 'insensitive' } },
          { carModel: { contains: params.search || '', mode: 'insensitive' } },
          {
            description: { contains: params.search || '', mode: 'insensitive' },
          },
        ],
        AND: [
          params.carBrand ? { carBrand: params.carBrand } : {},
          params.carModel ? { carModel: params.carModel } : {},
          params.priceFrom ? { price: { gte: Number(params.priceFrom) } } : {},
          params.priceTo ? { price: { lte: Number(params.priceTo) } } : {},
          params.yearFrom ? { year: { gte: Number(params.yearFrom) } } : {},
          params.yearTo ? { year: { lte: Number(params.yearTo) } } : {},
          params.engineFrom ? { engineSize: { gte: Number(params.engineFrom) } } : {},
          params.engineTo ? { engineSize: { lte: Number(params.engineTo) } } : {},
          params.country ? { country: params.country } : {},
          params.fuelType ? { fuelType: params.fuelType } : {},
          params.mileageFrom ? { mileage: { gte: Number(params.mileageFrom) } } : {},
          params.mileageTo ? { mileage: { lte: Number(params.mileageTo) } } : {},
          params.color ? { color: params.color } : {},
        ],
      },
      orderBy: params.sort ? [{ [params.sort]: 'asc' }] : [],
      include: {
        images: true,
        user: true,
      },
    });

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createListing = async (data: z.infer<typeof formSchema>): Promise<Listing> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Promise.reject('User not authenticated');
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
      include: {
        user: true,
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

export const getListing = async (
  id: string
): Promise<Listing & { user: User; images: Upload[] }> => {
  const listing = await prisma.listing.findUnique({
    where: { id: parseInt(id) },
    include: {
      images: true,
      user: true,
    },
  });

  if (!listing) {
    return Promise.reject();
  }

  return Promise.resolve(listing);
};
