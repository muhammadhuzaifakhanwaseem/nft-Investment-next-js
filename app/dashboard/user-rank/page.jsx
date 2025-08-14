"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Users, Award, RefreshCw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UserRankPage() {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUserRank = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch("https://stocktitan.site/api/user-rank/2300")

            if (!response.ok) {
                throw new Error("Failed to fetch user rank data")
            }

            const result = await response.json()

            if (result.success) {
                setUserData(result.data)
            } else {
                throw new Error("API returned unsuccessful response")
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserRank()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Loading user rank...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-4xl mx-auto">
                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Error Loading Data</CardTitle>
                            <CardDescription>{error}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={fetchUserRank} variant="outline">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">No user data available</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(Number.parseFloat(amount))
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="text-white hover:bg-gray-800/50 p-2 rounded-lg">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl text-white font-bold">User Rank Dashboard</h1>
                        <p className="text-green-400 text-sm">Track your investment progress and ranking</p>
                    </div>
                </div>

                {/* Main Rank Card */}
                <Card className="border-2">
                    <CardHeader className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <Award className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl">{userData.rank_name}</CardTitle>
                        </div>
                        <CardDescription>Level {userData.level_number}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground mb-2">Progress to Next Level</div>
                            <Progress value={Number.parseFloat(userData.progress_percent)} className="h-3" />
                            <div className="text-sm text-muted-foreground mt-1">{userData.progress_percent}% Complete</div>
                        </div>
                    </CardContent>
                </Card>

                {/* Investment Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Personal Investment</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{formatCurrency(userData.personal_investment)}</div>
                            <p className="text-xs text-muted-foreground">Your direct investment</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Team Investment</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{formatCurrency(userData.team_investment)}</div>
                            <p className="text-xs text-muted-foreground">Team contributions</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Reward Amount</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{formatCurrency(userData.reward_amount)}</div>
                            <p className="text-xs text-muted-foreground">Total rewards earned</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Investment Summary</CardTitle>
                        <CardDescription>Overview of your investment activity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Total Investment</div>
                                <div className="text-lg font-semibold">
                                    {formatCurrency(
                                        Number.parseFloat(userData.personal_investment) + Number.parseFloat(userData.team_investment),
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">User ID</div>
                                <div className="text-lg font-semibold">#{userData.user_id}</div>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Account Created:</span>
                                <span>{formatDate(userData.created_at)}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                                <span className="text-muted-foreground">Last Updated:</span>
                                <span>{formatDate(userData.updated_at)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Refresh Button */}
                <div className="text-center">
                    <Button onClick={fetchUserRank} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Data
                    </Button>
                </div>
            </div>
        </div>
    )
}
