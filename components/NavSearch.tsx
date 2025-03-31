"use client";

import { updateSearch } from "@/app/server/searchAction";
import { Input } from "./ui/input";
import debounce from "lodash.debounce";
import { startTransition, useCallback, useState, useMemo } from "react";
import { useQueryState } from "nuqs";

// Create a debounced function outside the component to prevent recreation on each render
const createDebouncedSearch = (callback: () => void) => 
  debounce(callback, 300);

export function NavSearch() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [, setInputValue] = useState(search || "");

  // Create the debounced function once using useMemo
  const debouncedFn = useMemo(() => 
    createDebouncedSearch(() => {
      startTransition(async () => {
        await updateSearch();
      });
    }),
    []
  );
  
  // Use the properly memoized debounced function in a callback
  const debouncedUpdateSearch = useCallback(() => {
    debouncedFn();
  }, [debouncedFn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);
    setSearch(newQuery);
    debouncedUpdateSearch();
  };

  return (
    <>
      <Input
        value={search ?? ""}
        onChange={handleChange}
        placeholder="Search..."
      />
    </>
  );
}
