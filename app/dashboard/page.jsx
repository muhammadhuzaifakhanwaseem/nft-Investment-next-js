import {
  Bell,
  Menu,
  MoreVertical,
  Home,
  BarChart3,
  PieChart,
  CreditCard,
  Settings,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-900 text-white border-0 overflow-hidden relative">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="mb-6">
                <h1 className="text-xl font-semibold mb-4">Welcome to FinWise!</h1>
                <div className="bg-orange-500 rounded-2xl p-4 mb-4 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-90 mb-1">Total Value 24% ↑</div>
                      <div className="text-2xl font-bold">$240,868.00</div>
                    </div>
                    <Button size="icon" className="bg-white text-gray-900 rounded-full">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-500 text-xs font-bold">
                    1D
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                  </div>
                  <Button className="bg-lime-400 text-gray-900 rounded-xl px-4 py-2 text-sm font-medium">New +</Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                    <div className="bg-lime-400 text-gray-900 px-2 py-1 rounded text-xs font-medium">+1.65%</div>
                  </div>
                  <div className="text-2xl font-bold mb-1">$2,163.02</div>
                  <div className="text-lime-400 text-sm">+127.80</div>
                  <div className="text-xs text-gray-400 mt-2">Last 7 days</div>
                  <div className="text-xs text-gray-400">07.05.2023</div>
                </div>
              </div>
              <div className="bg-lime-400 rounded-2xl p-3 mt-6 flex justify-around">
                <Button variant="ghost" size="icon" className="text-gray-900">
                  <Home className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-900">
                  <BarChart3 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-900 bg-white rounded-full">
                  <PieChart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-900">
                  <CreditCard className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-900">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Hi, Evelin!</div>
                  <div className="text-xs text-gray-400">Welcome back!</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-white">
                <Bell className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-1">Total Value 24% ↑</div>
                <div className="text-3xl font-bold flex items-center gap-2">
                  $240,868.00
                  <TrendingUp className="h-5 w-5 text-lime-400" />
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Favorites</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-lime-400 text-gray-900 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gray-900 rounded"></div>
                      <span className="text-sm font-medium">Apple</span>
                    </div>
                    <div className="text-lg font-bold">$3,34,888</div>
                    <div className="text-sm text-green-700">+5,488</div>
                    <div className="mt-2 h-8 flex items-end gap-1">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gray-900/20 w-1 rounded-full"
                          style={{ height: `${Math.random() * 100 + 20}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-orange-500 text-white rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-white rounded-full"></div>
                      <span className="text-sm font-medium">Google</span>
                    </div>
                    <div className="text-lg font-bold">$7,34,148</div>
                    <div className="text-sm text-red-200">-9.65%</div>
                    <div className="mt-2 h-8 flex items-end gap-1">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-white/20 w-1 rounded-full"
                          style={{ height: `${Math.random() * 100 + 20}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Portfolio</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                      </div>
                      <span className="font-medium">APPLE</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$240.86</div>
                      <div className="text-lime-400 text-sm">↑9.85%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="font-medium">GOOGLE</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$270.86</div>
                      <div className="text-lime-400 text-sm">↑0.65%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-around pt-4 border-t border-gray-800">
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Home className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <BarChart3 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white bg-gray-800 rounded-full">
                  <PieChart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <CreditCard className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>EB</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Evelin Broun</div>
                  <div className="text-xs text-gray-400">@evelin.up</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-white">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Good evening,</h2>
                <h2 className="text-2xl font-bold text-gray-400">Evelin</h2>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">SPOTIFY</span>
                  </div>
                  <div className="text-green-400 text-sm">+3.30% ↗</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">AMAZON</span>
                  </div>
                  <div className="text-red-400 text-sm">-2.40% ↘</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm">APPLE</span>
                  </div>
                  <div className="text-white text-sm">$3.00 ↗</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">TWITTER</span>
                  </div>
                  <div className="text-red-400 text-sm">-$16.60 ↘</div>
                </div>
              </div>
              <div className="mb-6 h-20 flex items-end gap-1">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-700 w-2 rounded-full"
                    style={{ height: `${Math.random() * 100 + 20}%` }}
                  ></div>
                ))}
              </div>
              <div className="bg-gray-800 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">APPLE</span>
                  <span className="text-lime-400 text-sm">+15.60 ↗</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Apple's 'Ted Lasso' draws 25 million views in its first week
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>March 21, 2023</span>
                  <span>The Economist</span>
                </div>
              </div>
              <Button className="w-full bg-lime-400 text-gray-900 rounded-2xl py-3 font-medium">
                Stast investing now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
