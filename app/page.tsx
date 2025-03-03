import { Listings } from "@/components/Listings";
import React from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { searchParams } from "./shared/types";

interface PageProps {
  searchParams: Promise<searchParams>;
}

export default async function Page({ searchParams }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <SearchFilters />
      <Listings searchParams={searchParams} />
    </div>
  );
}
