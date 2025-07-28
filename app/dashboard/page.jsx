"use client"

import { useEffect, useState } from "react"
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
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import Link from "next/link"
import SuccessAlert from "@/components/success-alert"
import { useUser } from "../context/UserContext"
import axios from "axios"

const InvestModal = ({ balance, investModalOpen, setInvestModalOpen, selectedPlan, investAmount, setInvestAmount }) => (
  <Dialog open={investModalOpen} onOpenChange={setInvestModalOpen}>
    <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-green-400/35 text-white">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          {selectedPlan?.plan_name}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {selectedPlan && (
          <div className="bg-gray-800/30 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Your Balance:</span>
              <span className="text-green-400">PKR {balance}</span>
            </div>
            {investAmount ?
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Profit:</span>
                <span className="text-green-400">{investAmount * Number(selectedPlan?.return_interest ?? 0).toFixed(0) / 100}</span>
              </div>
              : ""}
            {investAmount ?
              <div className="flex justify-between">
                <span className="text-gray-400">Total Profit:</span>
                <span className="text-green-400">0PKR</span>
              </div>
              : ""}
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white">{selectedPlan.time?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Min:</span>
              <span className="text-white">
                PKR {Number(selectedPlan.minimum_amount ?? 0).toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Max:</span>
              <span className="text-white">
                PKR {Number(selectedPlan.maximum_amount ?? 0).toFixed(0)}
              </span>
            </div>
          </div>
        )}

        <div>
          <Label className="text-gray-300 mb-3 text-sm">Investment Amount (PKR)</Label>
          <Input
            type="number"
            placeholder="0.00"
            onChange={(e) => setInvestAmount(Number(e.target.value))}
            value={investAmount || 0}
            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setInvestModalOpen(false)}
            className="flex-1 bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button disabled={investAmount < Number(selectedPlan?.minimum_amount ?? 0).toFixed(0) || investAmount > Number(selectedPlan?.maximum_amount ?? 0).toFixed(0) ? true : false} className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-green-700">Invest Now</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

const WithdrawModal = ({ withdrawModalOpen, setWithdrawModalOpen }) => (
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

export default function NFTInvestmentDashboard() {

  const [investModalOpen, setInvestModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [investmentPlans, setPlans] = useState(null)
  const [investAmount, setInvestAmount] = useState()

  function fetchPlans() {
    axios.get('https://stocktitan.site/api/plans').then((res) => {
      setPlans(res?.data?.plans)
      console.log(res?.data?.plans)
    })
  }

  useEffect(() => {
    fetchPlans();
  }, []);

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

  const { user, logout } = useUser()

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
          {user ?
            <div className="flex border-b-1 pb-4 border-green-400 items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white leading-5">
                  {user?.username}
                </h2>
                <p className="text-sm text-gray-400">{user.phone}</p>
              </div>
            </div> : ""
          }
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
          <button onClick={logout} className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-400 font-medium">
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
                    <AvatarFallback className="bg-emerald-600 capitalize">{user?.username?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-white font-semibold">Hi, {user?.username}!</h1>
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
                    <span className="text-gray-400 text-sm">Balance</span>
                    <div className="flex items-center gap-1">
                      <span className="text-green-400 text-sm">24% ↑</span>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-4">PKR {Number(user?.balance ?? 0).toFixed(2)}</div>

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
                <h2 className="text-white text-lg font-semibold mb-4">Investment Opportunities</h2>
                <div className="space-y-3">
                  {investmentPlans?.length ? investmentPlans.map((plan) => (
                    <Card key={plan.id} className="bg-white/5 backdrop-blur-md border border-green-800/30 relative rounded-2xl">
                      <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white z-10">Popular</Badge>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-green-700 rounded-lg`}>
                              <TrendingUp className={`h-5 w-5 text-white`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{plan.plan_name}</h3>
                              <p className="text-sm text-gray-400">{plan?.time?.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-400">{Number(plan.return_interest ?? 0).toFixed(0)}%</p>
                            <p className="text-xs text-gray-400">{plan?.how_many_time > 1 ? "Daily Profit" : "Accumulated Profit"}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-green-400">
                            PKR {Number(plan.minimum_amount ?? 0).toFixed(0)} <span className="text-white">to</span> PKR {Number(plan.maximum_amount ?? 0).toFixed(0)}
                          </span>
                          <Button
                            onClick={() => {
                              Number(user?.balance ?? 0).toFixed(0) < Number(plan.minimum_amount ?? 0).toFixed(0) ? 
                              alert('Insufficient Balance')
                              : 
                              setSelectedPlan(plan)
                              setInvestModalOpen(Number(user?.balance ?? 0).toFixed(0) < Number(plan.minimum_amount ?? 0).toFixed(0) ? false : true)
                            }}
                            size="sm"
                            className={`bg-emerald-600 hover:bg-emerald-700`}
                          >
                            Buy
                          </Button>
                        </div>
                        <p className="text-xs text-gray-400">
                          Capital Return:{" "}
                          <span className="text-emerald-400 font-medium">{plan.capital_back ? "Yes" : "No"}</span>
                        </p>
                      </CardContent>
                    </Card>
                  )) : <div className="border border-gray-200 rounded-lg shadow animate-pulse md:p-6 dark:border-gray-700">
                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>}
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
        <InvestModal balance={Number(user?.balance ?? 0).toFixed(0)} setInvestAmount={setInvestAmount} investAmount={investAmount} setInvestModalOpen={setInvestModalOpen} investModalOpen={investModalOpen} selectedPlan={selectedPlan} />
        <WithdrawModal withdrawModalOpen={withdrawModalOpen} setWithdrawModalOpen={setWithdrawModalOpen} />
      </div>
      {/* <SuccessAlert isOpen /> */}
    </>
  )
}
