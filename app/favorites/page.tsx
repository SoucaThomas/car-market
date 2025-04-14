import { getFavoritedListings } from '@/app/server/favorites';
import { CardDisplay } from '@/components/CardDisplay';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const metadata = {
  title: 'My Favorites - Car Market',
  description: 'View your saved car listings',
};

export default async function FavoritesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Sign in Required</h1>
        <p className="mb-8 text-muted-foreground">Please sign in to view your favorite listings.</p>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const { listings, error } = await getFavoritedListings();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Error</h1>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="mb-4 text-3xl font-bold">No Favorites Yet</h1>
        <p className="mb-8 text-muted-foreground">
          Start browsing and save the listings you&apos;re interested in.
        </p>
        <Link href="/">
          <Button>Browse Listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Favorites</h1>
        <p className="mt-2 text-muted-foreground">Your saved car listings</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((listing) => (
          <CardDisplay key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
