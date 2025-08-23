import { NextResponse } from "next/server"

export async function middleware(request) {
  const token = request.cookies.get("auth_token")?.value
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard")
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    try {
      const res = await fetch("https://stocktitan.site/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        return NextResponse.redirect(new URL("/login", request.url))
      }
      const data = await res.json()
      if (!data?.status) {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
  return NextResponse.next()
}