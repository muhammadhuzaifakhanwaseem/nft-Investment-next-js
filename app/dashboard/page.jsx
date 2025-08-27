"use client"

import { useEffect, useState } from "react"
import {
  TrendingUp,
  Plus,
  Minus,
  LogOut,
  Menu,
  X,
  MessageCircle,
  HelpCircle
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import Link from "next/link"
import axios from "axios"
import WithdrawModal from "@/components/WithdrawModal"
import InvestModal from "@/components/InvestModal"
import Image from "next/image"
import CustomerSupportModal from "@/components/customer-support-modal"
import { useUser } from "../context/UserContext"

import logo from '@/public/mepx.png'
import { ShareWithFriends } from "@/components/share-with-friends"
import { usePathname } from "next/navigation"
import DashboardLayout from "@/components/DashboardLayout"
import AnnouncementModal from "@/components/announcement-modal"
import HelpButtonGuide from "@/components/help-button-guide"
import { SupportsData } from "@/components/SupportsData"
import { AdsSlider } from "@/components/AdsSlider"

export default function NFTInvestmentDashboard() {
  const [investModalOpen, setInvestModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [supportModalOpen, setSupportModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [investmentPlans, setPlans] = useState(null)
  const [investAmount, setInvestAmount] = useState()

  function fetchPlans() {
    axios.get("https://stocktitan.site/api/plans").then((res) => {
      setPlans(res?.data?.plans)
    })
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { url: "/dashboard/deposit/log", title: "My Deposits" },
    { url: "/dashboard/withdraw/log", title: "My Withdrawals" },
    { url: "/dashboard/transactions/log", title: "My Transactions" },
    { url: "/dashboard/investments/log", title: "My Investments" },
    { url: "/dashboard/profit/daily", title: "My Daily Profits" },
    { url: "/dashboard/profit/total", title: "My Total Profits" },
    { url: "/dashboard/referral_commissions", title: "Referral Commissions" },
    { url: "/dashboard/transfer", title: "Transfer Amount" },
    { url: "/dashboard/transfer/log", title: "All Transfers" },
    { url: "/dashboard/team", title: "My Team" },
    { url: "/dashboard/user-rank", title: "User Rank" },
    { url: "/dashboard/profile", title: "Profile" },
    { url: "", title: "Customer Support", action: () => setSupportModalOpen(true) },
  ]

  const { logout, user, token, fetchUser } = useUser();

  useEffect(() => {
    fetchUser()
  }, []);

  const [showHelpGuide, setShowHelpGuide] = useState(false)

  useEffect(() => {
    const hasSeenHelpGuide = localStorage.getItem("hasSeenHelpGuide")
    if (!hasSeenHelpGuide) {
      const timer = setTimeout(() => {
        setShowHelpGuide(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleCloseHelpGuide = () => {
    setShowHelpGuide(false)
    localStorage.setItem("hasSeenHelpGuide", "true")
  }

  return (
    <DashboardLayout>
      <AnnouncementModal />
      {showHelpGuide && <HelpButtonGuide onClose={handleCloseHelpGuide} />}
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-800 to-green-900 flex pb-30">
        {isOpen && <div className="fixed inset-0 bg-white/30 backdrop-blur-xs z-30" onClick={() => setIsOpen(false)} />}
        <div
          className={`fixed inset-y-0 my-auto h-[90%] ${isOpen ? "left-[0]" : "-left-[100%]"} w-72 bg-gray-900 backdrop-blur-xl border-r border-green-500/40 rounded-r-3xl p-4 flex flex-col z-30 duration-300`}
        >
          <Link href={'/dashboard/profile'} className="flex border-b-1 pb-4 border-green-400 items-center gap-3 mb-4">
            <Image src={logo} alt="logo" width={40} height={40} />
            <div>
              <h2 className="text-base font-semibold text-white leading-5">{user?.username}</h2>
              <p className="text-sm text-gray-400">{user?.phone}</p>
            </div>
          </Link>
          <div className="flex flex-col gap-3 text-md text-white">
            {menuItems.map((item, i) =>
              item.action ? (
                <button
                  key={i}
                  onClick={item.action}
                  className="flex items-center justify-between hover:text-emerald-400 cursor-pointer text-left"
                >
                  <span>{item.title}</span>
                </button>
              ) : (
                <Link
                  key={i}
                  href={item.url}
                  className="flex items-center justify-between hover:text-emerald-400 cursor-pointer"
                >
                  <span>{item.title}</span>
                </Link>
              ),
            )}
          </div>
          <button
            onClick={logout}
            className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-400 font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 pb-32">
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <Link href={'/dashboard/profile'} className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <Image src={logo} alt="logo" width={40} height={40} />
                  </Avatar>
                  <div>
                    <h1 className="text-white font-semibold">Hi, {user?.username}!</h1>
                    <p className="text-gray-400 text-sm">Welcome back!</p>
                  </div>
                </Link>
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
                    <Button className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30">
                      <Link className="w-full flex items-center gap-1" href={"/dashboard/deposit"}>
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
              <AdsSlider />
              <div className="mb-6 mt-6">
                <h2 className="text-white text-lg font-semibold mb-4">Investment Opportunities</h2>
                <div className="space-y-3">
                  {investmentPlans?.length ? (
                    investmentPlans.map((plan) => (
                      <Card
                        key={plan.id}
                        className="bg-white/5 backdrop-blur-md border border-green-800/30 relative rounded-2xl"
                      >
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
                              <p className="text-lg font-bold text-green-400">
                                {Number(plan.return_interest ?? 0).toFixed(0)}%
                              </p>
                              <p className="text-xs text-gray-400">
                                {plan?.time?.time == 1
                                  ? "Hourly"
                                  : plan?.time?.time == 24
                                    ? "Daily"
                                    : plan?.how_many_time == 1 && plan?.time?.time != 1
                                      ? "Accumulated Profit"
                                      : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-green-400">
                              PKR {Number(plan.minimum_amount ?? 0).toFixed(0)} <span className="text-white">to</span>{" "}
                              PKR {Number(plan.maximum_amount ?? 0).toFixed(0)}
                            </span>
                            <Button
                              onClick={() => {
                                setSelectedPlan(plan)
                                setInvestModalOpen(
                                  true
                                )
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
                    ))
                  ) : (
                    <div className="border border-gray-200 rounded-lg shadow animate-pulse md:p-6 dark:border-gray-700">
                      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {user ?
              <ShareWithFriends user={user} /> : ""
            }
            <SupportsData />
          </div>
        </div>

        <Button
          className="fixed bottom-40 right-4 bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 shadow-lg z-30"
          size="icon"
        >
          <Link href={'/help'}>
            <MessageCircle className="h-3 w-3" />
          </Link>
        </Button>

        <Button
          className="fixed bottom-55 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 shadow-lg z-30"
          size="icon"
          onClick={() => { setSupportModalOpen(true) }}
        >
          <HelpCircle className="h-3 w-3" />
        </Button>

        <InvestModal
          balance={Number(user?.balance ?? 0).toFixed(0)}
          setInvestAmount={setInvestAmount}
          investAmount={investAmount}
          setInvestModalOpen={setInvestModalOpen}
          investModalOpen={investModalOpen}
          selectedPlan={selectedPlan}
        />
        <WithdrawModal
          withdrawModalOpen={withdrawModalOpen}
          setWithdrawModalOpen={setWithdrawModalOpen}
          loginToken={token}
        />

        <CustomerSupportModal isOpen={supportModalOpen} onClose={() => setSupportModalOpen(false)} />
      </div>
    </DashboardLayout>
  )
}
