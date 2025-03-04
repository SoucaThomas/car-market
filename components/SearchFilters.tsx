"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FiltersSheet } from "./FiltersSheet";
import { useQueryState } from "nuqs";
import { useCallback, useTransition } from "react";
import debounce from "lodash.debounce";
import { updateSearch } from "@/app/server/searchAction";
import { searchParams } from "@/app/shared/types";

interface ListingsProps {
  searchParams: Promise<searchParams>;
}

export function SearchFilters({ searchParams }: ListingsProps) {
  const [sort, setSort] = useQueryState("sort", { defaultValue: "" });
  const [, startTransition] = useTransition();

  const debouncedUpdateSearch = useCallback(
    debounce((query: string) => {
      startTransition(async () => {
        await updateSearch();
      });
    }, 300),
    []
  );

  return (
    <section>
      <div className="mx-auto flex flex-row items-center justify-between gap-2 p-10">
        <h1 className="text-2xl font-bold">Search filters</h1>

        <div className="flex flex-row items-center gap-2">
          <h2 className="whitespace-nowrap text-sm text-muted-foreground">
            Sort by
          </h2>
          <Select
            onValueChange={(value) => {
              setSort(value);
              debouncedUpdateSearch(value);
            }}
            value={sort}
          >
            <SelectTrigger className="w-32 rounded-xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="mileage">Mileage</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>

          <FiltersSheet searchParams={searchParams} />
        </div>
      </div>
    </section>
  );
}
