import axios from "axios";
import FormData from "form-data";

export async function POST(req) {
    try {
        const body = await req.json();

        const data = new FormData();
        data.append("name", body.name);
        data.append("phone", body.phone);
        data.append("password", body.password);
        data.append("password_confirmation", body.password_confirmation);
        data.append("username", body.username);

        if (body.reffered_by) {
            data.append("reffered_by", body.reffered_by);
        }

        const response = await axios.post("https://stocktitan.site/api/register", data, {
            headers: {
                ...data.getHeaders(),
            },
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
        });
    } catch (error) {
        const res = error?.response?.data;

        return new Response(
            JSON.stringify({
                status: res?.status || "error",
                message: res?.message || "Registration failed",
                errors: res?.errors || {},
            }),
            {
                status: error?.response?.status || 400,
            }
        );
    }
}
