import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, Heart } from "lucide-react";
import { NavSearch } from "./NavSearch";
import { NavUser } from "./NavUser";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import { headers } from "next/headers";

export async function Navbar() {
  const session = await auth.api.getSession({ headers: await headers() });

  const user = session?.user as User;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between">
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
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <NavUser user={user} size={9} />
          <Link href="/listacar">
            <Button>Sell your car</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
