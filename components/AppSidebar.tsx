"use client";

import { useSidebar } from "./SidebarProvider";
import { Button } from "./ui/button";

export function AppSidebar() {
const { isOpen, toggle } = useSidebar();

return (
    <div className={`fixed left-0 top-0 z-30 h-screen w-64 transform bg-background shadow-lg transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="flex h-20 items-center justify-between border-b px-6">
        <h2 className="text-xl font-bold">Menu</h2>
        <Button variant="ghost" onClick={toggle}>
        Close
        </Button>
    </div>
    <nav className="p-6">
        {/* Add navigation items here */}
    </nav>
    </div>
);
}

