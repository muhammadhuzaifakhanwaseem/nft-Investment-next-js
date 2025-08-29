'use client'
import {
    Home,
    BarChart3,
    CreditCard,
    Users,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"
import { Button } from "./ui/button"

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/team", label: "My Team", icon: Users },
    { href: "/dashboard/deposit", label: "Deposit", icon: CreditCard },
    { href: "/dashboard/user-rank", label: "Plans", icon: BarChart3 },
]

const DashboardLayout = ({ children }) => {
    const pathname = usePathname()
    return (
        <>
            {children}
            <div className="fixed bottom-4 flex items-center justify-center w-full z-20">
                <Card className="bg-gray-900/50 backdrop-blur-xl border-green-800/50 py-2">
                    <CardContent className="px-3 py-1">
                        <div className="flex items-center gap-6">
                            {navItems.map(({ href, label, icon: Icon }) => (
                                <Link key={href} href={href}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`${pathname === href ? "text-emerald-400" : "text-gray-400 hover:text-white"
                                            }`}
                                        title={label}
                                    >
                                        <Icon className={`${pathname === href ? "h-7 w-7" : "h-5 w-5"}`} />
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
export default DashboardLayout