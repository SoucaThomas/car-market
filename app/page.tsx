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
export default function Page() {
  return (
    <div className="flex h-full flex-row">
      <div className="h-full flex-1">
        <section>
          <div className="flex flex-row items-center justify-between gap-2 p-10">
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
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-screen-lg grid-cols-2 gap-6 p-10">
          <CardDisplay />
          <CardDisplay />
          <CardDisplay />
          <CardDisplay />
          <CardDisplay />
          <CardDisplay />
          <CardDisplay />
          <CardDisplay />
        </section>
      </div>
    </div>
  );
}
