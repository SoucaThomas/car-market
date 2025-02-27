import { z } from "zod";

export const formSchema = z.object({
  listingTitle: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." }),
  carCondtition: z
    .string()
    .min(1, { message: "Car condtion must be selected." }),
  brand: z.string().min(1, { message: "Brand must be selected." }),
  model: z.string().min(1, { message: "Model must be selected." }),
  year: z.number().min(1900).max(new Date().getFullYear()),
  price: z.number().min(0).min(1, { message: "Price must be set." }),
  country: z.string().min(1, { message: "Country must be selected." }),
  engineSize: z.number().min(0),
  fuelType: z.string().min(1, { message: "Fuel type must be selected." }),
  color: z.string().min(1, { message: "Color must be selected." }),
  description: z.string().min(10),
  Pictures: z.array(
    z.object({
      url: z.string(),
      key: z.string(),
      name: z.string(),
      type: z.string(),
      size: z.number(),
      ufsUrl: z.string(),
    }),
    { message: "At least one picture must be uploaded." }
  ),
});

export const countries = [
  {
    label: "Andorra",
    code: "AD",
    id: 1,
  },
  {
    label: "Albania",
    code: "AL",
    id: 2,
  },
  {
    label: "Austria",
    code: "AT",
    id: 3,
  },
  {
    label: "Åland Islands",
    code: "AX",
    id: 4,
  },
  {
    label: "Bosnia and Herzegovina",
    code: "BA",
    id: 5,
  },
  {
    label: "Belgium",
    code: "BE",
    id: 6,
  },
  {
    label: "Bulgaria",
    code: "BG",
    id: 7,
  },
  {
    label: "Belarus",
    code: "BY",
    id: 8,
  },
  {
    label: "Switzerland",
    code: "CH",
    id: 9,
  },
  {
    label: "Cyprus",
    code: "CY",
    id: 10,
  },
  {
    label: "Czech Republic",
    code: "CZ",
    id: 11,
  },
  {
    label: "Germany",
    code: "DE",
    id: 12,
  },
  {
    label: "Denmark",
    code: "DK",
    id: 13,
  },
  {
    label: "Estonia",
    code: "EE",
    id: 14,
  },
  {
    label: "Spain",
    code: "ES",
    id: 15,
  },
  {
    label: "Finland",
    code: "FI",
    id: 16,
  },
  {
    label: "Faroe Islands",
    code: "FO",
    id: 17,
  },
  {
    label: "France",
    code: "FR",
    id: 18,
  },
  {
    label: "United Kingdom",
    code: "GB",
    id: 19,
  },
  {
    label: "Guernsey",
    code: "GG",
    id: 20,
  },
  {
    label: "Greece",
    code: "GR",
    id: 21,
  },
  {
    label: "Croatia",
    code: "HR",
    id: 22,
  },
  {
    label: "Hungary",
    code: "HU",
    id: 23,
  },
  {
    label: "Ireland",
    code: "IE",
    id: 24,
  },
  {
    label: "Isle of Man",
    code: "IM",
    id: 25,
  },
  {
    label: "Iceland",
    code: "IC",
    id: 26,
  },
  {
    label: "Italy",
    code: "IT",
    id: 27,
  },
  {
    label: "Jersey",
    code: "JE",
    id: 28,
  },
  {
    label: "Liechtenstein",
    code: "LI",
    id: 29,
  },
  {
    label: "Lithuania",
    code: "LT",
    id: 30,
  },
  {
    label: "Luxembourg",
    code: "LU",
    id: 31,
  },
  {
    label: "Latvia",
    code: "LV",
    id: 32,
  },
  {
    label: "Monaco",
    code: "MC",
    id: 33,
  },
  {
    label: "Moldova, Republic of",
    code: "MD",
    id: 34,
  },
  {
    label: "Macedonia, The Former Yugoslav Republic of",
    code: "MK",
    id: 35,
  },
  {
    label: "Malta",
    code: "MT",
    id: 36,
  },
  {
    label: "Netherlands",
    code: "NL",
    id: 37,
  },
  {
    label: "Norway",
    code: "NO",
    id: 38,
  },
  {
    label: "Poland",
    code: "PL",
    id: 39,
  },
  {
    label: "Portugal",
    code: "PT",
    id: 40,
  },
  {
    label: "Romania",
    code: "RO",
    id: 41,
  },
  {
    label: "Russian Federation",
    code: "RU",
    id: 42,
  },
  {
    label: "Sweden",
    code: "SE",
    id: 43,
  },
  {
    label: "Slovenia",
    code: "SI",
    id: 44,
  },
  {
    label: "Svalbard and Jan Mayen",
    code: "SJ",
    id: 45,
  },
  {
    label: "Slovakia",
    code: "SK",
    id: 46,
  },
  {
    label: "San Marino",
    code: "SM",
    id: 47,
  },
  {
    label: "Ukraine",
    code: "UA",
    id: 48,
  },
  {
    label: "Holy See (Vatican City State)",
    code: "VA",
    id: 49,
  },
];

export const fuelTypes = [
  {
    id: 1,
    label: "CNG",
  },
  {
    id: 2,
    label: "Diesel",
  },
  {
    id: 3,
    label: "Electricity",
  },
  {
    id: 6,
    label: "Gasoline or E85",
  },
  {
    id: 7,
    label: "Gasoline or natural gas",
  },
  {
    id: 8,
    label: "Gasoline or propane",
  },
  {
    id: 9,
    label: "Hydrogen",
  },
  {
    id: 10,
    label: "Midgrade",
  },
  {
    id: 11,
    label: "Premium",
  },
  {
    id: 12,
    label: "Premium and Electricity",
  },
  {
    id: 13,
    label: "Premium Gas or Electricity",
  },
  {
    id: 14,
    label: "Premium or E85",
  },
  {
    id: 15,
    label: "Regular",
  },
  {
    id: 16,
    label: "Regular Gas and Electricity",
  },
  {
    id: 17,
    label: "Regular Gas or Electricity",
  },
];

export const colors = [
  {
    id: 1,
    label: "White",
  },
  {
    id: 2,
    label: "Black",
  },
  {
    id: 3,
    label: "Gray",
  },
  {
    id: 4,
    label: "Silver",
  },
  {
    id: 5,
    label: "Red",
  },
  {
    id: 6,
    label: "Blue",
  },
  {
    id: 7,
    label: "Brown",
  },
  {
    id: 8,
    label: "Green",
  },
  {
    id: 9,
    label: "Beige",
  },
  {
    id: 10,
    label: "Yellow",
  },
  {
    id: 11,
    label: "Gold",
  },
  {
    id: 12,
    label: "Orange",
  },
  {
    id: 13,
    label: "Purple",
  },
  {
    id: 14,
    label: "Pink",
  },
  {
    id: 15,
    label: "Maroon",
  },
  {
    id: 16,
    label: "Navy",
  },
];
