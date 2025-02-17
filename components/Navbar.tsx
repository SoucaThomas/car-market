import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Car } from "lucide-react";
import { NavUser } from "./NavUser";
import Link from "next/link";

export async function Navbar() {
  return (
    <nav className="flex h-20 items-center justify-between border-b px-10 py-4">
      <Link
        href="/"
        className="flex flex-row items-center justify-center gap-2 text-primary"
      >
        <Car className="h-12 w-12" />
        <h1 className="text-4xl font-bold">CMP</h1>
      </Link>
      <div className="flex flex-row items-center justify-center gap-6">
        <Input placeholder="Search" className="w-64 rounded-xl" />
        <Button className="rounded-xl bg-primary px-8 text-white">
          Sell a Car
        </Button>

        <NavUser />
      </div>
    </nav>
  );
}
