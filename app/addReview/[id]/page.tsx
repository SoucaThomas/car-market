import { Suspense } from "react";
import { getDealer } from "@/app/server/ratings";
import { AddRatingForm } from "@/components/AddRatingForm";
import AddRatingLoadingSkeleton from "./loading";

export default async function AddRatingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dealerData = await getDealer(id);

  if (!dealerData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Dealer Not Found</h1>
        <p>
          The dealer you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<AddRatingLoadingSkeleton />}>
      <AddRatingForm dealerData={dealerData} dealerId={id} />
    </Suspense>
  );
}
