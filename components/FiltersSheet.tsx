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
import { getCarBrands, getCarModels } from "@/app/server/listings";
import { countries, fuelTypes as fuel, colors } from "@/constants";
import {
  useQueryStates,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
} from "nuqs";

export function FiltersSheet() {
  // Local state for form inputs
  const [carType, setCarType] = useState<number | null>(null);
  const [carBrand, setCarBrand] = useState<{
    id: number;
    label: string;
  } | null>(null);
  const [carModel, setCarModel] = useState<{
    id: number;
    label: string;
  } | null>(null);
  const [priceFrom, setPriceFrom] = useState<number | null>(null);
  const [priceTo, setPriceTo] = useState<number | null>(null);
  const [yearFrom, setYearFrom] = useState<number | null>(null);
  const [yearTo, setYearTo] = useState<number | null>(null);
  const [engineFrom, setEngineFrom] = useState<number | null>(null);
  const [engineTo, setEngineTo] = useState<number | null>(null);
  const [country, setCountry] = useState<{
    id: number;
    label: string;
  } | null>(null);
  const [fuelType, setFuelType] = useState<{
    id: number;
    label: string;
  } | null>(null);
  const [mileageFrom, setMileageFrom] = useState<number | null>(null);
  const [mileageTo, setMileageTo] = useState<number | null>(null);
  const [color, setColor] = useState<{
    id: number;
    label: string;
  } | null>(null);

  const [carBrands, setCarBrands] = useState<{ id: number; label: string }[]>(
    []
  );
  const [carModels, setCarModels] = useState<{ id: number; label: string }[]>(
    []
  );

  const [, setFilters] = useQueryStates({
    carType: parseAsInteger,
    carBrand: parseAsString,
    carModel: parseAsString,
    priceFrom: parseAsFloat,
    priceTo: parseAsFloat,
    yearFrom: parseAsInteger,
    yearTo: parseAsInteger,
    engineFrom: parseAsFloat,
    engineTo: parseAsFloat,
    country: parseAsInteger,
    fuelType: parseAsInteger,
    mileageFrom: parseAsFloat,
    mileageTo: parseAsFloat,
    color: parseAsInteger,
  });

  useEffect(() => {
    const getData = async () => {
      const brands = await getCarBrands();

      setCarBrands(brands);
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const models = carBrand ? await getCarModels(carBrand) : [];

      setCarModels(models);
    };

    getData();
  }, [carBrand]);

  const onSubmit = async () => {
    console.log(
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
      mileageFrom,
      mileageTo,
      color
    );
    const params = {
      carType,
      carBrand: carBrand?.label,
      carModel: carModel?.label,
      priceFrom,
      priceTo,
      yearFrom,
      yearTo,
      engineFrom,
      engineTo,
      country: country?.id,
      fuelType: fuelType?.id,
      mileageFrom,
      mileageTo,
      color: color?.id,
    };

    console.log(params);

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    console.log(filteredParams);

    await setFilters(filteredParams);
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
            setValueFrom={setMileageFrom}
            setValueTo={setMileageTo}
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
