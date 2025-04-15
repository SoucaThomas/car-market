'use server';

import { prisma } from '@/prisma/prisma';
import {
  ApplicationStatus,
  DealerApplications,
  ListingStatus,
  Role,
  User,
  RatingStatus,
  Rating,
} from '@prisma/client';
import { ListingWithUser } from '../shared/types';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { UserDetails } from '../shared/types';

const checkAdmin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user || session.user.role !== Role.admin) {
    return new Error('Unauthorized');
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

export const getAdminDealerApplications = async () => {
  checkAdmin();

  const applications = await prisma.dealerApplications.findMany({});

  return applications;
};

export const adminChangeStatus = async (
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
      where: pending ? { status: 'pending' } : {},
      include: {
        user: true,
      },
    });

    return Promise.resolve(listings);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminChangeRole = async (id: string, role: Role): Promise<User[] | Error> => {
  checkAdmin();

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });

    const users = await prisma.user.findMany({});

    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminChangeStatusDealershipApplication = async (
  id: number,
  action: ApplicationStatus
): Promise<DealerApplications[] | Error> => {
  checkAdmin();

  try {
    await prisma.dealerApplications.update({
      where: {
        id: id,
      },
      data: {
        status: action,
      },
    });

    const applications = await getAdminDealerApplications();
    return Promise.resolve(applications);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminToggleUserStatus = async (id: string): Promise<User[] | Error> => {
  checkAdmin();

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return Promise.reject(new Error('User not found'));
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: !user.isActive,
      },
    });

    const users = await prisma.user.findMany({});

    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(error);
  }
};

export async function adminChangeRatingStatus(
  id: number,
  action: RatingStatus
): Promise<Rating[] | Error> {
  'use server';
  try {
    const rating = await prisma.rating.update({
      where: { id },
      data: { status: action },
    });

    const ratings = await prisma.rating.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        dealer: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return ratings;
  } catch (error) {
    console.error('Error changing rating status:', error);
    return Promise.reject(error);
  }
}

export async function getAdminRatings() {
  'use server';
  try {
    const ratings = await prisma.rating.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        dealer: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return ratings;
  } catch (error) {
    console.error('Error fetching admin ratings:', error);
    throw error;
  }
}

export async function getUserDetails(userId: string): Promise<UserDetails> {
  'use server';
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        isActive: true,
        location: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
