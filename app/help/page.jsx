"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StaticChatbot } from "@/components/static-chatbot"

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 p-2">
            <div className="max-w-2xl mx-auto pt-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Help Center</h1>
                        <p className="text-slate-400">Get instant answers to common questions</p>
                    </div>
                </div>
                <StaticChatbot />
            </div>
        </div>
    )
}
