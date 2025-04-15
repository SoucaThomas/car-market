'use client';

import { Rating, RatingStatus } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Filter } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import { UserDetailsDialog } from '@/components/UserDetailsDialog';

interface RatingsTableProps {
  ratings: (Rating & {
    user: {
      id: string;
      name: string;
      image: string;
    };
    dealer: {
      id: string;
      name: string;
      image: string;
    };
  })[];
  handleAction: (id: number, action: RatingStatus) => Promise<void>;
}

export function RatingsTable({ ratings, handleAction }: RatingsTableProps) {
  const [showRejected, setShowRejected] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredRatings = showRejected
    ? ratings
    : ratings.filter((rating) => rating.status !== RatingStatus.rejected);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Showing {filteredRatings.length} of {ratings.length} ratings
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowRejected(!showRejected)}>
          {showRejected ? 'Hide Rejected' : 'Show Rejected'}
        </Button>
      </div>
      <div className="space-y-4">
        {filteredRatings.map((rating) => (
          <RatingCard
            key={rating.id}
            rating={rating}
            handleAction={handleAction}
            onUserClick={() => setSelectedUserId(rating.user.id)}
            onDealerClick={() => setSelectedUserId(rating.dealer.id)}
          />
        ))}
      </div>
      {selectedUserId && (
        <UserDetailsDialog
          userId={selectedUserId}
          open={!!selectedUserId}
          onOpenChange={(open) => !open && setSelectedUserId(null)}
        />
      )}
    </div>
  );
}

function RatingCard({
  rating,
  handleAction,
  onUserClick,
  onDealerClick,
}: {
  rating: RatingsTableProps['ratings'][0];
  handleAction: RatingsTableProps['handleAction'];
  onUserClick: () => void;
  onDealerClick: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_PREVIEW_LENGTH = 200;
  const reviewText = rating.review || '';
  const shouldShowReadMore = reviewText.length > MAX_PREVIEW_LENGTH;
  const displayText = isExpanded ? reviewText : reviewText.substring(0, MAX_PREVIEW_LENGTH) + '...';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={rating.user.image || '/placeholder.svg'} alt={rating.user.name} />
            <AvatarFallback>{rating.user.name?.substring(0, 2) || '??'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              <Button
                variant="link"
                className="h-auto p-0 text-lg font-semibold"
                onClick={onUserClick}
              >
                {rating.user.name}
              </Button>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Rated{' '}
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-muted-foreground"
                onClick={onDealerClick}
              >
                {rating.dealer.name}
              </Button>{' '}
              on {formatDate(new Date(rating.createdAt))}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
          <span className="text-sm font-medium">({rating.rating})</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="whitespace-pre-wrap">{displayText}</p>
            {shouldShowReadMore && (
              <Button
                variant="link"
                className="h-auto p-0 text-sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                rating.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : rating.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {rating.status}
            </span>
            {rating.status === 'pending' && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction(rating.id, RatingStatus.approved)}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction(rating.id, RatingStatus.rejected)}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
