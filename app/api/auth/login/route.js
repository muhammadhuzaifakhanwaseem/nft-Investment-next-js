import axios from "axios";
import { cookies } from "next/headers";
export async function POST(req) {
  try {
    const body = await req.json();
    const response = await axios.post("https://stocktitan.site/api/login", {
      phone: body.phone,
      password: body.password,
    });
    const data = response.data;
    if (data?.login_token) {
      cookies().set("auth_token", data.login_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/", 
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error?.response?.data?.message || "Login failed",
      }),
      { status: 401 }
    );
  }
}
