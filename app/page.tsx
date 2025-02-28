import { Listings } from "@/components/Listings";
import React from "react";
import { SearchFilters } from "@/components/SearchFilters";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SearchFilters />
      <Listings />
    </div>
  );
}
