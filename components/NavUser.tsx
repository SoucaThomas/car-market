"use client";

import { BadgeCheck, LogOut, Sparkles, Wrench } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { redirect } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { UserAvatar } from "./ui/userAvatar";
import { User } from "@prisma/client";

export function NavUser({
  user,
  isPending,
  size,
}: {
  user: User;
  isPending?: boolean;
  size?: number;
}) {
  return (
    <>
      {isPending ? (
        <Skeleton className="h-10 w-24 rounded-xl bg-muted" />
      ) : (
        <>
          {user ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  <UserAvatar user={user} size={size} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={"right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.image || ""} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => redirect("/admin")}>
                    <Wrench />
                    Admin Panel
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Become a Dealer
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => redirect("/dashboard")}>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      await authClient.signOut();
                      redirect("/");
                    }}
                  >
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                redirect("/sign-up");
              }}
              className="h-10 w-24 rounded-xl"
            >
              Sign up
            </Button>
          )}
        </>
      )}
    </>
  );
}
