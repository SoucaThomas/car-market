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

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dealership Applications
          </h1>
          <p className="mt-1 text-muted-foreground">
            View and manage your dealership applications
          </p>
        </div>
        <Button asChild>
          <Link href="/dealerships/application">
            <PlusCircle className="mr-2 h-4 w-4" />
            Apply Again
          </Link>
        </Button>
      </div>

      <Card>
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
                  <TableHead className="hidden md:table-cell">Notes</TableHead>
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
                      {new Date(application.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {application.dealershipName}
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
                      {application.notes}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/applications/${application.id}`}>
                          View
                        </Link>
                      </Button>
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
