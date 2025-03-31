"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Calendar,
  Gauge,
  Droplet,
  Palette,
  Car,
  Wrench,
  Award,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "./userAvatar";
import { Badge } from "@/components/ui/badge";
import type { ListingWithUserAndImages } from "@/app/shared/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toggleFavorite, getFavoriteStatus } from "@/app/server/favorites";
import { cn } from "@/lib/utils";

interface CarDetailsProps {
  listing: ListingWithUserAndImages;
}

export function CarDetails({ listing }: CarDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const { isFavorited: favorited } = await getFavoriteStatus(listing.id);
      setIsFavorited(favorited);
    };
    checkFavoriteStatus();
  }, [listing.id]);

  const handleFavoriteClick = async () => {
    try {
      setIsLoading(true);
      const result = await toggleFavorite(listing.id);
      if (result.success) {
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Extract features from the car data
  const features = [
    listing.fuelType
      ? {
          icon: <Droplet className="mr-2 h-4 w-4" />,
          label: listing.fuelType,
        }
      : null,
    listing.engineSize
      ? {
          icon: <Gauge className="mr-2 h-4 w-4" />,
          label: `${listing.engineSize}L Engine`,
        }
      : null,
    listing.condition
      ? {
          icon: <Award className="mr-2 h-4 w-4" />,
          label: listing.condition,
        }
      : null,
    listing.color
      ? {
          icon: <Palette className="mr-2 h-4 w-4" />,
          label: listing.color,
        }
      : null,
    listing.drive
      ? {
          icon: <Car className="mr-2 h-4 w-4" />,
          label: listing.drive,
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-muted-foreground">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-primary">
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="/listings" className="hover:text-primary">
              Listings
            </a>
          </li>
          <li>/</li>
          <li className="max-w-[200px] truncate font-medium text-foreground">
            {listing.title ||
              `${listing.year} ${listing.carBrand} ${listing.carModel}`}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative h-[300px] overflow-hidden rounded-lg bg-muted sm:h-[400px] md:h-[500px]">
            {listing.images.length > 0 ? (
              <Image
                src={
                  listing.images[currentImageIndex]?.ufsUrl ||
                  "/placeholder.svg?height=500&width=800"
                }
                alt={`${listing.title || "Car listing"} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                <p className="text-muted-foreground">No images available</p>
              </div>
            )}

            {listing.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}

            {listing.condition && (
              <Badge className="absolute left-4 top-4 text-sm">
                {listing.condition}
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          {listing.images.length > 1 && (
            <div className="mt-4 flex justify-start gap-2 overflow-x-auto pb-2">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative h-16 w-24 overflow-hidden rounded-md border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image.ufsUrl || "/placeholder.svg?height=64&width=96"}
                    alt={`${listing.title || "Car listing"} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Car Details */}
          <div className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  {listing.title ||
                    `${listing.year} ${listing.carBrand} ${listing.carModel}`}
                </h1>
                {listing.country && (
                  <div className="mt-2 flex items-center text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{listing.country}</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">
                  ${listing.price?.toLocaleString() || "Contact for price"}
                </p>
                {listing.status === "pending" && (
                  <Badge variant="outline" className="mt-1">
                    Pending Approval
                  </Badge>
                )}
              </div>
            </div>
            {/* Key Features */}
            <div className="mt-6 flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center px-3 py-1 text-sm"
                >
                  {feature?.icon && feature?.label ? (
                    <>
                      {feature.icon}
                      {feature.label}
                    </>
                  ) : (
                    <></>
                  )}
                </Badge>
              ))}
            </div>
            <Separator className="my-6" />
            {/* Tabs for different sections */}
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {listing.year && (
                    <div className="flex items-start">
                      <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="font-medium">{listing.year}</p>
                      </div>
                    </div>
                  )}

                  {listing.mileage !== null &&
                    listing.mileage !== undefined && (
                      <div className="flex items-start">
                        <Gauge className="mr-2 h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Mileage
                          </p>
                          <p className="font-medium">
                            {listing.mileage.toLocaleString()} mi
                          </p>
                        </div>
                      </div>
                    )}

                  {listing.fuelType && (
                    <div className="flex items-start">
                      <Droplet className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Fuel Type
                        </p>
                        <p className="font-medium">{listing.fuelType}</p>
                      </div>
                    </div>
                  )}

                  {listing.engineSize && (
                    <div className="flex items-start">
                      <Wrench className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Engine</p>
                        <p className="font-medium">{listing.engineSize}L</p>
                      </div>
                    </div>
                  )}

                  {listing.drive && (
                    <div className="flex items-start">
                      <Car className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Drive Type
                        </p>
                        <p className="font-medium">{listing.drive}</p>
                      </div>
                    </div>
                  )}

                  {listing.color && (
                    <div className="flex items-start">
                      <Palette className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-medium">{listing.color}</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex justify-between border-b py-2">
                        <span className="text-muted-foreground">Brand</span>
                        <span className="font-medium">
                          {listing.carBrand || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-muted-foreground">Model</span>
                        <span className="font-medium">
                          {listing.carModel || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-muted-foreground">Year</span>
                        <span className="font-medium">
                          {listing.year || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-muted-foreground">Condition</span>
                        <span className="font-medium">
                          {listing.condition || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b py-2">
                        <span className="text-muted-foreground">Mileage</span>
                        <span className="font-medium">
                          {listing.mileage?.toLocaleString() || "N/A"} mi
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-muted-foreground">
                          Engine Size
                        </span>
                        <span className="font-medium">
                          {listing.engineSize
                            ? `${listing.engineSize}L`
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-muted-foreground">Fuel Type</span>
                        <span className="font-medium">
                          {listing.fuelType || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-muted-foreground">
                          Drive Type
                        </span>
                        <span className="font-medium">
                          {listing.drive || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="description" className="mt-4">
                <div className="prose max-w-none">
                  {listing.description ? (
                    <p className="whitespace-pre-line text-muted-foreground">
                      {listing.description}
                    </p>
                  ) : (
                    <p className="italic text-muted-foreground">
                      No description provided
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Seller Card */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Seller Information</h2>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <UserAvatar user={listing.user} size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{listing.user.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {listing.user.role === "dealer"
                      ? "Dealer"
                      : "Private Seller"}
                  </p>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>{listing.user.email}</span>
                </div>
                {listing.country && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{listing.country}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full">Contact Seller</Button>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full",
                    isLoading && "cursor-not-allowed opacity-50"
                  )}
                  onClick={handleFavoriteClick}
                  disabled={isLoading}
                >
                  <Heart
                    className={cn(
                      "mr-2 h-4 w-4",
                      isFavorited && "fill-current text-red-500"
                    )}
                  />
                  {isFavorited ? "Saved" : "Save Listing"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Similar Listings Card */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Safety Tips</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Meet in a public, well-lit location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Verify the vehicle's history and documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Test drive the vehicle before making a decision</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Never wire money or use non-secure payment methods
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Report suspicious listings to our team</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
