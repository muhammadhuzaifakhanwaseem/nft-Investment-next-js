"use client"

import { useState } from "react"
import { ArrowLeft, Copy, Check, Upload, ArrowRight, Building, CreditCard, Receipt } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function DepositPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [copiedField, setCopiedField] = useState("")
  const [amount, setAmount] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)

  const bankInfo = {
    accountNumber: "00300112211311",
    accountTitle: "Muhammad Raees",
    ibanNumber: "PK08MEZN0000300112211311",
  }

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(""), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmit = () => {
    if (!amount || !uploadedFile) {
      alert("Please enter amount and upload receipt")
      return
    }
    alert("Deposit request submitted successfully!")
    // Reset form or redirect
    setCurrentStep(1)
    setAmount("")
    setUploadedFile(null)
  }

  const getStepIcon = (step) => {
    switch (step) {
      case 1:
        return <Building className="h-5 w-5" />
      case 2:
        return <CreditCard className="h-5 w-5" />
      case 3:
        return <Receipt className="h-5 w-5" />
      default:
        return null
    }
  }

  const getStepTitle = (step) => {
    switch (step) {
      case 1:
        return "Bank Details"
      case 2:
        return "Enter Amount"
      case 3:
        return "Upload Receipt"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-green-900 p-4">
      <div className="max-w-md mx-auto">
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
            <h1 className="text-xl font-bold text-white">Deposit Funds</h1>
            <p className="text-gray-400 text-sm">Step {currentStep} of 3</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step <= currentStep ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-emerald-600" : "bg-gray-700"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Bank Info</span>
            <span>Amount</span>
            <span>Receipt</span>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {getStepIcon(currentStep)}
              {getStepTitle(currentStep)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Bank Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm mb-4">Copy these bank details to make your deposit</p>

                {/* Account Number */}
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-400 text-sm">Account Number</Label>
                      <p className="text-white font-semibold text-xs font-mono">{bankInfo.accountNumber}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(bankInfo.accountNumber, "accountNumber")}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-green-950"
                    >
                      {copiedField === "accountNumber" ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Account Title */}
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-400 text-sm">Account Title</Label>
                      <p className="text-white font-semibold text-xs">{bankInfo.accountTitle}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(bankInfo.accountTitle, "accountTitle")}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-green-950"
                    >
                      {copiedField === "accountTitle" ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* IBAN Number */}
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-400 text-sm">IBAN Number</Label>
                      <p className="text-white font-semibold text-xs font-mono">{bankInfo.ibanNumber}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(bankInfo.ibanNumber, "ibanNumber")}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-green-950"
                    >
                      {copiedField === "ibanNumber" ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button onClick={handleNext} className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Enter Amount */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <p className="text-gray-400 text-sm">Enter the amount you want to deposit</p>

                <div className="space-y-2">
                  <Label className="text-gray-300">Deposit Amount (PKR)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 text-xs h-12"
                  />
                </div>

                {amount && (
                  <div className="bg-emerald-600/20 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Amount to Transfer:</span>
                      <span className="text-emerald-400 font-bold text-xs">PKR {amount}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-green-700"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!amount}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Upload Receipt */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <p className="text-gray-400 text-sm">Upload your payment receipt to complete the deposit</p>

                {/* Amount Summary */}
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Deposit Amount:</span>
                    <span className="text-white font-bold">PKR {amount}</span>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Payment Receipt</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="receipt-upload"
                    />
                    <label htmlFor="receipt-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <div className="text-gray-400">
                        <span className="text-emerald-400 hover:text-emerald-300">Click to upload</span>
                      </div>
                      <p className="text-sm text-gray-500">PNG, JPG, PDF</p>
                    </label>
                  </div>

                  {uploadedFile && (
                    <div className="bg-gray-800/30 rounded-lg p-3 flex items-center gap-3">
                      <Receipt className="h-5 w-5 text-green-400" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{uploadedFile.name}</p>
                        <p className="text-gray-400 text-xs">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Uploaded</Badge>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-green-700"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!uploadedFile}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Need help? Contact support for assistance</p>
        </div>
      </div>
    </div>
  )
}
