"use client";

import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";

interface UploadPicturesProps {
  next: () => void;
  previous: () => void;
  setFiles: (v) => void;
}

export function UploadPictures({
  next,
  previous,
  setFiles,
}: UploadPicturesProps) {
  const [canContinue, setCanContinue] = useState(false);

  return (
    <Card className="min-h-1/2 w-1/2">
      <CardContent className="relative flex h-full w-full flex-col gap-4">
        <CardHeader>
          <CardTitle>Upload Pictures of your car</CardTitle>
        </CardHeader>
        <CardDescription className="flex flex-col gap-4">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setCanContinue(true);
              setFiles(res);
              console.log("Files: ", res);
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "Error",
                description: `Failed to upload image: ${error.message}`,
                duration: 5000,
              });
            }}
            appearance={{
              button:
                "bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800",
            }}
          />
        </CardDescription>
        <CardFooter className="flex justify-between">
          <Button onClick={previous} variant="outline">
            Back
          </Button>
          <Button onClick={next} disabled={!canContinue}>
            Next
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
