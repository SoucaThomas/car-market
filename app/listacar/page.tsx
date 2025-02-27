"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { countries, fuelTypes, colors } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { createListing, getCarBrands, getCarModels } from "../actions";
import { formSchema } from "@/constants";
import { useRouter } from "next/navigation";

export type FormValues = z.infer<typeof formSchema>;

export default function MyForm() {
  const [brands, setBrands] = useState<{ label: string; id: number }[]>([]);
  const [models, setModels] = useState<{ label: string; id: number }[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listingTitle: "",
      year: 0,
      price: 0,
      engineSize: 0,
      description: "",
      carCondtition: "New",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const result = await createListing(values);

      console.log(result);

      toast({
        title: "Form submitted",
        description: "Form submitted successfully",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        title: "Form submission error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    const fetchCarBrands = async () => {
      setBrands(await getCarBrands());
    };

    fetchCarBrands();
  }, []);

  const fetchCarModels = async (brand: { label: string; id: number }) => {
    if (brand) {
      setModels(await getCarModels(brand));
    } else {
      setModels([]);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-xl p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 py-10"
        >
          <FormField
            control={form.control}
            name="listingTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title of your listing</FormLabel>
                <FormControl>
                  <Input placeholder="Toyota Prius" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carCondtition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car&apos;s condition </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="New" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent defaultValue={"New"}>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Car brand</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? brands.find((brand) => brand.label === field.value)
                              ?.label
                          : "Select brand"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search brands..." />
                      <CommandList>
                        <CommandEmpty>No brand found.</CommandEmpty>
                        <CommandGroup>
                          {brands.map((brand) => (
                            <CommandItem
                              value={brand.label}
                              key={brand.label}
                              onSelect={() => {
                                form.setValue("brand", brand.label);

                                fetchCarModels(brand);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  brand.label === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {brand.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Car model</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? models.find((model) => model.label === field.value)
                              ?.label
                          : "Select Model"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search Models..." />
                      <CommandList>
                        <CommandEmpty>No model found.</CommandEmpty>
                        <CommandGroup>
                          {models.map((model) => (
                            <CommandItem
                              value={model.label}
                              key={model.label}
                              onSelect={() => {
                                form.setValue("model", model.label);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  model.label === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {model.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    placeholder="2025"
                    type="number"
                    {...field}
                    value={field.value === 0 ? "" : field.value} // Conditionally set value
                    onChange={(e) => {
                      const parsedValue = Number(e.target.value);
                      field.onChange(isNaN(parsedValue) ? 0 : parsedValue); // Handle NaN
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="$"
                    type="number"
                    {...field}
                    value={field.value === 0 ? "" : field.value} // Conditionally set value
                    onChange={(e) => {
                      const parsedValue = Number(e.target.value);
                      field.onChange(isNaN(parsedValue) ? 0 : parsedValue); // Handle NaN
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Country</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? countries.find(
                              (country) => country.label === field.value
                            )?.label
                          : "Select country"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandList>
                        <CommandEmpty>No contry found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map((country) => (
                            <CommandItem
                              value={country.label}
                              key={country.id}
                              onSelect={() => {
                                form.setValue("country", country.label);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  country.label === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {country.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engineSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Engine size</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1997 cm3"
                    type="number"
                    {...field}
                    value={field.value === 0 ? "" : field.value} // Conditionally set value
                    onChange={(e) => {
                      const parsedValue = Number(e.target.value);
                      field.onChange(isNaN(parsedValue) ? 0 : parsedValue); // Handle NaN
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fuel Type</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? fuelTypes.find((fuel) => fuel.label === field.value)
                              ?.label
                          : "Select fuel type"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search fuel types..." />
                      <CommandList>
                        <CommandEmpty>No fuel type found.</CommandEmpty>
                        <CommandGroup>
                          {fuelTypes.map((fuel) => (
                            <CommandItem
                              value={fuel.label}
                              key={fuel.label}
                              onSelect={() => {
                                form.setValue("fuelType", fuel.label);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  fuel.label === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {fuel.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Color</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? colors.find((color) => color.label === field.value)
                              ?.label
                          : "Select color"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search colors..." />
                      <CommandList>
                        <CommandEmpty>No color found.</CommandEmpty>
                        <CommandGroup>
                          {colors.map((color) => (
                            <CommandItem
                              value={color.label}
                              key={color.id}
                              onSelect={() => {
                                form.setValue("color", color.label);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  color.label === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {color.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>
                  A short description of the listed car
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Pictures"
            render={() => (
              <FormItem>
                <FormLabel>Upload Pictures</FormLabel>
                <FormControl>
                  <div>
                    {form.watch("Pictures")?.map((file, index) => (
                      <Image // ! TODO make it a component
                        key={index}
                        alt="Image uploaded by user"
                        src={file.ufsUrl}
                        width={250}
                        height={250}
                      />
                    ))}

                    <UploadButton
                      endpoint="imageUploader"
                      onUploadError={(error: Error) => {
                        toast({
                          title: "Upload errrr",
                          description: error.message,
                          variant: "destructive",
                        });
                      }}
                      onClientUploadComplete={(files) => {
                        files.map((file) => {
                          console.log(file);
                          form.setValue("Pictures", [
                            ...(form.getValues("Pictures") || []),
                            file,
                          ]);
                        });
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
