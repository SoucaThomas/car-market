import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MapPin } from "lucide-react";
import type { ListingWithUserAndImages } from "@/app/shared/types";
import { redirect } from "next/navigation";
import Link from "next/link";

interface CardDisplay {
  listing: ListingWithUserAndImages;
}

export function CardDisplay({ listing }: CardDisplay) {
  const imageUrl =
    listing.images && listing.images.length > 0
      ? listing.images[0].url
      : "/placeholder.svg?height=200&width=300";

  const features = [
    listing.fuelType,
    listing.engineSize ? `${listing.engineSize}L` : null,
    listing.condition,
    listing.color,
    listing.drive,
  ].filter(Boolean);

  return (
    <Card className="overflow-hidden">
      <div>
        <div className="relative aspect-[16/9]">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={listing.title || "listing listing"}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {listing.title ||
                  `${listing.year} ${listing.carBrand} ${listing.carModel}`}
              </h3>
              <p className="mt-1 text-2xl font-bold">
                ${listing.price?.toLocaleString() || "Contact for price"}
              </p>
            </div>
            {listing.condition && (
              <Badge variant="outline" className="text-xs">
                {listing.condition}
              </Badge>
            )}
          </div>

          {listing.country && (
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {listing.country}
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            {listing.year && (
              <div className="text-sm">
                <span className="text-muted-foreground">Year: </span>
                {listing.year}
              </div>
            )}
            {listing.mileage !== null && listing.mileage !== undefined && (
              <div className="text-sm">
                <span className="text-muted-foreground">Mileage: </span>
                {listing.mileage.toLocaleString()} mi
              </div>
            )}
            {listing.carBrand && (
              <div className="text-sm">
                <span className="text-muted-foreground">Brand: </span>
                {listing.carBrand}
              </div>
            )}
            {listing.carModel && (
              <div className="text-sm">
                <span className="text-muted-foreground">Model: </span>
                {listing.carModel}
              </div>
            )}
          </div>

          {features.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between p-4 pt-0">
          <Link href={`/listing/${listing.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              See listing
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
