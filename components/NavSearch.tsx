"use client";

import { updateSearch } from "@/app/server/searchAction";
import { Input } from "./ui/input";
import debounce from "lodash.debounce";
import { startTransition, useCallback, useState } from "react";
import { useQueryState } from "nuqs";

export function NavSearch() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [, setInputValue] = useState(search || "");

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
    <>
      <Input
        value={search ?? ""}
        onChange={handleChange}
        placeholder="Search..."
      />
      ;
    </>
  );
}
