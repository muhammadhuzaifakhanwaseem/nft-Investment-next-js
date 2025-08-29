"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RefreshCw, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/app/context/UserContext"
import DashboardLayout from "@/components/DashboardLayout"

export default function TransactionLogPage() {
  const [transactionData, setTransactionData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { token } = useUser()

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
        setTransactionData(data.transactions.data) // ✅ correct mapping
      } else {
        throw new Error(data.message || "Failed to fetch transactions")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return
    fetchTransactions()
  }, [token])

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 1:
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case 0:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case 2:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case -1:
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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

  // ✅ Filter deposits & withdrawals
  const deposits = transactionData.filter((t) => t.type === "+")
  const withdrawals = transactionData.filter((t) => t.type === "-")

  const totalDeposits = deposits.reduce((sum, d) => sum + Number.parseFloat(d.amount), 0)
  const totalWithdrawals = withdrawals.reduce((sum, w) => sum + Number.parseFloat(w.amount), 0)
  const netBalance = totalDeposits - totalWithdrawals

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
              <Activity className="absolute inset-0 m-auto h-6 w-6 text-green-400" />
            </div>
            <p className="text-gray-300 text-lg">Loading transactions...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800/50 rounded-xl"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold text-white">Transaction Log</h1>
          </div>

          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Error Loading Transactions</h3>
              <p className="text-red-400 mb-6">{error}</p>
              <Button onClick={fetchTransactions} className="bg-green-600 hover:bg-green-700 rounded-xl px-6 py-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6 min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 pb-30">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800/50 rounded-xl"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Transaction Log</h1>
              <p className="text-gray-400 mt-1">Track your financial activity</p>
            </div>
          </div>
          <Button
            onClick={fetchTransactions}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800/50 bg-transparent rounded-xl"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm border-green-700/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Total Credits</p>
                  <p className="text-2xl font-bold text-white">PKR {formatAmount(totalDeposits)}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/50 to-red-800/30 backdrop-blur-sm border-red-700/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm font-medium">Total Debits</p>
                  <p className="text-2xl font-bold text-white">PKR {formatAmount(totalWithdrawals)}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm border-blue-700/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Net Balance</p>
                  <p className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-400" : "text-red-400"}`}>
                    PKR {formatAmount(Math.abs(netBalance))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deposits" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 rounded-xl p-1">
            <TabsTrigger
              value="deposits"
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Credits ({deposits.length})
            </TabsTrigger>
            <TabsTrigger
              value="withdrawals"
              className="text-white data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Debits ({withdrawals.length})
            </TabsTrigger>
          </TabsList>

          {/* Credits Tab */}
          <TabsContent value="deposits" className="mt-6">
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl rounded-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Credit Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {deposits.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">No Credit Transactions</h3>
                    <p className="text-gray-500">Your credit transactions will appear here</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700/50 hover:bg-transparent">
                          <TableHead className="text-gray-300 font-semibold">Transaction ID</TableHead>
                          <TableHead className="text-gray-300 font-semibold">Amount</TableHead>
                          <TableHead className="text-gray-300 font-semibold">Details</TableHead>
                          <TableHead className="text-gray-300 font-semibold">Status</TableHead>
                          <TableHead className="text-gray-300 font-semibold">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deposits.map((d) => (
                          <TableRow key={d.id} className="border-gray-700/30 hover:bg-gray-800/30 transition-colors">
                            <TableCell className="text-white font-mono text-sm">{d.trx}</TableCell>
                            <TableCell className="text-green-400 font-semibold">PKR {formatAmount(d.amount)}</TableCell>
                            <TableCell className="text-gray-300">{d.details}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getPaymentStatusColor(d.payment_status)}>
                                {getPaymentStatusText(d.payment_status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">{formatDate(d.created_at)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Debits Tab */}
          <TabsContent value="withdrawals" className="mt-6">
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl rounded-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                  Debit Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {withdrawals.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingDown className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">No Debit Transactions</h3>
                    <p className="text-gray-500">Your debit transactions will appear here</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700/50 hover:bg-transparent">
                          <TableHead className="text-gray-300 font-semibold">Transaction ID</TableHead>
                          <TableHead className="text-gray-300 font-semibold">Amount</TableHead>
                          <TableHead className="text-gray-300 font-semibold">Details</TableHead>
                          <TableHead className="text-gray-300 font-semibold">Status</TableHead>
                          <TableHead className="text-gray-300 font-semibold">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {withdrawals.map((w) => (
                          <TableRow key={w.id} className="border-gray-700/30 hover:bg-gray-800/30 transition-colors">
                            <TableCell className="text-white font-mono text-sm">{w.trx}</TableCell>
                            <TableCell className="text-red-400 font-semibold">PKR {formatAmount(w.amount)}</TableCell>
                            <TableCell className="text-gray-300">{w.details}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getPaymentStatusColor(w.payment_status)}>
                                {getPaymentStatusText(w.payment_status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">{formatDate(w.created_at)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
