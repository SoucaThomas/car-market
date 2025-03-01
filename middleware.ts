import type { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { Role } from "@prisma/client";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !(session.user.role === Role.admin)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/listacar", "/api:uploadthing", "/admin"],
};
