'use client';

import { Toaster } from "sonner";
import { SidebarProvider } from "./SidebarProvider";
import { AppSidebar } from "./AppSidebar";
import { SidebarInset } from "./SidebarInset";
import { Navbar } from "./Navbar";

interface ClientLayoutProps {
children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
        <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
            {children}
        </main>
        <Toaster />
        </div>
    </SidebarInset>
    </SidebarProvider>
);
}

