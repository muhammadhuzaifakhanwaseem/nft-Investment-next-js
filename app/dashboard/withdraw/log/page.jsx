"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LogPage() {
    const [withdrawals, setWithdrawals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const token = localStorage.getItem("auth_token")
    const logHeadings = ["Transaction ID", "Amount", "Charge", "Method ID", "Status", "Date", "Reason"]

    const fetchWithdrawals = async () => {
        try {
            setLoading(true)
            const response = await fetch("https://stocktitan.site/api/user/withdrawals", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (data.status === "success") {
                setWithdrawals(data.withdrawals.data)
            } else {
                throw new Error(data.message || "Failed to fetch withdrawals")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
            console.error("Error fetching withdrawals:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) return;
        fetchWithdrawals()
    }, [token])

    const getStatusColor = (status) => {
        switch (status) {
            case 1:
                return "text-green-400"
            case 0:
                return "text-yellow-400"
            case 2:
                return "text-blue-400"
            case -1:
                return "text-red-400"
            default:
                return "text-gray-400"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "Approved"
            case 0:
                return "Pending"
            case 2:
                return "Processing"
            case -1:
                return "Rejected"
            default:
                return "Unknown"
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
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
                    <div>
                        <h1 className="text-2xl font-bold text-white">Withdraw Records</h1>
                        <p className="text-gray-400">View your recent withdrawal activities</p>
                        <Button onClick={fetchWithdrawals} disabled={loading} className="ml-auto mt-3 bg-green-600 hover:bg-green-700">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                        </Button>
                    </div>
                </div>

                {/* Log Table Card */}
                <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                    <CardHeader>
                        <CardTitle className="text-white">All Withdrawals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading && (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-green-400" />
                                <span className="ml-2 text-gray-400">Loading withdrawals...</span>
                            </div>
                        )}

                        {error && (
                            <div className="text-center text-red-400 py-8">
                                <p>Error: {error}</p>
                                <Button onClick={fetchWithdrawals} className="mt-4 bg-red-600 hover:bg-red-700">
                                    Try Again
                                </Button>
                            </div>
                        )}

                        {!loading && !error && (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-800/50 hover:bg-gray-800/50 border-gray-700">
                                            {logHeadings.map((heading, index) => (
                                                <TableHead key={index} className="text-gray-300 whitespace-nowrap">
                                                    {heading}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {withdrawals.map((withdrawal) => (
                                            <TableRow key={withdrawal.id} className="border-gray-700 hover:bg-gray-800/30">
                                                <TableCell className="font-medium text-white whitespace-nowrap">
                                                    {withdrawal.transaction_id}
                                                </TableCell>
                                                <TableCell className="text-white whitespace-nowrap">
                                                    PKR {Number.parseFloat(withdrawal.withdraw_amount).toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-white whitespace-nowrap">
                                                    PKR {Number.parseFloat(withdrawal.withdraw_charge).toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-white whitespace-nowrap">
                                                    Method #{withdrawal.withdraw_method_id}
                                                </TableCell>
                                                <TableCell className={`font-medium ${getStatusColor(withdrawal.status)} whitespace-nowrap`}>
                                                    {getStatusText(withdrawal.status)}
                                                </TableCell>
                                                <TableCell className="text-gray-400 whitespace-nowrap">
                                                    {formatDate(withdrawal.created_at)}
                                                </TableCell>
                                                <TableCell className="text-gray-400 whitespace-nowrap">
                                                    {withdrawal.reason_of_reject || "N/A"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        {!loading && !error && withdrawals.length === 0 && (
                            <div className="text-center text-gray-400 py-8">No withdrawal records found.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
