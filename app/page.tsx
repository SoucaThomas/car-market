import { AlignJustify, Grid2x2 } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CardDisplay } from "@/components/CardDisplay";
export default function Page() {
    return (
        <div className="flex flex-row h-full">
            <div className="flex-1 h-full">
                <section>
                    <div className="flex flex-row gap-2 items-center justify-between p-10">
                        <h1 className="text-2xl font-bold">Car market</h1>
                        <div className="flex flex-row gap-2 items-center">
                            <h2 className="text-sm text-muted-foreground">Sort by</h2>
                            <Select>
                                <SelectTrigger className="w-64 rounded-xl">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price">Price</SelectItem>
                                    <SelectItem value="mileage">Mileage</SelectItem>
                                    <SelectItem value="year">Year</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon">
                                <AlignJustify className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Grid2x2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="grid grid-cols-2 gap-6 p-10">
                    <CardDisplay />
                    <CardDisplay />
                    <CardDisplay />
                    <CardDisplay />
                    <CardDisplay />
                    <CardDisplay />
                    <CardDisplay />
                    <CardDisplay />
                </section>
            </div>
        </div>
    );
}
