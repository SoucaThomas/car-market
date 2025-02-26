import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "better-auth";
import { getUserListings } from "../actions";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  const user = session?.user as User;

  if (!user) {
    return null;
  }

  const userListings = await getUserListings(user);

  return (
    <>
      {!user ? (
        <main className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-2 p-10">
          <Skeleton className="mb-4 h-8 w-full animate-pulse rounded bg-gray-200"></Skeleton>
          <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-3">
            <Skeleton className="h-48 animate-pulse rounded bg-gray-200"></Skeleton>
            <Skeleton className="h-48 animate-pulse rounded bg-gray-200"></Skeleton>
            <Skeleton className="h-48 animate-pulse rounded bg-gray-200"></Skeleton>
          </div>
          <div className="mt-8 w-full">
            <Skeleton className="mb-2 h-8 animate-pulse rounded bg-gray-200"></Skeleton>
            <Skeleton className="mb-2 h-8 animate-pulse rounded bg-gray-200"></Skeleton>
            <Skeleton className="mb-2 h-8 animate-pulse rounded bg-gray-200"></Skeleton>
            <Skeleton className="mb-2 h-8 animate-pulse rounded bg-gray-200"></Skeleton>
          </div>
        </main>
      ) : (
        <main className="mx-auto flex h-full w-full flex-col items-center gap-4 border p-10">
          <h1 className="w-full text-2xl font-bold">
            Welcome back, {user?.name}!
          </h1>

          <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-3">
            <Card>
              <CardContent>
                <CardHeader>
                  <CardTitle>List a car for sale</CardTitle>
                </CardHeader>
                <CardDescription>
                  <p>
                    List your car for sale on the marketplace and reach
                    potential buyers quickly and easily.
                  </p>
                </CardDescription>
                <Link href="/listacar">
                  <Button className="mt-8">List a Car</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <CardHeader>
                  <CardTitle>Cars Listed</CardTitle>
                </CardHeader>
                <CardDescription>
                  <p>You have listed and sold</p>
                  <h1 className="text-2xl font-bold">
                    {userListings.length} cars
                  </h1>
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="h-full">
                <CardHeader>
                  <CardTitle>Become a dealer!</CardTitle>
                </CardHeader>
                <CardDescription>
                  <p>Sign up and become a dealer</p>
                </CardDescription>
                <Button className="mt-8" variant="outline">
                  Become a dealer
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 w-full">
            <Table>
              <TableCaption>A list of your listed cars.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Number</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userListings.map((listing) => (
                  <TableRow key={listing.id} onClick={() => {}}>
                    <TableCell className="font-medium">{listing.id}</TableCell>
                    <TableCell>{listing.title}</TableCell>
                    <TableCell>
                      <span
                        className={
                          (listing.status === "pending" && "text-red-600") ||
                          (listing.status === "approved" && "text-green-600") ||
                          (listing.status === "rejected" && "text-gray-600") ||
                          "text-gray-600"
                        }
                      >
                        {listing.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      ${listing.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      )}
    </>
  );
}
