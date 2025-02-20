import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FilterInput } from "./ui/filterInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SelectCarProps<T extends Record<number, string>> {
  next: () => void;
  carBrand: T | null;
  setCarBrand: (carBrand: T | null) => void;
  carModel: T | null;
  setCarModel: (carModel: T | null) => void;
  year: number;
  setYear: (year: number) => void;
  title: string;
  setTitle: (title: string) => void;
  carBrands: T[];
  carModels: T[];
  carType: number;
  setCarType: (v: number) => void;
}

export function SelectCar({
  next,
  carBrand,
  setCarBrand,
  carModel,
  setCarModel,
  carType,
  setCarType,
  year,
  setYear,
  title,
  setTitle,
  carBrands,
  carModels,
}: SelectCarProps<{ id: number; label: string }>) {
  return (
    <Card className="w-1/2">
      <CardContent className="relative flex h-full w-full flex-col gap-4">
        <CardHeader>
          <CardTitle>Details about your car</CardTitle>
        </CardHeader>
        <CardDescription className="flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <p className="-mb-4 font-semibold">Title of your listing</p>
            <Input
              placeholder="2023 Toyota Prius"
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col gap-5">
            <p className="-mb-4 font-semibold">Car&apos;s condition</p>
            <div className="flex flex-row gap-4">
              <Button
                variant={carType === 1 ? "default" : "outline"}
                onClick={() => setCarType(1)}
              >
                Used
              </Button>
              <Button
                variant={carType === 2 ? "default" : "outline"}
                onClick={() => setCarType(2)}
              >
                New
              </Button>
            </div>
          </div>

          <FilterInput
            data={carBrands}
            label="Car brand"
            value={carBrand}
            setValue={setCarBrand}
          />

          <FilterInput
            data={carModels}
            label="Car model"
            value={carModel}
            setValue={setCarModel}
          />

          <div className="flex flex-col gap-5">
            <p className="-mb-4 font-semibold">Car&apos;s make year</p>
            <Input
              placeholder="2025"
              type="number"
              onChange={(e) => setYear(Number(e.target.value))}
            ></Input>
          </div>
        </CardDescription>
        <CardFooter className="flex justify-end">
          <Button
            onClick={next}
            disabled={!carBrand || !carModel || !year || !title}
          >
            Continue
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
