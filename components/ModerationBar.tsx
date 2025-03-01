"use client";

import { useState } from "react";
import { Check, Ban, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Listing, ListingStatus } from "@prisma/client";
import { adminChangeStatus } from "@/app/server/admin";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

interface ModerationBarProps {
  listing: Listing;
}

export function ModerationBar({ listing }: ModerationBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background shadow-lg">
      <div className="container mx-auto flex items-center justify-center gap-4 px-4 py-4">
        <Button
          variant="destructive"
          onClick={async () => {
            await adminChangeStatus(listing.id, ListingStatus.rejected).then(
              (response) => {
                if (response instanceof Error) {
                  toast({
                    title: "Error",
                    description: response.message,
                    variant: "destructive",
                  });
                } else {
                  toast({
                    title: "Listing rejected",
                    description: "The listing has been rejected",
                  });

                  redirect("/admin");
                }
              }
            );
          }}
        >
          <Ban />
          Reject
        </Button>
        <Button
          onClick={async () => {
            await adminChangeStatus(listing.id, ListingStatus.approved).then(
              (response) => {
                if (response instanceof Error) {
                  toast({
                    title: "Error",
                    description: response.message,
                    variant: "destructive",
                  });
                } else {
                  toast({
                    title: "Listing approved",
                    description: "The listing has been approved",
                  });

                  redirect("/admin");
                }
              }
            );
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          <Check />
          Approve
        </Button>
      </div>
    </div>
  );
}
