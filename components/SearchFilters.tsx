'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FiltersSheet } from './FiltersSheet';
import { useQueryState } from 'nuqs';
import { useCallback, useTransition, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { updateSearch } from '@/app/server/searchAction';
import { searchParams } from '@/app/shared/types';

// Create a debounced function outside the component to prevent recreation on each render
const createDebouncedSearch = (callback: () => void) => debounce(callback, 300);
interface ListingsProps {
  searchParams: Promise<searchParams>;
}

export function SearchFilters({ searchParams }: ListingsProps) {
  const [sort, setSort] = useQueryState('sort', { defaultValue: '' });
  const [, startTransition] = useTransition();

  // Create the debounced function once using useMemo
  const debouncedFn = useMemo(
    () =>
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

  return (
    <section>
      <div className="mx-auto flex flex-row items-center justify-between gap-2 p-10">
        <h1 className="text-2xl font-bold">Search filters</h1>

        <div className="flex flex-row items-center gap-2">
          <h2 className="whitespace-nowrap text-sm text-muted-foreground">Sort by</h2>
          <Select
            onValueChange={(value) => {
              setSort(value);
              debouncedUpdateSearch();
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
