import { Car, Home, Settings, Store, WalletIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Car Dealerships",
    url: "dealerships",
    icon: Store,
  },
  {
    title: "Sell a Car",
    url: "sell",
    icon: WalletIcon,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="pt-8">
          <SidebarGroupLabel className="mb-8">
            <Link
              href="/"
              className="flex w-full flex-row items-center justify-center gap-2 text-primary"
            >
              <Car className="h-12 w-12" />
              <h1 className="text-4xl font-bold">CMP</h1>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="px-4 py-2">
                  <SidebarMenuButton
                    className="px-4 font-sans text-lg font-medium"
                    asChild
                  >
                    <Link
                      href={item.url}
                      className="flex flex-row items-center gap-2 px-4"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
