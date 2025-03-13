import { DealerApplicationForm } from "@/components/dealerApplicationForm";

export const metadata = {
  title: "Dealer Application | Car Market",
  description: "Apply to become an authorized dealer on Car Market",
};

export default function DealerApplicationPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Dealer Application
        </h1>
        <p className="text-muted-foreground">
          Complete the form below to apply for a dealership account on Car
          Market.
        </p>
      </div>
      <DealerApplicationForm />
    </div>
  );
}
