"use client";

import { AlignJustify, Grid2x2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FiltersSheet } from "./FiltersSheet";
import { useQueryState } from "nuqs";
import { Input } from "./ui/input";
import { useCallback, useState, useTransition } from "react";
import debounce from "lodash.debounce";
import { updateSearch } from "@/app/server/searchAction";

export function SearchFilters() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(search || "");

  const debouncedUpdateSearch = useCallback(
    debounce((query: string) => {
      startTransition(async () => {
        await updateSearch();
      });
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);
    setSearch(newQuery);
    debouncedUpdateSearch(newQuery);
  };

  return (
    <section>
      <div className="mx-auto flex flex-row items-center justify-between gap-2 p-10">
        <h1 className="text-2xl font-bold">Car market</h1>
        <Input
          value={search ?? ""}
          onChange={handleChange}
          placeholder="Search..."
        />

        <div className="flex flex-row items-center gap-2">
          <h2 className="whitespace-nowrap text-sm text-muted-foreground">
            Sort by
          </h2>
          <Select>
            <SelectTrigger className="w-32 rounded-xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="mileage">Mileage</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon">
            <AlignJustify className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Grid2x2 className="h-4 w-4" />
          </Button>

          <FiltersSheet />
        </div>
      </div>
    </section>
  );
}
