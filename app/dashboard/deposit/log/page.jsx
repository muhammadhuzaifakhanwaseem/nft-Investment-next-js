"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LogPage() {
    const [token, setToken] = useState("")
    const [deposits, setDeposits] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedDeposit, setSelectedDeposit] = useState(null)

    const fetchData = async () => {
        try {
            const res = await fetch("https://stocktitan.site/api/user/deposits", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const result = await res.json()
            if (res.ok && result.deposits) {
                setDeposits(result.deposits.data)
            } else {
                setDeposits([])
            }
        } catch (err) {
            console.error(err)
            setDeposits([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) return;
        fetchData()
    }, [token])

    useEffect(() => {
        const authToken = Cookies.get("auth_token")
        setToken(authToken || "")
    }, [])

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

    const statusMap = {
        0: "Pending",
        1: "Success",
        2: "Failed"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
            <div className="max-w-6xl mx-auto">
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
                        <h1 className="text-2xl font-bold text-white">Deposit Records</h1>
                        <p className="text-gray-400">View your recent activities</p>
                    </div>
                </div>

                {/* Log Table */}
                <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
                    <CardHeader>
                        <CardTitle className="text-white">All Deposits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-800/50 hover:bg-gray-800/50 border-gray-700">
                                        <TableHead className="text-gray-300">Transaction ID</TableHead>
                                        <TableHead className="text-gray-300">Amount</TableHead>
                                        <TableHead className="text-gray-300">Charge</TableHead>
                                        <TableHead className="text-gray-300">Status</TableHead>
                                        <TableHead className="text-gray-300">Created At</TableHead>
                                        <TableHead className="text-gray-300">Details</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {deposits.map((deposit) => {
                                        const status = statusMap[deposit.payment_status] || "Processing"
                                        const color = getStatusColor(status.toLowerCase())

                                        return (
                                            <TableRow key={deposit.id} className="border-gray-700 hover:bg-gray-800/30">
                                                <TableCell className="text-white whitespace-nowrap">{deposit.transaction_id}</TableCell>
                                                <TableCell className="text-white whitespace-nowrap">{parseFloat(deposit.amount).toFixed(2)}</TableCell>
                                                <TableCell className="text-white whitespace-nowrap">{parseFloat(deposit.charge).toFixed(2)}</TableCell>
                                                <TableCell className={`${color} font-medium whitespace-nowrap`}>
                                                    {status}
                                                </TableCell>
                                                <TableCell className="text-gray-400 whitespace-nowrap">
                                                    {new Date(deposit.created_at).toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className=""
                                                                onClick={() => setSelectedDeposit(deposit)}
                                                            >
                                                                View
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="bg-gray-900 border border-gray-700 text-white max-w-2xl">
                                                            <DialogHeader>
                                                                <DialogTitle>Deposit Details</DialogTitle>
                                                                <DialogDescription className="text-gray-400">
                                                                    Transaction ID: {selectedDeposit?.transaction_id}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                                <div><strong>ID:</strong> {selectedDeposit?.id}</div>
                                                                <div><strong>User ID:</strong> {selectedDeposit?.user_id}</div>
                                                                <div><strong>Gateway ID:</strong> {selectedDeposit?.gateway_id}</div>
                                                                <div><strong>Amount:</strong> {selectedDeposit?.amount}</div>
                                                                <div><strong>Rate:</strong> {selectedDeposit?.rate}</div>
                                                                <div><strong>Charge:</strong> {selectedDeposit?.charge}</div>
                                                                <div><strong>Final Amount:</strong> {selectedDeposit?.final_amount}</div>
                                                                <div><strong>Status:</strong> {status}</div>
                                                                <div><strong>Is Mine:</strong> {selectedDeposit?.is_mine ? "Yes" : "No"}</div>
                                                                <div><strong>Created At:</strong> {new Date(selectedDeposit?.created_at).toLocaleString()}</div>
                                                                <div><strong>Updated At:</strong> {new Date(selectedDeposit?.updated_at).toLocaleString()}</div>
                                                                <div className="col-span-2">
                                                                    <strong>Payment Proof:</strong>
                                                                    {selectedDeposit?.payment_proof?.provide_screenshoot?.file ? (
                                                                        <img
                                                                            src={`https://stocktitan.site/public/storage/payment_proofs/${selectedDeposit.payment_proof.provide_screenshoot.file}`}
                                                                            alt="Payment Proof"
                                                                            className="mt-2 w-full max-h-80 object-contain border border-gray-700"
                                                                        />
                                                                    ) : (
                                                                        <div className="text-gray-500 mt-2">No payment proof available.</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        {loading ? (
                            <div className="text-center text-gray-400 py-8">Loading...</div>
                        ) : deposits.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">No deposit records found.</div>
                        ) : null}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
