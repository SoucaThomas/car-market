"use client";

import { SelectCar } from "@/components/SelectCar";
import { DescriptionCar } from "@/components/DescriptionCar";
import { useEffect, useState } from "react";
import { createCarListing, getCarBrands, getCarModels } from "../actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

enum States {
  SELECTCAR,
  UPLOADPICTURES,
  DESCRIPTION,
}

export default function ListACar() {
  const [state, setState] = useState<States>(States.SELECTCAR);
  const router = useRouter();

  const [carBrand, setCarBrand] = useState<{ id: number; label: string }>(null);
  const [carModel, setCarModel] = useState<{ id: number; label: string }>(null);
  const [carType, setCarType] = useState<number>(2);
  const [year, setYear] = useState<number>(2000);
  const [title, setTitle] = useState<string>("");
  const [carBrands, setCarBrands] = useState<{ id: number; label: string }[]>(
    []
  );
  const [carModels, setCarModels] = useState<{ id: number; label: string }[]>(
    []
  );
  const [price, setPrice] = useState<number>(0);
  const [engineSize, setEngineSize] = useState<number>(0);
  const [country, setCountry] = useState<{ id: number; label: string }>(null);
  const [fuelType, setFuelType] = useState<{ id: number; label: string }>(null);
  const [mileage, setMileage] = useState<number>(0);
  const [color, setColor] = useState<{ id: number; label: string }>(null);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const brands = await getCarBrands();

      setCarBrands(brands);
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setCarModel(null);
      const models = await getCarModels(carBrand);

      setCarModels(models);
    };

    getData();
  }, [carBrand]);

  const createListing = async () => {
    const listing = {
      carBrand: carBrand.label,
      carModel: carModel.label,
      condition: carType === 1 ? "New" : "Used",
      year,
      title,
      price,
      engineSize,
      country: country.label,
      fuelType: fuelType.label,
      mileage,
      color: color.label,
      description,
    };

    try {
      await createCarListing(listing);

      toast({
        title: "Success",
        description: "Listing created",
        duration: 5000,
      });

      router.push("/dashboard");
    } catch (e) {
      console.log(e);
      toast({
        title: "Error",
        description: "Failed to create listing",
        duration: 5000,
      });
    }
  };

  const next = () => {
    if (state === States.SELECTCAR) setState(States.UPLOADPICTURES);
    else if (state === States.UPLOADPICTURES) setState(States.DESCRIPTION);
    else if (state === States.DESCRIPTION) createListing();
  };

  const previous = () => {
    if (state === States.UPLOADPICTURES) setState(States.SELECTCAR);
    else if (state === States.DESCRIPTION) setState(States.UPLOADPICTURES);
  };

  return (
    <main className="mx-auto flex h-screen w-full max-w-screen-2xl items-center justify-center gap-2 p-10">
      {state === States.SELECTCAR && (
        <SelectCar
          next={next}
          carBrand={carBrand}
          setCarBrand={setCarBrand}
          carModel={carModel}
          setCarModel={setCarModel}
          carType={carType}
          setCarType={setCarType}
          year={year}
          setYear={setYear}
          title={title}
          setTitle={setTitle}
          carBrands={carBrands}
          carModels={carModels}
        />
      )}
      {state === States.UPLOADPICTURES && (
        <div>
          Upload Pictures<button onClick={next}>next</button>
        </div>
      )}
      {state === States.DESCRIPTION && (
        <DescriptionCar
          next={next}
          previous={previous}
          price={price}
          setPrice={setPrice}
          engineSize={engineSize}
          setEngineSize={setEngineSize}
          country={country}
          setCountry={setCountry}
          fuelType={fuelType}
          setFuelType={setFuelType}
          mileage={mileage}
          setMileage={setMileage}
          color={color}
          setColor={setColor}
          description={description}
          setDescription={setDescription}
        />
      )}
    </main>
  );
}
