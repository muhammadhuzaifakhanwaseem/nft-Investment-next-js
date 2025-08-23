import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import axios from "axios"

export async function GET() {
  try {
    const token = cookies().get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const res = await axios.get("https://stocktitan.site/api/user", {
      headers: { Authorization: `Bearer ${token}` }
    })

    return NextResponse.json({
      user: { ...res.data.user, login_token: token }
    })
  } catch {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
