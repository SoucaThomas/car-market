import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ListingLoadingSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-[300px] w-full rounded-lg sm:h-[400px] md:h-[500px]" />

          <div className="mt-4 flex justify-center gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-24 rounded-md" />
            ))}
          </div>

          <div className="mt-8">
            <Skeleton className="mb-2 h-9 w-3/4" />

            <Skeleton className="mb-6 h-8 w-1/4" />

            <div className="my-6 h-px w-full bg-muted" />

            <Skeleton className="mb-4 h-7 w-1/3" />

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-2/3" />
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <div className="mb-6 h-px w-full bg-muted" />

              {/* Contact information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
