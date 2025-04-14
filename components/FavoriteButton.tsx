'use client';

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toggleFavorite } from '@/app/server/favorites';

interface FavoriteButtonProps {
  listingId: number;
  initialFavorited: boolean;
}

export function FavoriteButton({ listingId, initialFavorited }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      setIsLoading(true);
      const result = await toggleFavorite(listingId);
      if (result.success) {
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm',
        isLoading && 'cursor-not-allowed opacity-50'
      )}
      onClick={handleFavoriteClick}
      disabled={isLoading}
    >
      <Heart className={cn('h-4 w-4', isFavorited && 'fill-current text-red-500')} />
    </Button>
  );
}
