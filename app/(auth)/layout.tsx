import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex flex-col w-full h-full overflow-hidden">
            <div className="h-screen flex flex-col items-center justify-center">{children}</div>
        </main>
    );
}
