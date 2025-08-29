"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUser } from "@/app/context/UserContext"
import DashboardLayout from "@/components/DashboardLayout"

export default function InvestmentLogPage() {
    const [investments, setInvestments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { token } = useUser()
    const fetchInvestments = async () => {
        try {
            setLoading(true)
            setError(null)

            if (!token) {
                throw new Error("Bearer token not configured")
            }

            const response = await fetch("https://stocktitan.site/api/all/investments", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (data.status && data.data?.payments) {
                setInvestments(data.data.payments)
            } else {
                throw new Error(data.message || "Failed to fetch investments")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) return
        fetchInvestments()
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
                return "Active"
            case 0:
                return "Pending"
            case 2:
                return "Processing"
            case -1:
                return "Cancelled"
            default:
                return "Unknown"
        }
    }

    const getPaymentTypeText = (type) => {
        switch (type) {
            case 1:
                return "Investment"
            case 2:
                return "Deposit"
            default:
                return "Other"
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

    const formatAmount = (amount) => {
        return Number.parseFloat(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const totalAmount = investments.reduce((sum, investment) => {
        const amount = Number.parseFloat(investment?.data?.final_amount || 0)
        return sum + amount
    }, 0)

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
                            <h1 className="text-2xl font-bold text-white">Investments</h1>
                            <p className="text-gray-400">View your investment activities</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchInvestments}
                            disabled={loading}
                            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                            Refresh
                        </Button>
                    </div>

                    {!loading && !error && investments.length > 0 && (
                        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-xl border-green-800/50 mb-6">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-400 text-sm font-medium">Total Investment Amount</p>
                                        <p className="text-white text-3xl font-bold">PKR {formatAmount(totalAmount)}</p>
                                    </div>
                                </div>
                                <div className="text-green-400 text-sm">
                                    {investments.length} investment{investments.length !== 1 ? "s" : ""}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Investment Table Card */}
                    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center justify-between">
                                All Investments
                                {!loading && (
                                    <span className="text-sm font-normal text-gray-400">{investments.length} total investments</span>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mr-2" />
                                    <span className="text-gray-400">Loading investments...</span>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <p className="text-red-400 mb-4">{error}</p>
                                    <Button
                                        variant="outline"
                                        onClick={fetchInvestments}
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
                                                <TableHead className="text-gray-300 whitespace-nowrap">Transaction ID</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Plan</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Final Amount</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Type</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Status</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Next Payment</TableHead>
                                                <TableHead className="text-gray-300 whitespace-nowrap">Created</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {investments.map((investment) => (
                                                <TableRow key={investment?.data?.id} className="border-gray-700 hover:bg-gray-800/30">
                                                    <TableCell className="font-medium text-white whitespace-nowrap font-mono text-sm">
                                                        {investment?.data?.transaction_id}
                                                    </TableCell>
                                                    <TableCell className="text-white whitespace-nowrap">
                                                        {investment?.data.plan?.plan_name}
                                                    </TableCell>
                                                    <TableCell className="text-white whitespace-nowrap">
                                                        PKR {formatAmount(investment?.data?.final_amount)}
                                                    </TableCell>
                                                    <TableCell className="text-blue-400 whitespace-nowrap">
                                                        {getPaymentTypeText(investment?.data.payment_type)}
                                                    </TableCell>
                                                    <TableCell
                                                        className={`font-medium ${getStatusColor(investment?.data.payment_status)} whitespace-nowrap`}
                                                    >
                                                        {getStatusText(investment?.data.payment_status)}
                                                    </TableCell>
                                                    <TableCell className="text-gray-400 whitespace-nowrap text-sm">
                                                        {investment?.data.next_payment_date
                                                            ? formatDate(investment?.data.next_payment_date)
                                                            : "Completed"}
                                                    </TableCell>
                                                    <TableCell className="text-gray-400 whitespace-nowrap text-sm">
                                                        {formatDate(investment?.data.created_at)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    {investments.length === 0 && (
                                        <div className="text-center text-gray-400 py-8">No investments found.</div>
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
