import { colors, countries, fuel } from "@/constants";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FilterInput } from "./ui/filterInput";
import { Input } from "./ui/input";

interface DescriptionCarProps<T extends Record<number, string>> {
  next: () => void;
  previous: () => void;
  price: number;
  setPrice: (price: number) => void;
  engineSize: number;
  setEngineSize: (engineSize: number) => void;
  country: T | null;
  setCountry: (country: T | null) => void;
  fuelType: T | null;
  setFuelType: (fuelType: T | null) => void;
  mileage: number;
  setMileage: (mileage: number) => void;
  color: T | null;
  setColor: (color: T | null) => void;
  description: string;
  setDescription: (description: string) => void;
}

export function DescriptionCar({
  next,
  previous,
  price,
  setPrice,
  engineSize,
  setEngineSize,
  country,
  setCountry,
  fuelType,
  setFuelType,
  mileage,
  setMileage,
  color,
  setColor,
  description,
  setDescription,
}: DescriptionCarProps<{ id: number; label: string }>) {
  return (
    <Card className="min-h-1/2 w-1/2">
      <CardContent className="relative flex h-full w-full flex-col gap-4">
        <CardHeader>
          <CardTitle>Details about your car</CardTitle>
        </CardHeader>
        <CardDescription className="flex flex-col gap-4">
          <div className="mt-5 flex flex-col gap-5">
            <p className="-mb-4 font-semibold">Listing price</p>
            <Input
              type="number"
              placeholder="$"
              onChange={(e) => setPrice(Number(e.target.value))}
            ></Input>
          </div>

          <FilterInput
            data={countries}
            label="Contry"
            value={country}
            setValue={setCountry}
          />

          <div className="flex flex-col gap-5">
            <p className="-mb-4 font-semibold">Engine size</p>
            <Input
              type="number"
              placeholder="1000 cm³"
              onChange={(e) => setEngineSize(Number(e.target.value))}
            ></Input>
          </div>

          <FilterInput
            data={fuel}
            label="Fuel type"
            value={fuelType}
            setValue={setFuelType}
          />

          <div className="flex flex-col gap-5">
            <p className="-mb-4 font-semibold">Milage</p>
            <Input
              type="number"
              placeholder="10000 km"
              onChange={(e) => setMileage(Number(e.target.value))}
            ></Input>
          </div>

          <FilterInput
            data={colors}
            label="Color"
            value={color}
            setValue={setColor}
          />

          <div className="flex flex-col gap-5">
            <p className="-mb-4 font-semibold">Description</p>
            <Input
              placeholder="A short description of the listed car"
              onChange={(e) => setDescription(e.target.value)}
            ></Input>
          </div>
        </CardDescription>
        <CardFooter className="flex justify-between">
          <Button onClick={previous} variant="outline">
            Back
          </Button>
          <Button
            onClick={next}
            disabled={
              !price ||
              !engineSize ||
              !country ||
              !fuelType ||
              !mileage ||
              !color ||
              !description
            }
          >
            Create listing
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
