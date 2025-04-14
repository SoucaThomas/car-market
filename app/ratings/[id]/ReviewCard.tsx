'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  rating: {
    id: number;
    user: {
      id: string;
      name: string;
      image: string;
    };
    rating: number;
    review: string | null;
    createdAt: Date;
    userId: string;
    dealerId: string;
  };
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function ReviewCard({ rating }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_PREVIEW_LENGTH = 200;
  const reviewText = rating.review || '';
  const shouldShowReadMore = reviewText.length > MAX_PREVIEW_LENGTH;
  const displayText = isExpanded ? reviewText : reviewText.substring(0, MAX_PREVIEW_LENGTH) + '...';

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage
              src={rating.user.image || '/placeholder.svg'}
              alt={rating.user.name || ''}
            />
            <AvatarFallback>{rating.user.name?.substring(0, 2) || '??'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{rating.user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(new Date(rating.createdAt))}
                </p>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= rating.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 whitespace-pre-wrap">{displayText}</p>
            {shouldShowReadMore && (
              <Button
                variant="link"
                className="mt-2 h-auto p-0"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
