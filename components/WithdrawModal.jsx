"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Minus, Edit } from 'lucide-react'
import SuccessAlert from '@/components/success-alert';
import { redirect } from "next/navigation"

export default function WithdrawModal({ withdrawModalOpen, setWithdrawModalOpen, loginToken }) {
  const [methods, setMethods] = useState([])
  const [methodId, setMethodId] = useState("")
  const [amount, setAmount] = useState("")
  const [accountHolder, setAccountHolder] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [iban, setIban] = useState("")
  const [loading, setLoading] = useState(false)
  const [isBinded, setIsBinded] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState({})


  // Load saved details from localStorage
  useEffect(() => {
    if (withdrawModalOpen) {
      // Load methods
      fetch("https://stocktitan.site/api/withdrawal/methods")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") setMethods(data.methods)
        })
        .catch((err) => console.error(err))

      const savedData = localStorage.getItem("withdraw_account")
      if (savedData) {
        const { methodId, accountHolder, accountNumber, iban } = JSON.parse(savedData)
        setMethodId(methodId || "")
        setAccountHolder(accountHolder || "")
        setAccountNumber(accountNumber || "")
        setIban(iban || "")
        setIsBinded(true)
        setIsEditMode(false)
      } else {
        setIsBinded(false)
        setIsEditMode(true)
      }
    }
  }, [withdrawModalOpen])

  const handleWithdraw = async () => {
    if (!methodId || !amount || !accountHolder) return alert("Fill all required fields")
    setLoading(true)

    const withdrawData = {
      methodId,
      accountHolder,
      accountNumber,
      iban,
    }
    localStorage.setItem("withdraw_account", JSON.stringify(withdrawData))
    setIsBinded(true)
    setIsEditMode(false)

    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_token: loginToken,
          method_id: methodId,
          amount: Number.parseFloat(amount),
          account_holder: accountHolder,
          account_number: accountNumber,
          iban: iban,
        }),
      })
      const data = await res.json()

      if (data.status === "success") {
        setWithdrawModalOpen(false)
        setTimeout(() => {
          setOpen(true)
          setMessage({
            title: "Success",
            desc: data.message || "Withdraw request submitted successfully!",
            type: "success",
          })
        }, 1000);
        setTimeout(() => {
          setOpen(false)
          redirect("/dashboard/withdraw/log")
        }, 5000)
      }
    } catch (error) {
      console.error(error)
      alert("Error submitting withdrawal")
    }
    setLoading(false)
  }

  const handleUnbind = () => {
    setIsBinded(false)
    setIsEditMode(true)
    setMethodId("")
    setAccountHolder("")
    setAccountNumber("")
    setIban("")
    localStorage.removeItem("withdraw_account")
  }

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode)
  }

  const fieldsDisabled = isBinded && !isEditMode

  const shouldShowAccountFields = !isBinded || isEditMode

  return (
    <>
      <SuccessAlert open={open} message={message} />
      <Dialog open={withdrawModalOpen} onOpenChange={setWithdrawModalOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-green-400/35 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Minus className="h-5 w-5 text-orange-400" />
              Withdraw Funds
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {isBinded && !isEditMode && (
              <div className="flex justify-between items-center bg-green-800/20 border border-green-400/30 rounded-lg p-3">
                <span className="text-green-400 text-sm">Withdrawal account saved</span>
                <Button
                  onClick={handleEditToggle}
                  size="sm"
                  variant="outline"
                  className="border-green-400/50 text-green-400 hover:bg-green-400/10 bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Info
                </Button>
              </div>
            )}

            {/* Dropdown */}
            <div>
              <Label className="text-gray-300 mb-3">Withdrawal Method</Label>
              <select
                className="w-full bg-gray-800/50 border border-gray-700 text-white p-2 rounded disabled:opacity-50"
                value={methodId}
                onChange={(e) => setMethodId(e.target.value)}
                disabled={fieldsDisabled}
              >
                <option value="">Select method</option>
                {methods.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Instructions */}
            {methodId && (
              <div className="bg-gray-800/30 rounded-lg p-3 text-sm text-gray-300">
                <p
                  dangerouslySetInnerHTML={{
                    __html: methods.find((m) => m.id === Number.parseInt(methodId))?.withdraw_instruction || "",
                  }}
                />
              </div>
            )}

            {/* Amount - always editable */}
            <div>
              <Label className="text-gray-300 mb-3">Withdrawal Amount</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Only show account fields when not bound or in edit mode */}
            {shouldShowAccountFields && (
              <>
                <div>
                  <Label className="text-gray-300 mb-3">Account Holder</Label>
                  <Input
                    placeholder="Enter account holder name"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-3">Account Number</Label>
                  <Input
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-3">IBAN Number (Optional)</Label>
                  <Input
                    placeholder="Enter IBAN number"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => setWithdrawModalOpen(false)}
                variant="outline"
                className="flex-1 border-gray-700 text-gray-900 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button onClick={handleWithdraw} disabled={loading} className="flex-1 bg-orange-600 hover:bg-orange-700">
                {loading ? "Processing..." : "Withdraw"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
