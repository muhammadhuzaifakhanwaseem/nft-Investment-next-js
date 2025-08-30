"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Minus, Edit, Building2, Smartphone, CreditCard } from "lucide-react"
import SuccessAlert from "@/components/success-alert"
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
        }, 1000)
        setTimeout(() => {
          setOpen(false)
          redirect("/dashboard/withdraw/log")
        }, 5000)
      } else {
        alert(data?.message || "Error In Submission")
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

  const getMethodIcon = (methodName) => {
    const name = methodName.toLowerCase()
    if (
      name.includes("easypaisa") ||
      name.includes("jazzcash") ||
      name.includes("nayapay") ||
      name.includes("sada") ||
      name.includes("paisa")
    ) {
      return <Smartphone className="h-6 w-6" />
    }
    if (name.includes("bank")) {
      return <Building2 className="h-6 w-6" />
    }
    return <CreditCard className="h-6 w-6" />
  }

  const getMethodType = (methodName) => {
    const name = methodName.toLowerCase()
    if (
      name.includes("easypaisa") ||
      name.includes("jazzcash") ||
      name.includes("nayapay") ||
      name.includes("sada") ||
      name.includes("paisa")
    ) {
      return "mobile"
    }
    return "bank"
  }

  return (
    <>
      <SuccessAlert open={open} message={message} />
      <Dialog open={withdrawModalOpen} onOpenChange={setWithdrawModalOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-green-400/35 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Minus className="h-5 w-5 text-orange-400" />
              Withdraw Funds
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
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

            <div>
              <Label className="text-gray-300 mb-4 block">Select Withdrawal Method</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                {methods.map((method) => {
                  const isSelected = methodId === method.id.toString()
                  const methodType = getMethodType(method.name)

                  return (
                    <div
                      key={method.id}
                      onClick={() => !fieldsDisabled && setMethodId(method.id.toString())}
                      className={`
                        relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                        ${isSelected
                          ? "border-green-400 bg-green-400/10"
                          : "border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50"
                        }
                        ${fieldsDisabled ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {/* Method Image or Icon */}
                        <div
                          className={`
                          flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                          ${methodType === "mobile" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"}
                        `}
                        >
                          {method.withdraw_method_image ? (
                            <img
                              src={method.withdraw_method_image || "/placeholder.svg"}
                              alt={method.name}
                              className="w-10 h-10 object-contain rounded"
                              onError={(e) => {
                                e.target.style.display = "none"
                                e.target.nextSibling.style.display = "flex"
                              }}
                            />
                          ) : null}
                          <div className={method.withdraw_method_image ? "hidden" : "flex"}>
                            {getMethodIcon(method.name)}
                          </div>
                        </div>

                        {/* Method Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white text-sm truncate">{method.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`
                              px-2 py-0.5 rounded-full text-xs font-medium
                              ${methodType === "mobile"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-emerald-500/20 text-emerald-300"
                                }
                            `}
                            >
                              {methodType === "mobile" ? "Mobile Wallet" : "Bank Transfer"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Min: PKR {parseInt(method.min_amount).toLocaleString("en-US")} •
                            Max: PKR {parseInt(method.max_amount).toLocaleString("en-US")}
                          </p>
                          <p className="text-xs text-orange-300">
                            Fee: {parseInt(method.charge)}% charge
                          </p>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Amount - always editable */}
            <div>
              <Label className="text-gray-300 mb-3">Withdrawal Amount (PKR)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-800/50 border-gray-700 h-12 text-white placeholder:text-gray-500 text-lg"
              />
            </div>

            {/* Instructions */}
            {methodId && (
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-400/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium mb-2">Instructions</h4>
                <div className="text-sm text-gray-300">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: methods.find((m) => m.id === Number.parseInt(methodId))?.withdraw_instruction || "",
                    }}
                  />
                </div>
              </div>
            )}

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
