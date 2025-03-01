import { Listing, Upload, User } from "@prisma/client";

export type ListingWithUser = Listing & { user: User };

export type ListingWithUserAndImages = Listing & {
  user: User;
  images: Upload[];
};
