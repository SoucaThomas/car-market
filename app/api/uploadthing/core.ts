import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
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
      // Validate file size
      files.forEach((file) => {
        if (file.size > MAX_SIZE) {
          throw new UploadThingError("File too large");
        }
      });

      // Authenticate and get user ID
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      const user = session?.user;

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id }; // Pass userId to onUploadComplete
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      try {
        const upload = await prisma.upload.create({
          data: {
            url: file.url,
            key: file.key,
            name: file.name,
            type: file.type,
            size: file.size,
            ufsUrl: file.url,
            userId: metadata.userId,
          },
        });

        console.log("Upload record created:", upload);

        return { uploadedBy: metadata.userId, uploadId: upload.id };
      } catch (error) {
        console.error("Error saving upload to database:", error);
        throw new UploadThingError("Failed to save upload to database"); // Important: Throw error to signal failure
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
