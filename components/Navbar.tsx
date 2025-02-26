import { Button } from "./ui/button";
import { NavUser } from "./NavUser";
import Link from "next/link";
import { Car } from "lucide-react";

export function Navbar() {
  return (
    <nav className="z-20 flex h-20 w-full items-center justify-between border border-b px-10 py-4">
      <div className="flex h-full w-full flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-2"
        >
          <Car className="h-12 w-12" />
          <h1 className="text-4xl font-bold">CMP</h1>
        </Link>

        <div className="flex flex-row items-center gap-6">
          <Link
            href="/dashboard"
            className="flex w-full flex-row items-center justify-center gap-2 text-primary"
          >
            Dashboard
          </Link>

          <Link
            href="/listacar"
            className="flex w-full flex-row items-center justify-center gap-2 text-primary"
          >
            <Button className="rounded-xl bg-primary px-8 text-white">
              Sell a Car
            </Button>
          </Link>

          <NavUser />
        </div>
      </div>
    </nav>
  );
}
