"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import SuccessAlert from "@/components/success-alert"
import { useUser } from "@/app/context/UserContext"
import DashboardLayout from "@/components/DashboardLayout"

export default function page() {
    const [phone, setPhone] = useState("")
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({})
    const { token } = useUser();
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!phone || !amount) {
            setOpen(true)
            setMessage({ title: "Error", desc: "Fill all required fields", type: "error" })
            setTimeout(() => {
                setOpen(false)
            }, 3000);
            return
        }

        if (Number.parseFloat(amount) <= 0) {
            setOpen(true)
            setMessage({ title: "Error", desc: "Amount must be greater than 0", type: "error" })
            setTimeout(() => {
                setOpen(false)
            }, 3000);
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("https://stocktitan.site/api/user/transfer-money", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add authorization header if needed
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    phone,
                    amount: Number.parseFloat(amount),
                }),
            })

            if (response.ok) {
                const result = await response.json()
                setOpen(true)
                setMessage({ title: "Success", desc: "Transfer Successfull", type: "success" })
                setTimeout(() => {
                    setOpen(false)
                }, 3000);
                // Reset form
                setPhone("")
                setAmount("")
            } else {
                const error = await response.json()
                setOpen(true)
                setMessage({ title: "Error", desc: "Transfer failed. Please try again.", type: "error" })
                setTimeout(() => {
                    setOpen(false)
                }, 3000);
            }
        } catch (error) {
            console.error("Transfer error:", error)
            setOpen(true)
            setMessage({ title: "Error", desc: "Transfer failed. Please try again.", type: "error" })
            setTimeout(() => {
                setOpen(false)
            }, 3000);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DashboardLayout>
            <SuccessAlert open={open} message={message} />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 p-4 pb-30">
                <div className="max-w-md mx-auto pt-3">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                    </div>

                    {/* Transfer Form */}
                    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Send className="h-5 w-5 text-green-400" />
                                Send Money
                            </CardTitle>
                            <CardDescription className="text-slate-400">
                                Transfer money to another user by entering their phone and amount
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Phone Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-white">
                                        Recipient Phone *
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="number"
                                        placeholder="Enter recipient's phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-400"
                                        required
                                    />
                                </div>

                                {/* Amount Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="amount" className="text-white">
                                        Amount *
                                    </Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        placeholder="Enter amount to transfer"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-400"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" />
                                            Transfer Money
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Info Card */}
                    <Card className="mt-6 bg-slate-900/30 border-slate-700 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <div className="text-sm text-slate-400 space-y-2">
                                <p>• Transfers are processed immediately</p>
                                <p>• Make sure the recipient phone is correct</p>
                                <p>• Transaction fees may apply</p>
                                <p>• Contact support if you encounter any issues</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
