"use client";

import Image from "next/image";
import { Listing, Upload, User } from "@prisma/client";
import Link from "next/link";

interface CardDisplayProps {
  listing: Listing & { images: Upload[]; user: User };
}

export function CardDisplay({ listing }: CardDisplayProps) {
  return (
    <Link key={listing.id} href={`/listing/${listing.id}`} className="group">
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={listing.images[0]?.ufsUrl || "/placeholder.svg"}
            alt={listing.title || "Listing image"}
            fill
            className="object-cover"
          />
        </div>
        <div className="gap-2 p-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
              {listing.title}
            </h2>
            <p className="mt-1 text-lg font-bold text-primary">
              ${listing.price?.toLocaleString() || "N/A"}
            </p>
          </div>
          <div className="mt-3 flex items-center">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={listing.user.image || "/placeholder.svg"}
                alt={listing.user.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {listing.user.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
