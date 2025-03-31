"use server";

import { auth } from "@/auth";
import { prisma } from "prisma/prisma";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function toggleFavorite(listingId: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Check if the favorite already exists
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId: userId,
          listingId: listingId,
        },
      },
    });
    if (existingFavorite) {
      // If it exists, remove it
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
    } else {
      // If it doesn't exist, create it
      await prisma.favorite.create({
        data: {
          userId,
          listingId,
        },
      });
    }

    // Revalidate the listing page and any other pages that show favorites
    revalidatePath("/listing/[id]");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { success: false, error: "Failed to toggle favorite" };
  }
}

export async function getFavoriteStatus(listingId: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { isFavorited: false };
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId: session.user.id,
          listingId,
        },
      },
    });

    return { isFavorited: !!favorite };
  } catch (error) {
    console.error("Error getting favorite status:", error);
    return { isFavorited: false, error: "Failed to get favorite status" };
  }
}

export async function getFavoritedListings() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { listings: [], error: "Not authenticated" };
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        listing: {
          include: {
            images: true,
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      listings: favorites.map((fav) => fav.listing),
      success: true,
    };
  } catch (error) {
    console.error("Error fetching favorited listings:", error);
    return { listings: [], error: "Failed to fetch favorited listings" };
  }
}
