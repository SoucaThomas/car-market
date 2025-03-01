"use server";

import { prisma } from "@/prisma/prisma";
import { ListingStatus, Role } from "@prisma/client";
import { ListingWithUser } from "../shared/types";
import { auth } from "@/auth";
import { headers } from "next/headers";

const checkAdmin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || session.user.role !== Role.admin) {
    return new Error("Unauthorized");
  }
};

export const getAdminListings = async () => {
  checkAdmin();

  const listings = await prisma.listing.findMany({
    include: {
      user: true,
    },
  });

  return Promise.resolve(listings);
};

export const getAdminUsers = async () => {
  checkAdmin();

  const users = await prisma.user.findMany({});

  return users;
};

export const adminRespondToListing = async (
  id: number,
  status: ListingStatus,
  pending?: boolean
): Promise<ListingWithUser[] | Error> => {
  checkAdmin();
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
