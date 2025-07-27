"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function LoginForm({ className, ...props }) {
  const router = useRouter()
  const [form, setForm] = useState({ phone: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok || !data.success) throw new Error(data.message)

      // Save token to cookies (valid for 7 days)
      setCookie("auth_token", data.login_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
      })

      // You can store other user data if needed too
      setCookie("user", JSON.stringify(data.user), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
      })

      router.push("/dashboard")
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4", className)} {...props}>
      <Card className="w-full max-w-sm bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">Welcome back</CardTitle>
          <CardDescription className="text-green-400">Login with your mobile number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {message && <p className="text-sm text-red-400 text-center">{message}</p>}
              <div className="grid gap-3">
                <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="03*********"
                  required
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
                {loading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4 text-green-400">Register</Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
