import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  CarFront,
  AlertCircle,
  CheckCircle2,
  Clock,
  Store,
  NotebookTabs,
  Dock,
} from "lucide-react";
import { prisma } from "@/prisma/prisma";
import { ListingsTable } from "@/components/ListingsTable";
import { UsersTable } from "@/components/UserListings";
import {
  adminChangeRole,
  adminChangeStatus,
  adminChangeStatusDealershipApplication,
  adminToggleUserStatus,
  getAdminDealerApplications,
  getAdminListings,
  getAdminUsers,
} from "@/app/server/admin";
import {
  ListingStatus,
  Role,
  User,
  DealerApplications,
  ApplicationStatus,
} from "@prisma/client";
import { ListingWithUser } from "../shared/types";
import { DealershipApplicationsTable } from "@/components/DealershipApplicationsTable";
import { application } from "express";

async function getAdminStats() {
  const [
    totalUsers,
    totalDealers,
    totalListings,
    pendingListings,
    approvedListings,
    rejectedListings,
    pendingApplications,
    approvedApplications,
    rejectedApplications,
  ] = await Promise.all([
    // Users stats
    prisma.user.count(),
    prisma.user.count({
      where: { role: "dealer" },
    }),
    // Listings stats
    prisma.listing.count(),
    prisma.listing.count({
      where: { status: "pending" },
    }),
    prisma.listing.count({
      where: { status: "approved" },
    }),
    prisma.listing.count({
      where: { status: "rejected" },
    }),
    // Applications stats
    prisma.dealerApplications.count({
      where: { status: "pending" },
    }),
    prisma.dealerApplications.count({
      where: { status: "approved" },
    }),
    prisma.dealerApplications.count({
      where: { status: "rejected" },
    }),
  ]);

  return {
    users: {
      total: totalUsers,
      dealers: totalDealers,
    },
    listings: {
      total: totalListings,
      pending: pendingListings,
      approved: approvedListings,
      rejected: rejectedListings,
    },
    applications: {
      pending: pendingApplications,
      approved: approvedApplications,
      rejected: rejectedApplications,
    },
  };
}

export default async function AdminPage() {
  const listings = await getAdminListings();
  const stats = await getAdminStats();
  const users = await getAdminUsers();
  const dealerApplications = await getAdminDealerApplications();

  async function handleListingAction(
    id: number,
    action: ListingStatus,
    pending?: boolean
  ): Promise<ListingWithUser[] | Error> {
    "use server";
    try {
      const response = await adminChangeStatus(id, action, pending);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function handleUserChangeRole(
    id: string,
    action: Role
  ): Promise<User[] | Error> {
    "use server";
    try {
      const response = await adminChangeRole(id, action);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function handleToggleUserStatus(id: string): Promise<User[] | Error> {
    "use server";
    try {
      const response = await adminToggleUserStatus(id);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function handleApplicationDecision(
    id: number,
    action: ApplicationStatus
  ): Promise<DealerApplications[] | Error> {
    "use server";
    try {
      const response = await adminChangeStatusDealershipApplication(id, action);
      return response;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Overview Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Users Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.total}</div>
            <p className="text-xs text-muted-foreground">
              Including {stats.users.dealers} dealers
            </p>
          </CardContent>
        </Card>

        {/* Listings Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Listings
            </CardTitle>
            <CarFront className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.listings.total}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {stats.listings.pending} pending
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                {stats.listings.approved} approved
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Dealer Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dealer Applications
            </CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.applications.pending +
                stats.applications.approved +
                stats.applications.rejected}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {stats.applications.pending} pending
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                {stats.applications.approved} approved
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Action Required Card */}
        <Card
          className={
            stats.listings.pending > 0 || stats.applications.pending > 0
              ? "border-orange-500"
              : ""
          }
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Action Required
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.listings.pending + stats.applications.pending}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{stats.listings.pending} listings</span>
              <span>•</span>
              <span>{stats.applications.pending} applications</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="listings" className="space-y-4">
        <TabsList className="grid h-full grid-cols-2 gap-4 lg:grid-cols-4">
          <TabsTrigger value="listings" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending Listings
          </TabsTrigger>

          <TabsTrigger value="allListings" className="flex items-center gap-2">
            <NotebookTabs className="h-4 w-4" />
            Listings
          </TabsTrigger>

          <TabsTrigger
            value="dealershipApplications"
            className="flex items-center gap-2"
          >
            <Dock className="h-4 w-4" />
            Pending Dealer Applications
          </TabsTrigger>

          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        {/* Pending Listings Tab */}
        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>Pending Listings</CardTitle>
              <CardDescription>
                Review and manage new vehicle listings awaiting approval.
                {stats.listings.pending > 0 && (
                  <span className="ml-2 text-orange-500">
                    {stats.listings.pending} listings require your attention.
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ListingsTable
                listings={listings.filter(
                  (listing) => listing.status === "pending"
                )}
                handleAction={handleListingAction}
                pending={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Listings Tab */}
        <TabsContent value="allListings">
          <Card>
            <CardHeader>
              <CardTitle>All listings</CardTitle>
              <CardDescription>
                Manage user accounts and roles. Currently managing{" "}
                {stats.users.total} users, including {stats.users.dealers}{" "}
                dealers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ListingsTable
                listings={listings}
                handleAction={handleListingAction}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dealershipApplications">
          <Card>
            <CardHeader>
              <CardTitle>Pending Dealer Applications</CardTitle>
              <CardDescription>
                Review and manage dealership applications. Currently overseeing{" "}
                {stats.applications.pending} pending applications for dealers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DealershipApplicationsTable
                applications={dealerApplications.filter((application) => {
                  application.status === ApplicationStatus.pending;
                })}
                handleApplicationDecision={handleApplicationDecision}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users Management</CardTitle>
              <CardDescription>
                Manage user accounts and roles. Currently managing{" "}
                {stats.users.total} users, including {stats.users.dealers}{" "}
                dealers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable
                users={users}
                handleUserChangeRole={handleUserChangeRole}
                handleToggleUserStatus={handleToggleUserStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
