import { Listing, Upload, User } from "@prisma/client";

export type ListingWithUser = Listing & { user: User };

export type ListingWithUserAndImages = Listing & {
  user: User;
  images: Upload[];
};

export type DealerInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
  listings: ListingWithUserAndImages[];
  createdAt: string;
  ratings: number;
  location: string;
} | null;

import { z } from "zod";

export const formSchema = z.object({
  listingTitle: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." }),
  carCondtition: z
    .string()
    .min(1, { message: "Car condtion must be selected." }),
  brand: z.string().min(1, { message: "Brand must be selected." }),
  model: z.string().min(1, { message: "Model must be selected." }),
  year: z.number().min(1900).max(new Date().getFullYear()),
  price: z.number().min(0).min(1, { message: "Price must be set." }),
  mileage: z.number().min(0),
  drive: z.string().min(1, { message: "Drive must be selected." }),
  country: z.string().min(1, { message: "Country must be selected." }),
  engineSize: z.number().min(0),
  fuelType: z.string().min(1, { message: "Fuel type must be selected." }),
  color: z.string().min(1, { message: "Color must be selected." }),
  description: z.string().min(10),
  Pictures: z.array(
    z.object({
      url: z.string(),
      key: z.string(),
      name: z.string(),
      type: z.string(),
      size: z.number(),
      ufsUrl: z.string(),
    }),
    { message: "At least one picture must be uploaded." }
  ),
});

export const listingSchema = z.object({
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

export interface searchParams {
  search?: string;
  sort?: "price" | "mileage" | "year";
  carType?: number;
  carBrand?: string;
  carModel?: string;
  priceFrom?: number;
  priceTo?: number;
  yearFrom?: number;
  yearTo?: number;
  engineFrom?: number;
  engineTo?: number;
  country?: string;
  fuelType?: string;
  mileageFrom?: number;
  mileageTo?: number;
  color?: string;
  drive?: string;
  condition?: string;
}
