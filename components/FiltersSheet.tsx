"use client";

import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { FilterInput } from "@/components/ui/filterInput";
import { FilterRangeInput } from "@/components/ui/filterRangeInput";
import { getCarBrands, getCarModels } from "@/app/server/listings";
import { countries, fuelTypes as fuel, colors } from "@/constants";
import {
  useQueryStates,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
} from "nuqs";
import type { searchParams } from "@/app/shared/types";
import { updateSearch } from "@/app/server/searchAction";

interface FiltersSheetProps {
  searchParams: Promise<searchParams>;
}

export function FiltersSheet({ searchParams }: FiltersSheetProps) {
  // URL query state with nuqs
  const [queryState, setQueryState] = useQueryStates({
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

  // Local state for filter values
  const [localFilters, setLocalFilters] = useState({
    carType: null as number | null,
    carBrand: null as { id: number; label: string } | null,
    carModel: null as { id: number; label: string } | null,
    priceFrom: null as number | null,
    priceTo: null as number | null,
    yearFrom: null as number | null,
    yearTo: null as number | null,
    engineFrom: null as number | null,
    engineTo: null as number | null,
    country: null as { id: number; label: string } | null,
    fuelType: null as { id: number; label: string } | null,
    mileageFrom: null as number | null,
    mileageTo: null as number | null,
    color: null as { id: number; label: string } | null,
  });

  // Data state
  const [carBrands, setCarBrands] = useState<{ id: number; label: string }[]>(
    []
  );
  const [carModels, setCarModels] = useState<{ id: number; label: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const brands = await getCarBrands();
        setCarBrands(brands);

        const params = await searchParams;

        if (params) {
          setLocalFilters({
            carType: params.carType ?? null,
            carBrand: params.carBrand
              ? { id: -1, label: params.carBrand }
              : null,
            carModel: params.carModel
              ? { id: 0, label: params.carModel }
              : null,
            priceFrom: params.priceFrom ?? null,
            priceTo: params.priceTo ?? null,
            yearFrom: params.yearFrom ?? null,
            yearTo: params.yearTo ?? null,
            engineFrom: params.engineFrom ?? null,
            engineTo: params.engineTo ?? null,
            country: params.country
              ? {
                  id: Number(params.country),
                  label:
                    countries.find((c) => c.id === Number(params.country))
                      ?.label || "",
                }
              : null,
            fuelType: params.fuelType
              ? {
                  id: Number(params.fuelType),
                  label:
                    fuel.find((f) => f.id === Number(params.fuelType))?.label ||
                    "",
                }
              : null,
            mileageFrom: params.mileageFrom ?? null,
            mileageTo: params.mileageTo ?? null,
            color: params.color
              ? {
                  id: Number(params.color),
                  label:
                    colors.find((c) => c.id === Number(params.color))?.label ||
                    "",
                }
              : null,
          });

          setActiveFilterCount(
            Object.values({
              carType: params.carType,
              carBrand: params.carBrand,
              carModel: params.carModel,
              priceFrom: params.priceFrom,
              priceTo: params.priceTo,
              yearFrom: params.yearFrom,
              yearTo: params.yearTo,
              engineFrom: params.engineFrom,
              engineTo: params.engineTo,
              country: params.country,
              fuelType: params.fuelType,
              mileageFrom: params.mileageFrom,
              mileageTo: params.mileageTo,
              color: params.color,
            }).filter((value) => value !== undefined && value !== null).length
          );
        }

        setInitialParamsLoaded(true);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [searchParams]);

  useEffect(() => {
    const fetchModels = async () => {
      if (localFilters.carBrand) {
        setLoading(true);
        try {
          const models = await getCarModels(localFilters.carBrand);
          setCarModels(models);
        } catch (error) {
          console.error("Failed to fetch car models:", error);
          setCarModels([]);
        } finally {
          setLoading(false);
        }
      } else {
        setCarModels([]);
      }
    };

    fetchModels();
  }, [localFilters.carBrand]);

  const updateLocalFilter = (key: keyof typeof localFilters, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = async () => {
    const params = {
      carType: localFilters.carType,
      carBrand: localFilters.carBrand?.label,
      carModel: localFilters.carModel?.label,
      priceFrom: localFilters.priceFrom,
      priceTo: localFilters.priceTo,
      yearFrom: localFilters.yearFrom,
      yearTo: localFilters.yearTo,
      engineFrom: localFilters.engineFrom,
      engineTo: localFilters.engineTo,
      country: localFilters.country?.id,
      fuelType: localFilters.fuelType?.id,
      mileageFrom: localFilters.mileageFrom,
      mileageTo: localFilters.mileageTo,
      color: localFilters.color?.id,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    await setQueryState(filteredParams);

    await updateSearch();

    setIsOpen(false);
  };

  const resetFilters = async () => {
    setLocalFilters({
      carType: null,
      carBrand: null,
      carModel: null,
      priceFrom: null,
      priceTo: null,
      yearFrom: null,
      yearTo: null,
      engineFrom: null,
      engineTo: null,
      country: null,
      fuelType: null,
      mileageFrom: null,
      mileageTo: null,
      color: null,
    });
    await setQueryState({
      carType: null,
      carBrand: null,
      carModel: null,
      priceFrom: null,
      priceTo: null,
      yearFrom: null,
      yearTo: null,
      engineFrom: null,
      engineTo: null,
      country: null,
      fuelType: null,
      mileageFrom: null,
      mileageTo: null,
      color: null,
    });

    await updateSearch();

    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2" />
          Filter
          {activeFilterCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-screen overflow-y-auto">
        <SheetHeader className="text-lg font-bold">
          <SheetTitle>
            Filters
            {activeFilterCount > 0 && ` (${activeFilterCount})`}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-5 flex flex-col gap-5">
          <div className="flex flex-row gap-4">
            <Button
              variant={localFilters.carType === 0 ? "default" : "outline"}
              onClick={() =>
                updateLocalFilter(
                  "carType",
                  localFilters.carType === 0 ? null : 0
                )
              }
            >
              All Cars
            </Button>
            <Button
              variant={localFilters.carType === 1 ? "default" : "outline"}
              onClick={() =>
                updateLocalFilter(
                  "carType",
                  localFilters.carType === 1 ? null : 1
                )
              }
            >
              Used
            </Button>
            <Button
              variant={localFilters.carType === 2 ? "default" : "outline"}
              onClick={() =>
                updateLocalFilter(
                  "carType",
                  localFilters.carType === 2 ? null : 2
                )
              }
            >
              New
            </Button>
          </div>

          <Separator />

          <FilterInput
            data={carBrands}
            label="Car brand"
            value={localFilters.carBrand}
            setValue={(value) => {
              updateLocalFilter("carBrand", value);
              // Clear model when brand changes
              updateLocalFilter("carModel", null);
            }}
            loading={loading && carBrands.length === 0}
          />

          <FilterInput
            data={carModels}
            label="Car model"
            value={localFilters.carModel}
            setValue={(value) => updateLocalFilter("carModel", value)}
            loading={
              loading &&
              localFilters.carBrand !== null &&
              carModels.length === 0
            }
          />

          <Separator />

          <FilterRangeInput
            label="Price"
            setValueFrom={(value) => updateLocalFilter("priceFrom", value)}
            setValueTo={(value) => updateLocalFilter("priceTo", value)}
            valueFrom={localFilters.priceFrom}
            valueTo={localFilters.priceTo}
          />

          <Separator />

          <FilterRangeInput
            label="Year"
            setValueFrom={(value) => updateLocalFilter("yearFrom", value)}
            setValueTo={(value) => updateLocalFilter("yearTo", value)}
            valueFrom={localFilters.yearFrom}
            valueTo={localFilters.yearTo}
          />

          <Separator />

          <FilterInput
            data={countries}
            label="Country"
            value={localFilters.country}
            setValue={(value) => updateLocalFilter("country", value)}
          />

          <Separator />

          <SheetHeader>
            <SheetTitle>Additional filters</SheetTitle>
          </SheetHeader>

          <FilterRangeInput
            label="Engine"
            setValueFrom={(value) => updateLocalFilter("engineFrom", value)}
            setValueTo={(value) => updateLocalFilter("engineTo", value)}
            valueFrom={localFilters.engineFrom}
            valueTo={localFilters.engineTo}
          />

          <FilterInput
            data={fuel}
            label="Fuel"
            value={localFilters.fuelType}
            setValue={(value) => updateLocalFilter("fuelType", value)}
          />

          <FilterRangeInput
            label="Mileage"
            setValueFrom={(value) => updateLocalFilter("mileageFrom", value)}
            setValueTo={(value) => updateLocalFilter("mileageTo", value)}
            valueFrom={localFilters.mileageFrom}
            valueTo={localFilters.mileageTo}
          />

          <FilterInput
            data={colors}
            label="Color"
            value={localFilters.color}
            setValue={(value) => updateLocalFilter("color", value)}
          />

          <Separator />

          <div className="mt-2 flex flex-row justify-between gap-2">
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              Reset
            </Button>
            <Button onClick={applyFilters} className="flex-1">
              <Filter className="mr-2" />
              Apply filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
