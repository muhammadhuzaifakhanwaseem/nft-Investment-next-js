"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, Send, Receipt, DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/app/context/UserContext"

export default function TransferLogsPage() {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { token } = useUser();
    useEffect(() => {
        if (!token) return;
        fetchTransferLogs()
    }, [token])

    const fetchTransferLogs = async () => {
        try {
            setLoading(true)
            const response = await fetch("https://stocktitan.site/api/user/transfers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            const result = await response.json()

            if (result.status) {
                setLogs(result.data)
            } else {
                setError(result.message || "Failed to fetch transfer logs")
            }
        } catch (err) {
            setError("Network error occurred")
            console.error("Transfer logs fetch error:", err)
        } finally {
            setLoading(false)
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
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading transfer logs...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <Card className="bg-gray-800 border-gray-700 max-w-md w-full mx-4">
                    <CardContent className="p-6 text-center">
                        <div className="text-red-500 mb-4">
                            <Receipt className="h-12 w-12 mx-auto" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">Error Loading Logs</h2>
                        <p className="text-gray-400 mb-4">{error}</p>
                        <Button onClick={fetchTransferLogs} className="bg-green-600 hover:bg-green-700">
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Transfer Logs</h1>
                        <p className="text-gray-400">View your transaction history</p>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-600/20 rounded-lg">
                                    <Receipt className="h-5 w-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Total Transactions</p>
                                    <p className="text-xl font-semibold text-white">{logs.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600/20 rounded-lg">
                                    <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Total Amount</p>
                                    <p className="text-xl font-semibold text-white">
                                        PKR {formatAmount(logs.reduce((sum, log) => sum + Number.parseFloat(log.amount), 0).toString())}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-600/20 rounded-lg">
                                    <Send className="h-5 w-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Total Charges</p>
                                    <p className="text-xl font-semibold text-white">
                                        PKR {formatAmount(logs.reduce((sum, log) => sum + Number.parseFloat(log.charge), 0).toString())}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transfer Logs */}
                {logs.length === 0 ? (
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-8 text-center">
                            <Receipt className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">No Transfer Logs</h3>
                            <p className="text-gray-400 mb-4">You haven't made any transfers yet.</p>
                            <Link href="/transfer">
                                <Button className="bg-green-600 hover:bg-green-700">Make Your First Transfer</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {logs.map((log) => (
                            <Card key={log.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`p-2 rounded-lg ${log.type === "sent" ? "bg-red-600/20" : "bg-green-600/20"}`}>
                                                <Send
                                                    className={`h-5 w-5 ${log.type === "sent" ? "text-red-500 rotate-45" : "text-green-500 -rotate-45"
                                                        }`}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-white">{log.counterparty}</h3>
                                                    <Badge variant={log.type === "sent" ? "destructive" : "default"} className="text-xs">
                                                        {log.type.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-400 mb-2">Transaction ID: {log.transaction_id}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Clock className="h-3 w-3" />
                                                    {formatDate(log.created_at)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div
                                                className={`text-lg font-semibold ${log.type === "sent" ? "text-red-400" : "text-green-400"}`}
                                            >
                                                {log.type === "sent" ? "-" : "+"}PKR {formatAmount(log.amount)}
                                            </div>
                                            <div className="text-sm text-gray-400">Fee: PKR {formatAmount(log.charge)}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
