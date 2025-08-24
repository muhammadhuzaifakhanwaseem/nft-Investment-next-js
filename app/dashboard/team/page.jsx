"use client"

import { useState, useEffect } from "react"
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
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import { useUser } from "@/app/context/UserContext"

export default function TeamPage() {
  const [expandedLevel, setExpandedLevel] = useState(null)
  const [teamData, setTeamData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useUser();

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("https://stocktitan.site/api/team-details", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const json = await res.json()

        if (json.status) {
          setTeamData({
            level1: {
              totalCommission: json.data.level_1.total_commission || 0,
              totalInvestment: json.data.level_1.total_investment || 0,
              totalDeposit: json.data.level_1.total_deposit || 0,
              totalUsers: json.data.level_1.members_count || 0,
              members: json.data.level_1.users.map((user) => ({
                id: user.id,
                name: user.fname && user.lname ? `${user.fname} ${user.lname}` : user.username,
                username: user.username,
                avatar: user.username.substring(0, 2).toUpperCase(),
                status: user.status === 1 ? "active" : "inactive",
                balance: Number.parseFloat(user.balance),
                investment: 0,
                commission: 0,
              })),
            },
            level2: {
              totalCommission: json.data.level_2.total_commission || 0,
              totalInvestment: json.data.level_2.total_investment || 0,
              totalDeposit: json.data.level_2.total_deposit || 0,
              totalUsers: json.data.level_2.members_count || 0,
              members: json.data.level_2.users.map((user) => ({
                id: user.id,
                name: user.fname && user.lname ? `${user.fname} ${user.lname}` : user.username,
                username: user.username,
                avatar: user.username.substring(0, 2).toUpperCase(),
                status: user.status === 1 ? "active" : "inactive",
                balance: Number.parseFloat(user.balance),
                investment: 0,
                commission: 0,
              })),
            },
            level3: {
              totalCommission: json.data.level_3.total_commission || 0,
              totalInvestment: json.data.level_3.total_investment || 0,
              totalDeposit: json.data.level_3.total_deposit || 0,
              totalUsers: json.data.level_3.members_count || 0,
              members: json.data.level_3.users.map((user) => ({
                id: user.id,
                name: user.fname && user.lname ? `${user.fname} ${user.lname}` : user.username,
                username: user.username,
                avatar: user.username.substring(0, 2).toUpperCase(),
                status: user.status === 1 ? "active" : "inactive",
                balance: Number.parseFloat(user.balance),
                investment: 0,
                commission: 0,
              })),
            },
            summary: json.data.summary,
            totalTeam: json.data.total_team,
          })
        } else {
          throw new Error(json.message || "Failed to fetch team data")
        }
      } catch (err) {
        console.error("Error fetching team data", err)
        setError(err ? err.message : "An error occurred while fetching team data")
      } finally {
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [])

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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount)

  const safePercentage = (numerator, denominator) => {
    if (denominator === 0) return 0
    return Math.round((numerator / denominator) * 100)
  }

  const safeAverage = (total, count) => {
    if (count === 0) return 0
    return Math.round(total / count)
  }

  const toggleLevel = (level) => {
    setExpandedLevel(expandedLevel === level ? null : level)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading team data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard" className="text-white hover:bg-gray-800/50 p-2 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Team Overview</h1>
              <p className="text-gray-400">Manage your team performance</p>
            </div>
          </div>

          <Alert className="bg-red-900/50 border-red-500/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>

          <Button onClick={() => window.location.reload()} className="mt-4 bg-green-600 hover:bg-green-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!teamData) {
    return <div className="text-center text-white p-10">No data available</div>
  }

  const totalStats = teamData.totalTeam || {
    totalCommission:
      teamData.level1.totalCommission + teamData.level2.totalCommission + teamData.level3.totalCommission,
    totalInvestment:
      teamData.level1.totalInvestment + teamData.level2.totalInvestment + teamData.level3.totalInvestment,
    totalDeposit: teamData.level1.totalDeposit + teamData.level2.totalDeposit + teamData.level3.totalDeposit,
    totalUsers: teamData.level1.totalUsers + teamData.level2.totalUsers + teamData.level3.totalUsers,
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 pb-30">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard" className="text-white hover:bg-gray-800/50 p-2 rounded-lg">
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
                    <p className="text-white font-bold text-sm">{formatCurrency(totalStats?.total_commission)}</p>
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
                    <p className="text-white font-bold text-sm">{formatCurrency(totalStats?.total_investment)}</p>
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
                    <p className="text-white font-bold text-sm">{formatCurrency(totalStats?.total_deposit)}</p>
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
                    <p className="text-white font-bold text-sm">{totalStats?.members_count}</p>
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
                    {/* <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">Level Performance</span>
                      <span className="text-white text-sm font-semibold">
                        {safePercentage(data.totalInvestment, 150000)}%
                      </span>
                    </div>
                    <Progress value={safePercentage(data.totalInvestment, 150000)} className="h-2" />
                  </div> */}

                    {/* Expanded Member List */}
                    {isExpanded && (
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Team Members
                        </h4>

                        {data.members.length > 0 ? (
                          <div className="space-y-3">
                            {data.members.map((member, index) => (
                              <div
                                key={member.id || index}
                                className="flex items-center justify-between bg-white/10 rounded-lg p-3"
                              >
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-10 h-10">
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback className="bg-green-600 text-white text-sm">
                                      {member.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-white font-medium">@{member.username}</p>

                                  </div>
                                </div>
                                <div className="text-right text-xs">
                                  <p className="text-white font-semibold">{formatCurrency(member.balance)}</p>
                                  <p className="text-gray-400">Balance</p>
                                </div>
                              </div>
                            ))}

                            {data.totalUsers > data.members.length && (
                              <Button
                                variant="outline"
                                className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                              >
                                View All {data.totalUsers} Members
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-400">
                            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No members found in this level</p>
                          </div>
                        )}
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
                  <div className="text-2xl font-bold text-green-400 mb-1">{teamData.summary?.commission_rate || 0}%</div>
                  <p className="text-gray-400 text-sm">Commission Rate</p>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    PKR {(teamData.summary?.avg_investment_per_user || 0).toLocaleString()}
                  </div>
                  <p className="text-gray-400 text-sm">Avg Investment per User</p>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {teamData.summary?.deposit_to_investment_ratio || 0}%
                  </div>
                  <p className="text-gray-400 text-sm">Deposit to Investment Ratio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
