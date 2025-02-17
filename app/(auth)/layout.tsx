import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex h-screen flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
}
