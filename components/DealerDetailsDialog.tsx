'use client';
import { useEffect, useState } from 'react';
import { ListingWithUserAndImages, DealerInfo } from '@/app/shared/types';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { Calendar, Mail, MapPin, Package, Star, List, User } from 'lucide-react';
import { getDealerInfo } from '@/app/server/dealer';
import { Button } from './ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardFooter } from './ui/card';
import Image from 'next/image';

interface DealerDetailsDialogProps {
  listing: ListingWithUserAndImages;
}

export function DealerDetailsDialog({ listing }: DealerDetailsDialogProps) {
  const [dealer, setDealer] = useState<DealerInfo>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDealerInfo = async () => {
      setIsLoading(true);
      try {
        const dealerInfo = await getDealerInfo(listing.userId);
        if (dealerInfo) {
          const formattedDealerInfo = {
            ...dealerInfo,
            createdAt: new Date(dealerInfo.createdAt).toLocaleDateString(),
            ratings: dealerInfo.ratings,
            totalListings: dealerInfo.listings.length,
          };
          setDealer(formattedDealerInfo);
        } else {
          setDealer(null);
        }
      } catch (error) {
        console.error('Failed to fetch dealer info:', error);
        setDealer(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealerInfo();
  }, [listing.userId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mb-6 flex items-center gap-4 rounded-lg p-2 transition-all hover:cursor-pointer hover:bg-muted/50">
          <Avatar className="h-16 w-16 border shadow-sm">
            <AvatarImage src={listing.user.image} alt={listing.user.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(listing.user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{listing.user.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs font-normal">
                {listing.user.role === 'dealer' ? 'Dealer' : 'Private Seller'}
              </Badge>
              {dealer?.ratings !== undefined && (
                <div className="ml-2 flex items-center">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="ml-1">{dealer.ratings.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[700px]">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogHeader className="p-6 pb-2">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20 border shadow">
              <AvatarImage src={listing.user.image} alt={listing.user.name} />
              <AvatarFallback className="bg-primary/10 text-xl text-primary">
                {getInitials(listing.user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold">{listing.user.name}</h2>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="font-normal">
                      {listing.user.role === 'dealer' ? 'Dealer' : 'Private Seller'}
                    </Badge>
                    {dealer?.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {dealer.location}
                      </div>
                    )}
                  </div>
                </div>
                {dealer?.ratings !== undefined && (
                  <div className="mt-2 flex items-center rounded-full bg-muted/50 px-3 py-1.5 sm:mt-0">
                    <RatingStars rating={dealer.ratings} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="listings" className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="info">Dealer Info</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="listings" className="p-6 pt-4">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4">
                <div className="h-48 animate-pulse rounded-lg bg-muted"></div>
                <div className="h-48 animate-pulse rounded-lg bg-muted"></div>
              </div>
            ) : dealer?.listings && dealer.listings.length > 0 ? (
              <div className="grid max-h-[400px] grid-cols-1 gap-4 overflow-y-auto pr-2">
                {dealer.listings.map((dealerListing) => (
                  <DealerListingCard key={dealerListing.id} listing={dealerListing} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">No listings available</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="info" className="p-6 pt-4">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-6 w-1/3 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <Mail className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{listing.user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <User className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-sm text-muted-foreground">
                        {dealer?.role || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Joined</p>
                      <p className="text-sm text-muted-foreground">
                        {dealer?.createdAt || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <Package className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Total Listings</p>
                      <p className="text-sm text-muted-foreground">
                        {/* {dealer?.totalListings || 0} vehicles */}
                        10 vehicles
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    {dealer?.role === 'dealer'
                      ? 'Professional car dealer with a focus on quality vehicles and customer satisfaction.'
                      : 'Private seller offering vehicles directly to buyers without intermediaries.'}
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex gap-2 p-4">
          <Button asChild className="flex-1">
            <Link href={`/addReview/${listing.userId}`}>
              <Star className="mr-2 h-4 w-4" />
              Add Rating
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/ratings/${listing.userId}`}>
              <List className="mr-2 h-4 w-4" />
              View All Ratings
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex" title={`Rating: ${rating.toFixed(1)}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      ))}
      {hasHalfStar && (
        <div className="relative h-4 w-4">
          <Star className="absolute h-4 w-4 fill-yellow-500 text-yellow-500" />
          <div className="absolute right-0 top-0 h-4 w-2 bg-white" />
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
      <span className="ml-1 text-sm font-medium">({rating.toFixed(1)})</span>
    </div>
  );
}

function DealerListingCard({ listing }: { listing: ListingWithUserAndImages }) {
  const imageUrl =
    listing.images && listing.images.length > 0
      ? listing.images[0].url
      : '/placeholder.svg?height=200&width=300';

  const features = [
    listing.fuelType,
    listing.engineSize ? `${listing.engineSize}L` : null,
    listing.condition,
    listing.color,
    listing.drive,
  ].filter(Boolean);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-[16/9] w-full sm:aspect-square sm:w-1/3">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={listing.title || 'Vehicle listing'}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold">
                  {listing.title || `${listing.year} ${listing.carBrand} ${listing.carModel}`}
                </h3>
                <p className="mt-1 text-lg font-bold">
                  ${listing.price?.toLocaleString() || 'Contact for price'}
                </p>
              </div>
              {listing.condition && (
                <Badge variant="outline" className="text-xs">
                  {listing.condition}
                </Badge>
              )}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              {listing.year && (
                <div>
                  <span className="text-muted-foreground">Year: </span>
                  {listing.year}
                </div>
              )}
              {listing.mileage !== null && listing.mileage !== undefined && (
                <div>
                  <span className="text-muted-foreground">Mileage: </span>
                  {listing.mileage.toLocaleString()} mi
                </div>
              )}
            </div>

            {features.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Link href={`/listing/${listing.id}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                See details
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
