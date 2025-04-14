'use server';

import { prisma } from '@/prisma/prisma';

export async function getDealerRatings(dealerId: string) {
  try {
    const dealer = await prisma.user.findUnique({
      where: {
        id: dealerId,
        role: 'dealer', // Ensure we're only getting dealers
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        location: true,
        dealerRatings: {
          include: {
            user: {
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
        },
      },
    });

    if (!dealer) return null;

    // Calculate average rating
    const ratings = dealer.dealerRatings;
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
        : 0;

    return {
      ...dealer,
      averageRating,
      totalRatings: ratings.length,
    };
  } catch (error) {
    console.error('Error fetching dealer ratings:', error);
    throw new Error('Failed to fetch dealer ratings');
  }
}

export async function getDealer(dealerId: string) {
  try {
    const dealer = await prisma.user.findUnique({
      where: {
        id: dealerId,
        role: 'dealer',
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        location: true,
      },
    });

    if (!dealer) return null;
    return dealer;
  } catch (error) {
    console.error('Error fetching dealer:', error);
    throw new Error('Failed to fetch dealer');
  }
}

export async function createRating(data: {
  dealerId: string;
  userId: string;
  rating: number;
  review: string;
}) {
  try {
    // Check if dealer exists
    const dealer = await prisma.user.findUnique({
      where: {
        id: data.dealerId,
        role: 'dealer',
      },
    });

    if (!dealer) {
      throw new Error('Dealer not found');
    }

    // Check if user has already rated this dealer
    const existingRating = await prisma.rating.findFirst({
      where: {
        dealerId: data.dealerId,
        userId: data.userId,
      },
    });

    if (existingRating) {
      // Update existing rating
      return prisma.rating.update({
        where: { id: existingRating.id },
        data: {
          rating: data.rating,
          review: data.review,
        },
      });
    }

    // Create new rating
    return prisma.rating.create({
      data: {
        dealerId: data.dealerId,
        userId: data.userId,
        rating: data.rating,
        review: data.review,
      },
    });
  } catch (error) {
    console.error('Error creating rating:', error);
    throw new Error('Failed to create rating');
  }
}
