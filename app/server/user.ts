'use server';

import { User } from '@/auth';
import { prisma } from '@/prisma/prisma';
import { ListingStatus } from '@prisma/client';

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
    orderBy: { createdAt: 'asc' },
  });

  return result.map((item) => ({
    id: item.id,
    title: item.title || 'Untitled',
    status: item.status.toString(),
    price: item.price || 0,
  }));
};

export const getUserListingCount = async (user: User): Promise<number> => {
  const reuslt = await prisma.listing.findMany({
    where: {
      userId: user.id.toString(),
      status: ListingStatus.approved,
    },
  });

  return reuslt.length;
};
