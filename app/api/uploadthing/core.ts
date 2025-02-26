import { auth } from "@/auth";
import { headers } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const uploadThing = createUploadthing();

const MAX_SIZE = 1024 * 1024 * 4; // 4MB

export const ourFileRouter = {
  imageUploader: uploadThing([
    "image/jpeg",
    "image/png",
    "image/avif",
    "image/webp",
  ])
    .middleware(async ({ files }) => {
      files.forEach((file) => {
        if (file.size > MAX_SIZE) {
          throw new UploadThingError("File too large");
        }
      });

      const session = await auth.api.getSession({
        headers: await headers(),
      });

      const user = session?.user;

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
