"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUser } from "@/app/context/UserContext"
import DashboardLayout from "@/components/DashboardLayout"

export default function Referral() {
    const [commissions, setCommissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { token } = useUser();

    const fetchCommissions = async () => {
        try {
            setLoading(true)
            setError(null)

            if (!token) {
                throw new Error("Bearer token not configured")
            }

            const response = await fetch("https://stocktitan.site/api/user/referred-commission/logs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (data) {
                setCommissions(data?.data || [])
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) return;
        fetchCommissions()
    }, [token])

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatAmount = (amount) => {
        return Number.parseFloat(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const totalInterest = commissions.reduce(
        (sum, ref) => sum + (Number(ref?.amount) || 0),
        0
    );

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
                            <h1 className="text-2xl font-bold text-white">Referral Commissions</h1>
                            <p className="text-gray-400">View your earned referral commissions</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchCommissions}
                            disabled={loading}
                            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                            Refresh
                        </Button>
                    </div>

                    {!loading && commissions.length > 0 && (
                        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-xl border-green-800/50 mb-6">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-400 text-sm font-medium">Referral Commission Amount</p>
                                        <p className="text-white text-3xl font-bold">PKR {formatAmount(totalInterest)}</p>
                                    </div>
                                </div>
                                <div className="text-green-400 text-sm">
                                    {commissions.length} Commission{commissions.length !== 1 ? "s" : ""}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Commissions Table Card */}
                    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center justify-between">
                                All Referral Commissions
                                {!loading && (
                                    <span className="text-sm font-normal text-gray-400">{commissions.length} total records</span>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mr-2" />
                                    <span className="text-gray-400">Loading commissions...</span>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <p className="text-red-400 mb-4">{error}</p>
                                    <Button
                                        variant="outline"
                                        onClick={fetchCommissions}
                                        className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-800/50 hover:bg-gray-800/50 border-gray-700">
                                                <TableHead className="text-gray-300 whitespace-nowrap">ID</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Referred By</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Referred To</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Purpose</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Amount</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Created At</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {commissions.map((c) => (
                                                <TableRow key={c.id} className="border-gray-700 hover:bg-gray-800/30">
                                                    <TableCell className="font-medium text-white">{c.id}</TableCell>
                                                    <TableCell className="text-white">{c.reffered_by_username}</TableCell>
                                                    <TableCell className="text-white">{c.reffered_to_username}</TableCell>
                                                    <TableCell className="text-gray-300">{c.purpouse}</TableCell>
                                                    <TableCell className="text-green-400 font-semibold">PKR {formatAmount(c.amount)}</TableCell>
                                                    <TableCell className="text-gray-400 text-sm">{formatDate(c.created_at)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    {commissions.length === 0 && (
                                        <div className="text-center text-gray-400 py-8">No referral commissions found.</div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
