"use client"

import { useState } from "react"
import {
    ArrowLeft,
    Users,
    TrendingUp,
    Wallet,
    DollarSign,
    Crown,
    Star,
    Award,
    ChevronDown,
    ChevronRight,
    Eye,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function TeamPage() {
    const [expandedLevel, setExpandedLevel] = useState(null)

    const teamData = {
        level1: {
            totalCommission: 15420.5,
            totalInvestment: 125000.0,
            totalDeposit: 89500.0,
            totalUsers: 24,
            members: [
                { name: "John Smith", investment: 5200, commission: 780, status: "active", avatar: "JS" },
                { name: "Sarah Wilson", investment: 8900, commission: 1245, status: "active", avatar: "SW" },
                { name: "Mike Johnson", investment: 3400, commission: 510, status: "inactive", avatar: "MJ" },
                { name: "Emma Davis", investment: 6700, commission: 890, status: "active", avatar: "ED" },
            ],
        },
        level2: {
            totalCommission: 8750.25,
            totalInvestment: 87500.0,
            totalDeposit: 62300.0,
            totalUsers: 18,
            members: [
                { name: "Alex Brown", investment: 4200, commission: 420, status: "active", avatar: "AB" },
                { name: "Lisa Garcia", investment: 6800, commission: 680, status: "active", avatar: "LG" },
                { name: "David Lee", investment: 2900, commission: 290, status: "active", avatar: "DL" },
                { name: "Maria Rodriguez", investment: 5100, commission: 510, status: "inactive", avatar: "MR" },
            ],
        },
        level3: {
            totalCommission: 4320.75,
            totalInvestment: 54200.0,
            totalDeposit: 38900.0,
            totalUsers: 12,
            members: [
                { name: "Tom Wilson", investment: 3200, commission: 320, status: "active", avatar: "TW" },
                { name: "Anna Taylor", investment: 4500, commission: 450, status: "active", avatar: "AT" },
                { name: "Chris Martin", investment: 2800, commission: 280, status: "active", avatar: "CM" },
                { name: "Sophie Clark", investment: 3900, commission: 390, status: "inactive", avatar: "SC" },
            ],
        },
    }

    const getLevelIcon = (level) => {
        switch (level) {
            case 1:
                return <Crown className="h-5 w-5 text-yellow-400" />
            case 2:
                return <Star className="h-5 w-5 text-green-400" />
            case 3:
                return <Award className="h-5 w-5 text-blue-400" />
            default:
                return null
        }
    }

    const getLevelColor = (level) => {
        switch (level) {
            case 1:
                return "from-yellow-500/20 to-orange-500/20 border-yellow-500/30"
            case 2:
                return "from-green-500/20 to-pink-500/20 border-green-500/30"
            case 3:
                return "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
            default:
                return "from-gray-500/20 to-gray-600/20 border-gray-500/30"
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(amount)
    }

    const toggleLevel = (level) => {
        setExpandedLevel(expandedLevel === level ? null : level)
    }

    const totalStats = {
        totalCommission:
            teamData.level1.totalCommission + teamData.level2.totalCommission + teamData.level3.totalCommission,
        totalInvestment:
            teamData.level1.totalInvestment + teamData.level2.totalInvestment + teamData.level3.totalInvestment,
        totalDeposit: teamData.level1.totalDeposit + teamData.level2.totalDeposit + teamData.level3.totalDeposit,
        totalUsers: teamData.level1.totalUsers + teamData.level2.totalUsers + teamData.level3.totalUsers,
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-gray-800/50"
                        href={'/'}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Team Overview</h1>
                        <p className="text-gray-400">Manage your team performance</p>
                    </div>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                    <DollarSign className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Total Commission</p>
                                    <p className="text-white font-bold text-sm">{formatCurrency(totalStats.totalCommission)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <TrendingUp className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Total Investment</p>
                                    <p className="text-white font-bold text-sm">{formatCurrency(totalStats.totalInvestment)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                    <Wallet className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Total Deposit</p>
                                    <p className="text-white font-bold text-sm">{formatCurrency(totalStats.totalDeposit)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-500/20 rounded-lg">
                                    <Users className="h-4 w-4 text-orange-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Total Users</p>
                                    <p className="text-white font-bold text-sm">{totalStats.totalUsers}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Team Levels */}
                <div className="space-y-6">
                    {[1, 2, 3].map((level) => {
                        const levelKey = `level${level}`
                        const data = teamData[levelKey]
                        const isExpanded = expandedLevel === level

                        return (
                            <Card key={level} className={`bg-gradient-to-r ${getLevelColor(level)} backdrop-blur-xl border`}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-white flex items-center gap-3">
                                            {getLevelIcon(level)}
                                            Level {level} Team
                                            <Badge className="bg-white/20 text-white">{data.totalUsers} members</Badge>
                                        </CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => toggleLevel(level)}
                                            className="text-white hover:bg-white/10"
                                        >
                                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Level Stats */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-white/10 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <DollarSign className="h-4 w-4 text-green-400" />
                                                <span className="text-gray-300 text-sm">Commission</span>
                                            </div>
                                            <p className="text-white font-bold">{formatCurrency(data.totalCommission)}</p>
                                        </div>

                                        <div className="bg-white/10 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <TrendingUp className="h-4 w-4 text-blue-400" />
                                                <span className="text-gray-300 text-sm">Investment</span>
                                            </div>
                                            <p className="text-white font-bold">{formatCurrency(data.totalInvestment)}</p>
                                        </div>

                                        <div className="bg-white/10 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Wallet className="h-4 w-4 text-green-400" />
                                                <span className="text-gray-300 text-sm">Deposit</span>
                                            </div>
                                            <p className="text-white font-bold">{formatCurrency(data.totalDeposit)}</p>
                                        </div>

                                        <div className="bg-white/10 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Users className="h-4 w-4 text-orange-400" />
                                                <span className="text-gray-300 text-sm">Users</span>
                                            </div>
                                            <p className="text-white font-bold">{data.totalUsers}</p>
                                        </div>
                                    </div>

                                    {/* Performance Progress */}
                                    <div className="bg-white/10 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-300 text-sm">Level Performance</span>
                                            <span className="text-white text-sm font-semibold">
                                                {Math.round((data.totalInvestment / 150000) * 100)}%
                                            </span>
                                        </div>
                                        <Progress value={(data.totalInvestment / 150000) * 100} className="h-2" />
                                    </div>

                                    {/* Expanded Member List */}
                                    {isExpanded && (
                                        <div className="bg-white/10 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                Team Members
                                            </h4>
                                            <div className="space-y-3">
                                                {data.members.map((member, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="w-10 h-10">
                                                                <AvatarImage src="/placeholder.svg" />
                                                                <AvatarFallback className="bg-green-600 text-white text-sm">
                                                                    {member.avatar}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-white font-medium">{member.name}</p>
                                                                <div className="flex items-center gap-2">
                                                                    <Badge
                                                                        className={`text-xs ${member.status === "active"
                                                                                ? "bg-green-500/20 text-green-400"
                                                                                : "bg-red-500/20 text-red-400"
                                                                            }`}
                                                                    >
                                                                        {member.status}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-white font-semibold">{formatCurrency(member.investment)}</p>
                                                            <p className="text-green-400 text-sm">+{formatCurrency(member.commission)}</p>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}

                                                {data.totalUsers > 4 && (
                                                    <Button
                                                        variant="outline"
                                                        className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                                                    >
                                                        View All {data.totalUsers} Members
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Team Performance Summary */}
                <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50 mt-8">
                    <CardHeader>
                        <CardTitle className="text-white">Team Performance Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-green-500/10 rounded-lg">
                                <div className="text-2xl font-bold text-green-400 mb-1">
                                    {Math.round((totalStats.totalCommission / totalStats.totalInvestment) * 100)}%
                                </div>
                                <p className="text-gray-400 text-sm">Commission Rate</p>
                            </div>
                            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                                <div className="text-2xl font-bold text-blue-400 mb-1">
                                    {Math.round(totalStats.totalInvestment / totalStats.totalUsers)}
                                </div>
                                <p className="text-gray-400 text-sm">Avg Investment per User</p>
                            </div>
                            <div className="text-center p-4 bg-green-500/10 rounded-lg">
                                <div className="text-2xl font-bold text-green-400 mb-1">
                                    {Math.round((totalStats.totalDeposit / totalStats.totalInvestment) * 100)}%
                                </div>
                                <p className="text-gray-400 text-sm">Deposit to Investment Ratio</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
