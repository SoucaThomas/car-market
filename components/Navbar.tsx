import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Car } from "lucide-react";

export function Navbar() {
    return (
        <nav className="border-b h-24 flex justify-between items-center px-10 py-4">
            <div className="flex flex-row items-center justify-center gap-2 text-primary">
                <Car className="w-12 h-12" />
                <h1 className="text-4xl font-bold">CMP</h1>
            </div>
            <div className="flex flex-row gap-6">
                <Input placeholder="Search" className="w-64 rounded-xl" />
                <Button className="bg-primary text-white rounded-xl px-8">Sell a Car</Button>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
}
