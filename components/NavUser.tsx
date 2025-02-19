"use client";

import { BadgeCheck, LogOut, Sparkles } from "lucide-react";
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
import { authClient } from "@/lib/auth-client";
import { User } from "@/auth";

interface Session {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export function NavUser() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const response = await authClient.getSession();

      if (!response.data) {
        setLoading(false);
        return;
      }

      setSession(response.data.session);
      setUser(response.data.user);

      setLoading(false);
    };

    fetchSession();
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton className="h-10 w-24 rounded-xl" />
      ) : (
        <>
          {user ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-12 w-12 rounded-full">
                  <AvatarImage src={user.image || ""} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
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
                  <DropdownMenuItem>
                    <Sparkles />
                    Become a Dealer
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
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
