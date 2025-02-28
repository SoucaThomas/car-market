"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Listing, Upload, User } from "@prisma/client";

interface CarDetailsProps {
  listing: Listing & { images: Upload[]; user: User };
}

export function CarDetails({ listing }: CarDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="relative h-[300px] overflow-hidden rounded-lg bg-muted sm:h-[400px] md:h-[500px]">
          <Image
            src={listing.images[currentImageIndex].ufsUrl || "/placeholder.svg"}
            alt={`${listing.title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>

        <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
          {listing.images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative h-16 w-24 overflow-hidden rounded-md border-2 transition-all ${
                index === currentImageIndex
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <Image
                src={image.ufsUrl || "/placeholder.svg"}
                alt={`${listing.title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <p className="mt-2 text-2xl font-bold text-primary">
            ${listing.price?.toLocaleString()}
          </p>

          <Separator className="my-6" />

          <h2 className="mb-4 text-xl font-semibold">Description</h2>
          <p className="whitespace-pre-line text-muted-foreground">
            {listing.description}
          </p>
        </div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Seller Information</h2>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={listing.user.image || "/placeholder.svg"}
                  alt={listing.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{listing.user.name}</h3>
                <p className="text-sm text-muted-foreground">Seller</p>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{listing.user.email}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full">Contact Seller</Button>
              <Button variant="outline" className="w-full">
                Save Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
