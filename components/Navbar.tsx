import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Heart, User } from "lucide-react";
import { NavSearch } from "./NavSearch";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-6 w-6" />
            <span className="hidden text-xl font-bold sm:inline-block">
              CarMarket
            </span>
          </Link>
        </div>

        <div className="hidden md:flex md:w-1/3 lg:w-1/2">
          <NavSearch />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button>Sell your car</Button>
        </div>
      </div>
    </header>
  );
}
