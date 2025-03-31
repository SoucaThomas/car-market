"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { DealerApplications } from "@prisma/client";
import { headers } from "next/headers";

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
