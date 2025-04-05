"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { DealerApplications } from "@prisma/client";
import { headers } from "next/headers";
import { DealerInfo } from "../shared/types";

export async function submitDealerApplication(
  data: Omit<DealerApplications, "id" | "userId">
) {
  console.log(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) throw new Error("User not authenticated");
  await prisma.dealerApplications.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  console.log("Dealer application submitted:", data);

  return { success: true };
}

export async function getApplications(): Promise<DealerApplications[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) throw new Error("User not authenticated");

  const applications = prisma.dealerApplications.findMany({
    where: {
      userId: user.id,
    },
  });

  console.log(applications);

  return applications;
}

export async function getDealerInfo(dealerId: string): Promise<DealerInfo> {
  try {
    const dealer = await prisma.user.findUnique({
      where: { id: dealerId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        listings: {
          include: {
            user: true,
            images: {
              select: {
                url: true,
              },
            },
          },
        },
        createdAt: true,
        ratings: true,
        location: true,
      },
    });
    if (!dealer) {
      throw new Error("Dealer not found");
    }
    const dealerWithLocation = {
      ...dealer,
      location: dealer.location || "Unknown location",
    } as unknown as DealerInfo;
    return Promise.resolve(dealerWithLocation);
  } catch (error) {
    console.error("Error fetching dealer information:", error);
    throw new Error("Could not fetch dealer information");
  }
}
