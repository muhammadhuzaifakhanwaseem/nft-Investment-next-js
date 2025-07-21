"use client"

import { useState } from "react"
import {
  Home,
  BarChart3,
  CreditCard,
  Settings,
  TrendingUp,
  Plus,
  Minus,
  ChevronDown,
  LogOut,
  User,
  Menu,
  X,
  PiggyBank, ShieldCheck, TrendingU
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import Link from "next/link"
import SuccessAlert from "@/components/success-alert"

export default function NFTInvestmentDashboard() {
  const [investModalOpen, setInvestModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const investmentPlans = [
    {
      id: 1,
      name: "120 Days Plan",
      duration: 120,
      minInvestment: "10,000",
      maxInvestment: "1,000,000",
      dailyReturn: "780.00",
      capitalReturn: true,
      popular: true,
      bgColor: "bg-orange-800/80",
      textColor: "text-white",
      icon: TrendingUp,
    },
    {
      id: 2,
      name: "90 Days Plan",
      duration: 90,
      minInvestment: "10,000",
      maxInvestment: "500,000",
      dailyReturn: "450.00",
      capitalReturn: true,
      bgColor: "bg-purple-700/80",
      textColor: "text-white",
      icon: ShieldCheck,
    },
    {
      id: 3,
      name: "60 Days Plan",
      duration: 60,
      minInvestment: "10,000",
      maxInvestment: "200,000",
      dailyReturn: "264.00",
      capitalReturn: true,
      bgColor: "bg-green-700/80",
      textColor: "text-white",
      icon: PiggyBank,
    },
  ]

  const InvestModal = () => (
    <Dialog open={investModalOpen} onOpenChange={setInvestModalOpen}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-green-400/35 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Invest in NFT Plan
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {selectedPlan && (
            <div className="bg-gray-800/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Plan:</span>
                <span className="text-white">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Profit:</span>
                <span className="text-green-400">0PKR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Profit:</span>
                <span className="text-green-400">0PKR</span>
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
            <Label className="text-gray-300 mb-3">Investment Amount (PKR)</Label>
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
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-green-400/35 text-white">
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

  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { url: "/deposit/log", title: "My Deposits" },
    { url: "withdraw/log", title: "My Withdawls" },
    { url: "transactions/log", title: "My Transactions" },
    { url: "investments/log", title: "My Investments" },
    { url: "", title: "My Daily Profits" },
    { url: "", title: "My Total Profits" },
    { url: "", title: "Refferal Commisions" },
    { url: "", title: "Transfer Amount" },
    { url: "/team", title: "My Team" },
  ]

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-800 to-green-900 flex">
        {isOpen && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-xs z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div
          className={`fixed inset-y-0 my-auto h-[80%] ${isOpen ? 'left-[0]' : '-left-[100%]'} w-72 bg-gray-900 backdrop-blur-xl border-r border-green-500/40 rounded-r-3xl p-4 flex flex-col z-30 duration-300`}
        >
          <div className="flex border-b-1 pb-4 border-green-400 items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <User className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white leading-5">
                MUHAMMAD TAHIR IMRAN
              </h2>
              <p className="text-sm text-gray-400">0002692412</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-md text-white">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="flex items-center justify-between hover:text-emerald-400 cursor-pointer"
              >
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
          <button className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-400 font-medium">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 pb-32">
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">

                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-emerald-600">E</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-white font-semibold">Hi, Evelin!</h1>
                    <p className="text-gray-400 text-sm">Welcome back!</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className=" bg-white text-gray-800 p-2 rounded-full shadow-md"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
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
                    <Card key={plan.id} className="bg-white/5 backdrop-blur-md border border-green-800/30 relative rounded-2xl">
                      {plan.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white z-10">Popular</Badge>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${plan.bgColor} rounded-lg`}>
                              <plan.icon className={`h-5 w-5 ${plan.textColor}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{plan.name}</h3>
                              <p className="text-sm text-gray-400">Every {plan.duration} days</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-400">{plan.dailyReturn}%</p>
                            <p className="text-xs text-gray-400">Accumulated</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-green-400">
                            {plan.minInvestment} to {plan.maxInvestment}
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
                        <p className="text-xs text-gray-400">
                          Capital Return:{" "}
                          <span className="text-emerald-400 font-medium">{plan.capitalReturn ? "Yes" : "No"}</span>
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-4 flex items-center justify-center w-full z-20">
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
      {/* <SuccessAlert isOpen /> */}
    </>
  )
}
