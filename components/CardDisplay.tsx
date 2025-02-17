import { Car, Fuel, Gauge, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

export function CardDisplay() {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg">
      <CardContent className="flex flex-col p-0">
        <div className="aspect-video h-full w-full rounded-xl bg-zinc-700/20"></div>

        <div className="p-4">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-xl">2020 Toyota Camry</h1>
            <Button variant="outline" className="rounded-xl">
              Used
            </Button>
          </div>
          <h1 className="text-xl font-bold">14200$</h1>

          <Separator className="my-3" />

          <div className="grid grid-cols-2 gap-2 pb-2">
            <div className="flex flex-row items-center gap-2">
              <Gauge size={18} />
              <p className="text-sm">10 000 km</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <MapPin size={18} />
              <p className="text-sm">London</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Fuel size={18} />
              <p className="text-sm">Disel 1.6</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Car size={18} />
              <p className="text-sm">10 000 km</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
