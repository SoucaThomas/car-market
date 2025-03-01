"use server";

import { getHomeListings } from "@/app/server/listings";
import { CardDisplay } from "./CardDisplay";

export async function Listings() {
  const listings = await getHomeListings();

  if (listings instanceof Error) {
    console.error(listings.message);
    return (
      <section className="w-full text-center">Error loading listings</section>
    );
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
