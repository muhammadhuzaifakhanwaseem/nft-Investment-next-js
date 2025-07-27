import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await axios.post("https://stocktitan.site/api/login", {
      phone: body.phone,
      password: body.password,
    });

    return new Response(JSON.stringify(response.data), {
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
