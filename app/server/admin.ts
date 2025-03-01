"use server";

import { prisma } from "@/prisma/prisma";
import { ListingStatus } from "@prisma/client";
import { ListingWithUser } from "../shared/types";

export const getAdminListings = async () => {
  const listings = await prisma.listing.findMany({
    include: {
      user: true,
    },
  });

  return Promise.resolve(listings);
};

export const getAdminUsers = async () => {
  const users = await prisma.user.findMany({});

  return users;
};

export const adminRespondToListing = async (
  id: number,
  status: ListingStatus,
  pending?: boolean
): Promise<ListingWithUser[] | Error> => {
  try {
    await prisma.listing.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

    const listings = await prisma.listing.findMany({
      where: pending ? { status: "pending" } : {},
      include: {
        user: true,
      },
    });

    return Promise.resolve(listings);
  } catch (error) {
    return Promise.reject(error);
  }
};
