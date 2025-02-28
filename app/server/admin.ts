import { prisma } from "@/prisma/prisma";

export const getAdminPendingListings = async () => {
  const listings = await prisma.listing.findMany({
    where: {
      status: "pending",
    },
    include: {
      user: true,
    },
  });

  return listings;
};

export const getAdminUsers = async () => {
  const users = await prisma.user.findMany({});

  return users;
};
