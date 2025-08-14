"use client"

import { useState } from "react"
import { MessageCircle, Phone, Users, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CustomerSupportModal({ isOpen, onClose }) {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqs = [
    {
      question: "How to deposit money?",
      answer: "Go to Dashboard → Click 'Deposit' button → Choose payment method → Enter amount → Follow payment instructions → Your balance will be updated within 5-10 minutes."
    },
    {
      question: "How to withdraw money?",
      answer: "Click 'Withdraw' button → Enter withdrawal amount → Provide your bank details → Submit request → Withdrawals are processed within 24-48 hours on working days."
    },
    {
      question: "What are the investment plans?",
      answer: "We offer multiple investment plans with different returns and durations. Each plan shows minimum/maximum investment amounts, daily/total returns, and capital return policy."
    },
    {
      question: "How do referral commissions work?",
      answer: "Invite friends using your referral link → When they invest, you earn commission → Commission rates vary by plan → Check 'My Team' section for details."
    },
    {
      question: "When will I receive my profits?",
      answer: "Daily profit plans: Profits credited every 24 hours → Accumulated plans: Profits credited at plan completion → Check 'My Daily Profits' for updates."
    },
    {
      question: "Is my investment safe?",
      answer: "Yes, we use secure payment gateways → All transactions are encrypted → Regular security audits → 24/7 customer support available."
    }
  ]

  const whatsappNumber = "+923001234567" // Replace with actual WhatsApp number
  const whatsappGroupLink = "https://chat.whatsapp.com/your-group-link" // Replace with actual group link

  const openWhatsApp = () => {
    const message = "Hi, I need help with my investment account"
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const joinWhatsAppGroup = () => {
    window.open(whatsappGroupLink, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-green-800/50">
        <CardHeader className="border-b border-green-800/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-400" />
              Customer Support
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* WhatsApp Support Options */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-4">Get Instant Help</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={openWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Support
              </Button>
              <Button
                onClick={joinWhatsAppGroup}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Join WhatsApp Group
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                    >
                      <span className="text-white font-medium">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800/30">
            <h4 className="text-green-400 font-semibold mb-2">Still need help?</h4>
            <p className="text-gray-300 text-sm mb-3">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-green-400 border-green-400">
                Response time: 5-10 minutes
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                24/7 Available
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
