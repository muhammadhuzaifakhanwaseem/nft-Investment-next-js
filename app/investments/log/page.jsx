"use client"

import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LogPage() {
    const logHeadings = ["Gateway", "Amount", "Currency", "Charge", "Details"]
    const logData = [
        {
            gateway: "Account Transfer",
            amount: "90000.00",
            currency: "PKR",
            charge: "0.00",
            details: "Payment Successfull",
            status: "success",
        },
        {
            gateway: "Crypto Deposit",
            amount: "0.5",
            currency: "ETH",
            charge: "0.001",
            details: "Pending Confirmation",
            status: "pending",
        },
        {
            gateway: "Bank Withdrawal",
            amount: "5000.00",
            currency: "PKR",
            charge: "50.00",
            details: "Processing",
            status: "processing",
        },
        {
            gateway: "Account Transfer",
            amount: "15000.00",
            currency: "PKR",
            charge: "0.00",
            details: "Payment Failed",
            status: "failed",
        },
        {
            gateway: "Crypto Deposit",
            amount: "0.1",
            currency: "BTC",
            charge: "0.0001",
            details: "Confirmed",
            status: "success",
        },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case "success":
                return "text-green-400"
            case "pending":
                return "text-yellow-400"
            case "processing":
                return "text-blue-400"
            case "failed":
                return "text-red-400"
            default:
                return "text-gray-400"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-gray-800/50"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Investments</h1>
                        <p className="text-gray-400">View your recent activities</p>
                    </div>
                </div>

                {/* Log Table Card */}
                <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                    <CardHeader>
                        <CardTitle className="text-white">All Investments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-800/50 hover:bg-gray-800/50 border-gray-700">
                                        {logHeadings.map((heading, index) => (
                                            <TableHead key={index} className="text-gray-300 whitespace-nowrap">
                                                {heading}
                                            </TableHead>
                                        ))}
                                        <TableHead className="text-gray-300 whitespace-nowrap">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {logData.map((log, rowIndex) => (
                                        <TableRow key={rowIndex} className="border-gray-700 hover:bg-gray-800/30">
                                            <TableCell className="font-medium text-white whitespace-nowrap">{log.gateway}</TableCell>
                                            <TableCell className="text-white whitespace-nowrap">{log.amount}</TableCell>
                                            <TableCell className="text-white whitespace-nowrap">{log.currency}</TableCell>
                                            <TableCell className="text-white whitespace-nowrap">{log.charge}</TableCell>
                                            <TableCell className="text-gray-400 whitespace-nowrap">{log.details}</TableCell>
                                            <TableCell className={`font-medium ${getStatusColor(log.status)} whitespace-nowrap`}>
                                                {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        {logData.length === 0 && <div className="text-center text-gray-400 py-8">No log entries found.</div>}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
