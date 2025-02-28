"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListingsTable } from "./ListingsTable";
import { ApplicationsTable } from "./ApplicationsTable";
import { ApprovedTable } from "./ApprovedTable";
import { RejectedTable } from "./RejectedTable";
export function AdminDashboard() {
  return (
    <Tabs defaultValue="listings" className="space-y-4">
      <TabsList>
        <TabsTrigger value="listings">Pending Listings</TabsTrigger>
        <TabsTrigger value="applications">User Applications</TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>
      <TabsContent value="listings" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Pending Listings</h2>
        </div>
        <ListingsTable />
      </TabsContent>
      <TabsContent value="applications" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">User Applications</h2>
        </div>
        <ApplicationsTable />
      </TabsContent>
      <TabsContent value="approved" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Approved Listings</h2>
        </div>
        <ApprovedTable />
      </TabsContent>
      <TabsContent value="rejected" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Rejected Listings</h2>
        </div>
        <RejectedTable />
      </TabsContent>
    </Tabs>
  );
}
