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
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

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

      setLoading(false);
    };

    fetchSession();
  }, []);

  return (
    <>
      {!loading && !user ? (
        <></>
      ) : (
        <main className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-2 p-10">
          <h1 className="w-full text-2xl font-bold">
            Welcome back, {user?.name}!
          </h1>

          <div className="grid w-full grid-cols-3 gap-6">
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
                <Button className="mt-8">List a Car</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <CardHeader>
                  <CardTitle>Cars Listed</CardTitle>
                </CardHeader>
                <CardDescription>
                  <p>You have listed and sold</p>
                  <h1 className="text-2xl font-bold">10 cars</h1>
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
                <TableRow onClick={() => {}}>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>2012 BMW 3 series</TableCell>
                  <TableCell>
                    <span className="text-green-500">Listed</span>
                  </TableCell>
                  <TableCell className="text-right">$2500.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>
      )}
    </>
  );
}
