"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function RegisterForm({ className, ...props }) {

    const searchParams = useSearchParams()
    const referral = searchParams.get("reffered_by")

    const [form, setForm] = useState({
        name: "",
        username: "",
        phone: "",
        password: "",
        password_confirmation: "",
        reffered_by: referral || null
    })

    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})
    const [message, setMessage] = useState(null)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setFieldErrors({ ...fieldErrors, [e.target.name]: null })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)
        setFieldErrors({})

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()

            if (!res.ok) {
                setFieldErrors(data.errors || {})
                throw new Error(data.message || "Registration failed")
            }
            // setMessage(data.message || "✅ Registered successfully!")
            setMessage("✅ Registered successfully!")
            setTimeout(() => {
                redirect('/login')
            }, 2000);
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
                    <CardTitle className="text-xl text-white">Create an Account</CardTitle>
                    <CardDescription className="text-green-400">Register with your mobile number</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            {message && <p className="text-sm text-center text-red-400">{message}</p>}

                            <div>
                                <Label htmlFor="name" className="text-gray-300">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-800/50 border-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <Label htmlFor="username" className="text-gray-300">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-800/50 border-gray-700 text-white"
                                />
                                {fieldErrors.username && <p className="text-sm text-red-400">{fieldErrors.username[0]}</p>}
                            </div>
                            <div>
                                <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-800/50 border-gray-700 text-white"
                                />
                                {fieldErrors.phone && <p className="text-sm text-red-400">{fieldErrors.phone[0]}</p>}
                            </div>
                            <div>
                                <Label htmlFor="password" className="text-gray-300">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-800/50 border-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password_confirmation" className="text-gray-300">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-800/50 border-gray-700 text-white"
                                />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white">
                                {loading ? "Registering..." : "Register"}
                            </Button>
                            <div className="text-center text-sm text-gray-400">
                                Already have an account?{" "}
                                <Link href="/login" className="underline underline-offset-4 text-green-400">Login</Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
