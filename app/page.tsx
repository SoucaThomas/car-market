import { Listings } from "@/components/Listings";
import React from "react";
import { SearchFilters } from "@/components/SearchFilters";

export default function Page() {
  return (
    <div className="h-full w-full flex-1">
      <SearchFilters />
      <Listings />
    </div>
  );
}
