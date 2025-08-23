import { cookies } from "next/headers"

export async function POST() {
    cookies().delete("auth_token")
    cookies().delete("user")
    return Response.json({ success: true })
}