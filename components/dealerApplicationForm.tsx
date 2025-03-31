"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { submitDealerApplication } from "@/app/server/dealer";
import { toast } from "@/hooks/use-toast";
import { ApplicationStatus } from "@prisma/client";

const dealerFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),

  // Business Information
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  businessType: z.enum(["individual", "llc", "corporation", "partnership"]),
  taxId: z.string().min(9, "Please enter a valid Tax ID / EIN"),
  yearEstablished: z.date().optional(),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  // Address
  streetAddress: z.string().min(5, "Please enter a valid street address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),

  // Dealership Details
  inventorySize: z.enum(["1-10", "11-50", "51-100", "100+"]),
  specialties: z.string().optional(),

  // Terms
  termsAgreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

type DealerFormValues = z.infer<typeof dealerFormSchema>;

export function DealerApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DealerFormValues>({
    resolver: zodResolver(dealerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      businessName: "",
      businessType: "individual",
      taxId: "",
      website: "",
      streetAddress: "",
      city: "",
      state: "",
          zipCode: "",
          inventorySize: "1-10",
          specialties: "",
          //@ts-expect-error termsAgreed is a boolean in the form but needs to be literal true in schema
          termsAgreed: false,
    },
  });

  async function onSubmit(data: DealerFormValues) {
    setIsSubmitting(true);
    try {
      const submissionData = {
        businessName: data.businessName,
        businessEmail: data.email,
        businessType: data.businessType,
        taxId: data.taxId,
        yearEstablished: data.yearEstablished || null,
        website: data.website || null,
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        inventorySize: data.inventorySize,
        specialties: data.specialties || "",
        status: ApplicationStatus.pending,
        createdAt: new Date(),
        termsAgreed: data.termsAgreed,
      };

      await submitDealerApplication(submissionData);

      toast({
        title: "Application Submitted",
        description:
          "Your dealer application has been submitted successfully. We'll review it and get back to you soon.",
      });

      form.reset();
      window.location.href = "/dealerships";
    } catch (error) {
      console.log(error);
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Please provide your personal contact information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Tell us about your dealership business.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Auto Sales" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">
                          Individual / Sole Proprietor
                        </SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID / EIN</FormLabel>
                    <FormControl>
                      <Input placeholder="XX-XXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="yearEstablished"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Year Established</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      When was your dealership established?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>
              Provide your dealership&apos;s physical address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="sm:col-span-1">
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dealership Details</CardTitle>
            <CardDescription>
              Tell us more about your dealership operations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="inventorySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inventory Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inventory size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 vehicles</SelectItem>
                      <SelectItem value="11-50">11-50 vehicles</SelectItem>
                      <SelectItem value="51-100">51-100 vehicles</SelectItem>
                      <SelectItem value="100+">100+ vehicles</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    How many vehicles do you typically have in inventory?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialties (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Luxury vehicles, classic cars, imports, etc."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What types of vehicles do you specialize in?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
            <CardDescription>
              Please review and agree to our terms and conditions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="termsAgreed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I agree to the terms and conditions</FormLabel>
                    <FormDescription>
                      By checking this box, you agree to our{" "}
                      <a href="/terms" className="text-primary underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-primary underline">
                        Privacy Policy
                      </a>
                      .
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
