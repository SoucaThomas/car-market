import {
  Car,
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Store,
  WalletIcon,
} from "lucide-react";
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

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Car Dealerships",
    url: "#",
    icon: Store,
  },
  {
    title: "Sell a Car",
    url: "#",
    icon: WalletIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="pt-8">
          <SidebarGroupLabel className="mb-8">
            <div className="flex flex-row items-center justify-center gap-2 text-primary w-full">
              <Car className="w-12 h-12" />
              <h1 className="text-4xl font-bold">CMP</h1>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="px-4 py-2">
                  <SidebarMenuButton
                    className="text-lg font-medium font-sans px-4"
                    asChild
                  >
                    <a
                      href={item.url}
                      className="flex flex-row items-center gap-2 px-4"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
