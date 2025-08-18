"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowLeft, Bot, User } from "lucide-react"

const chatData = [
    {
        id: "deposits",
        text: "How to Deposit Money",
        children: [
            {
                id: "deposit-methods",
                text: "What deposit methods are available?",
                answer:
                    "We accept bank transfers, credit/debit cards, and cryptocurrency deposits. All deposits are processed within 24 hours.",
            },
            {
                id: "deposit-limits",
                text: "What are the deposit limits?",
                answer: "Minimum deposit is $100. Maximum daily deposit is $50,000. VIP members have higher limits.",
            },
            {
                id: "deposit-fees",
                text: "Are there any deposit fees?",
                answer:
                    "Bank transfers are free. Credit card deposits have a 2.5% fee. Crypto deposits have network fees only.",
            },
        ],
    },
    {
        id: "withdrawals",
        text: "How to Withdraw Money",
        children: [
            {
                id: "withdrawal-process",
                text: "How do I withdraw my funds?",
                answer:
                    "Go to your dashboard, click 'Withdraw', enter the amount, and select your preferred method. Withdrawals are processed within 1-3 business days.",
            },
            {
                id: "withdrawal-limits",
                text: "What are the withdrawal limits?",
                answer: "Minimum withdrawal is $50. Daily limit is $25,000. Weekly limit is $100,000 for verified accounts.",
            },
            {
                id: "withdrawal-fees",
                text: "Are there withdrawal fees?",
                answer:
                    "First 3 withdrawals per month are free. Additional withdrawals have a $10 fee. Wire transfers have a $25 fee.",
            },
        ],
    },
    {
        id: "account",
        text: "Account & Security",
        children: [
            {
                id: "verify-account",
                text: "How to verify my account?",
                answer:
                    "Upload a government ID and proof of address. Verification usually takes 24-48 hours. You'll receive an email confirmation.",
            },
            {
                id: "reset-password",
                text: "How to reset my password?",
                answer:
                    "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to your inbox.",
            },
            {
                id: "two-factor",
                text: "How to enable two-factor authentication?",
                answer:
                    "Go to Security Settings, click 'Enable 2FA', scan the QR code with your authenticator app, and enter the verification code.",
            },
        ],
    },
]

export function StaticChatbot() {
    const [currentLevel, setCurrentLevel] = useState(chatData)
    const [breadcrumb, setBreadcrumb] = useState(["Help Center"])
    const [messages, setMessages] = useState([
        {
            id: "1",
            type: "bot",
            content: "Hi! I'm here to help you with any questions. What would you like to know about?",
            timestamp: new Date(),
        },
    ])
    const [isTyping, setIsTyping] = useState(false)
    const [showOptions, setShowOptions] = useState(true)

    const simulateTyping = (message, callback) => {
        setIsTyping(true)
        setTimeout(() => {
            setIsTyping(false)
            const newMessage = {
                id: Date.now().toString(),
                type: "bot",
                content: message,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, newMessage])
            if (callback) callback()   // callback defined hoga to chalega
        }, 1500 + Math.random() * 1000)
    }

    const handleQuestionClick = (question) => {
        const userMessage = {
            id: Date.now().toString(),
            type: "user",
            content: question.text,
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setShowOptions(false)

        if (question.answer) {
            simulateTyping(question.answer, () => {
                setTimeout(() => {
                    simulateTyping("Is there anything else I can help you with?", () => {
                        setShowOptions(true)
                        setCurrentLevel(chatData)
                        setBreadcrumb(["Help Center"])
                    })
                }, 1000)
            })
        } else if (question.children) {
            simulateTyping("Here are some specific questions about " + question.text.toLowerCase() + ":", () => {
                setCurrentLevel(question.children)
                setBreadcrumb([...breadcrumb, question.text])
                setShowOptions(true)
            })
        }
    }

    const resetChat = () => {
        setMessages([
            {
                id: "1",
                type: "bot",
                content: "Hi! I'm here to help you with any questions. What would you like to know about?",
                timestamp: new Date(),
            },
        ])
        setCurrentLevel(chatData)
        setBreadcrumb(["Help Center"])
        setShowOptions(true)
        setIsTyping(false)
    }

    return (
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm max-w-md mx-auto flex flex-col">
            <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-green-400" />
                        Help Assistant
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={resetChat} className="text-green-400 hover:bg-green-400/10">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                            {message.type === "bot" && (
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Bot className="h-4 w-4 text-white" />
                                </div>
                            )}
                            <div
                                className={`max-w-[80%] p-3 rounded-lg ${message.type === "user"
                                        ? "bg-green-500 text-white rounded-br-sm"
                                        : "bg-slate-800 text-slate-200 rounded-bl-sm"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                <span className="text-xs opacity-60 mt-1 block">
                                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                            </div>
                            {message.type === "user" && (
                                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="h-4 w-4 text-white" />
                            </div>
                            <div className="bg-slate-800 text-slate-200 rounded-lg rounded-bl-sm p-3">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <div
                                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "150ms" }}
                                    />
                                    <div
                                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "300ms" }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {showOptions && !isTyping && (
                    <div className="space-y-2 border-t border-slate-700 pt-4">
                        {currentLevel.map((question) => (
                            <Button
                                key={question.id}
                                variant="outline"
                                onClick={() => handleQuestionClick(question)}
                                className="w-full justify-start text-left border-slate-600 text-black hover:bg-slate-800 hover:border-green-500/50 hover:text-white h-auto py-2 px-3"
                            >
                                <span className="text-sm">{question.text}</span>
                            </Button>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
