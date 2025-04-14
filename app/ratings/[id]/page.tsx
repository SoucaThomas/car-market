import Link from 'next/link';
import { Suspense } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { getDealerRatings } from '@/app/server/ratings';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import RatingsLoadingSkeleton from './loading';
import ReviewCard from './ReviewCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dealerData = await getDealerRatings(id);

  if (!dealerData) {
    return {
      title: 'Dealer Not Found',
      description: "The dealer you're looking for doesn't exist or has been removed.",
    };
  }

  return {
    title: `Ratings for ${dealerData.name || 'Dealer'}`,
    description: `View ratings and reviews for ${dealerData.name || 'Dealer'}`,
  };
}

async function DealerRatingsContent({ id }: { id: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const dealerData = await getDealerRatings(id);

  if (!dealerData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Dealer Not Found</h1>
        <p>The dealer you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    );
  }

  const isCurrentUser = session?.user.id === id;

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dealer Ratings</h1>
        {!isCurrentUser && session?.user && (
          <Link href={`/addReview/${id}`}>
            <Button>Add Rating</Button>
          </Link>
        )}
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={dealerData.image || '/placeholder.svg'} alt={dealerData.name || ''} />
            <AvatarFallback>{dealerData.name?.substring(0, 2) || '??'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{dealerData.name}</CardTitle>
            <CardDescription>{dealerData.location}</CardDescription>
            <div className="mt-2 flex items-center">
              <div className="mr-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(dealerData.averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {dealerData.averageRating.toFixed(1)} ({dealerData.totalRatings} ratings)
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <h2 className="mb-4 text-xl font-semibold">All Ratings</h2>

      {dealerData.dealerRatings.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center text-muted-foreground">
            No ratings yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {dealerData.dealerRatings.map((rating) => (
            <ReviewCard key={rating.id} rating={rating} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function DealerRatingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<RatingsLoadingSkeleton />}>
      <DealerRatingsContent id={id} />
    </Suspense>
  );
}
