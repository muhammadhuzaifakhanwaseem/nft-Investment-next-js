"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  DollarSign,
  Users,
  Award,
  RefreshCw,
  ArrowLeft,
  Trophy,
  Target,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useUser } from "@/app/context/UserContext"
import DashboardLayout from "@/components/DashboardLayout"

export default function UserRankPage() {
  const [ranksData, setRanksData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useUser();
  const fetchUserRank = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("https://stocktitan.site/api/user/ranks", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch user rank data")
      }
      const result = await response.json()
      if (result.success) {
        setRanksData(result)
      } else {
        throw new Error("API returned unsuccessful response")
      }
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserRank()
    }
  }, [token])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
    }).format(Number.parseFloat(amount))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getRankIcon = (rankName) => {
    const name = rankName.toLowerCase()
    if (name.includes("starter")) return <Target className="h-5 w-5" />
    if (name.includes("bronze")) return <Award className="h-5 w-5" />
    if (name.includes("silver")) return <Star className="h-5 w-5" />
    if (name.includes("gold")) return <Trophy className="h-5 w-5" />
    if (name.includes("platinum") || name.includes("diamond")) return <Trophy className="h-5 w-5 text-purple-400" />
    return <Award className="h-5 w-5" />
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  if (loading || !ranksData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <RefreshCw className="h-12 w-12 animate-spin text-green-400" />
              <span className="text-green-300 text-lg font-medium">Loading rank data...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="border-red-500/50 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-red-400">Error Loading Data</CardTitle>
              <CardDescription className="text-slate-300">{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={fetchUserRank}
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!ranksData?.ranks) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-slate-900/50 backdrop-blur border-slate-700/50">
            <CardContent className="pt-6">
              <p className="text-center text-slate-400">No rank data available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentRank =
    ranksData.ranks.find((rank) => rank.progress_percentage === 100 && rank.reward_received) || ranksData.ranks[0]
  const nextRank = ranksData.ranks.find((rank) => rank.level_number === (currentRank?.level_number || 0) + 1)
  const completedRanks = ranksData.ranks.filter((rank) => rank.reward_received)
  const totalPersonalInvestment = ranksData.ranks.reduce(
    (sum, rank) => sum + Number.parseFloat(rank.personal_investment_required),
    0,
  )
  const totalTeamInvestment = ranksData.ranks.reduce(
    (sum, rank) => sum + Number.parseFloat(rank.team_investment_required),
    0,
  )
  const totalRewards = completedRanks.reduce((sum, rank) => sum + Number.parseFloat(rank.reward_amount), 0)

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 p-6 pb-30">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-green-400 hover:bg-slate-800/50 p-3 rounded-xl transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl text-white font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Investment Rank Dashboard
              </h1>
              <p className="text-slate-400 text-lg mt-1">Track your progress and unlock new achievements</p>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-slate-900/80 to-green-900/30 backdrop-blur border-green-500/30 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-3 bg-green-500/20 rounded-full">{getRankIcon(currentRank.rank_name)}</div>
                <div>
                  <CardTitle className="text-3xl text-white font-bold">{currentRank.rank_name}</CardTitle>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 mt-2">
                    Level {currentRank.level_number}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-slate-300 mb-3 font-medium">Progress to Next Level</div>
                <div className="relative">
                  <Progress value={Number.parseFloat(currentRank.progress_percentage)} className="h-4 bg-slate-800" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full"
                    style={{ width: `${currentRank.progress_percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-slate-400 mt-2">
                  <span>{currentRank.progress_percentage}% Complete</span>
                  {nextRank && <span>Next: {nextRank.rank_name}</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 backdrop-blur border-slate-700/50 hover:border-green-500/30 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Personal Investment Required</CardTitle>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400">
                  {formatCurrency(currentRank.personal_investment_required)}
                </div>
                <p className="text-xs text-slate-500 mt-1">Current rank requirement</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 backdrop-blur border-slate-700/50 hover:border-blue-500/30 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Team Investment Required</CardTitle>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400">
                  {formatCurrency(currentRank.team_investment_required)}
                </div>
                <p className="text-xs text-slate-500 mt-1">Current rank requirement</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 backdrop-blur border-slate-700/50 hover:border-purple-500/30 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Rewards Earned</CardTitle>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400">{formatCurrency(totalRewards)}</div>
                <p className="text-xs text-slate-500 mt-1">From completed ranks</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900/50 backdrop-blur border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white text-xl">All Ranks Overview</CardTitle>
              <CardDescription className="text-slate-400">
                Detailed progress across all investment levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ranksData.ranks.map((rank) => (
                  <div
                    key={rank.rank_id}
                    className={`p-4 rounded-xl border transition-all ${rank.rank_id === currentRank.rank_id
                      ? "bg-green-500/10 border-green-500/50 shadow-lg"
                      : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(rank.rank_name)}
                        <span className="font-semibold text-white text-sm">{rank.rank_name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                        Level {rank.level_number}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white font-medium">{rank.progress_percentage}%</span>
                      </div>
                      <Progress value={rank.progress_percentage} className="h-2 bg-slate-800" />
                    </div>

                    {/* Requirements */}
                    <div className="mt-3 text-xs space-y-1 text-slate-400">
                      <div className="flex justify-between">
                        <span>Personal Investment:</span>
                        <span className="text-green-400 font-medium">
                          {formatCurrency(rank.personal_investment_required)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Team Investment:</span>
                        <span className="text-blue-400 font-medium">
                          {formatCurrency(rank.team_investment_required)}
                        </span>
                      </div>
                    </div>

                    {/* Reward Section */}
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-slate-400">Reward</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-purple-400">
                          {formatCurrency(rank.reward_amount)}
                        </span>
                        {rank.reward_received ? (
                          <CheckCircle className="h-4 w-4 text-green-500" title="Received" />
                        ) : rank.progress_percentage >= 100 ? (
                          <Award className="h-4 w-4 text-yellow-500" title="Eligible - Claim Pending" />
                        ) : (
                          <Clock className="h-4 w-4 text-slate-500" title="In Progress" />
                        )}
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Rank Summary</CardTitle>
              <CardDescription className="text-slate-400">Overview of your rank progression</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-400 mb-1">Current Rank</div>
                  <div className="text-2xl font-bold text-white">{currentRank.rank_name}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-400 mb-1">Level</div>
                  <div className="text-2xl font-bold text-green-400">{currentRank.level_number}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-400 mb-1">Completed Ranks</div>
                  <div className="text-2xl font-bold text-blue-400">{completedRanks.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-400 mb-1">Total Rewards</div>
                  <div className="text-2xl font-bold text-purple-400">{formatCurrency(totalRewards)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pb-8">
            <Button
              onClick={fetchUserRank}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-medium shadow-lg"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
