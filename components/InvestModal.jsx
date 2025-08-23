'use client'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    TrendingUp
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useUser } from '@/app/context/UserContext'
import SuccessAlert from './success-alert';

const InvestModal = ({
    balance,
    setInvestAmount,
    investAmount,
    setInvestModalOpen,
    investModalOpen,
    selectedPlan
}) => {

    const { token } = useUser();
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({})

    const handleInvest = async () => {
        try {
            const formData = new FormData();
            formData.append("login_token", token);
            formData.append("plan_id", selectedPlan.id);
            formData.append("amount", investAmount);

            const res = await fetch("https://stocktitan.site/api/investment", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (data.status) {
                setOpen(true)
                setMessage({ title: "Success", desc: data?.message, type: "success" })
                setTimeout(() => {
                    setOpen(false)
                }, 3000);
                setInvestModalOpen(false);
            } else {
                alert("❌ " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error occurred while investing");
        }
    };

    return (
        <>
            <SuccessAlert open={open} message={message} />
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
                                        <span className="text-green-400">{((investAmount * Number(selectedPlan?.return_interest ?? 0).toFixed(0) / 100) * selectedPlan?.every_time).toFixed(2)} </span>
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
                            <Button
                                disabled={
                                    investAmount < Number(selectedPlan?.minimum_amount ?? 0) ||
                                    investAmount > Number(selectedPlan?.maximum_amount ?? 0)
                                }
                                onClick={handleInvest}
                                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-green-700"
                            >
                                Invest Now
                            </Button>

                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InvestModal
