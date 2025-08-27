"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/app/context/UserContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Lock, Shield, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import DashboardLayout from "@/components/DashboardLayout"

export default function ProfilePage() {
    const { token } = useUser()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [form, setForm] = useState({
        oldpassword: "",
        password: "",
        password_confirmation: "",
    })
    const [message, setMessage] = useState(null)

    // ✅ Fetch user profile
    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("https://stocktitan.site/api/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })

                const data = await res.json()
                if (data.status) {
                    setUser(data.data)
                } else {
                    setMessage({ type: "danger", text: "Failed to load profile" })
                }
            } catch (error) {
                setMessage({ type: "danger", text: "Server error" })
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [token])

    // ✅ Handle password change
    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage(null)

        try {
            const res = await fetch("https://stocktitan.site/api/user/password/change", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            })

            const data = await res.json()
            if (res.ok && data.status) {
                setMessage({ type: "success", text: "Password changed successfully!" })
                setForm({ oldpassword: "", password: "", password_confirmation: "" })
            } else {
                setMessage({ type: "danger", text: data.message || "Error updating password" })
            }
        } catch (error) {
            setMessage({ type: "danger", text: "Network error" })
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="flex items-center space-x-2 text-slate-400">
                    <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading profile...</span>
                </div>
            </div>
        )
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 pb-30">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-gray-800/50"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-white">Profile</h1>
                        </div>
                    </div>
                </div>
                {/* Profile Info Card */}
                {user && (
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <User className="w-5 h-5 text-green-500" />
                                Account Information
                            </CardTitle>
                            <CardDescription className="text-slate-400">Your current account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300 text-sm font-medium">User ID</Label>
                                    <div className="px-3 py-2 bg-slate-800 rounded-md border border-slate-700">
                                        <span className="text-slate-200 font-mono">{user.id}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300 text-sm font-medium">Username</Label>
                                    <div className="px-3 py-2 bg-slate-800 rounded-md border border-slate-700">
                                        <span className="text-slate-200">{user.username}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {/* Alert Messages */}
                {message && (
                    <Alert
                        className={`mt-4 ${message.type === "success"
                            ? "bg-green-950 border-green-800 text-green-200"
                            : "bg-red-950 border-red-800 text-red-200"
                            }`}
                    >
                        {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                        <AlertDescription>{message.text}</AlertDescription>
                    </Alert>
                )}
                {/* Change Password Card */}
                <Card className="bg-slate-900 mt-4 border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Shield className="w-5 h-5 text-green-500" />
                            Change Password
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Update your password to keep your account secure
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="oldpassword" className="text-slate-300">
                                    Current Password
                                </Label>
                                <Input
                                    id="oldpassword"
                                    type="password"
                                    value={form.oldpassword}
                                    onChange={(e) => setForm({ ...form, oldpassword: e.target.value })}
                                    required
                                    minLength={6}
                                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500"
                                    placeholder="Enter your current password"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-300">
                                    New Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    minLength={6}
                                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500"
                                    placeholder="Enter your new password"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-slate-300">
                                    Confirm New Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={form.password_confirmation}
                                    onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                                    required
                                    minLength={6}
                                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500"
                                    placeholder="Confirm your new password"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 transition-colors"
                            >
                                <Lock className="w-4 h-4 mr-2" />
                                Update Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
