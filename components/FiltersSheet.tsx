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
import { useSearchParams, useRouter } from "next/navigation";

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

  const router = useRouter();
  const searchParams = useSearchParams();

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

  const createQueryString = (name: string, value: any) => {
    const params = new URLSearchParams(searchParams.toString()); // Use existing params
    if (value === null || value === undefined || value === "") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    return params.toString();
  };

  const onSubmit = () => {
    let newQuery = "";

    newQuery = createQueryString(
      "carType",
      carType !== null ? carType.toString() : null
    );
    newQuery = createQueryString(
      "carBrand",
      carBrand !== null ? carBrand.id.toString() : null
    );
    newQuery = createQueryString(
      "carModel",
      carModel !== null ? carModel.id.toString() : null
    );
    newQuery = createQueryString(
      "priceFrom",
      priceFrom !== null ? priceFrom.toString() : null
    );
    newQuery = createQueryString(
      "priceTo",
      priceTo !== null ? priceTo.toString() : null
    );
    newQuery = createQueryString(
      "yearFrom",
      yearFrom !== null ? yearFrom.toString() : null
    );
    newQuery = createQueryString(
      "yearTo",
      yearTo !== null ? yearTo.toString() : null
    );
    newQuery = createQueryString(
      "engineFrom",
      engineFrom !== null ? engineFrom.toString() : null
    );
    newQuery = createQueryString(
      "engineTo",
      engineTo !== null ? engineTo.toString() : null
    );
    newQuery = createQueryString(
      "country",
      country !== null ? country.id.toString() : null
    );
    newQuery = createQueryString(
      "fuelType",
      fuelType !== null ? fuelType.id.toString() : null
    );
    newQuery = createQueryString(
      "mileageFrom",
      mileageFrom !== null ? mileageFrom.toString() : null
    );
    newQuery = createQueryString(
      "mileageTo",
      mileageTo !== null ? mileageTo.toString() : null
    );
    newQuery = createQueryString(
      "color",
      color !== null ? color.id.toString() : null
    );

    router.push("?" + newQuery);

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
      mileageFrom,
      mileageTo,
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
