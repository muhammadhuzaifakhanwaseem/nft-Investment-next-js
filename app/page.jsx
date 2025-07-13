"use client"
import { useState } from "react"
import {
  Bell,
  Home,
  BarChart3,
  PieChart,
  CreditCard,
  Settings,
  TrendingUp,
  Plus,
  Minus,
  Wallet,
  Star,
  Zap,
  Crown,
  Shield,
  LayoutDashboard,
  Users,
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"

export default function NFTInvestmentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [investModalOpen, setInvestModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const investmentPlans = [
    {
      id: 1,
      name: "Starter NFT",
      icon: Star,
      minInvestment: 0.1,
      maxInvestment: 5,
      dailyReturn: 2.5,
      duration: 30,
      color: "bg-blue-500",
      bgColor: "bg-blue-500/20",
      textColor: "text-blue-400",
      popular: false,
    },
    {
      id: 2,
      name: "Growth NFT",
      icon: Zap,
      minInvestment: 5,
      maxInvestment: 50,
      dailyReturn: 3.2,
      duration: 45,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-500/20",
      textColor: "text-emerald-400",
      popular: true,
    },
    {
      id: 3,
      name: "Premium NFT",
      icon: Crown,
      minInvestment: 50,
      maxInvestment: 500,
      dailyReturn: 4.1,
      duration: 60,
      color: "bg-orange-500",
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-400",
      popular: false,
    },
  ]

  const favorites = [
    {
      name: "CryptoPunks",
      symbol: "PUNK",
      value: "$3,34,088",
      change: "+5,485",
      percentage: "+5.2%",
      color: "bg-lime-400",
      textColor: "text-gray-900",
      isPositive: true,
    },
    {
      name: "Bored Apes",
      symbol: "BAYC",
      value: "$7,34,048",
      change: "-9,652",
      percentage: "-9.65%",
      color: "bg-orange-500",
      textColor: "text-white",
      isPositive: false,
    },
  ]

  const portfolio = [
    {
      name: "CRYPTOPUNKS",
      symbol: "PUNK",
      value: "$240.86",
      change: "+9.85%",
      isPositive: true,
      icon: "🎭",
    },
    {
      name: "BORED APES",
      symbol: "BAYC",
      value: "$270.86",
      change: "+0.65%",
      isPositive: true,
      icon: "🐵",
    },
    {
      name: "AZUKI",
      symbol: "AZUKI",
      value: "$156.42",
      change: "-2.15%",
      isPositive: false,
      icon: "🌸",
    },
  ]

  const AppSidebar = () => (
    <Sidebar>
      <SidebarHeader className="p-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-lime-500 flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">NFT Invest</h2>
            <p className="text-xs text-green-200">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="w-full">
              <SidebarMenuButton className="text-green-100 hover:bg-green-800/20 hover:text-white w-full">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/team" className="w-full">
              <SidebarMenuButton className="text-green-100 hover:bg-green-800/20 hover:text-white w-full">
                <Users className="h-4 w-4" />
                <span>Team</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/investments/log" className="w-full">
              <SidebarMenuButton className="text-green-100 hover:bg-green-800/20 hover:text-white w-full">
                <TrendingUp className="h-4 w-4" />
                <span>Your Investments</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/deposit/log" className="w-full">
              <SidebarMenuButton className="text-green-100 hover:bg-green-800/20 hover:text-white w-full">
                <ArrowDownCircle className="h-4 w-4" />
                <span>Deposit Records</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/withdraw/log" className="w-full">
              <SidebarMenuButton className="text-green-100 hover:bg-green-800/20 hover:text-white w-full">
                <ArrowUpCircle className="h-4 w-4" />
                <span>Withdrawal Records</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/transactions/log" className="w-full">
              <SidebarMenuButton className="text-green-100 hover:bg-green-800/20 hover:text-white w-full">
                <Repeat className="h-4 w-4" />
                <span>Transactions</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )

  const InvestModal = () => (
    <Dialog open={investModalOpen} onOpenChange={setInvestModalOpen}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Invest in NFT Plan
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-gray-300">Select Investment Plan</Label>
            <Select
              onValueChange={(value) => setSelectedPlan(investmentPlans.find((p) => p.id === Number.parseInt(value)))}
            >
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <SelectValue placeholder="Choose a plan" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {investmentPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id.toString()} className="text-white hover:bg-gray-700">
                    <div className="flex items-center gap-2">
                      <plan.icon className="h-4 w-4" />
                      {plan.name} - {plan.dailyReturn}% daily
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPlan && (
            <div className="bg-gray-800/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Plan:</span>
                <span className="text-white">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Return:</span>
                <span className="text-green-400">{selectedPlan.dailyReturn}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">{selectedPlan.duration} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Min - Max:</span>
                <span className="text-white">
                  {selectedPlan.minInvestment} - {selectedPlan.maxInvestment} ETH
                </span>
              </div>
            </div>
          )}

          <div>
            <Label className="text-gray-300">Investment Amount (ETH)</Label>
            <Input
              type="number"
              placeholder="0.00"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setInvestModalOpen(false)}
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-fuchsia-700"
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Invest Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const WithdrawModal = () => (
    <Dialog open={withdrawModalOpen} onOpenChange={setWithdrawModalOpen}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-orange-400" />
            Withdraw Funds
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Available Balance</p>
              <p className="text-2xl font-bold text-white">45.8 ETH</p>
              <p className="text-gray-400 text-sm">≈ $87,240</p>
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Withdrawal Amount (ETH)</Label>
            <Input
              type="number"
              placeholder="0.00"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div>
            <Label className="text-gray-300">Wallet Address</Label>
            <Input
              placeholder="0x..."
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Network Fee:</span>
              <span className="text-white">0.005 ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">You'll Receive:</span>
              <span className="text-white font-bold">0.00 ETH</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setWithdrawModalOpen(false)}
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-fuchsia-700"
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Withdraw</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-800 to-green-900 flex">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 pb-32">
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="text-white" />
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-emerald-600">E</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-white font-semibold">Hi, Evelin!</h1>
                    <p className="text-gray-400 text-sm">Welcome back!</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-white">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
              <Card className="bg-gray-950/30 border-green-800/50 mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Total Value</span>
                    <div className="flex items-center gap-1">
                      <span className="text-green-400 text-sm">24% ↑</span>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-4">$240,868.00</div>

                  {/* Quick Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30"
                    >
                      <Link
                        className="w-full flex items-center gap-1"
                        href={'/deposit'}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Deposit
                      </Link>
                    </Button>
                    <Button
                      onClick={() => setWithdrawModalOpen(true)}
                      className="flex-1 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-600/30"
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      Withdraw
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mb-6">
                <h2 className="text-white text-lg font-semibold mb-4">NFT'S</h2>
                <div className="space-y-3">
                  {investmentPlans.map((plan) => (
                    <Card key={plan.id} className="bg-gray-300/5 border-green-800/50 relative">
                      {plan.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white z-10">Popular</Badge>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${plan.bgColor} rounded-lg`}>
                              <plan.icon className={`h-4 w-4 ${plan.textColor}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{plan.name}</h3>
                              <p className="text-sm text-gray-400">{plan.duration} days</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-400">{plan.dailyReturn}%</p>
                            <p className="text-xs text-gray-400">Daily</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-green-400">
                            {plan.minInvestment} - {plan.maxInvestment} ETH
                          </span>
                          <Button
                            onClick={() => {
                              setSelectedPlan(plan)
                              setInvestModalOpen(true)
                            }}
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            BUY
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-4 flex items-center justify-center w-full z-50">
            <Card className="bg-gray-900/90 backdrop-blur-xl border-green-800/50">
              <CardContent className="px-3 py-1">
                <div className="flex items-center gap-6">
                  <Button variant="ghost" size="icon" className="text-emerald-400">
                    <Home className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <BarChart3 className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => setInvestModalOpen(true)}
                    size="icon"
                    className="bg-white text-gray-900 rounded-full w-12 h-12 hover:bg-gray-100"
                  >
                    <TrendingUp className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <CreditCard className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <InvestModal />
        <WithdrawModal />
      </div>
    </SidebarProvider>
  )
}
