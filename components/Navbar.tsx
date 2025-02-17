import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navbar() {
  return (
    <nav className="border-b h-24 flex justify-between items-center px-10 py-4">
      <Input placeholder="Search" className="w-full max-w-md rounded-xl" />
      <div className="flex flex-row gap-2">
        <Button className="bg-primary text-white rounded-xl px-8">
          Sell a Car
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
