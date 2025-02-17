import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { NavUser } from "./NavUser";

export async function Navbar() {
  return (
    <nav className="z-20 flex h-20 items-center justify-between border-b px-10 py-4">
      <div className="flex w-full flex-row items-center justify-between gap-6">
        <Input placeholder="Search" className="w-64 rounded-xl" />

        <div className="flex flex-row items-center gap-6">
          <Button className="rounded-xl bg-primary px-8 text-white">
            Sell a Car
          </Button>

          <NavUser />
        </div>
      </div>
    </nav>
  );
}
