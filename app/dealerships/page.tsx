import Link from "next/link";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search } from "lucide-react";
import { getApplications } from "../server/dealer";

import { ViewApplicationButton } from "@/components/ui/viewDealershipApplicationButton";

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="container mx-auto pt-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dealership Applications
          </h1>
          <p className="mt-1 text-muted-foreground">
            View and manage your dealership applications
          </p>
        </div>
        <Button asChild>
          <Link href="/dealerships/apply">
            <PlusCircle className="mr-2 h-4 w-4" />
            Apply Again
          </Link>
        </Button>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            A list of all your dealership applications and their current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Dealership Name
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Busniess Email
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">
                      {application.id}
                    </TableCell>
                    <TableCell>
                      {application.yearEstablished
                        ? new Date(
                            application.yearEstablished
                          ).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {application.businessName}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          application.status === "approved"
                            ? "success"
                            : application.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {application.status.charAt(0).toUpperCase() +
                          application.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                      {application.businessEmail}
                    </TableCell>
                    <TableCell className="text-right">
                      <ViewApplicationButton application={application} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
