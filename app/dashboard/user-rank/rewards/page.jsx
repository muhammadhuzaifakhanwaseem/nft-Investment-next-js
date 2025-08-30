"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUser } from "@/app/context/UserContext"
import DashboardLayout from "@/components/DashboardLayout"

export default function RankLogPage() {
    const [ranks, setRanks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { token } = useUser();

    const fetchRanks = async () => {
        try {
            setLoading(true)
            setError(null)

            if (!token) throw new Error("Bearer token not configured")

            const response = await fetch("https://stocktitan.site/api/user/rank/logs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

            const data = await response.json()
            setRanks(data?.ranks || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) fetchRanks()
    }, [token])

    const formatAmount = (amount) => {
        return Number.parseFloat(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
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
                            <h1 className="text-2xl font-bold text-white">Rank Progress</h1>
                            <p className="text-gray-400">View your rank achievements and progress</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchRanks}
                            disabled={loading}
                            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                            Refresh
                        </Button>
                    </div>

                    {/* Stats Card */}
                    {!loading && ranks.length > 0 && (
                        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-xl border-green-800/50 mb-6">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-400 text-sm font-medium">Current Rank</p>
                                        <p className="text-white text-3xl font-bold">{ranks[0]?.rank_name}</p>
                                    </div>
                                    <div className="text-green-400 text-sm">
                                        Progress: {ranks[0]?.progress_percent}%
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Rank Table */}
                    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                        <CardHeader>
                            <CardTitle className="text-white">All Ranks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mr-2" />
                                    <span className="text-gray-400">Loading ranks...</span>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <p className="text-red-400 mb-4">{error}</p>
                                    <Button
                                        variant="outline"
                                        onClick={fetchRanks}
                                        className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-800/50 border-gray-700">
                                                <TableHead className="text-gray-300">Rank</TableHead>
                                                <TableHead className="text-gray-300">Level</TableHead>
                                                <TableHead className="text-gray-300">Personal Investment</TableHead>
                                                <TableHead className="text-gray-300">Team Investment</TableHead>
                                                <TableHead className="text-gray-300">Reward</TableHead>
                                                <TableHead className="text-gray-300">Progress</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {ranks.map((rank) => (
                                                <TableRow key={rank.id} className="border-gray-700 hover:bg-gray-800/30">
                                                    <TableCell className="text-white">{rank.rank_name}</TableCell>
                                                    <TableCell className="text-white">{rank.level_number}</TableCell>
                                                    <TableCell className="text-white">PKR {formatAmount(rank.personal_investment)}</TableCell>
                                                    <TableCell className="text-white">PKR {formatAmount(rank.team_investment)}</TableCell>
                                                    <TableCell className="text-green-400">PKR {formatAmount(rank.reward_amount)}</TableCell>
                                                    <TableCell className="text-blue-400">{rank.progress_percent}%</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    {ranks.length === 0 && (
                                        <div className="text-center text-gray-400 py-8">No ranks found.</div>
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
