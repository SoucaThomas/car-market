"use client";
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
import { authClient } from "@/lib/auth-client";
import { Session, User } from "better-auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserListings } from "../actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);
  const [userListings, setUserListings] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const response = await authClient.getSession();

      if (!response.data) {
        setLoading(false);
        return;
      }

      setSession(response.data.session);
      setUser(response.data.user);

      setUserListings(await getUserListings(response.data.user.id));

      setLoading(false);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    console.log(userListings);
  }, [userListings]);

  return (
    <>
      {loading ? (
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
        <main className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-2 p-10">
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
                <Button
                  className="mt-8"
                  onClick={() => router.push("/listacar")}
                >
                  List a Car
                </Button>
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
                          (listing.status === "rejected" && "text-gray-600")
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
