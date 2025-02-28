import { getListing } from "@/actions";
import { CarDetails } from "@/components/ui/CarDetails";
import { Suspense } from "react";
import ListingLoadingSkeleton from "./loading";

async function ListingPageContent({ id }: { id: string }) {
  const listing = await getListing(id);

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Listing Not Found</h1>
        <p>
          The car listing you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <CarDetails listing={listing} />
    </main>
  );
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<ListingLoadingSkeleton />}>
      <ListingPageContent id={id} />
    </Suspense>
  );
}
