"use server";

import { getHomeListings } from "@/app/actions";
import { CardDisplay } from "./CardDisplay";

export async function Listings() {
  const listings = await getHomeListings();

  return (
    <>
      {listings.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
