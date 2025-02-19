"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { FilterInput } from "./ui/filterInput";
import { FilterRangeInput } from "./ui/filterRangeInput";
import { getCarBrands, getCarModels } from "@/app/actions";
import { countries, fuel, colors } from "@/constants";

export function FiltersSheet() {
  const [carType, setCarType] = useState(null);
  const [carBrand, setCarBrand] = useState(null);
  const [carModel, setCarModel] = useState(null);
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);
  const [yearFrom, setYearFrom] = useState(null);
  const [yearTo, setYearTo] = useState(null);
  const [engineFrom, setEngineFrom] = useState(null);
  const [engineTo, setEngineTo] = useState(null);
  const [country, setCountry] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [milageFrom, setMilageFrom] = useState(null);
  const [milageTo, setMilageTo] = useState(null);
  const [color, setColor] = useState(null);

  const [carBrands, setCarBrands] = useState<{ id: number; label: string }[]>(
    []
  );
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const brands = await getCarBrands();

      setCarBrands(brands);
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const models = await getCarModels(carBrand);

      setCarModels(models);
    };

    getData();
  }, [carBrand]);

  const onSubmit = () => {
    console.log({
      carType,
      carBrand,
      carModel,
      priceFrom,
      priceTo,
      yearFrom,
      yearTo,
      engineFrom,
      engineTo,
      country,
      fuelType,
      milageFrom,
      milageTo,
      color,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Filter />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-screen overflow-y-scroll">
        <SheetHeader className="text-lg font-bold">
          <SheetTitle>Filters 4</SheetTitle>
        </SheetHeader>

        <div className="mt-5 flex flex-col gap-5">
          <div className="flex flex-row gap-4">
            <Button
              variant={carType === 0 ? "default" : "outline"}
              onClick={() => setCarType(0)}
            >
              All Cars
            </Button>
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

          <Separator />

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

          <Separator />

          <FilterRangeInput
            label="Price"
            setValueFrom={setPriceFrom}
            setValueTo={setPriceTo}
          />

          <Separator />

          <FilterRangeInput
            label="Year"
            setValueFrom={setYearFrom}
            setValueTo={setYearTo}
          />
          <Separator />

          <FilterInput
            data={countries}
            label="Country"
            value={country}
            setValue={setCountry}
          />

          <Separator />

          <SheetHeader>
            <SheetTitle>Additional filters</SheetTitle>
          </SheetHeader>

          <FilterRangeInput
            label="Engine"
            setValueFrom={setEngineFrom}
            setValueTo={setEngineTo}
          />

          <FilterInput
            data={fuel}
            label="Fuel"
            value={fuelType}
            setValue={setFuelType}
          />

          <FilterRangeInput
            label="Milage"
            setValueFrom={setMilageFrom}
            setValueTo={setMilageTo}
          />

          <FilterInput
            data={colors}
            label="Color"
            value={color}
            setValue={setColor}
          />

          <Separator />

          <div className="flex flex-row justify-center">
            <Button onClick={onSubmit}>
              <Filter />
              Apply filter
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
