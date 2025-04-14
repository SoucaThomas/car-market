'use server';

import { getHomeListings } from '@/app/server/listings';
import { CardDisplay } from './CardDisplay';
import { searchParams } from '@/app/shared/types';

interface ListingsProps {
  searchParams: Promise<searchParams>;
}

export async function Listings({ searchParams }: ListingsProps) {
  const awaitSearchParams = await searchParams;
  const listings = await getHomeListings(awaitSearchParams);

  console.log('listings', listings);
  console.log('searchParams', awaitSearchParams);

  if (listings instanceof Error) {
    console.error(listings.message);
    return <section className="w-full text-center">Error loading listings</section>;
  }
  return (
    <>
      {listings.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <CardDisplay listing={listing} key={listing.id} />
          ))}
        </section>
      ) : (
        <section className="w-full text-center">No listings available</section>
      )}
    </>
  );
}
