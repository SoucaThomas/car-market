"use client";

import { AlignJustify, Grid2x2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CardDisplay } from "@/components/CardDisplay";
import { FiltersSheet } from "@/components/FiltersSheet";
import { useEffect, useState } from "react";
import { getHomeListings } from "./actions";

export default function Page() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getListings = async () => {
      const userListings = await getHomeListings();

      setListings(userListings);
    };

    getListings();
  }, []);

  return (
    <div className="flex h-full flex-row">
      <div className="h-full flex-1">
        <section>
          <div className="mx-auto flex max-w-screen-2xl flex-row items-center justify-between gap-2 p-10">
            <h1 className="text-2xl font-bold">Car market</h1>
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-sm text-muted-foreground">Sort by</h2>
              <Select>
                <SelectTrigger className="w-64 rounded-xl">
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
        <section className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-6 p-10 lg:grid-cols-3">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <CardDisplay listing={listing} key={listing.id} />
            ))
          ) : (
            <div className="w-full text-center">No listings available</div>
          )}
        </section>
      </div>
    </div>
  );
}
