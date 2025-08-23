"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/app/context/UserContext"
import DashboardLayout from "@/components/DashboardLayout"

export default function TransactionLogPage() {
    const [transactionData, setTransactionData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { token } = useUser();

    const fetchTransactions = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch("https://stocktitan.site/api/user/transactions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (data.status === "success") {
                setTransactionData(data)
            } else {
                throw new Error(data.message || "Failed to fetch transactions")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
            console.error("Error fetching transactions:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) return;
        fetchTransactions()
    }, [token])

    const getPaymentStatusColor = (status) => {
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

    const getPaymentStatusText = (status) => {
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

    const formatAmount = (amount) => {
        return Number.parseFloat(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <RefreshCw className="h-8 w-8 animate-spin text-white" />
                        <span className="ml-2 text-white">Loading transactions...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
                <div className="max-w-6xl mx-auto">
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
                            <h1 className="text-2xl font-bold text-white">Transaction Log</h1>
                            <p className="text-gray-400">View your recent activities</p>
                        </div>
                    </div>

                    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                        <CardContent className="p-6">
                            <div className="text-center">
                                <p className="text-red-400 mb-4">Error: {error}</p>
                                <Button onClick={fetchTransactions} className="bg-green-600 hover:bg-green-700">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Retry
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
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
                            <h1 className="text-2xl font-bold text-white">Transaction Log</h1>
                            <p className="text-gray-400">View your recent activities</p>
                            <Button
                                onClick={fetchTransactions}
                                variant="outline"
                                size="sm"
                                className="border-gray-600 mt-3 text-white hover:bg-gray-800/50 bg-transparent"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                    </div>

                    {/* Transaction Tabs */}
                    <Tabs defaultValue="deposits" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border-gray-700">
                            <TabsTrigger value="deposits" className="text-white data-[state=active]:bg-green-600">
                                Deposits ({transactionData?.deposits.total || 0})
                            </TabsTrigger>
                            <TabsTrigger value="withdrawals" className="text-white data-[state=active]:bg-green-600">
                                Withdrawals ({transactionData?.withdrawals.total || 0})
                            </TabsTrigger>
                        </TabsList>

                        {/* Deposits Tab */}
                        <TabsContent value="deposits">
                            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                                <CardHeader>
                                    <CardTitle className="text-white">Deposit Transactions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-gray-800/50 hover:bg-gray-800/50 border-gray-700">
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Transaction ID</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Amount</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Rate</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Charge</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Final Amount</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Status</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Date</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {transactionData?.deposits.data.map((deposit) => (
                                                    <TableRow key={deposit.id} className="border-gray-700 hover:bg-gray-800/30">
                                                        <TableCell className="font-medium text-white whitespace-nowrap">
                                                            {deposit.transaction_id}
                                                        </TableCell>
                                                        <TableCell className="text-white whitespace-nowrap">
                                                            PKR {formatAmount(deposit.amount)}
                                                        </TableCell>
                                                        <TableCell className="text-white whitespace-nowrap">{formatAmount(deposit.rate)}</TableCell>
                                                        <TableCell className="text-white whitespace-nowrap">
                                                            PKR {formatAmount(deposit.charge)}
                                                        </TableCell>
                                                        <TableCell className="text-white whitespace-nowrap">
                                                            PKR {formatAmount(deposit.final_amount)}
                                                        </TableCell>
                                                        <TableCell
                                                            className={`font-medium ${getPaymentStatusColor(deposit.payment_status)} whitespace-nowrap`}
                                                        >
                                                            {getPaymentStatusText(deposit.payment_status)}
                                                        </TableCell>
                                                        <TableCell className="text-gray-400 whitespace-nowrap">
                                                            {formatDate(deposit.created_at)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    {(!transactionData?.deposits.data || transactionData.deposits.data.length === 0) && (
                                        <div className="text-center text-gray-400 py-8">No deposit transactions found.</div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Withdrawals Tab */}
                        <TabsContent value="withdrawals">
                            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                                <CardHeader>
                                    <CardTitle className="text-white">Withdrawal Transactions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-gray-800/50 hover:bg-gray-800/50 border-gray-700">
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Transaction ID</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Amount</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Charge</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Method ID</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Status</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Date</TableHead>
                                                    <TableHead className="text-gray-300 whitespace-nowrap">Reason</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {transactionData?.withdrawals.data.map((withdrawal) => (
                                                    <TableRow key={withdrawal.id} className="border-gray-700 hover:bg-gray-800/30">
                                                        <TableCell className="font-medium text-white whitespace-nowrap">
                                                            {withdrawal.transaction_id}
                                                        </TableCell>
                                                        <TableCell className="text-white whitespace-nowrap">
                                                            PKR {formatAmount(withdrawal.withdraw_amount)}
                                                        </TableCell>
                                                        <TableCell className="text-white whitespace-nowrap">
                                                            PKR {formatAmount(withdrawal.withdraw_charge)}
                                                        </TableCell>
                                                        <TableCell className="text-white whitespace-nowrap">
                                                            {withdrawal?.withdraw_method?.name}
                                                        </TableCell>
                                                        <TableCell
                                                            className={`font-medium ${getPaymentStatusColor(withdrawal.status)} whitespace-nowrap`}
                                                        >
                                                            {getPaymentStatusText(withdrawal.status)}
                                                        </TableCell>
                                                        <TableCell className="text-gray-400 whitespace-nowrap">
                                                            {formatDate(withdrawal.created_at)}
                                                        </TableCell>
                                                        <TableCell className="text-gray-400 whitespace-nowrap">
                                                            {withdrawal.reason_of_reject || "-"}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    {(!transactionData?.withdrawals.data || transactionData.withdrawals.data.length === 0) && (
                                        <div className="text-center text-gray-400 py-8">No withdrawal transactions found.</div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </DashboardLayout>
    )
}
