'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createRating } from '@/app/server/ratings';
import { useSession } from '@/lib/auth-client';

interface AddRatingFormProps {
  dealerData: {
    id: string;
    name: string;
    image?: string | null;
    location?: string;
  };
  dealerId: string;
}

export function AddRatingForm({ dealerData, dealerId }: AddRatingFormProps) {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent rating yourself
  if (session?.data?.user?.id === dealerId) {
    toast({
      title: 'Not allowed',
      description: 'You cannot rate yourself',
      variant: 'destructive',
    });
    router.push(`/ratings/${dealerId}`);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.data?.user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to submit a rating',
        variant: 'destructive',
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: 'Rating required',
        description: 'Please select a rating',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createRating({
        dealerId,
        userId: session.data.user.id,
        rating,
        review,
      });

      toast({
        title: 'Rating submitted',
        description: 'Your rating has been submitted successfully',
      });

      router.push(`/ratings/${dealerId}`);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to submit rating',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-6">
        <Link
          href={`/ratings/${dealerId}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to ratings
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Rate Dealer</CardTitle>
          <CardDescription>Share your experience with {dealerData.name}</CardDescription>

          <div className="mt-4 flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={dealerData.image || '/placeholder.svg'} alt={dealerData.name} />
              <AvatarFallback>{dealerData.name?.substring(0, 2) || '??'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{dealerData.name}</p>
              <p className="text-sm text-muted-foreground">{dealerData.location}</p>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-muted-foreground">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="review" className="text-sm font-medium">
                Your Review
              </label>
              <Textarea
                id="review"
                placeholder="Share details of your experience with this dealer..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={5}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || rating === 0}>
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
