import { getListing } from "@/actions";
import { ImageShowcase } from "@/components/ImageShowcase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page(props: { params: { id: string } }) {
  const {
    params: { id },
  } = await Promise.resolve(props);
  const listing = await getListing(id);
  const date = new Date(listing.createdAt);

  return (
    <Card className="mx-auto flex w-full flex-col p-2">
      <CardHeader className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">{`${listing.carBrand} ${listing.carModel}`}</h1>
          <p>{date.toDateString()}</p>
        </div>
        <ImageShowcase images={listing.images} />
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-4">
        <CardDescription className="flex h-12 w-full flex-row gap-4">
          <div className="w-3/4 bg-blue-400">
            <CardTitle className="pt-4 text-4xl font-bold">
              {listing.title}
            </CardTitle>
            <h2 className="text-2xl font-bold">Description</h2>
            <div className="sbg-red-300 w-3/4">
              <p>{listing.description}</p>
            </div>
          </div>
          <div className="w-1/4 bg-green-400"></div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
